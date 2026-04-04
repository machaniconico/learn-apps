import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("database");

export default function TransactionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-violet-400 text-sm font-semibold uppercase tracking-wide">データベース</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">トランザクション</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-violet-300">トランザクション</strong>は複数のSQL操作をひとまとまりとして扱う仕組みです。
            ACID特性（原子性、一貫性、独立性、永続性）により、すべて成功するかすべて失敗するかが保証されます。
            PDOでは<code>beginTransaction()</code>、<code>commit()</code>、<code>rollBack()</code>で制御します。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">トランザクションの基本</h2>
        <p className="text-gray-400 mb-4">
          beginTransaction()で開始し、成功時はcommit()、例外が発生した場合はrollBack()を呼びます。
        </p>
        <PhpEditor
          defaultCode={`<?php\nclass MockTransaction {\n    private array $log = [];\n    private bool $inTransaction = false;\n    private array $pending = [];\n\n    public function begin(): void {\n        $this->inTransaction = true;\n        $this->pending = [];\n        echo "BEGIN TRANSACTION\\n";\n    }\n\n    public function execute(string $sql): void {\n        if ($this->inTransaction) {\n            $this->pending[] = $sql;\n        }\n        echo "  SQL: {$sql}\\n";\n    }\n\n    public function commit(): void {\n        $this->log = array_merge($this->log, $this->pending);\n        $this->pending = [];\n        $this->inTransaction = false;\n        echo "COMMIT\\n";\n    }\n\n    public function rollback(): void {\n        $this->pending = [];\n        $this->inTransaction = false;\n        echo "ROLLBACK\\n";\n    }\n}\n\n$db = new MockTransaction();\n\n// 成功するトランザクション\necho "=== 送金処理（成功）===\\n";\n$db->begin();\ntry {\n    $db->execute("UPDATE accounts SET balance = balance - 1000 WHERE id = 1");\n    $db->execute("UPDATE accounts SET balance = balance + 1000 WHERE id = 2");\n    $db->execute("INSERT INTO transfers (from_id, to_id, amount) VALUES (1, 2, 1000)");\n    $db->commit();\n    echo "送金完了\\n";\n} catch (Exception $e) {\n    $db->rollback();\n    echo "送金失敗: " . $e->getMessage() . "\\n";\n}`}
          expectedOutput={`=== 送金処理（成功）===\nBEGIN TRANSACTION\n  SQL: UPDATE accounts SET balance = balance - 1000 WHERE id = 1\n  SQL: UPDATE accounts SET balance = balance + 1000 WHERE id = 2\n  SQL: INSERT INTO transfers (from_id, to_id, amount) VALUES (1, 2, 1000)\nCOMMIT\n送金完了`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ロールバックの動作</h2>
        <p className="text-gray-400 mb-4">
          途中でエラーが発生した場合、rollBack()でそれまでの変更をすべて元に戻します。
        </p>
        <PhpEditor
          defaultCode={`<?php\nclass BankDB {\n    private array $accounts = [\n        1 => ['id' => 1, 'name' => '田中', 'balance' => 10000],\n        2 => ['id' => 2, 'name' => '鈴木', 'balance' => 5000],\n    ];\n    private array $backup = [];\n\n    public function begin(): void {\n        $this->backup = $this->accounts;\n        echo "トランザクション開始\\n";\n    }\n\n    public function transfer(int $from, int $to, int $amount): void {\n        if ($this->accounts[$from]['balance'] < $amount) {\n            throw new RuntimeException("残高不足: {$this->accounts[$from]['name']}の残高が足りません");\n        }\n        $this->accounts[$from]['balance'] -= $amount;\n        $this->accounts[$to]['balance']   += $amount;\n    }\n\n    public function commit(): void { $this->backup = []; echo "コミット完了\\n"; }\n    public function rollback(): void { $this->accounts = $this->backup; echo "ロールバック\\n"; }\n\n    public function showBalances(): void {\n        foreach ($this->accounts as $acc) {\n            echo "  {$acc['name']}: " . number_format($acc['balance']) . "円\\n";\n        }\n    }\n}\n\n$db = new BankDB();\necho "=== 送金前 ===\\n";\n$db->showBalances();\n\n$db->begin();\ntry {\n    $db->transfer(1, 2, 20000); // 残高不足\n    $db->commit();\n} catch (RuntimeException $e) {\n    echo "エラー: " . $e->getMessage() . "\\n";\n    $db->rollback();\n}\n\necho "=== ロールバック後 ===\\n";\n$db->showBalances();`}
          expectedOutput={`=== 送金前 ===\n  田中: 10,000円\n  鈴木: 5,000円\nトランザクション開始\nエラー: 残高不足: 田中の残高が足りません\nロールバック\n=== ロールバック後 ===\n  田中: 10,000円\n  鈴木: 5,000円`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">セーブポイント</h2>
        <p className="text-gray-400 mb-4">
          SAVEPOINTを使うとトランザクション内の特定地点まで部分的にロールバックできます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// セーブポイントのシミュレーション\n$operations = [];\n$savepoints = [];\n\nfunction beginTx(): void {\n    echo "BEGIN\\n";\n}\n\nfunction execSql(array &$ops, string $sql): void {\n    $ops[] = $sql;\n    echo "  実行: {$sql}\\n";\n}\n\nfunction savepoint(array &$saves, array $ops, string $name): void {\n    $saves[$name] = count($ops);\n    echo "  SAVEPOINT {$name}\\n";\n}\n\nfunction rollbackTo(array $saves, array &$ops, string $name): void {\n    $pos = $saves[$name] ?? 0;\n    $ops = array_slice($ops, 0, $pos);\n    echo "  ROLLBACK TO {$name}\\n";\n}\n\nbeginTx();\nexecSql($operations, "INSERT INTO orders (user_id, total) VALUES (1, 5000)");\nsavepoint($savepoints, $operations, "after_order");\nexecSql($operations, "INSERT INTO order_items (order_id, product_id) VALUES (1, 101)");\nexecSql($operations, "INSERT INTO order_items (order_id, product_id) VALUES (1, 999)"); // 失敗\nrollbackTo($savepoints, $operations, "after_order");\nexecSql($operations, "INSERT INTO order_items (order_id, product_id) VALUES (1, 102)"); // 別の商品\necho "COMMIT\\n";\necho "確定した操作数: " . count($operations);`}
          expectedOutput={`BEGIN\n  実行: INSERT INTO orders (user_id, total) VALUES (1, 5000)\n  SAVEPOINT after_order\n  実行: INSERT INTO order_items (order_id, product_id) VALUES (1, 101)\n  実行: INSERT INTO order_items (order_id, product_id) VALUES (1, 999)\n  ROLLBACK TO after_order\n  実行: INSERT INTO order_items (order_id, product_id) VALUES (1, 102)\nCOMMIT\n確定した操作数: 2`}
        />
      </section>

      <LessonCompleteButton lessonId="transactions" categoryId="database" />
      <LessonNav lessons={lessons} currentId="transactions" basePath="/learn/database" />
    </div>
  );
}

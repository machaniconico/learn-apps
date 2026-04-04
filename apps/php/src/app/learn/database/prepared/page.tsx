import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("database");

export default function PreparedPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-violet-400 text-sm font-semibold uppercase tracking-wide">データベース</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">プリペアドステートメント</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-violet-300">プリペアドステートメント</strong>はSQLとデータを分離して実行する仕組みです。
            SQLインジェクション攻撃を根本的に防ぎ、同じクエリを繰り返し実行する場合のパフォーマンスも向上します。
            PDOでは<code>:name</code>形式または<code>?</code>形式のプレースホルダーを使います。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">名前付きプレースホルダー</h2>
        <p className="text-gray-400 mb-4">
          :nameの形式でプレースホルダーを指定します。可読性が高く、順序を気にせず使えます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// プリペアドステートメントのシミュレーション\nclass MockStatement {\n    private string $sql;\n    private array $params = [];\n\n    public function __construct(string $sql) {\n        $this->sql = $sql;\n    }\n\n    public function bindValue(string $param, mixed $value, string $type = 'string'): void {\n        $this->params[$param] = ['value' => $value, 'type' => $type];\n    }\n\n    public function execute(): void {\n        $sql = $this->sql;\n        foreach ($this->params as $name => $info) {\n            $val = is_string($info['value']) ? "'{$info['value']}'" : $info['value'];\n            $sql = str_replace($name, (string)$val, $sql);\n        }\n        echo "実行SQL: {$sql}\\n";\n    }\n}\n\n// SELECT文\n$stmt = new MockStatement("SELECT * FROM users WHERE email = :email AND active = :active");\n$stmt->bindValue(':email',  'tanaka@example.com', 'string');\n$stmt->bindValue(':active', 1, 'int');\n$stmt->execute();\n\n// INSERT文\n$stmt2 = new MockStatement("INSERT INTO users (name, email, age) VALUES (:name, :email, :age)");\n$stmt2->bindValue(':name',  '田中太郎', 'string');\n$stmt2->bindValue(':email', 'tanaka@example.com', 'string');\n$stmt2->bindValue(':age',   30, 'int');\n$stmt2->execute();`}
          expectedOutput={`実行SQL: SELECT * FROM users WHERE email = 'tanaka@example.com' AND active = 1\n実行SQL: INSERT INTO users (name, email, age) VALUES ('田中太郎', 'tanaka@example.com', 30)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">SQLインジェクション対策の確認</h2>
        <p className="text-gray-400 mb-4">
          プリペアドステートメントを使わない場合と使う場合でSQLインジェクションへの耐性を比較します。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// 危険な実装（文字列結合）\nfunction unsafeQuery(string $userInput): string {\n    return "SELECT * FROM users WHERE name = '" . $userInput . "'";\n}\n\n// 安全な実装（プリペアドステートメント）\nfunction safeQuery(string $userInput): string {\n    // パラメータはSQLとは別に処理される\n    $template = "SELECT * FROM users WHERE name = :name";\n    $safe = htmlspecialchars($userInput, ENT_QUOTES);\n    return "テンプレート: {$template}\\n  パラメータ: name={$safe}（安全に分離）";\n}\n\n// 攻撃文字列\n$malicious = "' OR '1'='1'; DROP TABLE users; --";\n\necho "=== 危険な実装 ===\\n";\necho unsafeQuery($malicious) . "\\n\\n";\n\necho "=== 安全な実装（プリペアド）===\\n";\necho safeQuery($malicious) . "\\n\\n";\n\necho "プリペアドステートメントでは入力値がSQLとして解釈されません";`}
          expectedOutput={`=== 危険な実装 ===\nSELECT * FROM users WHERE name = '' OR '1'='1'; DROP TABLE users; --'\n\n=== 安全な実装（プリペアド）===\nテンプレート: SELECT * FROM users WHERE name = :name\n  パラメータ: name=&#039; OR &#039;1&#039;=&#039;1&#039;; DROP TABLE users; --（安全に分離）\n\nプリペアドステートメントでは入力値がSQLとして解釈されません`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">一括挿入（バッチ処理）</h2>
        <p className="text-gray-400 mb-4">
          プリペアドステートメントは一度コンパイルして繰り返し実行できます。大量データの挿入に効率的です。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// バッチ挿入のシミュレーション\n$usersToInsert = [\n    ['name' => '田中太郎', 'email' => 'tanaka@example.com', 'age' => 30],\n    ['name' => '鈴木花子', 'email' => 'suzuki@example.com', 'age' => 25],\n    ['name' => '佐藤次郎', 'email' => 'sato@example.com',   'age' => 35],\n    ['name' => '高橋美咲', 'email' => 'takahashi@example.com', 'age' => 28],\n];\n\n$sql = "INSERT INTO users (name, email, age) VALUES (:name, :email, :age)";\necho "準備済みSQL: {$sql}\\n";\necho "（一度コンパイルして複数回実行）\\n\\n";\n\nforeach ($usersToInsert as $i => $user) {\n    // 実際は $stmt->execute($user);\n    echo "実行 #" . ($i + 1) . ": {$user['name']} <{$user['email']}> ({$user['age']}歳)\\n";\n}\n\necho "\\n合計 " . count($usersToInsert) . " 件挿入完了";`}
          expectedOutput={`準備済みSQL: INSERT INTO users (name, email, age) VALUES (:name, :email, :age)\n（一度コンパイルして複数回実行）\n\n実行 #1: 田中太郎 <tanaka@example.com> (30歳)\n実行 #2: 鈴木花子 <suzuki@example.com> (25歳)\n実行 #3: 佐藤次郎 <sato@example.com> (35歳)\n実行 #4: 高橋美咲 <takahashi@example.com> (28歳)\n\n合計 4 件挿入完了`}
        />
      </section>

      <LessonCompleteButton lessonId="prepared" categoryId="database" />
      <LessonNav lessons={lessons} currentId="prepared" basePath="/learn/database" />
    </div>
  );
}

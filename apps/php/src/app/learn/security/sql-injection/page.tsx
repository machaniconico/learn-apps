import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("security");

export default function SqlInjectionPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-red-400 text-sm font-semibold">セキュリティ レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">SQLインジェクション</h1>
        <p className="text-gray-400">プリペアドステートメントによるSQLインジェクション防止の方法を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">SQLインジェクションとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          SQLインジェクションは、ユーザー入力にSQL文を埋め込んでデータベースを不正操作する攻撃です。
          データの盗取・改ざん・削除などの被害が発生します。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• 絶対にSQLに直接ユーザー入力を連結しない</li>
          <li>• <code className="text-red-300">PDO::prepare() + bindParam()/execute()</code> を使う</li>
          <li>• プレースホルダー（<code className="text-red-300">?</code>または<code className="text-red-300">:name</code>）でパラメータを分離</li>
          <li>• <code className="text-red-300">PDO::ATTR_EMULATE_PREPARES = false</code> で真のプリペアドステートメントを使用</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">危険なコード vs 安全なコード</h2>
        <p className="text-gray-400 mb-4">
          SQLへの直接埋め込みがいかに危険かを理解し、プリペアドステートメントで対策します。
        </p>
        <PhpEditor
          defaultCode={`<?php
// 攻撃例の入力
$maliciousInput = "' OR '1'='1";
$maliciousId = "1; DROP TABLE users; --";

// 危険：直接連結（絶対にやってはいけない）
$dangerousQuery = "SELECT * FROM users WHERE username = '{$maliciousInput}'";
echo "危険なSQL:\\n" . $dangerousQuery . "\\n\\n";

// 上記は以下のSQLになってしまう：
// SELECT * FROM users WHERE username = '' OR '1'='1'
// → 全ユーザーが返される！

// 安全：プリペアドステートメントのイメージ
function safePreparedQuery(string $username): string {
    // プレースホルダーを使うことでSQLとデータを分離
    $query = "SELECT * FROM users WHERE username = ?";
    // 実際の値はDBドライバが安全に処理する
    return "実行SQL: {$query} [パラメータ: " . addslashes($username) . "]";
}

echo "安全なSQL:\\n" . safePreparedQuery($maliciousInput) . "\\n";
echo safePreparedQuery("田中太郎") . "\\n";`}
          expectedOutput={`危険なSQL:\nSELECT * FROM users WHERE username = '' OR '1'='1'\n\n安全なSQL:\n実行SQL: SELECT * FROM users WHERE username = ? [パラメータ: \' OR \'1\'=\'1\']\n実行SQL: SELECT * FROM users WHERE username = ? [パラメータ: 田中太郎]`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">PDOプリペアドステートメントの実装</h2>
        <p className="text-gray-400 mb-4">
          実際のPDOを使ったSQLインジェクション対策の実装パターンです。
        </p>
        <PhpEditor
          defaultCode={`<?php
// PDO接続のベストプラクティス
function createPdo(): PDO {
    $dsn = 'mysql:host=localhost;dbname=myapp;charset=utf8mb4';
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false, // 真のプリペアドステートメント
    ];
    return new PDO($dsn, 'user', 'password', $options);
}

// 名前付きプレースホルダーを使ったクエリ
function findUserByEmail(PDO $pdo, string $email): ?array {
    $stmt = $pdo->prepare("SELECT id, name, email FROM users WHERE email = :email");
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->execute();
    return $stmt->fetch() ?: null;
}

// 複数パラメータの例
function searchProducts(PDO $pdo, string $keyword, int $maxPrice): array {
    $stmt = $pdo->prepare(
        "SELECT * FROM products WHERE name LIKE :keyword AND price <= :max ORDER BY price"
    );
    $stmt->execute([
        ':keyword' => "%{$keyword}%",
        ':max'     => $maxPrice,
    ]);
    return $stmt->fetchAll();
}

// シミュレーション（実際のDB接続なし）
$queries = [
    "SELECT id, name, email FROM users WHERE email = :email",
    "SELECT * FROM products WHERE name LIKE :keyword AND price <= :max ORDER BY price",
];

foreach ($queries as $query) {
    echo "安全なクエリ: " . $query . "\\n";
}
echo "\\nプリペアドステートメントはSQLとデータを完全に分離します\\n";`}
          expectedOutput={`安全なクエリ: SELECT id, name, email FROM users WHERE email = :email\n安全なクエリ: SELECT * FROM products WHERE name LIKE :keyword AND price <= :max ORDER BY price\n\nプリペアドステートメントはSQLとデータを完全に分離します`}
        />
      </section>
      <LessonCompleteButton lessonId="sql-injection" categoryId="security" />
      <LessonNav lessons={lessons} currentId="sql-injection" basePath="/learn/security" />
    </div>
  );
}

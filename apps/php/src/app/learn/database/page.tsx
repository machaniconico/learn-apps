import { PhpEditor } from "@/components/php-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("database");

const quizQuestions: QuizQuestion[] = [
  {
    question: "PDOとは何の略ですか？",
    options: [
      "PHP Data Operations",
      "PHP Database Object",
      "PHP Data Objects",
      "PHP Data Operator",
    ],
    answer: 2,
    explanation: "PDOはPHP Data Objectsの略で、PHPからデータベースに接続するための統一インターフェースを提供します。",
  },
  {
    question: "プリペアドステートメントを使う主な目的はどれですか？",
    options: [
      "クエリを高速化するため",
      "SQLインジェクションを防ぐため",
      "接続を簡単にするため",
      "結果を並べ替えるため",
    ],
    answer: 1,
    explanation: "プリペアドステートメントはユーザー入力をパラメータとして分離するため、SQLインジェクション攻撃を効果的に防ぎます。",
  },
  {
    question: "トランザクションを開始するPDOのメソッドはどれですか？",
    options: ["$pdo->startTransaction()", "$pdo->begin()", "$pdo->beginTransaction()", "$pdo->transaction()"],
    answer: 2,
    explanation: "beginTransaction()でトランザクションを開始します。成功時はcommit()、失敗時はrollBack()を呼びます。",
  },
  {
    question: "LIMIT 10 OFFSET 20 の意味は何ですか？",
    options: [
      "最初の10件を取得する",
      "21件目から30件目を取得する",
      "20件目から10件取得する",
      "合計20件取得する",
    ],
    answer: 1,
    explanation: "OFFSET 20は最初の20件をスキップし、LIMIT 10は次の10件を取得します。つまり21〜30件目が結果として返ります。",
  },
];

export default function DatabasePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-violet-400 mb-2">データベース</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          PHPでのデータベース操作を学びましょう。PDOを使った接続、CRUD操作、プリペアドステートメント、トランザクション管理など、実践的なデータベースプログラミングを習得します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="database" totalLessons={8} color="violet" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/database" color="violet" categoryId="database" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">PDO接続の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-300">PDO</code>クラスを使ってデータベースに接続します。DSN（Data Source Name）で接続情報を指定します。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// PDO接続のパターン（実際のDBなしでシミュレーション）\nclass MockPDO {\n    private string $dsn;\n\n    public function __construct(string $dsn) {\n        $this->dsn = $dsn;\n        echo "接続成功: " . $dsn . "\\n";\n    }\n\n    public function query(string $sql): array {\n        return [\n            ['id' => 1, 'name' => '田中太郎', 'email' => 'tanaka@example.com'],\n            ['id' => 2, 'name' => '鈴木花子', 'email' => 'suzuki@example.com'],\n        ];\n    }\n}\n\n$pdo = new MockPDO("mysql:host=localhost;dbname=myapp;charset=utf8mb4");\n$rows = $pdo->query("SELECT * FROM users");\n\nforeach ($rows as $row) {\n    echo "ID: {$row['id']}, 名前: {$row['name']}\\n";\n}`}
          expectedOutput={`接続成功: mysql:host=localhost;dbname=myapp;charset=utf8mb4\nID: 1, 名前: 田中太郎\nID: 2, 名前: 鈴木花子`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">プリペアドステートメント</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-300">prepare()</code>と<code className="text-violet-300">execute()</code>を使ってSQLインジェクションを防ぎます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// プリペアドステートメントのシミュレーション\nfunction executeQuery(string $sql, array $params): void {\n    echo "SQL: " . $sql . "\\n";\n    echo "パラメータ: " . implode(", ", $params) . "\\n";\n    echo "実行結果: 安全に処理されました\\n";\n}\n\n// 危険な入力値（SQLインジェクション試行）\n$userInput = "' OR '1'='1";\n\n// プリペアドステートメントで安全に処理\n$sql = "SELECT * FROM users WHERE email = :email AND active = :active";\nexecuteQuery($sql, [':email' => $userInput, ':active' => 1]);\n\necho "\\n入力値はエスケープされ安全に処理されました";\n`}
          expectedOutput={`SQL: SELECT * FROM users WHERE email = :email AND active = :active\nパラメータ: ' OR '1'='1, 1\n実行結果: 安全に処理されました\n\n入力値はエスケープされ安全に処理されました`}
        />
      </section>
      <Quiz questions={quizQuestions} color="violet" />
    </div>
  );
}

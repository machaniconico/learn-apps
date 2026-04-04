import { PhpEditor } from "@/components/php-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("oop-advanced");

const quizQuestions: QuizQuestion[] = [
  {
    question: "シングルトンパターンの主な目的は何ですか？",
    options: [
      "クラスのインスタンスを複数生成する",
      "クラスのインスタンスを1つだけに制限する",
      "クラスを継承しやすくする",
      "メソッドを動的に変更する",
    ],
    answer: 1,
    explanation: "シングルトンパターンは、クラスのインスタンスが1つだけ存在することを保証するデザインパターンです。",
  },
  {
    question: "ファクトリーパターンで解決される問題は何ですか？",
    options: [
      "オブジェクトの破棄を管理する",
      "オブジェクト生成の詳細をカプセル化する",
      "複数のインターフェースを実装する",
      "データベース接続を管理する",
    ],
    answer: 1,
    explanation: "ファクトリーパターンはオブジェクト生成の詳細を隠蔽し、生成ロジックをカプセル化することで柔軟性を高めます。",
  },
  {
    question: "ストラテジーパターンで行われることは何ですか？",
    options: [
      "オブジェクトの状態を監視する",
      "アルゴリズムをカプセル化して切り替え可能にする",
      "クラスの生成を制限する",
      "サブクラスにテンプレートを提供する",
    ],
    answer: 1,
    explanation: "ストラテジーパターンはアルゴリズムをカプセル化して、実行時に切り替え可能にするデザインパターンです。",
  },
  {
    question: "依存性注入（DI）の主なメリットは何ですか？",
    options: [
      "コードが短くなる",
      "テストしやすく疎結合なコードになる",
      "実行速度が上がる",
      "メモリ使用量が減る",
    ],
    answer: 1,
    explanation: "依存性注入により、クラス間の結合度が下がり、テストや差し替えがしやすい疎結合な設計が実現できます。",
  },
];

export default function OopAdvancedPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-pink-400 mb-2">OOP応用</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          オブジェクト指向プログラミングの応用的なテクニックを学びましょう。GoFデザインパターン（シングルトン・ファクトリー・ストラテジー・オブザーバー）と依存性注入を習得し、保守性の高いPHPアプリケーションを設計できるようになります。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="oop-advanced" totalLessons={6} color="pink" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/oop-advanced" color="pink" categoryId="oop-advanced" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">シングルトンパターンの例</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-300">static</code>プロパティを使ってインスタンスを1つに制限するシングルトンパターンです。
        </p>
        <PhpEditor
          defaultCode={`<?php
class Database {
    private static ?Database $instance = null;
    private int $connectionCount = 0;

    private function __construct() {
        $this->connectionCount++;
    }

    public static function getInstance(): Database {
        if (self::$instance === null) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    public function query(string $sql): string {
        return "実行: {$sql}";
    }
}

$db1 = Database::getInstance();
$db2 = Database::getInstance();

echo ($db1 === $db2 ? "同じインスタンス" : "異なるインスタンス") . "\\n";
echo $db1->query("SELECT * FROM users") . "\\n";`}
          expectedOutput={`同じインスタンス\n実行: SELECT * FROM users`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ストラテジーパターンの例</h2>
        <p className="text-gray-400 mb-4">
          アルゴリズムをインターフェースで抽象化し、実行時に切り替えるストラテジーパターンです。
        </p>
        <PhpEditor
          defaultCode={`<?php
interface SortStrategy {
    public function sort(array $data): array;
}

class BubbleSort implements SortStrategy {
    public function sort(array $data): array {
        // 簡略化したバブルソート
        sort($data);
        return $data;
    }
}

class ReverseSort implements SortStrategy {
    public function sort(array $data): array {
        rsort($data);
        return $data;
    }
}

class Sorter {
    public function __construct(private SortStrategy $strategy) {}

    public function sort(array $data): array {
        return $this->strategy->sort($data);
    }
}

$data = [3, 1, 4, 1, 5, 9, 2, 6];
$sorter = new Sorter(new BubbleSort());
echo implode(", ", $sorter->sort($data)) . "\\n";

$sorter2 = new Sorter(new ReverseSort());
echo implode(", ", $sorter2->sort($data)) . "\\n";`}
          expectedOutput={`1, 1, 2, 3, 4, 5, 6, 9\n9, 6, 5, 4, 3, 2, 1, 1`}
        />
      </section>
      <Quiz questions={quizQuestions} color="pink" />
    </div>
  );
}

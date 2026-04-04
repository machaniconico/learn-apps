import { DartEditor } from "@/components/dart-editor";
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
    explanation: "シングルトンパターンはクラスのインスタンスが1つだけ存在することを保証するデザインパターンです。",
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
          オブジェクト指向プログラミングの応用的なテクニックを学びましょう。GoFデザインパターン（シングルトン・ファクトリー・ストラテジー・オブザーバー）と依存性注入を習得し、保守性の高いDartアプリケーションを設計できるようになります。
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
          <code className="text-teal-300">static</code>フィールドを使ってインスタンスを1つに制限するシングルトンパターンです。
        </p>
        <DartEditor
          defaultCode={`class Database {
  static Database? _instance;
  int _connectionCount = 0;

  Database._internal() {
    _connectionCount++;
  }

  static Database getInstance() {
    _instance ??= Database._internal();
    return _instance!;
  }

  String query(String sql) {
    return '実行: \$sql';
  }
}

void main() {
  final db1 = Database.getInstance();
  final db2 = Database.getInstance();

  print(identical(db1, db2) ? '同じインスタンス' : '異なるインスタンス');
  print(db1.query('SELECT * FROM users'));
}`}
          expectedOutput={`同じインスタンス\n実行: SELECT * FROM users`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ストラテジーパターンの例</h2>
        <p className="text-gray-400 mb-4">
          アルゴリズムを抽象クラスで定義し、実行時に切り替えるストラテジーパターンです。
        </p>
        <DartEditor
          defaultCode={`abstract class SortStrategy {
  List<int> sort(List<int> data);
}

class AscendingSort implements SortStrategy {
  @override
  List<int> sort(List<int> data) {
    final list = List<int>.from(data)..sort();
    return list;
  }
}

class DescendingSort implements SortStrategy {
  @override
  List<int> sort(List<int> data) {
    final list = List<int>.from(data)..sort((a, b) => b.compareTo(a));
    return list;
  }
}

class Sorter {
  SortStrategy _strategy;
  Sorter(this._strategy);

  void setStrategy(SortStrategy strategy) {
    _strategy = strategy;
  }

  List<int> sort(List<int> data) => _strategy.sort(data);
}

void main() {
  final data = [3, 1, 4, 1, 5, 9, 2, 6];
  final sorter = Sorter(AscendingSort());
  print(sorter.sort(data).join(', '));

  sorter.setStrategy(DescendingSort());
  print(sorter.sort(data).join(', '));
}`}
          expectedOutput={`1, 1, 2, 3, 4, 5, 6, 9\n9, 6, 5, 4, 3, 2, 1, 1`}
        />
      </section>
      <Quiz questions={quizQuestions} color="pink" />
    </div>
  );
}

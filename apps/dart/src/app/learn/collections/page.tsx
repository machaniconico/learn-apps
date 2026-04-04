import { DartEditor } from "@/components/dart-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Dartで重複を許さないコレクションはどれですか？",
    options: ["List", "Map", "Set", "Queue"],
    answer: 2,
    explanation: "Setは重複する要素を持たないコレクションです。同じ値を追加しても一つだけ保持されます。",
  },
  {
    question: "Dartのスプレッド演算子はどれですか？",
    options: ["**", "..", "...", "=>"],
    answer: 2,
    explanation: "...（3つのドット）がスプレッド演算子です。...?はnullableなコレクションに使えます。",
  },
  {
    question: "Listの要素をフィルタリングするメソッドは何ですか？",
    options: ["filter()", "where()", "select()", "find()"],
    answer: 1,
    explanation: "where()メソッドは条件を満たす要素のみを含むIterableを返します。JavaのstreamのfilterやJSのarrayのfilterに相当します。",
  },
  {
    question: "キーと値のペアを扱うDartのコレクションはどれですか？",
    options: ["List", "Set", "Array", "Map"],
    answer: 3,
    explanation: "Mapはキーと値のペアを管理するコレクションです。キーは一意で、値にはキーでアクセスします。",
  },
];

export default function CollectionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-cyan-400 mb-2">コレクション</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          DartのList・Set・Mapを中心としたコレクション操作を学びましょう。スプレッド演算子、コレクション内のif/for、where・map・reduceなどの関数型操作まで、データを効率よく扱うスキルを身に付けます。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="collections" totalLessons={8} color="cyan" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/collections" color="cyan" categoryId="collections" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">List・Set・Map の基本</h2>
        <p className="text-gray-400 mb-4">
          Dartの3つの主要コレクション型：<code className="text-cyan-300">List</code>（順序あり）・<code className="text-cyan-300">Set</code>（重複なし）・<code className="text-cyan-300">Map</code>（キーと値）を確認します。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // List - 順序ありコレクション
  final fruits = ['りんご', 'バナナ', 'みかん'];
  fruits.add('ぶどう');
  print('List: \$fruits');
  print('長さ: \${fruits.length}');

  // Set - 重複なしコレクション
  final numbers = <int>{1, 2, 3, 2, 1};
  print('Set: \$numbers'); // 重複が除去される
  numbers.add(4);
  print('追加後: \$numbers');

  // Map - キーと値のペア
  final scores = <String, int>{
    'Alice': 95,
    'Bob': 87,
    'Carol': 92,
  };
  print('Map: \$scores');
  print('Alice: \${scores['Alice']}');
  scores['Dave'] = 88;
  print('キー一覧: \${scores.keys.toList()}');
}`}
          expectedOutput={`List: [りんご, バナナ, みかん, ぶどう]
長さ: 4
Set: {1, 2, 3}
追加後: {1, 2, 3, 4}
Map: {Alice: 95, Bob: 87, Carol: 92}
Alice: 95
キー一覧: [Alice, Bob, Carol, Dave]`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">where・map・reduce</h2>
        <p className="text-gray-400 mb-4">
          関数型スタイルのコレクション操作で、<code className="text-cyan-300">where</code>・<code className="text-cyan-300">map</code>・<code className="text-cyan-300">reduce</code>を組み合わせてデータを変換します。
        </p>
        <DartEditor
          defaultCode={`void main() {
  final numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // where: フィルタリング
  final evens = numbers.where((n) => n % 2 == 0);
  print('偶数: \$evens');

  // map: 変換
  final squared = numbers.map((n) => n * n);
  print('二乗: \${squared.toList()}');

  // reduce: 集計
  final sum = numbers.reduce((a, b) => a + b);
  print('合計: \$sum');

  // メソッドチェーン
  final result = numbers
      .where((n) => n % 2 != 0)  // 奇数のみ
      .map((n) => n * 3)          // 3倍
      .toList();
  print('奇数×3: \$result');

  // fold: 初期値ありの集計
  final product = [1, 2, 3, 4, 5]
      .fold(1, (acc, n) => acc * n);
  print('積: \$product');
}`}
          expectedOutput={`偶数: (2, 4, 6, 8, 10)
二乗: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
合計: 55
奇数×3: [3, 9, 15, 21, 27]
積: 120`}
        />
      </section>
      <Quiz questions={quizQuestions} color="cyan" />
    </div>
  );
}

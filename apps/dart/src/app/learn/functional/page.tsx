import { DartEditor } from "@/components/dart-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functional");

const quizQuestions: QuizQuestion[] = [
  {
    question: "クロージャとは何ですか？",
    options: [
      "クラスのインスタンスメソッド",
      "外側のスコープの変数を参照できる関数",
      "非同期処理の終了を通知する機能",
      "エラーを閉じ込める仕組み",
    ],
    answer: 1,
    explanation: "クロージャは定義されたスコープの変数をキャプチャして参照できる関数です。カウンターやファクトリ関数の実装に使われます。",
  },
  {
    question: "Dartのwhere()メソッドの役割は何ですか？",
    options: [
      "コレクションを並べ替える",
      "条件を満たす要素だけを抽出する",
      "全要素に関数を適用して変換する",
      "コレクションを一つの値に集約する",
    ],
    answer: 1,
    explanation: "where()はIterableの各要素に述語関数を適用し、trueを返す要素だけを含む新しいIterableを返します。",
  },
  {
    question: "map()メソッドの役割は何ですか？",
    options: [
      "Mapオブジェクトを作成する",
      "各要素に関数を適用して変換した新しいIterableを返す",
      "要素を検索する",
      "要素を削除する",
    ],
    answer: 1,
    explanation: "map()はIterableの各要素に変換関数を適用し、変換後の要素を含む新しいIterableを返します。元のコレクションは変更されません。",
  },
  {
    question: "fold()メソッドの特徴は何ですか？",
    options: [
      "コレクションを二分する",
      "初期値と結合関数を使ってコレクションを一つの値に集約する",
      "コレクションをソートする",
      "コレクションを逆順にする",
    ],
    answer: 1,
    explanation: "fold()は初期値と(accumulator, element)を受け取る関数を使って、コレクション全体を一つの値に集約します。合計、積、文字列結合などに使えます。",
  },
];

export default function FunctionalPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-purple-400 mb-2">関数型プログラミング</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Dartの関数型プログラミングスタイルを学びましょう。クロージャ、高階関数、map/where/reduce、fold操作など、簡潔で表現力豊かなコードを書くための関数型テクニックを習得します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="functional" totalLessons={6} color="purple" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/functional" color="purple" categoryId="functional" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">クロージャの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-300">クロージャ</code>は外側のスコープの変数をキャプチャする関数です。カウンターやファクトリ関数の実装に活用できます。
        </p>
        <DartEditor
          defaultCode={`Function makeCounter(int start) {
  int count = start;
  return () {
    return count++;
  };
}

Function makeAdder(int addend) {
  return (int n) => n + addend;
}

void main() {
  final counter = makeCounter(0);
  print(counter()); // 0
  print(counter()); // 1
  print(counter()); // 2

  final add5 = makeAdder(5);
  final add10 = makeAdder(10);

  print(add5(3));  // 8
  print(add10(3)); // 13
  print(add5(add10(2))); // 17
}`}
          expectedOutput={`0
1
2
8
13
17`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">map・where・reduce チェーン</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-300">map</code>・<code className="text-purple-300">where</code>・<code className="text-purple-300">reduce</code>を連鎖させて、データ変換パイプラインを構築できます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  final scores = [85, 42, 93, 67, 100, 55, 78, 88];

  // 60点以上の点数を取得し、10点ボーナスを加えて平均を計算
  final bonusAverage = scores
      .where((s) => s >= 60)
      .map((s) => s + 10)
      .reduce((a, b) => a + b) /
      scores.where((s) => s >= 60).length;

  print('合格者数: \${scores.where((s) => s >= 60).length}');
  print('ボーナス後の平均: \$bonusAverage');

  // 文字列処理
  final words = ['dart', 'flutter', 'async', 'null', 'safety'];
  final result = words
      .where((w) => w.length > 4)
      .map((w) => w[0].toUpperCase() + w.substring(1))
      .toList();
  print('フィルタ・変換: \$result');

  // fold で合計
  final total = scores.fold(0, (sum, s) => sum + s);
  print('合計点: \$total');
}`}
          expectedOutput={`合格者数: 5
ボーナス後の平均: 100.8
フィルタ・変換: [Flutter, Safety]
合計点: 608`}
        />
      </section>
      <Quiz questions={quizQuestions} color="purple" />
    </div>
  );
}

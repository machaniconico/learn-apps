import { DartEditor } from "@/components/dart-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("patterns");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Dart 3のswitch式（switch expression）と従来のswitch文の主な違いは？",
    options: [
      "switch式は値を返し、=>構文を使う",
      "switch式はbreakが不要",
      "switch式はcaseが使えない",
      "switch式は型チェックができない",
    ],
    answer: 0,
    explanation: "Dart 3のswitch式は値を返す式として使え、=>でマッピングします。従来のswitch文とは異なりexhaustiveness（網羅性）チェックが行われます。",
  },
  {
    question: "パターンマッチングでガード条件を追加するキーワードは？",
    options: ["if", "where", "when", "guard"],
    answer: 2,
    explanation: "whenキーワードでガード条件を追加できます。例：case int n when n > 0 => '正の数'のように使います。",
  },
  {
    question: "sealedクラスを使うと何が保証されますか？",
    options: [
      "クラスがインスタンス化できない",
      "switch式でのパターンが網羅的であることをコンパイラが検証する",
      "クラスが継承できない",
      "全メソッドがabstractになる",
    ],
    answer: 1,
    explanation: "sealedクラスのサブクラスはswitch式でパターンマッチングする際、全サブクラスを網羅しないとコンパイルエラーになります。",
  },
  {
    question: "分割代入（destructuring）でリストから変数に値を取り出す構文は？",
    options: [
      "var [a, b] = list",
      "var (a, b) = list",
      "let [a, b] = list",
      "var {a, b} = list",
    ],
    answer: 0,
    explanation: "Dart 3のリストパターンでは var [a, b] = [1, 2] のようにリスト要素を変数に分割代入できます。",
  },
];

export default function PatternsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-pink-400 mb-2">パターンマッチング</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Dart 3で導入された強力なパターンマッチング機能を学びましょう。switch式、パターン分割代入、ガード節、sealedクラスなど、宣言的で安全なコードを書くための新しい構文を習得します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="patterns" totalLessons={6} color="pink" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/patterns" color="pink" categoryId="patterns" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">switch式の基本</h2>
        <p className="text-gray-400 mb-4">
          Dart 3の<code className="text-pink-300">switch式</code>は値を返す式として使え、<code className="text-pink-300">=&gt;</code>でマッピングします。
        </p>
        <DartEditor
          defaultCode={`String classify(int n) => switch (n) {
  0 => 'ゼロ',
  1 || 2 || 3 => '小さい正の数',
  < 0 => '負の数',
  > 100 => '大きな数',
  _ => '通常の正の数',
};

String getDayType(String day) => switch (day) {
  'Saturday' || 'Sunday' => '週末',
  'Monday' || 'Tuesday' || 'Wednesday' || 'Thursday' || 'Friday' => '平日',
  _ => '不明',
};

void main() {
  for (final n in [0, 2, -5, 150, 42]) {
    print('\$n: \${classify(n)}');
  }
  print(getDayType('Saturday'));
  print(getDayType('Monday'));
}`}
          expectedOutput={`0: ゼロ
2: 小さい正の数
-5: 負の数
150: 大きな数
42: 通常の正の数
週末
平日`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">パターンマッチングと分割代入</h2>
        <p className="text-gray-400 mb-4">
          パターンを使って<code className="text-pink-300">List</code>や<code className="text-pink-300">Map</code>の値を変数に分割代入できます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // リストの分割代入
  var [first, second, ...rest] = [1, 2, 3, 4, 5];
  print('最初: \$first, 2番目: \$second, 残り: \$rest');

  // Mapの分割代入
  var {'name': name, 'age': age} = {'name': '花子', 'age': 28};
  print('名前: \$name, 年齢: \$age');

  // switch式でのパターンマッチング
  final points = [(0, 0), (1, 0), (0, 1), (3, 4)];
  for (final point in points) {
    final desc = switch (point) {
      (0, 0) => '原点',
      (var x, 0) => 'x軸上 (x=\$x)',
      (0, var y) => 'y軸上 (y=\$y)',
      (var x, var y) => '(\$x, \$y)',
    };
    print('\$point: \$desc');
  }
}`}
          expectedOutput={`最初: 1, 2番目: 2, 残り: [3, 4, 5]
名前: 花子, 年齢: 28
(0, 0): 原点
(1, 0): x軸上 (x=1)
(0, 1): y軸上 (y=1)
(3, 4): (3, 4)`}
        />
      </section>
      <Quiz questions={quizQuestions} color="pink" />
    </div>
  );
}

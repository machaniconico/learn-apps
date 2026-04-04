import { DartEditor } from "@/components/dart-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Dartプログラムのエントリーポイントとなる関数は何ですか？",
    options: ["start()", "main()", "run()", "init()"],
    answer: 1,
    explanation: "Dartプログラムはmain()関数から実行が開始されます。全てのDartプログラムにはmain()関数が必要です。",
  },
  {
    question: "Dartで型を明示せずに変数を宣言するキーワードはどれですか？",
    options: ["let", "auto", "var", "dynamic"],
    answer: 2,
    explanation: "varキーワードを使うとDartが型を推論してくれます。一度型が決まると変更できません。",
  },
  {
    question: "Dartで変更不可能な変数を宣言するキーワードはどれですか？",
    options: ["const", "final", "readonly", "immutable"],
    answer: 1,
    explanation: "finalは実行時に一度だけ代入できる変数を宣言します。constはコンパイル時定数です。",
  },
  {
    question: "Dartの文字列補間の正しい書き方はどれですか？",
    options: ["'Hello {name}'", "'Hello \${name}'", "'Hello #name'", "'Hello %name'"],
    answer: 1,
    explanation: "Dartでは文字列補間に\${}または\$を使います。式の場合は\${}、単純な変数名の場合は\$variableと書けます。",
  },
];

export default function BasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-2">Dart基礎</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">12レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Dartプログラミングの基礎を学びましょう。変数、データ型、演算子、入出力など、Dartを使いこなすために必要な基本概念を習得します。Flutter開発やサーバーサイドDartへの足がかりとなる重要な内容です。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="basics" totalLessons={12} color="blue" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全12レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/basics" color="blue" categoryId="basics" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Hello, World!</h2>
        <p className="text-gray-400 mb-4">
          Dartの最初のプログラムです。<code className="text-blue-300">main()</code>関数が実行の起点で、<code className="text-blue-300">print()</code>で文字列を出力します。
        </p>
        <DartEditor
          defaultCode={`void main() {
  print('Hello, World!');
  print('Dartへようこそ！');

  // 変数と文字列補間
  String name = 'Dart';
  int version = 3;
  print('言語: \$name バージョン: \$version');
}`}
          expectedOutput={`Hello, World!
Dartへようこそ！
言語: Dart バージョン: 3`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">変数とデータ型</h2>
        <p className="text-gray-400 mb-4">
          Dartは静的型付け言語ですが、<code className="text-blue-300">var</code>キーワードで型推論が使えます。主なデータ型はint、double、String、boolです。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 型推論
  var message = 'Dartは型安全です';
  var count = 42;
  var price = 3.14;
  var isActive = true;

  print(message);
  print('count: \$count (型: \${count.runtimeType})');
  print('price: \$price (型: \${price.runtimeType})');
  print('isActive: \$isActive (型: \${isActive.runtimeType})');

  // 明示的な型宣言
  String greeting = 'こんにちは';
  int age = 25;
  print('\$greeting、\$age歳');
}`}
          expectedOutput={`Dartは型安全です
count: 42 (型: int)
price: 3.14 (型: double)
isActive: true (型: bool)
こんにちは、25歳`}
        />
      </section>
      <Quiz questions={quizQuestions} color="blue" />
    </div>
  );
}

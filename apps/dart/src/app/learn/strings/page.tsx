import { DartEditor } from "@/components/dart-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Dartで文字列の中に変数を埋め込む書き方はどれですか？",
    options: ["\\${変数}", "${変数}", "#{変数}", "%(変数)"],
    answer: 1,
    explanation: "$変数 または ${式} で文字列補間できます。式の場合は波括弧が必要です。",
  },
  {
    question: "Dartで複数行文字列（ヒアドキュメント）を書く方法は何ですか？",
    options: ["\"\"\"...\"\"\"", "```...```", "@\"...\"", "|..."],
    answer: 0,
    explanation: "\"\"\"（トリプルクォート）で複数行文字列を書けます。シングルクォートの'''も使えます。",
  },
  {
    question: "Dartで文字列を分割するメソッドは何ですか？",
    options: ["divide()", "slice()", "split()", "explode()"],
    answer: 2,
    explanation: "split()メソッドで区切り文字を指定して文字列をListに分割します。",
  },
  {
    question: "効率的な文字列の連結に使うDartのクラスは何ですか？",
    options: ["StringBuilder", "StringBuffer", "StringJoiner", "StringConcat"],
    answer: 1,
    explanation: "StringBufferは文字列を効率的に構築するためのクラスです。+演算子による連結より高速です。",
  },
];

export default function StringsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-yellow-400 mb-2">文字列操作</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Dartの文字列操作を基礎から学びましょう。文字列補間、主要なStringメソッド、正規表現、StringBufferによる効率的な文字列構築、Unicodeサポートまで、実用的な文字列処理スキルを習得します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="strings" totalLessons={6} color="yellow" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/strings" color="yellow" categoryId="strings" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列補間と基本操作</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-yellow-300">$変数</code>や<code className="text-yellow-300">{"${式}"}</code>を使った文字列補間はDartの強力な機能です。
        </p>
        <DartEditor
          defaultCode={`void main() {
  final name = '太郎';
  final age = 25;
  final pi = 3.14159;

  // 文字列補間
  print('こんにちは、\$name さん！');
  print('年齢: \${age}歳');
  print('円周率: \${pi.toStringAsFixed(2)}');

  // 複数行文字列
  final poem = "これは\\n複数行の\\n文字列です";
  print(poem);

  // 生文字列（エスケープ無効）
  final path = r'C:\\Users\\user\\Documents';
  print(path);

  // 文字列の基本プロパティ
  final greeting = 'Hello, Dart!';
  print('長さ: \${greeting.length}');
  print('大文字: \${greeting.toUpperCase()}');
  print('含む?: \${greeting.contains("Dart")}');
}`}
          expectedOutput={`こんにちは、太郎 さん！
年齢: 25歳
円周率: 3.14

これは
複数行の
文字列です
C:\\Users\\user\\Documents
長さ: 12
大文字: HELLO, DART!
含む?: true`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列メソッド</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-yellow-300">split</code>・<code className="text-yellow-300">trim</code>・<code className="text-yellow-300">replaceAll</code>など豊富なメソッドで文字列を操作できます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  final text = '  Hello, Dart World!  ';

  // trim: 空白除去
  print(text.trim());

  // split: 分割
  final words = 'apple,banana,cherry'.split(',');
  print(words);

  // replaceAll: 置換
  final fixed = 'foo bar foo'.replaceAll('foo', 'baz');
  print(fixed);

  // substring: 部分文字列
  final str = 'Dart Programming';
  print(str.substring(0, 4));
  print(str.substring(5));

  // startsWith / endsWith
  print('hello.dart'.endsWith('.dart'));
  print('hello.dart'.startsWith('hello'));

  // indexOf
  final idx = 'abcdef'.indexOf('cd');
  print('インデックス: \$idx');
}`}
          expectedOutput={`Hello, Dart World!
[apple, banana, cherry]
baz bar baz
Dart
Programming
true
true
インデックス: 2`}
        />
      </section>
      <Quiz questions={quizQuestions} color="yellow" />
    </div>
  );
}

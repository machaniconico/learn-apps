import { PhpEditor } from "@/components/php-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("closures");

const quizQuestions: QuizQuestion[] = [
  {
    question: "PHPのクロージャ（無名関数）の正しい定義方法はどれですか？",
    options: [
      "closure function($x) { return $x * 2; }",
      "$double = function($x) { return $x * 2; };",
      "$double = func($x) { return $x * 2; };",
      "$double = lambda($x) { return $x * 2; };",
    ],
    answer: 1,
    explanation: "PHPの無名関数は function キーワードを使い、変数に代入します。末尾にセミコロンが必要です。",
  },
  {
    question: "クロージャで外側のスコープの変数を使うための構文はどれですか？",
    options: [
      "function() global($x) { }",
      "function() import($x) { }",
      "function() use ($x) { }",
      "function() capture($x) { }",
    ],
    answer: 2,
    explanation: "useキーワードを使って外側のスコープの変数をクロージャ内に取り込みます。例：function() use ($x) { }",
  },
  {
    question: "PHP 7.4以降のアロー関数の特徴として正しいものはどれですか？",
    options: [
      "use キーワードで変数を明示的に取り込む必要がある",
      "外側のスコープの変数を自動的にキャプチャできる",
      "複数の文を書ける",
      "void型の関数のみ定義できる",
    ],
    answer: 1,
    explanation: "アロー関数（fn() =>）はuseキーワードなしで外側の変数を自動キャプチャします。ただし単一の式のみ書けます。",
  },
  {
    question: "array_reduce() の第3引数は何ですか？",
    options: [
      "コールバック関数",
      "ソート順を指定するフラグ",
      "初期値（accumulator の初期値）",
      "最大繰り返し回数",
    ],
    answer: 2,
    explanation: "array_reduce($array, $callback, $initial) の第3引数は accumulator の初期値です。省略するとnullになります。",
  },
];

export default function ClosuresPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-purple-400 mb-2">クロージャ</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          PHPのクロージャ（無名関数）を使いこなしましょう。useキーワードによる変数キャプチャ、array_map・array_filter・array_reduceへの応用、コールバックパターンまで学びます。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="closures" totalLessons={6} color="purple" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/closures" color="purple" categoryId="closures" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">クロージャの基本</h2>
        <p className="text-gray-400 mb-4">
          クロージャは<code className="text-purple-300">function</code>キーワードで定義する無名関数です。変数に代入したり引数として渡せます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$greet = function(string $name): string {\n    return "こんにちは、{$name}さん！";\n};\n\n$double = fn($x) => $x * 2;\n\necho $greet("鈴木") . "\\n";\necho $double(5) . "\\n";\necho $double(21);`}
          expectedOutput={`こんにちは、鈴木さん！\n10\n42`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">useキーワードと配列操作</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-300">use</code>で外側の変数を取り込み、<code className="text-purple-300">array_map</code>・<code className="text-purple-300">array_filter</code>で関数型スタイルの配列操作ができます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$prefix = "商品";\n$items = ["りんご", "バナナ", "みかん"];\n\n$labeled = array_map(function($item) use ($prefix) {\n    return $prefix . ": " . $item;\n}, $items);\n\n$numbers = [1, 2, 3, 4, 5, 6, 7, 8];\n$evens = array_filter($numbers, fn($n) => $n % 2 === 0);\n\necho implode("\\n", $labeled) . "\\n";\necho implode(", ", $evens);`}
          expectedOutput={`商品: りんご\n商品: バナナ\n商品: みかん\n2, 4, 6, 8`}
        />
      </section>
      <Quiz questions={quizQuestions} color="purple" />
    </div>
  );
}

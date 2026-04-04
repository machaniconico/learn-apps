import { PhpEditor } from "@/components/php-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

const quizQuestions: QuizQuestion[] = [
  {
    question: "PHPで関数を定義するキーワードはどれですか？",
    options: ["def", "func", "function", "fn"],
    answer: 2,
    explanation: "PHPではfunctionキーワードを使って関数を定義します。fnはアロー関数専用の短縮構文です。",
  },
  {
    question: "可変長引数を受け取るために使う演算子はどれですか？",
    options: ["*", "**", "...", "=>"],
    answer: 2,
    explanation: "...（スプレッド演算子）をパラメータ名の前に付けると、任意の数の引数を配列として受け取れます。",
  },
  {
    question: "関数内からグローバル変数にアクセスするために使うキーワードはどれですか？",
    options: ["extern", "global", "var", "static"],
    answer: 1,
    explanation: "globalキーワードを使うと、関数内からグローバルスコープの変数を参照・変更できます。",
  },
  {
    question: "無名関数（クロージャ）で外部変数をキャプチャするキーワードはどれですか？",
    options: ["capture", "bind", "use", "import"],
    answer: 2,
    explanation: "useキーワードを使って、無名関数の外側の変数をクロージャ内で使用できます。",
  },
];

export default function FunctionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-purple-400 mb-2">関数</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          PHPの関数はコードの再利用性を高める基本的な仕組みです。関数の定義・呼び出しから始まり、引数・戻り値・デフォルト値・可変長引数・無名関数・アロー関数・スコープまで、PHPにおける関数のすべてを学びます。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="functions" totalLessons={8} color="purple" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/functions" color="purple" categoryId="functions" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な関数の定義と呼び出し</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-300">function</code>キーワードで関数を定義し、名前を付けて呼び出すことができます。
        </p>
        <PhpEditor
          defaultCode={`<?php
function greet(string $name): string {
    return "こんにちは、{$name}さん！";
}

function add(int $a, int $b): int {
    return $a + $b;
}

echo greet("田中") . "\\n";
echo greet("鈴木") . "\\n";
echo "3 + 5 = " . add(3, 5) . "\\n";
echo "10 + 20 = " . add(10, 20) . "\\n";`}
          expectedOutput={`こんにちは、田中さん！
こんにちは、鈴木さん！
3 + 5 = 8
10 + 20 = 30`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">無名関数とアロー関数</h2>
        <p className="text-gray-400 mb-4">
          無名関数は変数に代入でき、<code className="text-purple-300">fn</code>構文でさらに短く書けます。
        </p>
        <PhpEditor
          defaultCode={`<?php
// 無名関数
$multiply = function(int $a, int $b): int {
    return $a * $b;
};

// アロー関数（PHP 7.4+）
$square = fn(int $n): int => $n * $n;

$numbers = [1, 2, 3, 4, 5];
$doubled = array_map(fn($n) => $n * 2, $numbers);

echo $multiply(4, 6) . "\\n";
echo $square(7) . "\\n";
echo implode(", ", $doubled) . "\\n";`}
          expectedOutput={`24
49
2, 4, 6, 8, 10`}
        />
      </section>
      <Quiz questions={quizQuestions} color="purple" />
    </div>
  );
}

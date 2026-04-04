import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function FunctionsVariadicPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">関数 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">可変長引数</h1>
        <p className="text-gray-400">...演算子を使って任意の数の引数を受け取る関数を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          可変長引数（variadic arguments）を使うと、任意の数の引数を受け取る関数を作れます。<code className="text-purple-300">...</code>演算子をパラメータ名の前に付けると、渡した引数が配列として受け取れます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>...パラメータ名で可変長引数を宣言する</li>
          <li>可変長引数はパラメータリストの最後に置く</li>
          <li>型宣言と組み合わせて型安全にできる（例：int ...$numbers）</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">可変長引数の基本</h2>
        <p className="text-gray-400 mb-4">...演算子で引数をまとめて配列として受け取ります。</p>
        <PhpEditor
          defaultCode={`<?php
function sum(int ...$numbers): int {
    return array_sum($numbers);
}

function joinStrings(string $separator, string ...$parts): string {
    return implode($separator, $parts);
}

function biggest(int $first, int ...$rest): int {
    return max($first, ...$rest);
}

echo sum(1, 2, 3) . "\\n";
echo sum(10, 20, 30, 40, 50) . "\\n";
echo joinStrings("-", "2024", "01", "15") . "\\n";
echo joinStrings(", ", "PHP", "JavaScript", "Python", "Go") . "\\n";
echo biggest(5, 3, 8, 1, 9, 2) . "\\n";`}
          expectedOutput={`6
150
2024-01-15
PHP, JavaScript, Python, Go
9`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スプレッド演算子で配列を展開</h2>
        <p className="text-gray-400 mb-4">配列を...で展開して関数に渡すこともできます。</p>
        <PhpEditor
          defaultCode={`<?php
function average(float ...$values): float {
    if (count($values) === 0) return 0.0;
    return array_sum($values) / count($values);
}

function printAll(string $label, mixed ...$items): void {
    echo "{$label}: ";
    echo implode(", ", $items) . "\\n";
}

$scores = [85.0, 92.0, 78.0, 96.0, 88.0];
echo "平均: " . average(...$scores) . "\\n";

$names = ["田中", "鈴木", "佐藤"];
printAll("メンバー", ...$names);
printAll("数字", 1, 2, 3, 4, 5);

// 通常の引数と組み合わせ
$extra = ["山田", "伊藤"];
printAll("追加メンバー", ...$extra);`}
          expectedOutput={`平均: 87.8
メンバー: 田中, 鈴木, 佐藤
数字: 1, 2, 3, 4, 5
追加メンバー: 山田, 伊藤`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="variadic" />
      </div>
      <LessonNav lessons={lessons} currentId="variadic" basePath="/learn/functions" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function FunctionsReturnValuesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">関数 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">戻り値</h1>
        <p className="text-gray-400">関数から値を返すreturn文と戻り値の型宣言を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-purple-300">return</code>文で関数から値を返します。戻り値の型を<code className="text-purple-300">: 型名</code>で宣言すると型安全になります。何も返さない場合は<code className="text-purple-300">void</code>を宣言します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>returnで関数から値を返し、関数の実行を終了する</li>
          <li>戻り値の型宣言（: int, : string, : array など）で型安全にする</li>
          <li>複数の値を返したい場合は配列を返す</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な戻り値</h2>
        <p className="text-gray-400 mb-4">様々な型の値を返す関数の例です。</p>
        <PhpEditor
          defaultCode={`<?php
function square(float $n): float {
    return $n * $n;
}

function isPalindrome(string $str): bool {
    $reversed = strrev($str);
    return $str === $reversed;
}

function getGrade(int $score): string {
    if ($score >= 90) return "A";
    if ($score >= 80) return "B";
    if ($score >= 70) return "C";
    if ($score >= 60) return "D";
    return "F";
}

echo square(5) . "\\n";
echo square(3.14) . "\\n";
echo isPalindrome("madam") ? "回文です\\n" : "回文ではありません\\n";
echo isPalindrome("hello") ? "回文です\\n" : "回文ではありません\\n";
echo "85点: " . getGrade(85) . "\\n";
echo "72点: " . getGrade(72) . "\\n";
echo "55点: " . getGrade(55) . "\\n";`}
          expectedOutput={`25
9.8596
回文です
回文ではありません
85点: B
72点: C
55点: F`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列で複数の値を返す</h2>
        <p className="text-gray-400 mb-4">配列やリストを使って複数の値を一度に返せます。</p>
        <PhpEditor
          defaultCode={`<?php
function minMax(array $numbers): array {
    return [
        'min' => min($numbers),
        'max' => max($numbers),
        'avg' => array_sum($numbers) / count($numbers),
    ];
}

function divmod(int $a, int $b): array {
    return [$a / $b, $a % $b];
}

$scores = [78, 92, 65, 88, 74, 96, 81];
$stats = minMax($scores);
echo "最小: {$stats['min']}\\n";
echo "最大: {$stats['max']}\\n";
echo "平均: {$stats['avg']}\\n";

[$quotient, $remainder] = divmod(17, 5);
echo "17 ÷ 5 = {$quotient} 余り {$remainder}\\n";`}
          expectedOutput={`最小: 65
最大: 96
平均: 82
17 ÷ 5 = 3 余り 2`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">早期returnとnullable戻り値</h2>
        <p className="text-gray-400 mb-4">条件によってはnullを返すnullable型と、早期returnのパターンを学びます。</p>
        <PhpEditor
          defaultCode={`<?php
function findInArray(array $haystack, mixed $needle): ?int {
    foreach ($haystack as $index => $value) {
        if ($value === $needle) {
            return $index;
        }
    }
    return null;
}

function safeDivide(float $a, float $b): ?float {
    if ($b == 0) {
        return null;
    }
    return $a / $b;
}

$fruits = ["りんご", "みかん", "ぶどう", "いちご"];
$pos = findInArray($fruits, "ぶどう");
echo $pos !== null ? "ぶどうは{$pos}番目\\n" : "見つからない\\n";

$pos2 = findInArray($fruits, "メロン");
echo $pos2 !== null ? "メロンは{$pos2}番目\\n" : "メロンは見つからない\\n";

$result = safeDivide(10, 3);
echo $result !== null ? round($result, 2) . "\\n" : "ゼロ除算\\n";

$result2 = safeDivide(10, 0);
echo $result2 !== null ? $result2 . "\\n" : "ゼロ除算エラー\\n";`}
          expectedOutput={`ぶどうは2番目
メロンは見つからない
3.33
ゼロ除算エラー`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="return-values" />
      </div>
      <LessonNav lessons={lessons} currentId="return-values" basePath="/learn/functions" />
    </div>
  );
}

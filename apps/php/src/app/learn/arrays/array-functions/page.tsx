import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function ArrayFunctionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">配列 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">配列関数</h1>
        <p className="text-gray-400 leading-relaxed">
          PHPの豊富な組み込み配列関数を活用しましょう。<code className="text-cyan-300">array_map</code>、<code className="text-cyan-300">array_filter</code>、<code className="text-cyan-300">array_reduce</code>などの高階関数で宣言的なコードが書けます。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-cyan-400 mb-3">高階関数とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          高階関数はコールバック関数を引数に取る関数です。<code className="text-cyan-300">array_map</code>（変換）、<code className="text-cyan-300">array_filter</code>（絞り込み）、<code className="text-cyan-300">array_reduce</code>（集約）の3つが特に重要です。
        </p>
        <ul className="text-gray-400 space-y-1 list-disc list-inside">
          <li><code className="text-cyan-300">array_map($fn, $arr)</code>: 各要素を変換</li>
          <li><code className="text-cyan-300">array_filter($arr, $fn)</code>: 条件に合う要素のみ残す</li>
          <li><code className="text-cyan-300">array_reduce($arr, $fn, $init)</code>: 1つの値に集約</li>
        </ul>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">array_mapで変換</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">array_map</code>は各要素にコールバックを適用した新しい配列を返します。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$prices = [100, 250, 380, 120, 500];\n\n// 消費税10%込みの価格に変換\n$withTax = array_map(fn($p) => (int)($p * 1.1), $prices);\necho implode(", ", $withTax) . "\\n";\n\n$names = ["taro", "hanako", "jiro"];\n// 先頭を大文字に\n$capitalized = array_map("ucfirst", $names);\necho implode(", ", $capitalized) . "\\n";\n\n// 複数配列に適用\n$a = [1, 2, 3];\n$b = [10, 20, 30];\n$sums = array_map(fn($x, $y) => $x + $y, $a, $b);\necho implode(", ", $sums);`}
          expectedOutput={`110, 275, 418, 132, 550\nTaro, Hanako, Jiro\n11, 22, 33`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">array_filterで絞り込み</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">array_filter</code>はコールバックがtrueを返す要素だけを残します。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$scores = [45, 72, 88, 33, 91, 60, 55, 79];\n\n$passing = array_filter($scores, fn($s) => $s >= 60);\necho "合格: " . implode(", ", $passing) . "\\n";\n\n$high = array_filter($scores, fn($s) => $s >= 80);\necho "高得点: " . implode(", ", $high) . "\\n";\n\n$words = ["", "PHP", "", "Laravel", "0", "Composer"];\n// falsyな値を除去\n$nonEmpty = array_filter($words);\necho implode(", ", $nonEmpty);`}
          expectedOutput={`合格: 72, 88, 91, 60, 79\n高得点: 88, 91\nPHP, Laravel, Composer`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">array_reduceで集約</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">array_reduce</code>は配列の全要素を1つの値にまとめます。合計・最大値・文字列結合などに使えます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\n// 合計\n$sum = array_reduce($numbers, fn($carry, $n) => $carry + $n, 0);\necho "合計: $sum\\n";\n\n// 積\n$product = array_reduce($numbers, fn($carry, $n) => $carry * $n, 1);\necho "積: $product\\n";\n\n// 最大値\n$max = array_reduce($numbers, fn($carry, $n) => max($carry, $n), PHP_INT_MIN);\necho "最大: $max";`}
          expectedOutput={`合計: 55\n積: 3628800\n最大: 10`}
        />
      </section>

      <LessonCompleteButton categoryId="arrays" lessonId="array-functions" />
      <LessonNav lessons={lessons} currentId="array-functions" basePath="/learn/arrays" />
    </div>
  );
}

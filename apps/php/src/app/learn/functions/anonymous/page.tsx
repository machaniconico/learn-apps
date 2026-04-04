import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function FunctionsAnonymousPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">関数 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">無名関数</h1>
        <p className="text-gray-400">変数に代入できる無名関数（クロージャ）の基本を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          無名関数（クロージャ）は名前のない関数で、変数に代入したり他の関数の引数として渡したりできます。<code className="text-purple-300">use</code>キーワードで外側の変数をキャプチャできます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>function() {} の形で名前なしで関数を定義する</li>
          <li>useキーワードで外部スコープの変数をキャプチャする</li>
          <li>コールバック関数として array_map, array_filter などに渡せる</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">無名関数の基本</h2>
        <p className="text-gray-400 mb-4">無名関数を変数に代入して使う例です。</p>
        <PhpEditor
          defaultCode={`<?php
$double = function(int $n): int {
    return $n * 2;
};

$greet = function(string $name, string $greeting = "こんにちは"): string {
    return "{$greeting}、{$name}さん！";
};

echo $double(5) . "\\n";
echo $double(21) . "\\n";
echo $greet("田中") . "\\n";
echo $greet("鈴木", "おはよう") . "\\n";

// コールバックとして渡す
$numbers = [1, 2, 3, 4, 5];
$doubled = array_map($double, $numbers);
echo implode(", ", $doubled) . "\\n";`}
          expectedOutput={`10
42
こんにちは、田中さん！
おはよう、鈴木さん！
2, 4, 6, 8, 10`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">useで外部変数をキャプチャ</h2>
        <p className="text-gray-400 mb-4">useキーワードで無名関数の外側の変数を取り込めます。</p>
        <PhpEditor
          defaultCode={`<?php
$tax = 0.1;
$addTax = function(float $price) use ($tax): float {
    return $price * (1 + $tax);
};

$discount = 500;
$applyDiscount = function(float $price) use ($discount): float {
    return max(0, $price - $discount);
};

$prices = [1000, 2500, 800, 3200];
$withTax = array_map($addTax, $prices);
$discounted = array_map($applyDiscount, $prices);

echo "税込価格:\\n";
foreach ($withTax as $price) {
    echo "  {$price}円\\n";
}
echo "割引後:\\n";
foreach ($discounted as $price) {
    echo "  {$price}円\\n";
}`}
          expectedOutput={`税込価格:
  1100円
  2750円
  880円
  3520円
割引後:
  500円
  2000円
  300円
  2700円`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="anonymous" />
      </div>
      <LessonNav lessons={lessons} currentId="anonymous" basePath="/learn/functions" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("closures");

export default function ArrayReducePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">クロージャ レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">array_reduce</h1>
        <p className="text-gray-400 leading-relaxed">
          <code className="text-purple-300">array_reduce</code>は配列の全要素を1つの値に集約します。合計・最大値・文字列結合など、さまざまな集計処理に使えます。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-purple-400 mb-3">array_reduceの仕組み</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          <code className="text-purple-300">array_reduce(array $arr, callable $callback, mixed $initial = null): mixed</code>
        </p>
        <p className="text-gray-300 leading-relaxed">
          コールバックは<code className="text-purple-300">($carry, $item)</code>を受け取ります。<code className="text-purple-300">$carry</code>は前回の結果（最初は<code className="text-purple-300">$initial</code>）、<code className="text-purple-300">$item</code>は現在の要素です。コールバックが返した値が次の<code className="text-purple-300">$carry</code>になります。
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">基本的な集計</h2>
        <p className="text-gray-400 mb-4">
          合計・積・最大値など基本的な集計処理をarray_reduceで実装します。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$numbers = [3, 1, 4, 1, 5, 9, 2, 6];\n\n$sum = array_reduce($numbers, fn($carry, $n) => $carry + $n, 0);\necho "合計: $sum\\n";\n\n$max = array_reduce($numbers, fn($carry, $n) => max($carry, $n), PHP_INT_MIN);\necho "最大: $max\\n";\n\n$min = array_reduce($numbers, fn($carry, $n) => min($carry, $n), PHP_INT_MAX);\necho "最小: $min\\n";\n\n$avg = $sum / count($numbers);\necho "平均: " . number_format($avg, 2);`}
          expectedOutput={`合計: 31\n最大: 9\n最小: 1\n平均: 3.88`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">複雑な集計処理</h2>
        <p className="text-gray-400 mb-4">
          連想配列をreduceして複数の値を同時に集計できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$orders = [\n    ["item" => "りんご",  "qty" => 3,  "price" => 120],\n    ["item" => "バナナ",  "qty" => 5,  "price" => 80],\n    ["item" => "みかん",  "qty" => 2,  "price" => 150],\n];\n\n$summary = array_reduce($orders, function($carry, $order) {\n    $subtotal        = $order["qty"] * $order["price"];\n    $carry["total"] += $subtotal;\n    $carry["items"] += $order["qty"];\n    return $carry;\n}, ["total" => 0, "items" => 0]);\n\necho "商品数: " . $summary["items"] . "個\\n";\necho "合計金額: " . $summary["total"] . "円";`}
          expectedOutput={`商品数: 10個\n合計金額: 1060円`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">reduceでグループ化</h2>
        <p className="text-gray-400 mb-4">
          array_reduceを使って配列をグループ化（groupBy）する処理を実装できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$people = [\n    ["name" => "田中", "dept" => "営業"],\n    ["name" => "鈴木", "dept" => "開発"],\n    ["name" => "山田", "dept" => "営業"],\n    ["name" => "佐藤", "dept" => "開発"],\n    ["name" => "中村", "dept" => "総務"],\n];\n\n$grouped = array_reduce($people, function($carry, $person) {\n    $dept = $person["dept"];\n    $carry[$dept][] = $person["name"];\n    return $carry;\n}, []);\n\nforeach ($grouped as $dept => $names) {\n    echo $dept . ": " . implode(", ", $names) . "\\n";\n}`}
          expectedOutput={`営業: 田中, 山田\n開発: 鈴木, 佐藤\n総務: 中村`}
        />
      </section>

      <LessonCompleteButton categoryId="closures" lessonId="array-reduce" />
      <LessonNav lessons={lessons} currentId="array-reduce" basePath="/learn/closures" />
    </div>
  );
}

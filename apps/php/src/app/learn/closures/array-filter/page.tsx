import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("closures");

export default function ArrayFilterPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">クロージャ レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">array_filter</h1>
        <p className="text-gray-400 leading-relaxed">
          <code className="text-purple-300">array_filter</code>はコールバックがtrueを返す要素だけを残した配列を返します。データの絞り込みやバリデーションに活躍します。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-purple-400 mb-3">array_filterの仕組み</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          <code className="text-purple-300">array_filter(array $arr, ?callable $callback = null, int $mode = 0): array</code>
        </p>
        <ul className="text-gray-400 space-y-1 list-disc list-inside">
          <li>コールバックがtrueを返す要素のみ保持</li>
          <li>元のキーは保持される（連番にするには <code className="text-purple-300">array_values()</code> を使う）</li>
          <li><code className="text-purple-300">ARRAY_FILTER_USE_KEY</code>: キーをコールバックに渡す</li>
          <li><code className="text-purple-300">ARRAY_FILTER_USE_BOTH</code>: 値とキーの両方を渡す</li>
        </ul>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">条件でフィルタリング</h2>
        <p className="text-gray-400 mb-4">
          アロー関数と組み合わせて簡潔なフィルタリングを書きます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$scores = [45, 72, 88, 33, 91, 60, 55, 79, 95, 42];\n\n// 合格点（60以上）\n$passing = array_values(array_filter($scores, fn($s) => $s >= 60));\necho "合格: " . implode(", ", $passing) . "\\n";\n\n// 優（80以上）\n$excellent = array_values(array_filter($scores, fn($s) => $s >= 80));\necho "優: " . implode(", ", $excellent) . "\\n";\n\n// 不合格\n$failing = array_values(array_filter($scores, fn($s) => $s < 60));\necho "不合格: " . implode(", ", $failing);`}
          expectedOutput={`合格: 72, 88, 91, 60, 79, 95\n優: 88, 91, 95\n不合格: 45, 33, 55, 42`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">useで外部変数を使ったフィルター</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-300">use</code>で基準値を外部から渡してフィルター条件を動的に変えられます。
        </p>
        <PhpEditor
          defaultCode={`<?php\nfunction filterByMinPrice(array $products, int $min): array {\n    return array_values(array_filter(\n        $products,\n        fn($p) => $p["price"] >= $min\n    ));\n}\n\n$products = [\n    ["name" => "えんぴつ",  "price" => 50],\n    ["name" => "ノート",    "price" => 200],\n    ["name" => "定規",      "price" => 150],\n    ["name" => "消しゴム",  "price" => 80],\n    ["name" => "コンパス",  "price" => 350],\n];\n\n$filtered = filterByMinPrice($products, 150);\nforeach ($filtered as $p) {\n    echo $p["name"] . ": " . $p["price"] . "円\\n";\n}`}
          expectedOutput={`ノート: 200円\n定規: 150円\nコンパス: 350円`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">mapとfilterの組み合わせ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-300">array_filter</code>と<code className="text-purple-300">array_map</code>をパイプラインのように組み合わせます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$users = [\n    ["name" => "田中", "age" => 17, "active" => true],\n    ["name" => "鈴木", "age" => 25, "active" => true],\n    ["name" => "山田", "age" => 30, "active" => false],\n    ["name" => "佐藤", "age" => 22, "active" => true],\n];\n\n// アクティブかつ成人のユーザー名を取得\n$result = array_map(\n    fn($u) => $u["name"],\n    array_filter($users, fn($u) => $u["active"] && $u["age"] >= 18)\n);\n\necho implode(", ", $result);`}
          expectedOutput={`鈴木, 佐藤`}
        />
      </section>

      <LessonCompleteButton categoryId="closures" lessonId="array-filter" />
      <LessonNav lessons={lessons} currentId="array-filter" basePath="/learn/closures" />
    </div>
  );
}

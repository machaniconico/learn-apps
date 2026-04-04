import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function ArrayFilteringPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">配列 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">配列のフィルタリング</h1>
        <p className="text-gray-400 leading-relaxed">
          配列から条件に合う要素だけを取り出すフィルタリングを学びます。<code className="text-cyan-300">array_filter</code>を中心に、検索・絞り込みのテクニックを習得します。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-cyan-400 mb-3">フィルタリングの基本</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          <code className="text-cyan-300">array_filter($arr, $callback)</code>はコールバックがtrueを返す要素のみを含む配列を返します。コールバックを省略するとfalsyな値が除去されます。
        </p>
        <ul className="text-gray-400 space-y-1 list-disc list-inside">
          <li>元の配列のキーは保持される（リセットしたい場合は <code className="text-cyan-300">array_values()</code>）</li>
          <li>コールバックなし: null、false、0、""、"0" を除去</li>
          <li><code className="text-cyan-300">ARRAY_FILTER_USE_BOTH</code> でキーと値の両方を使用可能</li>
        </ul>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">条件によるフィルタリング</h2>
        <p className="text-gray-400 mb-4">
          数値・文字列条件でフィルタリングする基本例です。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$ages = [15, 22, 17, 30, 13, 25, 18, 16];\n\n// 18歳以上\n$adults = array_filter($ages, fn($age) => $age >= 18);\necho "成人: " . implode(", ", $adults) . "\\n";\n\n$langs = ["PHP", "python", "Ruby", "javascript", "Go"];\n\n// 大文字始まり\n$capitalized = array_filter($langs, fn($l) => ctype_upper($l[0]));\necho "大文字始まり: " . implode(", ", $capitalized);`}
          expectedOutput={`成人: 22, 30, 25, 18\n大文字始まり: PHP, Ruby, Go`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">連想配列のフィルタリング</h2>
        <p className="text-gray-400 mb-4">
          連想配列の値や、<code className="text-cyan-300">ARRAY_FILTER_USE_BOTH</code>でキー・値両方に基づいてフィルタリングします。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$inventory = [\n    "りんご"  => 50,\n    "バナナ"  => 0,\n    "みかん"  => 30,\n    "ぶどう"  => 0,\n    "いちご"  => 15,\n];\n\n// 在庫あり\n$inStock = array_filter($inventory, fn($qty) => $qty > 0);\nforeach ($inStock as $name => $qty) {\n    echo $name . ": " . $qty . "個\\n";\n}echo "---\\n";\n\n// 在庫20以上\n$plenty = array_filter($inventory, fn($qty) => $qty >= 20);\nforeach ($plenty as $name => $qty) {\n    echo $name . ": " . $qty . "個\\n";\n}`}
          expectedOutput={`りんご: 50個\nみかん: 30個\nいちご: 15個\n---\nりんご: 50個\nみかん: 30個`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">array_searchで要素を検索</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">array_search</code>は値に対応するキーを返します。見つからない場合はfalseを返します。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$fruits = ["りんご", "バナナ", "みかん", "ぶどう", "いちご"];\n\n$key = array_search("みかん", $fruits);\necho "みかんのインデックス: " . $key . "\\n";\n\n$missing = array_search("メロン", $fruits);\necho "メロン: " . ($missing === false ? "見つからない" : $missing) . "\\n";\n\n$scores = ["田中" => 85, "鈴木" => 92, "山田" => 78];\n$who = array_search(92, $scores);\necho "92点: " . $who;`}
          expectedOutput={`みかんのインデックス: 2\nメロン: 見つからない\n92点: 鈴木`}
        />
      </section>

      <LessonCompleteButton categoryId="arrays" lessonId="array-filtering" />
      <LessonNav lessons={lessons} currentId="array-filtering" basePath="/learn/arrays" />
    </div>
  );
}

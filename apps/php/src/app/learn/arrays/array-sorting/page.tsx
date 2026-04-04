import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function ArraySortingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">配列 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">配列のソート</h1>
        <p className="text-gray-400 leading-relaxed">
          PHPには多彩なソート関数があります。昇順・降順・カスタムソートなど、目的に合わせた関数を使いこなしましょう。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-cyan-400 mb-3">主なソート関数</h2>
        <ul className="text-gray-400 space-y-1 list-disc list-inside">
          <li><code className="text-cyan-300">sort()</code>: 値で昇順ソート（キーをリセット）</li>
          <li><code className="text-cyan-300">rsort()</code>: 値で降順ソート（キーをリセット）</li>
          <li><code className="text-cyan-300">asort()</code>: 値で昇順ソート（キーを保持）</li>
          <li><code className="text-cyan-300">ksort()</code>: キーで昇順ソート</li>
          <li><code className="text-cyan-300">usort()</code>: カスタム比較関数でソート</li>
        </ul>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">基本のソート</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">sort</code>と<code className="text-cyan-300">rsort</code>で昇順・降順にソートします。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$nums = [34, 7, 23, 11, 56, 2, 45];\n\n$asc = $nums;\nsort($asc);\necho "昇順: " . implode(", ", $asc) . "\\n";\n\n$desc = $nums;\nrsort($desc);\necho "降順: " . implode(", ", $desc) . "\\n";\n\n$words = ["バナナ", "りんご", "みかん", "ぶどう"];\nsort($words);\necho "文字列昇順: " . implode(", ", $words);`}
          expectedOutput={`昇順: 2, 7, 11, 23, 34, 45, 56\n降順: 56, 45, 34, 23, 11, 7, 2\n文字列昇順: バナナ, みかん, ぶどう, りんご`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">連想配列のソート</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">asort</code>でキーを保持しながら値でソート、<code className="text-cyan-300">ksort</code>でキーでソートします。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$scores = [\n    "田中" => 85,\n    "鈴木" => 92,\n    "山田" => 78,\n    "佐藤" => 96,\n    "中村" => 88,\n];\n\n// 値（スコア）で降順ソート\narsort($scores);\nforeach ($scores as $name => $score) {\n    echo $name . ": " . $score . "点\\n";\n}`}
          expectedOutput={`佐藤: 96点\n鈴木: 92点\n中村: 88点\n田中: 85点\n山田: 78点`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">カスタムソート（usort）</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">usort</code>に比較関数を渡して独自のソート順を定義できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$products = [\n    ["name" => "みかん",  "price" => 100],\n    ["name" => "りんご",  "price" => 200],\n    ["name" => "バナナ",  "price" => 80],\n    ["name" => "ぶどう",  "price" => 350],\n];\n\n// 価格で昇順ソート\nusort($products, fn($a, $b) => $a["price"] <=> $b["price"]);\n\nforeach ($products as $p) {\n    echo $p["name"] . ": " . $p["price"] . "円\\n";\n}`}
          expectedOutput={`バナナ: 80円\nみかん: 100円\nりんご: 200円\nぶどう: 350円`}
        />
      </section>

      <LessonCompleteButton categoryId="arrays" lessonId="array-sorting" />
      <LessonNav lessons={lessons} currentId="array-sorting" basePath="/learn/arrays" />
    </div>
  );
}

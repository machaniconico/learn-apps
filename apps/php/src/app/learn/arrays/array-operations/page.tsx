import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function ArrayOperationsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">配列 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">配列操作</h1>
        <p className="text-gray-400 leading-relaxed">
          PHPには配列を操作するための多彩な組み込み関数があります。スライス、結合、検索、反転など、よく使う操作をマスターしましょう。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-cyan-400 mb-3">よく使う配列操作関数</h2>
        <ul className="text-gray-400 space-y-1 list-disc list-inside">
          <li><code className="text-cyan-300">array_slice()</code>: 配列の一部を取り出す</li>
          <li><code className="text-cyan-300">array_merge()</code>: 2つ以上の配列を結合する</li>
          <li><code className="text-cyan-300">array_reverse()</code>: 配列を逆順にする</li>
          <li><code className="text-cyan-300">in_array()</code>: 値が配列内に存在するか確認</li>
          <li><code className="text-cyan-300">array_unique()</code>: 重複を除去する</li>
        </ul>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">スライスと結合</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">array_slice</code>で配列の一部を切り出し、<code className="text-cyan-300">array_merge</code>で結合します。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\n// 最初の3つ\n$first3 = array_slice($nums, 0, 3);\necho implode(", ", $first3) . "\\n";\n\n// 5番目から3つ\n$mid = array_slice($nums, 4, 3);\necho implode(", ", $mid) . "\\n";\n\n// 逆順\n$reversed = array_reverse($nums);\necho implode(", ", array_slice($reversed, 0, 5)) . "...";`}
          expectedOutput={`1, 2, 3\n5, 6, 7\n10, 9, 8, 7, 6...`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">検索と重複除去</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">in_array</code>で値を検索し、<code className="text-cyan-300">array_unique</code>で重複を削除します。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$fruits = ["りんご", "バナナ", "みかん", "りんご", "ぶどう", "バナナ"];\n\n// 重複チェック\necho in_array("みかん", $fruits) ? "みかん: あり\\n" : "みかん: なし\\n";\necho in_array("いちご", $fruits) ? "いちご: あり\\n" : "いちご: なし\\n";\n\n// 重複除去\n$unique = array_unique($fruits);\necho implode(", ", $unique) . "\\n";\n\n// 要素数の差\necho "元: " . count($fruits) . "個、重複除去後: " . count($unique) . "個";`}
          expectedOutput={`みかん: あり\nいちご: なし\nりんご, バナナ, みかん, ぶどう\n元: 6個、重複除去後: 4個`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">配列の差分と積</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">array_diff</code>で差分、<code className="text-cyan-300">array_intersect</code>で共通要素を取得します。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$a = ["PHP", "Python", "Ruby", "JavaScript"];\n$b = ["PHP", "Go", "Python", "Rust"];\n\n// aにあってbにないもの\n$diff = array_diff($a, $b);\necho "aのみ: " . implode(", ", $diff) . "\\n";\n\n// 両方にあるもの\n$common = array_intersect($a, $b);\necho "共通: " . implode(", ", $common);`}
          expectedOutput={`aのみ: Ruby, JavaScript\n共通: PHP, Python`}
        />
      </section>

      <LessonCompleteButton categoryId="arrays" lessonId="array-operations" />
      <LessonNav lessons={lessons} currentId="array-operations" basePath="/learn/arrays" />
    </div>
  );
}

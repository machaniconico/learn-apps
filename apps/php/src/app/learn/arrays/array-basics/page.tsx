import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function ArrayBasicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">配列 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">配列の基本</h1>
        <p className="text-gray-400 leading-relaxed">
          PHPの配列はインデックス番号でアクセスできる順序付きリストです。<code className="text-cyan-300">[]</code>構文または<code className="text-cyan-300">array()</code>関数で作成できます。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-cyan-400 mb-3">PHPの配列の特徴</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          PHPの配列は他の言語と異なり、インデックス配列と連想配列が同じデータ型（array）です。インデックスは0始まりの整数か任意の文字列キーを使えます。
        </p>
        <ul className="text-gray-400 space-y-1 list-disc list-inside">
          <li>インデックス配列: <code className="text-cyan-300">$arr = [1, 2, 3]</code></li>
          <li>要素追加: <code className="text-cyan-300">$arr[] = 値</code> または <code className="text-cyan-300">array_push()</code></li>
          <li>要素数: <code className="text-cyan-300">count($arr)</code></li>
        </ul>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">配列の作成とアクセス</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">[]</code>で配列を作り、インデックス番号で要素にアクセスします。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$colors = ["赤", "緑", "青", "黄"];\n\necho $colors[0] . "\\n";\necho $colors[2] . "\\n";\necho "要素数: " . count($colors) . "\\n";\n\n// 末尾に追加\n$colors[] = "紫";\necho "追加後の要素数: " . count($colors) . "\\n";\n\n// 全要素を表示\nforeach ($colors as $index => $color) {\n    echo $index . ": " . $color . "\\n";\n}`}
          expectedOutput={`赤\n青\n要素数: 4\n追加後の要素数: 5\n0: 赤\n1: 緑\n2: 青\n3: 黄\n4: 紫`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">配列の変更と削除</h2>
        <p className="text-gray-400 mb-4">
          インデックスを指定して要素を上書きしたり、<code className="text-cyan-300">unset()</code>で削除できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$numbers = [10, 20, 30, 40, 50];\n\n// 要素の変更\n$numbers[1] = 99;\necho implode(", ", $numbers) . "\\n";\n\n// array_splice で削除\narray_splice($numbers, 2, 1); // インデックス2から1つ削除\necho implode(", ", $numbers) . "\\n";\n\n// 配列の結合\n$a = [1, 2, 3];\n$b = [4, 5, 6];\n$merged = array_merge($a, $b);\necho implode(", ", $merged);`}
          expectedOutput={`10, 99, 30, 40, 50\n10, 99, 40, 50\n1, 2, 3, 4, 5, 6`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">配列のスタックとキュー操作</h2>
        <p className="text-gray-400 mb-4">
          PHPの配列はスタック（LIFO）やキュー（FIFO）としても使えます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// スタック (LIFO)\n$stack = [];\narray_push($stack, "A", "B", "C");\necho "スタック: " . implode(", ", $stack) . "\\n";\n$top = array_pop($stack);\necho "取り出し: $top\\n";\necho "残り: " . implode(", ", $stack) . "\\n";\n\n// キュー (FIFO)\n$queue = ["X", "Y", "Z"];\n$front = array_shift($queue);\necho "先頭取り出し: $front\\n";\necho "残り: " . implode(", ", $queue);`}
          expectedOutput={`スタック: A, B, C\n取り出し: C\n残り: A, B\n先頭取り出し: X\n残り: Y, Z`}
        />
      </section>

      <LessonCompleteButton categoryId="arrays" lessonId="array-basics" />
      <LessonNav lessons={lessons} currentId="array-basics" basePath="/learn/arrays" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">PHP基礎 レッスン10</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">入出力</h1>
        <p className="text-gray-400">echo、print、var_dump、print_rを使った出力方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">PHPの出力関数</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          PHPには複数の出力方法があります。用途によって使い分けることで、効率よくデータを表示できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">echo</code>: 最も一般的な出力（複数引数可）</li>
          <li><code className="text-blue-300">print</code>: 1引数のみ、戻り値1を返す</li>
          <li><code className="text-blue-300">var_dump()</code>: 型と値を詳細表示（デバッグ用）</li>
          <li><code className="text-blue-300">print_r()</code>: 配列やオブジェクトを読みやすく表示</li>
          <li><code className="text-blue-300">printf()</code>: 書式付き出力</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">echoとprint</h2>
        <p className="text-gray-400 mb-4"><code className="text-blue-300">echo</code>はカンマ区切りで複数値を出力できます。<code className="text-blue-300">print</code>は1つのみで戻り値を持ちます。</p>
        <PhpEditor
          defaultCode={`<?php\necho "Hello", ", ", "World!", "\\n";\n\n$result = print "printの出力\\n";\necho "printの戻り値: " . $result . "\\n";\n\necho "合計: " . (3 + 4) . "\\n";\necho "文字列: " . str_repeat("*", 5);`}
          expectedOutput={`Hello, World!\nprintの出力\nprintの戻り値: 1\n合計: 7\n文字列: *****`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">var_dumpとprint_r</h2>
        <p className="text-gray-400 mb-4"><code className="text-blue-300">var_dump()</code>は型情報も含めて表示します。<code className="text-blue-300">print_r()</code>は配列を整形して表示します。</p>
        <PhpEditor
          defaultCode={`<?php\n$data = [1, "two", true, null];\n\necho "=== print_r ===\\n";\nprint_r($data);\n\necho "=== var_dump ===\\n";\nvar_dump(42, "hello", false);`}
          expectedOutput={`=== print_r ===\nArray\n(\n    [0] => 1\n    [1] => two\n    [2] => 1\n    [3] => \n)\n=== var_dump ===\nint(42)\nstring(5) "hello"\nbool(false)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">printfによる書式付き出力</h2>
        <p className="text-gray-400 mb-4"><code className="text-blue-300">printf()</code>でC言語風の書式指定出力ができます。<code className="text-blue-300">sprintf()</code>は文字列として返します。</p>
        <PhpEditor
          defaultCode={`<?php\n$name = "田中";\n$score = 95.678;\n$rank = 3;\n\nprintf("%sさんのスコア: %.1f点\\n", $name, $score);\nprintf("順位: %d位\\n", $rank);\nprintf("16進数: %x\\n", 255);\n\n$formatted = sprintf("%-10s %5.2f", "合計:", 1234.5);\necho $formatted;`}
          expectedOutput={`田中さんのスコア: 95.7点\n順位: 3位\n16進数: ff\n合計:      1234.50`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="input-output" />
      </div>
      <LessonNav lessons={lessons} currentId="input-output" basePath="/learn/basics" />
    </div>
  );
}

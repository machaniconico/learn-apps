import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">PHP基礎 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">データ型</h1>
        <p className="text-gray-400">PHPの基本的なデータ型（string、int、float、bool、array、null）を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">PHPのデータ型一覧</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          PHPには複数のデータ型があります。変数に代入する値によって型が自動的に決まります（動的型付け）。<code className="text-blue-300">gettype()</code>関数で型を確認できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">string</code> - 文字列（テキスト）</li>
          <li><code className="text-blue-300">int</code> - 整数（-2, 0, 42 など）</li>
          <li><code className="text-blue-300">float</code> - 浮動小数点数（3.14 など）</li>
          <li><code className="text-blue-300">bool</code> - 論理値（true / false）</li>
          <li><code className="text-blue-300">array</code> - 配列</li>
          <li><code className="text-blue-300">null</code> - 値なし</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本型の確認</h2>
        <p className="text-gray-400 mb-4"><code className="text-blue-300">gettype()</code>で変数の型を確認できます。<code className="text-blue-300">var_dump()</code>は型と値を両方表示します。</p>
        <PhpEditor
          defaultCode={`<?php\n$str = "こんにちは";\n$num = 42;\n$pi = 3.14;\n$flag = true;\n$nothing = null;\n\necho gettype($str) . "\\n";\necho gettype($num) . "\\n";\necho gettype($pi) . "\\n";\necho gettype($flag) . "\\n";\necho gettype($nothing);`}
          expectedOutput={`string\ninteger\ndouble\nboolean\nNULL`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">var_dumpで詳細確認</h2>
        <p className="text-gray-400 mb-4"><code className="text-blue-300">var_dump()</code>は変数の型と値を同時に表示するデバッグに便利な関数です。</p>
        <PhpEditor
          defaultCode={`<?php\n$name = "PHP";\n$version = 8;\n$isGreat = true;\n\nvar_dump($name);\nvar_dump($version);\nvar_dump($isGreat);`}
          expectedOutput={`string(3) "PHP"\nint(8)\nbool(true)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列とnull</h2>
        <p className="text-gray-400 mb-4">配列は複数の値をまとめて格納できます。nullは値が存在しないことを表します。</p>
        <PhpEditor
          defaultCode={`<?php\n$colors = ["赤", "青", "緑"];\n$empty = null;\n\necho gettype($colors) . "\\n";\necho count($colors) . "個の要素\\n";\necho $colors[0] . "\\n";\necho gettype($empty) . "\\n";\nvar_dump(is_null($empty));`}
          expectedOutput={`array\n3個の要素\n赤\nNULL\nbool(true)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="data-types" />
      </div>
      <LessonNav lessons={lessons} currentId="data-types" basePath="/learn/basics" />
    </div>
  );
}

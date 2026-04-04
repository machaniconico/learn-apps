import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">PHP基礎 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">論理型</h1>
        <p className="text-gray-400">bool型の値と論理演算子（&&、||、!）の使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">論理型（bool）とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          論理型は<code className="text-blue-300">true</code>（真）または<code className="text-blue-300">false</code>（偽）の2つの値のみを持つ型です。条件式の結果として使われることが多いです。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">true</code> と <code className="text-blue-300">false</code> は大文字小文字を区別しない</li>
          <li>0、空文字列、null、空配列はfalseとして評価される（falsy値）</li>
          <li>論理演算子: <code className="text-blue-300">&amp;&amp;</code>（AND）、<code className="text-blue-300">||</code>（OR）、<code className="text-blue-300">!</code>（NOT）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">論理演算子の基本</h2>
        <p className="text-gray-400 mb-4">AND（&&）、OR（||）、NOT（!）演算子を使って条件を組み合わせます。</p>
        <PhpEditor
          defaultCode={`<?php\n$a = true;\n$b = false;\n\nvar_dump($a && $b);   // AND: 両方trueのときtrue\nvar_dump($a || $b);   // OR: どちらかtrueのときtrue\nvar_dump(!$a);        // NOT: trueをfalseに反転\nvar_dump(!$b);        // NOT: falseをtrueに反転`}
          expectedOutput={`bool(false)\nbool(true)\nbool(false)\nbool(true)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">truthyとfalsy</h2>
        <p className="text-gray-400 mb-4">PHPでは0、空文字列、null、空配列などがfalseとして評価されます。</p>
        <PhpEditor
          defaultCode={`<?php\n$values = [0, 1, "", "hello", null, [], [1, 2]];\n\nforeach ($values as $val) {\n    $result = $val ? "truthy" : "falsy";\n    echo var_export($val, true) . " => " . $result . "\\n";\n}`}
          expectedOutput={`0 => falsy\n1 => truthy\n'' => falsy\n'hello' => truthy\nNULL => falsy\narray (\n) => falsy\narray (\n  0 => 1,\n  1 => 2,\n) => truthy`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">比較演算子とbool</h2>
        <p className="text-gray-400 mb-4">比較演算子の結果はbool型になります。<code className="text-blue-300">==</code>は緩い比較、<code className="text-blue-300">===</code>は厳密な比較です。</p>
        <PhpEditor
          defaultCode={`<?php\n$x = 5;\n\nvar_dump($x > 3);    // true\nvar_dump($x == 5);   // true（緩い比較）\nvar_dump($x === "5"); // false（厳密比較：型も一致必要）\nvar_dump($x != 10);  // true\nvar_dump($x >= 5);   // true`}
          expectedOutput={`bool(true)\nbool(true)\nbool(false)\nbool(true)\nbool(true)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="boolean" />
      </div>
      <LessonNav lessons={lessons} currentId="boolean" basePath="/learn/basics" />
    </div>
  );
}

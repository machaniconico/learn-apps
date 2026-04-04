import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">PHP基礎 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">数値型</h1>
        <p className="text-gray-400">int型とfloat型の特徴、数値の操作と変換方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">PHPの数値型</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          PHPには整数を表す<code className="text-blue-300">int</code>型と小数を表す<code className="text-blue-300">float</code>型があります。数値計算には様々な組み込み関数が使えます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">int</code>: 整数（例: 42, -10, 0）</li>
          <li><code className="text-blue-300">float</code>: 浮動小数点数（例: 3.14, -0.5）</li>
          <li>整数同士の割り算は自動的にfloatになる場合がある</li>
          <li><code className="text-blue-300">PHP_INT_MAX</code>で整数の最大値を確認できる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">整数（int）の操作</h2>
        <p className="text-gray-400 mb-4">整数の四則演算と剰余（余り）の計算ができます。</p>
        <PhpEditor
          defaultCode={`<?php\n$a = 17;\n$b = 5;\n\necho $a + $b . "\\n";   // 加算\necho $a - $b . "\\n";   // 減算\necho $a * $b . "\\n";   // 乗算\necho $a / $b . "\\n";   // 除算\necho $a % $b . "\\n";   // 剰余\necho $a ** 2;           // べき乗`}
          expectedOutput={`22\n12\n85\n3.4\n2\n289`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">浮動小数点数（float）の操作</h2>
        <p className="text-gray-400 mb-4">小数点を含む数値の計算と、数学関数の使い方を学びます。</p>
        <PhpEditor
          defaultCode={`<?php\n$pi = 3.14159;\n$radius = 5.0;\n\n$area = $pi * $radius ** 2;\necho "円の面積: " . round($area, 2) . "\\n";\n\necho ceil(4.3) . "\\n";    // 切り上げ\necho floor(4.9) . "\\n";   // 切り捨て\necho abs(-15.7) . "\\n";   // 絶対値\necho sqrt(16);             // 平方根`}
          expectedOutput={`円の面積: 78.54\n5\n4\n15.7\n4`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">数値の変換と確認</h2>
        <p className="text-gray-400 mb-4"><code className="text-blue-300">is_int()</code>や<code className="text-blue-300">is_float()</code>で型を確認し、<code className="text-blue-300">intval()</code>や<code className="text-blue-300">floatval()</code>で変換できます。</p>
        <PhpEditor
          defaultCode={`<?php\n$strNum = "42";\n$floatNum = 3.99;\n\necho is_int($strNum) ? "整数" : "非整数";\necho "\\n";\necho intval($strNum) . "\\n";    // 文字列を整数に\necho intval($floatNum) . "\\n";  // floatを整数に（切り捨て）\necho number_format(1234567.891, 2, '.', ','); // 桁区切り`}
          expectedOutput={`非整数\n42\n3\n1,234,567.89`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="numeric-types" />
      </div>
      <LessonNav lessons={lessons} currentId="numeric-types" basePath="/learn/basics" />
    </div>
  );
}

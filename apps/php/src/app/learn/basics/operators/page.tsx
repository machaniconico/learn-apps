import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">PHP基礎 レッスン9</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">演算子</h1>
        <p className="text-gray-400">算術・比較・代入・論理演算子など、PHPで使える各種演算子を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">PHPの主な演算子</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          PHPには多くの演算子があります。値を計算したり、条件を判断したり、変数に値を代入したりするために使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>算術演算子: <code className="text-blue-300">+</code> <code className="text-blue-300">-</code> <code className="text-blue-300">*</code> <code className="text-blue-300">/</code> <code className="text-blue-300">%</code> <code className="text-blue-300">**</code></li>
          <li>比較演算子: <code className="text-blue-300">==</code> <code className="text-blue-300">===</code> <code className="text-blue-300">!=</code> <code className="text-blue-300">!==</code> <code className="text-blue-300">&lt;</code> <code className="text-blue-300">&gt;</code></li>
          <li>代入演算子: <code className="text-blue-300">=</code> <code className="text-blue-300">+=</code> <code className="text-blue-300">-=</code> <code className="text-blue-300">*=</code> <code className="text-blue-300">.=</code></li>
          <li>インクリメント/デクリメント: <code className="text-blue-300">++</code> <code className="text-blue-300">--</code></li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">算術演算子と代入演算子</h2>
        <p className="text-gray-400 mb-4">基本的な計算と複合代入演算子（+=, -=など）の使い方です。</p>
        <PhpEditor
          defaultCode={`<?php\n$x = 10;\n\n$x += 5;   echo $x . "\\n";  // 15\n$x -= 3;   echo $x . "\\n";  // 12\n$x *= 2;   echo $x . "\\n";  // 24\n$x /= 4;   echo $x . "\\n";  // 6\n$x **= 2;  echo $x . "\\n";  // 36\n$x %= 10;  echo $x;           // 6`}
          expectedOutput={`15\n12\n24\n6\n36\n6`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">比較演算子</h2>
        <p className="text-gray-400 mb-4"><code className="text-blue-300">==</code>は値のみ比較（型変換あり）、<code className="text-blue-300">===</code>は値と型の両方を比較します。</p>
        <PhpEditor
          defaultCode={`<?php\necho var_export(0 == "0", true) . "\\n";   // true (緩い比較)\necho var_export(0 === "0", true) . "\\n";  // false (厳密比較)\necho var_export(1 == true, true) . "\\n";  // true\necho var_export(1 === true, true) . "\\n"; // false\n\n// 宇宙船演算子 <=> (PHP 7+)\necho (1 <=> 2) . "\\n";   // -1 (左が小さい)\necho (2 <=> 2) . "\\n";   // 0 (等しい)\necho (3 <=> 2);            // 1 (左が大きい)`}
          expectedOutput={`true\nfalse\ntrue\nfalse\n-1\n0\n1`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">インクリメントとデクリメント</h2>
        <p className="text-gray-400 mb-4">前置と後置で動作が異なります。前置は先に変化し、後置は後から変化します。</p>
        <PhpEditor
          defaultCode={`<?php\n$a = 5;\necho $a++ . "\\n";  // 5（後置: 出力後にインクリメント）\necho $a . "\\n";    // 6\n\n$b = 5;\necho ++$b . "\\n";  // 6（前置: インクリメント後に出力）\necho $b . "\\n";    // 6\n\n$c = 10;\n$c--;\necho $c;            // 9`}
          expectedOutput={`5\n6\n6\n6\n9`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="operators" />
      </div>
      <LessonNav lessons={lessons} currentId="operators" basePath="/learn/basics" />
    </div>
  );
}

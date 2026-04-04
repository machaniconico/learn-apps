import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("closures");

export default function ClosureBasicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">クロージャ レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">クロージャの基本</h1>
        <p className="text-gray-400 leading-relaxed">
          クロージャ（無名関数）は名前のない関数で、変数に代入したり引数として渡したりできます。PHPでは<code className="text-purple-300">function</code>キーワードまたは<code className="text-purple-300">fn</code>で定義します。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-purple-400 mb-3">クロージャとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          クロージャは<strong className="text-white">第一級関数</strong>として扱える無名関数です。変数に代入、引数として渡す、関数の戻り値として返すことができます。
        </p>
        <ul className="text-gray-400 space-y-1 list-disc list-inside">
          <li>通常の無名関数: <code className="text-purple-300">function($x) {"{"} return $x * 2; {"}"}</code></li>
          <li>アロー関数（PHP 7.4+）: <code className="text-purple-300">fn($x) =&gt; $x * 2</code></li>
          <li><code className="text-purple-300">Closure</code>クラスのインスタンスとして扱われる</li>
        </ul>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">無名関数の定義と呼び出し</h2>
        <p className="text-gray-400 mb-4">
          変数に代入してから呼び出すか、即時実行することができます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// 変数に代入\n$double = function(int $n): int {\n    return $n * 2;\n};\n\n$greet = function(string $name): string {\n    return "こんにちは、{$name}さん！";\n};\n\necho $double(5) . "\\n";\necho $double(21) . "\\n";\necho $greet("田中") . "\\n";\n\n// 即時実行\n$result = (function(int $a, int $b) {\n    return $a + $b;\n})(10, 20);\necho $result;`}
          expectedOutput={`10\n42\nこんにちは、田中さん！\n30`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">アロー関数（fn構文）</h2>
        <p className="text-gray-400 mb-4">
          PHP 7.4以降のアロー関数は単一の式を簡潔に書けます。<code className="text-purple-300">return</code>不要で外側の変数を自動キャプチャします。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$double  = fn($n) => $n * 2;\n$square  = fn($n) => $n ** 2;\n$isEven  = fn($n) => $n % 2 === 0;\n\necho $double(7) . "\\n";\necho $square(6) . "\\n";\necho ($isEven(4) ? "偶数" : "奇数") . "\\n";\necho ($isEven(9) ? "偶数" : "奇数") . "\\n";\n\n// 型付きアロー関数\n$add = fn(int $a, int $b): int => $a + $b;\necho $add(15, 27);`}
          expectedOutput={`14\n36\n偶数\n奇数\n42`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">関数を返す関数（高階関数）</h2>
        <p className="text-gray-400 mb-4">
          関数がクロージャを返すことで、カスタマイズ可能な関数を生成できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\nfunction makeMultiplier(int $factor): Closure {\n    return fn(int $n) => $n * $factor;\n}\n\n$double  = makeMultiplier(2);\n$triple  = makeMultiplier(3);\n$times10 = makeMultiplier(10);\n\necho $double(5)  . "\\n";\necho $triple(5)  . "\\n";\necho $times10(5) . "\\n";\n\n// チェーン\necho $double($triple(4));`}
          expectedOutput={`10\n15\n50\n24`}
        />
      </section>

      <LessonCompleteButton categoryId="closures" lessonId="closure-basics" />
      <LessonNav lessons={lessons} currentId="closure-basics" basePath="/learn/closures" />
    </div>
  );
}

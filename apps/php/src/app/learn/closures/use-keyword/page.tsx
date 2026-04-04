import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("closures");

export default function UseKeywordPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">クロージャ レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">useキーワード</h1>
        <p className="text-gray-400 leading-relaxed">
          <code className="text-purple-300">use</code>キーワードを使うと、クロージャの外側のスコープにある変数をクロージャ内に取り込めます。値渡しと参照渡しの違いも理解しましょう。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-purple-400 mb-3">useキーワードとスコープ</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          通常の無名関数はデフォルトで外側のスコープの変数にアクセスできません。<code className="text-purple-300">use ($var)</code>で値をコピーして取り込みます。<code className="text-purple-300">use (&amp;$var)</code>で参照渡しにすると外側の変数を変更できます。
        </p>
        <ul className="text-gray-400 space-y-1 list-disc list-inside">
          <li>値渡し: <code className="text-purple-300">use ($x)</code> — クロージャ定義時の値をコピー</li>
          <li>参照渡し: <code className="text-purple-300">use (&amp;$x)</code> — 外側の変数への参照を共有</li>
          <li>アロー関数は自動的に外側の変数をキャプチャ（useは不要）</li>
        </ul>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">useで変数をキャプチャ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-300">use</code>で外側の変数をクロージャ内に取り込みます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$prefix = "商品";\n$tax    = 1.1;\n\n$formatItem = function(string $name, int $price) use ($prefix, $tax): string {\n    $taxed = (int)($price * $tax);\n    return "{$prefix}: {$name} ({$taxed}円税込)";\n};\n\necho $formatItem("りんご", 100) . "\\n";\necho $formatItem("バナナ",  80) . "\\n";\necho $formatItem("みかん", 120);`}
          expectedOutput={`商品: りんご (110円税込)\n商品: バナナ (88円税込)\n商品: みかん (132円税込)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">参照渡しによる変数の変更</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-300">use (&amp;$var)</code>で参照渡しにすると、クロージャ内から外側の変数を変更できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$count = 0;\n\n$increment = function() use (&$count): void {\n    $count++;\n};\n\n$increment();\n$increment();\n$increment();\necho "カウント: $count\\n";\n\n// カウンター生成器\nfunction makeCounter(): array {\n    $n = 0;\n    $inc = function() use (&$n) { $n++; };\n    $get = function() use (&$n) { return $n; };\n    return [$inc, $get];\n}\n\n[$inc, $get] = makeCounter();\n$inc(); $inc(); $inc(); $inc();\necho "カウンター: " . $get();`}
          expectedOutput={`カウント: 3\nカウンター: 4`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">アロー関数の自動キャプチャ</h2>
        <p className="text-gray-400 mb-4">
          アロー関数（<code className="text-purple-300">fn</code>）はuseなしで外側の変数を自動的に値渡しでキャプチャします。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$multiplier = 3;\n$offset     = 10;\n\n// useなしで外側の変数を使える\n$calc = fn($n) => $n * $multiplier + $offset;\n\necho $calc(5)  . "\\n";\necho $calc(10) . "\\n";\necho $calc(0)  . "\\n";\n\n// ネストしたアロー関数\n$adder = fn($a) => fn($b) => $a + $b;\n$add5  = $adder(5);\necho $add5(3) . "\\n";\necho $add5(10);`}
          expectedOutput={`25\n40\n10\n8\n15`}
        />
      </section>

      <LessonCompleteButton categoryId="closures" lessonId="use-keyword" />
      <LessonNav lessons={lessons} currentId="use-keyword" basePath="/learn/closures" />
    </div>
  );
}

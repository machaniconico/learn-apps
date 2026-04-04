import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("types");

export default function StrictTypesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">型システム レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">strict_types</h1>
        <p className="text-gray-400 leading-relaxed">
          <code className="text-teal-300">declare(strict_types=1)</code>を宣言すると、PHPは型の自動変換（型ジャグリング）を行わず、厳密な型チェックを強制します。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-teal-400 mb-3">strict_typesとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          デフォルトのPHPは型宣言があっても暗黙の型変換を行います。例えばint型引数に文字列<code className="text-teal-300">"5"</code>を渡すと自動で<code className="text-teal-300">5</code>に変換されます。<code className="text-teal-300">strict_types=1</code>ではこの変換を禁止し、型不一致はTypeErrorになります。
        </p>
        <ul className="text-gray-400 space-y-1 list-disc list-inside">
          <li>ファイルの先頭行に書く必要がある</li>
          <li>宣言したファイル内の関数呼び出しにのみ適用される</li>
          <li>型安全なコードを書く際の重要な設定</li>
        </ul>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">strict_typesの効果</h2>
        <p className="text-gray-400 mb-4">
          strict_typesを有効にすると、型宣言に厳密に従った値のみ受け付けます。
        </p>
        <PhpEditor
          defaultCode={`<?php\ndeclare(strict_types=1);\n\nfunction multiply(int $a, int $b): int {\n    return $a * $b;\n}\n\n// 正しい型を渡す\necho multiply(3, 4) . "\\n";\necho multiply(10, 5) . "\\n";\n\n// strict_types=1 なしなら "3" は自動変換されるが\n// strict_types=1 では int のみ受け付ける\n$x = 6;\n$y = 7;\necho multiply($x, $y);`}
          expectedOutput={`12\n50\n42`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">型ジャグリングとの比較</h2>
        <p className="text-gray-400 mb-4">
          strict_typesなしの場合とありの場合の動作の違いを理解しましょう。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// strict_types なし（デフォルト）\nfunction sumLoose(int $a, int $b): int {\n    return $a + $b;\n}\n\n// "5" は自動的に 5 (int) に変換される\necho sumLoose(3, 4) . "\\n";\n\n// 型チェックせずに処理を進める例\nfunction formatScore(int $score): string {\n    if ($score >= 90) return "優";\n    if ($score >= 70) return "良";\n    if ($score >= 60) return "可";\n    return "不可";\n}\n\necho formatScore(95) . "\\n";\necho formatScore(75) . "\\n";\necho formatScore(55);`}
          expectedOutput={`7\n優\n良\n不可`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">mixed型とnever型</h2>
        <p className="text-gray-400 mb-4">
          PHP 8の<code className="text-teal-300">mixed</code>型は任意の型を受け付け、<code className="text-teal-300">never</code>型は関数が戻らないことを示します。
        </p>
        <PhpEditor
          defaultCode={`<?php\ndeclare(strict_types=1);\n\nfunction inspect(mixed $value): string {\n    return gettype($value) . ": " . var_export($value, true);\n}\n\necho inspect(42) . "\\n";\necho inspect("hello") . "\\n";\necho inspect(true) . "\\n";\necho inspect([1, 2, 3]) . "\\n";\necho inspect(null);`}
          expectedOutput={`integer: 42\nstring: 'hello'\nboolean: true\narray: array (\n  0 => 1,\n  1 => 2,\n  2 => 3,\n)\nNULL: NULL`}
        />
      </section>

      <LessonCompleteButton categoryId="types" lessonId="strict-types" />
      <LessonNav lessons={lessons} currentId="strict-types" basePath="/learn/types" />
    </div>
  );
}

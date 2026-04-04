import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("types");

export default function UnionTypesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">型システム レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">ユニオン型</h1>
        <p className="text-gray-400 leading-relaxed">
          PHP 8で導入されたユニオン型（Union Types）を使うと、複数の型のいずれかを受け入れる引数や戻り値を宣言できます。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-teal-400 mb-3">ユニオン型とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          ユニオン型は<code className="text-teal-300">型A|型B</code>のように<code className="text-teal-300">|</code>（パイプ）でつないで複数の型を指定します。指定した型のいずれかが渡されれば型チェックを通過します。
        </p>
        <ul className="text-gray-400 space-y-1 list-disc list-inside">
          <li>PHP 8.0以降で使用可能</li>
          <li>2つ以上の型を組み合わせられる</li>
          <li>nullableも <code className="text-teal-300">null|string</code> と書ける</li>
        </ul>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">基本的なユニオン型</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">int|string</code>のように書くと、整数または文字列の両方を受け入れます。
        </p>
        <PhpEditor
          defaultCode={`<?php\nfunction formatId(int|string $id): string {\n    return "ID: " . $id;\n}\n\nfunction processInput(int|float $value): string {\n    return "値: " . round($value, 2);\n}\n\necho formatId(42) . "\\n";\necho formatId("abc-123") . "\\n";\necho processInput(3.14159) . "\\n";\necho processInput(100);`}
          expectedOutput={`ID: 42\nID: abc-123\n値: 3.14\n値: 100`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ユニオン型と型チェック</h2>
        <p className="text-gray-400 mb-4">
          ユニオン型を受け取った関数内では<code className="text-teal-300">is_int()</code>などで型を判定して処理を分岐できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\nfunction double(int|float $n): int|float {\n    return $n * 2;\n}\n\nfunction stringify(int|float|string $val): string {\n    if (is_int($val)) {\n        return "整数: " . $val;\n    } elseif (is_float($val)) {\n        return "小数: " . $val;\n    } else {\n        return "文字列: " . $val;\n    }\n}\n\necho double(5) . "\\n";\necho double(2.5) . "\\n";\necho stringify(42) . "\\n";\necho stringify(3.14) . "\\n";\necho stringify("hello");`}
          expectedOutput={`10\n5\n整数: 42\n小数: 3.14\n文字列: hello`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">戻り値のユニオン型</h2>
        <p className="text-gray-400 mb-4">
          関数が複数の型を返す可能性がある場合、戻り値にもユニオン型を使います。
        </p>
        <PhpEditor
          defaultCode={`<?php\nfunction divide(int $a, int $b): int|float|string {\n    if ($b === 0) {\n        return "ゼロ除算エラー";\n    }\n    $result = $a / $b;\n    return is_int($result) ? $result : round($result, 3);\n}\n\necho divide(10, 2) . "\\n";\necho divide(10, 3) . "\\n";\necho divide(7, 0);`}
          expectedOutput={`5\n3.333\nゼロ除算エラー`}
        />
      </section>

      <LessonCompleteButton categoryId="types" lessonId="union-types" />
      <LessonNav lessons={lessons} currentId="union-types" basePath="/learn/types" />
    </div>
  );
}

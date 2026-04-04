import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">PHP基礎 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">型キャスト</h1>
        <p className="text-gray-400">明示的・暗黙的な型変換とsettype関数を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">型変換とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          型変換（型キャスト）とは、ある型の値を別の型に変換することです。PHPでは明示的に型を指定するキャスト演算子と、自動で変換される暗黙的な型変換があります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">(int)</code> または <code className="text-blue-300">(integer)</code>: 整数に変換</li>
          <li><code className="text-blue-300">(float)</code> または <code className="text-blue-300">(double)</code>: 浮動小数点数に変換</li>
          <li><code className="text-blue-300">(string)</code>: 文字列に変換</li>
          <li><code className="text-blue-300">(bool)</code>: 論理値に変換</li>
          <li><code className="text-blue-300">(array)</code>: 配列に変換</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">キャスト演算子による型変換</h2>
        <p className="text-gray-400 mb-4">値の前に<code className="text-blue-300">(型名)</code>を書くことで明示的に型を変換します。</p>
        <PhpEditor
          defaultCode={`<?php\n$strNum = "42.7abc";\n\necho (int)$strNum . "\\n";     // 整数に変換\necho (float)$strNum . "\\n";   // floatに変換\necho (bool)$strNum . "\\n";    // boolに変換\necho (string)true . "\\n";     // 文字列に変換\necho (string)false . "\\n";    // 空文字列になる\nvar_dump((array)"hello");      // 配列に変換`}
          expectedOutput={`42\n42.7\n1\n1\n\narray(1) {\n  [0]=>\n  string(5) "hello"\n}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">変換関数の使い方</h2>
        <p className="text-gray-400 mb-4"><code className="text-blue-300">intval()</code>、<code className="text-blue-300">floatval()</code>、<code className="text-blue-300">strval()</code>などの変換関数も使えます。</p>
        <PhpEditor
          defaultCode={`<?php\n$price = "1980円";\n$rate = "0.08";\n\n$priceNum = intval($price);\n$rateNum = floatval($rate);\n$tax = $priceNum * $rateNum;\n\necho "価格: " . $priceNum . "円\\n";\necho "税率: " . $rateNum * 100 . "%\\n";\necho "消費税: " . (int)$tax . "円\\n";\necho "税込: " . ($priceNum + (int)$tax) . "円";`}
          expectedOutput={`価格: 1980円\n税率: 8%\n消費税: 158円\n税込: 2138円`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">settype関数</h2>
        <p className="text-gray-400 mb-4"><code className="text-blue-300">settype()</code>は変数の型を直接変更します。キャスト演算子と違い、元の変数自体が変換されます。</p>
        <PhpEditor
          defaultCode={`<?php\n$value = "123";\necho gettype($value) . ": " . $value . "\\n";\n\nsettype($value, "integer");\necho gettype($value) . ": " . $value . "\\n";\n\nsettype($value, "float");\necho gettype($value) . ": " . $value . "\\n";\n\nsettype($value, "string");\necho gettype($value) . ": " . $value;`}
          expectedOutput={`string: 123\ninteger: 123\ndouble: 123\nstring: 123`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="type-casting" />
      </div>
      <LessonNav lessons={lessons} currentId="type-casting" basePath="/learn/basics" />
    </div>
  );
}

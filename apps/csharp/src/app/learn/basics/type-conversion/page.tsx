import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function TypeConversionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">C#基礎 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">型変換</h1>
        <p className="text-gray-400">暗黙的・明示的キャスト、Convertクラス、Parse/TryParseを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">暗黙的変換（Implicit Conversion）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          データが失われない変換は<strong className="text-white">暗黙的</strong>に行われます。小さい型から大きい型への変換が自動的に行われます。
          例えば <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">int</code> から
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">long</code>、
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">float</code> から
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">double</code> への変換などです。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">暗黙的・明示的キャスト</h2>
        <p className="text-gray-400 mb-4">大きい型から小さい型への変換は明示的キャストが必要です。</p>
        <CSharpEditor
          defaultCode={`// 暗黙的変換（自動）
int intVal = 100;
long longVal = intVal;    // int -> long（自動）
double doubleVal = intVal; // int -> double（自動）

Console.WriteLine($"int: {intVal}");
Console.WriteLine($"long: {longVal}");
Console.WriteLine($"double: {doubleVal}");

// 明示的キャスト（データが失われる可能性）
double pi = 3.14159;
int truncated = (int)pi;  // 小数部が切り捨て
Console.WriteLine($"double: {pi}");
Console.WriteLine($"int（切り捨て）: {truncated}");

// オーバーフローに注意
long bigNum = 3_000_000_000L;
int overflow = (int)bigNum;  // データが失われる
Console.WriteLine($"long: {bigNum}");
Console.WriteLine($"int（オーバーフロー）: {overflow}");`}
          expectedOutput={`int: 100
long: 100
double: 100
double: 3.14159
int（切り捨て）: 3
long: 3000000000
int（オーバーフロー）: -1294967296`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Convert クラスと Parse/TryParse</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          文字列と数値の変換には <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">Convert</code> クラスや
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">int.Parse()</code>、
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">int.TryParse()</code> を使います。
          ユーザー入力の処理では <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">TryParse</code> が安全です（例外が発生しない）。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Parse と TryParse</h2>
        <p className="text-gray-400 mb-4">TryParseは変換の成否をboolで返し、例外が起きません。</p>
        <CSharpEditor
          defaultCode={`// Parse: 失敗すると例外が発生
string numStr = "42";
int parsed = int.Parse(numStr);
Console.WriteLine($"Parse: {parsed}");

// TryParse: 失敗してもOK
string input1 = "123";
string input2 = "abc";

if (int.TryParse(input1, out int result1))
{
    Console.WriteLine($"変換成功: {result1}");
}

if (!int.TryParse(input2, out int result2))
{
    Console.WriteLine($"変換失敗: \"{input2}\" は数値ではありません");
}

// Convert クラス
string boolStr = "True";
bool boolVal = Convert.ToBoolean(boolStr);
double doubleVal = Convert.ToDouble("3.14");
Console.WriteLine($"bool: {boolVal}");
Console.WriteLine($"double: {doubleVal}");`}
          expectedOutput={`Parse: 42
変換成功: 123
変換失敗: "abc" は数値ではありません
bool: True
double: 3.14`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="type-conversion" />
      </div>
      <LessonNav lessons={lessons} currentId="type-conversion" basePath="/learn/basics" />
    </div>
  );
}

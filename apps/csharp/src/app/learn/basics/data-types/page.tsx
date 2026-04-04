import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function DataTypesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">C#基礎 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">データ型</h1>
        <p className="text-gray-400">値型と参照型の違い、C#の型システムの概要を理解しましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">値型 vs 参照型</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C#のすべての型は<strong className="text-white">値型（Value Type）</strong>か<strong className="text-white">参照型（Reference Type）</strong>のどちらかです。
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-purple-500/30">
            <h3 className="text-purple-400 font-semibold mb-2">値型（Value Type）</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-2">変数が値そのものを保持します。スタックに格納されます。</p>
            <ul className="text-gray-400 text-sm space-y-1">
              <li><code className="text-purple-400">int, long, short, byte</code></li>
              <li><code className="text-purple-400">float, double, decimal</code></li>
              <li><code className="text-purple-400">bool, char</code></li>
              <li><code className="text-purple-400">struct, enum</code></li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-purple-500/30">
            <h3 className="text-purple-400 font-semibold mb-2">参照型（Reference Type）</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-2">変数がオブジェクトへの参照（アドレス）を保持します。ヒープに格納されます。</p>
            <ul className="text-gray-400 text-sm space-y-1">
              <li><code className="text-purple-400">string</code></li>
              <li><code className="text-purple-400">class</code></li>
              <li><code className="text-purple-400">配列（int[]など）</code></li>
              <li><code className="text-purple-400">interface, delegate</code></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">値型の代入（コピー）</h2>
        <p className="text-gray-400 mb-4">値型を別の変数に代入すると、値がコピーされます。元の変数に影響しません。</p>
        <CSharpEditor
          defaultCode={`// 値型はコピーされる
int a = 10;
int b = a;  // aの値がbにコピーされる
b = 20;     // bを変更してもaは変わらない

Console.WriteLine($"a = {a}");  // 10のまま
Console.WriteLine($"b = {b}");  // 20

// 構造体も値型
System.DateTime today = System.DateTime.Today;
System.DateTime tomorrow = today.AddDays(1);
Console.WriteLine($"今日: {today:yyyy/MM/dd}");
Console.WriteLine($"明日: {tomorrow:yyyy/MM/dd}");`}
          expectedOutput={`a = 10
b = 20
今日: 2026/04/01
明日: 2026/04/02`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">参照型の代入（参照の共有）</h2>
        <p className="text-gray-400 mb-4">参照型を別の変数に代入すると、同じオブジェクトを参照します。</p>
        <CSharpEditor
          defaultCode={`// 配列は参照型
int[] array1 = { 1, 2, 3 };
int[] array2 = array1;  // 同じ配列を参照

array2[0] = 99;  // array2を通じて変更
Console.WriteLine($"array1[0] = {array1[0]}");  // 99（同じオブジェクト）
Console.WriteLine($"array2[0] = {array2[0]}");  // 99

// stringは参照型だが、イミュータブル（変更不可）
string s1 = "Hello";
string s2 = s1;
s2 = "World";  // s2に新しいオブジェクトを代入
Console.WriteLine($"s1 = {s1}");  // Hello（変わらない）
Console.WriteLine($"s2 = {s2}");  // World`}
          expectedOutput={`array1[0] = 99
array2[0] = 99
s1 = Hello
s2 = World`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="data-types" />
      </div>
      <LessonNav lessons={lessons} currentId="data-types" basePath="/learn/basics" />
    </div>
  );
}

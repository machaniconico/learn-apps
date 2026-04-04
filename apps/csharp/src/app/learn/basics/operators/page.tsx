import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function OperatorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">C#基礎 レッスン11</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">演算子</h1>
        <p className="text-gray-400">算術・比較・論理・代入・null演算子を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">算術演算子</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          基本的な数学的計算を行う演算子です。整数同士の除算は結果も整数になる点に注意しましょう。
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-sm">
          {[
            { op: "+", desc: "加算" }, { op: "-", desc: "減算" }, { op: "*", desc: "乗算" },
            { op: "/", desc: "除算" }, { op: "%", desc: "剰余" }, { op: "**", desc: "（なし）" },
          ].map(({ op, desc }) => (
            <div key={op} className="p-2 bg-gray-900 rounded text-center">
              <code className="text-purple-400 block text-base">{op}</code>
              <span className="text-gray-400 text-xs">{desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">算術・インクリメント演算子</h2>
        <p className="text-gray-400 mb-4">算術演算と複合代入演算子を使ってみましょう。</p>
        <CSharpEditor
          defaultCode={`int a = 10, b = 3;

Console.WriteLine($"a + b = {a + b}");
Console.WriteLine($"a - b = {a - b}");
Console.WriteLine($"a * b = {a * b}");
Console.WriteLine($"a / b = {a / b}");   // 整数除算
Console.WriteLine($"a % b = {a % b}");   // 余り
Console.WriteLine($"(double)a / b = {(double)a / b:F4}"); // 浮動小数点除算

// 複合代入演算子
int x = 10;
x += 5;  Console.WriteLine($"x += 5: {x}");
x -= 3;  Console.WriteLine($"x -= 3: {x}");
x *= 2;  Console.WriteLine($"x *= 2: {x}");
x /= 4;  Console.WriteLine($"x /= 4: {x}");

// インクリメント・デクリメント
int count = 0;
Console.WriteLine($"count++: {count++}"); // 後置（使った後に増加）
Console.WriteLine($"++count: {++count}"); // 前置（増加してから使う）`}
          expectedOutput={`a + b = 13
a - b = 7
a * b = 30
a / b = 3
a % b = 1
(double)a / b = 3.3333
x += 5: 15
x -= 3: 12
x *= 2: 24
x /= 4: 6
count++: 0
++count: 2`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">比較演算子と論理演算子</h2>
        <p className="text-gray-400 mb-4">比較・論理演算子はすべてbool値を返します。</p>
        <CSharpEditor
          defaultCode={`int score = 75;

// 比較演算子
Console.WriteLine($"75 == 75: {score == 75}");
Console.WriteLine($"75 != 80: {score != 80}");
Console.WriteLine($"75 > 60: {score > 60}");
Console.WriteLine($"75 < 100: {score < 100}");
Console.WriteLine($"75 >= 75: {score >= 75}");
Console.WriteLine($"75 <= 74: {score <= 74}");

// 論理演算子
bool isPassing = score >= 60 && score <= 100;
bool isSpecial = score < 50 || score >= 90;
bool isNotPerfect = !(score == 100);

Console.WriteLine($"合格: {isPassing}");
Console.WriteLine($"特別: {isSpecial}");
Console.WriteLine($"満点でない: {isNotPerfect}");`}
          expectedOutput={`75 == 75: True
75 != 80: True
75 > 60: True
75 < 100: True
75 >= 75: True
75 <= 74: False
合格: True
特別: False
満点でない: True`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="operators" />
      </div>
      <LessonNav lessons={lessons} currentId="operators" basePath="/learn/basics" />
    </div>
  );
}

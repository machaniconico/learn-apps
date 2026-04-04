import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("methods");

export default function MethodsExpressionBodyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">メソッド レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">式本体メソッド</h1>
        <p className="text-gray-400">{"=>"} 構文を使って単一式のメソッドを簡潔に記述する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">式本体メソッドとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-white">式本体メソッド（Expression-bodied method）</strong>は C# 6 で導入された構文で、
          単一の式からなるメソッドをより簡潔に書けます。
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-400">{`=>`}</code> 演算子を使います。
        </p>
        <div className="space-y-3">
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-2">通常の書き方</p>
            <code className="text-gray-300 font-mono text-sm">
              {`static int Double(int x) { return x * 2; }`}
            </code>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-xs text-teal-400 mb-2">式本体の書き方</p>
            <code className="text-gray-300 font-mono text-sm">
              {`static int Double(int x) => x * 2;`}
            </code>
          </div>
        </div>
        <p className="text-gray-300 leading-relaxed mt-4">
          void メソッドにも使えます。その場合、<code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-400">return</code> は不要です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">式本体メソッドの使用例</h2>
        <CSharpEditor
          defaultCode={`using System;

class MathUtils
{
    // 式本体メソッド（戻り値あり）
    public static int Square(int x) => x * x;
    public static int Cube(int x) => x * x * x;
    public static double Average(double a, double b) => (a + b) / 2;
    public static bool IsPositive(int n) => n > 0;
    public static string Negate(bool b) => b ? "いいえ" : "はい";

    // void の式本体メソッド
    public static void Print(string msg) => Console.WriteLine(msg);
}

class Program
{
    static void Main()
    {
        Console.WriteLine($"5の2乗: {MathUtils.Square(5)}");
        Console.WriteLine($"3の3乗: {MathUtils.Cube(3)}");
        Console.WriteLine($"平均(4, 8): {MathUtils.Average(4, 8)}");
        Console.WriteLine($"正の数？ -3: {MathUtils.IsPositive(-3)}");
        MathUtils.Print("式本体メソッドはシンプル！");
    }
}`}
          expectedOutput={`5の2乗: 25
3の3乗: 27
平均(4, 8): 6
正の数？ -3: False
式本体メソッドはシンプル！`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">プロパティ・コンストラクタへの応用</h2>
        <CSharpEditor
          defaultCode={`using System;

class Circle
{
    private readonly double _radius;

    // コンストラクタも式本体で書ける
    public Circle(double radius) => _radius = radius;

    // プロパティの get も式本体
    public double Radius => _radius;
    public double Diameter => _radius * 2;
    public double Area => Math.PI * _radius * _radius;
    public double Circumference => 2 * Math.PI * _radius;

    public override string ToString() =>
        $"Circle(radius={_radius:F1}, area={Area:F2})";
}

class Program
{
    static void Main()
    {
        var c = new Circle(5.0);
        Console.WriteLine($"半径: {c.Radius}");
        Console.WriteLine($"直径: {c.Diameter}");
        Console.WriteLine($"面積: {c.Area:F2}");
        Console.WriteLine($"円周: {c.Circumference:F2}");
        Console.WriteLine(c);
    }
}`}
          expectedOutput={`半径: 5
直径: 10
面積: 78.54
円周: 31.42
Circle(radius=5.0, area=78.54)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="methods" lessonId="expression-body" />
      </div>
      <LessonNav lessons={lessons} currentId="expression-body" basePath="/learn/methods" />
    </div>
  );
}

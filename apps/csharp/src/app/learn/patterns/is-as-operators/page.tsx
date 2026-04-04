import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("patterns");

export default function PatternsIsAsOperatorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">パターンマッチング レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">is・as演算子</h1>
        <p className="text-gray-400">isによる型チェック、asによる安全なキャスト、nullチェックを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">is と as の違い</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-violet-400 bg-gray-800 px-1.5 py-0.5 rounded">is</code>は型チェックを行いbool値を返します。変数への代入（パターン変数）も同時に行えます。
          <code className="text-violet-400 bg-gray-800 px-1.5 py-0.5 rounded">as</code>は型キャストを行い、失敗した場合はnullを返します（例外はスローしない）。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">isによる型チェックとパターン変数</h2>
        <p className="text-gray-400 mb-4">C# 7.0以降、isで型チェックと変数宣言を同時に行えます。</p>
        <CSharpEditor
          defaultCode={`// is 演算子の使い方

// 基底クラスと派生クラス
abstract class Shape
{
    public abstract double Area();
}

class Circle : Shape
{
    public double Radius { get; set; }
    public override double Area() => Math.PI * Radius * Radius;
}

class Rectangle : Shape
{
    public double Width { get; set; }
    public double Height { get; set; }
    public override double Area() => Width * Height;
}

// テストデータ
Shape[] shapes =
{
    new Circle { Radius = 5 },
    new Rectangle { Width = 4, Height = 6 },
    new Circle { Radius = 3 },
};

foreach (Shape shape in shapes)
{
    // C# 7.0以降: is + パターン変数（型チェックと変数宣言を同時）
    if (shape is Circle circle)
    {
        Console.WriteLine($"円: 半径={circle.Radius:F1}, 面積={circle.Area():F2}");
    }
    else if (shape is Rectangle rect)
    {
        Console.WriteLine($"長方形: {rect.Width}x{rect.Height}, 面積={rect.Area():F2}");
    }
}`}
          expectedOutput={`円: 半径=5.0, 面積=78.54
長方形: 4x6, 面積=24.00
円: 半径=3.0, 面積=28.27`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">as演算子と安全なキャスト</h2>
        <p className="text-gray-400 mb-4">asはキャスト失敗時にnullを返すため、例外を避けられます。</p>
        <CSharpEditor
          defaultCode={`// as 演算子 vs キャスト演算子 ()

object[] items = { "文字列", 42, 3.14, null, "もう一つの文字列" };

Console.WriteLine("as演算子（失敗時はnull）:");
foreach (object? item in items)
{
    string? str = item as string;
    if (str != null)
    {
        Console.WriteLine($"  文字列: \"{str}\" (長さ:{str.Length})");
    }
}

Console.WriteLine();
Console.WriteLine("asとisの使い分け:");
Console.WriteLine();

// isの方が推奨（変数も宣言できる）
Console.WriteLine("// 推奨: is + パターン変数");
Console.WriteLine("if (item is string s)");
Console.WriteLine("{");
Console.WriteLine("    Console.WriteLine(s.ToUpper());");
Console.WriteLine("}");

Console.WriteLine();
Console.WriteLine("// 非推奨: asと後続nullチェック");
Console.WriteLine("string? s = item as string;");
Console.WriteLine("if (s != null) { ... }");

// キャスト演算子は確実に変換できる場合のみ
Console.WriteLine();
object num = 42;
// 確実にintなので直接キャスト可
int intValue = (int)num;
Console.WriteLine($"直接キャスト: {intValue}");`}
          expectedOutput={`as演算子（失敗時はnull）:
  文字列: "文字列" (長さ:3)
  文字列: "もう一つの文字列" (長さ:8)

asとisの使い分け:

// 推奨: is + パターン変数
if (item is string s)
{
    Console.WriteLine(s.ToUpper());
}

// 非推奨: asと後続nullチェック
string? s = item as string;
if (s != null) { ... }

直接キャスト: 42`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="patterns" lessonId="is-as-operators" />
      </div>
      <LessonNav lessons={lessons} currentId="is-as-operators" basePath="/learn/patterns" />
    </div>
  );
}

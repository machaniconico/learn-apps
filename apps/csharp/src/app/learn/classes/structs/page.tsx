import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function StructsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">クラス基礎 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">構造体</h1>
        <p className="text-gray-400">struct と class の違い、値型セマンティクス、struct を使うべき場面</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">struct vs class</h2>
        <p className="text-gray-400 mb-3">
          <code className="text-green-400">struct</code> は <strong className="text-white">値型</strong>で、
          <code className="text-green-400">class</code> は <strong className="text-white">参照型</strong>です。
          この違いがコピーの動作・メモリ配置・パフォーマンスに大きく影響します。
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="p-3 rounded bg-gray-800">
            <p className="text-green-400 font-semibold mb-2">struct（値型）</p>
            <ul className="text-gray-400 space-y-1">
              <li>スタックに確保（小さなデータ）</li>
              <li>代入でコピーが作成される</li>
              <li>null にできない（Nullable を除く）</li>
              <li>継承できない</li>
            </ul>
          </div>
          <div className="p-3 rounded bg-gray-800">
            <p className="text-green-400 font-semibold mb-2">class（参照型）</p>
            <ul className="text-gray-400 space-y-1">
              <li>ヒープに確保</li>
              <li>代入で参照がコピーされる</li>
              <li>null になれる</li>
              <li>継承できる</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">値型セマンティクスの理解</h2>
        <p className="text-gray-400 mb-4">
          struct は代入時にコピーが作成されるため、コピー後に元の値を変更しても相手に影響しません。
          これが「値型セマンティクス」です。
        </p>
        <CSharpEditor
          defaultCode={`using System;

struct Point
{
    public int X;
    public int Y;

    public Point(int x, int y)
    {
        X = x;
        Y = y;
    }

    public override string ToString() => $"({X}, {Y})";
}

class Program
{
    static void Main()
    {
        var p1 = new Point(1, 2);
        var p2 = p1; // コピーが作成される

        p2.X = 99; // p1 には影響しない

        Console.WriteLine($"p1: {p1}"); // 変わらない
        Console.WriteLine($"p2: {p2}"); // 99 になっている

        // .NET の組み込み struct の例
        DateTime d1 = new DateTime(2025, 1, 1);
        DateTime d2 = d1.AddDays(30);
        Console.WriteLine($"d1: {d1:yyyy/MM/dd}");
        Console.WriteLine($"d2: {d2:yyyy/MM/dd}");
    }
}`}
          expectedOutput={`p1: (1, 2)
p2: (99, 2)
d1: 2025/01/01
d2: 2025/01/31`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">readonly struct</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-400">readonly struct</code> はすべてのフィールドが読み取り専用のイミュータブルな構造体です。
          コンパイラの最適化が効きやすく、スレッドセーフです。C# の <code className="text-green-400">DateTime</code>・<code className="text-green-400">TimeSpan</code> などが例です。
        </p>
        <CSharpEditor
          defaultCode={`using System;

readonly struct Vector2D
{
    public double X { get; }
    public double Y { get; }

    public Vector2D(double x, double y)
    {
        X = x;
        Y = y;
    }

    public double Length => Math.Sqrt(X * X + Y * Y);

    // 演算子オーバーロード
    public static Vector2D operator +(Vector2D a, Vector2D b)
        => new Vector2D(a.X + b.X, a.Y + b.Y);

    public override string ToString() => $"({X}, {Y})";
}

class Program
{
    static void Main()
    {
        var v1 = new Vector2D(3, 0);
        var v2 = new Vector2D(0, 4);
        var sum = v1 + v2;

        Console.WriteLine($"v1: {v1}, 長さ: {v1.Length}");
        Console.WriteLine($"v2: {v2}, 長さ: {v2.Length}");
        Console.WriteLine($"合計: {sum}, 長さ: {sum.Length}");
    }
}`}
          expectedOutput={`v1: (3, 0), 長さ: 3
v2: (0, 4), 長さ: 4
合計: (3, 4), 長さ: 5`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="structs" />
      </div>
      <LessonNav lessons={lessons} currentId="structs" basePath="/learn/classes" />
    </div>
  );
}

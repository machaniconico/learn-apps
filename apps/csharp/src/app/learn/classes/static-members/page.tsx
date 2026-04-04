import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function StaticMembersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">クラス基礎 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">静的メンバー</h1>
        <p className="text-gray-400">static フィールド・メソッド・クラス、静的コンストラクタの使い方と適切な利用場面</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">static とは</h2>
        <p className="text-gray-400 mb-3">
          <code className="text-green-400">static</code> メンバーはインスタンスではなくクラス自体に属します。
          インスタンスを生成せずにクラス名から直接アクセスでき、すべてのインスタンスで共有されます。
        </p>
        <ul className="text-gray-400 space-y-1 list-disc list-inside">
          <li><strong className="text-white">静的フィールド</strong>: すべてのインスタンスで共有されるデータ</li>
          <li><strong className="text-white">静的メソッド</strong>: インスタンスなしで呼び出せるメソッド（Math.Sqrt など）</li>
          <li><strong className="text-white">静的クラス</strong>: インスタンス化できないユーティリティクラス</li>
          <li><strong className="text-white">静的コンストラクタ</strong>: クラスが初めて使われるときに1回だけ実行</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">静的フィールドとメソッド</h2>
        <p className="text-gray-400 mb-4">
          静的フィールドはすべてのインスタンスで共有されます。インスタンスカウンタや設定値の共有に利用できます。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class Counter
{
    // 静的フィールド: すべてのインスタンスで共有
    private static int _count = 0;

    public int Id { get; }

    public Counter()
    {
        _count++;
        Id = _count;
    }

    // 静的メソッド
    public static int GetCount() => _count;
    public static void Reset() => _count = 0;
}

class Program
{
    static void Main()
    {
        Console.WriteLine($"初期カウント: {Counter.GetCount()}");

        var c1 = new Counter();
        var c2 = new Counter();
        var c3 = new Counter();

        Console.WriteLine($"カウント: {Counter.GetCount()}");
        Console.WriteLine($"c1のID: {c1.Id}");
        Console.WriteLine($"c2のID: {c2.Id}");

        Counter.Reset();
        Console.WriteLine($"リセット後: {Counter.GetCount()}");
    }
}`}
          expectedOutput={`初期カウント: 0
カウント: 3
c1のID: 1
c2のID: 2
リセット後: 0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">静的クラスとユーティリティ</h2>
        <p className="text-gray-400 mb-4">
          静的クラスはインスタンス化できません。関連するユーティリティメソッドをグループ化するのに適しています。
          <code className="text-green-400">Math</code>・<code className="text-green-400">Console</code>・<code className="text-green-400">File</code> などが代表例です。
        </p>
        <CSharpEditor
          defaultCode={`using System;

static class MathUtils
{
    public static double CircleArea(double radius)
        => Math.PI * radius * radius;

    public static double Hypotenuse(double a, double b)
        => Math.Sqrt(a * a + b * b);

    public static bool IsPrime(int n)
    {
        if (n < 2) return false;
        for (int i = 2; i <= Math.Sqrt(n); i++)
            if (n % i == 0) return false;
        return true;
    }
}

class Program
{
    static void Main()
    {
        Console.WriteLine($"円の面積(r=5): {MathUtils.CircleArea(5):F2}");
        Console.WriteLine($"斜辺(3,4): {MathUtils.Hypotenuse(3, 4)}");

        Console.Write("素数: ");
        for (int i = 2; i <= 20; i++)
            if (MathUtils.IsPrime(i))
                Console.Write(i + " ");
        Console.WriteLine();
    }
}`}
          expectedOutput={`円の面積(r=5): 78.54
斜辺(3,4): 5
素数: 2 3 5 7 11 13 17 19 `}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="static-members" />
      </div>
      <LessonNav lessons={lessons} currentId="static-members" basePath="/learn/classes" />
    </div>
  );
}

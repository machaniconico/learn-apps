import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function SealedPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">継承・インターフェース レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">sealed クラス</h1>
        <p className="text-gray-400">sealed クラスによる継承の禁止、sealed override、パフォーマンス上の利点</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">sealed とは</h2>
        <p className="text-gray-400 mb-3">
          <code className="text-indigo-400">sealed</code> キーワードをクラスに付けると、そのクラスからの継承を禁止できます。
          <code className="text-indigo-400">string</code>・<code className="text-indigo-400">int</code> などの基本型も sealed です。
        </p>
        <ul className="text-gray-400 space-y-1 list-disc list-inside">
          <li>意図しない継承によるバグを防ぐ</li>
          <li>JIT コンパイラが仮想メソッドのディスパッチを最適化できる</li>
          <li>セキュリティ的に重要なクラスの安全性を保証</li>
          <li><code className="text-indigo-400">sealed override</code> で特定のメソッドの再オーバーライドだけを禁止することも可能</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">sealed クラスの基本</h2>
        <p className="text-gray-400 mb-4">
          sealed クラスはインスタンスを生成できますが、継承はできません。
          ユーティリティクラスや値オブジェクトとして設計する際に使います。
        </p>
        <CSharpEditor
          defaultCode={`using System;

// sealed: これ以上継承できない
sealed class ProductId
{
    public int Value { get; }

    public ProductId(int value)
    {
        if (value <= 0)
            throw new ArgumentException("IDは正の整数である必要があります");
        Value = value;
    }

    public override string ToString() => $"Product#{Value:D6}";
    public override bool Equals(object? obj)
        => obj is ProductId other && Value == other.Value;
    public override int GetHashCode() => Value.GetHashCode();
}

class Program
{
    static void Main()
    {
        var id1 = new ProductId(42);
        var id2 = new ProductId(42);
        var id3 = new ProductId(99);

        Console.WriteLine(id1);
        Console.WriteLine($"id1 == id2: {id1.Equals(id2)}");
        Console.WriteLine($"id1 == id3: {id1.Equals(id3)}");
    }
}`}
          expectedOutput={`Product#000042
id1 == id2: True
id1 == id3: False`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">sealed override</h2>
        <p className="text-gray-400 mb-4">
          クラスを sealed にせずに、特定のメソッドだけ再オーバーライドを禁止したい場合は
          <code className="text-indigo-400">sealed override</code> を使います。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class Base
{
    public virtual void MethodA() => Console.WriteLine("Base.MethodA");
    public virtual void MethodB() => Console.WriteLine("Base.MethodB");
}

class Middle : Base
{
    public override void MethodA() => Console.WriteLine("Middle.MethodA");

    // sealed override: これ以上オーバーライドできない
    public sealed override void MethodB() => Console.WriteLine("Middle.MethodB (sealed)");
}

class Derived : Middle
{
    // MethodA はオーバーライド可能
    public override void MethodA() => Console.WriteLine("Derived.MethodA");

    // MethodB は sealed なのでコンパイルエラーになる
    // public override void MethodB() => ... // エラー
}

class Program
{
    static void Main()
    {
        Base obj = new Derived();
        obj.MethodA(); // Derived の実装
        obj.MethodB(); // Middle の実装（sealed）
    }
}`}
          expectedOutput={`Derived.MethodA
Middle.MethodB (sealed)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="sealed" />
      </div>
      <LessonNav lessons={lessons} currentId="sealed" basePath="/learn/inheritance" />
    </div>
  );
}

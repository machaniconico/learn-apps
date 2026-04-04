import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("generics");

export default function ConstraintsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">ジェネリクス レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">型制約</h1>
        <p className="text-gray-400">where キーワードによる型パラメータの制約。class・struct・new()・IComparable・notnull など</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">型制約とは</h2>
        <p className="text-gray-400 mb-3">
          型制約(constraints)を使うと、型パラメータ T に使える型を制限できます。
          制約があると T に対してより多くの操作（特定のメソッド呼び出しなど）が可能になります。
        </p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="p-3 rounded bg-gray-800">
            <code className="text-violet-400">where T : class</code>
            <p className="text-gray-400 mt-1">参照型に限定</p>
          </div>
          <div className="p-3 rounded bg-gray-800">
            <code className="text-violet-400">where T : struct</code>
            <p className="text-gray-400 mt-1">値型に限定</p>
          </div>
          <div className="p-3 rounded bg-gray-800">
            <code className="text-violet-400">where T : new()</code>
            <p className="text-gray-400 mt-1">引数なしコンストラクタ必須</p>
          </div>
          <div className="p-3 rounded bg-gray-800">
            <code className="text-violet-400">where T : BaseClass</code>
            <p className="text-gray-400 mt-1">指定クラスの派生型に限定</p>
          </div>
          <div className="p-3 rounded bg-gray-800">
            <code className="text-violet-400">where T : IComparable&lt;T&gt;</code>
            <p className="text-gray-400 mt-1">インターフェース実装を要求</p>
          </div>
          <div className="p-3 rounded bg-gray-800">
            <code className="text-violet-400">where T : notnull</code>
            <p className="text-gray-400 mt-1">null 非許容型に限定（C# 8+）</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">IComparable 制約</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-400">where T : IComparable&lt;T&gt;</code> を指定すると、
          T の値の大小比較が可能になります。int・string・DateTime など比較可能な型に使えます。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class MinMax<T> where T : IComparable<T>
{
    public T Min(T a, T b)
        => a.CompareTo(b) <= 0 ? a : b;

    public T Max(T a, T b)
        => a.CompareTo(b) >= 0 ? a : b;

    public T Clamp(T value, T min, T max)
    {
        if (value.CompareTo(min) < 0) return min;
        if (value.CompareTo(max) > 0) return max;
        return value;
    }
}

class Program
{
    static void Main()
    {
        var mm = new MinMax<int>();
        Console.WriteLine($"Min(3,7): {mm.Min(3, 7)}");
        Console.WriteLine($"Max(3,7): {mm.Max(3, 7)}");
        Console.WriteLine($"Clamp(15,0,10): {mm.Clamp(15, 0, 10)}");

        var strMm = new MinMax<string>();
        Console.WriteLine($"Min(apple,banana): {strMm.Min("apple", "banana")}");
    }
}`}
          expectedOutput={`Min(3,7): 3
Max(3,7): 7
Clamp(15,0,10): 10
Min(apple,banana): apple`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">new() 制約とファクトリパターン</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-400">where T : new()</code> 制約があると、メソッド内で <code className="text-violet-400">new T()</code> でインスタンスを生成できます。
          ファクトリメソッドなどの汎用生成ロジックに役立ちます。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class Factory<T> where T : new()
{
    public T[] CreateArray(int count)
    {
        var result = new T[count];
        for (int i = 0; i < count; i++)
            result[i] = new T(); // new() 制約で可能
        return result;
    }
}

class Counter
{
    private static int _nextId = 1;
    public int Id { get; }

    public Counter()
    {
        Id = _nextId++;
    }

    public override string ToString() => $"Counter#{Id}";
}

class Program
{
    static void Main()
    {
        var factory = new Factory<Counter>();
        Counter[] counters = factory.CreateArray(3);

        foreach (var c in counters)
            Console.WriteLine(c);
    }
}`}
          expectedOutput={`Counter#1
Counter#2
Counter#3`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="generics" lessonId="constraints" />
      </div>
      <LessonNav lessons={lessons} currentId="constraints" basePath="/learn/generics" />
    </div>
  );
}

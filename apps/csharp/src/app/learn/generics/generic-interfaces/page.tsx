import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("generics");

export default function GenericInterfacesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">ジェネリクス レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ジェネリックインターフェース</h1>
        <p className="text-gray-400">IComparable&lt;T&gt;・IEnumerable&lt;T&gt;・IEquatable&lt;T&gt; の実装パターンと活用法</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">.NET の主なジェネリックインターフェース</h2>
        <p className="text-gray-400 mb-4">
          .NET は多くのジェネリックインターフェースを提供しています。これらを実装することで
          LINQ・ソート・等値比較などの標準機能と統合できます。
        </p>
        <div className="space-y-2 text-sm">
          <div className="p-3 rounded bg-gray-800">
            <code className="text-violet-400">IComparable&lt;T&gt;</code>
            <p className="text-gray-400 mt-1">大小比較。Array.Sort や LINQ の OrderBy で使われる。</p>
          </div>
          <div className="p-3 rounded bg-gray-800">
            <code className="text-violet-400">IEquatable&lt;T&gt;</code>
            <p className="text-gray-400 mt-1">等値比較。Contains・Distinct などで使われる。</p>
          </div>
          <div className="p-3 rounded bg-gray-800">
            <code className="text-violet-400">IEnumerable&lt;T&gt;</code>
            <p className="text-gray-400 mt-1">foreach と LINQ の対象になれる。</p>
          </div>
          <div className="p-3 rounded bg-gray-800">
            <code className="text-violet-400">IComparer&lt;T&gt;</code>
            <p className="text-gray-400 mt-1">外部から比較ロジックを提供するコンパレーター。</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">IComparable&lt;T&gt; の実装</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-400">IComparable&lt;T&gt;</code> を実装すると、Array.Sort や List.Sort でソートできるようになります。
          CompareTo は負（this が小さい）・0（等値）・正（this が大きい）を返します。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class Student : IComparable<Student>
{
    public string Name { get; }
    public double GPA { get; }

    public Student(string name, double gpa)
    {
        Name = name;
        GPA = gpa;
    }

    // GPA の降順でソート
    public int CompareTo(Student? other)
    {
        if (other is null) return 1;
        return other.GPA.CompareTo(GPA); // 降順
    }

    public override string ToString() => $"{Name}: {GPA:F1}";
}

class Program
{
    static void Main()
    {
        var students = new Student[]
        {
            new Student("田中", 3.5),
            new Student("鈴木", 3.9),
            new Student("佐藤", 3.2),
            new Student("山田", 3.7),
        };

        Array.Sort(students); // IComparable を使ったソート
        Console.WriteLine("GPA降順:");
        foreach (var s in students)
            Console.WriteLine($"  {s}");
    }
}`}
          expectedOutput={`GPA降順:
  鈴木: 3.9
  山田: 3.7
  田中: 3.5
  佐藤: 3.2`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">IEnumerable&lt;T&gt; の実装</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-400">IEnumerable&lt;T&gt;</code> を実装すると、foreach と LINQ で利用できます。
          <code className="text-violet-400">yield return</code> を使うと簡潔に実装できます。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections;
using System.Collections.Generic;

class NumberRange : IEnumerable<int>
{
    private readonly int _start;
    private readonly int _end;
    private readonly int _step;

    public NumberRange(int start, int end, int step = 1)
    {
        _start = start;
        _end = end;
        _step = step;
    }

    public IEnumerator<int> GetEnumerator()
    {
        for (int i = _start; i <= _end; i += _step)
            yield return i;
    }

    IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
}

class Program
{
    static void Main()
    {
        var range = new NumberRange(1, 10);
        foreach (int n in range)
            Console.Write(n + " ");
        Console.WriteLine();

        // 偶数のみ（LINQ と組み合わせ）
        var evens = new NumberRange(2, 20, 2);
        foreach (int n in evens)
            Console.Write(n + " ");
        Console.WriteLine();
    }
}`}
          expectedOutput={`1 2 3 4 5 6 7 8 9 10
2 4 6 8 10 12 14 16 18 20 `}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="generics" lessonId="generic-interfaces" />
      </div>
      <LessonNav lessons={lessons} currentId="generic-interfaces" basePath="/learn/generics" />
    </div>
  );
}

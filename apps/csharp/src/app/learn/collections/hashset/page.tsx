import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

export default function CollectionsHashSetPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">コレクション レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">HashSet{"<T>"}</h1>
        <p className="text-gray-400">重複なしの高速コレクション、集合演算（UnionWith・IntersectWith・ExceptWith）を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">HashSet{"<T>"} とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-yellow-400">HashSet{"<T>"}</code> は
          <strong className="text-white">重複を許さない</strong>高速コレクションです。
          要素の追加・削除・検索はすべて O(1) の計算量です。
          数学の集合と同様に、和集合・積集合・差集合などの集合演算が使えます。
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { method: "Add(item)", desc: "追加（重複は無視）" },
            { method: "Contains(item)", desc: "存在確認 O(1)" },
            { method: "Remove(item)", desc: "削除" },
            { method: "UnionWith(other)", desc: "和集合（∪）" },
            { method: "IntersectWith(other)", desc: "積集合（∩）" },
            { method: "ExceptWith(other)", desc: "差集合（-）" },
          ].map((item) => (
            <div key={item.method} className="bg-gray-800 rounded-lg p-3">
              <code className="text-yellow-400 text-xs font-mono block mb-1">{item.method}</code>
              <p className="text-gray-500 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">HashSet の基本操作と重複除去</h2>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        var set = new HashSet<string>();

        set.Add("C#");
        set.Add("Java");
        set.Add("Python");
        bool added = set.Add("C#");  // 重複は無視される

        Console.WriteLine($"追加試み (C# 重複): {added}");
        Console.WriteLine($"要素数: {set.Count}");

        // 存在確認（O(1)）
        Console.WriteLine($"Java あり? {set.Contains("Java")}");
        Console.WriteLine($"Go あり? {set.Contains("Go")}");

        // 配列から重複除去
        int[] nums = { 1, 2, 3, 2, 4, 1, 5, 3 };
        var unique = new HashSet<int>(nums);
        Console.Write("重複除去: ");
        foreach (int n in unique) Console.Write($"{n} ");
        Console.WriteLine();

        // 変換後も順序は保証されない
        Console.WriteLine($"一意の要素数: {unique.Count}");
    }
}`}
          expectedOutput={`追加試み (C# 重複): False
要素数: 3
Java あり? True
Go あり? False
重複除去: 1 2 3 4 5
一意の要素数: 5`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">集合演算（Set Operations）</h2>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;

class Program
{
    static void PrintSet(HashSet<int> s, string label)
    {
        Console.Write($"{label}: {{ ");
        foreach (int n in s) Console.Write($"{n} ");
        Console.WriteLine("}");
    }

    static void Main()
    {
        var A = new HashSet<int> { 1, 2, 3, 4, 5 };
        var B = new HashSet<int> { 3, 4, 5, 6, 7 };

        // 和集合（UnionWith は破壊的）
        var union = new HashSet<int>(A);
        union.UnionWith(B);
        PrintSet(union, "A ∪ B");

        // 積集合
        var intersect = new HashSet<int>(A);
        intersect.IntersectWith(B);
        PrintSet(intersect, "A ∩ B");

        // 差集合
        var except = new HashSet<int>(A);
        except.ExceptWith(B);
        PrintSet(except, "A - B");

        // 対称差（どちらか一方のみ）
        var symDiff = new HashSet<int>(A);
        symDiff.SymmetricExceptWith(B);
        PrintSet(symDiff, "A △ B");

        // 部分集合・上位集合の確認
        var C = new HashSet<int> { 2, 3 };
        Console.WriteLine($"C は A の部分集合? {C.IsSubsetOf(A)}");
        Console.WriteLine($"A は C の上位集合? {A.IsSupersetOf(C)}");
    }
}`}
          expectedOutput={`A ∪ B: { 1 2 3 4 5 6 7 }
A ∩ B: { 3 4 5 }
A - B: { 1 2 }
A △ B: { 1 2 6 7 }
C は A の部分集合? True
A は C の上位集合? True`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collections" lessonId="hashset" />
      </div>
      <LessonNav lessons={lessons} currentId="hashset" basePath="/learn/collections" />
    </div>
  );
}

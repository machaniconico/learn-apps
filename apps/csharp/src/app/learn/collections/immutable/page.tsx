import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

export default function CollectionsImmutablePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">コレクション レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Immutable コレクション</h1>
        <p className="text-gray-400">ImmutableList・ImmutableDictionary の使い方と不変コレクションの利点を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Immutable コレクションとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-yellow-400">System.Collections.Immutable</code> 名前空間の
          コレクションは<strong className="text-white">作成後に変更できません</strong>。
          Add・Remove などの操作は元のコレクションを変更せず、変更を反映した<strong className="text-white">新しいインスタンス</strong>を返します。
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { title: "スレッドセーフ", desc: "不変なのでロックなしに複数スレッドから安全に読み取れる" },
            { title: "予測可能性", desc: "値が変わらないことが保証されるのでバグが減る" },
            { title: "共有安全", desc: "参照を共有しても予期しない変更が起きない" },
          ].map((item) => (
            <div key={item.title} className="bg-gray-800 rounded-lg p-4">
              <p className="text-yellow-400 font-semibold text-sm mb-1">{item.title}</p>
              <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ImmutableList の基本操作</h2>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Immutable;

class Program
{
    static void Main()
    {
        // ImmutableList の作成
        var list1 = ImmutableList.Create(1, 2, 3, 4, 5);

        // Add は新しいリストを返す（元のリストは変わらない）
        var list2 = list1.Add(6);
        var list3 = list2.Remove(3);

        Console.WriteLine("list1 (元):");
        Console.Write("  ");
        foreach (int n in list1) Console.Write($"{n} ");
        Console.WriteLine();

        Console.WriteLine("list2 (6を追加):");
        Console.Write("  ");
        foreach (int n in list2) Console.Write($"{n} ");
        Console.WriteLine();

        Console.WriteLine("list3 (3を削除):");
        Console.Write("  ");
        foreach (int n in list3) Console.Write($"{n} ");
        Console.WriteLine();

        // Builder パターン（一括変更）
        var builder = ImmutableList.CreateBuilder<int>();
        for (int i = 1; i <= 5; i++) builder.Add(i * 10);
        var built = builder.ToImmutable();
        Console.Write("Builder で作成: ");
        foreach (int n in built) Console.Write($"{n} ");
        Console.WriteLine();
    }
}`}
          expectedOutput={`list1 (元):
  1 2 3 4 5
list2 (6を追加):
  1 2 3 4 5 6
list3 (3を削除):
  1 2 4 5 6
Builder で作成: 10 20 30 40 50 `}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ImmutableDictionary と ToImmutable</h2>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;
using System.Collections.Immutable;

class Program
{
    static void Main()
    {
        // 通常の Dictionary から変換
        var mutable = new Dictionary<string, int>
        {
            ["apple"]  = 100,
            ["banana"] = 80,
            ["cherry"] = 120,
        };
        var immutable = mutable.ToImmutableDictionary();

        Console.WriteLine($"apple: {immutable["apple"]}");

        // SetItem は新しい辞書を返す
        var updated = immutable.SetItem("banana", 90);
        Console.WriteLine($"元 banana: {immutable["banana"]}");
        Console.WriteLine($"更新後 banana: {updated["banana"]}");

        // Add
        var added = immutable.Add("date", 150);
        Console.WriteLine($"追加後の件数: {added.Count}");
        Console.WriteLine($"元の件数: {immutable.Count}");

        // ImmutableHashSet
        var set = ImmutableHashSet.Create("C#", "Java", "Python");
        var newSet = set.Add("Go");
        Console.WriteLine($"元: {set.Count}個, 追加後: {newSet.Count}個");
    }
}`}
          expectedOutput={`apple: 100
元 banana: 80
更新後 banana: 90
追加後の件数: 4
元の件数: 3
元: 3個, 追加後: 4個`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collections" lessonId="immutable" />
      </div>
      <LessonNav lessons={lessons} currentId="immutable" basePath="/learn/collections" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

export default function CollectionsSortedCollectionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">コレクション レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Sorted 系コレクション</h1>
        <p className="text-gray-400">SortedList・SortedDictionary・SortedSet の違いと使い分けを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Sorted 系コレクションの比較</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C# には要素を常にソート状態に保つコレクションが3種類あります。
          それぞれ内部実装と得意な操作が異なります。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 py-2 pr-4">型</th>
                <th className="text-left text-gray-400 py-2 pr-4">内部実装</th>
                <th className="text-left text-gray-400 py-2 pr-4">キー・値</th>
                <th className="text-left text-gray-400 py-2">得意な操作</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {[
                ["SortedList<K,V>", "配列（2本）", "あり", "インデックスアクセス O(1)"],
                ["SortedDictionary<K,V>", "赤黒木", "あり", "挿入・削除 O(log n)"],
                ["SortedSet<T>", "赤黒木", "値のみ", "範囲取得 GetViewBetween"],
              ].map(([type, impl, kv, best]) => (
                <tr key={type} className="border-b border-gray-800">
                  <td className="py-2 pr-4">
                    <code className="text-yellow-400 text-xs">{type}</code>
                  </td>
                  <td className="py-2 pr-4 text-xs">{impl}</td>
                  <td className="py-2 pr-4 text-xs">{kv}</td>
                  <td className="py-2 text-xs">{best}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">SortedDictionary の例</h2>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // SortedDictionary：常にキーでソートされる
        var sortedDict = new SortedDictionary<string, int>
        {
            ["Cherry"] = 3,
            ["Apple"]  = 1,
            ["Banana"] = 2,
            ["Date"]   = 4,
        };

        // 追加順ではなくキー順で反復される
        Console.WriteLine("SortedDictionary（キー順）:");
        foreach (var kv in sortedDict)
            Console.WriteLine($"  {kv.Key}: {kv.Value}");

        // SortedList：インデックスでもアクセス可能
        var sortedList = new SortedList<int, string>
        {
            [30] = "三十",
            [10] = "十",
            [20] = "二十",
        };

        Console.WriteLine("\nSortedList（インデックスアクセス）:");
        Console.WriteLine($"  Keys[0] = {sortedList.Keys[0]}");
        Console.WriteLine($"  Values[0] = {sortedList.Values[0]}");

        // 全体
        foreach (var kv in sortedList)
            Console.WriteLine($"  [{kv.Key}] = {kv.Value}");
    }
}`}
          expectedOutput={`SortedDictionary（キー順）:
  Apple: 1
  Banana: 2
  Cherry: 3
  Date: 4

SortedList（インデックスアクセス）:
  Keys[0] = 10
  Values[0] = 十
  [10] = 十
  [20] = 二十
  [30] = 三十`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">SortedSet と範囲取得</h2>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        var scores = new SortedSet<int> { 55, 72, 88, 91, 64, 79, 95, 43 };

        Console.Write("全スコア（ソート済み）: ");
        foreach (int s in scores) Console.Write($"{s} ");
        Console.WriteLine();

        Console.WriteLine($"最小: {scores.Min}");
        Console.WriteLine($"最大: {scores.Max}");

        // GetViewBetween で範囲取得
        var range = scores.GetViewBetween(70, 90);
        Console.Write("70〜90点: ");
        foreach (int s in range) Console.Write($"{s} ");
        Console.WriteLine();

        // 逆順反復
        Console.Write("逆順: ");
        foreach (int s in scores.Reverse()) Console.Write($"{s} ");
        Console.WriteLine();

        // 部分集合チェック
        var subset = new SortedSet<int> { 72, 88 };
        Console.WriteLine($"{{72, 88}} は部分集合? {subset.IsSubsetOf(scores)}");
    }
}`}
          expectedOutput={`全スコア（ソート済み）: 43 55 64 72 79 88 91 95
最小: 43
最大: 95
70〜90点: 72 79 88
逆順: 95 91 88 79 72 64 55 43
{72, 88} は部分集合? True`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collections" lessonId="sorted-collections" />
      </div>
      <LessonNav lessons={lessons} currentId="sorted-collections" basePath="/learn/collections" />
    </div>
  );
}

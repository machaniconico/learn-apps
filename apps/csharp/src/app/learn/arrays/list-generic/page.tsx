import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function ArraysListGenericPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">配列・リスト レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">List{"<T>"}</h1>
        <p className="text-gray-400">動的サイズのジェネリックリスト、Add・Remove・Count・インデックスアクセスを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">List{"<T>"} とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-orange-400">List{"<T>"}</code> は
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-orange-400">System.Collections.Generic</code> 名前空間にある
          動的サイズのコレクションです。配列と異なり、要素の追加・削除に合わせてサイズが自動的に変わります。
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { method: "Add(item)", desc: "末尾に追加" },
            { method: "Remove(item)", desc: "値で削除" },
            { method: "RemoveAt(i)", desc: "インデックスで削除" },
            { method: "Count", desc: "要素数" },
            { method: "Contains(item)", desc: "存在確認" },
            { method: "Insert(i, item)", desc: "指定位置に挿入" },
            { method: "Clear()", desc: "全削除" },
            { method: "Sort()", desc: "並び替え" },
          ].map((item) => (
            <div key={item.method} className="bg-gray-800 rounded-lg p-3">
              <code className="text-orange-400 text-xs font-mono">{item.method}</code>
              <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">List{"<T>"} の基本操作</h2>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // List の作成
        var fruits = new List<string>();

        // 要素の追加
        fruits.Add("りんご");
        fruits.Add("バナナ");
        fruits.Add("みかん");
        fruits.Add("ぶどう");

        Console.WriteLine($"要素数: {fruits.Count}");
        Console.WriteLine($"最初: {fruits[0]}");

        // 存在確認
        Console.WriteLine($"バナナあり? {fruits.Contains("バナナ")}");

        // 要素の削除
        fruits.Remove("バナナ");
        Console.WriteLine($"バナナ削除後の要素数: {fruits.Count}");

        // インデックスで削除
        fruits.RemoveAt(0);  // りんご を削除

        // 全要素を表示
        Console.Write("残り: ");
        foreach (string f in fruits)
            Console.Write($"{f} ");
        Console.WriteLine();

        // 初期値付きで作成
        var nums = new List<int> { 5, 3, 1, 4, 2 };
        nums.Sort();
        Console.Write("ソート: ");
        foreach (int n in nums) Console.Write($"{n} ");
        Console.WriteLine();
    }
}`}
          expectedOutput={`要素数: 4
最初: りんご
バナナあり? True
バナナ削除後の要素数: 3
残り: みかん ぶどう
ソート: 1 2 3 4 5 `}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">List と配列の相互変換</h2>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // 配列 → List
        string[] arr = { "A", "B", "C" };
        List<string> list = new List<string>(arr);
        list.Add("D");
        Console.WriteLine($"List の Count: {list.Count}");

        // List → 配列
        string[] back = list.ToArray();
        Console.WriteLine($"配列の Length: {back.Length}");

        // AddRange で複数追加
        var numbers = new List<int> { 1, 2, 3 };
        numbers.AddRange(new[] { 4, 5, 6 });
        Console.Write("AddRange 後: ");
        foreach (int n in numbers) Console.Write($"{n} ");
        Console.WriteLine();

        // FindIndex, Find
        int idx = numbers.FindIndex(n => n > 4);
        Console.WriteLine($"4より大きい最初のインデックス: {idx}");
        int found = numbers.Find(n => n > 4);
        Console.WriteLine($"4より大きい最初の値: {found}");
    }
}`}
          expectedOutput={`List の Count: 4
配列の Length: 4
AddRange 後: 1 2 3 4 5 6
4より大きい最初のインデックス: 4
4より大きい最初の値: 5`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="list-generic" />
      </div>
      <LessonNav lessons={lessons} currentId="list-generic" basePath="/learn/arrays" />
    </div>
  );
}

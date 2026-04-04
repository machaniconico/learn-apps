import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function ArraysArrayMethodsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">配列・リスト レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">配列メソッド</h1>
        <p className="text-gray-400">Array.Sort・Reverse・Find、LINQ を使った配列操作を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Array クラスの主要メソッド</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-orange-400">System.Array</code> クラスは
          配列を操作する静的メソッドを多数提供しています。
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { method: "Array.Sort(arr)", desc: "昇順ソート" },
            { method: "Array.Reverse(arr)", desc: "逆順" },
            { method: "Array.Find(arr, pred)", desc: "条件に合う最初の要素" },
            { method: "Array.FindAll(arr, pred)", desc: "条件に合う全要素" },
            { method: "Array.IndexOf(arr, val)", desc: "値のインデックス" },
            { method: "Array.Copy(src, dst, n)", desc: "n 個コピー" },
          ].map((item) => (
            <div key={item.method} className="bg-gray-800 rounded-lg p-3">
              <code className="text-orange-400 text-xs font-mono block mb-1">{item.method}</code>
              <p className="text-gray-500 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Array クラスの使用例</h2>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    static void Main()
    {
        int[] numbers = { 5, 3, 8, 1, 9, 2, 7, 4, 6 };

        // ソート
        Array.Sort(numbers);
        Console.Write("ソート: ");
        foreach (int n in numbers) Console.Write($"{n} ");
        Console.WriteLine();

        // 逆順
        Array.Reverse(numbers);
        Console.Write("逆順:   ");
        foreach (int n in numbers) Console.Write($"{n} ");
        Console.WriteLine();

        // 検索
        int idx = Array.IndexOf(numbers, 7);
        Console.WriteLine($"7のインデックス: {idx}");

        // 条件検索
        int found = Array.Find(numbers, n => n < 4);
        Console.WriteLine($"4未満の最初の値: {found}");

        int[] allSmall = Array.FindAll(numbers, n => n < 4);
        Console.Write("4未満の全値: ");
        foreach (int n in allSmall) Console.Write($"{n} ");
        Console.WriteLine();

        // コピー
        int[] dest = new int[3];
        Array.Copy(numbers, dest, 3);
        Console.Write("先頭3要素のコピー: ");
        foreach (int n in dest) Console.Write($"{n} ");
        Console.WriteLine();
    }
}`}
          expectedOutput={`ソート: 1 2 3 4 5 6 7 8 9
逆順:   9 8 7 6 5 4 3 2 1
7のインデックス: 2
4未満の最初の値: 3
4未満の全値: 3 2 1
先頭3要素のコピー: 9 8 7 `}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">LINQ を使った配列操作</h2>
        <CSharpEditor
          defaultCode={`using System;
using System.Linq;

class Program
{
    static void Main()
    {
        int[] scores = { 85, 72, 91, 68, 95, 55, 88 };

        // LINQ メソッド構文
        int max = scores.Max();
        int min = scores.Min();
        double avg = scores.Average();
        int sum = scores.Sum();

        Console.WriteLine($"最大: {max}, 最小: {min}");
        Console.WriteLine($"平均: {avg:F1}, 合計: {sum}");

        // フィルタリング（70点以上）
        int[] passing = scores.Where(s => s >= 70).ToArray();
        Console.Write("合格（70以上）: ");
        foreach (int s in passing) Console.Write($"{s} ");
        Console.WriteLine();

        // ソート（降順）
        int[] sorted = scores.OrderByDescending(s => s).ToArray();
        Console.Write("降順: ");
        foreach (int s in sorted) Console.Write($"{s} ");
        Console.WriteLine();

        // 変換（Select）
        string[] labels = scores.Select(s => s >= 70 ? "合格" : "不合格").ToArray();
        Console.Write("判定: ");
        foreach (string l in labels) Console.Write($"{l} ");
        Console.WriteLine();
    }
}`}
          expectedOutput={`最大: 95, 最小: 55
平均: 79.1, 合計: 554
合格（70以上）: 85 72 91 95 88
降順: 95 91 88 85 72 68 55
判定: 合格 合格 合格 不合格 合格 不合格 合格 `}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="array-methods" />
      </div>
      <LessonNav lessons={lessons} currentId="array-methods" basePath="/learn/arrays" />
    </div>
  );
}

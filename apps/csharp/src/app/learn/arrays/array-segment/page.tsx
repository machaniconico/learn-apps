import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function ArraysArraySegmentPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">配列・リスト レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ArraySegment</h1>
        <p className="text-gray-400">配列の一部を効率的に参照する ArraySegment{"<T>"} の使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ArraySegment{"<T>"} とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-orange-400">ArraySegment{"<T>"}</code> は
          既存の配列の一部を参照する構造体です。
          配列全体をコピーせずに部分的なビューを提供します。
          Span{"<T>"} と似ていますが、ヒープに格納でき、クラスのフィールドにも使えます。
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-orange-400 font-semibold text-sm mb-2">Span{"<T>"} との違い</p>
            <ul className="text-gray-400 text-xs space-y-1">
              <li>• ヒープに格納可能（クラスのフィールドになれる）</li>
              <li>• 非同期メソッドで使用可能</li>
              <li>• .NET 古いバージョンでも使える</li>
            </ul>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-orange-400 font-semibold text-sm mb-2">主なプロパティ</p>
            <ul className="text-gray-400 text-xs space-y-1">
              <li>• <code className="text-orange-300">.Array</code> — 元の配列</li>
              <li>• <code className="text-orange-300">.Offset</code> — 開始インデックス</li>
              <li>• <code className="text-orange-300">.Count</code> — 要素数</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ArraySegment の基本使用例</h2>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    static void Main()
    {
        int[] original = { 10, 20, 30, 40, 50, 60, 70, 80, 90 };

        // ArraySegment の作成（インデックス2から4要素）
        var segment = new ArraySegment<int>(original, 2, 4);

        Console.WriteLine($"元の配列: {original.Length} 要素");
        Console.WriteLine($"Offset: {segment.Offset}");
        Console.WriteLine($"Count:  {segment.Count}");

        // foreach で部分配列を表示
        Console.Write("セグメントの内容: ");
        foreach (int n in segment)
            Console.Write($"{n} ");
        Console.WriteLine();

        // インデックスアクセス
        Console.WriteLine($"segment[0] = {segment[0]}");
        Console.WriteLine($"segment[3] = {segment[3]}");

        // Slice メソッドでさらに分割
        ArraySegment<int> sub = segment.Slice(1, 2);
        Console.Write("さらにスライス: ");
        foreach (int n in sub) Console.Write($"{n} ");
        Console.WriteLine();
    }
}`}
          expectedOutput={`元の配列: 9 要素
Offset: 2
Count:  4
セグメントの内容: 30 40 50 60
segment[0] = 30
segment[3] = 60
さらにスライス: 40 50 `}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">メソッドへの部分配列渡し</h2>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    // ArraySegment を引数として受け取る
    static double Average(ArraySegment<double> data)
    {
        double sum = 0;
        foreach (double d in data) sum += d;
        return sum / data.Count;
    }

    static void Main()
    {
        double[] allData = { 1.0, 2.5, 3.0, 4.5, 5.0, 6.5, 7.0, 8.5 };

        // 前半4要素の平均
        double avg1 = Average(new ArraySegment<double>(allData, 0, 4));
        Console.WriteLine($"前半の平均: {avg1}");

        // 後半4要素の平均
        double avg2 = Average(new ArraySegment<double>(allData, 4, 4));
        Console.WriteLine($"後半の平均: {avg2}");

        // 全体の平均（配列全体を ArraySegment として渡す）
        double avgAll = Average(allData);
        Console.WriteLine($"全体の平均: {avgAll}");
    }
}`}
          expectedOutput={`前半の平均: 2.75
後半の平均: 6.75
全体の平均: 4.75`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="array-segment" />
      </div>
      <LessonNav lessons={lessons} currentId="array-segment" basePath="/learn/arrays" />
    </div>
  );
}

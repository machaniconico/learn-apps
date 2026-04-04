import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("methods");

export default function MethodsTupleReturnPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">メソッド レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">タプル戻り値</h1>
        <p className="text-gray-400">{"(int, string)"} 戻り値の型、名前付きタプル、分解代入を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">タプルで複数の値を返す</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          メソッドから複数の値を返したい場合、C# 7 以降では<strong className="text-white">タプル</strong>を使うのが最もシンプルです。
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-400">(型1, 型2)</code> の形式で戻り値の型を宣言します。
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-2">匿名タプル</p>
            <code className="text-gray-300 font-mono text-xs">
              {`(int, string) GetData() => (42, "hello");`}
            </code>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-xs text-teal-400 mb-2">名前付きタプル</p>
            <code className="text-gray-300 font-mono text-xs">
              {`(int Id, string Name) GetData() => (42, "hello");`}
            </code>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">タプル戻り値の基本例</h2>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    // 匿名タプル
    static (int min, int max) MinMax(int[] arr)
    {
        int min = arr[0], max = arr[0];
        foreach (int n in arr)
        {
            if (n < min) min = n;
            if (n > max) max = n;
        }
        return (min, max);
    }

    // 名前付きタプル
    static (int Quotient, int Remainder) DivMod(int a, int b)
        => (a / b, a % b);

    static void Main()
    {
        var nums = new[] { 5, 3, 9, 1, 7 };
        var (min, max) = MinMax(nums);  // 分解代入
        Console.WriteLine($"最小: {min}, 最大: {max}");

        var result = DivMod(17, 5);
        Console.WriteLine($"17 ÷ 5 = {result.Quotient} 余り {result.Remainder}");

        // .Item1, .Item2 でもアクセス可能（名前なしの場合）
        (int x, string s) = (100, "C#");
        Console.WriteLine($"x={x}, s={s}");
    }
}`}
          expectedOutput={`最小: 1, 最大: 9
17 ÷ 5 = 3 余り 2
x=100, s=C#`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実用的なタプル活用例</h2>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    // 統計値をまとめて返す
    static (double Mean, double Variance, double StdDev) Statistics(double[] data)
    {
        double sum = 0;
        foreach (double d in data) sum += d;
        double mean = sum / data.Length;

        double varSum = 0;
        foreach (double d in data) varSum += (d - mean) * (d - mean);
        double variance = varSum / data.Length;
        double stdDev = Math.Sqrt(variance);

        return (mean, variance, stdDev);
    }

    static void Main()
    {
        double[] scores = { 70, 80, 90, 60, 85, 75 };
        var (mean, variance, stdDev) = Statistics(scores);

        Console.WriteLine($"平均:     {mean:F2}");
        Console.WriteLine($"分散:     {variance:F2}");
        Console.WriteLine($"標準偏差: {stdDev:F2}");
    }
}`}
          expectedOutput={`平均:     76.67
分散:     106.67
標準偏差: 10.33`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="methods" lessonId="tuple-return" />
      </div>
      <LessonNav lessons={lessons} currentId="tuple-return" basePath="/learn/methods" />
    </div>
  );
}

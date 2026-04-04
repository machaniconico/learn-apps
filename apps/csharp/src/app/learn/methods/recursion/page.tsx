import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("methods");

export default function MethodsRecursionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">メソッド レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">再帰</h1>
        <p className="text-gray-400">自分自身を呼び出す再帰メソッドの設計、階乗・フィボナッチ数列を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">再帰とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-white">再帰（Recursion）</strong>とは、メソッドが自分自身を呼び出す手法です。
          問題をより小さな同じ種類の問題に分解できるときに有効です。
          再帰メソッドには必ず2つの要素が必要です：
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-gray-800 rounded-lg p-4 border border-teal-500/30">
            <p className="text-teal-400 font-semibold text-sm mb-2">基底ケース（Base Case）</p>
            <p className="text-gray-400 text-xs leading-relaxed">
              再帰を止める条件。これがないと無限ループになりスタックオーバーフローが発生します。
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-blue-500/30">
            <p className="text-blue-400 font-semibold text-sm mb-2">再帰ケース（Recursive Case）</p>
            <p className="text-gray-400 text-xs leading-relaxed">
              自分自身を呼び出す部分。毎回問題をより小さくしていく必要があります。
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">階乗（Factorial）</h2>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    // n! = n × (n-1)!  （基底ケース: 0! = 1）
    static long Factorial(int n)
    {
        if (n <= 0) return 1;       // 基底ケース
        return n * Factorial(n - 1); // 再帰ケース
    }

    static void Main()
    {
        for (int i = 0; i <= 10; i++)
        {
            Console.WriteLine($"{i}! = {Factorial(i)}");
        }
    }
}`}
          expectedOutput={`0! = 1
1! = 1
2! = 2
3! = 6
4! = 24
5! = 120
6! = 720
7! = 5040
8! = 40320
9! = 362880
10! = 3628800`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">フィボナッチ数列と末尾再帰最適化</h2>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    // 単純な再帰（指数的な計算量：遅い）
    static int FibNaive(int n)
    {
        if (n <= 1) return n;
        return FibNaive(n - 1) + FibNaive(n - 2);
    }

    // 末尾再帰風の最適化（アキュムレータパターン）
    static long FibFast(int n, long a = 0, long b = 1)
    {
        if (n == 0) return a;
        if (n == 1) return b;
        return FibFast(n - 1, b, a + b);
    }

    static void Main()
    {
        Console.WriteLine("単純な再帰（小さい数のみ）:");
        for (int i = 0; i <= 10; i++)
            Console.Write($"{FibNaive(i)} ");
        Console.WriteLine();

        Console.WriteLine("\n最適化版（大きい数も対応）:");
        for (int i = 0; i <= 15; i++)
            Console.Write($"{FibFast(i)} ");
        Console.WriteLine();
    }
}`}
          expectedOutput={`単純な再帰（小さい数のみ）:
0 1 1 2 3 5 8 13 21 34 55

最適化版（大きい数も対応）:
0 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 `}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="methods" lessonId="recursion" />
      </div>
      <LessonNav lessons={lessons} currentId="recursion" basePath="/learn/methods" />
    </div>
  );
}

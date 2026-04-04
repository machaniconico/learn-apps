import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function ArraysMultidimensionalPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">配列・リスト レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">多次元配列</h1>
        <p className="text-gray-400">{"int[,]"} の2次元配列とジャグ配列（int[][]）の使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">多次元配列の種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C# には2種類の多次元配列があります：
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-orange-400 font-semibold text-sm mb-2">多次元配列 int[,]</p>
            <p className="text-gray-400 text-xs leading-relaxed mb-2">
              全行が同じ列数を持つ「矩形配列」。行列・グリッドデータに適しています。
            </p>
            <code className="text-gray-300 font-mono text-xs">int[,] grid = new int[3, 4];</code>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-orange-400 font-semibold text-sm mb-2">ジャグ配列 int[][]</p>
            <p className="text-gray-400 text-xs leading-relaxed mb-2">
              各行が異なる列数を持てる「配列の配列」。三角形などの不規則データに適しています。
            </p>
            <code className="text-gray-300 font-mono text-xs">int[][] jagged = new int[3][];</code>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">2次元配列（int[,]）の例</h2>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    static void Main()
    {
        // 3行4列の2次元配列
        int[,] matrix = {
            { 1,  2,  3,  4 },
            { 5,  6,  7,  8 },
            { 9, 10, 11, 12 }
        };

        Console.WriteLine($"行数: {matrix.GetLength(0)}");
        Console.WriteLine($"列数: {matrix.GetLength(1)}");
        Console.WriteLine($"[1,2] = {matrix[1, 2]}");

        // ネストした for ループで全要素を表示
        Console.WriteLine("行列の内容:");
        for (int row = 0; row < matrix.GetLength(0); row++)
        {
            for (int col = 0; col < matrix.GetLength(1); col++)
            {
                Console.Write($"{matrix[row, col],3}");
            }
            Console.WriteLine();
        }
    }
}`}
          expectedOutput={`行数: 3
列数: 4
[1,2] = 7
行列の内容:
  1  2  3  4
  5  6  7  8
  9 10 11 12`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ジャグ配列（int[][]）の例</h2>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    static void Main()
    {
        // ジャグ配列：各行のサイズが異なる
        int[][] jagged = new int[4][];
        jagged[0] = new int[] { 1 };
        jagged[1] = new int[] { 2, 3 };
        jagged[2] = new int[] { 4, 5, 6 };
        jagged[3] = new int[] { 7, 8, 9, 10 };

        Console.WriteLine("三角形の数列:");
        for (int i = 0; i < jagged.Length; i++)
        {
            Console.Write($"  行{i}: ");
            foreach (int val in jagged[i])
                Console.Write($"{val} ");
            Console.WriteLine();
        }

        // 各行の合計
        Console.WriteLine("各行の合計:");
        for (int i = 0; i < jagged.Length; i++)
        {
            int sum = 0;
            foreach (int val in jagged[i]) sum += val;
            Console.WriteLine($"  行{i}: {sum}");
        }
    }
}`}
          expectedOutput={`三角形の数列:
  行0: 1
  行1: 2 3
  行2: 4 5 6
  行3: 7 8 9 10
各行の合計:
  行0: 1
  行1: 5
  行2: 15
  行3: 34`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="multidimensional" />
      </div>
      <LessonNav lessons={lessons} currentId="multidimensional" basePath="/learn/arrays" />
    </div>
  );
}

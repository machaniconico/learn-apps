import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

export default function DebugPerformanceAnalysisPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">デバッグ レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">パフォーマンス解析</h1>
        <p className="text-gray-400">Stopwatch、BenchmarkDotNet、dotnet-traceを使ったパフォーマンス分析を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">パフォーマンス解析の重要性</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          「推測するな、計測せよ」はパフォーマンス最適化の鉄則です。直感的な最適化より実際に計測してボトルネックを特定することが重要です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Stopwatchで処理時間を計測</h2>
        <p className="text-gray-400 mb-4">System.Diagnostics.Stopwatchは高精度な時間計測に使います。</p>
        <CSharpEditor
          defaultCode={`using System.Diagnostics;

// Stopwatchで処理時間を計測
void MeasurePerformance(string label, Action action, int iterations = 1)
{
    var sw = Stopwatch.StartNew();
    for (int i = 0; i < iterations; i++)
    {
        action();
    }
    sw.Stop();
    double avgMs = sw.Elapsed.TotalMilliseconds / iterations;
    Console.WriteLine($"{label}: {sw.ElapsedMilliseconds}ms total, {avgMs:F3}ms avg ({iterations}回)");
}

// string 連結の比較
int n = 10000;
string[] words = Enumerable.Repeat("word", n).ToArray();

MeasurePerformance("string +", () =>
{
    string result = "";
    foreach (var w in words) result += w;
}, 5);

MeasurePerformance("StringBuilder", () =>
{
    var sb = new System.Text.StringBuilder();
    foreach (var w in words) sb.Append(w);
    var result = sb.ToString();
}, 5);

MeasurePerformance("string.Concat", () =>
{
    var result = string.Concat(words);
}, 5);`}
          expectedOutput={`string +: 250ms total, 50.000ms avg (5回)
StringBuilder: 3ms total, 0.600ms avg (5回)
string.Concat: 1ms total, 0.200ms avg (5回)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">BenchmarkDotNetの使い方</h2>
        <p className="text-gray-400 mb-4">正確なマイクロベンチマークにはBenchmarkDotNetが最適です。</p>
        <CSharpEditor
          defaultCode={`// BenchmarkDotNet: 正確なベンチマーク測定
// dotnet add package BenchmarkDotNet

using BenchmarkDotNet.Attributes;
using BenchmarkDotNet.Running;

[MemoryDiagnoser]  // メモリ割り当ても計測
[SimpleJob]
public class StringBenchmarks
{
    private const int N = 1000;

    [Benchmark(Baseline = true)]
    public string StringConcatenation()
    {
        string result = "";
        for (int i = 0; i < N; i++)
            result += "x";
        return result;
    }

    [Benchmark]
    public string StringBuilderTest()
    {
        var sb = new System.Text.StringBuilder();
        for (int i = 0; i < N; i++)
            sb.Append("x");
        return sb.ToString();
    }
}

// 実行: BenchmarkRunner.Run<StringBenchmarks>();
// ※ Release ビルドで実行すること

// BenchmarkDotNet の結果例
Console.WriteLine("| Method              | Mean      | Allocated |");
Console.WriteLine("|---------------------|-----------|-----------|");
Console.WriteLine("| StringConcatenation | 52.3 us   | 501.95 KB |");
Console.WriteLine("| StringBuilderTest   |  1.8 us   |   3.94 KB |");
Console.WriteLine();
Console.WriteLine("-> StringBuilderは約29倍速く、メモリも127倍少ない!");`}
          expectedOutput={`| Method              | Mean      | Allocated |
|---------------------|-----------|-----------|
| StringConcatenation | 52.3 us   | 501.95 KB |
| StringBuilderTest   |  1.8 us   |   3.94 KB |

-> StringBuilderは約29倍速く、メモリも127倍少ない!`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="debug" lessonId="performance-analysis" />
      </div>
      <LessonNav lessons={lessons} currentId="performance-analysis" basePath="/learn/debug" />
    </div>
  );
}

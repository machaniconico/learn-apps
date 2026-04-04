import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("async");

export default function ParallelPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">非同期処理 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">並列処理</h1>
        <p className="text-gray-400">Task.WhenAll・Task.WhenAny・Parallel.ForEachAsyncを使った並列実行を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">並列処理のパターン</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li><code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">Task.WhenAll</code>: すべてのTaskが完了するまで待機</li>
          <li><code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">Task.WhenAny</code>: いずれか1つのTaskが完了したら継続</li>
          <li><code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">Parallel.ForEachAsync</code>: 非同期の並列foreach（.NET 6以降）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Task.WhenAll で並列実行</h2>
        <p className="text-gray-400 mb-4">
          複数の非同期操作を同時に開始し、全部の完了を待ちます。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Threading.Tasks;

class Program
{
    static async Task<string> FetchAsync(string name, int delay)
    {
        await Task.Delay(delay);
        return $"{name}のデータ";
    }

    static async Task Main()
    {
        // 順番に実行（合計300ms）
        var t1 = await FetchAsync("A", 100);
        var t2 = await FetchAsync("B", 100);
        var t3 = await FetchAsync("C", 100);
        Console.WriteLine("逐次: " + string.Join(", ", t1, t2, t3));

        // 並列実行（最大100ms）
        var tasks = new[]
        {
            FetchAsync("X", 100),
            FetchAsync("Y", 80),
            FetchAsync("Z", 120),
        };
        string[] results = await Task.WhenAll(tasks);
        Console.WriteLine("並列: " + string.Join(", ", results));
    }
}`}
          expectedOutput={`逐次: Aのデータ, Bのデータ, Cのデータ
並列: Xのデータ, Yのデータ, Zのデータ`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Task.WhenAny で最速を取る</h2>
        <p className="text-gray-400 mb-4">
          最初に完了したTaskの結果を使う「タイムアウト」や「フォールバック」に活用します。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Threading.Tasks;

class Program
{
    static async Task<string> FetchAsync(string name, int delay)
    {
        await Task.Delay(delay);
        return $"{name}({delay}ms)";
    }

    static async Task Main()
    {
        var tasks = new[]
        {
            FetchAsync("遅いAPI", 300),
            FetchAsync("速いAPI", 100),
            FetchAsync("普通のAPI", 200),
        };

        // 最初に完了したものを取得
        Task<string> fastest = await Task.WhenAny(tasks);
        Console.WriteLine($"最速: {await fastest}");

        // タイムアウトパターン
        Task<string> fetchTask = FetchAsync("重い処理", 500);
        Task timeout = Task.Delay(200);

        Task winner = await Task.WhenAny(fetchTask, timeout);
        if (winner == timeout)
            Console.WriteLine("タイムアウト！");
        else
            Console.WriteLine($"成功: {await fetchTask}");
    }
}`}
          expectedOutput={`最速: 速いAPI(100ms)
タイムアウト！`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="async" lessonId="parallel" />
      </div>
      <LessonNav lessons={lessons} currentId="parallel" basePath="/learn/async" />
    </div>
  );
}

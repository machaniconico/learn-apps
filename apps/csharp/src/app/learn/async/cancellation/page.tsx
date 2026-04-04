import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("async");

export default function CancellationPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">非同期処理 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">キャンセル</h1>
        <p className="text-gray-400">CancellationTokenSource・CancellationToken・OperationCanceledExceptionの使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">キャンセルの仕組み</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">CancellationTokenSource</code> がキャンセル信号を発行します。
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">CancellationToken</code> を非同期メソッドに渡すことで、キャンセル要求を受け取れます。
          キャンセルされると <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">OperationCanceledException</code> がスローされます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">CancellationToken の基本</h2>
        <p className="text-gray-400 mb-4">
          非同期メソッドにCancellationTokenを渡してキャンセルに対応します。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Threading;
using System.Threading.Tasks;

class Program
{
    static async Task DoWorkAsync(CancellationToken ct)
    {
        for (int i = 1; i <= 5; i++)
        {
            ct.ThrowIfCancellationRequested(); // キャンセルチェック
            await Task.Delay(100, ct);          // 待機もキャンセル対応
            Console.WriteLine($"ステップ {i} 完了");
        }
    }

    static async Task Main()
    {
        using var cts = new CancellationTokenSource();

        // 250ms後にキャンセル
        cts.CancelAfter(250);

        try
        {
            await DoWorkAsync(cts.Token);
            Console.WriteLine("正常完了");
        }
        catch (OperationCanceledException)
        {
            Console.WriteLine("キャンセルされました");
        }
    }
}`}
          expectedOutput={`ステップ 1 完了
ステップ 2 完了
キャンセルされました`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">手動キャンセルとリンク</h2>
        <p className="text-gray-400 mb-4">
          手動でキャンセルする方法と、複数のトークンをリンクする方法です。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Threading;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        using var cts1 = new CancellationTokenSource();
        using var cts2 = new CancellationTokenSource();

        // 2つのトークンをリンク（どちらかがキャンセルされたら両方キャンセル）
        using var linked = CancellationTokenSource.CreateLinkedTokenSource(
            cts1.Token, cts2.Token);

        var task = Task.Run(async () =>
        {
            await Task.Delay(1000, linked.Token);
            Console.WriteLine("完了");
        }, linked.Token);

        await Task.Delay(100);
        cts2.Cancel(); // cts2 をキャンセル → linked も自動キャンセル

        try { await task; }
        catch (OperationCanceledException)
        {
            Console.WriteLine($"cts1: {cts1.IsCancellationRequested}");
            Console.WriteLine($"cts2: {cts2.IsCancellationRequested}");
            Console.WriteLine($"linked: {linked.IsCancellationRequested}");
        }
    }
}`}
          expectedOutput={`cts1: False
cts2: True
linked: True`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="async" lessonId="cancellation" />
      </div>
      <LessonNav lessons={lessons} currentId="cancellation" basePath="/learn/async" />
    </div>
  );
}

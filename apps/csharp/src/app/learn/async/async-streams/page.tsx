import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("async");

export default function AsyncStreamsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">非同期処理 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">非同期ストリーム</h1>
        <p className="text-gray-400">IAsyncEnumerable&lt;T&gt;・await foreach・yield returnを使った非同期データストリームを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">IAsyncEnumerable&lt;T&gt; とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">IAsyncEnumerable&lt;T&gt;</code>（C# 8.0以降）は非同期で要素を生成するストリームです。
          大量データやリアルタイムデータを1件ずつ非同期に処理できます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">await foreach</code> で各要素を非同期に反復処理できます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">非同期ストリームの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">yield return</code> と <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">async</code> を組み合わせた非同期ジェネレーターです。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;
using System.Threading.Tasks;

class Program
{
    // 非同期ストリームを生成するメソッド
    static async IAsyncEnumerable<int> GenerateAsync()
    {
        for (int i = 1; i <= 5; i++)
        {
            await Task.Delay(50); // 各要素の生成に時間がかかる
            yield return i * 10;
        }
    }

    static async Task Main()
    {
        Console.WriteLine("ストリーム開始:");

        // await foreach で非同期に反復
        await foreach (int value in GenerateAsync())
        {
            Console.WriteLine($"  受信: {value}");
        }

        Console.WriteLine("ストリーム終了");
    }
}`}
          expectedOutput={`ストリーム開始:
  受信: 10
  受信: 20
  受信: 30
  受信: 40
  受信: 50
ストリーム終了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">CancellationToken 対応の非同期ストリーム</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">[EnumeratorCancellation]</code> 属性でキャンセルに対応できます。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;

class Program
{
    static async IAsyncEnumerable<string> FetchPagesAsync(
        [EnumeratorCancellation] CancellationToken ct = default)
    {
        for (int page = 1; page <= 10; page++)
        {
            ct.ThrowIfCancellationRequested();
            await Task.Delay(80, ct);
            yield return $"ページ{page}のデータ";
        }
    }

    static async Task Main()
    {
        using var cts = new CancellationTokenSource(250);

        try
        {
            await foreach (string data in FetchPagesAsync(cts.Token))
            {
                Console.WriteLine(data);
            }
        }
        catch (OperationCanceledException)
        {
            Console.WriteLine("ストリームがキャンセルされました");
        }
    }
}`}
          expectedOutput={`ページ1のデータ
ページ2のデータ
ページ3のデータ
ストリームがキャンセルされました`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="async" lessonId="async-streams" />
      </div>
      <LessonNav lessons={lessons} currentId="async-streams" basePath="/learn/async" />
    </div>
  );
}

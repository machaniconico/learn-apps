import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("async");

export default function TaskPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">非同期処理 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Task</h1>
        <p className="text-gray-400">Task.Run・Task.Delay・voidとTaskの戻り値の違いを理解しましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Task クラスとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">Task</code> は非同期操作を表すクラスです。
          操作の完了・失敗・キャンセルの状態を追跡できます。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">Task.Run()</code>: バックグラウンドスレッドで実行</li>
          <li><code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">Task.Delay()</code>: 非同期的な待機</li>
          <li><code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">Task.CompletedTask</code>: 完了済みTask</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Task.Run でバックグラウンド実行</h2>
        <p className="text-gray-400 mb-4">
          CPU集約的な処理をバックグラウンドスレッドで実行します。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        Console.WriteLine("メインスレッド開始");

        // バックグラウンドで重い処理を実行
        Task heavyTask = Task.Run(() =>
        {
            int sum = 0;
            for (int i = 0; i < 1000000; i++) sum += i;
            Console.WriteLine($"バックグラウンド完了: 合計={sum}");
        });

        Console.WriteLine("バックグラウンド処理中...");
        await heavyTask; // 完了を待機
        Console.WriteLine("全処理完了");
    }
}`}
          expectedOutput={`メインスレッド開始
バックグラウンド処理中...
バックグラウンド完了: 合計=499999500000
全処理完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">void vs Task の戻り値</h2>
        <p className="text-gray-400 mb-4">
          非同期メソッドの戻り値の違いと使い分けです。
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">async void</code> はイベントハンドラ専用で、例外がキャッチできないため原則避けます。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Threading.Tasks;

class Program
{
    // Task 戻り値: awaitできる、例外を伝播できる
    static async Task DoWorkAsync()
    {
        await Task.Delay(10);
        Console.WriteLine("Task: 完了");
    }

    // async void: イベントハンドラ専用（例外がキャッチできない）
    static async void FireAndForget()
    {
        await Task.Delay(10);
        Console.WriteLine("void: 完了（awaitできない）");
    }

    static async Task Main()
    {
        // Task は await できる
        await DoWorkAsync();

        // void はawaitできない
        FireAndForget();
        await Task.Delay(50); // 完了を待つ別の方法

        Console.WriteLine("Main終了");
    }
}`}
          expectedOutput={`Task: 完了
void: 完了（awaitできない）
Main終了`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="async" lessonId="task" />
      </div>
      <LessonNav lessons={lessons} currentId="task" basePath="/learn/async" />
    </div>
  );
}

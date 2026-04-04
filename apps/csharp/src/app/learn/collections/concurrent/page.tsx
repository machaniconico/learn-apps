import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

export default function CollectionsConcurrentPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">コレクション レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">並行コレクション</h1>
        <p className="text-gray-400">ConcurrentDictionary・ConcurrentQueue などのスレッドセーフなコレクションを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">なぜ並行コレクションが必要か</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          通常の <code className="bg-gray-800 px-1.5 py-0.5 rounded text-yellow-400">Dictionary</code> や
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-yellow-400">List</code> は
          複数のスレッドから同時にアクセスすると競合状態（Race Condition）が発生しデータが壊れる可能性があります。
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-yellow-400">System.Collections.Concurrent</code> 名前空間の
          コレクションはロック機構を内蔵しており、マルチスレッド環境で安全に使用できます。
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { type: "ConcurrentDictionary<K,V>", desc: "スレッドセーフな辞書。AddOrUpdate・GetOrAdd が便利。" },
            { type: "ConcurrentQueue<T>", desc: "スレッドセーフなキュー（FIFO）。TryDequeue で安全に取り出し。" },
            { type: "ConcurrentStack<T>", desc: "スレッドセーフなスタック（LIFO）。TryPop で安全に取り出し。" },
            { type: "ConcurrentBag<T>", desc: "順序なしのスレッドセーフコレクション。プロデューサー・コンシューマー向け。" },
          ].map((item) => (
            <div key={item.type} className="bg-gray-800 rounded-lg p-4">
              <code className="text-yellow-400 text-xs font-mono block mb-2">{item.type}</code>
              <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ConcurrentDictionary の使用例</h2>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;

class Program
{
    static void Main()
    {
        var counter = new ConcurrentDictionary<string, int>();

        // 複数タスクから同時に書き込んでも安全
        var tasks = new Task[5];
        for (int i = 0; i < 5; i++)
        {
            int taskId = i;
            tasks[i] = Task.Run(() =>
            {
                for (int j = 0; j < 100; j++)
                {
                    // AddOrUpdate：アトミックに追加または更新
                    counter.AddOrUpdate(
                        "count",
                        1,
                        (key, oldVal) => oldVal + 1
                    );
                }
            });
        }
        Task.WaitAll(tasks);

        Console.WriteLine($"合計カウント: {counter["count"]}");  // 500

        // GetOrAdd：なければ追加、あれば取得
        var config = new ConcurrentDictionary<string, string>();
        string val = config.GetOrAdd("theme", "dark");
        Console.WriteLine($"theme = {val}");

        // TryRemove で安全に削除
        if (config.TryRemove("theme", out string? removed))
            Console.WriteLine($"削除: {removed}");
    }
}`}
          expectedOutput={`合計カウント: 500
theme = dark
削除: dark`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ConcurrentQueue でのプロデューサー・コンシューマー</h2>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Concurrent;
using System.Threading;
using System.Threading.Tasks;

class Program
{
    static void Main()
    {
        var queue = new ConcurrentQueue<int>();
        var results = new ConcurrentBag<int>();

        // プロデューサー：アイテムをキューに追加
        var producer = Task.Run(() =>
        {
            for (int i = 1; i <= 10; i++)
            {
                queue.Enqueue(i);
                Thread.Sleep(10);
            }
        });

        // コンシューマー：キューからアイテムを処理
        var consumer = Task.Run(() =>
        {
            int processed = 0;
            while (processed < 10)
            {
                if (queue.TryDequeue(out int item))
                {
                    results.Add(item * 2);
                    processed++;
                }
            }
        });

        Task.WaitAll(producer, consumer);

        Console.WriteLine($"処理件数: {results.Count}");
        Console.WriteLine($"合計: {results.Sum(x => x)}");  // 1+2+...+10 の2倍 = 110
    }
}`}
          expectedOutput={`処理件数: 10
合計: 110`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collections" lessonId="concurrent" />
      </div>
      <LessonNav lessons={lessons} currentId="concurrent" basePath="/learn/collections" />
    </div>
  );
}

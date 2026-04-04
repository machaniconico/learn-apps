import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("async");

export default function TaskGenericPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">非同期処理 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Task&lt;T&gt;</h1>
        <p className="text-gray-400">非同期メソッドから値を返す方法、Task&lt;T&gt;の使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Task&lt;T&gt; で値を返す</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">Task&lt;T&gt;</code> は値を返す非同期操作を表します。
          await すると <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">T</code> 型の値が得られます。
          メソッド本体では <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">return</code> で直接値を返すだけです。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Task&lt;T&gt; の基本</h2>
        <p className="text-gray-400 mb-4">
          非同期メソッドから値を返すパターンです。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Threading.Tasks;

class ApiService
{
    public async Task<int> GetUserCountAsync()
    {
        await Task.Delay(50); // DB問い合わせシミュレーション
        return 42;
    }

    public async Task<string> GetUserNameAsync(int id)
    {
        await Task.Delay(30);
        return id == 1 ? "Alice" : "Unknown";
    }
}

class Program
{
    static async Task Main()
    {
        var service = new ApiService();

        int count = await service.GetUserCountAsync();
        Console.WriteLine($"ユーザー数: {count}");

        string name = await service.GetUserNameAsync(1);
        Console.WriteLine($"ユーザー名: {name}");

        // Task<T> を変数に保持してから await
        Task<int> countTask = service.GetUserCountAsync();
        // ... 他の処理 ...
        int result = await countTask;
        Console.WriteLine($"再取得: {result}");
    }
}`}
          expectedOutput={`ユーザー数: 42
ユーザー名: Alice
再取得: 42`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ValueTask&lt;T&gt; による最適化</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">ValueTask&lt;T&gt;</code> はヒープ割り当てを減らす構造体ベースの非同期型です。同期パスが多い場合に有効です。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Threading.Tasks;

class Cache
{
    private string? _cached;

    // キャッシュがあれば同期的に返す（ValueTask が効率的）
    public ValueTask<string> GetDataAsync()
    {
        if (_cached != null)
        {
            // 同期パス: ValueTask でラップして返す
            return ValueTask.FromResult(_cached);
        }

        // 非同期パス
        return FetchSlowAsync();
    }

    private async ValueTask<string> FetchSlowAsync()
    {
        await Task.Delay(50);
        _cached = "キャッシュされたデータ";
        return _cached;
    }
}

class Program
{
    static async Task Main()
    {
        var cache = new Cache();

        string first = await cache.GetDataAsync();   // 非同期
        Console.WriteLine($"1回目: {first}");

        string second = await cache.GetDataAsync();  // 同期（キャッシュ）
        Console.WriteLine($"2回目: {second}");
    }
}`}
          expectedOutput={`1回目: キャッシュされたデータ
2回目: キャッシュされたデータ`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="async" lessonId="task-generic" />
      </div>
      <LessonNav lessons={lessons} currentId="task-generic" basePath="/learn/async" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("async");

export default function AsyncBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">非同期処理 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">非同期処理の基本</h1>
        <p className="text-gray-400">asyncキーワード・awaitキーワード・async Mainの使い方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">非同期処理とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          非同期処理とは、時間のかかる処理（I/O・ネットワーク・DB）を待つ間、スレッドをブロックせずに他の処理を行う仕組みです。
          C#では <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">async</code> と <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">await</code> キーワードで簡潔に記述できます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">async</code> メソッドは <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">Task</code>、
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">Task&lt;T&gt;</code>、または <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">void</code>（イベントハンドラのみ）を返します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">async/await の基本</h2>
        <p className="text-gray-400 mb-4">
          awaitは非同期操作の完了を待ちながら、スレッドを解放します。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Threading.Tasks;

class Program
{
    static async Task Main(string[] args)
    {
        Console.WriteLine("処理開始");

        string result = await FetchDataAsync();
        Console.WriteLine($"結果: {result}");

        Console.WriteLine("処理完了");
    }

    static async Task<string> FetchDataAsync()
    {
        Console.WriteLine("データ取得中...");
        await Task.Delay(100); // 非同期で100ms待機
        return "取得したデータ";
    }
}`}
          expectedOutput={`処理開始
データ取得中...
結果: 取得したデータ
処理完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">非同期メソッドの命名規則</h2>
        <p className="text-gray-400 mb-4">
          非同期メソッドには慣習として <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">Async</code> サフィックスを付けます。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Threading.Tasks;

class FileService
{
    // 非同期メソッド: Asyncサフィックス
    public async Task<string> ReadFileAsync(string path)
    {
        await Task.Delay(50); // ファイル読み込みシミュレーション
        return $"'{path}'の内容";
    }

    public async Task WriteFileAsync(string path, string content)
    {
        await Task.Delay(30); // ファイル書き込みシミュレーション
        Console.WriteLine($"'{path}'に書き込み: {content}");
    }
}

class Program
{
    static async Task Main()
    {
        var svc = new FileService();

        await svc.WriteFileAsync("data.txt", "Hello!");
        string content = await svc.ReadFileAsync("data.txt");
        Console.WriteLine($"読み込み結果: {content}");
    }
}`}
          expectedOutput={`'data.txt'に書き込み: Hello!
読み込み結果: 'data.txt'の内容`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="async" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/async" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function FileioAsyncIoPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">ファイルI/O レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">非同期I/O</h1>
        <p className="text-gray-400">ReadAllTextAsync、WriteAllTextAsync、ファイルの非同期ストリーム処理を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ファイルI/Oを非同期にする理由</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ファイルI/Oはディスクアクセスを伴うため遅い操作です。同期I/Oは処理が完了するまでスレッドをブロックします。
          <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">async/await</code>を使った非同期I/Oでスレッドを解放し、スケーラビリティを向上させます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">File.ReadAllTextAsync / WriteAllTextAsync</h2>
        <p className="text-gray-400 mb-4">最も簡単な非同期ファイル操作です。</p>
        <CSharpEditor
          defaultCode={`using System.IO;

// 非同期ファイル操作
async Task DemoAsyncFileIo()
{
    string path = "async_test.txt";

    // 非同期書き込み
    await File.WriteAllTextAsync(path, "非同期でファイルを書き込みました\n");
    await File.AppendAllTextAsync(path, "追記: 非同期I/Oのデモ\n");
    Console.WriteLine("WriteAllTextAsync 完了");

    // 非同期読み込み
    string content = await File.ReadAllTextAsync(path);
    Console.WriteLine("ReadAllTextAsync 完了:");
    Console.WriteLine(content);

    // 非同期で全行読み込み
    string[] lines = await File.ReadAllLinesAsync(path);
    Console.WriteLine($"行数: {lines.Length}");

    File.Delete(path);
}

await DemoAsyncFileIo();`}
          expectedOutput={`WriteAllTextAsync 完了
ReadAllTextAsync 完了:
非同期でファイルを書き込みました
追記: 非同期I/Oのデモ

行数: 2`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">非同期ストリームでの行処理</h2>
        <p className="text-gray-400 mb-4">大きなファイルを1行ずつ非同期に処理します。</p>
        <CSharpEditor
          defaultCode={`using System.IO;
using System.Runtime.CompilerServices;

// 非同期ストリームで大きなファイルを行ごとに処理
async Task ProcessLargeFileAsync(string path)
{
    using var reader = new StreamReader(path);

    // ReadLineAsync で1行ずつ非同期読み込み
    string? line;
    int lineCount = 0;
    while ((line = await reader.ReadLineAsync()) != null)
    {
        lineCount++;
        // 各行を処理（例: フィルタリング）
        if (line.Contains("重要"))
        {
            Console.WriteLine($"[重要] 行{lineCount}: {line}");
        }
    }
    Console.WriteLine($"処理完了: {lineCount}行");
}

// テスト用ファイル作成
string testPath = "large_file.txt";
await File.WriteAllLinesAsync(testPath, new[]
{
    "通常の行1",
    "重要: イベント発生",
    "通常の行3",
    "重要: エラー検出",
    "通常の行5",
});

await ProcessLargeFileAsync(testPath);
File.Delete(testPath);

// 並列ファイル処理
Console.WriteLine();
Console.WriteLine("// 複数ファイルを並列に読み込む");
Console.WriteLine("var tasks = files.Select(f => File.ReadAllTextAsync(f));");
Console.WriteLine("string[] contents = await Task.WhenAll(tasks);");`}
          expectedOutput={`[重要] 行2: 重要: イベント発生
[重要] 行4: 重要: エラー検出
処理完了: 5行

// 複数ファイルを並列に読み込む
var tasks = files.Select(f => File.ReadAllTextAsync(f));
string[] contents = await Task.WhenAll(tasks);`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="fileio" lessonId="async-io" />
      </div>
      <LessonNav lessons={lessons} currentId="async-io" basePath="/learn/fileio" />
    </div>
  );
}

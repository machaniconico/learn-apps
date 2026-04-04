import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function FileioStreamReaderWriterPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">ファイルI/O レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">StreamReader・Writer</h1>
        <p className="text-gray-400">StreamReader、StreamWriter、using文、エンコーディングを使ったテキストファイル操作を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">StreamReader/Writerを使う理由</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">File.ReadAllText</code>はファイル全体をメモリに読み込みます。大きなファイルの場合は<code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">StreamReader</code>で1行ずつ処理する方がメモリ効率が良いです。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">StreamWriter での書き込み</h2>
        <p className="text-gray-400 mb-4">using文でStreamWriterを管理して確実にリソース解放します。</p>
        <CSharpEditor
          defaultCode={`using System.IO;
using System.Text;

string path = "stream_test.txt";

// StreamWriter で書き込み（デフォルト: UTF-8）
using (var writer = new StreamWriter(path, append: false, Encoding.UTF8))
{
    writer.WriteLine("StreamWriterのテスト");
    writer.WriteLine("日本語テキスト");
    writer.Write("改行なし: ");
    writer.WriteLine("続き");

    // バッファをフラッシュ
    writer.Flush();
}
Console.WriteLine("StreamWriter: 書き込み完了");

// StreamReader で読み込み
using (var reader = new StreamReader(path, Encoding.UTF8))
{
    string? line;
    int lineNum = 1;
    while ((line = reader.ReadLine()) != null)
    {
        Console.WriteLine($"{lineNum++}: {line}");
    }
}

// ファイル後片付け
File.Delete(path);`}
          expectedOutput={`StreamWriter: 書き込み完了
1: StreamWriterのテスト
2: 日本語テキスト
3: 改行なし: 続き`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">エンコーディングの扱い</h2>
        <p className="text-gray-400 mb-4">文字コードの違いによる文字化けを防ぎます。</p>
        <CSharpEditor
          defaultCode={`using System.IO;
using System.Text;

// エンコーディングの種類と使い分け
Console.WriteLine("主なエンコーディング:");
Console.WriteLine();

var encodings = new[]
{
    ("Encoding.UTF8",           "UTF-8（BOMなし）: Webと相互運用に最適"),
    ("new UTF8Encoding(true)",  "UTF-8（BOM付き）: Windowsアプリとの互換性"),
    ("Encoding.Unicode",        "UTF-16 LE: Windowsのネイティブエンコード"),
    ("Encoding.GetEncoding(932)","Shift-JIS: レガシー日本語ファイル"),
    ("Encoding.Latin1",         "ISO-8859-1: ラテン文字"),
};

foreach (var (name, desc) in encodings)
{
    Console.WriteLine($"  {name,-30} // {desc}");
}

Console.WriteLine();
Console.WriteLine("// BOM（Byte Order Mark）の確認");
Console.WriteLine("// UTF-8 BOM付き: EF BB BF が先頭に付く");
Console.WriteLine("// using var reader = new StreamReader(path, detectEncodingFromByteOrderMarks: true);");
Console.WriteLine("// -> 自動的にエンコーディングを検出（BOM使用時）");`}
          expectedOutput={`主なエンコーディング:

  Encoding.UTF8                  // UTF-8（BOMなし）: Webと相互運用に最適
  new UTF8Encoding(true)         // UTF-8（BOM付き）: Windowsアプリとの互換性
  Encoding.Unicode               // UTF-16 LE: Windowsのネイティブエンコード
  Encoding.GetEncoding(932)      // Shift-JIS: レガシー日本語ファイル
  Encoding.Latin1                // ISO-8859-1: ラテン文字

// BOM（Byte Order Mark）の確認
// UTF-8 BOM付き: EF BB BF が先頭に付く
// using var reader = new StreamReader(path, detectEncodingFromByteOrderMarks: true);
// -> 自動的にエンコーディングを検出（BOM使用時）`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="fileio" lessonId="stream-reader-writer" />
      </div>
      <LessonNav lessons={lessons} currentId="stream-reader-writer" basePath="/learn/fileio" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function FileioFileDirectoryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">ファイルI/O レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">File・Directory</h1>
        <p className="text-gray-400">File.ReadAllText、File.WriteAllText、Directory.CreateDirectoryなどの基本操作を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">FileクラスとDirectoryクラス</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">System.IO.File</code>はファイルの読み書き・コピー・移動・削除などの静的メソッドを提供します。
          <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">System.IO.Directory</code>はディレクトリ（フォルダ）の作成・削除・一覧取得を行います。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Fileクラスの主要メソッド</h2>
        <p className="text-gray-400 mb-4">ファイルの読み書きの基本パターンです。</p>
        <CSharpEditor
          defaultCode={`using System.IO;

// ファイルの書き込みと読み込み
string filePath = "sample.txt";
string[] lines = { "1行目: Hello", "2行目: World", "3行目: C#" };

// 全行書き込み
File.WriteAllLines(filePath, lines);
Console.WriteLine("WriteAllLines 完了");

// 全テキスト読み込み
string allText = File.ReadAllText(filePath);
Console.WriteLine("ReadAllText の結果:");
Console.WriteLine(allText);

// 全行読み込み
string[] readLines = File.ReadAllLines(filePath);
Console.WriteLine($"ReadAllLines: {readLines.Length}行");
for (int i = 0; i < readLines.Length; i++)
{
    Console.WriteLine($"  [{i}] {readLines[i]}");
}

// テキスト追記
File.AppendAllText(filePath, "4行目: 追記\n");
Console.WriteLine("AppendAllText 完了");

// ファイル存在確認・コピー・削除
Console.WriteLine($"Exists: {File.Exists(filePath)}");
File.Copy(filePath, "copy.txt", overwrite: true);
Console.WriteLine("Copy 完了");
File.Delete(filePath);
File.Delete("copy.txt");
Console.WriteLine("Delete 完了");`}
          expectedOutput={`WriteAllLines 完了
ReadAllText の結果:
1行目: Hello
2行目: World
3行目: C#

ReadAllLines: 3行
  [0] 1行目: Hello
  [1] 2行目: World
  [2] 3行目: C#
AppendAllText 完了
Exists: True
Copy 完了
Delete 完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Directoryクラスの操作</h2>
        <p className="text-gray-400 mb-4">ディレクトリの作成・一覧・削除を行います。</p>
        <CSharpEditor
          defaultCode={`using System.IO;

// ディレクトリ操作
string dirPath = "testdir";

// ディレクトリ作成（既存でもエラーにならない）
Directory.CreateDirectory(dirPath);
Console.WriteLine($"CreateDirectory: {dirPath}");

// ファイルを作成してテスト
File.WriteAllText(Path.Combine(dirPath, "a.txt"), "content a");
File.WriteAllText(Path.Combine(dirPath, "b.txt"), "content b");

// ファイル一覧
string[] files = Directory.GetFiles(dirPath);
Console.WriteLine($"ファイル一覧 ({files.Length}件):");
foreach (var f in files)
{
    Console.WriteLine($"  {Path.GetFileName(f)}");
}

// Pathクラスの便利メソッド
string fullPath = Path.GetFullPath(dirPath);
Console.WriteLine($"フルパス: {fullPath.Substring(0, 20)}...");
Console.WriteLine($"ディレクトリ名: {Path.GetDirectoryName(fullPath)}");

// ディレクトリ削除（recursive=true で中身ごと削除）
Directory.Delete(dirPath, recursive: true);
Console.WriteLine($"Delete: 完了");`}
          expectedOutput={`CreateDirectory: testdir
ファイル一覧 (2件):
  a.txt
  b.txt
フルパス: /Users/macha/csharp-le...
ディレクトリ名: /Users/macha/csharp-learn-app
Delete: 完了`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="fileio" lessonId="file-directory" />
      </div>
      <LessonNav lessons={lessons} currentId="file-directory" basePath="/learn/fileio" />
    </div>
  );
}

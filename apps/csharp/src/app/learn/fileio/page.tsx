import { CSharpEditor } from "@/components/csharp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function FileioPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-400 mb-2">ファイルI/O</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C#でのファイル操作を学びましょう。File・Directory・StreamReader/Writer・JSON・XML・CSV処理まで、データの読み書きに必要なすべての技術を習得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="fileio" totalLessons={6} color="indigo" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/fileio" color="indigo" categoryId="fileio" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ファイル操作の概要</h2>
        <p className="text-gray-400 mb-4">
          System.IOnamespaceはC#でのファイル・ディレクトリ操作の基盤です。File・Directory・Path・Stream など多くのクラスが提供されています。
        </p>
        <CSharpEditor
          defaultCode={`using System.IO;

// ファイル操作の基本
string path = "sample.txt";
string content = "Hello, File I/O!";

// ファイルに書き込む
File.WriteAllText(path, content);
Console.WriteLine("ファイルを書き込みました");

// ファイルから読み込む
string read = File.ReadAllText(path);
Console.WriteLine($"読み込み内容: {read}");

// ファイルが存在するか確認
bool exists = File.Exists(path);
Console.WriteLine($"ファイル存在: {exists}");

// ファイルを削除
File.Delete(path);
Console.WriteLine("ファイルを削除しました");`}
          expectedOutput={`ファイルを書き込みました
読み込み内容: Hello, File I/O!
ファイル存在: True
ファイルを削除しました`}
        />
      </section>
    </div>
  );
}

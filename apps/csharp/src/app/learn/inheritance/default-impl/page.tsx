import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function DefaultImplPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">継承・インターフェース レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">デフォルト実装</h1>
        <p className="text-gray-400">C# 8 で導入されたインターフェースのデフォルトメソッド実装。既存実装を破壊せずに機能追加する方法</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">デフォルトインターフェースメソッドとは</h2>
        <p className="text-gray-400 mb-3">
          C# 8 で導入されたデフォルトインターフェースメソッドにより、インターフェースにメソッドの実装を持たせられます。
          既存のインターフェース実装クラスを変更することなく、新しいメソッドを追加できます。
        </p>
        <p className="text-gray-400">
          これは特にライブラリのバージョンアップ時に有用です。既存コードを壊さずにインターフェースを拡張できます。
          実装クラスでオーバーライドしなければデフォルト実装が使われます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">デフォルト実装の基本</h2>
        <p className="text-gray-400 mb-4">
          デフォルト実装はインターフェース型の参照からのみアクセスできます（クラス型からは直接アクセス不可）。
          実装クラスでオーバーライドした場合はそちらが優先されます。
        </p>
        <CSharpEditor
          defaultCode={`using System;

interface ILogger
{
    void Log(string message);

    // デフォルト実装（C# 8以降）
    void LogInfo(string message)
    {
        Log($"[INFO] {message}");
    }

    void LogError(string message)
    {
        Log($"[ERROR] {message}");
    }
}

class ConsoleLogger : ILogger
{
    // Log のみ実装（LogInfo/LogError はデフォルトを使用）
    public void Log(string message)
    {
        Console.WriteLine($"{DateTime.Now:HH:mm:ss} {message}");
    }
}

class Program
{
    static void Main()
    {
        ILogger logger = new ConsoleLogger();
        logger.Log("直接ログ");
        logger.LogInfo("情報メッセージ");
        logger.LogError("エラーが発生しました");
    }
}`}
          expectedOutput={`12:00:00 直接ログ
12:00:00 [INFO] 情報メッセージ
12:00:00 [ERROR] エラーが発生しました`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">デフォルト実装のオーバーライド</h2>
        <p className="text-gray-400 mb-4">
          実装クラスがデフォルト実装を持つメソッドをオーバーライドすると、そのクラスでは独自の実装が使われます。
          これにより柔軟なカスタマイズが可能です。
        </p>
        <CSharpEditor
          defaultCode={`using System;

interface IGreeter
{
    string GetName();

    // デフォルト実装
    void Greet()
    {
        Console.WriteLine($"こんにちは、{GetName()}さん！");
    }

    void FormalGreet()
    {
        Console.WriteLine($"はじめまして。{GetName()}と申します。");
    }
}

class CasualPerson : IGreeter
{
    public string GetName() => "田中";
    // Greet・FormalGreet はデフォルトを使用
}

class FormalPerson : IGreeter
{
    public string GetName() => "鈴木部長";

    // FormalGreet をオーバーライド
    public void FormalGreet()
    {
        Console.WriteLine($"ご挨拶申し上げます。{GetName()}でございます。");
    }
}

class Program
{
    static void Main()
    {
        IGreeter casual = new CasualPerson();
        casual.Greet();
        casual.FormalGreet();

        Console.WriteLine();

        IGreeter formal = new FormalPerson();
        formal.Greet();
        formal.FormalGreet(); // オーバーライド版
    }
}`}
          expectedOutput={`こんにちは、田中さん！
はじめまして。田中と申します。

こんにちは、鈴木部長さん！
ご挨拶申し上げます。鈴木部長でございます。`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="default-impl" />
      </div>
      <LessonNav lessons={lessons} currentId="default-impl" basePath="/learn/inheritance" />
    </div>
  );
}

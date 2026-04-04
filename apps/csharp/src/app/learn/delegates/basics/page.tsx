import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("delegates");

export default function DelegatesBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">デリゲート・イベント レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">デリゲートの基本</h1>
        <p className="text-gray-400">delegateキーワードでメソッドへの参照を保持する型の宣言と呼び出しを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">デリゲートとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          デリゲートはメソッドへの参照を格納できる型です。特定のシグネチャ（引数の型と戻り値の型）を持つメソッドなら、
          インスタンスメソッドでも静的メソッドでも格納できます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          関数を引数として渡したり、変数に代入したりする「関数を第一級オブジェクトとして扱う」ことができます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">デリゲートの宣言と使用</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">delegate</code> キーワードでデリゲート型を宣言します。
        </p>
        <CSharpEditor
          defaultCode={`using System;

// デリゲート型を宣言（int を受け取り string を返すメソッドの型）
delegate string Formatter(int value);

class Program
{
    static string ToJapanese(int n) => $"{n}個";
    static string ToPrice(int n) => $"¥{n:N0}";

    static void Main()
    {
        // デリゲートにメソッドを代入
        Formatter fmt = ToJapanese;
        Console.WriteLine(fmt(42));   // ToJapanese を呼び出す

        // 別のメソッドに切り替え
        fmt = ToPrice;
        Console.WriteLine(fmt(1000)); // ToPrice を呼び出す

        // デリゲートを引数として渡す
        PrintWithFormat(100, ToJapanese);
        PrintWithFormat(100, ToPrice);
    }

    static void PrintWithFormat(int value, Formatter formatter)
    {
        Console.WriteLine("結果: " + formatter(value));
    }
}`}
          expectedOutput={`42個
¥1,000
結果: 100個
結果: ¥100`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">マルチキャストデリゲート</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">+=</code> で複数のメソッドを1つのデリゲートに追加できます（マルチキャスト）。
        </p>
        <CSharpEditor
          defaultCode={`using System;

delegate void Logger(string message);

class Program
{
    static void LogToConsole(string msg) => Console.WriteLine($"[Console] {msg}");
    static void LogToFile(string msg) => Console.WriteLine($"[File] {msg}");
    static void LogToCloud(string msg) => Console.WriteLine($"[Cloud] {msg}");

    static void Main()
    {
        Logger logger = LogToConsole;
        logger += LogToFile;    // メソッドを追加
        logger += LogToCloud;

        // 3つのメソッドが順番に呼ばれる
        logger("エラーが発生しました");

        logger -= LogToFile;    // メソッドを削除
        Console.WriteLine("--- File削除後 ---");
        logger("情報ログ");
    }
}`}
          expectedOutput={`[Console] エラーが発生しました
[File] エラーが発生しました
[Cloud] エラーが発生しました
--- File削除後 ---
[Console] 情報ログ
[Cloud] 情報ログ`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="delegates" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/delegates" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("methods");

export default function MethodsBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">メソッド レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">メソッドの基本</h1>
        <p className="text-gray-400">static void メソッドの定義、Main メソッド、メソッドの呼び出し方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">メソッドとは何か</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          メソッドは一連の処理をひとまとめにした「名前付きコードブロック」です。
          同じ処理を何度も書く代わりに、メソッドとして定義して呼び出します。
          C# のメソッドは次の形式で定義します：
        </p>
        <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm text-gray-300">
          <span className="text-blue-400">アクセス修飾子</span>{" "}
          <span className="text-yellow-400">static</span>{" "}
          <span className="text-green-400">戻り値の型</span>{" "}
          <span className="text-teal-400">メソッド名</span>
          {"("}
          <span className="text-orange-400">引数リスト</span>
          {")"}
          {" { 処理 }"}
        </div>
        <p className="text-gray-300 leading-relaxed mt-4">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-400">static</code> キーワードはインスタンスを作らずに呼べるメソッドを意味します。
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-400">void</code> は「戻り値なし」を意味します。
          プログラムの起点となる <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-400">Main</code> メソッドも同様に定義されます。
        </p>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Main メソッドの役割</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-400">Main</code> メソッドは C# プログラムのエントリーポイントです。
          プログラムを実行すると最初に呼ばれます。現代の C# ではトップレベルステートメントも使えますが、
          クラスベースのプログラムでは <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-400">static void Main()</code> または
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-400">static int Main(string[] args)</code> が一般的です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">メソッドの定義と呼び出し</h2>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    // void メソッド：戻り値なし
    static void SayHello()
    {
        Console.WriteLine("こんにちは！");
    }

    // 引数ありの void メソッド
    static void PrintLine(string message)
    {
        Console.WriteLine($">> {message}");
    }

    static void Main()
    {
        // メソッドの呼び出し
        SayHello();
        PrintLine("C#のメソッドを学んでいます");
        SayHello();
        PrintLine("メソッドは何度でも呼べます");
    }
}`}
          expectedOutput={`こんにちは！
>> C#のメソッドを学んでいます
こんにちは！
>> メソッドは何度でも呼べます`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数のメソッドで処理を分割する</h2>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    static void PrintHeader()
    {
        Console.WriteLine("=== 計算プログラム ===");
    }

    static void PrintResult(string op, int a, int b, int result)
    {
        Console.WriteLine($"{a} {op} {b} = {result}");
    }

    static void PrintFooter()
    {
        Console.WriteLine("===================");
    }

    static void Main()
    {
        PrintHeader();
        PrintResult("+", 10, 3, 10 + 3);
        PrintResult("-", 10, 3, 10 - 3);
        PrintResult("*", 10, 3, 10 * 3);
        PrintFooter();
    }
}`}
          expectedOutput={`=== 計算プログラム ===
10 + 3 = 13
10 - 3 = 7
10 * 3 = 30
===================`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">メソッドのポイントまとめ</h2>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-teal-400 font-bold mt-0.5">•</span>
            <span>メソッドは処理を再利用可能なブロックにまとめたもの</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal-400 font-bold mt-0.5">•</span>
            <span><code className="bg-gray-800 px-1 rounded text-teal-300">static void Main()</code> がプログラムの起点</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal-400 font-bold mt-0.5">•</span>
            <span>メソッド名の後に <code className="bg-gray-800 px-1 rounded text-teal-300">()</code> を付けて呼び出す</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal-400 font-bold mt-0.5">•</span>
            <span>処理を適切に分割するとコードが読みやすく・テストしやすくなる</span>
          </li>
        </ul>
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="methods" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/methods" />
    </div>
  );
}

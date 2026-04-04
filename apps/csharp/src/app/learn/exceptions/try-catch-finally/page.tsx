import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("exceptions");

export default function ExceptionsTryCatchFinallyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">例外処理 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">try-catch-finally</h1>
        <p className="text-gray-400">基本的な例外処理、複数catchブロック、finallyブロックの使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">例外処理の基本構造</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">try</code>ブロックに例外が発生するかもしれないコードを書き、
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">catch</code>ブロックで例外を捕捉して処理します。
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">finally</code>ブロックは例外の有無に関わらず必ず実行されます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数catchブロック</h2>
        <p className="text-gray-400 mb-4">具体的な例外型から順番に捕捉します。</p>
        <CSharpEditor
          defaultCode={`// 複数のcatchブロック
void ProcessInput(string input)
{
    try
    {
        int number = int.Parse(input);
        int[] arr = new int[5];
        arr[number] = 100;
        Console.WriteLine($"arr[{number}] = 100");
    }
    catch (FormatException)
    {
        // 具体的な例外を先に捕捉
        Console.WriteLine($"エラー: \"{input}\" は数値ではありません");
    }
    catch (IndexOutOfRangeException ex)
    {
        Console.WriteLine($"エラー: インデックス範囲外 - {ex.Message}");
    }
    catch (Exception ex)
    {
        // 汎用的な例外は最後に
        Console.WriteLine($"予期しないエラー: {ex.Message}");
    }
    finally
    {
        Console.WriteLine("--- 処理終了 ---");
    }
}

ProcessInput("abc");   // FormatException
Console.WriteLine();
ProcessInput("10");    // IndexOutOfRangeException
Console.WriteLine();
ProcessInput("3");     // 正常`}
          expectedOutput={`エラー: "abc" は数値ではありません
--- 処理終了 ---

エラー: インデックス範囲外 - Index was outside the bounds of the array.
--- 処理終了 ---

arr[3] = 100
--- 処理終了 ---`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">finallyの活用</h2>
        <p className="text-gray-400 mb-4">リソースの確実な解放にfinallyを使います。</p>
        <CSharpEditor
          defaultCode={`// finallyによるリソース解放
// ※ usingステートメントの方が推奨されるが、概念理解のために

System.IO.StreamWriter? writer = null;
try
{
    writer = new System.IO.StreamWriter("test.txt");
    writer.WriteLine("テストデータ");
    Console.WriteLine("ファイル書き込み成功");

    // 意図的に例外を発生させる
    // throw new Exception("テスト例外");
}
catch (Exception ex)
{
    Console.WriteLine($"エラー: {ex.Message}");
}
finally
{
    // 例外が発生しても必ずCloseする
    writer?.Close();
    writer?.Dispose();
    Console.WriteLine("finallyでStreamWriterを解放");
}

// より良い方法: using ステートメント
Console.WriteLine();
Console.WriteLine("// 推奨: using ステートメントを使う");
Console.WriteLine("using (var w = new StreamWriter(\"test.txt\"))");
Console.WriteLine("{");
Console.WriteLine("    w.WriteLine(\"テストデータ\");");
Console.WriteLine("}  // ここで自動的にDisposeが呼ばれる");`}
          expectedOutput={`ファイル書き込み成功
finallyでStreamWriterを解放

// 推奨: using ステートメントを使う
using (var w = new StreamWriter("test.txt"))
{
    w.WriteLine("テストデータ");
}  // ここで自動的にDisposeが呼ばれる`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="exceptions" lessonId="try-catch-finally" />
      </div>
      <LessonNav lessons={lessons} currentId="try-catch-finally" basePath="/learn/exceptions" />
    </div>
  );
}

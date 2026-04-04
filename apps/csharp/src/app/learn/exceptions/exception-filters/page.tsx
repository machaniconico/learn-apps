import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("exceptions");

export default function ExceptionsExceptionFiltersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">例外処理 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">例外フィルター</h1>
        <p className="text-gray-400">catchブロックのwhen節を使った条件付き例外処理を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">例外フィルターとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C# 6.0で導入された<code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">when</code>節を使うと、例外の種類だけでなく追加の条件を満たした場合だけcatchブロックを実行できます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          when節の条件がfalseの場合、catchブロックはスキップされ次のcatchが評価されます。これにより、同じ例外型でも条件によって異なる処理ができます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">when節の基本的な使い方</h2>
        <p className="text-gray-400 mb-4">例外オブジェクトのプロパティで処理を分岐します。</p>
        <CSharpEditor
          defaultCode={`// 例外フィルター（when節）の使い方
public class HttpException : Exception
{
    public int StatusCode { get; }
    public HttpException(int statusCode, string message)
        : base(message)
    {
        StatusCode = statusCode;
    }
}

void HandleHttpException(int statusCode)
{
    try
    {
        throw new HttpException(statusCode, $"HTTP {statusCode}エラー");
    }
    catch (HttpException ex) when (ex.StatusCode == 404)
    {
        Console.WriteLine($"[Not Found] ページが見つかりません: {ex.Message}");
    }
    catch (HttpException ex) when (ex.StatusCode >= 500)
    {
        Console.WriteLine($"[Server Error] サーバーエラー: {ex.Message}");
    }
    catch (HttpException ex) when (ex.StatusCode >= 400)
    {
        Console.WriteLine($"[Client Error] クライアントエラー: {ex.Message}");
    }
    catch (HttpException ex)
    {
        Console.WriteLine($"[HTTP Error] その他: {ex.Message}");
    }
}

HandleHttpException(404);
HandleHttpException(500);
HandleHttpException(403);
HandleHttpException(301);`}
          expectedOutput={`[Not Found] ページが見つかりません: HTTP 404エラー
[Server Error] サーバーエラー: HTTP 500エラー
[Client Error] クライアントエラー: HTTP 403エラー
[HTTP Error] その他: HTTP 301エラー`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">when節のデバッグ用途</h2>
        <p className="text-gray-400 mb-4">when節にログ出力を入れて例外を再スローせずにトレースできます。</p>
        <CSharpEditor
          defaultCode={`using System.Diagnostics;

// when節をデバッグログに活用するテクニック
bool LogException(Exception ex)
{
    Debug.WriteLine($"[EXCEPTION] {ex.GetType().Name}: {ex.Message}");
    Console.WriteLine($"[LOG] 例外が記録されました: {ex.Message}");
    return false; // falseを返すことでこのcatchをスキップ
}

try
{
    int[] arr = new int[3];
    arr[10] = 1;
}
catch (Exception ex) when (LogException(ex))
{
    // LogException が false を返すのでここには来ない
    Console.WriteLine("このコードは実行されない");
}
catch (IndexOutOfRangeException ex)
{
    // こちらのcatchが実行される
    Console.WriteLine($"IndexOutOfRange を処理: {ex.Message}");
}

Console.WriteLine();
Console.WriteLine("when節でfalseを返すとcatchをスキップして");
Console.WriteLine("スタックトレースを保持したまま次のcatchへ進む");`}
          expectedOutput={`[LOG] 例外が記録されました: Index was outside the bounds of the array.
IndexOutOfRange を処理: Index was outside the bounds of the array.

when節でfalseを返すとcatchをスキップして
スタックトレースを保持したまま次のcatchへ進む`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="exceptions" lessonId="exception-filters" />
      </div>
      <LessonNav lessons={lessons} currentId="exception-filters" basePath="/learn/exceptions" />
    </div>
  );
}

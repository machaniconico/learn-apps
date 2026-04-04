import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("webapi");

export default function FiltersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">Web API レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">フィルター</h1>
        <p className="text-gray-400">IActionFilter・IExceptionFilter・フィルターパイプラインの仕組みを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">フィルターとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          フィルターはアクション実行の前後に横断的な処理を追加するしくみです。ミドルウェアよりも細かい粒度で制御できます。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">IActionFilter</code>: アクション実行前後</li>
          <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">IExceptionFilter</code>: 例外処理</li>
          <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">IAuthorizationFilter</code>: 認可</li>
          <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">IResultFilter</code>: 結果処理前後</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ActionFilter のシミュレーション</h2>
        <p className="text-gray-400 mb-4">
          ログ記録や実行時間計測に使えるActionFilterの実装例です。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Diagnostics;

// ActionFilter のシミュレーション
class ActionContext
{
    public string ActionName { get; set; } = "";
    public object? Result { get; set; }
}

interface IActionFilter
{
    void OnActionExecuting(ActionContext context);
    void OnActionExecuted(ActionContext context);
}

// 実行時間計測フィルター
class TimingFilter : IActionFilter
{
    private Stopwatch? _sw;

    public void OnActionExecuting(ActionContext ctx)
    {
        _sw = Stopwatch.StartNew();
        Console.WriteLine($"[Timing] {ctx.ActionName} 開始");
    }

    public void OnActionExecuted(ActionContext ctx)
    {
        _sw?.Stop();
        Console.WriteLine($"[Timing] {ctx.ActionName} 完了: {_sw?.ElapsedMilliseconds}ms");
    }
}

// ログ記録フィルター
class LoggingFilter : IActionFilter
{
    public void OnActionExecuting(ActionContext ctx)
        => Console.WriteLine($"[Log] リクエスト: {ctx.ActionName}");

    public void OnActionExecuted(ActionContext ctx)
        => Console.WriteLine($"[Log] レスポンス: {ctx.Result}");
}

// フィルターパイプライン
class FilterPipeline
{
    private readonly IActionFilter[] _filters;

    public FilterPipeline(params IActionFilter[] filters) => _filters = filters;

    public void Execute(string actionName, Func<object> action)
    {
        var ctx = new ActionContext { ActionName = actionName };
        foreach (var f in _filters) f.OnActionExecuting(ctx);
        ctx.Result = action();
        foreach (var f in _filters) f.OnActionExecuted(ctx);
    }
}

class Program
{
    static void Main()
    {
        var pipeline = new FilterPipeline(new LoggingFilter(), new TimingFilter());

        pipeline.Execute("GetProducts", () =>
        {
            System.Threading.Thread.Sleep(50); // シミュレーション
            return "商品リスト";
        });
    }
}`}
          expectedOutput={`[Log] リクエスト: GetProducts
[Timing] GetProducts 開始
[Timing] GetProducts 完了: 50ms
[Log] レスポンス: 商品リスト`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ExceptionFilter で例外を統一処理</h2>
        <p className="text-gray-400 mb-4">
          例外フィルターでAPIの例外レスポンスを一元管理します。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class ApiException : Exception
{
    public int StatusCode { get; }
    public ApiException(int status, string message) : base(message) => StatusCode = status;
}

class NotFoundException : ApiException
{
    public NotFoundException(string resource) : base(404, $"{resource}が見つかりません") { }
}

// ExceptionFilter シミュレーション
class GlobalExceptionHandler
{
    public void Handle(Exception ex)
    {
        if (ex is ApiException apiEx)
        {
            Console.WriteLine($"APIエラー {apiEx.StatusCode}: {apiEx.Message}");
        }
        else if (ex is UnauthorizedAccessException)
        {
            Console.WriteLine("401 Unauthorized: 認証が必要です");
        }
        else
        {
            Console.WriteLine($"500 Internal Server Error: {ex.Message}");
        }
    }
}

class Program
{
    static void Main()
    {
        var handler = new GlobalExceptionHandler();

        handler.Handle(new NotFoundException("ユーザー"));
        handler.Handle(new ApiException(400, "無効なリクエスト"));
        handler.Handle(new UnauthorizedAccessException());
        handler.Handle(new Exception("予期しないエラー"));
    }
}`}
          expectedOutput={`APIエラー 404: ユーザーが見つかりません
APIエラー 400: 無効なリクエスト
401 Unauthorized: 認証が必要です
500 Internal Server Error: 予期しないエラー`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="webapi" lessonId="filters" />
      </div>
      <LessonNav lessons={lessons} currentId="filters" basePath="/learn/webapi" />
    </div>
  );
}

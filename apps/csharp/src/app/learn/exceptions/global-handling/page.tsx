import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("exceptions");

export default function ExceptionsGlobalHandlingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">例外処理 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">グローバルハンドリング</h1>
        <p className="text-gray-400">AppDomain.UnhandledException、ASP.NET Coreミドルウェアによる全体例外処理を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">グローバル例外ハンドラーの重要性</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          どんなに丁寧に例外処理を書いても、予期しない例外が漏れることがあります。グローバルハンドラーはアプリケーション全体のセーフネットとして機能し、ユーザーへのエラー表示とログ記録を保証します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">AppDomain.UnhandledException</h2>
        <p className="text-gray-400 mb-4">コンソールアプリケーションでの未処理例外をキャッチします。</p>
        <CSharpEditor
          defaultCode={`// AppDomain.UnhandledException: コンソールアプリの最終セーフネット
AppDomain.CurrentDomain.UnhandledException += (sender, e) =>
{
    var ex = e.ExceptionObject as Exception;
    Console.WriteLine($"[致命的エラー] 未処理の例外:");
    Console.WriteLine($"  種類: {ex?.GetType().Name}");
    Console.WriteLine($"  メッセージ: {ex?.Message}");
    Console.WriteLine($"  終了フラグ: {e.IsTerminating}");

    // ログファイルに記録
    // File.AppendAllText("crash.log", $"{DateTime.Now}: {ex}");
};

// TaskScheduler.UnobservedTaskException: 非同期タスクの未処理例外
TaskScheduler.UnobservedTaskException += (sender, e) =>
{
    Console.WriteLine($"[非同期エラー] {e.Exception.Message}");
    e.SetObserved(); // アプリを終了させない
};

Console.WriteLine("グローバルハンドラーを登録しました");
Console.WriteLine();
Console.WriteLine("// 未処理例外をシミュレート");
Console.WriteLine("// throw new Exception(\"予期しないエラー\");");
Console.WriteLine("// -> AppDomain.UnhandledException が呼ばれる");`}
          expectedOutput={`グローバルハンドラーを登録しました

// 未処理例外をシミュレート
// throw new Exception("予期しないエラー");
// -> AppDomain.UnhandledException が呼ばれる`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ASP.NET Core の例外ミドルウェア</h2>
        <p className="text-gray-400 mb-4">WebアプリでのグローバルエラーハンドリングはMiddlewareで実装します。</p>
        <CSharpEditor
          defaultCode={`// ASP.NET Core での例外ハンドリング
Console.WriteLine("=== ASP.NET Core 例外ミドルウェア ===");
Console.WriteLine();

// 方法1: UseExceptionHandler（推奨）
Console.WriteLine("// Program.cs での設定");
Console.WriteLine("if (app.Environment.IsDevelopment())");
Console.WriteLine("{");
Console.WriteLine("    app.UseDeveloperExceptionPage();");
Console.WriteLine("    // 開発環境: 詳細なエラー画面");
Console.WriteLine("}");
Console.WriteLine("else");
Console.WriteLine("{");
Console.WriteLine("    app.UseExceptionHandler(\"/Error\");");
Console.WriteLine("    // 本番環境: ユーザー向けエラーページ");
Console.WriteLine("}");
Console.WriteLine();

// 方法2: カスタムミドルウェア
Console.WriteLine("// カスタム例外ミドルウェア");
Console.WriteLine("public class GlobalExceptionMiddleware");
Console.WriteLine("{");
Console.WriteLine("    public async Task InvokeAsync(HttpContext ctx, RequestDelegate next)");
Console.WriteLine("    {");
Console.WriteLine("        try { await next(ctx); }");
Console.WriteLine("        catch (NotFoundException ex)");
Console.WriteLine("        {");
Console.WriteLine("            ctx.Response.StatusCode = 404;");
Console.WriteLine("            await ctx.Response.WriteAsJsonAsync(");
Console.WriteLine("                new { error = ex.Message });");
Console.WriteLine("        }");
Console.WriteLine("        catch (Exception ex)");
Console.WriteLine("        {");
Console.WriteLine("            ctx.Response.StatusCode = 500;");
Console.WriteLine("            await ctx.Response.WriteAsJsonAsync(");
Console.WriteLine("                new { error = \"内部サーバーエラー\" });");
Console.WriteLine("        }");
Console.WriteLine("    }");
Console.WriteLine("}");`}
          expectedOutput={`=== ASP.NET Core 例外ミドルウェア ===

// Program.cs での設定
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    // 開発環境: 詳細なエラー画面
}
else
{
    app.UseExceptionHandler("/Error");
    // 本番環境: ユーザー向けエラーページ
}

// カスタム例外ミドルウェア
public class GlobalExceptionMiddleware
{
    public async Task InvokeAsync(HttpContext ctx, RequestDelegate next)
    {
        try { await next(ctx); }
        catch (NotFoundException ex)
        {
            ctx.Response.StatusCode = 404;
            await ctx.Response.WriteAsJsonAsync(
                new { error = ex.Message });
        }
        catch (Exception ex)
        {
            ctx.Response.StatusCode = 500;
            await ctx.Response.WriteAsJsonAsync(
                new { error = "内部サーバーエラー" });
        }
    }
}`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="exceptions" lessonId="global-handling" />
      </div>
      <LessonNav lessons={lessons} currentId="global-handling" basePath="/learn/exceptions" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("aspnet");

export default function MiddlewarePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">ASP.NET Core基礎 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ミドルウェア</h1>
        <p className="text-gray-400">Use・Map・Runメソッド・ミドルウェアパイプラインの順序と仕組みを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ミドルウェアとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ミドルウェアはHTTPリクエストとレスポンスを処理するコンポーネントです。
          パイプライン（連鎖）として接続され、各ミドルウェアは次のミドルウェアを呼び出すか、短絡（ショートサーキット）できます。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">Use</code>: 次のミドルウェアを呼び出せる（パイプラインを継続）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">Run</code>: パイプラインを終了（ターミナルミドルウェア）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">Map</code>: パスに基づいてパイプラインを分岐</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ミドルウェアパイプライン</h2>
        <p className="text-gray-400 mb-4">
          ミドルウェアは追加した順番に実行されます。リクエストは順番に処理され、レスポンスは逆順に処理されます。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;
using System.Threading.Tasks;

// ミドルウェアのシミュレーション
class HttpContext
{
    public string Path { get; set; } = "/";
    public List<string> Log { get; } = new();
}

class MiddlewarePipeline
{
    private readonly List<Func<HttpContext, Func<Task>, Task>> _middleware = new();

    public void Use(Func<HttpContext, Func<Task>, Task> middleware)
        => _middleware.Add(middleware);

    public async Task InvokeAsync(HttpContext ctx)
    {
        int index = 0;

        async Task Next()
        {
            if (index < _middleware.Count)
            {
                var current = _middleware[index++];
                await current(ctx, Next);
            }
        }

        await Next();
    }
}

class Program
{
    static async Task Main()
    {
        var pipeline = new MiddlewarePipeline();

        // 1. ロギングミドルウェア
        pipeline.Use(async (ctx, next) =>
        {
            ctx.Log.Add("→ ログ開始");
            await next(); // 次のミドルウェアへ
            ctx.Log.Add("← ログ終了");
        });

        // 2. 認証ミドルウェア
        pipeline.Use(async (ctx, next) =>
        {
            ctx.Log.Add("→ 認証チェック: OK");
            await next();
            ctx.Log.Add("← 認証後処理");
        });

        // 3. エンドポイント（Run相当）
        pipeline.Use(async (ctx, next) =>
        {
            ctx.Log.Add($"→ エンドポイント処理: {ctx.Path}");
            await Task.CompletedTask;
            // next() を呼ばないことでパイプライン終了
        });

        var context = new HttpContext { Path = "/api/users" };
        await pipeline.InvokeAsync(context);

        foreach (var log in context.Log)
            Console.WriteLine(log);
    }
}`}
          expectedOutput={`→ ログ開始
→ 認証チェック: OK
→ エンドポイント処理: /api/users
← 認証後処理
← ログ終了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">組み込みミドルウェアの例</h2>
        <p className="text-gray-400 mb-4">
          ASP.NET Coreが提供する主なミドルウェアと推奨される順序です。
        </p>
        <CSharpEditor
          defaultCode={`// 実際のASP.NET Coreコード（参考）
// var app = builder.Build();

// 推奨されるミドルウェアの順序:
// app.UseExceptionHandler("/error");   // 例外ハンドリング（最初）
// app.UseHttpsRedirection();           // HTTPS リダイレクト
// app.UseStaticFiles();                // 静的ファイル
// app.UseRouting();                    // ルーティング
// app.UseCors();                       // CORS
// app.UseAuthentication();             // 認証
// app.UseAuthorization();              // 認可
// app.UseResponseCompression();        // レスポンス圧縮
// app.MapControllers();                // コントローラー（最後）

using System;
Console.WriteLine("ミドルウェアの順序が重要な理由:");
Console.WriteLine("1. UseAuthentication → UseAuthorization の順が必須");
Console.WriteLine("2. UseRouting より後に UseAuthorization が必要");
Console.WriteLine("3. UseStaticFiles は早い段階で短絡できる");`}
          expectedOutput={`ミドルウェアの順序が重要な理由:
1. UseAuthentication → UseAuthorization の順が必須
2. UseRouting より後に UseAuthorization が必要
3. UseStaticFiles は早い段階で短絡できる`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="aspnet" lessonId="middleware" />
      </div>
      <LessonNav lessons={lessons} currentId="middleware" basePath="/learn/aspnet" />
    </div>
  );
}

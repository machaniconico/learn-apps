import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("webapi");

export default function CorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">Web API レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">CORS</h1>
        <p className="text-gray-400">AddCors・WithOrigins・AllowAnyMethodによるクロスオリジンリソース共有の設定を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">CORSとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          CORS（Cross-Origin Resource Sharing）は、異なるオリジン（ドメイン・ポート・プロトコル）間のHTTPリクエストを制御するセキュリティ機能です。
          ブラウザは別オリジンへのリクエストをデフォルトでブロックします。
        </p>
        <p className="text-gray-300 leading-relaxed">
          例: フロントエンド（<code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">http://localhost:3000</code>）から
          API（<code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">http://localhost:5000</code>）へのリクエスト
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">CORS ポリシーの設定</h2>
        <p className="text-gray-400 mb-4">
          ASP.NET CoreでのCORS設定パターンをシミュレートします。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;

// CORS ポリシーのシミュレーション
class CorsPolicy
{
    public string Name { get; set; } = "";
    public HashSet<string> AllowedOrigins { get; } = new();
    public HashSet<string> AllowedMethods { get; } = new();
    public HashSet<string> AllowedHeaders { get; } = new();
    public bool AllowCredentials { get; set; }
}

class CorsPolicyBuilder
{
    private readonly CorsPolicy _policy = new();

    public CorsPolicyBuilder WithOrigins(params string[] origins)
    {
        foreach (var o in origins) _policy.AllowedOrigins.Add(o);
        return this;
    }

    public CorsPolicyBuilder AllowAnyOrigin()
    {
        _policy.AllowedOrigins.Add("*");
        return this;
    }

    public CorsPolicyBuilder AllowAnyMethod()
    {
        foreach (var m in new[] { "GET", "POST", "PUT", "DELETE", "PATCH" })
            _policy.AllowedMethods.Add(m);
        return this;
    }

    public CorsPolicyBuilder AllowAnyHeader()
    {
        _policy.AllowedHeaders.Add("*");
        return this;
    }

    public CorsPolicyBuilder WithMethods(params string[] methods)
    {
        foreach (var m in methods) _policy.AllowedMethods.Add(m);
        return this;
    }

    public CorsPolicy Build() => _policy;
}

class Program
{
    static void Main()
    {
        // 開発用: 全許可
        var devPolicy = new CorsPolicyBuilder()
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader()
            .Build();

        Console.WriteLine("開発用ポリシー:");
        Console.WriteLine($"  オリジン: {string.Join(", ", devPolicy.AllowedOrigins)}");
        Console.WriteLine($"  メソッド: {string.Join(", ", devPolicy.AllowedMethods)}");

        // 本番用: 特定のオリジンのみ
        var prodPolicy = new CorsPolicyBuilder()
            .WithOrigins("https://myapp.com", "https://www.myapp.com")
            .WithMethods("GET", "POST")
            .AllowAnyHeader()
            .Build();

        Console.WriteLine("\n本番用ポリシー:");
        Console.WriteLine($"  オリジン: {string.Join(", ", prodPolicy.AllowedOrigins)}");
        Console.WriteLine($"  メソッド: {string.Join(", ", prodPolicy.AllowedMethods)}");
    }
}`}
          expectedOutput={`開発用ポリシー:
  オリジン: *
  メソッド: GET, POST, PUT, DELETE, PATCH

本番用ポリシー:
  オリジン: https://myapp.com, https://www.myapp.com
  メソッド: GET, POST`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実際のASP.NET Core設定</h2>
        <p className="text-gray-400 mb-4">
          実際のProgram.csでのCORS設定例です。
        </p>
        <CSharpEditor
          defaultCode={`using System;

Console.WriteLine("=== Program.cs での CORS 設定例 ===");
Console.WriteLine();
Console.WriteLine(@"// サービス登録
builder.Services.AddCors(options =>
{
    options.AddPolicy(""AllowFrontend"", policy =>
    {
        policy.WithOrigins(""https://myapp.com"")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });

    // 開発用: 全オリジン許可
    options.AddPolicy(""AllowAll"", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// ミドルウェア（UseRouting より後、UseAuthorization より前）
app.UseCors(""AllowFrontend"");

// 特定のエンドポイントにのみ適用
app.MapGet(""/api/public"", () => ""公開"")
   .RequireCors(""AllowAll"");");`}
          expectedOutput={`=== Program.cs での CORS 設定例 ===

// サービス登録
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("https://myapp.com")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });

    // 開発用: 全オリジン許可
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// ミドルウェア（UseRouting より後、UseAuthorization より前）
app.UseCors("AllowFrontend");

// 特定のエンドポイントにのみ適用
app.MapGet("/api/public", () => "公開")
   .RequireCors("AllowAll");`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="webapi" lessonId="cors" />
      </div>
      <LessonNav lessons={lessons} currentId="cors" basePath="/learn/webapi" />
    </div>
  );
}

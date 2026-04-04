import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("aspnet");

export default function AspnetOverviewPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">ASP.NET Core基礎 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ASP.NET Core概要</h1>
        <p className="text-gray-400">プロジェクト構造・Program.cs・WebApplication.CreateBuilderの基本を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ASP.NET Core とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ASP.NET CoreはMicrosoftのオープンソースWebフレームワークです。Windows・Linux・macOSで動作するクロスプラットフォーム対応で、
          高パフォーマンスなWebアプリ・APIを構築できます。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li>Web API / REST API</li>
          <li>Blazor（C#でのUI開発）</li>
          <li>gRPC サービス</li>
          <li>SignalR（リアルタイム通信）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Program.cs の基本構造</h2>
        <p className="text-gray-400 mb-4">
          .NET 6以降はトップレベルステートメントでProgram.csが簡潔になりました。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">WebApplication.CreateBuilder()</code> でアプリをセットアップします。
        </p>
        <CSharpEditor
          defaultCode={`// Program.cs の基本構造（コンソール出力でシミュレーション）
using System;
using System.Collections.Generic;

// WebApplicationBuilderのシミュレーション
class WebApplicationBuilder
{
    public ServiceCollection Services { get; } = new();

    public WebApplication Build()
    {
        Console.WriteLine("[Builder] アプリケーションをビルド");
        return new WebApplication(Services);
    }
}

class ServiceCollection
{
    private List<string> _services = new();
    public void AddControllers() => _services.Add("Controllers");
    public void AddSwagger() => _services.Add("Swagger");
    public void Print() => Console.WriteLine("[Services] " + string.Join(", ", _services));
}

class WebApplication
{
    private readonly ServiceCollection _services;
    public WebApplication(ServiceCollection s) => _services = s;
    public void MapGet(string path, Func<string> handler) =>
        Console.WriteLine($"[Route] GET {path} → {handler()}");
    public void Run() { _services.Print(); Console.WriteLine("[App] 起動中..."); }
}

class Program
{
    static void Main()
    {
        var builder = new WebApplicationBuilder();

        // サービスの登録
        builder.Services.AddControllers();
        builder.Services.AddSwagger();

        var app = builder.Build();

        // エンドポイントの設定
        app.MapGet("/", () => "Hello, World!");
        app.MapGet("/health", () => "OK");

        app.Run();
    }
}`}
          expectedOutput={`[Builder] アプリケーションをビルド
[Route] GET / → Hello, World!
[Route] GET /health → OK
[Services] Controllers, Swagger
[App] 起動中...`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">プロジェクト構造</h2>
        <p className="text-gray-300 leading-relaxed mb-3">ASP.NET Core プロジェクトの主なファイル構成:</p>
        <pre className="text-gray-300 text-sm font-mono leading-relaxed">{`MyWebApp/
├── Program.cs          ← エントリポイント・設定
├── appsettings.json    ← 設定ファイル
├── appsettings.Development.json
├── Controllers/        ← APIコントローラー
├── Models/             ← データモデル
├── Services/           ← ビジネスロジック
└── MyWebApp.csproj     ← プロジェクトファイル`}</pre>
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="aspnet" lessonId="overview" />
      </div>
      <LessonNav lessons={lessons} currentId="overview" basePath="/learn/aspnet" />
    </div>
  );
}

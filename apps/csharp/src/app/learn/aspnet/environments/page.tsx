import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("aspnet");

export default function EnvironmentsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">ASP.NET Core基礎 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">環境</h1>
        <p className="text-gray-400">ASPNETCORE_ENVIRONMENT・Development/Staging/Production・launchSettings.jsonを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">環境の種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">ASPNETCORE_ENVIRONMENT</code> 環境変数で現在の環境を指定します。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li><strong className="text-green-400">Development</strong>: 開発環境。詳細エラー・Swagger表示。デフォルト</li>
          <li><strong className="text-yellow-400">Staging</strong>: ステージング。本番に近い設定でテスト</li>
          <li><strong className="text-red-400">Production</strong>: 本番環境。エラー詳細を非表示・最適化</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">環境別の設定と分岐</h2>
        <p className="text-gray-400 mb-4">
          環境に応じて設定を変えることができます。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class HostEnvironment
{
    public string EnvironmentName { get; }

    public HostEnvironment(string env) => EnvironmentName = env;

    public bool IsDevelopment() => EnvironmentName == "Development";
    public bool IsStaging() => EnvironmentName == "Staging";
    public bool IsProduction() => EnvironmentName == "Production";
}

class AppConfigurator
{
    private readonly HostEnvironment _env;

    public AppConfigurator(HostEnvironment env) => _env = env;

    public void Configure()
    {
        if (_env.IsDevelopment())
        {
            Console.WriteLine("✓ 詳細エラーページを有効化");
            Console.WriteLine("✓ Swagger UIを有効化");
            Console.WriteLine("✓ ホットリロードを有効化");
        }
        else if (_env.IsStaging())
        {
            Console.WriteLine("✓ 標準エラーページ");
            Console.WriteLine("✓ パフォーマンス計測有効");
        }
        else if (_env.IsProduction())
        {
            Console.WriteLine("✓ 最小エラー表示");
            Console.WriteLine("✓ キャッシュ最大化");
            Console.WriteLine("✓ HTTPS強制");
        }

        Console.WriteLine($"環境: {_env.EnvironmentName}");
    }
}

class Program
{
    static void Main()
    {
        Console.WriteLine("=== Development ===");
        new AppConfigurator(new HostEnvironment("Development")).Configure();

        Console.WriteLine("\n=== Production ===");
        new AppConfigurator(new HostEnvironment("Production")).Configure();
    }
}`}
          expectedOutput={`=== Development ===
✓ 詳細エラーページを有効化
✓ Swagger UIを有効化
✓ ホットリロードを有効化
環境: Development

=== Production ===
✓ 最小エラー表示
✓ キャッシュ最大化
✓ HTTPS強制
環境: Production`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">appsettings の環境別オーバーライド</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">appsettings.Development.json</code> は開発環境でのみ読み込まれ、基本設定を上書きします。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;

class ConfigLoader
{
    public static Dictionary<string, string> Load(string environment)
    {
        // appsettings.json（共通設定）
        var config = new Dictionary<string, string>
        {
            ["Logging:LogLevel"] = "Warning",
            ["Database:Host"] = "prod-db.example.com",
            ["App:Debug"] = "false",
        };

        // appsettings.{env}.json でオーバーライド
        var overrides = environment switch
        {
            "Development" => new Dictionary<string, string>
            {
                ["Logging:LogLevel"] = "Debug",
                ["Database:Host"] = "localhost",
                ["App:Debug"] = "true",
            },
            "Staging" => new Dictionary<string, string>
            {
                ["Database:Host"] = "staging-db.example.com",
            },
            _ => new Dictionary<string, string>()
        };

        foreach (var kv in overrides)
            config[kv.Key] = kv.Value;

        return config;
    }
}

class Program
{
    static void Main()
    {
        foreach (var env in new[] { "Development", "Staging", "Production" })
        {
            Console.WriteLine($"\n[{env}]");
            var cfg = ConfigLoader.Load(env);
            foreach (var kv in cfg)
                Console.WriteLine($"  {kv.Key} = {kv.Value}");
        }
    }
}`}
          expectedOutput={`[Development]
  Logging:LogLevel = Debug
  Database:Host = localhost
  App:Debug = true

[Staging]
  Logging:LogLevel = Warning
  Database:Host = staging-db.example.com
  App:Debug = false

[Production]
  Logging:LogLevel = Warning
  Database:Host = prod-db.example.com
  App:Debug = false`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="aspnet" lessonId="environments" />
      </div>
      <LessonNav lessons={lessons} currentId="environments" basePath="/learn/aspnet" />
    </div>
  );
}

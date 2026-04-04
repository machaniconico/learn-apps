import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("dotnet");

export default function DotnetCliToolsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">.NETエコシステム レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">CLI ツール</h1>
        <p className="text-gray-400">dotnet new、build、run、test、publish、tool installを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">dotnet CLIとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          dotnet CLIは.NET SDKに付属するコマンドラインツールです。プロジェクトの作成・ビルド・実行・テスト・発行など、開発に必要なすべての操作をコマンドラインから行えます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本コマンド一覧</h2>
        <p className="text-gray-400 mb-4">日常的に使うdotnetコマンドを確認します。</p>
        <CSharpEditor
          defaultCode={`// dotnet CLI コマンド一覧
var commands = new[]
{
    ("--- プロジェクト作成 ---", ""),
    ("dotnet new console -n MyApp",          "コンソールアプリを作成"),
    ("dotnet new webapi -n MyApi",           "Web APIプロジェクトを作成"),
    ("dotnet new classlib -n MyLib",         "クラスライブラリを作成"),
    ("dotnet new xunit -n MyApp.Tests",      "xUnitテストプロジェクトを作成"),
    ("dotnet new blazorwasm -n MyBlazor",    "Blazor WebAssemblyを作成"),
    ("", ""),
    ("--- ビルドと実行 ---", ""),
    ("dotnet build",                         "プロジェクトをビルド"),
    ("dotnet build -c Release",              "Releaseビルド"),
    ("dotnet run",                           "実行（ビルド+実行）"),
    ("dotnet run --project MyApp",           "特定プロジェクトを実行"),
    ("", ""),
    ("--- テスト ---", ""),
    ("dotnet test",                          "テストを実行"),
    ("dotnet test --collect:\"XPlat Code Coverage\"", "カバレッジ付きでテスト"),
    ("", ""),
    ("--- 発行 ---", ""),
    ("dotnet publish -c Release",            "発行（Releaseビルド）"),
    ("dotnet publish -r win-x64 --self-contained", "Windows用に自己完結型発行"),
};

foreach (var (cmd, desc) in commands)
{
    if (cmd.StartsWith("---"))
        Console.WriteLine($"\n{cmd}");
    else if (cmd == "")
        continue;
    else
        Console.WriteLine($"  $ {cmd,-48} # {desc}");
}`}
          expectedOutput={`
--- プロジェクト作成 ---
  $ dotnet new console -n MyApp                          # コンソールアプリを作成
  $ dotnet new webapi -n MyApi                           # Web APIプロジェクトを作成
  $ dotnet new classlib -n MyLib                         # クラスライブラリを作成
  $ dotnet new xunit -n MyApp.Tests                      # xUnitテストプロジェクトを作成
  $ dotnet new blazorwasm -n MyBlazor                    # Blazor WebAssemblyを作成

--- ビルドと実行 ---
  $ dotnet build                                         # プロジェクトをビルド
  $ dotnet build -c Release                              # Releaseビルド
  $ dotnet run                                           # 実行（ビルド+実行）
  $ dotnet run --project MyApp                           # 特定プロジェクトを実行

--- テスト ---
  $ dotnet test                                          # テストを実行
  $ dotnet test --collect:"XPlat Code Coverage"          # カバレッジ付きでテスト

--- 発行 ---
  $ dotnet publish -c Release                            # 発行（Releaseビルド）
  $ dotnet publish -r win-x64 --self-contained           # Windows用に自己完結型発行`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">グローバルツール</h2>
        <p className="text-gray-400 mb-4">dotnet tool installで便利なCLIツールをインストールできます。</p>
        <CSharpEditor
          defaultCode={`// dotnet グローバルツール
Console.WriteLine("=== dotnet グローバルツール ===");
Console.WriteLine();

var tools = new[]
{
    ("dotnet-ef",          "Entity Framework Core CLIツール"),
    ("dotnet-counters",    "パフォーマンスカウンターの監視"),
    ("dotnet-trace",       "パフォーマンストレース"),
    ("dotnet-dump",        "プロセスダンプの収集と分析"),
    ("dotnet-format",      "コードフォーマッター"),
    ("BenchmarkDotNet.Tool", "ベンチマーク実行ツール"),
};

Console.WriteLine("便利なグローバルツール:");
foreach (var (tool, desc) in tools)
    Console.WriteLine($"  {tool,-30} : {desc}");

Console.WriteLine();
Console.WriteLine("# インストール");
Console.WriteLine("$ dotnet tool install --global dotnet-ef");
Console.WriteLine();
Console.WriteLine("# バージョン指定インストール");
Console.WriteLine("$ dotnet tool install --global dotnet-ef --version 8.*");
Console.WriteLine();
Console.WriteLine("# インストール済みツール一覧");
Console.WriteLine("$ dotnet tool list --global");
Console.WriteLine();
Console.WriteLine("# 更新");
Console.WriteLine("$ dotnet tool update --global dotnet-ef");`}
          expectedOutput={`=== dotnet グローバルツール ===

便利なグローバルツール:
  dotnet-ef                      : Entity Framework Core CLIツール
  dotnet-counters                : パフォーマンスカウンターの監視
  dotnet-trace                   : パフォーマンストレース
  dotnet-dump                    : プロセスダンプの収集と分析
  dotnet-format                  : コードフォーマッター
  BenchmarkDotNet.Tool           : ベンチマーク実行ツール

# インストール
$ dotnet tool install --global dotnet-ef

# バージョン指定インストール
$ dotnet tool install --global dotnet-ef --version 8.*

# インストール済みツール一覧
$ dotnet tool list --global

# 更新
$ dotnet tool update --global dotnet-ef`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="dotnet" lessonId="cli-tools" />
      </div>
      <LessonNav lessons={lessons} currentId="cli-tools" basePath="/learn/dotnet" />
    </div>
  );
}

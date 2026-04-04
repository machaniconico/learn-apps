import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("dotnet");

export default function DotnetNugetPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">.NETエコシステム レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">NuGet</h1>
        <p className="text-gray-400">NuGetパッケージマネージャー、dotnet add package、NuGet.org、バージョン管理を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">NuGetとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          NuGetは.NET向けのパッケージマネージャーです。NuGet.org（パッケージリポジトリ）には300,000以上のパッケージが公開されており、サードパーティライブラリを簡単にプロジェクトに追加できます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">dotnet CLIでのパッケージ管理</h2>
        <p className="text-gray-400 mb-4">コマンドラインでのパッケージ操作方法です。</p>
        <CSharpEditor
          defaultCode={`// NuGet パッケージ管理コマンド
var commands = new[]
{
    // 追加
    ("dotnet add package Newtonsoft.Json",
     "最新版を追加"),
    ("dotnet add package Serilog --version 3.1.1",
     "特定バージョンを追加"),
    ("dotnet add package Microsoft.EntityFrameworkCore.Sqlite",
     "EF Core SQLiteプロバイダーを追加"),

    // 確認
    ("dotnet list package",
     "インストール済みパッケージ一覧"),
    ("dotnet list package --outdated",
     "更新可能なパッケージを確認"),

    // 削除・復元
    ("dotnet remove package Newtonsoft.Json",
     "パッケージを削除"),
    ("dotnet restore",
     "packages を復元（.csproj から）"),
};

Console.WriteLine("NuGet パッケージ管理コマンド:");
foreach (var (cmd, desc) in commands)
{
    Console.WriteLine($"$ {cmd}");
    Console.WriteLine($"  -> {desc}");
    Console.WriteLine();
}`}
          expectedOutput={`NuGet パッケージ管理コマンド:
$ dotnet add package Newtonsoft.Json
  -> 最新版を追加

$ dotnet add package Serilog --version 3.1.1
  -> 特定バージョンを追加

$ dotnet add package Microsoft.EntityFrameworkCore.Sqlite
  -> EF Core SQLiteプロバイダーを追加

$ dotnet list package
  -> インストール済みパッケージ一覧

$ dotnet list package --outdated
  -> 更新可能なパッケージを確認

$ dotnet remove package Newtonsoft.Json
  -> パッケージを削除

$ dotnet restore
  -> packages を復元（.csproj から）`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">セマンティックバージョニングと.csprojの管理</h2>
        <p className="text-gray-400 mb-4">バージョン指定の構文と.csprojファイルでの管理を学びます。</p>
        <CSharpEditor
          defaultCode={`// セマンティックバージョニング: Major.Minor.Patch
// Major: 破壊的変更
// Minor: 後方互換の新機能
// Patch: バグ修正

// .csproj でのバージョン指定例
string csproj = @"
<Project Sdk=""Microsoft.NET.Sdk"">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <!-- 固定バージョン -->
    <PackageReference Include=""Newtonsoft.Json"" Version=""13.0.3"" />

    <!-- マイナー以上の更新を許可（>=13.0.0 && <14.0.0）-->
    <PackageReference Include=""Serilog"" Version=""3.*"" />

    <!-- パッチ更新のみ許可（>=3.1.0 && <3.2.0）-->
    <PackageReference Include=""Dapper"" Version=""[2.1.28]"" />
  </ItemGroup>
</Project>";

Console.WriteLine(".csprojのパッケージ参照:");
Console.WriteLine(csproj);

Console.WriteLine("よく使うパッケージ:");
Console.WriteLine("  Newtonsoft.Json    - JSON処理（旧来の定番）");
Console.WriteLine("  Serilog            - 構造化ログ");
Console.WriteLine("  Dapper             - マイクロORM");
Console.WriteLine("  AutoMapper         - オブジェクトマッピング");
Console.WriteLine("  FluentValidation   - バリデーション");
Console.WriteLine("  Polly              - レジリエンス（リトライ等）");`}
          expectedOutput={`.csprojのパッケージ参照:

<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <!-- 固定バージョン -->
    <PackageReference Include="Newtonsoft.Json" Version="13.0.3" />

    <!-- マイナー以上の更新を許可（>=13.0.0 && <14.0.0）-->
    <PackageReference Include="Serilog" Version="3.*" />

    <!-- パッチ更新のみ許可（>=3.1.0 && <3.2.0）-->
    <PackageReference Include="Dapper" Version="[2.1.28]" />
  </ItemGroup>
</Project>

よく使うパッケージ:
  Newtonsoft.Json    - JSON処理（旧来の定番）
  Serilog            - 構造化ログ
  Dapper             - マイクロORM
  AutoMapper         - オブジェクトマッピング
  FluentValidation   - バリデーション
  Polly              - レジリエンス（リトライ等）`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="dotnet" lessonId="nuget" />
      </div>
      <LessonNav lessons={lessons} currentId="nuget" basePath="/learn/dotnet" />
    </div>
  );
}

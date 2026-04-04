import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("dotnet");

export default function DotnetProjectStructurePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">.NETエコシステム レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">プロジェクト構成</h1>
        <p className="text-gray-400">.csproj、.sln、ディレクトリ構成、マルチプロジェクト構成を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">プロジェクトファイル（.csproj）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">.csproj</code>ファイルはプロジェクトの設定ファイルです。ターゲットフレームワーク・出力タイプ・パッケージ参照・ビルド設定などを定義します。XML形式で記述されます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">.csprojの構造</h2>
        <p className="text-gray-400 mb-4">基本的な.csprojファイルの内容を確認します。</p>
        <CSharpEditor
          defaultCode={`// .csproj ファイルの解説
string csproj = @"
<Project Sdk=""Microsoft.NET.Sdk"">

  <!-- 基本設定 -->
  <PropertyGroup>
    <OutputType>Exe</OutputType>          <!-- Exe/Library/WinExe -->
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>           <!-- Nullable参照型を有効化 -->
    <ImplicitUsings>enable</ImplicitUsings><!-- グローバルusing有効化 -->
    <AssemblyName>MyApp</AssemblyName>    <!-- アセンブリ名 -->
    <RootNamespace>MyApp</RootNamespace>  <!-- ルートnamespace -->
  </PropertyGroup>

  <!-- NuGetパッケージ参照 -->
  <ItemGroup>
    <PackageReference Include=""Serilog"" Version=""3.1.1"" />
    <PackageReference Include=""Dapper""  Version=""2.1.28"" />
  </ItemGroup>

  <!-- プロジェクト参照（ソリューション内の別プロジェクト）-->
  <ItemGroup>
    <ProjectReference Include=""..\MyLib\MyLib.csproj"" />
  </ItemGroup>

</Project>";

Console.WriteLine(csproj);`}
          expectedOutput={`
<Project Sdk="Microsoft.NET.Sdk">

  <!-- 基本設定 -->
  <PropertyGroup>
    <OutputType>Exe</OutputType>          <!-- Exe/Library/WinExe -->
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>           <!-- Nullable参照型を有効化 -->
    <ImplicitUsings>enable</ImplicitUsings><!-- グローバルusing有効化 -->
    <AssemblyName>MyApp</AssemblyName>    <!-- アセンブリ名 -->
    <RootNamespace>MyApp</RootNamespace>  <!-- ルートnamespace -->
  </PropertyGroup>

  <!-- NuGetパッケージ参照 -->
  <ItemGroup>
    <PackageReference Include="Serilog" Version="3.1.1" />
    <PackageReference Include="Dapper"  Version="2.1.28" />
  </ItemGroup>

  <!-- プロジェクト参照（ソリューション内の別プロジェクト）-->
  <ItemGroup>
    <ProjectReference Include="..\MyLib\MyLib.csproj" />
  </ItemGroup>

</Project>`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">マルチプロジェクト構成</h2>
        <p className="text-gray-400 mb-4">大規模アプリでの推奨ディレクトリ構成です。</p>
        <CSharpEditor
          defaultCode={`// マルチプロジェクト構成の例
string structure = @"
MyApp/                          # ルートディレクトリ
├── MyApp.sln                   # ソリューションファイル
│
├── src/                        # ソースコード
│   ├── MyApp.Domain/           # ドメイン層（エンティティ・値オブジェクト）
│   │   └── MyApp.Domain.csproj
│   │
│   ├── MyApp.Application/      # アプリケーション層（ユースケース）
│   │   └── MyApp.Application.csproj
│   │
│   ├── MyApp.Infrastructure/   # インフラ層（DB・外部API）
│   │   └── MyApp.Infrastructure.csproj
│   │
│   └── MyApp.Web/              # プレゼンテーション層（WebAPI・UI）
│       └── MyApp.Web.csproj
│
├── tests/                      # テスト
│   ├── MyApp.UnitTests/
│   └── MyApp.IntegrationTests/
│
└── docs/                       # ドキュメント
";

Console.WriteLine("マルチプロジェクト構成:");
Console.WriteLine(structure);

// ソリューションの操作コマンド
Console.WriteLine("# ソリューション操作コマンド");
Console.WriteLine("dotnet new sln -n MyApp");
Console.WriteLine("dotnet sln add src/MyApp.Domain/MyApp.Domain.csproj");
Console.WriteLine("dotnet sln list  # プロジェクト一覧を表示");`}
          expectedOutput={`マルチプロジェクト構成:

MyApp/                          # ルートディレクトリ
├── MyApp.sln                   # ソリューションファイル
│
├── src/                        # ソースコード
│   ├── MyApp.Domain/           # ドメイン層（エンティティ・値オブジェクト）
│   │   └── MyApp.Domain.csproj
│   │
│   ├── MyApp.Application/      # アプリケーション層（ユースケース）
│   │   └── MyApp.Application.csproj
│   │
│   ├── MyApp.Infrastructure/   # インフラ層（DB・外部API）
│   │   └── MyApp.Infrastructure.csproj
│   │
│   └── MyApp.Web/              # プレゼンテーション層（WebAPI・UI）
│       └── MyApp.Web.csproj
│
├── tests/                      # テスト
│   ├── MyApp.UnitTests/
│   └── MyApp.IntegrationTests/
│
└── docs/                       # ドキュメント

# ソリューション操作コマンド
dotnet new sln -n MyApp
dotnet sln add src/MyApp.Domain/MyApp.Domain.csproj
dotnet sln list  # プロジェクト一覧を表示`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="dotnet" lessonId="project-structure" />
      </div>
      <LessonNav lessons={lessons} currentId="project-structure" basePath="/learn/dotnet" />
    </div>
  );
}

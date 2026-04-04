import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("aspnet");

export default function DeploymentPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">ASP.NET Core基礎 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">デプロイ</h1>
        <p className="text-gray-400">publish・Docker・Azure・Self-containedによるASP.NET Coreアプリのデプロイ方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">デプロイオプション</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li><strong className="text-white">Framework-dependent</strong>: .NETランタイムが必要。小サイズ</li>
          <li><strong className="text-white">Self-contained</strong>: ランタイム込みで配布。移植性高い</li>
          <li><strong className="text-white">Single file</strong>: 1ファイルに全部まとめる</li>
          <li><strong className="text-white">Docker</strong>: コンテナ化。スケーラブル</li>
          <li><strong className="text-white">Azure App Service</strong>: マネージドクラウドホスティング</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">publish コマンド</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">dotnet publish</code> でデプロイ用の成果物を生成します。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class PublishSimulator
{
    public static void Simulate(string runtime, bool selfContained, bool singleFile)
    {
        Console.WriteLine($"=== dotnet publish ===");
        Console.WriteLine($"Runtime: {runtime}");
        Console.WriteLine($"Self-contained: {selfContained}");
        Console.WriteLine($"Single file: {singleFile}");
        Console.WriteLine();

        // 生成されるファイル
        if (singleFile)
        {
            Console.WriteLine("出力:");
            Console.WriteLine("  MyApp (実行ファイル)  ← 全部入り");
        }
        else if (selfContained)
        {
            Console.WriteLine("出力:");
            Console.WriteLine("  MyApp (実行ファイル)");
            Console.WriteLine("  dotnet.dll (ランタイム)");
            Console.WriteLine("  *.dll (依存関係)");
        }
        else
        {
            Console.WriteLine("出力:");
            Console.WriteLine("  MyApp.dll");
            Console.WriteLine("  MyApp.runtimeconfig.json");
            Console.WriteLine("  ※ .NETランタイムが別途必要");
        }

        long sizeMB = selfContained ? (singleFile ? 80 : 100) : 5;
        Console.WriteLine($"  サイズ: 約{sizeMB}MB");
    }
}

class Program
{
    static void Main()
    {
        // dotnet publish -r linux-x64 --self-contained true -p:PublishSingleFile=true
        PublishSimulator.Simulate("linux-x64", selfContained: true, singleFile: true);
        Console.WriteLine();

        // dotnet publish -r linux-x64 --self-contained false
        PublishSimulator.Simulate("linux-x64", selfContained: false, singleFile: false);
    }
}`}
          expectedOutput={`=== dotnet publish ===
Runtime: linux-x64
Self-contained: True
Single file: True

出力:
  MyApp (実行ファイル)  ← 全部入り
  サイズ: 約80MB

=== dotnet publish ===
Runtime: linux-x64
Self-contained: False
Single file: False

出力:
  MyApp.dll
  MyApp.runtimeconfig.json
  ※ .NETランタイムが別途必要
  サイズ: 約5MB`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Docker コンテナ化</h2>
        <p className="text-gray-400 mb-4">
          Dockerfileを使ったコンテナ化の基本構造です。
        </p>
        <CSharpEditor
          defaultCode={`// Dockerfile の内容（コンソール出力でシミュレーション）
using System;

class DockerfileGenerator
{
    public static void Generate(string appName)
    {
        Console.WriteLine("# ビルドステージ");
        Console.WriteLine("FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build");
        Console.WriteLine("WORKDIR /app");
        Console.WriteLine("COPY *.csproj .");
        Console.WriteLine("RUN dotnet restore");
        Console.WriteLine("COPY . .");
        Console.WriteLine($"RUN dotnet publish -c Release -o /publish");
        Console.WriteLine();
        Console.WriteLine("# ランタイムステージ（小さいイメージ）");
        Console.WriteLine("FROM mcr.microsoft.com/dotnet/aspnet:8.0");
        Console.WriteLine("WORKDIR /app");
        Console.WriteLine("COPY --from=build /publish .");
        Console.WriteLine($"EXPOSE 8080");
        Console.WriteLine($"ENTRYPOINT [\"dotnet\", \"{appName}.dll\"]");
    }
}

class Program
{
    static void Main()
    {
        DockerfileGenerator.Generate("MyWebApp");
        Console.WriteLine();
        Console.WriteLine("# ビルド・実行コマンド:");
        Console.WriteLine("docker build -t mywebapp .");
        Console.WriteLine("docker run -p 8080:8080 mywebapp");
    }
}`}
          expectedOutput={`# ビルドステージ
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app
COPY *.csproj .
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /publish

# ランタイムステージ（小さいイメージ）
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "MyWebApp.dll"]

# ビルド・実行コマンド:
docker build -t mywebapp .
docker run -p 8080:8080 mywebapp`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="aspnet" lessonId="deployment" />
      </div>
      <LessonNav lessons={lessons} currentId="deployment" basePath="/learn/aspnet" />
    </div>
  );
}

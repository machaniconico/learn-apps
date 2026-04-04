import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("dotnet");

export default function DotnetOverviewPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">.NETエコシステム レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">.NET概要</h1>
        <p className="text-gray-400">.NET 8/9、.NET Standard、ランタイム、クロスプラットフォーム対応を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">.NETの歴史と現在</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          .NETはMicrosoftが2002年にリリースした開発プラットフォームです。当初はWindows専用の.NET Frameworkでしたが、2016年に.NET Core（クロスプラットフォーム版）が登場し、2020年に.NET 5で統合されました。
        </p>
        <p className="text-gray-300 leading-relaxed">
          現在は毎年11月に新しいバージョンがリリースされ、LTS（長期サポート）版は3年間サポートされます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">.NETのバージョン系統</h2>
        <p className="text-gray-400 mb-4">各バージョンの特徴とサポート期間を把握します。</p>
        <CSharpEditor
          defaultCode={`// .NETのバージョン体系
var versions = new[]
{
    // (バージョン, リリース, サポート終了, LTS)
    (".NET Framework 4.8", "2019", "2031以降", true,  "Windows専用 - 新機能追加なし"),
    (".NET 6 (LTS)",       "2021", "2024/11",  true,  "クロスプラットフォーム"),
    (".NET 7",             "2022", "2024/05",  false, "短期サポート版"),
    (".NET 8 (LTS)",       "2023", "2026/11",  true,  "現在の推奨LTS版"),
    (".NET 9",             "2024", "2025/05",  false, "最新版（短期サポート）"),
    (".NET 10 (LTS)",      "2025", "2028/05",  true,  "次のLTS（予定）"),
};

Console.WriteLine(".NETバージョン一覧:");
Console.WriteLine($"{"バージョン",-22} {"LTS",-5} {"説明"}");
Console.WriteLine(new string('-', 55));
foreach (var (ver, rel, end, lts, desc) in versions)
{
    string ltsLabel = lts ? "✓" : "-";
    Console.WriteLine($"{ver,-22} {ltsLabel,-5} {desc}");
}

Console.WriteLine();
Console.WriteLine(".NETの動作原理:");
Console.WriteLine("  C#コード -> コンパイラ -> IL(中間言語) -> JIT/AOT -> ネイティブコード");`}
          expectedOutput={`.NETバージョン一覧:
バージョン             LTS   説明
-------------------------------------------------------
.NET Framework 4.8    ✓     Windows専用 - 新機能追加なし
.NET 6 (LTS)          ✓     クロスプラットフォーム
.NET 7                -     短期サポート版
.NET 8 (LTS)          ✓     現在の推奨LTS版
.NET 9                -     最新版（短期サポート）
.NET 10 (LTS)         ✓     次のLTS（予定）

.NETの動作原理:
  C#コード -> コンパイラ -> IL(中間言語) -> JIT/AOT -> ネイティブコード`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">クロスプラットフォームの確認</h2>
        <p className="text-gray-400 mb-4">同じコードがWindows・macOS・Linuxで動作します。</p>
        <CSharpEditor
          defaultCode={`using System.Runtime.InteropServices;

// 実行環境の情報を取得
Console.WriteLine("=== .NET 実行環境 ===");
Console.WriteLine($".NETバージョン  : {Environment.Version}");
Console.WriteLine($"OS              : {RuntimeInformation.OSDescription}");
Console.WriteLine($"アーキテクチャ  : {RuntimeInformation.ProcessArchitecture}");
Console.WriteLine($"フレームワーク  : {RuntimeInformation.FrameworkDescription}");
Console.WriteLine($"64ビットOS      : {Environment.Is64BitOperatingSystem}");
Console.WriteLine($"CPUコア数       : {Environment.ProcessorCount}");
Console.WriteLine();

// プラットフォーム別コード（OSに応じた処理）
if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
    Console.WriteLine("Windows で実行中");
else if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX))
    Console.WriteLine("macOS で実行中");
else if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
    Console.WriteLine("Linux で実行中");`}
          expectedOutput={`=== .NET 実行環境 ===
.NETバージョン  : 8.0.x
OS              : macOS 25.4.0
アーキテクチャ  : X64
フレームワーク  : .NET 8.0.x
64ビットOS      : True
CPUコア数       : 8

macOS で実行中`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="dotnet" lessonId="overview" />
      </div>
      <LessonNav lessons={lessons} currentId="overview" basePath="/learn/dotnet" />
    </div>
  );
}

import { CSharpEditor } from "@/components/csharp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("dotnet");

export default function DotnetPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-2">.NETエコシステム</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          .NETプラットフォームの全体像を学びましょう。.NETのバージョン体系・NuGetパッケージ管理・dotnet CLI・プロジェクト構成・最新機能まで、C#開発の基盤となる知識を習得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="dotnet" totalLessons={5} color="blue" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/dotnet" color="blue" categoryId="dotnet" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">.NETとは</h2>
        <p className="text-gray-400 mb-4">
          .NETはMicrosoftが開発したオープンソースのクロスプラットフォームフレームワークです。Windows・macOS・Linuxで動作し、C#・F#・VBなどの言語をサポートします。
        </p>
        <CSharpEditor
          defaultCode={`// .NETの基本情報を出力
using System.Runtime.InteropServices;

Console.WriteLine(".NETの基本情報");
Console.WriteLine($"バージョン: {Environment.Version}");
Console.WriteLine($"OS: {RuntimeInformation.OSDescription}");
Console.WriteLine($"アーキテクチャ: {RuntimeInformation.ProcessArchitecture}");
Console.WriteLine($"フレームワーク: {RuntimeInformation.FrameworkDescription}");
Console.WriteLine();
Console.WriteLine(".NETのエディション:");
Console.WriteLine("  .NET 8/9:      最新のクロスプラットフォーム版");
Console.WriteLine("  .NET Standard: ライブラリ共通仕様（非推奨）");
Console.WriteLine("  .NET Framework: Windowsのみの旧バージョン");`}
          expectedOutput={`.NETの基本情報
バージョン: 8.0.x
OS: (OSに依存)
アーキテクチャ: X64
フレームワーク: .NET 8.0.x

.NETのエディション:
  .NET 8/9:      最新のクロスプラットフォーム版
  .NET Standard: ライブラリ共通仕様（非推奨）
  .NET Framework: Windowsのみの旧バージョン`}
        />
      </section>
    </div>
  );
}

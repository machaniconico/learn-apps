import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("efcore");

export default function EfcoreOverviewPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">EF Core レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">EF Core概要</h1>
        <p className="text-gray-400">ORMの概念、NuGetパッケージのインストール、対応データベースを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ORMとEntity Framework Coreとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ORM（Object-Relational Mapper）はオブジェクト指向言語とリレーショナルデータベースの間のギャップを埋めるツールです。
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">Entity Framework Core</code>（EF Core）はMicrosoftが提供する.NET用のオープンソースORMです。
        </p>
        <p className="text-gray-300 leading-relaxed">
          EF CoreではC#のクラス（エンティティ）がデータベースのテーブルに対応し、LINQを使ってタイプセーフなクエリを記述できます。SQLを直接書く必要がなくなり、生産性が大幅に向上します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">NuGetパッケージのインストール</h2>
        <p className="text-gray-400 mb-4">EF Coreを使うには、データベースプロバイダーに応じたNuGetパッケージをインストールします。</p>
        <CSharpEditor
          defaultCode={`// NuGetパッケージのインストールコマンド（ターミナルで実行）
// dotnet add package Microsoft.EntityFrameworkCore.SqlServer
// dotnet add package Microsoft.EntityFrameworkCore.Sqlite
// dotnet add package Microsoft.EntityFrameworkCore.InMemory
// dotnet add package Microsoft.EntityFrameworkCore.Tools

// 主要パッケージの説明
var packages = new[]
{
    ("Microsoft.EntityFrameworkCore",           "コアパッケージ"),
    ("Microsoft.EntityFrameworkCore.SqlServer", "SQL Server プロバイダー"),
    ("Microsoft.EntityFrameworkCore.Sqlite",    "SQLite プロバイダー"),
    ("Microsoft.EntityFrameworkCore.InMemory",  "テスト用インメモリDB"),
    ("Microsoft.EntityFrameworkCore.Tools",     "マイグレーションツール"),
};

Console.WriteLine("EF Core NuGetパッケージ一覧:");
foreach (var (pkg, desc) in packages)
{
    Console.WriteLine($"  {pkg,-45} // {desc}");
}`}
          expectedOutput={`EF Core NuGetパッケージ一覧:
  Microsoft.EntityFrameworkCore                 // コアパッケージ
  Microsoft.EntityFrameworkCore.SqlServer       // SQL Server プロバイダー
  Microsoft.EntityFrameworkCore.Sqlite          // SQLite プロバイダー
  Microsoft.EntityFrameworkCore.InMemory        // テスト用インメモリDB
  Microsoft.EntityFrameworkCore.Tools           // マイグレーションツール`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">対応データベース</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          EF Coreはプロバイダーパターンにより多くのデータベースをサポートしています。
        </p>
        <ul className="space-y-2 text-gray-300">
          <li><code className="text-green-400 bg-gray-800 px-1 rounded">SQL Server</code> - Microsoft純正、Azure対応</li>
          <li><code className="text-green-400 bg-gray-800 px-1 rounded">SQLite</code> - 組み込み用、開発・テストに最適</li>
          <li><code className="text-green-400 bg-gray-800 px-1 rounded">PostgreSQL</code> - Npgsql プロバイダー</li>
          <li><code className="text-green-400 bg-gray-800 px-1 rounded">MySQL</code> - Pomelo.EntityFrameworkCore.MySql</li>
          <li><code className="text-green-400 bg-gray-800 px-1 rounded">InMemory</code> - テスト専用のインメモリDB</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">EF Coreの基本アーキテクチャ</h2>
        <p className="text-gray-400 mb-4">EF Coreの主要コンポーネントとデータフローを確認しましょう。</p>
        <CSharpEditor
          defaultCode={`// EF Coreのアーキテクチャ概念図
Console.WriteLine("=== EF Core アーキテクチャ ===");
Console.WriteLine();
Console.WriteLine("アプリケーション");
Console.WriteLine("    |");
Console.WriteLine("    v");
Console.WriteLine("DbContext（データベースセッション管理）");
Console.WriteLine("    |");
Console.WriteLine("    +-- DbSet<T>（テーブルへのアクセス）");
Console.WriteLine("    |");
Console.WriteLine("    v");
Console.WriteLine("Change Tracker（変更追跡）");
Console.WriteLine("    |");
Console.WriteLine("    v");
Console.WriteLine("Database Provider（SQL生成）");
Console.WriteLine("    |");
Console.WriteLine("    v");
Console.WriteLine("データベース（SQL Server / SQLite / etc.）");`}
          expectedOutput={`=== EF Core アーキテクチャ ===

アプリケーション
    |
    v
DbContext（データベースセッション管理）
    |
    +-- DbSet<T>（テーブルへのアクセス）
    |
    v
Change Tracker（変更追跡）
    |
    v
Database Provider（SQL生成）
    |
    v
データベース（SQL Server / SQLite / etc.）`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="efcore" lessonId="overview" />
      </div>
      <LessonNav lessons={lessons} currentId="overview" basePath="/learn/efcore" />
    </div>
  );
}

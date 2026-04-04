import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("efcore");

export default function EfcoreMigrationsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">EF Core レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">マイグレーション</h1>
        <p className="text-gray-400">Add-Migration、Update-Database、マイグレーション履歴の管理方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">マイグレーションとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          マイグレーションはデータベーススキーマの変更をバージョン管理する仕組みです。モデルの変更に合わせてマイグレーションファイルを生成し、データベースに適用することでスキーマを進化させます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          EF CoreはSQLiteの場合<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">__EFMigrationsHistory</code>テーブルで適用済みマイグレーションを追跡します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">マイグレーションのコマンド</h2>
        <p className="text-gray-400 mb-4">dotnet CLIまたはPackage Manager Consoleで実行します。</p>
        <CSharpEditor
          defaultCode={`// マイグレーションのコマンド一覧
var commands = new[]
{
    // dotnet CLI
    ("dotnet ef migrations add InitialCreate",
     "最初のマイグレーション作成"),
    ("dotnet ef migrations add AddProductTable",
     "新しいマイグレーション追加"),
    ("dotnet ef database update",
     "最新マイグレーションをDBに適用"),
    ("dotnet ef database update InitialCreate",
     "特定バージョンに戻す"),
    ("dotnet ef migrations remove",
     "最後のマイグレーションを削除"),
    ("dotnet ef migrations list",
     "マイグレーション一覧を表示"),
    ("dotnet ef database drop",
     "データベースを削除"),
};

Console.WriteLine("=== EF Core マイグレーション コマンド ===");
foreach (var (cmd, desc) in commands)
{
    Console.WriteLine($"$ {cmd}");
    Console.WriteLine($"  -> {desc}");
    Console.WriteLine();
}`}
          expectedOutput={`=== EF Core マイグレーション コマンド ===
$ dotnet ef migrations add InitialCreate
  -> 最初のマイグレーション作成

$ dotnet ef migrations add AddProductTable
  -> 新しいマイグレーション追加

$ dotnet ef database update
  -> 最新マイグレーションをDBに適用

$ dotnet ef database update InitialCreate
  -> 特定バージョンに戻す

$ dotnet ef migrations remove
  -> 最後のマイグレーションを削除

$ dotnet ef migrations list
  -> マイグレーション一覧を表示

$ dotnet ef database drop
  -> データベースを削除`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">生成されるマイグレーションファイル</h2>
        <p className="text-gray-400 mb-4">マイグレーションファイルの構造を理解しましょう。</p>
        <CSharpEditor
          defaultCode={`// 生成されるマイグレーションファイルの例
// Migrations/20240101000000_InitialCreate.cs

using Microsoft.EntityFrameworkCore.Migrations;

public partial class InitialCreate : Migration
{
    // Up: マイグレーション適用時（DB作成・変更）
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "Blogs",
            columns: table => new
            {
                Id = table.Column<int>(nullable: false)
                    .Annotation("Sqlite:Autoincrement", true),
                Title = table.Column<string>(maxLength: 200, nullable: false),
                Url = table.Column<string>(nullable: true),
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Blogs", x => x.Id);
            });
    }

    // Down: ロールバック時
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(name: "Blogs");
    }
}

Console.WriteLine("マイグレーションファイルの構造:");
Console.WriteLine("- Up()  : マイグレーション適用時の処理");
Console.WriteLine("- Down(): ロールバック時の処理");`}
          expectedOutput={`マイグレーションファイルの構造:
- Up()  : マイグレーション適用時の処理
- Down(): ロールバック時の処理`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="efcore" lessonId="migrations" />
      </div>
      <LessonNav lessons={lessons} currentId="migrations" basePath="/learn/efcore" />
    </div>
  );
}

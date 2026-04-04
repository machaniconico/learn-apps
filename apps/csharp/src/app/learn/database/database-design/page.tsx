import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("database");

export default function DatabaseDesignPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">データベース レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">データベース設計</h1>
        <p className="text-gray-400">正規化、インデックス、パフォーマンス、Code-First vs DB-Firstを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">正規化の基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          正規化はデータの冗長性を排除し整合性を保つためのテーブル設計手法です。第1〜第3正規形（1NF〜3NF）が実務でよく使われます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">インデックスの設計</h2>
        <p className="text-gray-400 mb-4">適切なインデックスがクエリパフォーマンスを大幅に改善します。</p>
        <CSharpEditor
          defaultCode={`// インデックスの設計指針
Console.WriteLine("=== インデックス設計のガイドライン ===");
Console.WriteLine();
Console.WriteLine("【インデックスを付けるべき列】");
Console.WriteLine("- WHERE句で頻繁に使う列");
Console.WriteLine("- JOIN条件に使う列（外部キー）");
Console.WriteLine("- ORDER BY / GROUP BY に使う列");
Console.WriteLine("- 選択性が高い列（カーディナリティが高い）");
Console.WriteLine();
Console.WriteLine("【インデックスを付けない方がよい場合】");
Console.WriteLine("- 書き込みが多いテーブル（INSERT/UPDATE遅くなる）");
Console.WriteLine("- 選択性が低い列（True/Falseなど）");
Console.WriteLine("- 小さいテーブル（フルスキャンの方が速いことも）");
Console.WriteLine();
Console.WriteLine("【EF Core でのインデックス設定】");
Console.WriteLine("// Fluent API");
Console.WriteLine("entity.HasIndex(e => e.Email).IsUnique();");
Console.WriteLine("entity.HasIndex(e => new { e.CategoryId, e.Price });");
Console.WriteLine();
Console.WriteLine("// Data Annotation");
Console.WriteLine("[Index(nameof(Email), IsUnique = true)]");
Console.WriteLine("public class User { ... }");`}
          expectedOutput={`=== インデックス設計のガイドライン ===

【インデックスを付けるべき列】
- WHERE句で頻繁に使う列
- JOIN条件に使う列（外部キー）
- ORDER BY / GROUP BY に使う列
- 選択性が高い列（カーディナリティが高い）

【インデックスを付けない方がよい場合】
- 書き込みが多いテーブル（INSERT/UPDATE遅くなる）
- 選択性が低い列（True/Falseなど）
- 小さいテーブル（フルスキャンの方が速いことも）

【EF Core でのインデックス設定】
// Fluent API
entity.HasIndex(e => e.Email).IsUnique();
entity.HasIndex(e => new { e.CategoryId, e.Price });

// Data Annotation
[Index(nameof(Email), IsUnique = true)]
public class User { ... }`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Code-First vs Database-First</h2>
        <p className="text-gray-400 mb-4">EF Coreの2つの主要なワークフローの違いを理解します。</p>
        <CSharpEditor
          defaultCode={`// Code-First vs Database-First の比較
Console.WriteLine("=== Code-First アプローチ ===");
Console.WriteLine("C#クラス → EF Core → データベース");
Console.WriteLine();
Console.WriteLine("メリット:");
Console.WriteLine("  ✓ C#コードでスキーマを管理（バージョン管理しやすい）");
Console.WriteLine("  ✓ マイグレーションで段階的にDB進化");
Console.WriteLine("  ✓ 新規プロジェクトに最適");
Console.WriteLine();
Console.WriteLine("コマンド:");
Console.WriteLine("  dotnet ef migrations add InitialCreate");
Console.WriteLine("  dotnet ef database update");
Console.WriteLine();
Console.WriteLine("=== Database-First アプローチ ===");
Console.WriteLine("既存データベース → EF Core → C#クラス生成");
Console.WriteLine();
Console.WriteLine("メリット:");
Console.WriteLine("  ✓ 既存DBがある場合に素早く開始できる");
Console.WriteLine("  ✓ DBAがDBを管理する組織に適している");
Console.WriteLine();
Console.WriteLine("コマンド:");
Console.WriteLine("  dotnet ef dbcontext scaffold");
Console.WriteLine("    \"接続文字列\" Microsoft.EntityFrameworkCore.SqlServer");`}
          expectedOutput={`=== Code-First アプローチ ===
C#クラス → EF Core → データベース

メリット:
  ✓ C#コードでスキーマを管理（バージョン管理しやすい）
  ✓ マイグレーションで段階的にDB進化
  ✓ 新規プロジェクトに最適

コマンド:
  dotnet ef migrations add InitialCreate
  dotnet ef database update

=== Database-First アプローチ ===
既存データベース → EF Core → C#クラス生成

メリット:
  ✓ 既存DBがある場合に素早く開始できる
  ✓ DBAがDBを管理する組織に適している

コマンド:
  dotnet ef dbcontext scaffold
    "接続文字列" Microsoft.EntityFrameworkCore.SqlServer`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="database" lessonId="database-design" />
      </div>
      <LessonNav lessons={lessons} currentId="database-design" basePath="/learn/database" />
    </div>
  );
}

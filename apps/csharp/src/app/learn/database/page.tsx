import { CSharpEditor } from "@/components/csharp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("database");

export default function DatabasePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">データベース</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          ADO.NET・Dapper・Repository パターンなど、C#でのデータベースアクセス手法を幅広く学びます。低レベルなSQLからパターン設計まで体系的に理解しましょう。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="database" totalLessons={6} color="teal" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/database" color="teal" categoryId="database" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">データベースアクセスの選択肢</h2>
        <p className="text-gray-400 mb-4">
          C#にはデータベースアクセスの選択肢が複数あります。ADO.NETは低レベルで高速、DapperはシンプルなマイクロORM、EF CoreはフルORMです。用途に応じて使い分けましょう。
        </p>
        <CSharpEditor
          defaultCode={`// データベースアクセスの選択肢
Console.WriteLine("=== C#のデータベースアクセス方法 ===");
Console.WriteLine();
Console.WriteLine("1. ADO.NET");
Console.WriteLine("   - 低レベルAPIで最大限のコントロール");
Console.WriteLine("   - SqlConnection, SqlCommand, SqlDataReader");
Console.WriteLine();
Console.WriteLine("2. Dapper");
Console.WriteLine("   - ADO.NETの上の薄いラッパー");
Console.WriteLine("   - SQLを書きつつオブジェクトマッピングが楽");
Console.WriteLine();
Console.WriteLine("3. Entity Framework Core");
Console.WriteLine("   - フルORM、LINQでクエリを記述");
Console.WriteLine("   - マイグレーション機能でスキーマ管理");`}
          expectedOutput={`=== C#のデータベースアクセス方法 ===

1. ADO.NET
   - 低レベルAPIで最大限のコントロール
   - SqlConnection, SqlCommand, SqlDataReader

2. Dapper
   - ADO.NETの上の薄いラッパー
   - SQLを書きつつオブジェクトマッピングが楽

3. Entity Framework Core
   - フルORM、LINQでクエリを記述
   - マイグレーション機能でスキーマ管理`}
        />
      </section>
    </div>
  );
}

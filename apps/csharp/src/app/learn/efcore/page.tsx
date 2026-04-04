import { CSharpEditor } from "@/components/csharp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("efcore");

export default function EfcorePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-green-400 mb-2">Entity Framework Core</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Entity Framework Coreを使ったデータベースアクセスを学びましょう。DbContext・マイグレーション・CRUD・リレーションシップなど、ORMの全体像を理解します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="efcore" totalLessons={8} color="green" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/efcore" color="green" categoryId="efcore" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">EF Coreとは</h2>
        <p className="text-gray-400 mb-4">
          Entity Framework Core（EF Core）はMicrosoftが提供するオープンソースのORMです。C#のオブジェクトとデータベースのテーブルをマッピングし、SQLを直接書かずにデータ操作ができます。
        </p>
        <CSharpEditor
          defaultCode={`// EF CoreでのシンプルなCRUD例
using Microsoft.EntityFrameworkCore;

// エンティティクラス
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public decimal Price { get; set; }
}

// DbContextの使用例（概念的なコード）
// using var context = new AppDbContext();
// context.Products.Add(new Product { Name = "商品A", Price = 1000 });
// await context.SaveChangesAsync();

Console.WriteLine("EF Core: ORMによるデータアクセス");
Console.WriteLine("- エンティティクラスでテーブルを表現");
Console.WriteLine("- DbContextでデータベース操作を管理");
Console.WriteLine("- LINQでタイプセーフなクエリを記述");`}
          expectedOutput={`EF Core: ORMによるデータアクセス
- エンティティクラスでテーブルを表現
- DbContextでデータベース操作を管理
- LINQでタイプセーフなクエリを記述`}
        />
      </section>
    </div>
  );
}

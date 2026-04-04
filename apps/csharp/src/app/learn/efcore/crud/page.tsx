import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("efcore");

export default function EfcoreCrudPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">EF Core レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">CRUD操作</h1>
        <p className="text-gray-400">Add、Find、Update、Remove、SaveChangesを使ったデータの作成・読取・更新・削除を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">CRUDとSaveChanges</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          EF CoreのCRUD操作はすべてDbContextを通じて行います。変更はメモリ上に蓄積され、
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">SaveChanges()</code>または
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">SaveChangesAsync()</code>を呼ぶまでDBには反映されません。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Create（作成）</h2>
        <p className="text-gray-400 mb-4">新しいエンティティを追加してSaveChangesで保存します。</p>
        <CSharpEditor
          defaultCode={`using Microsoft.EntityFrameworkCore;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public decimal Price { get; set; }
}

// Create 操作の例（概念コード）
void DemonstrateCreate()
{
    Console.WriteLine("=== Create（作成） ===");
    Console.WriteLine();
    Console.WriteLine("// 単一エンティティの追加");
    Console.WriteLine("var product = new Product { Name = \"商品A\", Price = 1000 };");
    Console.WriteLine("context.Products.Add(product);");
    Console.WriteLine("context.SaveChanges();");
    Console.WriteLine($"// 保存後: product.Id = 1 (自動採番)");
    Console.WriteLine();
    Console.WriteLine("// 複数エンティティの一括追加");
    Console.WriteLine("context.Products.AddRange(product1, product2, product3);");
    Console.WriteLine("context.SaveChanges();");
}

DemonstrateCreate();

// Read 操作の例
Console.WriteLine();
Console.WriteLine("=== Read（読取） ===");
Console.WriteLine("// 主キーで検索");
Console.WriteLine("var found = context.Products.Find(1);");
Console.WriteLine("// LINQで検索");
Console.WriteLine("var products = context.Products.Where(p => p.Price > 500).ToList();");`}
          expectedOutput={`=== Create（作成） ===

// 単一エンティティの追加
var product = new Product { Name = "商品A", Price = 1000 };
context.Products.Add(product);
context.SaveChanges();
// 保存後: product.Id = 1 (自動採番)

// 複数エンティティの一括追加
context.Products.AddRange(product1, product2, product3);
context.SaveChanges();

=== Read（読取） ===
// 主キーで検索
var found = context.Products.Find(1);
// LINQで検索
var products = context.Products.Where(p => p.Price > 500).ToList();`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Update・Delete操作</h2>
        <p className="text-gray-400 mb-4">エンティティを取得してプロパティを変更するとUpdateになります。</p>
        <CSharpEditor
          defaultCode={`// Update・Delete 操作の概念
Console.WriteLine("=== Update（更新） ===");
Console.WriteLine("// 方法1: トラッキングされたエンティティを直接変更");
Console.WriteLine("var product = context.Products.Find(1);");
Console.WriteLine("product.Price = 1500;");
Console.WriteLine("context.SaveChanges(); // 変更を検知して UPDATE文を実行");
Console.WriteLine();
Console.WriteLine("// 方法2: Updateメソッドで切り離されたエンティティを更新");
Console.WriteLine("context.Products.Update(detachedProduct);");
Console.WriteLine("context.SaveChanges();");
Console.WriteLine();
Console.WriteLine("=== Delete（削除） ===");
Console.WriteLine("// エンティティを取得して削除");
Console.WriteLine("var product = context.Products.Find(1);");
Console.WriteLine("context.Products.Remove(product);");
Console.WriteLine("context.SaveChanges();");
Console.WriteLine();
Console.WriteLine("// ExecuteDelete（EF Core 7.0以降、高速一括削除）");
Console.WriteLine("context.Products");
Console.WriteLine("    .Where(p => p.Price < 100)");
Console.WriteLine("    .ExecuteDelete();");`}
          expectedOutput={`=== Update（更新） ===
// 方法1: トラッキングされたエンティティを直接変更
var product = context.Products.Find(1);
product.Price = 1500;
context.SaveChanges(); // 変更を検知して UPDATE文を実行

// 方法2: Updateメソッドで切り離されたエンティティを更新
context.Products.Update(detachedProduct);
context.SaveChanges();

=== Delete（削除） ===
// エンティティを取得して削除
var product = context.Products.Find(1);
context.Products.Remove(product);
context.SaveChanges();

// ExecuteDelete（EF Core 7.0以降、高速一括削除）
context.Products
    .Where(p => p.Price < 100)
    .ExecuteDelete();`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="efcore" lessonId="crud" />
      </div>
      <LessonNav lessons={lessons} currentId="crud" basePath="/learn/efcore" />
    </div>
  );
}

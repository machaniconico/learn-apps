import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("efcore");

export default function EfcoreTransactionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">EF Core レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">トランザクション</h1>
        <p className="text-gray-400">BeginTransaction、Commit、Rollback、SaveChangesの原子性を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">トランザクションとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          トランザクションは複数のDB操作をひとまとめにする仕組みです。ACID特性（原子性・一貫性・独立性・永続性）を保証し、途中でエラーが発生した場合はすべての変更をロールバックできます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          EF Coreの<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">SaveChanges()</code>は1回の呼び出しがトランザクション単位になります。複数の<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">SaveChanges()</code>にまたがる操作には明示的なトランザクションが必要です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">明示的なトランザクション</h2>
        <p className="text-gray-400 mb-4">BeginTransactionでトランザクションを手動制御します。</p>
        <CSharpEditor
          defaultCode={`// 明示的なトランザクションの使い方
Console.WriteLine("=== 明示的なトランザクション ===");
Console.WriteLine();
Console.WriteLine("using var transaction = await context.Database.BeginTransactionAsync();");
Console.WriteLine("try");
Console.WriteLine("{");
Console.WriteLine("    // 操作1: 注文を作成");
Console.WriteLine("    var order = new Order { CustomerId = 1, Total = 5000 };");
Console.WriteLine("    context.Orders.Add(order);");
Console.WriteLine("    await context.SaveChangesAsync();");
Console.WriteLine();
Console.WriteLine("    // 操作2: 在庫を減らす");
Console.WriteLine("    var item = await context.Inventory.FindAsync(1);");
Console.WriteLine("    item.Stock -= 1;");
Console.WriteLine("    await context.SaveChangesAsync();");
Console.WriteLine();
Console.WriteLine("    // 両方成功したらコミット");
Console.WriteLine("    await transaction.CommitAsync();");
Console.WriteLine("    Console.WriteLine(\"トランザクション成功\");");
Console.WriteLine("}");
Console.WriteLine("catch (Exception ex)");
Console.WriteLine("{");
Console.WriteLine("    // エラー時はロールバック");
Console.WriteLine("    await transaction.RollbackAsync();");
Console.WriteLine("    Console.WriteLine($\"ロールバック: {ex.Message}\");");
Console.WriteLine("}");`}
          expectedOutput={`=== 明示的なトランザクション ===

using var transaction = await context.Database.BeginTransactionAsync();
try
{
    // 操作1: 注文を作成
    var order = new Order { CustomerId = 1, Total = 5000 };
    context.Orders.Add(order);
    await context.SaveChangesAsync();

    // 操作2: 在庫を減らす
    var item = await context.Inventory.FindAsync(1);
    item.Stock -= 1;
    await context.SaveChangesAsync();

    // 両方成功したらコミット
    await transaction.CommitAsync();
    Console.WriteLine("トランザクション成功");
}
catch (Exception ex)
{
    // エラー時はロールバック
    await transaction.RollbackAsync();
    Console.WriteLine($"ロールバック: {ex.Message}");
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">SaveChangesの原子性</h2>
        <p className="text-gray-400 mb-4">SaveChanges自体が内部でトランザクションを使います。</p>
        <CSharpEditor
          defaultCode={`// SaveChangesの原子性（一回の呼び出し = 1トランザクション）
Console.WriteLine("SaveChangesの原子性:");
Console.WriteLine();
Console.WriteLine("// この3つの変更は同一トランザクション内で実行される");
Console.WriteLine("context.Products.Add(new Product { Name = \"商品A\" });");
Console.WriteLine("context.Products.Add(new Product { Name = \"商品B\" });");
Console.WriteLine("context.Customers.Add(new Customer { Name = \"顧客X\" });");
Console.WriteLine("context.SaveChanges(); // 全部成功 or 全部失敗");
Console.WriteLine();
Console.WriteLine("// SaveChangesAsync でエラーハンドリング");
Console.WriteLine("try");
Console.WriteLine("{");
Console.WriteLine("    await context.SaveChangesAsync();");
Console.WriteLine("    Console.WriteLine(\"保存成功\");");
Console.WriteLine("}");
Console.WriteLine("catch (DbUpdateConcurrencyException)");
Console.WriteLine("{");
Console.WriteLine("    Console.WriteLine(\"同時更新エラー\");");
Console.WriteLine("}");
Console.WriteLine("catch (DbUpdateException)");
Console.WriteLine("{");
Console.WriteLine("    Console.WriteLine(\"DB更新エラー（制約違反等）\");");
Console.WriteLine("}");`}
          expectedOutput={`SaveChangesの原子性:

// この3つの変更は同一トランザクション内で実行される
context.Products.Add(new Product { Name = "商品A" });
context.Products.Add(new Product { Name = "商品B" });
context.Customers.Add(new Customer { Name = "顧客X" });
context.SaveChanges(); // 全部成功 or 全部失敗

// SaveChangesAsync でエラーハンドリング
try
{
    await context.SaveChangesAsync();
    Console.WriteLine("保存成功");
}
catch (DbUpdateConcurrencyException)
{
    Console.WriteLine("同時更新エラー");
}
catch (DbUpdateException)
{
    Console.WriteLine("DB更新エラー（制約違反等）");
}`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="efcore" lessonId="transactions" />
      </div>
      <LessonNav lessons={lessons} currentId="transactions" basePath="/learn/efcore" />
    </div>
  );
}

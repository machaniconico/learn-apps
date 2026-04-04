import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("efcore");

export default function EfcoreQueryOptimizationPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">EF Core レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">クエリ最適化</h1>
        <p className="text-gray-400">Include/ThenInclude、AsNoTracking、Raw SQL、プロファイリングを使ったパフォーマンス改善を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">N+1問題とEager Loading</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          N+1問題はリレーションデータを1件ずつクエリすることで、N件のデータに対してN+1回のクエリが発生するパフォーマンス問題です。
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">Include</code>を使うEager Loadingで解決できます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Include と ThenInclude</h2>
        <p className="text-gray-400 mb-4">関連データを効率よく一括読み込みします。</p>
        <CSharpEditor
          defaultCode={`// Include / ThenInclude の使い方
Console.WriteLine("=== Eager Loading ===");
Console.WriteLine();
Console.WriteLine("// 問題のあるコード（N+1問題）");
Console.WriteLine("var blogs = context.Blogs.ToList();");
Console.WriteLine("foreach (var blog in blogs)");
Console.WriteLine("{");
Console.WriteLine("    // 各ブログでPosts取得 -> N回のクエリ発生!");
Console.WriteLine("    var posts = blog.Posts.ToList();");
Console.WriteLine("}");
Console.WriteLine();
Console.WriteLine("// 改善: Include で一括読み込み（2回のクエリで完了）");
Console.WriteLine("var blogs = context.Blogs");
Console.WriteLine("    .Include(b => b.Posts)");
Console.WriteLine("    .ToList();");
Console.WriteLine();
Console.WriteLine("// ThenInclude: 深いリレーションも一括読み込み");
Console.WriteLine("var blogs = context.Blogs");
Console.WriteLine("    .Include(b => b.Posts)");
Console.WriteLine("        .ThenInclude(p => p.Comments)");
Console.WriteLine("    .ToList();");`}
          expectedOutput={`=== Eager Loading ===

// 問題のあるコード（N+1問題）
var blogs = context.Blogs.ToList();
foreach (var blog in blogs)
{
    // 各ブログでPosts取得 -> N回のクエリ発生!
    var posts = blog.Posts.ToList();
}

// 改善: Include で一括読み込み（2回のクエリで完了）
var blogs = context.Blogs
    .Include(b => b.Posts)
    .ToList();

// ThenInclude: 深いリレーションも一括読み込み
var blogs = context.Blogs
    .Include(b => b.Posts)
        .ThenInclude(p => p.Comments)
    .ToList();`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">AsNoTracking と Raw SQL</h2>
        <p className="text-gray-400 mb-4">読み取り専用クエリはAsNoTrackingで高速化できます。</p>
        <CSharpEditor
          defaultCode={`// AsNoTracking: 変更追跡を無効化して高速化
Console.WriteLine("=== AsNoTracking ===");
Console.WriteLine("// 変更追跡が不要な読み取り専用クエリに使用");
Console.WriteLine("var products = context.Products");
Console.WriteLine("    .AsNoTracking()  // Change Trackerに登録しない");
Console.WriteLine("    .Where(p => p.Price > 100)");
Console.WriteLine("    .ToList();");
Console.WriteLine();
Console.WriteLine("=== Raw SQL ===");
Console.WriteLine("// FromSqlRaw: 生のSQLでクエリ（危険: SQLインジェクション注意）");
Console.WriteLine("var products = context.Products");
Console.WriteLine("    .FromSqlRaw(\"SELECT * FROM Products WHERE Price > 100\")");
Console.WriteLine("    .ToList();");
Console.WriteLine();
Console.WriteLine("// FromSqlInterpolated: パラメータ化（安全）");
Console.WriteLine("decimal minPrice = 100;");
Console.WriteLine("var products = context.Products");
Console.WriteLine("    .FromSqlInterpolated($\"SELECT * FROM Products WHERE Price > {minPrice}\")");
Console.WriteLine("    .ToList();");
Console.WriteLine();
Console.WriteLine("// ExecuteSqlRaw: UPDATE/DELETE等の非クエリSQLを実行");
Console.WriteLine("context.Database.ExecuteSqlRaw(");
Console.WriteLine("    \"UPDATE Products SET Price = Price * 1.1 WHERE CategoryId = {0}\", 1);");`}
          expectedOutput={`=== AsNoTracking ===
// 変更追跡が不要な読み取り専用クエリに使用
var products = context.Products
    .AsNoTracking()  // Change Trackerに登録しない
    .Where(p => p.Price > 100)
    .ToList();

=== Raw SQL ===
// FromSqlRaw: 生のSQLでクエリ（危険: SQLインジェクション注意）
var products = context.Products
    .FromSqlRaw("SELECT * FROM Products WHERE Price > 100")
    .ToList();

// FromSqlInterpolated: パラメータ化（安全）
decimal minPrice = 100;
var products = context.Products
    .FromSqlInterpolated($"SELECT * FROM Products WHERE Price > {minPrice}")
    .ToList();

// ExecuteSqlRaw: UPDATE/DELETE等の非クエリSQLを実行
context.Database.ExecuteSqlRaw(
    "UPDATE Products SET Price = Price * 1.1 WHERE CategoryId = {0}", 1);`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="efcore" lessonId="query-optimization" />
      </div>
      <LessonNav lessons={lessons} currentId="query-optimization" basePath="/learn/efcore" />
    </div>
  );
}

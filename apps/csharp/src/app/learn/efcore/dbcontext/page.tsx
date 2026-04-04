import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("efcore");

export default function EfcoreDbcontextPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">EF Core レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">DbContext</h1>
        <p className="text-gray-400">DbContextクラス、DbSet&lt;T&gt;、OnConfiguring、接続文字列の設定方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">DbContextとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">DbContext</code>はEF Coreの中心的なクラスで、データベースとのセッションを表します。
          エンティティの追跡・クエリ実行・変更の保存など、すべてのDB操作はDbContextを通じて行います。
        </p>
        <p className="text-gray-300 leading-relaxed">
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">DbSet&lt;T&gt;</code>プロパティがデータベースのテーブルに対応し、LINQクエリのエントリーポイントになります。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">DbContextの定義</h2>
        <p className="text-gray-400 mb-4">DbContextを継承して独自のコンテキストクラスを作成します。</p>
        <CSharpEditor
          defaultCode={`using Microsoft.EntityFrameworkCore;

// エンティティクラス
public class Blog
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Url { get; set; } = "";
}

public class Post
{
    public int Id { get; set; }
    public string Content { get; set; } = "";
    public int BlogId { get; set; }
}

// DbContextの定義
public class BloggingContext : DbContext
{
    // DbSet<T> プロパティでテーブルを表す
    public DbSet<Blog> Blogs { get; set; }
    public DbSet<Post> Posts { get; set; }

    // OnConfiguring でデータベース接続を設定
    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseSqlite("Data Source=blogging.db");
    }
}

Console.WriteLine("DbContextの構造:");
Console.WriteLine("  Blogs -> blogs テーブル");
Console.WriteLine("  Posts -> posts テーブル");
Console.WriteLine("  OnConfiguring -> 接続設定");`}
          expectedOutput={`DbContextの構造:
  Blogs -> blogs テーブル
  Posts -> posts テーブル
  OnConfiguring -> 接続設定`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">接続文字列の管理</h2>
        <p className="text-gray-400 mb-4">本番環境では接続文字列をappsettings.jsonや環境変数で管理します。</p>
        <CSharpEditor
          defaultCode={`// appsettings.json での接続文字列設定例
// {
//   "ConnectionStrings": {
//     "DefaultConnection": "Server=.;Database=MyDb;Trusted_Connection=true;"
//   }
// }

// コンストラクタ注入パターン（ASP.NET Core推奨）
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Blog> Blogs { get; set; }
}

// Program.cs での登録
// builder.Services.AddDbContext<AppDbContext>(options =>
//     options.UseSqlServer(
//         builder.Configuration.GetConnectionString("DefaultConnection")));

Console.WriteLine("接続文字列管理のベストプラクティス:");
Console.WriteLine("1. appsettings.json に保存");
Console.WriteLine("2. 環境変数で上書き可能にする");
Console.WriteLine("3. 本番DBパスワードはSecret Managerを使用");
Console.WriteLine("4. コンストラクタ注入でDbContextを受け取る");`}
          expectedOutput={`接続文字列管理のベストプラクティス:
1. appsettings.json に保存
2. 環境変数で上書き可能にする
3. 本番DBパスワードはSecret Managerを使用
4. コンストラクタ注入でDbContextを受け取る`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="efcore" lessonId="dbcontext" />
      </div>
      <LessonNav lessons={lessons} currentId="dbcontext" basePath="/learn/efcore" />
    </div>
  );
}

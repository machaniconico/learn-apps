import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("efcore");

export default function EfcoreRelationshipsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">EF Core レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">リレーションシップ</h1>
        <p className="text-gray-400">1対1・1対多・多対多のリレーション設定とナビゲーションプロパティを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ナビゲーションプロパティ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          EF Coreではエンティティ間の関係をナビゲーションプロパティで表します。関連エンティティを参照型（参照ナビゲーション）またはコレクション型（コレクションナビゲーション）で定義します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">1対多（One-to-Many）</h2>
        <p className="text-gray-400 mb-4">最も一般的なリレーション。1つのBlogに複数のPostが属します。</p>
        <CSharpEditor
          defaultCode={`// 1対多リレーションシップ
public class Blog
{
    public int Id { get; set; }
    public string Title { get; set; } = "";

    // コレクションナビゲーション（1側）
    public List<Post> Posts { get; set; } = new();
}

public class Post
{
    public int Id { get; set; }
    public string Title { get; set; } = "";

    // 外部キー
    public int BlogId { get; set; }

    // 参照ナビゲーション（多側）
    public Blog Blog { get; set; } = null!;
}

// 使用例
Console.WriteLine("1対多リレーション:");
Console.WriteLine("Blog 1 --< Post (多数)");
Console.WriteLine();
Console.WriteLine("// Includeで関連データを読み込む");
Console.WriteLine("var blogs = context.Blogs");
Console.WriteLine("    .Include(b => b.Posts)");
Console.WriteLine("    .ToList();");
Console.WriteLine();
Console.WriteLine("// 関連データの作成");
Console.WriteLine("var blog = new Blog { Title = \"Tech Blog\" };");
Console.WriteLine("blog.Posts.Add(new Post { Title = \"記事1\" });");
Console.WriteLine("context.Blogs.Add(blog);");
Console.WriteLine("context.SaveChanges();");`}
          expectedOutput={`1対多リレーション:
Blog 1 --< Post (多数)

// Includeで関連データを読み込む
var blogs = context.Blogs
    .Include(b => b.Posts)
    .ToList();

// 関連データの作成
var blog = new Blog { Title = "Tech Blog" };
blog.Posts.Add(new Post { Title = "記事1" });
context.Blogs.Add(blog);
context.SaveChanges();`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">多対多（Many-to-Many）</h2>
        <p className="text-gray-400 mb-4">EF Core 5.0以降では中間テーブルなしで多対多を設定できます。</p>
        <CSharpEditor
          defaultCode={`// 多対多リレーションシップ（EF Core 5.0以降）
public class Student
{
    public int Id { get; set; }
    public string Name { get; set; } = "";

    // 多対多ナビゲーション
    public List<Course> Courses { get; set; } = new();
}

public class Course
{
    public int Id { get; set; }
    public string Title { get; set; } = "";

    // 多対多ナビゲーション
    public List<Student> Students { get; set; } = new();
}
// EF Coreが自動的に中間テーブル StudentCourse を生成

// 1対1リレーションシップ
public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public UserProfile? Profile { get; set; }
}

public class UserProfile
{
    public int Id { get; set; }
    public string Bio { get; set; } = "";
    public int UserId { get; set; }
    public User User { get; set; } = null!;
}

Console.WriteLine("多対多: Student >--< Course");
Console.WriteLine("1対1:   User --1 UserProfile");`}
          expectedOutput={`多対多: Student >--< Course
1対1:   User --1 UserProfile`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="efcore" lessonId="relationships" />
      </div>
      <LessonNav lessons={lessons} currentId="relationships" basePath="/learn/efcore" />
    </div>
  );
}

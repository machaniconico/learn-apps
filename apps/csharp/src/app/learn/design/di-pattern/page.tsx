import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function DesignDiPatternPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">デザインパターン レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">DIパターン</h1>
        <p className="text-gray-400">コンストラクタインジェクション、サービスロケーター、Microsoft.Extensions.DIを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">依存性注入（DI）とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          依存性注入（Dependency Injection）はオブジェクトが必要とする依存関係を外部から注入するパターンです。クラス内部でnewするのではなく、コンストラクタ引数などで受け取ります。
        </p>
        <p className="text-gray-300 leading-relaxed">
          DIによりクラスが具体的な実装に依存せずインターフェースに依存するようになり、テスト可能性と保守性が向上します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コンストラクタインジェクション</h2>
        <p className="text-gray-400 mb-4">最も一般的で推奨されるDIの方法です。</p>
        <CSharpEditor
          defaultCode={`// DI前: 依存関係をnewで生成（テスト困難）
public class UserServiceBad
{
    // 具体的な実装に直接依存してしまう
    private readonly SqlUserRepository _repo = new SqlUserRepository();
    private readonly EmailService _emailService = new EmailService();

    public void Register(string name, string email)
    {
        _repo.Save(new User(name, email));
        _emailService.SendWelcome(email);
    }
}

// DI後: インターフェースに依存（テスト可能）
public interface IUserRepository
{
    void Save(User user);
}

public interface IEmailService
{
    void SendWelcome(string email);
}

public class User
{
    public string Name { get; }
    public string Email { get; }
    public User(string name, string email) => (Name, Email) = (name, email);
}

public class UserService
{
    private readonly IUserRepository _repo;
    private readonly IEmailService _emailService;

    // コンストラクタで依存関係を受け取る
    public UserService(IUserRepository repo, IEmailService emailService)
    {
        _repo = repo;
        _emailService = emailService;
    }

    public void Register(string name, string email)
    {
        var user = new User(name, email);
        _repo.Save(user);
        _emailService.SendWelcome(email);
        Console.WriteLine($"ユーザー登録完了: {name}");
    }
}

// モック実装（テスト用）
public class MockUserRepository : IUserRepository
{
    public List<User> SavedUsers { get; } = new();
    public void Save(User user)
    {
        SavedUsers.Add(user);
        Console.WriteLine($"[モック] ユーザー保存: {user.Name}");
    }
}

public class MockEmailService : IEmailService
{
    public void SendWelcome(string email)
        => Console.WriteLine($"[モック] ウェルカムメール送信: {email}");
}

// テスト時
var service = new UserService(new MockUserRepository(), new MockEmailService());
service.Register("田中太郎", "tanaka@example.com");`}
          expectedOutput={`[モック] ユーザー保存: 田中太郎
[モック] ウェルカムメール送信: tanaka@example.com
ユーザー登録完了: 田中太郎`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Microsoft.Extensions.DependencyInjection</h2>
        <p className="text-gray-400 mb-4">.NETの標準DIコンテナの使い方を学びます。</p>
        <CSharpEditor
          defaultCode={`using Microsoft.Extensions.DependencyInjection;

// DIコンテナへの登録
var services = new ServiceCollection();

// ライフタイムの種類
// Singleton: アプリ全体で1インスタンス
services.AddSingleton<IUserRepository, MockUserRepository>();

// Scoped: リクエストごとに1インスタンス（WebAPI向け）
// services.AddScoped<IUserRepository, DbUserRepository>();

// Transient: 毎回新しいインスタンス
// services.AddTransient<IEmailService, SmtpEmailService>();
services.AddTransient<IEmailService, MockEmailService>();

// UserService を登録（依存関係は自動解決）
services.AddTransient<UserService>();

// サービスプロバイダーを構築
var provider = services.BuildServiceProvider();

// 解決（依存関係が自動注入される）
var userService = provider.GetRequiredService<UserService>();
userService.Register("鈴木花子", "suzuki@example.com");

Console.WriteLine();
Console.WriteLine("DIコンテナのライフタイム:");
Console.WriteLine("AddSingleton  : アプリ全体で1インスタンス");
Console.WriteLine("AddScoped     : スコープ（HTTPリクエスト）単位");
Console.WriteLine("AddTransient  : 毎回新しいインスタンス");`}
          expectedOutput={`[モック] ユーザー保存: 鈴木花子
[モック] ウェルカムメール送信: suzuki@example.com
ユーザー登録完了: 鈴木花子

DIコンテナのライフタイム:
AddSingleton  : アプリ全体で1インスタンス
AddScoped     : スコープ（HTTPリクエスト）単位
AddTransient  : 毎回新しいインスタンス`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="di-pattern" />
      </div>
      <LessonNav lessons={lessons} currentId="di-pattern" basePath="/learn/design" />
    </div>
  );
}

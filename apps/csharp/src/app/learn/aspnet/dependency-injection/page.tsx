import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("aspnet");

export default function DependencyInjectionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">ASP.NET Core基礎 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">依存性注入</h1>
        <p className="text-gray-400">AddScoped・AddTransient・AddSingleton・コンストラクタ注入の使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">依存性注入（DI）とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          依存性注入はオブジェクトの依存関係をコード内で直接作成せず、外部から注入する設計パターンです。
          ASP.NET Coreは組み込みのDIコンテナを持ち、3種類のライフタイムで登録できます。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">AddSingleton</code>: アプリ起動から終了まで1つのインスタンスを共有</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">AddScoped</code>: HTTPリクエストごとに1つのインスタンス</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">AddTransient</code>: 要求のたびに新しいインスタンスを生成</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">DIの基本パターン</h2>
        <p className="text-gray-400 mb-4">
          インターフェースと実装クラスを分けて、コンストラクタ注入で使用します。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;

// インターフェース（抽象）
interface IEmailService
{
    void Send(string to, string subject);
}

// 実装クラス
class SmtpEmailService : IEmailService
{
    public void Send(string to, string subject)
        => Console.WriteLine($"[SMTP] {to} へ送信: {subject}");
}

class MockEmailService : IEmailService
{
    public void Send(string to, string subject)
        => Console.WriteLine($"[Mock] {to} へ送信（テスト）: {subject}");
}

// DIコンテナのシミュレーション
class ServiceContainer
{
    private readonly Dictionary<Type, Func<object>> _registrations = new();

    public void AddSingleton<TService, TImpl>() where TImpl : TService, new()
    {
        var instance = new TImpl();
        _registrations[typeof(TService)] = () => instance;
    }

    public T GetService<T>() => (T)_registrations[typeof(T)]();
}

// サービスを使うクラス（コンストラクタ注入）
class UserRegistrationService
{
    private readonly IEmailService _email;

    public UserRegistrationService(IEmailService email)
    {
        _email = email; // 依存関係が注入される
    }

    public void Register(string userEmail)
    {
        Console.WriteLine($"ユーザー {userEmail} を登録");
        _email.Send(userEmail, "登録完了のお知らせ");
    }
}

class Program
{
    static void Main()
    {
        // 本番環境
        var container = new ServiceContainer();
        container.AddSingleton<IEmailService, SmtpEmailService>();

        var emailService = container.GetService<IEmailService>();
        var userService = new UserRegistrationService(emailService);
        userService.Register("alice@example.com");

        // テスト環境（モック差し替え）
        var testService = new UserRegistrationService(new MockEmailService());
        testService.Register("bob@example.com");
    }
}`}
          expectedOutput={`ユーザー alice@example.com を登録
[SMTP] alice@example.com へ送信: 登録完了のお知らせ
ユーザー bob@example.com を登録
[Mock] bob@example.com へ送信（テスト）: 登録完了のお知らせ`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ライフタイムの違い</h2>
        <p className="text-gray-400 mb-4">
          各ライフタイムの動作の違いをシミュレートします。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class Counter
{
    private static int _globalId = 0;
    public int Id { get; } = ++_globalId;
    public int CallCount { get; private set; }

    public string GetInfo()
    {
        CallCount++;
        return $"ID={Id}, 呼び出し回数={CallCount}";
    }
}

class Program
{
    static void Main()
    {
        // Singleton: 同じインスタンス
        var singleton = new Counter();
        Console.WriteLine("Singleton:");
        Console.WriteLine("  " + singleton.GetInfo());
        Console.WriteLine("  " + singleton.GetInfo());

        // Transient: 毎回新しいインスタンス
        Console.WriteLine("Transient:");
        Console.WriteLine("  " + new Counter().GetInfo());
        Console.WriteLine("  " + new Counter().GetInfo());

        // Scoped: リクエスト内で同じ（ここでは手動でシミュレーション）
        var scoped = new Counter();
        Console.WriteLine("Scoped (同一リクエスト):");
        Console.WriteLine("  " + scoped.GetInfo());
        Console.WriteLine("  " + scoped.GetInfo());
    }
}`}
          expectedOutput={`Singleton:
  ID=1, 呼び出し回数=1
  ID=1, 呼び出し回数=2
Transient:
  ID=2, 呼び出し回数=1
  ID=3, 呼び出し回数=1
Scoped (同一リクエスト):
  ID=4, 呼び出し回数=1
  ID=4, 呼び出し回数=2`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="aspnet" lessonId="dependency-injection" />
      </div>
      <LessonNav lessons={lessons} currentId="dependency-injection" basePath="/learn/aspnet" />
    </div>
  );
}

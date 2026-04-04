import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("blazor");

export default function BlazorRoutingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">Blazor レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ルーティング</h1>
        <p className="text-gray-400">@pageディレクティブ・NavigationManager・ルートパラメーターを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">@page ディレクティブ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">@page &quot;/path&quot;</code> を.razorファイルの先頭に書くことでルートを定義します。
          複数のルートを定義することもできます。
        </p>
        <pre className="text-gray-300 text-sm font-mono bg-gray-800 p-4 rounded-lg">{`@page "/"
@page "/home"

<h1>ホームページ</h1>
<p>このコンポーネントは "/" と "/home" でアクセスできます</p>`}</pre>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ルートパラメーター</h2>
        <p className="text-gray-400 mb-4">
          URLの一部をコンポーネントのパラメーターとして受け取ります。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;

// @page "/products/{Id:int}" のシミュレーション
class ProductDetailPage
{
    // ルートパラメーター
    public int Id { get; set; }

    private static Dictionary<int, string> _db = new()
    {
        [1] = "C#入門書",
        [2] = "ASP.NET Coreガイド",
        [3] = "Blazor実践",
    };

    public void Render()
    {
        Console.WriteLine($"URL: /products/{Id}");

        if (_db.TryGetValue(Id, out var name))
        {
            Console.WriteLine($"<h1>{name}</h1>");
            Console.WriteLine($"<p>商品ID: {Id}</p>");
        }
        else
        {
            Console.WriteLine("<p>商品が見つかりません</p>");
        }
    }
}

// @page "/users/{UserId}/orders" のシミュレーション
class UserOrdersPage
{
    public string UserId { get; set; } = "";

    // オプショナルルートパラメーター
    public int? Page { get; set; }

    public void Render()
    {
        int page = Page ?? 1;
        Console.WriteLine($"URL: /users/{UserId}/orders?page={page}");
        Console.WriteLine($"ユーザー{UserId}の注文リスト（{page}ページ目）");
    }
}

class Program
{
    static void Main()
    {
        // /products/1
        new ProductDetailPage { Id = 1 }.Render();
        Console.WriteLine();

        // /products/99
        new ProductDetailPage { Id = 99 }.Render();
        Console.WriteLine();

        // /users/alice/orders
        new UserOrdersPage { UserId = "alice" }.Render();
    }
}`}
          expectedOutput={`URL: /products/1
<h1>C#入門書</h1>
<p>商品ID: 1</p>

URL: /products/99
<p>商品が見つかりません</p>

URL: /users/alice/orders?page=1
ユーザーaliceの注文リスト（1ページ目）`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">NavigationManager でナビゲーション</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">NavigationManager</code> でプログラム的にページ遷移を行います。
        </p>
        <CSharpEditor
          defaultCode={`using System;

// NavigationManager のシミュレーション
class NavigationManager
{
    public string Uri { get; private set; } = "http://localhost/";
    public string BaseUri => "http://localhost/";

    public void NavigateTo(string uri, bool forceLoad = false)
    {
        string prev = Uri;
        Uri = uri.StartsWith("http") ? uri : BaseUri.TrimEnd('/') + "/" + uri.TrimStart('/');
        Console.WriteLine($"ナビゲーション: {prev} → {Uri}{(forceLoad ? " (強制リロード)" : "")}");
    }

    public string ToAbsoluteUri(string relativeUri)
        => BaseUri.TrimEnd('/') + "/" + relativeUri.TrimStart('/');
}

class LoginPage
{
    private readonly NavigationManager _nav;
    public LoginPage(NavigationManager nav) => _nav = nav;

    public void OnLoginSuccess(string role)
    {
        Console.WriteLine($"ログイン成功: ロール={role}");

        // ロールに応じてリダイレクト
        if (role == "Admin")
            _nav.NavigateTo("/admin/dashboard");
        else
            _nav.NavigateTo("/dashboard");
    }

    public void OnGoToRegister()
        => _nav.NavigateTo("/register");
}

class Program
{
    static void Main()
    {
        var nav = new NavigationManager();
        var loginPage = new LoginPage(nav);

        Console.WriteLine($"現在のURL: {nav.Uri}");
        loginPage.OnGoToRegister();
        loginPage.OnLoginSuccess("User");
        loginPage.OnLoginSuccess("Admin");
    }
}`}
          expectedOutput={`現在のURL: http://localhost/
ナビゲーション: http://localhost/ → http://localhost/register
ログイン成功: ロール=User
ナビゲーション: http://localhost/register → http://localhost/dashboard
ログイン成功: ロール=Admin
ナビゲーション: http://localhost/dashboard → http://localhost/admin/dashboard`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="blazor" lessonId="routing" />
      </div>
      <LessonNav lessons={lessons} currentId="routing" basePath="/learn/blazor" />
    </div>
  );
}

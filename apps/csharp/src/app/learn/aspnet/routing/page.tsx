import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("aspnet");

export default function AspnetRoutingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">ASP.NET Core基礎 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ルーティング</h1>
        <p className="text-gray-400">属性ルーティング・規約ルーティング・MapGet/PostによるURLルーティングの設定を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ルーティングとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ルーティングはHTTPリクエストのURLを適切なハンドラー（コントローラーアクションや最小APIエンドポイント）にマッピングする仕組みです。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><strong className="text-white">属性ルーティング</strong>: <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">[Route]</code> 属性で直接指定</li>
          <li><strong className="text-white">規約ルーティング</strong>: パターン（controller/action/id）で一括設定</li>
          <li><strong className="text-white">最小API</strong>: <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">MapGet/Post/Put/Delete</code> で直接定義</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ルートパターンとパラメータ</h2>
        <p className="text-gray-400 mb-4">
          ルートテンプレートの書き方とパラメータ・制約の使い方です。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;

// ルートマッチャーのシミュレーション
class Router
{
    private readonly Dictionary<string, Func<Dictionary<string, string>, string>> _routes = new();

    public void MapGet(string pattern, Func<Dictionary<string, string>, string> handler)
    {
        _routes[pattern] = handler;
        Console.WriteLine($"登録: GET {pattern}");
    }

    public void Match(string path)
    {
        Console.Write($"  {path} → ");
        // 簡易マッチング（デモ用）
        foreach (var route in _routes)
        {
            if (TryMatch(route.Key, path, out var p))
            {
                Console.WriteLine(route.Value(p!));
                return;
            }
        }
        Console.WriteLine("404 Not Found");
    }

    private bool TryMatch(string pattern, string path, out Dictionary<string, string>? p)
    {
        p = new Dictionary<string, string>();
        var parts = pattern.Split('/');
        var pathParts = path.Split('/');
        if (parts.Length != pathParts.Length) return false;
        for (int i = 0; i < parts.Length; i++)
        {
            if (parts[i].StartsWith("{") && parts[i].EndsWith("}"))
                p[parts[i][1..^1]] = pathParts[i];
            else if (parts[i] != pathParts[i]) return false;
        }
        return true;
    }
}

class Program
{
    static void Main()
    {
        var router = new Router();

        // 最小APIスタイル
        router.MapGet("api/products", _ => "全商品リスト");
        router.MapGet("api/products/{id}", p => $"商品ID:{p["id"]}の詳細");
        router.MapGet("api/users/{userId}/orders/{orderId}", p =>
            $"ユーザー{p["userId"]}の注文{p["orderId"]}");

        Console.WriteLine("\nルートマッチング:");
        router.Match("api/products");
        router.Match("api/products/42");
        router.Match("api/users/10/orders/99");
        router.Match("api/unknown");
    }
}`}
          expectedOutput={`登録: GET api/products
登録: GET api/products/{id}
登録: GET api/users/{userId}/orders/{orderId}

ルートマッチング:
  api/products → 全商品リスト
  api/products/42 → 商品ID:42の詳細
  api/users/10/orders/99 → ユーザー10の注文99
  api/unknown → 404 Not Found`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">属性ルーティングの例</h2>
        <p className="text-gray-400 mb-4">
          実際のASP.NET Coreコントローラーでの属性ルーティングの書き方です。
        </p>
        <CSharpEditor
          defaultCode={`// 実際のASP.NET Core コード例（参考用）
// [ApiController]
// [Route("api/[controller]")]  // → api/products
// public class ProductsController : ControllerBase
// {
//     [HttpGet]                       // GET api/products
//     public IActionResult GetAll() => Ok(new[] { "A", "B" });
//
//     [HttpGet("{id:int}")]           // GET api/products/42
//     public IActionResult GetById(int id) => Ok($"Product {id}");
//
//     [HttpGet("search")]             // GET api/products/search?name=foo
//     public IActionResult Search([FromQuery] string name) => Ok(name);
//
//     [HttpPost]                      // POST api/products
//     public IActionResult Create([FromBody] Product p) => Created(...);
// }

using System;
Console.WriteLine("属性ルーティングのルール:");
Console.WriteLine("[controller] → コントローラー名（Controllerを除く）");
Console.WriteLine("[action]    → アクションメソッド名");
Console.WriteLine("{id:int}    → int型のルートパラメータ制約");
Console.WriteLine("{name?}     → オプショナルパラメータ");`}
          expectedOutput={`属性ルーティングのルール:
[controller] → コントローラー名（Controllerを除く）
[action]    → アクションメソッド名
{id:int}    → int型のルートパラメータ制約
{name?}     → オプショナルパラメータ`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="aspnet" lessonId="routing" />
      </div>
      <LessonNav lessons={lessons} currentId="routing" basePath="/learn/aspnet" />
    </div>
  );
}

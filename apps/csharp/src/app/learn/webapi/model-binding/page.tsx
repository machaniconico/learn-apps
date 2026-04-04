import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("webapi");

export default function ModelBindingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">Web API レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">モデルバインディング</h1>
        <p className="text-gray-400">[FromBody]・[FromRoute]・[FromQuery]によるリクエストデータのバインディングを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">バインディングソース</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          ASP.NET CoreはHTTPリクエストの様々な場所からデータを取得してモデルにバインドします:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">[FromRoute]</code>: URLのルートパラメータ <code className="text-gray-400">/api/items/42</code></li>
          <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">[FromQuery]</code>: クエリ文字列 <code className="text-gray-400">?name=abc&page=1</code></li>
          <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">[FromBody]</code>: リクエストボディ（JSON）</li>
          <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">[FromHeader]</code>: HTTPヘッダー</li>
          <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">[FromForm]</code>: フォームデータ</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">バインディングのシミュレーション</h2>
        <p className="text-gray-400 mb-4">
          各バインディングソースからどのようにデータが取得されるかを示します。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;

// リクエストのシミュレーション
class HttpRequest
{
    public Dictionary<string, string> RouteValues { get; } = new();
    public Dictionary<string, string> QueryString { get; } = new();
    public Dictionary<string, string> Headers { get; } = new();
    public string? Body { get; set; }
}

// バインディングのデモ
class SearchRequest
{
    public string? Name { get; set; }
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 20;
    public string? Category { get; set; }
}

class ApiHandler
{
    // GET /api/products/{id}?includeDetails=true
    public static void GetProduct(HttpRequest req)
    {
        // [FromRoute] id
        string id = req.RouteValues["id"];
        // [FromQuery] includeDetails
        bool details = req.QueryString.TryGetValue("includeDetails", out var v) && v == "true";

        Console.WriteLine($"[FromRoute] id = {id}");
        Console.WriteLine($"[FromQuery] includeDetails = {details}");
        Console.WriteLine($"→ 商品ID:{id}の詳細情報 {(details ? "（詳細あり）" : "")}");
    }

    // GET /api/products/search?name=C#&page=2&pageSize=10
    public static void Search(HttpRequest req)
    {
        var param = new SearchRequest
        {
            Name = req.QueryString.GetValueOrDefault("name"),
            Page = int.TryParse(req.QueryString.GetValueOrDefault("page"), out var p) ? p : 1,
            PageSize = int.TryParse(req.QueryString.GetValueOrDefault("pageSize"), out var ps) ? ps : 20,
        };

        Console.WriteLine($"[FromQuery] name={param.Name}, page={param.Page}, pageSize={param.PageSize}");
        Console.WriteLine($"→ '{param.Name}'で検索: ページ{param.Page}");
    }
}

class Program
{
    static void Main()
    {
        Console.WriteLine("=== GetProduct ===");
        var req1 = new HttpRequest();
        req1.RouteValues["id"] = "42";
        req1.QueryString["includeDetails"] = "true";
        ApiHandler.GetProduct(req1);

        Console.WriteLine("\n=== Search ===");
        var req2 = new HttpRequest();
        req2.QueryString["name"] = "C#";
        req2.QueryString["page"] = "2";
        req2.QueryString["pageSize"] = "10";
        ApiHandler.Search(req2);
    }
}`}
          expectedOutput={`=== GetProduct ===
[FromRoute] id = 42
[FromQuery] includeDetails = True
→ 商品ID:42の詳細情報 （詳細あり）

=== Search ===
[FromQuery] name=C#, page=2, pageSize=10
→ 'C#'で検索: ページ2`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">[FromBody] でJSONを受け取る</h2>
        <p className="text-gray-400 mb-4">
          POSTリクエストのJSONボディをモデルにデシリアライズします。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Text.Json;

record CreateProductDto(string Name, decimal Price, string Category);

class Program
{
    static void Main()
    {
        // クライアントが送るJSON
        string json = """{"Name":"C#実践入門","Price":3800,"Category":"書籍"}""";
        Console.WriteLine($"リクエストボディ: {json}");

        // [FromBody] によるデシリアライズ（シミュレーション）
        var dto = JsonSerializer.Deserialize<CreateProductDto>(json);
        if (dto != null)
        {
            Console.WriteLine("\nバインディング結果:");
            Console.WriteLine($"  Name = {dto.Name}");
            Console.WriteLine($"  Price = {dto.Price}");
            Console.WriteLine($"  Category = {dto.Category}");
            Console.WriteLine("\n→ 201 Created");
        }
    }
}`}
          expectedOutput={`リクエストボディ: {"Name":"C#実践入門","Price":3800,"Category":"書籍"}

バインディング結果:
  Name = C#実践入門
  Price = 3800
  Category = 書籍

→ 201 Created`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="webapi" lessonId="model-binding" />
      </div>
      <LessonNav lessons={lessons} currentId="model-binding" basePath="/learn/webapi" />
    </div>
  );
}

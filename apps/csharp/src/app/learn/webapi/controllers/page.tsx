import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("webapi");

export default function ControllersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">Web API レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コントローラー</h1>
        <p className="text-gray-400">[ApiController]・[Route]属性・アクションメソッド・IActionResultの使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ApiController の特徴</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">[ApiController]</code> 属性を付けると以下が自動化されます:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li>モデルバリデーションエラー時の自動 400 Bad Request 返却</li>
          <li>バインディングソースの自動推論（[FromBody]等が不要な場合）</li>
          <li>問題詳細（ProblemDetails）形式のエラーレスポンス</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コントローラーとアクションの基本</h2>
        <p className="text-gray-400 mb-4">
          IActionResult を使った様々なレスポンス返却パターンです。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;

// IActionResult のシミュレーション
abstract class ActionResult
{
    public abstract void Execute();
}

class OkResult : ActionResult
{
    private readonly object? _value;
    public OkResult(object? value = null) => _value = value;
    public override void Execute() =>
        Console.WriteLine($"200 OK: {(_value != null ? System.Text.Json.JsonSerializer.Serialize(_value) : "")}");
}

class CreatedResult : ActionResult
{
    private readonly string _location;
    private readonly object _value;
    public CreatedResult(string location, object value) { _location = location; _value = value; }
    public override void Execute() =>
        Console.WriteLine($"201 Created: Location={_location}, Body={System.Text.Json.JsonSerializer.Serialize(_value)}");
}

class NotFoundResult : ActionResult
{
    public override void Execute() => Console.WriteLine("404 Not Found");
}

class BadRequestResult : ActionResult
{
    private readonly string _message;
    public BadRequestResult(string msg) => _message = msg;
    public override void Execute() => Console.WriteLine($"400 Bad Request: {_message}");
}

// コントローラーのシミュレーション
class ProductsController
{
    private static List<(int Id, string Name)> _db = new()
    {
        (1, "C#入門書"), (2, "Blazor実践")
    };

    // GET /api/products
    public ActionResult GetAll() => new OkResult(_db);

    // GET /api/products/{id}
    public ActionResult GetById(int id)
    {
        var item = _db.Find(p => p.Id == id);
        return item.Id != 0 ? new OkResult(item) : new NotFoundResult();
    }

    // POST /api/products
    public ActionResult Create(string name)
    {
        if (string.IsNullOrEmpty(name)) return new BadRequestResult("名前は必須です");
        var id = _db.Count + 1;
        _db.Add((id, name));
        return new CreatedResult($"/api/products/{id}", (id, name));
    }
}

class Program
{
    static void Main()
    {
        var ctrl = new ProductsController();
        ctrl.GetAll().Execute();
        ctrl.GetById(1).Execute();
        ctrl.GetById(99).Execute();
        ctrl.Create("Entity Framework入門").Execute();
        ctrl.Create("").Execute();
    }
}`}
          expectedOutput={`200 OK: [{"Item1":1,"Item2":"C#入門書"},{"Item1":2,"Item2":"Blazor実践"}]
200 OK: {"Item1":1,"Item2":"C#入門書"}
404 Not Found
201 Created: Location=/api/products/3, Body={"Item1":3,"Item2":"Entity Framework入門"}
400 Bad Request: 名前は必須です`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実際のコントローラーコード</h2>
        <p className="text-gray-400 mb-4">
          ASP.NET Coreでの実際のコントローラー実装パターンです。
        </p>
        <CSharpEditor
          defaultCode={`// 実際のASP.NET Core コントローラー例（参考）
using System;

Console.WriteLine("コントローラーの典型的なパターン:");
Console.WriteLine();
Console.WriteLine(@"[ApiController]
[Route(""api/[controller]"")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _service;

    public ProductsController(IProductService service)
        => _service = service;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var products = await _service.GetAllAsync();
        return Ok(products);
    }

    [HttpGet(""{id:int}"")]
    public async Task<IActionResult> GetById(int id)
    {
        var product = await _service.GetByIdAsync(id);
        return product == null ? NotFound() : Ok(product);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateProductDto dto)
    {
        var created = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpDelete(""{id:int}"")]
    public async Task<IActionResult> Delete(int id)
    {
        var success = await _service.DeleteAsync(id);
        return success ? NoContent() : NotFound();
    }
}");`}
          expectedOutput={`コントローラーの典型的なパターン:

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _service;

    public ProductsController(IProductService service)
        => _service = service;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var products = await _service.GetAllAsync();
        return Ok(products);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var product = await _service.GetByIdAsync(id);
        return product == null ? NotFound() : Ok(product);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateProductDto dto)
    {
        var created = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var success = await _service.DeleteAsync(id);
        return success ? NoContent() : NotFound();
    }
}`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="webapi" lessonId="controllers" />
      </div>
      <LessonNav lessons={lessons} currentId="controllers" basePath="/learn/webapi" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("webapi");

export default function WebapiBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">Web API レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Web APIの基本</h1>
        <p className="text-gray-400">REST概念・HTTPメソッド・ステータスコードの基礎知識を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">REST API とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          REST（Representational State Transfer）はHTTPを使ったAPI設計の原則です。
          リソースをURLで表し、HTTPメソッドで操作を表現します。
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-white font-semibold mb-2">HTTPメソッド:</p>
            <ul className="text-gray-300 space-y-1">
              <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">GET</code> → 取得</li>
              <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">POST</code> → 作成</li>
              <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">PUT</code> → 全更新</li>
              <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">PATCH</code> → 部分更新</li>
              <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">DELETE</code> → 削除</li>
            </ul>
          </div>
          <div>
            <p className="text-white font-semibold mb-2">主なステータスコード:</p>
            <ul className="text-gray-300 space-y-1">
              <li><span className="text-green-400">200 OK</span></li>
              <li><span className="text-green-400">201 Created</span></li>
              <li><span className="text-yellow-400">400 Bad Request</span></li>
              <li><span className="text-yellow-400">401 Unauthorized</span></li>
              <li><span className="text-yellow-400">404 Not Found</span></li>
              <li><span className="text-red-400">500 Internal Server Error</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">REST API の設計原則</h2>
        <p className="text-gray-400 mb-4">
          良いREST APIのURL設計例です。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;

// REST APIエンドポイントのシミュレーション
class RestApiDemo
{
    record Product(int Id, string Name, decimal Price);

    private static readonly List<Product> _products = new()
    {
        new(1, "C#入門書", 3500m),
        new(2, "ASP.NET Coreガイド", 4200m),
        new(3, "Blazor実践", 3800m),
    };

    // GET /api/products → 全件取得
    public static void GetAll()
    {
        Console.WriteLine("GET /api/products → 200 OK");
        foreach (var p in _products)
            Console.WriteLine($"  {{ id: {p.Id}, name: \"{p.Name}\", price: {p.Price} }}");
    }

    // GET /api/products/{id} → 1件取得
    public static void GetById(int id)
    {
        var product = _products.Find(p => p.Id == id);
        if (product == null)
        {
            Console.WriteLine($"GET /api/products/{id} → 404 Not Found");
            return;
        }
        Console.WriteLine($"GET /api/products/{id} → 200 OK");
        Console.WriteLine($"  {{ id: {product.Id}, name: \"{product.Name}\" }}");
    }

    // POST /api/products → 作成
    public static void Create(string name, decimal price)
    {
        var newId = _products.Count + 1;
        _products.Add(new(newId, name, price));
        Console.WriteLine($"POST /api/products → 201 Created");
        Console.WriteLine($"  Location: /api/products/{newId}");
    }
}

class Program
{
    static void Main()
    {
        RestApiDemo.GetAll();
        Console.WriteLine();
        RestApiDemo.GetById(2);
        RestApiDemo.GetById(99);
        Console.WriteLine();
        RestApiDemo.Create("Entity Framework Core入門", 4000m);
    }
}`}
          expectedOutput={`GET /api/products → 200 OK
  { id: 1, name: "C#入門書", price: 3500 }
  { id: 2, name: "ASP.NET Coreガイド", price: 4200 }
  { id: 3, name: "Blazor実践", price: 3800 }

GET /api/products/2 → 200 OK
  { id: 2, name: "ASP.NET Coreガイド" }
GET /api/products/99 → 404 Not Found

POST /api/products → 201 Created
  Location: /api/products/4`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="webapi" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/webapi" />
    </div>
  );
}

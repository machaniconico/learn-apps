import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("database");

export default function DatabaseDapperPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">データベース レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Dapper</h1>
        <p className="text-gray-400">マイクロORM Dapperを使ったQuery&lt;T&gt;、Execute、動的パラメータを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Dapperとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          DapperはADO.NETのIDbConnectionに拡張メソッドを追加するマイクロORMです。SQLを直接書きながら、結果を自動的にC#オブジェクトにマッピングしてくれます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          EF Coreより軽量で高速ですが、マイグレーションやChange Trackingなどの高度な機能はありません。SQLを書く力が必要ですが、パフォーマンス重視の場面で活躍します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Query&lt;T&gt; でSELECT</h2>
        <p className="text-gray-400 mb-4">クエリ結果を自動的に型付きオブジェクトにマッピングします。</p>
        <CSharpEditor
          defaultCode={`using Dapper;
using System.Data.SqlClient;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public decimal Price { get; set; }
}

// Dapper の Query<T> - SELECT結果をオブジェクトにマッピング
string connStr = "Server=.;Database=MyDb;Integrated Security=true;";
using var conn = new SqlConnection(connStr);

// 全件取得
// var products = conn.Query<Product>("SELECT * FROM Products").ToList();

// パラメータ付きクエリ（匿名型でパラメータを渡す）
// var products = conn.Query<Product>(
//     "SELECT * FROM Products WHERE Price > @MinPrice AND CategoryId = @CategoryId",
//     new { MinPrice = 500, CategoryId = 1 }
// ).ToList();

// 単一件取得
// var product = conn.QueryFirstOrDefault<Product>(
//     "SELECT * FROM Products WHERE Id = @Id",
//     new { Id = 1 }
// );

Console.WriteLine("Dapper Query<T> のポイント:");
Console.WriteLine("- 匿名型でパラメータを渡す");
Console.WriteLine("- 列名とプロパティ名が一致すれば自動マッピング");
Console.WriteLine("- QueryFirstOrDefault で単一件取得（null安全）");
Console.WriteLine("- QuerySingle は1件必須、なければ例外");`}
          expectedOutput={`Dapper Query<T> のポイント:
- 匿名型でパラメータを渡す
- 列名とプロパティ名が一致すれば自動マッピング
- QueryFirstOrDefault で単一件取得（null安全）
- QuerySingle は1件必須、なければ例外`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Execute で INSERT/UPDATE/DELETE</h2>
        <p className="text-gray-400 mb-4">データ変更操作と複数行の一括実行を学びます。</p>
        <CSharpEditor
          defaultCode={`// Dapper Execute - INSERT/UPDATE/DELETE
Console.WriteLine("=== Dapper Execute ===");
Console.WriteLine();

// INSERT
Console.WriteLine("// INSERT（単一）");
Console.WriteLine("int rows = conn.Execute(");
Console.WriteLine("    \"INSERT INTO Products (Name, Price) VALUES (@Name, @Price)\",");
Console.WriteLine("    new { Name = \"新商品\", Price = 1500 });");
Console.WriteLine();

// 複数行の一括INSERT
Console.WriteLine("// INSERT（複数行 - コレクションを渡す）");
Console.WriteLine("var newProducts = new[]");
Console.WriteLine("{");
Console.WriteLine("    new { Name = \"商品A\", Price = 1000 },");
Console.WriteLine("    new { Name = \"商品B\", Price = 2000 },");
Console.WriteLine("};");
Console.WriteLine("conn.Execute(\"INSERT INTO Products ...\", newProducts);");
Console.WriteLine();

// UPDATE
Console.WriteLine("// UPDATE");
Console.WriteLine("conn.Execute(");
Console.WriteLine("    \"UPDATE Products SET Price = @Price WHERE Id = @Id\",");
Console.WriteLine("    new { Price = 1800, Id = 3 });");
Console.WriteLine();

// DELETE
Console.WriteLine("// DELETE");
Console.WriteLine("conn.Execute(");
Console.WriteLine("    \"DELETE FROM Products WHERE Id = @Id\",");
Console.WriteLine("    new { Id = 3 });");`}
          expectedOutput={`=== Dapper Execute ===

// INSERT（単一）
int rows = conn.Execute(
    "INSERT INTO Products (Name, Price) VALUES (@Name, @Price)",
    new { Name = "新商品", Price = 1500 });

// INSERT（複数行 - コレクションを渡す）
var newProducts = new[]
{
    new { Name = "商品A", Price = 1000 },
    new { Name = "商品B", Price = 2000 },
};
conn.Execute("INSERT INTO Products ...", newProducts);

// UPDATE
conn.Execute(
    "UPDATE Products SET Price = @Price WHERE Id = @Id",
    new { Price = 1800, Id = 3 });

// DELETE
conn.Execute(
    "DELETE FROM Products WHERE Id = @Id",
    new { Id = 3 });`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="database" lessonId="dapper" />
      </div>
      <LessonNav lessons={lessons} currentId="dapper" basePath="/learn/database" />
    </div>
  );
}

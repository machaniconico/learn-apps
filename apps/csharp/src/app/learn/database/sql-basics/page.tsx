import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("database");

export default function DatabaseSqlBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">データベース レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">SQL基礎</h1>
        <p className="text-gray-400">SELECT、INSERT、UPDATE、DELETEをC#から実行する方法とパラメータ化クエリを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">パラメータ化クエリの重要性</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SQLを文字列連結で組み立てることは絶対に避けてください。SQLインジェクション攻撃の原因になります。
          必ず<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">@パラメータ名</code>を使ったパラメータ化クエリを使用します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">SELECT文の実行</h2>
        <p className="text-gray-400 mb-4">データ取得の基本パターンです。</p>
        <CSharpEditor
          defaultCode={`// SELECT文の実行パターン
Console.WriteLine("=== SELECT クエリパターン ===");
Console.WriteLine();

// 全件取得
Console.WriteLine("// 全件取得");
Console.WriteLine("string sql = \"SELECT * FROM Products\";");
Console.WriteLine();

// 条件付き取得（パラメータ化）
Console.WriteLine("// 条件付き取得（パラメータ化クエリ）");
Console.WriteLine("string sql = \"SELECT Id, Name, Price FROM Products\"");
Console.WriteLine("          + \" WHERE Price BETWEEN @MinPrice AND @MaxPrice\";");
Console.WriteLine("cmd.Parameters.AddWithValue(\"@MinPrice\", 500);");
Console.WriteLine("cmd.Parameters.AddWithValue(\"@MaxPrice\", 2000);");
Console.WriteLine();

// 危険な例
Console.WriteLine("// 絶対NG: SQLインジェクション脆弱性!");
Console.WriteLine("// string userInput = \"'; DROP TABLE Products; --\";");
Console.WriteLine("// string sql = $\"SELECT * FROM Products WHERE Name = '{userInput}'\";");
Console.WriteLine("// -> 攻撃者がテーブルを削除できてしまう");
Console.WriteLine();

// 安全な例
Console.WriteLine("// 正しい方法: パラメータ化クエリ");
Console.WriteLine("string sql = \"SELECT * FROM Products WHERE Name = @Name\";");
Console.WriteLine("cmd.Parameters.AddWithValue(\"@Name\", userInput);");
Console.WriteLine("// -> パラメータはエスケープされるため安全");`}
          expectedOutput={`=== SELECT クエリパターン ===

// 全件取得
string sql = "SELECT * FROM Products";

// 条件付き取得（パラメータ化クエリ）
string sql = "SELECT Id, Name, Price FROM Products"
          + " WHERE Price BETWEEN @MinPrice AND @MaxPrice";
cmd.Parameters.AddWithValue("@MinPrice", 500);
cmd.Parameters.AddWithValue("@MaxPrice", 2000);

// 絶対NG: SQLインジェクション脆弱性!
// string userInput = "'; DROP TABLE Products; --";
// string sql = $"SELECT * FROM Products WHERE Name = '{userInput}'";
// -> 攻撃者がテーブルを削除できてしまう

// 正しい方法: パラメータ化クエリ
string sql = "SELECT * FROM Products WHERE Name = @Name";
cmd.Parameters.AddWithValue("@Name", userInput);
// -> パラメータはエスケープされるため安全`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">INSERT・UPDATE・DELETE</h2>
        <p className="text-gray-400 mb-4">データ変更操作はExecuteNonQueryで実行します。</p>
        <CSharpEditor
          defaultCode={`// INSERT・UPDATE・DELETE のパターン
Console.WriteLine("=== INSERT ===");
Console.WriteLine("string sql = @\"INSERT INTO Products (Name, Price, CategoryId)");
Console.WriteLine("              VALUES (@Name, @Price, @CategoryId)\";");
Console.WriteLine("cmd.Parameters.AddWithValue(\"@Name\", \"新商品\");");
Console.WriteLine("cmd.Parameters.AddWithValue(\"@Price\", 1500);");
Console.WriteLine("cmd.Parameters.AddWithValue(\"@CategoryId\", 3);");
Console.WriteLine("int inserted = cmd.ExecuteNonQuery();");
Console.WriteLine();

Console.WriteLine("=== UPDATE ===");
Console.WriteLine("string sql = \"UPDATE Products SET Price = @Price WHERE Id = @Id\";");
Console.WriteLine("cmd.Parameters.AddWithValue(\"@Price\", 2000);");
Console.WriteLine("cmd.Parameters.AddWithValue(\"@Id\", 5);");
Console.WriteLine("int updated = cmd.ExecuteNonQuery();");
Console.WriteLine();

Console.WriteLine("=== DELETE ===");
Console.WriteLine("string sql = \"DELETE FROM Products WHERE Id = @Id\";");
Console.WriteLine("cmd.Parameters.AddWithValue(\"@Id\", 5);");
Console.WriteLine("int deleted = cmd.ExecuteNonQuery();");`}
          expectedOutput={`=== INSERT ===
string sql = @"INSERT INTO Products (Name, Price, CategoryId)
              VALUES (@Name, @Price, @CategoryId)";
cmd.Parameters.AddWithValue("@Name", "新商品");
cmd.Parameters.AddWithValue("@Price", 1500);
cmd.Parameters.AddWithValue("@CategoryId", 3);
int inserted = cmd.ExecuteNonQuery();

=== UPDATE ===
string sql = "UPDATE Products SET Price = @Price WHERE Id = @Id";
cmd.Parameters.AddWithValue("@Price", 2000);
cmd.Parameters.AddWithValue("@Id", 5);
int updated = cmd.ExecuteNonQuery();

=== DELETE ===
string sql = "DELETE FROM Products WHERE Id = @Id";
cmd.Parameters.AddWithValue("@Id", 5);
int deleted = cmd.ExecuteNonQuery();`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="database" lessonId="sql-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="sql-basics" basePath="/learn/database" />
    </div>
  );
}

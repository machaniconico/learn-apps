import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("database");

export default function DatabaseAdoNetPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">データベース レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ADO.NET</h1>
        <p className="text-gray-400">SqlConnection、SqlCommand、ExecuteReader、using文を使った低レベルデータベースアクセスを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ADO.NETとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ADO.NET（ActiveX Data Objects .NET）は.NETのデータアクセス基盤ライブラリです。SqlConnectionでDB接続を管理し、SqlCommandでSQL実行、SqlDataReaderで結果を読み取ります。
        </p>
        <p className="text-gray-300 leading-relaxed">
          ORMと違いSQLを直接書くため細かい制御が可能ですが、コード量が増えます。DapperやEF Coreは内部でADO.NETを使っています。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な接続とクエリ実行</h2>
        <p className="text-gray-400 mb-4">using文でリソースの確実な解放を保証します。</p>
        <CSharpEditor
          defaultCode={`using System.Data.SqlClient;

// ADO.NET の基本構造
string connectionString = "Server=.;Database=MyDb;Integrated Security=true;";

// using ステートメントで確実にClose/Dispose
using (var connection = new SqlConnection(connectionString))
{
    connection.Open();
    Console.WriteLine($"接続状態: {connection.State}");

    // コマンドの作成と実行
    using (var command = new SqlCommand(
        "SELECT Id, Name, Price FROM Products WHERE Price > @MinPrice",
        connection))
    {
        // パラメータ化クエリ（SQLインジェクション対策）
        command.Parameters.AddWithValue("@MinPrice", 500);

        using (var reader = command.ExecuteReader())
        {
            while (reader.Read())
            {
                int id       = reader.GetInt32(0);
                string name  = reader.GetString(1);
                decimal price = reader.GetDecimal(2);
                Console.WriteLine($"ID:{id} {name} ¥{price}");
            }
        }
    }
}
Console.WriteLine("接続を閉じました");`}
          expectedOutput={`接続状態: Open
ID:1 商品A ¥1000
ID:2 商品B ¥800
接続を閉じました`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ExecuteNonQuery と ExecuteScalar</h2>
        <p className="text-gray-400 mb-4">INSERT/UPDATE/DELETEにはExecuteNonQuery、単一値の取得にはExecuteScalarを使います。</p>
        <CSharpEditor
          defaultCode={`// ExecuteNonQuery: 結果セットを返さないSQL
string insertSql = "INSERT INTO Products (Name, Price) VALUES (@Name, @Price)";
// command.Parameters.AddWithValue("@Name", "新商品");
// command.Parameters.AddWithValue("@Price", 1500);
// int rowsAffected = command.ExecuteNonQuery();
// Console.WriteLine($"挿入行数: {rowsAffected}");

// ExecuteScalar: 単一の値を返すSQL
string countSql = "SELECT COUNT(*) FROM Products";
// int count = (int)command.ExecuteScalar();
// Console.WriteLine($"商品数: {count}");

// 概念的な使い分けを説明
Console.WriteLine("ADO.NET コマンドメソッドの使い分け:");
Console.WriteLine();
Console.WriteLine("ExecuteReader()");
Console.WriteLine("  -> 複数行・複数列を返すSELECT文");
Console.WriteLine("  -> SqlDataReaderで行ごとに読み取る");
Console.WriteLine();
Console.WriteLine("ExecuteNonQuery()");
Console.WriteLine("  -> INSERT / UPDATE / DELETE");
Console.WriteLine("  -> 戻り値は影響を受けた行数");
Console.WriteLine();
Console.WriteLine("ExecuteScalar()");
Console.WriteLine("  -> COUNT(*) / MAX() など単一値を返すSQL");
Console.WriteLine("  -> 戻り値は object（キャストが必要）");`}
          expectedOutput={`ADO.NET コマンドメソッドの使い分け:

ExecuteReader()
  -> 複数行・複数列を返すSELECT文
  -> SqlDataReaderで行ごとに読み取る

ExecuteNonQuery()
  -> INSERT / UPDATE / DELETE
  -> 戻り値は影響を受けた行数

ExecuteScalar()
  -> COUNT(*) / MAX() など単一値を返すSQL
  -> 戻り値は object（キャストが必要）`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="database" lessonId="ado-net" />
      </div>
      <LessonNav lessons={lessons} currentId="ado-net" basePath="/learn/database" />
    </div>
  );
}

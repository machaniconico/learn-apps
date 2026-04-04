import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function FileioCsvProcessingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">ファイルI/O レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">CSV処理</h1>
        <p className="text-gray-400">手動パース、StreamReaderによる行処理、CSVヘルパーを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">CSV処理の注意点</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          CSVは単純に見えますが、フィールドにカンマや改行が含まれる場合はダブルクォートで囲むルール（RFC 4180）があります。簡単なケースは手動パースで対応できますが、複雑なケースはCsvHelperなどのライブラリを使います。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">CSVの手動パース</h2>
        <p className="text-gray-400 mb-4">シンプルなCSVを解析する方法です。</p>
        <CSharpEditor
          defaultCode={`using System.IO;

// CSVデータ（ヘッダー付き）
string csvContent = @"Id,Name,Price,Category
1,商品A,1000,電子機器
2,商品B,2500,家具
3,商品C,500,食品
4,商品D,1800,衣類";

// 行ごとにパース
using var reader = new StringReader(csvContent);
string? headerLine = reader.ReadLine();
string[] headers = headerLine?.Split(',') ?? [];
Console.WriteLine($"ヘッダー: {string.Join(" | ", headers)}");
Console.WriteLine(new string('-', 40));

string? line;
var products = new List<Dictionary<string, string>>();
while ((line = reader.ReadLine()) != null)
{
    string[] fields = line.Split(',');
    var product = new Dictionary<string, string>();
    for (int i = 0; i < headers.Length && i < fields.Length; i++)
    {
        product[headers[i]] = fields[i];
    }
    products.Add(product);
    Console.WriteLine($"{product["Id"],3} | {product["Name"],-6} | ¥{product["Price"],5} | {product["Category"]}");
}

Console.WriteLine($"\n合計 {products.Count} 件");
decimal total = products.Sum(p => decimal.Parse(p["Price"]));
Console.WriteLine($"価格合計: ¥{total}");`}
          expectedOutput={`ヘッダー: Id | Name | Price | Category
----------------------------------------
  1 | 商品A   |  ¥1000 | 電子機器
  2 | 商品B   |  ¥2500 | 家具
  3 | 商品C   |   ¥500 | 食品
  4 | 商品D   |  ¥1800 | 衣類

合計 4 件
価格合計: ¥5800`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">CSVファイルの書き込み</h2>
        <p className="text-gray-400 mb-4">オブジェクトのリストをCSVに変換して保存します。</p>
        <CSharpEditor
          defaultCode={`using System.IO;
using System.Text;

public record Employee(int Id, string Name, string Department, decimal Salary);

var employees = new[]
{
    new Employee(1, "田中太郎", "開発部", 500000),
    new Employee(2, "鈴木花子", "営業部", 450000),
    new Employee(3, "佐藤次郎", "人事部", 420000),
};

// CSVに書き込み
string path = "employees.csv";
using (var writer = new StreamWriter(path, false, Encoding.UTF8))
{
    // ヘッダー
    writer.WriteLine("Id,Name,Department,Salary");

    // データ行
    foreach (var emp in employees)
    {
        // カンマや改行を含む可能性のあるフィールドはクォート
        string name = emp.Name.Contains(',') ? $"\"{emp.Name}\"" : emp.Name;
        writer.WriteLine($"{emp.Id},{name},{emp.Department},{emp.Salary}");
    }
}
Console.WriteLine($"CSVを書き込みました: {path}");

// 確認のために読み直す
string csv = File.ReadAllText(path, Encoding.UTF8);
Console.WriteLine(csv);

File.Delete(path);`}
          expectedOutput={`CSVを書き込みました: employees.csv
Id,Name,Department,Salary
1,田中太郎,開発部,500000
2,鈴木花子,営業部,450000
3,佐藤次郎,人事部,420000`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="fileio" lessonId="csv-processing" />
      </div>
      <LessonNav lessons={lessons} currentId="csv-processing" basePath="/learn/fileio" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function FileioJsonProcessingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">ファイルI/O レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">JSON処理</h1>
        <p className="text-gray-400">System.Text.JsonのJsonSerializer.Serialize/Deserializeとオプション設定を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">System.Text.Jsonとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">System.Text.Json</code>は.NET Core 3.0以降に組み込まれたJSON処理ライブラリです。高パフォーマンスでメモリ効率も良く、外部パッケージ不要で使えます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          Newtonsoft.Json（Json.NET）も広く使われていますが、新規プロジェクトではSystem.Text.Jsonが推奨されます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">シリアライズとデシリアライズ</h2>
        <p className="text-gray-400 mb-4">C#オブジェクトをJSONに変換し、JSON文字列からオブジェクトを復元します。</p>
        <CSharpEditor
          defaultCode={`using System.Text.Json;
using System.Text.Json.Serialization;

public class Person
{
    public string Name { get; set; } = "";
    public int Age { get; set; }
    public string[] Hobbies { get; set; } = [];

    // プロパティ名の変換（JSONではスネークケース）
    [JsonPropertyName("birth_year")]
    public int BirthYear { get; set; }
}

// シリアライズ（C# -> JSON）
var person = new Person
{
    Name = "田中太郎",
    Age = 30,
    Hobbies = ["C#", "読書", "旅行"],
    BirthYear = 1994,
};

// デフォルト設定
string json = JsonSerializer.Serialize(person);
Console.WriteLine("デフォルト:");
Console.WriteLine(json);
Console.WriteLine();

// インデント付き（見やすい形式）
var options = new JsonSerializerOptions { WriteIndented = true };
string prettyJson = JsonSerializer.Serialize(person, options);
Console.WriteLine("インデント付き:");
Console.WriteLine(prettyJson);`}
          expectedOutput={`デフォルト:
{"Name":"\u7530\u4e2d\u592a\u90ce","Age":30,"Hobbies":["C#","\u8aad\u66f8","\u65c5\u884c"],"birth_year":1994}

インデント付き:
{
  "Name": "田中太郎",
  "Age": 30,
  "Hobbies": [
    "C#",
    "読書",
    "旅行"
  ],
  "birth_year": 1994
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ファイルへの保存と読み込み</h2>
        <p className="text-gray-400 mb-4">JSONをファイルに保存し読み込む実践的なパターンです。</p>
        <CSharpEditor
          defaultCode={`using System.Text.Json;
using System.IO;

public class Config
{
    public string AppName { get; set; } = "MyApp";
    public string Version { get; set; } = "1.0.0";
    public bool EnableLogging { get; set; } = true;
    public int MaxRetries { get; set; } = 3;
}

// 設定ファイルの保存
var config = new Config
{
    AppName = "学習アプリ",
    Version = "2.0.0",
    EnableLogging = true,
    MaxRetries = 5,
};

var opts = new JsonSerializerOptions
{
    WriteIndented = true,
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
};

string jsonStr = JsonSerializer.Serialize(config, opts);
File.WriteAllText("config.json", jsonStr);
Console.WriteLine("設定ファイル保存完了");
Console.WriteLine(jsonStr);

// デシリアライズ（JSON -> C#）
string loaded = File.ReadAllText("config.json");
Config? restored = JsonSerializer.Deserialize<Config>(loaded, opts);
Console.WriteLine($"復元: {restored?.AppName} v{restored?.Version}");

File.Delete("config.json");`}
          expectedOutput={`設定ファイル保存完了
{
  "appName": "学習アプリ",
  "version": "2.0.0",
  "enableLogging": true,
  "maxRetries": 5
}
復元: 学習アプリ v2.0.0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="fileio" lessonId="json-processing" />
      </div>
      <LessonNav lessons={lessons} currentId="json-processing" basePath="/learn/fileio" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("database");

export default function DatabaseConnectionManagementPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">データベース レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">接続管理</h1>
        <p className="text-gray-400">コネクションプーリング、接続文字列、設定ファイルからの読み込みを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コネクションプーリング</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          データベース接続の確立はコストがかかります。コネクションプーリングは接続を再利用することでパフォーマンスを向上させます。ADO.NETはデフォルトでコネクションプーリングが有効です。
        </p>
        <p className="text-gray-300 leading-relaxed">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">using</code>文でSqlConnectionをDispose（=プールに返却）することが重要です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">接続文字列の設定</h2>
        <p className="text-gray-400 mb-4">接続文字列の各要素と設定方法を確認します。</p>
        <CSharpEditor
          defaultCode={`// 接続文字列の構成要素
Console.WriteLine("=== SQL Server 接続文字列 ===");
Console.WriteLine();

string sqlServerConn =
    "Server=myserver.database.windows.net;" +
    "Database=MyDatabase;" +
    "User Id=myuser;" +
    "Password=mypassword;" +
    "Encrypt=true;" +
    "TrustServerCertificate=false;" +
    "Connection Timeout=30;" +
    "Max Pool Size=100;" +   // プール最大接続数
    "Min Pool Size=5;";      // プール最小接続数

Console.WriteLine("Server          : サーバー名/IPアドレス");
Console.WriteLine("Database        : データベース名");
Console.WriteLine("User Id/Password: 認証情報");
Console.WriteLine("Encrypt         : 暗号化");
Console.WriteLine("Max Pool Size   : 最大プールサイズ（デフォルト100）");
Console.WriteLine("Min Pool Size   : 最小プールサイズ（デフォルト0）");
Console.WriteLine();
Console.WriteLine("=== SQLite 接続文字列 ===");
Console.WriteLine("Data Source=./myapp.db;");
Console.WriteLine();
Console.WriteLine("=== Pooling=false（プール無効化）===");
Console.WriteLine("Server=.;Database=Test;Integrated Security=true;Pooling=false;");`}
          expectedOutput={`=== SQL Server 接続文字列 ===

Server          : サーバー名/IPアドレス
Database        : データベース名
User Id/Password: 認証情報
Encrypt         : 暗号化
Max Pool Size   : 最大プールサイズ（デフォルト100）
Min Pool Size   : 最小プールサイズ（デフォルト0）

=== SQLite 接続文字列 ===
Data Source=./myapp.db;

=== Pooling=false（プール無効化）===
Server=.;Database=Test;Integrated Security=true;Pooling=false;`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">設定ファイルからの読み込み</h2>
        <p className="text-gray-400 mb-4">接続文字列はコードに直書きせず設定ファイルで管理します。</p>
        <CSharpEditor
          defaultCode={`using Microsoft.Extensions.Configuration;

// appsettings.json の例:
// {
//   "ConnectionStrings": {
//     "DefaultConnection": "Server=.;Database=MyDb;Integrated Security=true;"
//   }
// }

// IConfigurationで読み込み
IConfiguration config = new ConfigurationBuilder()
    .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
    .AddJsonFile("appsettings.json")
    .AddEnvironmentVariables()  // 環境変数で上書き可能
    .Build();

string? connStr = config.GetConnectionString("DefaultConnection");
Console.WriteLine($"接続文字列取得: {(connStr != null ? "成功" : "失敗")}");

// 環境変数での上書き例
// 環境変数: ConnectionStrings__DefaultConnection=Server=prod;...
Console.WriteLine();
Console.WriteLine("設定の優先順位（高い順）:");
Console.WriteLine("1. コマンドライン引数");
Console.WriteLine("2. 環境変数");
Console.WriteLine("3. appsettings.{Environment}.json");
Console.WriteLine("4. appsettings.json");`}
          expectedOutput={`接続文字列取得: 成功

設定の優先順位（高い順）:
1. コマンドライン引数
2. 環境変数
3. appsettings.{Environment}.json
4. appsettings.json`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="database" lessonId="connection-management" />
      </div>
      <LessonNav lessons={lessons} currentId="connection-management" basePath="/learn/database" />
    </div>
  );
}

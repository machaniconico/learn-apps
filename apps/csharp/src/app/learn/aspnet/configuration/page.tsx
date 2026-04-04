import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("aspnet");

export default function ConfigurationPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">ASP.NET Core基礎 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">設定管理</h1>
        <p className="text-gray-400">appsettings.json・IConfiguration・Optionsパターンによる設定管理を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">設定の読み込み</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ASP.NET Coreは複数の設定ソースをサポートします。優先順位（後が優先）:
        </p>
        <ol className="list-decimal list-inside text-gray-300 space-y-1">
          <li>appsettings.json</li>
          <li>appsettings.&#123;Environment&#125;.json</li>
          <li>環境変数</li>
          <li>コマンドライン引数</li>
        </ol>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">IConfiguration で設定を読む</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">IConfiguration</code> でキー名や階層パスで設定値を取得します。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;

// appsettings.json の内容をシミュレーション
// {
//   "App": { "Name": "MyApp", "Version": "1.0" },
//   "Database": { "ConnectionString": "Server=...;Database=mydb" },
//   "AllowedHosts": "*"
// }

class Configuration
{
    private readonly Dictionary<string, string> _config = new()
    {
        ["App:Name"] = "MyApp",
        ["App:Version"] = "1.0",
        ["Database:ConnectionString"] = "Server=localhost;Database=mydb",
        ["AllowedHosts"] = "*",
        ["Logging:LogLevel:Default"] = "Information",
    };

    public string? this[string key] =>
        _config.TryGetValue(key, out var v) ? v : null;

    public string GetValue(string key, string defaultValue = "")
        => _config.GetValueOrDefault(key, defaultValue) ?? defaultValue;
}

class Program
{
    static void Main()
    {
        var config = new Configuration();

        // 単純なキーアクセス
        Console.WriteLine($"AllowedHosts: {config["AllowedHosts"]}");

        // 階層キーアクセス（コロン区切り）
        Console.WriteLine($"App.Name: {config["App:Name"]}");
        Console.WriteLine($"App.Version: {config["App:Version"]}");

        // デフォルト値付き
        string timeout = config.GetValue("App:Timeout", "30");
        Console.WriteLine($"Timeout: {timeout}秒");

        Console.WriteLine($"DB: {config["Database:ConnectionString"]}");
        Console.WriteLine($"LogLevel: {config["Logging:LogLevel:Default"]}");
    }
}`}
          expectedOutput={`AllowedHosts: *
App.Name: MyApp
App.Version: 1.0
Timeout: 30秒
DB: Server=localhost;Database=mydb
LogLevel: Information`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Options パターン</h2>
        <p className="text-gray-400 mb-4">
          強く型付けされた設定クラスにバインドするOptionsパターンです。
        </p>
        <CSharpEditor
          defaultCode={`using System;

// 設定クラス（POCOクラス）
class EmailOptions
{
    public string Host { get; set; } = "";
    public int Port { get; set; } = 587;
    public bool UseSsl { get; set; } = true;
    public string FromAddress { get; set; } = "";
}

class DatabaseOptions
{
    public string ConnectionString { get; set; } = "";
    public int MaxPoolSize { get; set; } = 100;
    public int CommandTimeout { get; set; } = 30;
}

// Optionsを使うサービス
class EmailService
{
    private readonly EmailOptions _options;

    // IOptions<EmailOptions> を注入（ここでは直接渡し）
    public EmailService(EmailOptions options) => _options = options;

    public void PrintConfig()
    {
        Console.WriteLine($"SMTP: {_options.Host}:{_options.Port}");
        Console.WriteLine($"SSL: {_options.UseSsl}, From: {_options.FromAddress}");
    }
}

class Program
{
    static void Main()
    {
        // appsettings.jsonからバインドされる（シミュレーション）
        var emailOpts = new EmailOptions
        {
            Host = "smtp.example.com",
            Port = 587,
            UseSsl = true,
            FromAddress = "noreply@example.com",
        };

        var service = new EmailService(emailOpts);
        service.PrintConfig();
    }
}`}
          expectedOutput={`SMTP: smtp.example.com:587
SSL: True, From: noreply@example.com`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="aspnet" lessonId="configuration" />
      </div>
      <LessonNav lessons={lessons} currentId="configuration" basePath="/learn/aspnet" />
    </div>
  );
}

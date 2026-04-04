import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("aspnet");

export default function LoggingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">ASP.NET Core基礎 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ログ</h1>
        <p className="text-gray-400">ILogger&lt;T&gt;・ログレベル・構造化ログの実装を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ログレベル</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          ASP.NET Coreでは以下のログレベルが定義されています（重要度の低い順）:
        </p>
        <ul className="list-none text-gray-300 space-y-1 font-mono text-sm">
          <li><span className="text-gray-500">Trace</span> → 最も詳細な情報（開発時のみ）</li>
          <li><span className="text-blue-400">Debug</span> → デバッグ情報</li>
          <li><span className="text-green-400">Information</span> → 一般的なアプリの動作</li>
          <li><span className="text-yellow-400">Warning</span> → 予期しない事態だが処理継続</li>
          <li><span className="text-red-400">Error</span> → 処理失敗（例外など）</li>
          <li><span className="text-red-600">Critical</span> → 即座の対応が必要な障害</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ILogger の使い方</h2>
        <p className="text-gray-400 mb-4">
          コンストラクタ注入で <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">ILogger&lt;T&gt;</code> を受け取ってログを出力します。
        </p>
        <CSharpEditor
          defaultCode={`using System;

// ILogger のシミュレーション
enum LogLevel { Trace, Debug, Information, Warning, Error, Critical }

class Logger<T>
{
    private readonly string _category = typeof(T).Name;
    private LogLevel _minLevel = LogLevel.Information;

    public void SetMinLevel(LogLevel level) => _minLevel = level;

    private void Log(LogLevel level, string message, Exception? ex = null)
    {
        if (level < _minLevel) return;
        var prefix = level switch
        {
            LogLevel.Trace => "TRCE",
            LogLevel.Debug => "DBUG",
            LogLevel.Information => "INFO",
            LogLevel.Warning => "WARN",
            LogLevel.Error => "FAIL",
            LogLevel.Critical => "CRIT",
            _ => "????"
        };
        Console.WriteLine($"[{prefix}] {_category}: {message}");
        if (ex != null) Console.WriteLine($"       例外: {ex.Message}");
    }

    public void LogTrace(string msg) => Log(LogLevel.Trace, msg);
    public void LogDebug(string msg) => Log(LogLevel.Debug, msg);
    public void LogInformation(string msg) => Log(LogLevel.Information, msg);
    public void LogWarning(string msg) => Log(LogLevel.Warning, msg);
    public void LogError(string msg, Exception? ex = null) => Log(LogLevel.Error, msg, ex);
    public void LogCritical(string msg) => Log(LogLevel.Critical, msg);
}

class OrderService
{
    private readonly Logger<OrderService> _logger;

    public OrderService(Logger<OrderService> logger) => _logger = logger;

    public void ProcessOrder(int orderId)
    {
        _logger.LogInformation($"注文処理開始: orderId={orderId}");
        try
        {
            if (orderId <= 0) throw new ArgumentException("無効な注文ID");
            _logger.LogInformation($"注文処理完了: orderId={orderId}");
        }
        catch (Exception ex)
        {
            _logger.LogError($"注文処理失敗: orderId={orderId}", ex);
        }
    }
}

class Program
{
    static void Main()
    {
        var logger = new Logger<OrderService>();
        var service = new OrderService(logger);

        service.ProcessOrder(42);
        service.ProcessOrder(-1);
    }
}`}
          expectedOutput={`[INFO] OrderService: 注文処理開始: orderId=42
[INFO] OrderService: 注文処理完了: orderId=42
[INFO] OrderService: 注文処理開始: orderId=-1
[FAIL] OrderService: 注文処理失敗: orderId=-1
       例外: 無効な注文ID`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">構造化ログ</h2>
        <p className="text-gray-400 mb-4">
          メッセージテンプレートを使った構造化ログはログ集約ツール（Seq・ELK）で検索しやすいです。
        </p>
        <CSharpEditor
          defaultCode={`using System;

// 構造化ログのシミュレーション
class StructuredLogger
{
    public void LogInfo(string template, params object[] args)
    {
        // 実際は Serilog 等がプロパティとして保存
        string message = string.Format(template.Replace("{", "{0}_{1}_{2}".Split('_')[0], StringComparison.Ordinal), args);

        // テンプレートから変数名を抽出してシミュレーション
        Console.WriteLine($"Message: {FormatTemplate(template, args)}");
        var parts = template.Split('{', '}');
        for (int i = 1; i < parts.Length; i += 2)
        {
            if (i / 2 < args.Length)
                Console.WriteLine($"  @{parts[i]} = {args[i / 2]}");
        }
    }

    private string FormatTemplate(string template, object[] args)
    {
        int idx = 0;
        return System.Text.RegularExpressions.Regex.Replace(
            template, @"\{[^}]+\}", _ => idx < args.Length ? args[idx++].ToString()! : "?");
    }
}

class Program
{
    static void Main()
    {
        var log = new StructuredLogger();

        // 構造化ログ: プロパティ名で記録
        log.LogInfo("ユーザー {UserId} がログイン: IP={IpAddress}", 42, "192.168.1.1");
        Console.WriteLine();
        log.LogInfo("注文 {OrderId} 処理完了: 金額={Amount}円", 1001, 5000);
    }
}`}
          expectedOutput={`Message: ユーザー 42 がログイン: IP=192.168.1.1
  @UserId = 42
  @IpAddress = 192.168.1.1

Message: 注文 1001 処理完了: 金額=5000円
  @OrderId = 1001
  @Amount = 5000`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="aspnet" lessonId="logging" />
      </div>
      <LessonNav lessons={lessons} currentId="logging" basePath="/learn/aspnet" />
    </div>
  );
}

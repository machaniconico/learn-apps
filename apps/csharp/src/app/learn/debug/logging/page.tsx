import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

export default function DebugLoggingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">デバッグ レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ログ出力</h1>
        <p className="text-gray-400">Console.WriteLine、Debug.WriteLine、ILogger、Serilogを使ったログ出力を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ログレベルの概念</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ログには重要度に応じたレベルがあります。本番環境では不要な詳細ログをフィルタリングし、パフォーマンスへの影響を最小化します。
        </p>
        <p className="text-gray-300 leading-relaxed">
          低い順: <code className="text-red-400 bg-gray-800 px-1 rounded">Trace</code> → <code className="text-red-400 bg-gray-800 px-1 rounded">Debug</code> → <code className="text-red-400 bg-gray-800 px-1 rounded">Information</code> → <code className="text-red-400 bg-gray-800 px-1 rounded">Warning</code> → <code className="text-red-400 bg-gray-800 px-1 rounded">Error</code> → <code className="text-red-400 bg-gray-800 px-1 rounded">Critical</code>
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ILoggerの使い方</h2>
        <p className="text-gray-400 mb-4">Microsoft.Extensions.Loggingの標準ILoggerインターフェースです。</p>
        <CSharpEditor
          defaultCode={`using Microsoft.Extensions.Logging;

// ILogger のログレベル別メソッド
public class OrderService
{
    private readonly ILogger<OrderService> _logger;

    public OrderService(ILogger<OrderService> logger)
    {
        _logger = logger;
    }

    public void ProcessOrder(int orderId)
    {
        _logger.LogInformation("注文処理開始: OrderId={OrderId}", orderId);

        try
        {
            // 処理...
            _logger.LogDebug("注文詳細取得: OrderId={OrderId}", orderId);

            if (orderId <= 0)
            {
                _logger.LogWarning("無効な注文ID: {OrderId}", orderId);
                return;
            }

            _logger.LogInformation("注文処理完了: OrderId={OrderId}", orderId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "注文処理エラー: OrderId={OrderId}", orderId);
            throw;
        }
    }
}

// ログレベルの使い分け
Console.WriteLine("ログレベルの使い分け:");
Console.WriteLine("LogTrace       : 最詳細（変数値のトレースなど）");
Console.WriteLine("LogDebug       : 開発時デバッグ情報");
Console.WriteLine("LogInformation : 正常な処理の流れ");
Console.WriteLine("LogWarning     : 問題になりうる状況");
Console.WriteLine("LogError       : エラー（処理は継続可能）");
Console.WriteLine("LogCritical    : 致命的エラー（即座に対応が必要）");`}
          expectedOutput={`ログレベルの使い分け:
LogTrace       : 最詳細（変数値のトレースなど）
LogDebug       : 開発時デバッグ情報
LogInformation : 正常な処理の流れ
LogWarning     : 問題になりうる状況
LogError       : エラー（処理は継続可能）
LogCritical    : 致命的エラー（即座に対応が必要）`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">構造化ログとSerilog</h2>
        <p className="text-gray-400 mb-4">Serilogで構造化ログを出力してログ分析を容易にします。</p>
        <CSharpEditor
          defaultCode={`// Serilog の設定例
// dotnet add package Serilog
// dotnet add package Serilog.Sinks.Console
// dotnet add package Serilog.Sinks.File

using Serilog;

// Program.cs での設定
Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Debug()
    .WriteTo.Console(outputTemplate:
        "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj}{NewLine}{Exception}")
    .WriteTo.File("logs/app-.log",
        rollingInterval: RollingInterval.Day)
    .CreateLogger();

// 構造化ログ（プロパティ付き）
// Log.Information("ユーザーログイン: {UserId} {UserName}", userId, userName);
// Log.Warning("在庫不足: {ProductId} 残り{Stock}個", productId, stock);
// Log.Error(ex, "決済エラー: {OrderId}", orderId);

// 通常の出力でデモ
Console.WriteLine("[10:30:01 INF] アプリケーション起動");
Console.WriteLine("[10:30:02 INF] ユーザーログイン: UserId=42 UserName=\"田中\"");
Console.WriteLine("[10:30:05 WRN] 在庫不足: ProductId=7 残り2個");
Console.WriteLine("[10:30:10 ERR] 決済エラー: OrderId=1234");
Console.WriteLine();
Console.WriteLine("構造化ログの利点:");
Console.WriteLine("- プロパティでフィルタリング可能");
Console.WriteLine("- Elasticsearch等に送って分析できる");`}
          expectedOutput={`[10:30:01 INF] アプリケーション起動
[10:30:02 INF] ユーザーログイン: UserId=42 UserName="田中"
[10:30:05 WRN] 在庫不足: ProductId=7 残り2個
[10:30:10 ERR] 決済エラー: OrderId=1234

構造化ログの利点:
- プロパティでフィルタリング可能
- Elasticsearch等に送って分析できる`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="debug" lessonId="logging" />
      </div>
      <LessonNav lessons={lessons} currentId="logging" basePath="/learn/debug" />
    </div>
  );
}

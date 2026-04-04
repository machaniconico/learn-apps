import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function DesignFactoryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">デザインパターン レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Factoryパターン</h1>
        <p className="text-gray-400">Factory Method、Abstract Factory、オブジェクト生成の抽象化を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Factoryパターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Factoryパターンはオブジェクトの生成ロジックをカプセル化し、クライアントコードが具体的なクラスに依存しないようにします。生成するクラスが変わっても、Factoryを変更するだけでクライアントコードは変更不要です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Simple Factory</h2>
        <p className="text-gray-400 mb-4">最もシンプルなFactory実装です。</p>
        <CSharpEditor
          defaultCode={`// Simple Factory パターン
public interface ILogger
{
    void Log(string message);
}

public class ConsoleLogger : ILogger
{
    public void Log(string message)
        => Console.WriteLine($"[CONSOLE] {message}");
}

public class FileLogger : ILogger
{
    private readonly string _path;
    public FileLogger(string path) => _path = path;
    public void Log(string message)
        => Console.WriteLine($"[FILE:{_path}] {message}");
}

public class DatabaseLogger : ILogger
{
    public void Log(string message)
        => Console.WriteLine($"[DB] {message}");
}

// Simple Factory: 生成ロジックをまとめる
public static class LoggerFactory
{
    public static ILogger Create(string type, string? param = null)
        => type switch
        {
            "console"  => new ConsoleLogger(),
            "file"     => new FileLogger(param ?? "app.log"),
            "database" => new DatabaseLogger(),
            _          => throw new ArgumentException($"Unknown logger type: {type}")
        };
}

// 使用例: クライアントは具体的なクラスを知らない
ILogger logger1 = LoggerFactory.Create("console");
ILogger logger2 = LoggerFactory.Create("file", "system.log");
ILogger logger3 = LoggerFactory.Create("database");

logger1.Log("コンソールに出力");
logger2.Log("ファイルに記録");
logger3.Log("DBに保存");`}
          expectedOutput={`[CONSOLE] コンソールに出力
[FILE:system.log] ファイルに記録
[DB] DBに保存`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Factory Method パターン</h2>
        <p className="text-gray-400 mb-4">サブクラスに生成を委譲するパターンです。</p>
        <CSharpEditor
          defaultCode={`// Factory Method パターン
public abstract class Notification
{
    public abstract void Send(string recipient, string message);

    // Factory Method: サブクラスが実装
    public static Notification Create(string channel)
        => channel switch
        {
            "email" => new EmailNotification(),
            "sms"   => new SmsNotification(),
            "push"  => new PushNotification(),
            _       => throw new ArgumentException($"Unknown channel: {channel}")
        };
}

public class EmailNotification : Notification
{
    public override void Send(string recipient, string message)
        => Console.WriteLine($"Email to {recipient}: {message}");
}

public class SmsNotification : Notification
{
    public override void Send(string recipient, string message)
        => Console.WriteLine($"SMS to {recipient}: {message}");
}

public class PushNotification : Notification
{
    public override void Send(string recipient, string message)
        => Console.WriteLine($"Push to {recipient}: {message}");
}

// 通知サービス: チャネルを切り替えても変更不要
string[] channels = { "email", "sms", "push" };
foreach (string channel in channels)
{
    Notification notification = Notification.Create(channel);
    notification.Send("田中太郎", "テスト通知");
}`}
          expectedOutput={`Email to 田中太郎: テスト通知
SMS to 田中太郎: テスト通知
Push to 田中太郎: テスト通知`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="factory" />
      </div>
      <LessonNav lessons={lessons} currentId="factory" basePath="/learn/design" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function DesignSingletonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">デザインパターン レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Singletonパターン</h1>
        <p className="text-gray-400">遅延初期化、スレッドセーフ、Lazy&lt;T&gt;を使ったSingletonの実装を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Singletonパターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Singletonパターンはクラスのインスタンスがアプリケーション全体で1つだけ存在することを保証します。設定管理・ログ管理・キャッシュ管理などに使われます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          ただし、テストが難しくなる・グローバル状態を持つなどの欠点もあり、DIコンテナを使ったSingleton登録が現代では推奨されます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Lazy&lt;T&gt;を使ったスレッドセーフなSingleton</h2>
        <p className="text-gray-400 mb-4">最もシンプルで安全な実装方法です。</p>
        <CSharpEditor
          defaultCode={`// Lazy<T> を使ったスレッドセーフなSingleton
public class ConfigurationManager
{
    // Lazy<T> はスレッドセーフで遅延初期化される
    private static readonly Lazy<ConfigurationManager> _instance
        = new Lazy<ConfigurationManager>(() => new ConfigurationManager());

    // コンストラクタをprivateにしてnew禁止
    private ConfigurationManager()
    {
        // 初期化処理（1回だけ実行される）
        Settings["theme"] = "dark";
        Settings["language"] = "ja";
        Settings["maxRetries"] = "3";
        Console.WriteLine("ConfigurationManager: 初期化完了");
    }

    // シングルトンインスタンスへのアクセス
    public static ConfigurationManager Instance => _instance.Value;

    public Dictionary<string, string> Settings { get; } = new();

    public string Get(string key, string defaultValue = "")
        => Settings.TryGetValue(key, out string? val) ? val : defaultValue;
}

// 使用例
var config1 = ConfigurationManager.Instance;
var config2 = ConfigurationManager.Instance;

// 同じインスタンスを参照
Console.WriteLine($"同一インスタンス: {object.ReferenceEquals(config1, config2)}");
Console.WriteLine($"テーマ: {config1.Get("theme")}");
Console.WriteLine($"言語: {config2.Get("language")}");

// 設定の変更は共有される
config1.Settings["newKey"] = "newValue";
Console.WriteLine($"config2からアクセス: {config2.Get("newKey")}");`}
          expectedOutput={`ConfigurationManager: 初期化完了
同一インスタンス: True
テーマ: dark
言語: ja
config2からアクセス: newValue`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">DIコンテナでのSingleton（推奨）</h2>
        <p className="text-gray-400 mb-4">現代的なC#開発ではDIコンテナでSingletonを管理します。</p>
        <CSharpEditor
          defaultCode={`// DIコンテナを使ったSingleton（テスト可能な設計）
using Microsoft.Extensions.DependencyInjection;

public interface ICache
{
    void Set(string key, object value);
    object? Get(string key);
}

public class InMemoryCache : ICache
{
    private readonly Dictionary<string, object> _store = new();

    public void Set(string key, object value)
    {
        _store[key] = value;
        Console.WriteLine($"キャッシュに保存: {key}");
    }

    public object? Get(string key)
        => _store.TryGetValue(key, out var val) ? val : null;
}

// DIコンテナへの登録
var services = new ServiceCollection();
services.AddSingleton<ICache, InMemoryCache>();  // Singletonとして登録
var provider = services.BuildServiceProvider();

// 複数回取得しても同じインスタンス
var cache1 = provider.GetRequiredService<ICache>();
var cache2 = provider.GetRequiredService<ICache>();

cache1.Set("user", "田中太郎");
Console.WriteLine($"同一インスタンス: {object.ReferenceEquals(cache1, cache2)}");
Console.WriteLine($"キャッシュから取得: {cache2.Get("user")}");`}
          expectedOutput={`キャッシュに保存: user
同一インスタンス: True
キャッシュから取得: 田中太郎`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="singleton" />
      </div>
      <LessonNav lessons={lessons} currentId="singleton" basePath="/learn/design" />
    </div>
  );
}

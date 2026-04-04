import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("delegates");

export default function EventsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">デリゲート・イベント レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">イベント</h1>
        <p className="text-gray-400">eventキーワード・パブリッシャー・サブスクライバーパターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">event とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">event</code> キーワードはデリゲートをカプセル化し、外部から直接呼び出せないようにします。
          イベントはクラスの外から <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">+=</code> で購読し、
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">-=</code> で購読解除できます。
          発火（Invoke）はクラス内からのみ可能です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">イベントの基本</h2>
        <p className="text-gray-400 mb-4">
          パブリッシャー（イベントを発行するクラス）とサブスクライバー（イベントを受け取るクラス）に分けて実装します。
        </p>
        <CSharpEditor
          defaultCode={`using System;

// パブリッシャー（イベントを発行するクラス）
class Button
{
    // イベントの宣言
    public event Action<string>? Clicked;

    public void Click(string label)
    {
        Console.WriteLine($"ボタン'{label}'がクリックされました");
        Clicked?.Invoke(label); // イベントを発火（nullチェック付き）
    }
}

// サブスクライバー（イベントを処理するクラス）
class Logger
{
    public void OnButtonClicked(string label)
    {
        Console.WriteLine($"[Logger] クリック記録: {label}");
    }
}

class Program
{
    static void Main()
    {
        var button = new Button();
        var logger = new Logger();

        // イベント購読
        button.Clicked += logger.OnButtonClicked;
        button.Clicked += label => Console.WriteLine($"[Handler2] {label}");

        button.Click("OK");
        Console.WriteLine("---");

        // 購読解除
        button.Clicked -= logger.OnButtonClicked;
        button.Click("Cancel");
    }
}`}
          expectedOutput={`ボタン'OK'がクリックされました
[Logger] クリック記録: OK
[Handler2] OK
---
ボタン'Cancel'がクリックされました
[Handler2] Cancel`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">タイマーイベントのシミュレーション</h2>
        <p className="text-gray-400 mb-4">
          イベント駆動プログラミングの実用例です。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class StockPrice
{
    private decimal _price;

    public event Action<decimal, decimal>? PriceChanged;

    public decimal Price
    {
        get => _price;
        set
        {
            if (_price != value)
            {
                decimal old = _price;
                _price = value;
                PriceChanged?.Invoke(old, value);
            }
        }
    }
}

class Program
{
    static void Main()
    {
        var stock = new StockPrice();

        stock.PriceChanged += (oldPrice, newPrice) =>
        {
            string direction = newPrice > oldPrice ? "↑" : "↓";
            Console.WriteLine($"{direction} {oldPrice:C} → {newPrice:C}");
        };

        stock.Price = 1000m;
        stock.Price = 1050m;
        stock.Price = 980m;
        stock.Price = 980m; // 変化なし（イベント発火しない）
        stock.Price = 1100m;
    }
}`}
          expectedOutput={`↑ ¥0 → ¥1,000
↑ ¥1,000 → ¥1,050
↓ ¥1,050 → ¥980
↑ ¥980 → ¥1,100`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="delegates" lessonId="events" />
      </div>
      <LessonNav lessons={lessons} currentId="events" basePath="/learn/delegates" />
    </div>
  );
}

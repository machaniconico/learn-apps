import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function DesignObserverPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">デザインパターン レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Observerパターン</h1>
        <p className="text-gray-400">イベントベース実装、IObservable&lt;T&gt;、Publish-Subscribeを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Observerパターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ObserverパターンはSubject（発行者）の状態変化をObserver（購読者）に通知する仕組みです。C#では<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">event</code>キーワードを使ったイベントシステムが最も一般的な実装です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">C#のイベントによるObserver実装</h2>
        <p className="text-gray-400 mb-4">eventキーワードを使ったシンプルなPublish-Subscribeです。</p>
        <CSharpEditor
          defaultCode={`// イベントを使ったObserverパターン
public class StockPrice
{
    private decimal _price;

    // イベント定義
    public event EventHandler<decimal>? PriceChanged;
    public event EventHandler<string>? AlertTriggered;

    public string Symbol { get; }

    public StockPrice(string symbol, decimal initialPrice)
    {
        Symbol = symbol;
        _price = initialPrice;
    }

    public decimal Price
    {
        get => _price;
        set
        {
            if (_price == value) return;
            decimal old = _price;
            _price = value;

            // イベント発行（購読者に通知）
            PriceChanged?.Invoke(this, _price);

            // 5%以上変動でアラート
            double change = Math.Abs((double)((_price - old) / old)) * 100;
            if (change >= 5)
            {
                AlertTriggered?.Invoke(this,
                    $"{Symbol}: {change:F1}%の大幅変動 ({old} -> {_price})");
            }
        }
    }
}

// 購読
var stock = new StockPrice("MSFT", 300);

// Observer1: 価格をログ
stock.PriceChanged += (sender, price) =>
    Console.WriteLine($"  [ログ] {((StockPrice)sender!).Symbol}: ¥{price}");

// Observer2: アラート
stock.AlertTriggered += (sender, msg) =>
    Console.WriteLine($"  [ALERT] {msg}");

Console.WriteLine("株価変動:");
stock.Price = 310;
stock.Price = 315;
stock.Price = 285; // 5%以上の変動 -> アラート発動`}
          expectedOutput={`株価変動:
  [ログ] MSFT: ¥310
  [ログ] MSFT: ¥315
  [ログ] MSFT: ¥285
  [ALERT] MSFT: 9.5%の大幅変動 (315 -> 285)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">IObservable&lt;T&gt; / IObserver&lt;T&gt;</h2>
        <p className="text-gray-400 mb-4">.NETの標準的なReactive Programmingインターフェースです。</p>
        <CSharpEditor
          defaultCode={`// IObservable<T> / IObserver<T> インターフェース
public class TemperatureSensor : IObservable<double>
{
    private readonly List<IObserver<double>> _observers = new();

    public IDisposable Subscribe(IObserver<double> observer)
    {
        _observers.Add(observer);
        return new Unsubscriber(_observers, observer);
    }

    public void SetTemperature(double temp)
    {
        foreach (var obs in _observers)
            obs.OnNext(temp);
    }

    private class Unsubscriber : IDisposable
    {
        private List<IObserver<double>> _obs;
        private IObserver<double> _ob;
        public Unsubscriber(List<IObserver<double>> obs, IObserver<double> ob)
            => (_obs, _ob) = (obs, ob);
        public void Dispose() => _obs.Remove(_ob);
    }
}

public class TemperatureDisplay : IObserver<double>
{
    public void OnNext(double value)
        => Console.WriteLine($"  温度表示: {value:F1}°C");
    public void OnError(Exception error)
        => Console.WriteLine($"  エラー: {error.Message}");
    public void OnCompleted()
        => Console.WriteLine("  センサー終了");
}

var sensor = new TemperatureSensor();
using (sensor.Subscribe(new TemperatureDisplay()))
{
    sensor.SetTemperature(22.5);
    sensor.SetTemperature(23.1);
    sensor.SetTemperature(21.8);
}`}
          expectedOutput={`  温度表示: 22.5°C
  温度表示: 23.1°C
  温度表示: 21.8°C`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="observer" />
      </div>
      <LessonNav lessons={lessons} currentId="observer" basePath="/learn/design" />
    </div>
  );
}

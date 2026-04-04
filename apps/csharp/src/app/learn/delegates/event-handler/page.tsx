import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("delegates");

export default function EventHandlerPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">デリゲート・イベント レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">EventHandler</h1>
        <p className="text-gray-400">EventHandler&lt;TEventArgs&gt;とカスタムEventArgsの標準的なイベント実装を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">EventHandler パターン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          .NETでは標準的なイベントパターンとして <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">EventHandler&lt;TEventArgs&gt;</code> を使います。
          シグネチャは <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">void Handler(object? sender, TEventArgs e)</code> です。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">sender</code>: イベントを発行したオブジェクト</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">e</code>: イベントデータ（EventArgsを継承）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カスタム EventArgs の作成</h2>
        <p className="text-gray-400 mb-4">
          イベントにデータを添付するためにEventArgsを継承したクラスを作ります。
        </p>
        <CSharpEditor
          defaultCode={`using System;

// カスタム EventArgs
class OrderEventArgs : EventArgs
{
    public int OrderId { get; }
    public string ProductName { get; }
    public int Quantity { get; }

    public OrderEventArgs(int id, string product, int qty)
    {
        OrderId = id;
        ProductName = product;
        Quantity = qty;
    }
}

class OrderSystem
{
    // 標準的な EventHandler<T> パターン
    public event EventHandler<OrderEventArgs>? OrderPlaced;

    public void PlaceOrder(string product, int qty)
    {
        int id = new Random().Next(1000, 9999);
        Console.WriteLine($"注文受付: {product} x{qty}");
        OrderPlaced?.Invoke(this, new OrderEventArgs(id, product, qty));
    }
}

class Program
{
    static void Main()
    {
        var system = new OrderSystem();

        system.OrderPlaced += (sender, e) =>
        {
            Console.WriteLine($"[通知] 注文ID:{e.OrderId} - {e.ProductName} x{e.Quantity}");
        };

        system.OrderPlaced += (sender, e) =>
        {
            Console.WriteLine($"[在庫更新] {e.ProductName} の在庫を{e.Quantity}減らします");
        };

        system.PlaceOrder("C#入門書", 2);
        system.PlaceOrder("キーボード", 1);
    }
}`}
          expectedOutput={`注文受付: C#入門書 x2
[通知] 注文ID:XXXX - C#入門書 x2
[在庫更新] C#入門書 の在庫を2減らします
注文受付: キーボード x1
[通知] 注文ID:XXXX - キーボード x1
[在庫更新] キーボード の在庫を1減らします`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">引数なし EventHandler</h2>
        <p className="text-gray-400 mb-4">
          追加データが不要な場合は <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">EventHandler</code>（非ジェネリック版）を使います。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class Timer
{
    public event EventHandler? Elapsed;

    public void Tick()
    {
        Console.WriteLine("Tick!");
        Elapsed?.Invoke(this, EventArgs.Empty);
    }
}

class Program
{
    static int _count = 0;

    static void Main()
    {
        var timer = new Timer();
        timer.Elapsed += (sender, e) =>
        {
            _count++;
            Console.WriteLine($"  → {_count}回目の経過イベント");
        };

        timer.Tick();
        timer.Tick();
        timer.Tick();
    }
}`}
          expectedOutput={`Tick!
  → 1回目の経過イベント
Tick!
  → 2回目の経過イベント
Tick!
  → 3回目の経過イベント`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="delegates" lessonId="event-handler" />
      </div>
      <LessonNav lessons={lessons} currentId="event-handler" basePath="/learn/delegates" />
    </div>
  );
}

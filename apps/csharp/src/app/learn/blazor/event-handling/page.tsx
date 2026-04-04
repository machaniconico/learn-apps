import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("blazor");

export default function EventHandlingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">Blazor レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">イベント処理</h1>
        <p className="text-gray-400">@onclick・@onchange・EventCallbackの使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Blazorのイベントディレクティブ</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          Blazorでは <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">@on{"{event}"}</code> でDOMイベントをC#メソッドにバインドします:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">@onclick</code>: クリックイベント</li>
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">@onchange</code>: 値変更イベント</li>
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">@oninput</code>: 入力中リアルタイム</li>
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">@onsubmit</code>: フォーム送信</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">@onclick イベント</h2>
        <p className="text-gray-400 mb-4">
          クリックイベントのハンドリングパターンです。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;

// Blazorイベント処理のシミュレーション
class TodoApp
{
    private List<string> _todos = new() { "C#を学ぶ", "Blazorを練習する" };
    private string _newTodo = "";
    private int _clickCount = 0;

    // @onclick="AddTodo"
    public void AddTodo()
    {
        if (!string.IsNullOrWhiteSpace(_newTodo))
        {
            _todos.Add(_newTodo);
            Console.WriteLine($"追加: {_newTodo}");
            _newTodo = "";
        }
    }

    // @onclick="() => RemoveTodo(item)"
    public void RemoveTodo(string item)
    {
        _todos.Remove(item);
        Console.WriteLine($"削除: {item}");
    }

    // @onclick="HandleClick" (MouseEventArgs を受け取る)
    public void HandleClick(string info)
    {
        _clickCount++;
        Console.WriteLine($"クリック {_clickCount}回目: {info}");
    }

    public void Render()
    {
        Console.WriteLine("ToDoリスト:");
        foreach (var todo in _todos)
            Console.WriteLine($"  ☐ {todo}");
    }

    public void SimulateInput(string text) => _newTodo = text;
}

class Program
{
    static void Main()
    {
        var app = new TodoApp();
        app.Render();

        Console.WriteLine();
        app.SimulateInput("ASP.NET Coreを勉強する");
        app.AddTodo();
        app.HandleClick("左ボタン");
        app.RemoveTodo("C#を学ぶ");
        app.Render();
    }
}`}
          expectedOutput={`ToDoリスト:
  ☐ C#を学ぶ
  ☐ Blazorを練習する

追加: ASP.NET Coreを勉強する
クリック 1回目: 左ボタン
削除: C#を学ぶ
ToDoリスト:
  ☐ Blazorを練習する
  ☐ ASP.NET Coreを勉強する`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">EventCallback で親に通知</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">EventCallback&lt;T&gt;</code> は子コンポーネントから親コンポーネントへイベントを伝える仕組みです。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Threading.Tasks;

// 子コンポーネント
class ProductCard
{
    public string Name { get; set; } = "";
    public decimal Price { get; set; }

    // EventCallback: 親コンポーネントに通知
    public Action<string>? OnAddToCart { get; set; }

    // @onclick="HandleAddToCart"
    public void HandleAddToCart()
    {
        Console.WriteLine($"[ProductCard] '{Name}'をカートに追加");
        OnAddToCart?.Invoke(Name); // 親に通知
    }
}

// 親コンポーネント
class ShoppingPage
{
    private int _cartCount = 0;

    public void OnAddToCart(string productName)
    {
        _cartCount++;
        Console.WriteLine($"[ShoppingPage] カートに追加: {productName}（合計{_cartCount}点）");
    }

    public void Render()
    {
        // 子コンポーネントにEventCallbackを渡す
        var card1 = new ProductCard
        {
            Name = "C#入門書",
            Price = 3500m,
            OnAddToCart = OnAddToCart, // EventCallback を渡す
        };

        var card2 = new ProductCard
        {
            Name = "キーボード",
            Price = 12000m,
            OnAddToCart = OnAddToCart,
        };

        // ユーザーがクリック
        card1.HandleAddToCart();
        card2.HandleAddToCart();
        card1.HandleAddToCart();
    }
}

class Program
{
    static void Main() => new ShoppingPage().Render();
}`}
          expectedOutput={`[ProductCard] 'C#入門書'をカートに追加
[ShoppingPage] カートに追加: C#入門書（合計1点）
[ProductCard] 'キーボード'をカートに追加
[ShoppingPage] カートに追加: キーボード（合計2点）
[ProductCard] 'C#入門書'をカートに追加
[ShoppingPage] カートに追加: C#入門書（合計3点）`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="blazor" lessonId="event-handling" />
      </div>
      <LessonNav lessons={lessons} currentId="event-handling" basePath="/learn/blazor" />
    </div>
  );
}

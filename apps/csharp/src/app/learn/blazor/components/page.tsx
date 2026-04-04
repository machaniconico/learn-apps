import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("blazor");

export default function BlazorComponentsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">Blazor レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コンポーネント</h1>
        <p className="text-gray-400">.razorファイル・パラメーター・子コンテンツ（ChildContent）の使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コンポーネントの構造</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Blazorコンポーネント（.razorファイル）は3つの部分から構成されます:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><strong className="text-white">マークアップ</strong>: HTML + Razor構文（@変数、@ifなど）</li>
          <li><strong className="text-white">@code ブロック</strong>: C#コード（フィールド・メソッド・ライフサイクル）</li>
          <li><strong className="text-white">@using / @inject</strong>: 名前空間やサービスの注入</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">パラメーターの受け渡し</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">[Parameter]</code> 属性で親コンポーネントから値を受け取ります。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;

// AlertCard.razor のC#部分のシミュレーション
class AlertCard
{
    [System.ComponentModel.DataAnnotations.Display(Name = "Parameter")]
    public string Title { get; set; } = "";

    [System.ComponentModel.DataAnnotations.Display(Name = "Parameter")]
    public string Message { get; set; } = "";

    [System.ComponentModel.DataAnnotations.Display(Name = "Parameter")]
    public string Type { get; set; } = "info"; // info, warning, error

    public void Render()
    {
        string color = Type switch
        {
            "warning" => "黄",
            "error" => "赤",
            _ => "青",
        };
        Console.WriteLine($"[{color}カード] {Title}: {Message}");
    }
}

// UserCard.razor のシミュレーション
class UserCard
{
    public string Name { get; set; } = "";
    public int Age { get; set; }
    public bool IsAdmin { get; set; }

    // ChildContent: 子要素を受け取る
    public Action? ChildContent { get; set; }

    public void Render()
    {
        Console.WriteLine($"=== {Name} ({Age}歳) {(IsAdmin ? "[管理者]" : "")} ===");
        ChildContent?.Invoke(); // 子コンテンツを描画
    }
}

class Program
{
    static void Main()
    {
        // <AlertCard Title="注意" Message="保存しました" Type="info" />
        new AlertCard { Title = "情報", Message = "保存しました", Type = "info" }.Render();
        new AlertCard { Title = "警告", Message = "期限が近づいています", Type = "warning" }.Render();
        new AlertCard { Title = "エラー", Message = "接続に失敗しました", Type = "error" }.Render();

        Console.WriteLine();

        // <UserCard Name="Alice" Age="25" IsAdmin="true">
        //   <p>ここが ChildContent</p>
        // </UserCard>
        new UserCard
        {
            Name = "Alice",
            Age = 25,
            IsAdmin = true,
            ChildContent = () => Console.WriteLine("  詳細: プレミアム会員"),
        }.Render();
    }
}`}
          expectedOutput={`[青カード] 情報: 保存しました
[黄カード] 警告: 期限が近づいています
[赤カード] エラー: 接続に失敗しました

=== Alice (25歳) [管理者] ===
  詳細: プレミアム会員`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ライフサイクルメソッド</h2>
        <p className="text-gray-400 mb-4">
          コンポーネントのライフサイクルに応じた処理を実装できます。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Threading.Tasks;

class DataComponent
{
    public string? Data { get; private set; }
    private bool _initialized = false;

    // OnInitialized: コンポーネント初期化時
    public void OnInitialized()
    {
        Console.WriteLine("OnInitialized: コンポーネント初期化");
    }

    // OnInitializedAsync: 非同期初期化
    public async Task OnInitializedAsync()
    {
        Console.WriteLine("OnInitializedAsync: データ取得中...");
        await Task.Delay(100); // APIコール想定
        Data = "サーバーから取得したデータ";
        _initialized = true;
        Console.WriteLine($"データ取得完了: {Data}");
    }

    // OnParametersSet: パラメーター変更時
    public void OnParametersSet()
    {
        Console.WriteLine("OnParametersSet: パラメーター更新");
    }

    // OnAfterRenderAsync: レンダリング後
    public async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            Console.WriteLine("OnAfterRenderAsync: 初回レンダリング後");
            await Task.CompletedTask;
        }
    }
}

class Program
{
    static async Task Main()
    {
        var component = new DataComponent();
        component.OnInitialized();
        await component.OnInitializedAsync();
        component.OnParametersSet();
        await component.OnAfterRenderAsync(firstRender: true);
    }
}`}
          expectedOutput={`OnInitialized: コンポーネント初期化
OnInitializedAsync: データ取得中...
データ取得完了: サーバーから取得したデータ
OnParametersSet: パラメーター更新
OnAfterRenderAsync: 初回レンダリング後`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="blazor" lessonId="components" />
      </div>
      <LessonNav lessons={lessons} currentId="components" basePath="/learn/blazor" />
    </div>
  );
}

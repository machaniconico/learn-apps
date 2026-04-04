import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("blazor");

export default function BlazorOverviewPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">Blazor レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Blazor概要</h1>
        <p className="text-gray-400">Blazor WebAssembly vs Server・それぞれの特徴と使い分けを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Blazorとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          BlazorはC#とRazorコンポーネントを使ってインタラクティブなWeb UIを構築するMicrosoftのフレームワークです。
          JavaScriptの代わりにC#でフロントエンドを書けます。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-purple-700">
            <h3 className="text-purple-400 font-bold mb-2">Blazor WebAssembly</h3>
            <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
              <li>.NETランタイムがブラウザで動く</li>
              <li>サーバー不要（静的ホスティング可）</li>
              <li>初回ロードが遅い</li>
              <li>オフライン対応可能</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-blue-700">
            <h3 className="text-blue-400 font-bold mb-2">Blazor Server</h3>
            <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
              <li>UIロジックはサーバーで実行</li>
              <li>SignalRでUIを同期</li>
              <li>初回ロードが速い</li>
              <li>接続が切れると機能しない</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Razorコンポーネントの基本</h2>
        <p className="text-gray-400 mb-4">
          Blazorコンポーネントは <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">.razor</code> ファイルで定義します。HTMLマークアップと <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">@code</code> ブロックを組み合わせます。
        </p>
        <CSharpEditor
          defaultCode={`// Blazor コンポーネントのC#コード部分をシミュレーション
using System;

// Counter.razor のC#コード部分
class CounterComponent
{
    private int _count = 0;

    // ボタンクリックハンドラー
    public void IncrementCount()
    {
        _count++;
        Console.WriteLine($"カウント: {_count}");
    }

    // プロパティ（パラメーター）
    public int IncrementBy { get; set; } = 1;

    public void IncrementByAmount()
    {
        _count += IncrementBy;
        Console.WriteLine($"カウント ({IncrementBy}ずつ): {_count}");
    }

    public void Render()
    {
        Console.WriteLine($"<p>現在のカウント: {_count}</p>");
        Console.WriteLine("<button>カウントアップ</button>");
    }
}

class Program
{
    static void Main()
    {
        var counter = new CounterComponent();
        counter.Render();
        counter.IncrementCount();
        counter.IncrementCount();
        counter.Render();

        Console.WriteLine("---");
        counter.IncrementBy = 5;
        counter.IncrementByAmount();
        counter.Render();
    }
}`}
          expectedOutput={`<p>現在のカウント: 0</p>
<button>カウントアップ</button>
カウント: 1
カウント: 2
<p>現在のカウント: 2</p>
<button>カウントアップ</button>
---
カウント (5ずつ): 7
<p>現在のカウント: 7</p>
<button>カウントアップ</button>`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Blazor vs JavaScript フレームワーク</h2>
        <p className="text-gray-400 mb-4">
          Blazorを選ぶべき場面と、他のフレームワークが適する場面です。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;

class ComparisonTable
{
    record Row(string Feature, string Blazor, string React);

    static List<Row> rows = new()
    {
        new("言語", "C#", "JavaScript/TypeScript"),
        new("サーバー共有ロジック", "容易（同じコード）", "別途API通信が必要"),
        new("エコシステム", "C# .NETライブラリ", "NPMの膨大なパッケージ"),
        new("SEO対応", "Server版は優秀", "SSR設定が必要"),
        new("学習コスト", "C#経験者に低い", "JS未経験者に高い"),
        new("パフォーマンス", "WASM版は初回遅い", "軽量で高速"),
    };

    public static void Print()
    {
        Console.WriteLine($"{"機能",-20} {"Blazor",-20} {"React",-20}");
        Console.WriteLine(new string('-', 62));
        foreach (var r in rows)
            Console.WriteLine($"{r.Feature,-20} {r.Blazor,-20} {r.React,-20}");
    }
}

class Program
{
    static void Main() => ComparisonTable.Print();
}`}
          expectedOutput={`機能                   Blazor               React
--------------------------------------------------------------
言語                   C#                   JavaScript/TypeScript
サーバー共有ロジック         容易（同じコード）          別途API通信が必要
エコシステム               C# .NETライブラリ          NPMの膨大なパッケージ
SEO対応                Server版は優秀           SSR設定が必要
学習コスト                C#経験者に低い            JS未経験者に高い
パフォーマンス              WASM版は初回遅い          軽量で高速               `}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="blazor" lessonId="overview" />
      </div>
      <LessonNav lessons={lessons} currentId="overview" basePath="/learn/blazor" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("blazor");

export default function DataBindingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">Blazor レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">データバインディング</h1>
        <p className="text-gray-400">@bind・一方向バインディング・双方向バインディング・bind:eventを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">バインディングの種類</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          Blazorには2種類のバインディングがあります:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li><strong className="text-white">一方向バインディング</strong>: <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">@variableName</code> でC#→HTMLへ値を表示</li>
          <li><strong className="text-white">双方向バインディング</strong>: <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">@bind=&quot;variableName&quot;</code> でHTML入力→C#変数に同期</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">一方向バインディング</h2>
        <p className="text-gray-400 mb-4">
          C#の変数・プロパティの値をHTMLに反映します。
        </p>
        <CSharpEditor
          defaultCode={`using System;

// 一方向バインディングのシミュレーション
class WeatherDisplay
{
    public double Temperature { get; private set; } = 25.3;
    public string City { get; private set; } = "東京";
    public string Condition { get; private set; } = "晴れ";
    public bool IsHot => Temperature >= 30;

    public void Render()
    {
        // @City → HTMLに表示
        Console.WriteLine($"<h2>{City}の天気</h2>");

        // @Condition
        Console.WriteLine($"<p>天気: {Condition}</p>");

        // @Temperature:F1 （書式指定）
        Console.WriteLine($"<p>気温: {Temperature:F1}°C</p>");

        // @if (IsHot) → 条件表示
        if (IsHot)
            Console.WriteLine("<span class='warning'>熱中症注意！</span>");
    }

    public void UpdateWeather(double temp, string condition)
    {
        Temperature = temp;
        Condition = condition;
        Console.WriteLine("--- 更新後 ---");
        Render();
    }
}

class Program
{
    static void Main()
    {
        var weather = new WeatherDisplay();
        weather.Render();
        weather.UpdateWeather(34.5, "猛暑");
    }
}`}
          expectedOutput={`<h2>東京の天気</h2>
<p>天気: 晴れ</p>
<p>気温: 25.3°C</p>
--- 更新後 ---
<h2>東京の天気</h2>
<p>天気: 猛暑</p>
<p>気温: 34.5°C</p>
<span class='warning'>熱中症注意！</span>`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">双方向バインディング（@bind）</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">@bind</code> はユーザー入力をC#変数に自動同期します。デフォルトで <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">onchange</code> イベントで同期されます。
        </p>
        <CSharpEditor
          defaultCode={`using System;

// @bind のシミュレーション
class RegistrationForm
{
    // @bind="UserName" → 双方向バインド
    public string UserName { get; set; } = "";
    public string Email { get; set; } = "";
    public int Age { get; set; }
    public bool Agreed { get; set; }

    // フォーム送信シミュレーション
    public void SimulateInput(string name, string email, int age, bool agreed)
    {
        // ユーザーが入力 → @bind が自動更新
        UserName = name;
        Email = email;
        Age = age;
        Agreed = agreed;

        Console.WriteLine("入力後の状態:");
        Console.WriteLine($"  ユーザー名: {UserName}");
        Console.WriteLine($"  メール: {Email}");
        Console.WriteLine($"  年齢: {Age}");
        Console.WriteLine($"  同意: {Agreed}");
    }

    public void Submit()
    {
        if (!Agreed)
        {
            Console.WriteLine("エラー: 利用規約に同意してください");
            return;
        }
        Console.WriteLine($"登録完了: {UserName} ({Email})");
    }
}

class Program
{
    static void Main()
    {
        var form = new RegistrationForm();

        // ユーザーがフォームに入力
        form.SimulateInput("alice", "alice@example.com", 25, true);
        form.Submit();
    }
}`}
          expectedOutput={`入力後の状態:
  ユーザー名: alice
  メール: alice@example.com
  年齢: 25
  同意: True
登録完了: alice (alice@example.com)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="blazor" lessonId="data-binding" />
      </div>
      <LessonNav lessons={lessons} currentId="data-binding" basePath="/learn/blazor" />
    </div>
  );
}

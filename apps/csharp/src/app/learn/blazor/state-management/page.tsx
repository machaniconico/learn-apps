import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("blazor");

export default function StateManagementPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">Blazor レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">状態管理</h1>
        <p className="text-gray-400">カスケーディングパラメーター・ステートコンテナー・スコープドサービスによる状態管理を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Blazorの状態管理方法</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li><strong className="text-white">コンポーネント内ステート</strong>: フィールド変数で管理（ローカルな状態）</li>
          <li><strong className="text-white">カスケーディングパラメーター</strong>: 親から深い子孫への値の受け渡し</li>
          <li><strong className="text-white">ステートコンテナーサービス</strong>: AddScoped で登録したサービスで共有</li>
          <li><strong className="text-white">URL/クエリパラメーター</strong>: ページ間で状態を渡す</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ステートコンテナーパターン</h2>
        <p className="text-gray-400 mb-4">
          Scopedサービスとして登録したクラスで状態を共有します。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;

// ステートコンテナー（Scopedサービスとして登録）
class AppStateService
{
    private string? _currentUser;
    private readonly List<string> _notifications = new();

    public string? CurrentUser
    {
        get => _currentUser;
        set
        {
            _currentUser = value;
            OnStateChanged?.Invoke();
        }
    }

    public IReadOnlyList<string> Notifications => _notifications;

    // 状態変更通知
    public event Action? OnStateChanged;

    public void AddNotification(string message)
    {
        _notifications.Add(message);
        OnStateChanged?.Invoke();
    }

    public void ClearNotifications()
    {
        _notifications.Clear();
        OnStateChanged?.Invoke();
    }
}

// ナビバーコンポーネント（ユーザー表示）
class NavBar
{
    private readonly AppStateService _state;

    public NavBar(AppStateService state)
    {
        _state = state;
        _state.OnStateChanged += Render; // 状態変更時に再描画
    }

    public void Render()
    {
        string user = _state.CurrentUser ?? "未ログイン";
        int notifCount = _state.Notifications.Count;
        Console.WriteLine($"[ナビバー] ユーザー: {user} | 通知: {notifCount}件");
    }
}

// ページコンポーネント
class DashboardPage
{
    private readonly AppStateService _state;

    public DashboardPage(AppStateService state) => _state = state;

    public void Login(string userName)
    {
        _state.CurrentUser = userName;
        _state.AddNotification($"{userName}さんがログインしました");
    }
}

class Program
{
    static void Main()
    {
        // 同じAppStateServiceインスタンスを共有（Scopedシミュレーション）
        var state = new AppStateService();
        var navBar = new NavBar(state);
        var dashboard = new DashboardPage(state);

        navBar.Render(); // 初期状態

        dashboard.Login("Alice"); // ログイン → 状態変更 → NavBar自動更新
        state.AddNotification("新しいメッセージがあります");
    }
}`}
          expectedOutput={`[ナビバー] ユーザー: 未ログイン | 通知: 0件
[ナビバー] ユーザー: Alice | 通知: 1件
[ナビバー] ユーザー: Alice | 通知: 2件`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カスケーディングパラメーター</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">CascadingValue</code> で親から深い子孫へ直接値を渡せます。propsバケツリレーを避けられます。
        </p>
        <CSharpEditor
          defaultCode={`using System;

// テーマ設定（カスケーディング値）
class Theme
{
    public string PrimaryColor { get; set; } = "blue";
    public string FontSize { get; set; } = "16px";
    public bool IsDarkMode { get; set; }
}

// 子コンポーネント（中間コンポーネントを経由せずテーマを受け取る）
class ButtonComponent
{
    // [CascadingParameter] でカスケーディング値を受け取る
    public Theme? Theme { get; set; }
    public string Label { get; set; } = "";

    public void Render()
    {
        string bg = Theme?.IsDarkMode == true ? "ダーク" : "ライト";
        string color = Theme?.PrimaryColor ?? "blue";
        Console.WriteLine($"[ボタン: {Label}] テーマ={bg}, 色={color}");
    }
}

class Program
{
    static void Main()
    {
        // <CascadingValue Value="theme"> の効果をシミュレーション
        var theme = new Theme { PrimaryColor = "purple", IsDarkMode = true };

        // 子孫コンポーネントは直接テーマを受け取れる
        new ButtonComponent { Theme = theme, Label = "送信" }.Render();
        new ButtonComponent { Theme = theme, Label = "キャンセル" }.Render();

        // テーマ変更
        theme.IsDarkMode = false;
        theme.PrimaryColor = "green";
        new ButtonComponent { Theme = theme, Label = "確認" }.Render();
    }
}`}
          expectedOutput={`[ボタン: 送信] テーマ=ダーク, 色=purple
[ボタン: キャンセル] テーマ=ダーク, 色=purple
[ボタン: 確認] テーマ=ライト, 色=green`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="blazor" lessonId="state-management" />
      </div>
      <LessonNav lessons={lessons} currentId="state-management" basePath="/learn/blazor" />
    </div>
  );
}

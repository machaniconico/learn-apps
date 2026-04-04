import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("blazor");

export default function JsInteropPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">Blazor レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">JS連携</h1>
        <p className="text-gray-400">IJSRuntime・InvokeAsync・.NETからJSの呼び出し、JSから.NETの呼び出しを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">JS Interop とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          BlazorはC#からJavaScriptを呼び出したり、JavaScriptからC#メソッドを呼び出すことができます。
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">IJSRuntime</code> インターフェースを注入して使用します。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">InvokeAsync&lt;T&gt;</code>: 戻り値ありのJS呼び出し</li>
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">InvokeVoidAsync</code>: 戻り値なしのJS呼び出し</li>
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">[JSInvokable]</code>: JSから呼び出せるC#メソッド</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">.NETからJavaScriptを呼び出す</h2>
        <p className="text-gray-400 mb-4">
          IJSRuntime.InvokeAsync でJS関数を呼び出します。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Threading.Tasks;

// IJSRuntime のシミュレーション
class JsRuntime
{
    public async Task<T?> InvokeAsync<T>(string identifier, params object[] args)
    {
        Console.WriteLine($"JS呼び出し: {identifier}({string.Join(", ", args)})");
        await Task.Delay(10);

        // シミュレーション結果
        object? result = identifier switch
        {
            "window.alert" => null,
            "window.confirm" => true,
            "window.prompt" => "ユーザー入力",
            "localStorage.getItem" => "保存された値",
            "getWindowWidth" => 1920,
            _ => null,
        };

        if (result is T typed) return typed;
        return default;
    }

    public async Task InvokeVoidAsync(string identifier, params object[] args)
    {
        Console.WriteLine($"JS呼び出し(void): {identifier}({string.Join(", ", args)})");
        await Task.Delay(10);
    }
}

class ClipboardService
{
    private readonly JsRuntime _js;
    public ClipboardService(JsRuntime js) => _js = js;

    public async Task CopyToClipboard(string text)
    {
        await _js.InvokeVoidAsync("navigator.clipboard.writeText", text);
        Console.WriteLine($"クリップボードにコピー: {text}");
    }

    public async Task<string?> ReadFromClipboard()
    {
        var text = await _js.InvokeAsync<string>("navigator.clipboard.readText");
        Console.WriteLine($"クリップボードから読み取り: {text}");
        return text;
    }
}

class Program
{
    static async Task Main()
    {
        var js = new JsRuntime();

        // window.alert
        await js.InvokeVoidAsync("window.alert", "こんにちは！");

        // window.confirm
        bool ok = await js.InvokeAsync<bool>("window.confirm", "削除しますか？");
        Console.WriteLine($"確認結果: {ok}");

        // ウィンドウ幅取得
        int width = await js.InvokeAsync<int>("getWindowWidth");
        Console.WriteLine($"ウィンドウ幅: {width}px");

        // クリップボード
        var clipboard = new ClipboardService(js);
        await clipboard.CopyToClipboard("コピーしたテキスト");
    }
}`}
          expectedOutput={`JS呼び出し(void): window.alert(こんにちは！)
JS呼び出し: window.confirm(削除しますか？)
確認結果: True
JS呼び出し: getWindowWidth()
ウィンドウ幅: 1920px
JS呼び出し(void): navigator.clipboard.writeText(コピーしたテキスト)
クリップボードにコピー: コピーしたテキスト`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">JavaScriptから.NETを呼び出す</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">[JSInvokable]</code> 属性を付けたメソッドはJSから呼び出せます。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Threading.Tasks;

// [JSInvokable] でJSから呼び出せるメソッド
class BlazorComponent
{
    private int _notificationCount = 0;

    // JavaScript から DotNet.invokeMethodAsync('MyApp', 'OnPushNotification', data) で呼ばれる
    // [JSInvokable]
    public void OnPushNotification(string message)
    {
        _notificationCount++;
        Console.WriteLine($"[.NET] プッシュ通知受信 #{_notificationCount}: {message}");
    }

    // [JSInvokable]
    public async Task<string> GetUserData(int userId)
    {
        await Task.Delay(50); // DB処理
        Console.WriteLine($"[.NET] JSからユーザーデータ要求: userId={userId}");
        return $"{{\"id\":{userId},\"name\":\"User{userId}\"}}";
    }
}

// JS側からの呼び出しをシミュレート
class JavaScriptSimulator
{
    private readonly BlazorComponent _component;
    public JavaScriptSimulator(BlazorComponent comp) => _component = comp;

    public async Task SimulateJsCalls()
    {
        Console.WriteLine("// JavaScript側:");
        Console.WriteLine("// DotNet.invokeMethodAsync('App', 'OnPushNotification', 'メッセージ')");
        _component.OnPushNotification("新しいメッセージが届きました");
        _component.OnPushNotification("フォロワーが増えました");

        Console.WriteLine();
        Console.WriteLine("// DotNet.invokeMethodAsync('App', 'GetUserData', 42)");
        string data = await _component.GetUserData(42);
        Console.WriteLine($"// JS側が受け取ったデータ: {data}");
    }
}

class Program
{
    static async Task Main()
    {
        var component = new BlazorComponent();
        var js = new JavaScriptSimulator(component);
        await js.SimulateJsCalls();
    }
}`}
          expectedOutput={`// JavaScript側:
// DotNet.invokeMethodAsync('App', 'OnPushNotification', 'メッセージ')
[.NET] プッシュ通知受信 #1: 新しいメッセージが届きました
[.NET] プッシュ通知受信 #2: フォロワーが増えました

// DotNet.invokeMethodAsync('App', 'GetUserData', 42)
[.NET] JSからユーザーデータ要求: userId=42
// JS側が受け取ったデータ: {"id":42,"name":"User42"}`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="blazor" lessonId="js-interop" />
      </div>
      <LessonNav lessons={lessons} currentId="js-interop" basePath="/learn/blazor" />
    </div>
  );
}

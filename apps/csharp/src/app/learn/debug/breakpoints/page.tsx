import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

export default function DebugBreakpointsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">デバッグ レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ブレークポイント</h1>
        <p className="text-gray-400">条件付きブレークポイント、ヒットカウント、トレースポイントを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ブレークポイントの種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ブレークポイントはデバッガが一時停止する行に設定します。Visual Studioでは通常のブレークポイント以外に、<strong className="text-white">条件付き</strong>・<strong className="text-white">ヒットカウント</strong>・<strong className="text-white">トレースポイント</strong>など高度なオプションがあります。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">条件付きブレークポイントの活用</h2>
        <p className="text-gray-400 mb-4">特定の条件が満たされた時だけ停止するブレークポイントです。</p>
        <CSharpEditor
          defaultCode={`// 条件付きブレークポイントが役立つシナリオ
// 例：ループ中に特定の値で停止したい場合

var items = new[]
{
    new { Id = 1, Name = "商品A", Price = 500 },
    new { Id = 2, Name = "商品B", Price = 1500 },
    new { Id = 3, Name = "商品C", Price = 300 },
    new { Id = 4, Name = "商品D", Price = 2000 },
    new { Id = 5, Name = "商品E", Price = 800 },
};

Console.WriteLine("価格1000円以上の商品（条件付きBPで特定する例）:");
Console.WriteLine();

foreach (var item in items)
{
    // Visual Studioでここにブレークポイントを設定して
    // 条件: item.Price >= 1000 と指定すると
    // 高額商品の時だけ停止できる
    if (item.Price >= 1000)
    {
        Console.WriteLine($"  [高額] ID:{item.Id} {item.Name} ¥{item.Price}");
    }
    else
    {
        Console.WriteLine($"       ID:{item.Id} {item.Name} ¥{item.Price}");
    }
}

Console.WriteLine();
Console.WriteLine("条件付きBP設定手順（VS）:");
Console.WriteLine("1. 行番号左をクリックでBP設定");
Console.WriteLine("2. BP右クリック -> 条件");
Console.WriteLine("3. 式を入力: item.Price >= 1000");`}
          expectedOutput={`価格1000円以上の商品（条件付きBPで特定する例）:

       ID:1 商品A ¥500
  [高額] ID:2 商品B ¥1500
       ID:3 商品C ¥300
  [高額] ID:4 商品D ¥2000
       ID:5 商品E ¥800

条件付きBP設定手順（VS）:
1. 行番号左をクリックでBP設定
2. BP右クリック -> 条件
3. 式を入力: item.Price >= 1000`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">トレースポイント（ログBP）</h2>
        <p className="text-gray-400 mb-4">停止せずにログメッセージだけ出力するブレークポイントです。</p>
        <CSharpEditor
          defaultCode={`// トレースポイント: 停止せずにメッセージを出力
// Visual Studio: BP右クリック -> アクション -> "出力ウィンドウにメッセージを記録"

// Debugger.Log を使った代替（コードベース）
using System.Diagnostics;

void TracePoint(string message)
{
    // デバッグビルドのみ動作
    Debugger.Log(0, "Trace", $"[TRACE] {message}\n");
    Debug.WriteLine($"[TRACE] {message}");
}

int[] data = { 10, 25, 3, 47, 8, 33 };
int max = data[0];

for (int i = 1; i < data.Length; i++)
{
    TracePoint($"比較: data[{i}]={data[i]} vs 現在最大={max}");
    if (data[i] > max)
    {
        max = data[i];
        Console.WriteLine($"  新しい最大値: {max}");
    }
}

Console.WriteLine($"最大値: {max}");`}
          expectedOutput={`  新しい最大値: 25
  新しい最大値: 47
最大値: 47`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="debug" lessonId="breakpoints" />
      </div>
      <LessonNav lessons={lessons} currentId="breakpoints" basePath="/learn/debug" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

export default function DebugDebuggerBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">デバッグ レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">デバッガの基本</h1>
        <p className="text-gray-400">F5でデバッグ開始、Step Over/Into/Out、ウォッチウィンドウの使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">デバッガとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          デバッガはプログラムの実行を制御し、実行中の状態（変数の値・コールスタック・メモリなど）を調べるツールです。Visual StudioとVS Codeにはパワフルなデバッガが組み込まれています。
        </p>
        <p className="text-gray-300 leading-relaxed">
          デバッガを使うには<strong className="text-white">デバッグビルド</strong>（デフォルト）でプログラムを実行します。リリースビルドは最適化が入るためデバッグが困難です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">デバッガのキーボードショートカット</h2>
        <p className="text-gray-400 mb-4">Visual Studioのデバッガ操作の基本キーを覚えましょう。</p>
        <CSharpEditor
          defaultCode={`// デバッガの主要操作（Visual Studio）
var shortcuts = new[]
{
    ("F5",          "デバッグ開始 / 続行"),
    ("Shift+F5",    "デバッグ停止"),
    ("F9",          "ブレークポイントの設定/解除"),
    ("F10",         "Step Over（現在行を実行・次行へ）"),
    ("F11",         "Step Into（メソッド内部に入る）"),
    ("Shift+F11",   "Step Out（現在のメソッドから出る）"),
    ("Ctrl+F5",     "デバッグなしで実行"),
    ("Ctrl+Shift+F5","デバッグを再起動"),
};

Console.WriteLine("Visual Studio デバッガ ショートカット:");
Console.WriteLine();
foreach (var (key, desc) in shortcuts)
{
    Console.WriteLine($"  {key,-18} : {desc}");
}`}
          expectedOutput={`Visual Studio デバッガ ショートカット:

  F5                 : デバッグ開始 / 続行
  Shift+F5           : デバッグ停止
  F9                 : ブレークポイントの設定/解除
  F10                : Step Over（現在行を実行・次行へ）
  F11                : Step Into（メソッド内部に入る）
  Shift+F11          : Step Out（現在のメソッドから出る）
  Ctrl+F5            : デバッグなしで実行
  Ctrl+Shift+F5      : デバッグを再起動`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Debugger.Break() と Debug.Assert</h2>
        <p className="text-gray-400 mb-4">コードからデバッガを制御する方法です。</p>
        <CSharpEditor
          defaultCode={`using System.Diagnostics;

// Debug.Assert: 条件がfalseの時にデバッグブレーク
int[] numbers = { 1, 2, 3, 4, 5 };
int index = 2;

Debug.Assert(index >= 0 && index < numbers.Length,
    "インデックスが範囲外です");

Console.WriteLine($"numbers[{index}] = {numbers[index]}");

// Debug.WriteLine: デバッグビルド時のみ出力
Debug.WriteLine($"デバッグ情報: 配列長={numbers.Length}");

// Debugger.Launch(): デバッガを起動（自動アタッチ）
// Debugger.Break(): ブレークポイントと同様に停止

// Conditional属性でデバッグ専用メソッド
void LogDebug(string message)
{
    Debug.WriteLine($"[DEBUG] {message}");
}

LogDebug("処理開始");
int sum = 0;
foreach (var n in numbers)
{
    sum += n;
    LogDebug($"累積合計: {sum}");
}
Console.WriteLine($"合計: {sum}");`}
          expectedOutput={`numbers[2] = 3
合計: 15`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="debug" lessonId="debugger-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="debugger-basics" basePath="/learn/debug" />
    </div>
  );
}

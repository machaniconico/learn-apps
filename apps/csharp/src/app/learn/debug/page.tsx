import { CSharpEditor } from "@/components/csharp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

export default function DebugPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-red-400 mb-2">デバッグ</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C#プログラムのデバッグ技術を学びましょう。ブレークポイント・ログ出力・例外解析・パフォーマンス分析まで、問題解決のスキルを身につけます。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="debug" totalLessons={5} color="red" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/debug" color="red" categoryId="debug" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">デバッグの基本</h2>
        <p className="text-gray-400 mb-4">
          デバッグはプログラムのバグを発見・修正するプロセスです。Visual Studioのデバッガを使えば、実行中のプログラムの状態を詳しく調べられます。
        </p>
        <CSharpEditor
          defaultCode={`using System.Diagnostics;

// デバッグ出力の基本
int x = 10;
int y = 0;

// Debug.WriteLineはデバッグビルド時のみ出力
Debug.WriteLine($"x = {x}, y = {y}");

// 条件チェックで潜在的なバグを早期発見
if (y == 0)
{
    Console.WriteLine("警告: yが0です。除算はスキップします。");
}
else
{
    Console.WriteLine($"x / y = {x / y}");
}

// Stopwatchでパフォーマンスを計測
var sw = Stopwatch.StartNew();
System.Threading.Thread.Sleep(10); // 模擬的な処理
sw.Stop();
Console.WriteLine($"処理時間: {sw.ElapsedMilliseconds}ms");`}
          expectedOutput={`警告: yが0です。除算はスキップします。
処理時間: 10ms`}
        />
      </section>
    </div>
  );
}

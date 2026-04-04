import { CSharpEditor } from "@/components/csharp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("exceptions");

export default function ExceptionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-orange-400 mb-2">例外処理</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C#の例外処理機構を学びましょう。try-catch-finally・カスタム例外・例外フィルターからグローバルハンドリングまで、堅牢なエラー処理を設計する力を身につけます。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="exceptions" totalLessons={5} color="orange" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/exceptions" color="orange" categoryId="exceptions" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">例外処理の基本</h2>
        <p className="text-gray-400 mb-4">
          例外はプログラム実行中に発生する予期しないエラーです。C#ではtry-catch-finallyブロックで例外を捕捉・処理し、プログラムのクラッシュを防ぎます。
        </p>
        <CSharpEditor
          defaultCode={`// 基本的な例外処理
try
{
    int[] numbers = { 1, 2, 3 };
    Console.WriteLine(numbers[10]); // IndexOutOfRangeException
}
catch (IndexOutOfRangeException ex)
{
    Console.WriteLine($"配列の範囲外: {ex.Message}");
}
catch (Exception ex)
{
    Console.WriteLine($"予期しないエラー: {ex.Message}");
}
finally
{
    Console.WriteLine("finallyは必ず実行される");
}

Console.WriteLine("プログラムは継続する");`}
          expectedOutput={`配列の範囲外: Index was outside the bounds of the array.
finallyは必ず実行される
プログラムは継続する`}
        />
      </section>
    </div>
  );
}

import { CSharpEditor } from "@/components/csharp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("patterns");

export default function PatternsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-violet-400 mb-2">パターンマッチング</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C#のパターンマッチング機能を学びましょう。is・as演算子から始まり、switch式・プロパティパターン・タプルパターン・リストパターンまで、モダンなC#の強力な機能を習得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="patterns" totalLessons={5} color="violet" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/patterns" color="violet" categoryId="patterns" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">パターンマッチングとは</h2>
        <p className="text-gray-400 mb-4">
          パターンマッチングは値の形・型・構造を検査して処理を分岐する強力な機能です。C# 7.0以降で大幅に強化され、より表現力豊かなコードが書けるようになりました。
        </p>
        <CSharpEditor
          defaultCode={`// パターンマッチングの概要
object[] values = { 42, "Hello", 3.14, null, true };

foreach (var val in values)
{
    string description = val switch
    {
        int n when n > 0    => $"正の整数: {n}",
        int n               => $"整数: {n}",
        string s            => $"文字列: \"{s}\"",
        double d            => $"浮動小数: {d}",
        null                => "null値",
        _                   => $"その他: {val}"
    };
    Console.WriteLine(description);
}`}
          expectedOutput={`正の整数: 42
文字列: "Hello"
浮動小数: 3.14
null値
その他: True`}
        />
      </section>
    </div>
  );
}

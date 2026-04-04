import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function ForeachPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">制御構文 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">foreachループ</h1>
        <p className="text-gray-400">コレクションの要素を順番に処理するforeachの使い方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">foreach とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">foreach</code> はコレクションの全要素を
          順番に取り出して処理します。インデックスを管理する必要がなく、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">for</code> より読みやすいコードになります。
        </p>
        <p className="text-gray-300 leading-relaxed">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">IEnumerable&lt;T&gt;</code> を実装している
          コレクション（配列・List・Dictionary など）に使えます。
          foreach 内でコレクションの要素を変更することはできません。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列とListのforeach</h2>
        <p className="text-gray-400 mb-4">最もよく使うパターンを確認しましょう。</p>
        <CSharpEditor
          defaultCode={`using System.Collections.Generic;

// 配列でのforeach
string[] cities = { "東京", "大阪", "名古屋", "福岡" };
foreach (string city in cities)
{
    Console.WriteLine($"都市: {city}");
}

Console.WriteLine();

// List<T>でのforeach
var scores = new List<int> { 85, 92, 78, 95, 88 };
int total = 0;
foreach (int score in scores)
{
    total += score;
    Console.Write($"{score} ");
}
Console.WriteLine();
Console.WriteLine($"合計: {total}, 平均: {total / scores.Count:F1}");`}
          expectedOutput={`都市: 東京
都市: 大阪
都市: 名古屋
都市: 福岡

85 92 78 95 88
合計: 438, 平均: 87.6`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">DictionaryのforeachとLINQとの組み合わせ</h2>
        <p className="text-gray-400 mb-4">Dictionaryの各エントリーとLINQとの連携を確認しましょう。</p>
        <CSharpEditor
          defaultCode={`using System.Collections.Generic;

// Dictionaryのforeach
var prices = new Dictionary<string, int>
{
    { "りんご", 150 },
    { "バナナ", 80 },
    { "みかん", 120 }
};

foreach (var entry in prices)
{
    Console.WriteLine($"{entry.Key}: {entry.Value}円");
}

Console.WriteLine();

// KeyValuePair を分解する
foreach (var (item, price) in prices)
{
    string label = price >= 100 ? "高め" : "安め";
    Console.WriteLine($"{item} ({label})");
}`}
          expectedOutput={`りんご: 150円
バナナ: 80円
みかん: 120円

りんご (高め)
バナナ (安め)
みかん (高め)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="foreach" />
      </div>
      <LessonNav lessons={lessons} currentId="foreach" basePath="/learn/control" />
    </div>
  );
}

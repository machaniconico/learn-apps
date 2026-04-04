import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("linq");

export default function WhereSelectPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">LINQ レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Where・Select</h1>
        <p className="text-gray-400">フィルタリングと射影（プロジェクション）の基本操作を習得しましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Where でフィルタリング</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">Where(predicate)</code> は条件を満たす要素だけを抽出します。
          引数はブール値を返すラムダ式（述語）です。
        </p>
        <p className="text-gray-300 leading-relaxed">
          インデックス付きのオーバーロード <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">Where((item, index) =&gt; ...)</code> も使用できます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Where の使い方</h2>
        <p className="text-gray-400 mb-4">
          複合条件や複数のWhereチェーンも可能です。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;
using System.Linq;

var products = new List<(string Name, int Price, string Category)>
{
    ("りんご", 150, "果物"),
    ("パン", 200, "食品"),
    ("バナナ", 100, "果物"),
    ("牛乳", 180, "飲料"),
    ("オレンジ", 120, "果物"),
};

// 果物だけフィルタ
var fruits = products.Where(p => p.Category == "果物");
foreach (var f in fruits)
    Console.WriteLine($"{f.Name}: {f.Price}円");

Console.WriteLine("---");

// 価格が120円以上の果物
var expensiveFruits = products
    .Where(p => p.Category == "果物")
    .Where(p => p.Price >= 120);
foreach (var f in expensiveFruits)
    Console.WriteLine($"{f.Name}: {f.Price}円");`}
          expectedOutput={`りんご: 150円
バナナ: 100円
オレンジ: 120円
---
りんご: 150円
オレンジ: 120円`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Select で射影</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">Select(selector)</code> は各要素を別の形に変換します。匿名型への変換もよく使われます。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;
using System.Linq;

var names = new List<string> { "Alice", "Bob", "Charlie", "Dave" };

// 長さに変換
var lengths = names.Select(n => n.Length);
Console.WriteLine("文字数: " + string.Join(", ", lengths));

// 匿名型に変換
var info = names.Select(n => new { Name = n, Length = n.Length, Upper = n.ToUpper() });
foreach (var i in info)
    Console.WriteLine($"{i.Name} ({i.Length}文字) → {i.Upper}");

// インデックス付き Select
var indexed = names.Select((n, i) => $"{i + 1}. {n}");
foreach (var s in indexed)
    Console.WriteLine(s);`}
          expectedOutput={`文字数: 5, 3, 7, 4
Alice (5文字) → ALICE
Bob (3文字) → BOB
Charlie (7文字) → CHARLIE
Dave (4文字) → DAVE
1. Alice
2. Bob
3. Charlie
4. Dave`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">SelectMany でフラット化</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">SelectMany</code> はネストしたコレクションを1つのシーケンスにフラット化します。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;
using System.Linq;

var classRooms = new List<List<string>>
{
    new List<string> { "Alice", "Bob" },
    new List<string> { "Charlie", "Dave", "Eve" },
    new List<string> { "Frank" },
};

// ネストしたリストをフラット化
var allStudents = classRooms.SelectMany(room => room);
Console.WriteLine("全生徒: " + string.Join(", ", allStudents));
Console.WriteLine($"合計: {allStudents.Count()}人");`}
          expectedOutput={`全生徒: Alice, Bob, Charlie, Dave, Eve, Frank
合計: 6人`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="linq" lessonId="where-select" />
      </div>
      <LessonNav lessons={lessons} currentId="where-select" basePath="/learn/linq" />
    </div>
  );
}

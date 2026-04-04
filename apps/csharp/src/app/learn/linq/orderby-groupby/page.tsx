import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("linq");

export default function OrderByGroupByPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">LINQ レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">OrderBy・GroupBy</h1>
        <p className="text-gray-400">ソート・グループ化・ThenByを使ったデータ整列の技術を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">OrderBy でソート</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">OrderBy(keySelector)</code> は昇順、
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">OrderByDescending(keySelector)</code> は降順にソートします。
          複数キーのソートには <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">ThenBy</code> を使います。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">OrderBy と ThenBy</h2>
        <p className="text-gray-400 mb-4">
          複数のキーで順次ソートする方法です。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;
using System.Linq;

var students = new List<(string Name, int Age, double Score)>
{
    ("Alice", 20, 88.5),
    ("Bob", 22, 75.0),
    ("Charlie", 20, 92.0),
    ("Dave", 21, 88.5),
    ("Eve", 22, 75.0),
};

// スコア降順
var byScore = students.OrderByDescending(s => s.Score);
Console.WriteLine("スコア降順:");
foreach (var s in byScore)
    Console.WriteLine($"  {s.Name}: {s.Score}");

Console.WriteLine("---");

// スコア降順 → 名前昇順（複数キー）
var byScoreThenName = students
    .OrderByDescending(s => s.Score)
    .ThenBy(s => s.Name);
Console.WriteLine("スコア降順→名前昇順:");
foreach (var s in byScoreThenName)
    Console.WriteLine($"  {s.Name}: {s.Score}");`}
          expectedOutput={`スコア降順:
  Charlie: 92
  Alice: 88.5
  Dave: 88.5
  Bob: 75
  Eve: 75
---
スコア降順→名前昇順:
  Charlie: 92
  Alice: 88.5
  Dave: 88.5
  Bob: 75
  Eve: 75`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">GroupBy でグループ化</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">GroupBy(keySelector)</code> はキーでグループ化します。
          結果は <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">IGrouping&lt;TKey, TElement&gt;</code> のシーケンスです。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;
using System.Linq;

var items = new List<(string Category, string Name, int Price)>
{
    ("果物", "りんご", 150),
    ("野菜", "にんじん", 80),
    ("果物", "バナナ", 100),
    ("野菜", "ブロッコリー", 200),
    ("果物", "ぶどう", 300),
};

// カテゴリでグループ化
var grouped = items.GroupBy(i => i.Category);
foreach (var group in grouped)
{
    Console.WriteLine($"[{group.Key}]");
    foreach (var item in group)
        Console.WriteLine($"  {item.Name}: {item.Price}円");
    Console.WriteLine($"  合計: {group.Sum(i => i.Price)}円");
}
`}
          expectedOutput={`[果物]
  りんご: 150円
  バナナ: 100円
  ぶどう: 300円
  合計: 550円
[野菜]
  にんじん: 80円
  ブロッコリー: 200円
  合計: 280円`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="linq" lessonId="orderby-groupby" />
      </div>
      <LessonNav lessons={lessons} currentId="orderby-groupby" basePath="/learn/linq" />
    </div>
  );
}

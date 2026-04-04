import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("linq");

export default function AggregationPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">LINQ レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">集計操作</h1>
        <p className="text-gray-400">Sum・Average・Count・Max・Min・Aggregateなどの集計メソッドを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">基本的な集計メソッド</h2>
        <p className="text-gray-300 leading-relaxed">
          LINQの集計メソッドはシーケンスをスカラー値に集約します。これらは「即時実行」され、呼び出した時点でシーケンスが評価されます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Sum・Average・Count・Max・Min</h2>
        <p className="text-gray-400 mb-4">
          最もよく使われる集計メソッドです。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;
using System.Linq;

var scores = new List<int> { 85, 92, 78, 95, 88, 73, 91 };

Console.WriteLine($"合計: {scores.Sum()}");
Console.WriteLine($"平均: {scores.Average():F1}");
Console.WriteLine($"件数: {scores.Count()}");
Console.WriteLine($"最高: {scores.Max()}");
Console.WriteLine($"最低: {scores.Min()}");

// キーセレクターを使った集計
var students = new List<(string Name, int Score)>
{
    ("Alice", 85), ("Bob", 92), ("Charlie", 78), ("Dave", 95),
};

Console.WriteLine($"最高得点者: {students.MaxBy(s => s.Score)?.Name}");
Console.WriteLine($"平均点: {students.Average(s => s.Score):F1}");`}
          expectedOutput={`合計: 602
平均: 86.0
件数: 7
最高: 95
最低: 73
最高得点者: Dave
平均点: 87.5`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Aggregate でカスタム集計</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">Aggregate</code> は任意の集計ロジックを実装できる汎用メソッドです。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;
using System.Linq;

var numbers = new List<int> { 1, 2, 3, 4, 5 };

// 積を計算（1 * 2 * 3 * 4 * 5）
int product = numbers.Aggregate((acc, n) => acc * n);
Console.WriteLine($"積: {product}");

// 初期値付き Aggregate
int sumWith100 = numbers.Aggregate(100, (acc, n) => acc + n);
Console.WriteLine($"100 + 合計: {sumWith100}");

// 文字列の結合
var words = new List<string> { "Hello", "World", "LINQ" };
string sentence = words.Aggregate((acc, w) => acc + " " + w);
Console.WriteLine(sentence);`}
          expectedOutput={`積: 120
100 + 合計: 115
Hello World LINQ`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Any・All・Contains</h2>
        <p className="text-gray-400 mb-4">
          条件チェック系のメソッドです。早期終了が行われるため効率的です。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;
using System.Linq;

var scores = new List<int> { 55, 72, 88, 65, 91 };

// Any: 1つでも条件を満たすか
bool hasHigh = scores.Any(s => s >= 90);
Console.WriteLine($"90点以上がいる: {hasHigh}");

// All: 全員が条件を満たすか
bool allPass = scores.All(s => s >= 60);
Console.WriteLine($"全員60点以上: {allPass}");

// Contains: 特定の値が含まれるか
bool has88 = scores.Contains(88);
Console.WriteLine($"88点がいる: {has88}");`}
          expectedOutput={`90点以上がいる: True
全員60点以上: False
88点がいる: True`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="linq" lessonId="aggregation" />
      </div>
      <LessonNav lessons={lessons} currentId="aggregation" basePath="/learn/linq" />
    </div>
  );
}

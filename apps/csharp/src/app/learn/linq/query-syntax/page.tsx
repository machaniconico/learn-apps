import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("linq");

export default function QuerySyntaxPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">LINQ レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">クエリ構文</h1>
        <p className="text-gray-400">from..where..selectのSQLライクな構文、let句、into句を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">クエリ構文とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          クエリ構文はSQLに似た宣言的な書き方です。コンパイラがメソッド構文に変換します。
          複雑なJoinやGroupByを書く場合に読みやすくなることがあります。
        </p>
        <p className="text-gray-300 leading-relaxed">
          クエリは必ず <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">from</code> で始まり、
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">select</code> または <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">group</code> で終わります。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">from・where・select の基本</h2>
        <p className="text-gray-400 mb-4">
          最も基本的なクエリ構文です。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;
using System.Linq;

var numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// クエリ構文
var query = from n in numbers
            where n % 2 == 0
            select n * n;

Console.WriteLine("偶数の二乗:");
foreach (var n in query)
    Console.Write(n + " ");
Console.WriteLine();

// 同じ内容のメソッド構文
var method = numbers.Where(n => n % 2 == 0).Select(n => n * n);
Console.WriteLine("同じ結果: " + string.Join(", ", method));`}
          expectedOutput={`偶数の二乗:
4 16 36 64 100
同じ結果: 4, 16, 36, 64, 100`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">let句で中間変数を定義</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">let</code> 句を使うと計算結果を一時変数に保存できます。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;
using System.Linq;

var words = new List<string> { "Hello", "World", "LINQ", "C#", "Programming" };

// let で計算結果を保持
var query = from w in words
            let len = w.Length
            where len > 4
            orderby len descending
            select new { Word = w, Length = len };

foreach (var item in query)
    Console.WriteLine($"{item.Word}: {item.Length}文字");`}
          expectedOutput={`Programming: 11文字
Hello: 5文字
World: 5文字`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">group by とinto句</h2>
        <p className="text-gray-400 mb-4">
          クエリ構文でのグループ化と継続クエリです。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;
using System.Linq;

var items = new List<(string Cat, string Name)>
{
    ("A", "apple"), ("B", "banana"), ("A", "avocado"),
    ("B", "blueberry"), ("C", "cherry"),
};

// group by
var grouped = from i in items
              group i by i.Cat into g
              select new { Key = g.Key, Count = g.Count(), Names = g.Select(x => x.Name) };

foreach (var g in grouped)
    Console.WriteLine($"{g.Key}({g.Count}件): {string.Join(", ", g.Names)}");`}
          expectedOutput={`A(2件): apple, avocado
B(2件): banana, blueberry
C(1件): cherry`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="linq" lessonId="query-syntax" />
      </div>
      <LessonNav lessons={lessons} currentId="query-syntax" basePath="/learn/linq" />
    </div>
  );
}

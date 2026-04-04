import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("linq");

export default function LinqBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">LINQ レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">LINQの基本</h1>
        <p className="text-gray-400">Language Integrated Queryの基本概念、using System.Linq、メソッド構文の使い方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">LINQとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          LINQ（Language Integrated Query）はC#に組み込まれたクエリ機能です。
          配列・リスト・辞書・XMLなど様々なデータソースを統一的な構文で操作できます。
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">using System.Linq;</code> を追加するだけで利用できます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          LINQには<strong className="text-white">メソッド構文</strong>（拡張メソッドチェーン）と
          <strong className="text-white">クエリ構文</strong>（SQLライクな記法）の2種類があります。
          どちらも同じ結果を生成します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">メソッド構文の基本</h2>
        <p className="text-gray-400 mb-4">
          メソッド構文は拡張メソッドをチェーンして使います。最もよく使われる書き方です。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;
using System.Linq;

var numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// Where: フィルタリング
var evens = numbers.Where(n => n % 2 == 0);
Console.WriteLine("偶数: " + string.Join(", ", evens));

// Select: 変換（射影）
var doubled = numbers.Select(n => n * 2);
Console.WriteLine("2倍: " + string.Join(", ", doubled));

// メソッドチェーン
var result = numbers
    .Where(n => n > 3)
    .Select(n => n * n);
Console.WriteLine("3より大きい数の二乗: " + string.Join(", ", result));`}
          expectedOutput={`偶数: 2, 4, 6, 8, 10
2倍: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20
3より大きい数の二乗: 16, 25, 36, 49, 64, 81, 100`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">IEnumerable&lt;T&gt; とLINQ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          LINQの拡張メソッドは <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">IEnumerable&lt;T&gt;</code> に対して定義されています。
          配列・List・HashSet・Dictionaryのキーや値など、IEnumerableを実装するすべてのコレクションで使用できます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列コレクションへのLINQ</h2>
        <p className="text-gray-400 mb-4">
          数値だけでなく文字列コレクションにも同様にLINQを適用できます。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;
using System.Linq;

var fruits = new List<string> { "Apple", "Banana", "Cherry", "Avocado", "Blueberry" };

// Aで始まる果物
var aFruits = fruits.Where(f => f.StartsWith("A"));
Console.WriteLine("Aで始まる: " + string.Join(", ", aFruits));

// 文字数が6以上
var longFruits = fruits.Where(f => f.Length >= 6);
Console.WriteLine("6文字以上: " + string.Join(", ", longFruits));

// 大文字に変換
var upper = fruits.Select(f => f.ToUpper());
Console.WriteLine("大文字: " + string.Join(", ", upper));

// 要素数
int count = fruits.Count();
Console.WriteLine($"合計: {count}個");`}
          expectedOutput={`Aで始まる: Apple, Avocado
6文字以上: Banana, Cherry, Avocado, Blueberry
大文字: APPLE, BANANA, CHERRY, AVOCADO, BLUEBERRY
合計: 5個`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="linq" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/linq" />
    </div>
  );
}

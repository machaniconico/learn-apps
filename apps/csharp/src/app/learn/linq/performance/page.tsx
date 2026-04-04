import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("linq");

export default function PerformancePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">LINQ レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">パフォーマンス</h1>
        <p className="text-gray-400">LINQ最適化テクニック・多重列挙の回避・ベンチマークの考え方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">LINQパフォーマンスのポイント</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>多重列挙（Multiple Enumeration）を避ける → <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">ToList()</code> でキャッシュ</li>
          <li>WhereはSelectの前に置く（早期フィルタリング）</li>
          <li>大量データには <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">HashSet</code> や <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">Dictionary</code> を使う</li>
          <li>不要な <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">ToList()</code> を避ける（ストリーム処理が効率的な場合も）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">多重列挙を避ける</h2>
        <p className="text-gray-400 mb-4">
          同じクエリを複数回列挙すると、毎回フルスキャンが走ります。ToList()で一度だけ評価します。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;
using System.Linq;

var data = Enumerable.Range(1, 100).Where(n => n % 2 == 0);

// 悪い例: data を2回列挙
// int count = data.Count();   // 1回目
// int sum = data.Sum();       // 2回目（全件再評価）

// 良い例: 一度 ToList() に変換
var list = data.ToList();
int count = list.Count;      // メモリアクセスのみ
int sum = list.Sum();        // メモリアクセスのみ
Console.WriteLine($"件数: {count}, 合計: {sum}");

// 検索にはHashSetを使う
var allowed = new HashSet<int> { 2, 4, 6, 8, 10 };
var matches = Enumerable.Range(1, 10).Where(n => allowed.Contains(n));
Console.WriteLine("マッチ: " + string.Join(", ", matches));`}
          expectedOutput={`件数: 50, 合計: 2550
マッチ: 2, 4, 6, 8, 10`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Where を先に、Select を後に</h2>
        <p className="text-gray-400 mb-4">
          フィルタを先に適用することで、Selectの変換処理を少ない要素に対してのみ実行できます。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;
using System.Linq;

var products = Enumerable.Range(1, 10)
    .Select(i => new { Id = i, Price = i * 100 })
    .ToList();

// 良い: Where → Select（フィルタ後に変換）
var good = products
    .Where(p => p.Price > 500)   // 先にフィルタ（6件に削減）
    .Select(p => p.Id);           // 残った6件だけ変換

// 確認
Console.WriteLine("500円超のID: " + string.Join(", ", good));

// First / FirstOrDefault で早期終了
var first = products.FirstOrDefault(p => p.Price > 700);
Console.WriteLine($"最初の700円超: ID={first?.Id}");`}
          expectedOutput={`500円超のID: 6, 7, 8, 9, 10
最初の700円超: ID=8`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Distinct・Take・Skip</h2>
        <p className="text-gray-400 mb-4">
          重複除去・ページング処理に使うLINQメソッドです。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;
using System.Linq;

var data = new List<int> { 3, 1, 4, 1, 5, 9, 2, 6, 5, 3 };

// Distinct: 重複除去
var distinct = data.Distinct();
Console.WriteLine("重複除去: " + string.Join(", ", distinct));

// Take・Skip: ページング
var allItems = Enumerable.Range(1, 20).ToList();
int pageSize = 5;
int page = 2;

var paged = allItems
    .Skip((page - 1) * pageSize)
    .Take(pageSize);
Console.WriteLine($"ページ{page}: " + string.Join(", ", paged));`}
          expectedOutput={`重複除去: 3, 1, 4, 5, 9, 2, 6
ページ2: 6, 7, 8, 9, 10`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="linq" lessonId="performance" />
      </div>
      <LessonNav lessons={lessons} currentId="performance" basePath="/learn/linq" />
    </div>
  );
}

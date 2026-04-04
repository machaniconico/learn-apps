import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("linq");

export default function DeferredExecutionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">LINQ レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">遅延実行</h1>
        <p className="text-gray-400">LINQの遅延評価の仕組み、ToList()による即時評価、IQueryableとの違いを理解しましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">遅延実行とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          LINQ クエリは定義した時点では実行されません。
          <strong className="text-white">列挙（foreach・ToList・First など）されたときに初めて実行</strong>されます。
          これを「遅延実行（Deferred Execution）」または「遅延評価（Lazy Evaluation）」と言います。
        </p>
        <p className="text-gray-300 leading-relaxed">
          即時実行させるには <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">ToList()</code>・
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">ToArray()</code>・
          集計メソッド（Count・Sum など）を呼びます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">遅延実行のデモ</h2>
        <p className="text-gray-400 mb-4">
          クエリ定義後にソースを変更すると、実行時の状態が反映されます。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;
using System.Linq;

var numbers = new List<int> { 1, 2, 3, 4, 5 };

// クエリ定義（まだ実行されない）
var query = numbers.Where(n => n > 2);

// ソースに要素を追加
numbers.Add(6);
numbers.Add(7);

// ここで初めてクエリが実行される（追加した6, 7も含まれる）
Console.WriteLine("遅延実行の結果:");
foreach (var n in query)
    Console.Write(n + " ");
Console.WriteLine();

// ToList() で即時実行
var snapshot = numbers.Where(n => n > 2).ToList();
numbers.Add(8); // スナップショット後の追加は反映されない
Console.WriteLine("ToList()の結果:");
foreach (var n in snapshot)
    Console.Write(n + " ");
Console.WriteLine();`}
          expectedOutput={`遅延実行の結果:
3 4 5 6 7
ToList()の結果:
3 4 5 6 7`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">IQueryable と IEnumerable</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">IQueryable&lt;T&gt;</code> はDBクエリの遅延実行に使われ、式ツリーをSQLに変換します。
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">IEnumerable&lt;T&gt;</code> はインメモリで処理されます。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;
using System.Linq;

// IEnumerable: インメモリで全件取得後にフィルタ
IEnumerable<int> inMemory = new List<int> { 1, 2, 3, 4, 5 };
var filtered = inMemory.Where(n => n > 3);
Console.WriteLine("IEnumerable (インメモリ):");
Console.WriteLine(string.Join(", ", filtered));

// AsQueryable() で IQueryable に変換（デモ）
IQueryable<int> queryable = inMemory.AsQueryable();
var q = queryable.Where(n => n > 3);
Console.WriteLine("IQueryable (式ツリー):");
Console.WriteLine(string.Join(", ", q));

// 複数回列挙の注意
var expensive = inMemory.Where(n =>
{
    Console.Write($"評価{n} ");
    return n > 3;
});
Console.WriteLine();
Console.WriteLine("1回目:");
foreach (var n in expensive) Console.Write(n + " ");
Console.WriteLine();
Console.WriteLine("2回目（再度全評価）:");
foreach (var n in expensive) Console.Write(n + " ");
Console.WriteLine();`}
          expectedOutput={`IEnumerable (インメモリ):
4, 5
IQueryable (式ツリー):
4, 5
評価1 評価2 評価3 評価4 評価5
1回目:
4 5
2回目（再度全評価）:
評価1 評価2 評価3 評価4 評価5 4 5`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="linq" lessonId="deferred-execution" />
      </div>
      <LessonNav lessons={lessons} currentId="deferred-execution" basePath="/learn/linq" />
    </div>
  );
}

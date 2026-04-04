import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("delegates");

export default function ActionFuncPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">デリゲート・イベント レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Action・Func</h1>
        <p className="text-gray-400">汎用デリゲートAction&lt;T&gt;・Func&lt;T,TResult&gt;・Predicate&lt;T&gt;の使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">組み込みデリゲート型</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          毎回カスタムデリゲートを宣言しなくて済むよう、.NETには汎用のデリゲート型が用意されています。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">Action&lt;T&gt;</code>: 戻り値なし（void）のメソッド。引数は最大16個</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">Func&lt;T, TResult&gt;</code>: 戻り値ありのメソッド。最後の型パラメータが戻り値</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">Predicate&lt;T&gt;</code>: bool を返すメソッド。Func&lt;T, bool&gt; と同等</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Action&lt;T&gt; の使い方</h2>
        <p className="text-gray-400 mb-4">
          戻り値なしの処理に使います。コールバックやイベントハンドラに最適です。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // Action<string>: string を受け取り void を返す
        Action<string> print = msg => Console.WriteLine(msg);
        print("Hello, Action!");

        // Action<int, string>: 複数引数
        Action<int, string> printN = (n, msg) =>
        {
            for (int i = 0; i < n; i++)
                Console.WriteLine(msg);
        };
        printN(3, "繰り返し");

        // リストの各要素に適用
        var names = new List<string> { "Alice", "Bob", "Charlie" };
        names.ForEach(n => Console.WriteLine($"こんにちは、{n}"));
    }
}`}
          expectedOutput={`Hello, Action!
繰り返し
繰り返し
繰り返し
こんにちは、Alice
こんにちは、Bob
こんにちは、Charlie`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Func&lt;T, TResult&gt; の使い方</h2>
        <p className="text-gray-400 mb-4">
          戻り値ありの処理に使います。LINQのSelectやWhereに渡す関数の型でもあります。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    // Func を引数として受け取る高階関数
    static List<TResult> Transform<T, TResult>(List<T> list, Func<T, TResult> selector)
    {
        return list.Select(selector).ToList();
    }

    static void Main()
    {
        // Func<int, string>: int を受け取り string を返す
        Func<int, string> toStr = n => $"数値:{n}";
        Console.WriteLine(toStr(42));

        // Func<int, int, int>: 2つのint を受け取り int を返す
        Func<int, int, int> add = (a, b) => a + b;
        Console.WriteLine($"3 + 4 = {add(3, 4)}");

        // 高階関数に渡す
        var numbers = new List<int> { 1, 2, 3, 4, 5 };
        var doubled = Transform(numbers, n => n * 2);
        Console.WriteLine(string.Join(", ", doubled));

        // Predicate<T>: bool を返す
        Predicate<int> isEven = n => n % 2 == 0;
        Console.WriteLine($"4は偶数: {isEven(4)}");
        Console.WriteLine($"7は偶数: {isEven(7)}");
    }
}`}
          expectedOutput={`数値:42
3 + 4 = 7
2, 4, 6, 8, 10
4は偶数: True
7は偶数: False`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="delegates" lessonId="action-func" />
      </div>
      <LessonNav lessons={lessons} currentId="action-func" basePath="/learn/delegates" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("delegates");

export default function LambdaPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">デリゲート・イベント レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ラムダ式</h1>
        <p className="text-gray-400">=&gt;構文・式ラムダ・文ラムダ・クロージャを理解しましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ラムダ式とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ラムダ式は無名メソッド（名前のないメソッド）をインラインで記述する構文です。
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">=&gt;</code>（ラムダ演算子）の左側に引数、右側に本体を書きます。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li>式ラムダ: <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">x =&gt; x * 2</code>（単一式）</li>
          <li>文ラムダ: <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">x =&gt; {"{ return x * 2; }"}</code>（ブロック）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">式ラムダと文ラムダ</h2>
        <p className="text-gray-400 mb-4">
          シンプルな処理は式ラムダ、複数ステートメントは文ラムダを使います。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        // 式ラムダ（単一式）
        Func<int, int> square = x => x * x;
        Console.WriteLine($"5の二乗: {square(5)}");

        // 引数なし
        Action greet = () => Console.WriteLine("こんにちは！");
        greet();

        // 複数引数
        Func<int, int, string> compare = (a, b) =>
            a > b ? $"{a}の方が大きい" : $"{b}の方が大きいか等しい";
        Console.WriteLine(compare(5, 3));

        // 文ラムダ（複数ステートメント）
        Func<List<int>, int> sumEven = numbers =>
        {
            int total = 0;
            foreach (var n in numbers)
                if (n % 2 == 0) total += n;
            return total;
        };
        Console.WriteLine($"偶数の合計: {sumEven(new List<int> { 1,2,3,4,5,6 })}");
    }
}`}
          expectedOutput={`5の二乗: 25
こんにちは！
5の方が大きい
偶数の合計: 12`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">クロージャ（変数のキャプチャ）</h2>
        <p className="text-gray-400 mb-4">
          ラムダ式は外側のスコープの変数を「キャプチャ」できます。これをクロージャと言います。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int multiplier = 3; // 外側の変数

        // ラムダが外側の変数をキャプチャ
        Func<int, int> times = x => x * multiplier;
        Console.WriteLine($"5 × {multiplier} = {times(5)}");

        multiplier = 5; // 外側の変数を変更
        Console.WriteLine($"5 × {multiplier} = {times(5)}"); // キャプチャは参照

        // クロージャでカウンター
        int count = 0;
        Action increment = () => count++;
        increment();
        increment();
        increment();
        Console.WriteLine($"カウント: {count}");

        // ファクトリパターン
        Func<int, Func<int, int>> makeAdder = n => x => x + n;
        var add5 = makeAdder(5);
        var add10 = makeAdder(10);
        Console.WriteLine($"add5(3) = {add5(3)}");
        Console.WriteLine($"add10(3) = {add10(3)}");
    }
}`}
          expectedOutput={`5 × 3 = 15
5 × 5 = 25
カウント: 3
add5(3) = 8
add10(3) = 13`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="delegates" lessonId="lambda" />
      </div>
      <LessonNav lessons={lessons} currentId="lambda" basePath="/learn/delegates" />
    </div>
  );
}

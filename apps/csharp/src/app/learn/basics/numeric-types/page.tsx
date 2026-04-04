import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function NumericTypesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">C#基礎 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">数値型</h1>
        <p className="text-gray-400">int・long・float・double・decimalの違いと使い分けを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">整数型の種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C#には複数の整数型があり、扱える値の範囲が異なります。最もよく使うのは
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">int</code>（32ビット整数）です。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-300">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 pr-4 text-purple-400">型</th>
                <th className="text-left py-2 pr-4 text-purple-400">サイズ</th>
                <th className="text-left py-2 text-purple-400">範囲</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              <tr><td className="py-2 pr-4"><code className="text-purple-400">byte</code></td><td className="py-2 pr-4">8bit</td><td className="py-2">0 〜 255</td></tr>
              <tr><td className="py-2 pr-4"><code className="text-purple-400">short</code></td><td className="py-2 pr-4">16bit</td><td className="py-2">-32,768 〜 32,767</td></tr>
              <tr><td className="py-2 pr-4"><code className="text-purple-400">int</code></td><td className="py-2 pr-4">32bit</td><td className="py-2">約 ±21億</td></tr>
              <tr><td className="py-2 pr-4"><code className="text-purple-400">long</code></td><td className="py-2 pr-4">64bit</td><td className="py-2">約 ±922京</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">整数型の使い方</h2>
        <p className="text-gray-400 mb-4">各整数型のリテラルと最大値・最小値を確認しましょう。</p>
        <CSharpEditor
          defaultCode={`// 整数型
int population = 1_000_000;  // アンダースコアで区切り可能
long nationalDebt = 1_000_000_000_000L;  // Lサフィックスでlong
byte smallValue = 255;

Console.WriteLine($"人口: {population:N0}");
Console.WriteLine($"国債: {nationalDebt:N0}");
Console.WriteLine($"最大値 int: {int.MaxValue}");
Console.WriteLine($"最大値 long: {long.MaxValue}");

// 16進数・2進数リテラル
int hex = 0xFF;      // 16進数
int binary = 0b1010; // 2進数
Console.WriteLine($"0xFF = {hex}");
Console.WriteLine($"0b1010 = {binary}");`}
          expectedOutput={`人口: 1,000,000
国債: 1,000,000,000,000
最大値 int: 2147483647
最大値 long: 9223372036854775807
0xFF = 255
0b1010 = 10`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">浮動小数点型と decimal</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          小数を扱う型は3種類あります。
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">float</code>（32bit）と
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">double</code>（64bit）は2進数浮動小数点で、精度に限界があります。
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">decimal</code>（128bit）は10進数演算で、金融計算に適しています。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">浮動小数点の精度の違い</h2>
        <p className="text-gray-400 mb-4">doubleとdecimalの精度の違いを実際に確認しましょう。</p>
        <CSharpEditor
          defaultCode={`// float: Fサフィックス
float f = 0.1f + 0.2f;
// double: デフォルト
double d = 0.1 + 0.2;
// decimal: Mサフィックス（金融計算用）
decimal m = 0.1m + 0.2m;

Console.WriteLine($"float:   {f}");
Console.WriteLine($"double:  {d}");
Console.WriteLine($"decimal: {m}");

// 金融計算での使い分け
decimal price = 1980.00m;
decimal taxRate = 0.10m;
decimal tax = price * taxRate;
decimal total = price + tax;
Console.WriteLine($"価格: {price:C}");
Console.WriteLine($"税: {tax:C}");
Console.WriteLine($"合計: {total:C}");`}
          expectedOutput={`float:   0.3
double:  0.30000000000000004
decimal: 0.3
価格: ¥1,980
税: ¥198.0
合計: ¥2,178.0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="numeric-types" />
      </div>
      <LessonNav lessons={lessons} currentId="numeric-types" basePath="/learn/basics" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function InterpolationPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">文字列操作 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字列補間</h1>
        <p className="text-gray-400">$&quot;Hello {"{name}"}&quot; による文字列の埋め込み、書式指定子、アライメントの活用</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">文字列補間とは</h2>
        <p className="text-gray-400 mb-3">
          C# 6 で導入された文字列補間は、<code className="text-cyan-400">$&quot;...&quot;</code> 記号を文字列の前に付けることで、
          中括弧 <code className="text-cyan-400">{"{式}"}</code> の中に変数や式を直接埋め込める機能です。
        </p>
        <p className="text-gray-400">
          従来の <code className="text-cyan-400">string.Format(&quot;{"{0}"} さん&quot;, name)</code> より読みやすく、
          コンパイル時に型チェックが行われるため安全です。コンパイル後は string.Format に変換されます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">基本的な書式指定子</h2>
        <p className="text-gray-400 mb-4">
          中括弧内でコロン <code className="text-cyan-400">:</code> に続けて書式指定子を書くことで、数値・日付の表示形式を制御できます。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    static void Main()
    {
        double price = 1234567.89;
        double ratio = 0.1234;
        DateTime dt = new DateTime(2025, 4, 1, 15, 30, 0);

        // 数値書式
        Console.WriteLine($"通貨: {price:C}");        // 通貨形式
        Console.WriteLine($"固定小数点: {price:F2}"); // 小数点2桁
        Console.WriteLine($"指数: {price:E2}");       // 指数表記
        Console.WriteLine($"パーセント: {ratio:P1}"); // パーセント1桁

        // 日付書式
        Console.WriteLine($"日付: {dt:yyyy年MM月dd日}");
        Console.WriteLine($"時刻: {dt:HH:mm}");
        Console.WriteLine($"長い形式: {dt:F}");
    }
}`}
          expectedOutput={`通貨: ¥1,234,568
固定小数点: 1234567.89
指数: 1.23E+006
パーセント: 12.3%
日付: 2025年04月01日
時刻: 15:30
長い形式: 2025年4月1日 15:30:00`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">アライメントと幅指定</h2>
        <p className="text-gray-400 mb-4">
          コンマ <code className="text-cyan-400">,</code> に続けて整数を指定すると、最小表示幅を設定できます。
          正の値は右揃え、負の値は左揃えになります。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    static void Main()
    {
        // テーブル風の表示
        Console.WriteLine($"{"商品",-10} {"数量",5} {"単価",8}");
        Console.WriteLine(new string('-', 25));

        string[] products = { "りんご", "バナナ", "みかん" };
        int[] quantities = { 100, 50, 200 };
        double[] prices = { 150.0, 80.0, 120.0 };

        for (int i = 0; i < products.Length; i++)
        {
            Console.WriteLine($"{products[i],-10} {quantities[i],5} {prices[i],8:F0}円");
        }
    }
}`}
          expectedOutput={`商品          数量       単価
-------------------------
りんご        100      150円
バナナ         50       80円
みかん        200      120円`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">式と条件の埋め込み</h2>
        <p className="text-gray-400 mb-4">
          補間文字列の中括弧内には変数だけでなく、メソッド呼び出し・三項演算子などの式も書けます。
          複雑なロジックは別の変数に切り出すのが読みやすいコードの鉄則です。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    static void Main()
    {
        int score = 85;
        string name = "田中";

        // 三項演算子を埋め込む
        Console.WriteLine($"{name}さんの成績: {score}点 ({(score >= 60 ? "合格" : "不合格")})");

        // メソッド呼び出し
        string raw = "  c# programming  ";
        Console.WriteLine($"整形: '{raw.Trim().ToUpper()}'");

        // 数値計算
        int width = 10, height = 5;
        Console.WriteLine($"面積: {width * height}、周囲: {2 * (width + height)}");
    }
}`}
          expectedOutput={`田中さんの成績: 85点 (合格)
整形: 'C# PROGRAMMING'
面積: 50、周囲: 30`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="interpolation" />
      </div>
      <LessonNav lessons={lessons} currentId="interpolation" basePath="/learn/strings" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function VarInferencePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">C#基礎 レッスン9</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">var推論</h1>
        <p className="text-gray-400">varキーワードによる暗黙的型付けと、適切な使いどころを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">var キーワードとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">var</code> を使うと、
          コンパイラが初期化式から型を自動的に推論します。
          JavaScriptの <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">var</code> とは異なり、
          C#の <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">var</code> は
          <strong className="text-white">完全に型安全</strong>です。コンパイル時に型が確定し、実行後に型が変わることはありません。
        </p>
        <p className="text-gray-300 leading-relaxed">
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">var</code> は初期化式がある場合のみ使えます。
          宣言だけで初期化しない変数には使えません。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">var の基本的な使い方</h2>
        <p className="text-gray-400 mb-4">型が明らかな場合にvarを使うとコードがすっきりします。</p>
        <CSharpEditor
          defaultCode={`// var による型推論
var name = "田中";        // string と推論
var age = 30;            // int と推論
var price = 99.99;       // double と推論
var isActive = true;     // bool と推論

Console.WriteLine($"{name} ({name.GetType().Name})");
Console.WriteLine($"{age} ({age.GetType().Name})");
Console.WriteLine($"{price} ({price.GetType().Name})");
Console.WriteLine($"{isActive} ({isActive.GetType().Name})");

// 型は一度決まると変更できない
var count = 0;
count = 10;     // OK
// count = "hello"; // エラー：string は int に代入不可
Console.WriteLine($"count = {count}");`}
          expectedOutput={`田中 (String)
30 (Int32)
99.99 (Double)
True (Boolean)
count = 10`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">varを使うべき場面・避けるべき場面</h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-gray-900 rounded-lg">
            <p className="text-green-400 font-semibold mb-2">使うとよい場面</p>
            <ul className="text-gray-300 space-y-1.5">
              <li>new式で型が明らか：<code className="text-purple-400">var list = new List&lt;string&gt;()</code></li>
              <li>LINQ結果の匿名型</li>
              <li>型名が長くて冗長な場合</li>
              <li>foreach のループ変数</li>
            </ul>
          </div>
          <div className="p-3 bg-gray-900 rounded-lg">
            <p className="text-red-400 font-semibold mb-2">避けるべき場面</p>
            <ul className="text-gray-300 space-y-1.5">
              <li>型が読者に明らかでない場合</li>
              <li>数値リテラル（intかdoubleか曖昧）</li>
              <li>メソッドの戻り値（型が見えない）</li>
              <li>チームの規約に反する場合</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">varの適切な使い方</h2>
        <p className="text-gray-400 mb-4">newでインスタンスを作成するときはvarが最もわかりやすいです。</p>
        <CSharpEditor
          defaultCode={`using System.Collections.Generic;

// new式ではvar推奨（型名の重複を避ける）
var numbers = new List<int> { 1, 2, 3, 4, 5 };
var dict = new Dictionary<string, int>();

dict["apple"] = 100;
dict["banana"] = 200;

// foreachでもvar
foreach (var num in numbers)
{
    Console.Write($"{num} ");
}
Console.WriteLine();

foreach (var pair in dict)
{
    Console.WriteLine($"{pair.Key}: {pair.Value}");
}`}
          expectedOutput={`1 2 3 4 5
apple: 100
banana: 200`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="var-inference" />
      </div>
      <LessonNav lessons={lessons} currentId="var-inference" basePath="/learn/basics" />
    </div>
  );
}

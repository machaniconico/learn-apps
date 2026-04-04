import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function ArraysBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">配列・リスト レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">配列の基本</h1>
        <p className="text-gray-400">{"int[] arr"} の宣言、new int[5]、初期化、インデックスアクセスを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">配列とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          配列は同じ型のデータを連続したメモリ領域に格納するデータ構造です。
          C# の配列は<strong className="text-white">固定サイズ</strong>で、作成後にサイズは変更できません。
          各要素は 0 始まりのインデックスでアクセスします。
        </p>
        <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {[85, 72, 91, 68, 95].map((val, idx) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 bg-orange-500/20 border border-orange-500/50 rounded flex items-center justify-center text-orange-300 font-mono font-bold">
                  {val}
                </div>
                <div className="text-xs text-gray-500 mt-1">[{idx}]</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">int[] scores = {"{85, 72, 91, 68, 95}"};</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列の宣言・初期化・アクセス</h2>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    static void Main()
    {
        // 方法1: サイズを指定して作成（デフォルト値で初期化）
        int[] arr1 = new int[5];
        Console.WriteLine($"arr1[0] = {arr1[0]}");  // 0（デフォルト）

        // 方法2: 初期値を指定
        int[] arr2 = new int[] { 10, 20, 30, 40, 50 };

        // 方法3: 型推論（new int[] を省略）
        int[] arr3 = { 1, 2, 3, 4, 5 };

        // インデックスアクセス
        Console.WriteLine($"arr2[0] = {arr2[0]}");  // 最初の要素
        Console.WriteLine($"arr2[4] = {arr2[4]}");  // 最後の要素
        Console.WriteLine($"arr2.Length = {arr2.Length}");

        // 要素の変更
        arr2[2] = 99;
        Console.WriteLine($"arr2[2] を変更後: {arr2[2]}");

        // 末尾要素へのアクセス（^ インデックス演算子）
        Console.WriteLine($"末尾: {arr2[^1]}");
        Console.WriteLine($"末尾から2番目: {arr2[^2]}");
    }
}`}
          expectedOutput={`arr1[0] = 0
arr2[0] = 10
arr2[4] = 50
arr2.Length = 5
arr2[2] を変更後: 99
末尾: 50
末尾から2番目: 40`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列のループ処理</h2>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    static void Main()
    {
        string[] fruits = { "りんご", "バナナ", "みかん", "ぶどう", "いちご" };

        // for ループ（インデックス付き）
        Console.WriteLine("for ループ:");
        for (int i = 0; i < fruits.Length; i++)
        {
            Console.WriteLine($"  [{i}] {fruits[i]}");
        }

        // foreach ループ（シンプル）
        Console.WriteLine("foreach ループ:");
        foreach (string fruit in fruits)
        {
            Console.WriteLine($"  - {fruit}");
        }

        // 合計・平均の計算
        double[] temps = { 23.5, 25.1, 21.8, 28.3, 24.7 };
        double sum = 0;
        foreach (double t in temps) sum += t;
        Console.WriteLine($"平均気温: {sum / temps.Length:F1}℃");
    }
}`}
          expectedOutput={`for ループ:
  [0] りんご
  [1] バナナ
  [2] みかん
  [3] ぶどう
  [4] いちご
foreach ループ:
  - りんご
  - バナナ
  - みかん
  - ぶどう
  - いちご
平均気温: 24.7℃`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/arrays" />
    </div>
  );
}

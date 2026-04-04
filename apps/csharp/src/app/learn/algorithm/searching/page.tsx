import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algorithm");

export default function AlgorithmSearchingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">アルゴリズム レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">探索アルゴリズム</h1>
        <p className="text-gray-400">線形探索、二分探索、Array.BinarySearchを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">線形探索 vs 二分探索</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          線形探索はO(n)で先頭から順番に探します。二分探索はO(log n)で毎回探索範囲を半分に絞ります。ただし二分探索は<strong className="text-white">ソート済みの配列</strong>にのみ使えます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">線形探索と二分探索の実装</h2>
        <p className="text-gray-400 mb-4">それぞれのアルゴリズムを実装して比較します。</p>
        <CSharpEditor
          defaultCode={`// 線形探索: O(n)
int LinearSearch(int[] arr, int target)
{
    for (int i = 0; i < arr.Length; i++)
    {
        if (arr[i] == target) return i;
    }
    return -1; // 見つからない
}

// 二分探索: O(log n) - ソート済み配列が必要
int BinarySearch(int[] arr, int target)
{
    int left = 0, right = arr.Length - 1;

    while (left <= right)
    {
        int mid = left + (right - left) / 2; // オーバーフロー対策

        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left  = mid + 1; // 右半分を探索
        else                        right = mid - 1; // 左半分を探索
    }
    return -1;
}

// テスト
int[] sorted = { 2, 5, 8, 12, 16, 23, 38, 56, 72, 91 };

Console.WriteLine($"配列: [{string.Join(", ", sorted)}]");
Console.WriteLine();

int[] targets = { 23, 100, 2, 91 };
foreach (int t in targets)
{
    int linearIdx  = LinearSearch(sorted, t);
    int binaryIdx  = BinarySearch(sorted, t);
    int builtInIdx = Array.BinarySearch(sorted, t);

    Console.WriteLine($"探索値 {t,3}: 線形={linearIdx,2}  二分={binaryIdx,2}  BinarySearch={builtInIdx,2}");
}

Console.WriteLine();
Console.WriteLine("1000万件での比較:");
Console.WriteLine("  線形探索: 最大1000万回の比較");
Console.WriteLine("  二分探索: 最大24回の比較 (log₂(10,000,000) ≈ 23.25)");`}
          expectedOutput={`配列: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]

探索値  23: 線形= 5  二分= 5  BinarySearch= 5
探索値 100: 線形=-1  二分=-1  BinarySearch=-1
探索値   2: 線形= 0  二分= 0  BinarySearch= 0
探索値  91: 線形= 9  二分= 9  BinarySearch= 9

1000万件での比較:
  線形探索: 最大1000万回の比較
  二分探索: 最大24回の比較 (log₂(10,000,000) ≈ 23.25)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実用的な探索（LINQ）</h2>
        <p className="text-gray-400 mb-4">C#では多くの場合LINQで探索を行います。</p>
        <CSharpEditor
          defaultCode={`// 実用的な探索パターン
var products = new[]
{
    new { Id = 1, Name = "商品A", Price = 1000, Category = "電子機器" },
    new { Id = 2, Name = "商品B", Price = 500,  Category = "食品" },
    new { Id = 3, Name = "商品C", Price = 2000, Category = "電子機器" },
    new { Id = 4, Name = "商品D", Price = 750,  Category = "衣類" },
    new { Id = 5, Name = "商品E", Price = 1500, Category = "電子機器" },
};

// 最初のマッチ
var firstExpensive = products.FirstOrDefault(p => p.Price >= 1000);
Console.WriteLine($"1000円以上の最初の商品: {firstExpensive?.Name}");

// 条件に合う全件
var electronics = products.Where(p => p.Category == "電子機器").ToArray();
Console.WriteLine($"電子機器: {string.Join(", ", electronics.Select(p => p.Name))}");

// 含まれるか確認
bool hasFood = products.Any(p => p.Category == "食品");
Console.WriteLine($"食品カテゴリあり: {hasFood}");

// 最小・最大
var cheapest = products.MinBy(p => p.Price);
var mostExpensive = products.MaxBy(p => p.Price);
Console.WriteLine($"最安値: {cheapest?.Name} ¥{cheapest?.Price}");
Console.WriteLine($"最高値: {mostExpensive?.Name} ¥{mostExpensive?.Price}");`}
          expectedOutput={`1000円以上の最初の商品: 商品A
電子機器: 商品A, 商品C, 商品E
食品カテゴリあり: True
最安値: 商品B ¥500
最高値: 商品C ¥2000`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="algorithm" lessonId="searching" />
      </div>
      <LessonNav lessons={lessons} currentId="searching" basePath="/learn/algorithm" />
    </div>
  );
}

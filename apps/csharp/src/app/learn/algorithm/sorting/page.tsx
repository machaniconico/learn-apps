import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algorithm");

export default function AlgorithmSortingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">アルゴリズム レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ソートアルゴリズム</h1>
        <p className="text-gray-400">バブルソート、マージソート、クイックソート、Array.Sortを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ソートアルゴリズムの比較</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ソートは最もよく使われるアルゴリズムの一つです。アルゴリズムを実装して理解することで、計算量の概念や分割統治法などの重要な考え方を身につけられます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">バブルソート O(n²)</h2>
        <p className="text-gray-400 mb-4">隣接する要素を比較・交換する最も単純なソートです。</p>
        <CSharpEditor
          defaultCode={`// バブルソートの実装
int[] BubbleSort(int[] arr)
{
    int[] result = (int[])arr.Clone();
    int n = result.Length;

    for (int i = 0; i < n - 1; i++)
    {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++)
        {
            if (result[j] > result[j + 1])
            {
                // 隣接要素を交換
                (result[j], result[j + 1]) = (result[j + 1], result[j]);
                swapped = true;
            }
        }
        // 交換がなければすでにソート済み
        if (!swapped) break;
    }
    return result;
}

int[] data = { 64, 34, 25, 12, 22, 11, 90 };
Console.WriteLine($"元の配列: [{string.Join(", ", data)}]");

int[] sorted = BubbleSort(data);
Console.WriteLine($"ソート後: [{string.Join(", ", sorted)}]");

Console.WriteLine();
Console.WriteLine("バブルソートの特徴:");
Console.WriteLine("  時間計算量: O(n²) - 二重ループ");
Console.WriteLine("  空間計算量: O(1) - インプレース");
Console.WriteLine("  安定ソート: はい（等値要素の順序保持）");`}
          expectedOutput={`元の配列: [64, 34, 25, 12, 22, 11, 90]
ソート後: [11, 12, 22, 25, 34, 64, 90]

バブルソートの特徴:
  時間計算量: O(n²) - 二重ループ
  空間計算量: O(1) - インプレース
  安定ソート: はい（等値要素の順序保持）`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">マージソート O(n log n)</h2>
        <p className="text-gray-400 mb-4">分割統治法を使った効率的なソートです。</p>
        <CSharpEditor
          defaultCode={`// マージソートの実装（分割統治法）
int[] MergeSort(int[] arr)
{
    if (arr.Length <= 1) return arr;

    // 配列を半分に分割
    int mid = arr.Length / 2;
    int[] left  = MergeSort(arr[..mid]);
    int[] right = MergeSort(arr[mid..]);

    // マージ（統合）
    return Merge(left, right);
}

int[] Merge(int[] left, int[] right)
{
    int[] result = new int[left.Length + right.Length];
    int i = 0, j = 0, k = 0;

    while (i < left.Length && j < right.Length)
    {
        if (left[i] <= right[j])
            result[k++] = left[i++];
        else
            result[k++] = right[j++];
    }

    // 残りをコピー
    while (i < left.Length)  result[k++] = left[i++];
    while (j < right.Length) result[k++] = right[j++];

    return result;
}

int[] data = { 38, 27, 43, 3, 9, 82, 10 };
Console.WriteLine($"元: [{string.Join(", ", data)}]");
int[] sorted = MergeSort(data);
Console.WriteLine($"マージソート後: [{string.Join(", ", sorted)}]");

// 実用: Array.Sort（TimSort = マージ+挿入の組み合わせ）
int[] arr2 = { 64, 34, 25, 12, 22, 11, 90 };
Array.Sort(arr2);
Console.WriteLine($"Array.Sort: [{string.Join(", ", arr2)}]");`}
          expectedOutput={`元: [38, 27, 43, 3, 9, 82, 10]
マージソート後: [3, 9, 10, 27, 38, 43, 82]
Array.Sort: [11, 12, 22, 25, 34, 64, 90]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="algorithm" lessonId="sorting" />
      </div>
      <LessonNav lessons={lessons} currentId="sorting" basePath="/learn/algorithm" />
    </div>
  );
}

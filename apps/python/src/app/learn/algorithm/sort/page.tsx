import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algorithm");

export default function AlgorithmSortPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">アルゴリズム レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ソートアルゴリズム</h1>
        <p className="text-gray-400">バブル・マージ・クイックソートの仕組みと実装</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">主要なソートアルゴリズムの比較</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-300">アルゴリズム</th>
                <th className="text-left py-3 px-4 text-gray-300">平均計算量</th>
                <th className="text-left py-3 px-4 text-gray-300">最悪計算量</th>
                <th className="text-left py-3 px-4 text-gray-300">空間計算量</th>
                <th className="text-left py-3 px-4 text-gray-300">安定性</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {[
                { name: "バブルソート", avg: "O(n²)", worst: "O(n²)", space: "O(1)", stable: "安定" },
                { name: "選択ソート", avg: "O(n²)", worst: "O(n²)", space: "O(1)", stable: "不安定" },
                { name: "挿入ソート", avg: "O(n²)", worst: "O(n²)", space: "O(1)", stable: "安定" },
                { name: "マージソート", avg: "O(n log n)", worst: "O(n log n)", space: "O(n)", stable: "安定" },
                { name: "クイックソート", avg: "O(n log n)", worst: "O(n²)", space: "O(log n)", stable: "不安定" },
                { name: "Timsort (Python組み込み)", avg: "O(n log n)", worst: "O(n log n)", space: "O(n)", stable: "安定" },
              ].map((row) => (
                <tr key={row.name} className="hover:bg-gray-800/30">
                  <td className="py-3 px-4 text-gray-200">{row.name}</td>
                  <td className="py-3 px-4"><code className="text-yellow-400 font-mono text-xs">{row.avg}</code></td>
                  <td className="py-3 px-4"><code className="text-red-400 font-mono text-xs">{row.worst}</code></td>
                  <td className="py-3 px-4"><code className="text-blue-400 font-mono text-xs">{row.space}</code></td>
                  <td className="py-3 px-4 text-gray-400 text-xs">{row.stable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">バブルソートの仕組み</h2>
        <p className="text-gray-300 mb-4">
          隣り合う要素を比較して、大きい方を後ろに移動させる操作を繰り返します。
          1パスごとに最大値が末尾に「泡のように」浮かび上がります。
          シンプルですが <code className="bg-gray-800 text-yellow-300 px-1 rounded">O(n²)</code> のため大きなデータには不向きです。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">マージソートの仕組み</h2>
        <p className="text-gray-300 mb-4">
          <strong className="text-white">分割統治法</strong>を使います。
          配列を半分に分割し続け、要素が1つになったら整列済みとみなします。
          その後2つの整列済み配列をマージする操作を繰り返します。
          常に <code className="bg-gray-800 text-yellow-300 px-1 rounded">O(n log n)</code> で安定しています。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">ソートアルゴリズムを実装して比較しよう</h2>
        <PythonPlayground
          defaultCode={`import random
import time

def bubble_sort(arr):
    """バブルソート O(n²)"""
    arr = arr.copy()
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:  # 交換なしなら既にソート済み
            break
    return arr

def merge_sort(arr):
    """マージソート O(n log n)"""
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result

def quick_sort(arr):
    """クイックソート 平均O(n log n)"""
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

# ベンチマーク
data = [random.randint(1, 10000) for _ in range(1000)]

algorithms = [
    ("バブルソート", bubble_sort),
    ("マージソート", merge_sort),
    ("クイックソート", quick_sort),
    ("Python組み込み", lambda a: sorted(a)),
]

print("n=1000 のソート時間比較")
print("-" * 40)
for name, func in algorithms:
    start = time.perf_counter()
    result = func(data)
    elapsed = (time.perf_counter() - start) * 1000
    correct = result == sorted(data)
    print(f"{name:<18} {elapsed:>7.2f}ms {'OK' if correct else 'NG'}")

# 少量データで動作確認
sample = [64, 34, 25, 12, 22, 11, 90]
print(f"\\n元データ: {sample}")
print(f"バブル:   {bubble_sort(sample)}")
print(f"マージ:   {merge_sort(sample)}")
print(f"クイック: {quick_sort(sample)}")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="algorithm" lessonId="sort" />
      </div>
      <LessonNav lessons={lessons} currentId="sort" basePath="/learn/algorithm" />
    </div>
  );
}

import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const lessons = CATEGORIES.find((c) => c.id === "algorithms")!.lessons;

export default function SearchingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">アルゴリズム</span>
        <h1 className="text-3xl font-bold text-gray-100">探索アルゴリズム</h1>
        <p className="text-gray-400">線形探索と二分探索の実装と比較を学びましょう。</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <p>
          探索アルゴリズムはデータの集合から目的の値を見つける手順です。
          <strong>線形探索</strong>はO(n)で全要素を順番に確認し、<strong>二分探索</strong>はO(log n)で
          ソート済み配列を高速に検索します。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`// 線形探索 O(n) - ソート不要
func linearSearch<T: Equatable>(_ array: [T], target: T) -> Int? {
    for (index, element) in array.enumerated() {
        if element == target {
            return index
        }
    }
    return nil
}

let nums = [3, 1, 4, 1, 5, 9, 2, 6, 5]
if let idx = linearSearch(nums, target: 9) {
    print("Found 9 at index \\(idx)")  // Found 9 at index 5
}
if linearSearch(nums, target: 7) == nil {
    print("7 not found")  // 7 not found
}`}
        height="220px"
        expectedOutput="Found 9 at index 5\n7 not found"
      />

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <h2 className="text-xl font-semibold text-gray-100">二分探索 O(log n)</h2>
        <p>
          配列がソート済みであることを前提に、中央値と比較して探索範囲を半分に絞り込みます。
          100万要素でも最大20回程度の比較で見つかります。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`// 二分探索 O(log n) - ソート済み配列が前提
func binarySearch<T: Comparable>(_ array: [T], target: T) -> Int? {
    var low = 0
    var high = array.count - 1

    while low <= high {
        let mid = low + (high - low) / 2  // オーバーフロー対策
        if array[mid] == target {
            return mid
        } else if array[mid] < target {
            low = mid + 1
        } else {
            high = mid - 1
        }
    }
    return nil
}

let sorted = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
if let idx = binarySearch(sorted, target: 23) {
    print("Found 23 at index \\(idx)")  // Found 23 at index 5
}

// 探索ステップ数の比較
// 配列サイズ: 10
// 線形探索最大: 10回
// 二分探索最大: 4回 (log2(10) ≈ 3.32)
print("Binary search steps (max):", Int(log2(Double(sorted.count))) + 1)`}
        height="280px"
        expectedOutput="Found 23 at index 5\nBinary search steps (max): 4"
      />

      <SwiftEditor
        defaultCode={`// 再帰版二分探索
func binarySearchRecursive<T: Comparable>(
    _ array: [T],
    target: T,
    low: Int = 0,
    high: Int? = nil
) -> Int? {
    let hi = high ?? array.count - 1
    guard low <= hi else { return nil }

    let mid = low + (hi - low) / 2
    if array[mid] == target {
        return mid
    } else if array[mid] < target {
        return binarySearchRecursive(array, target: target, low: mid + 1, high: hi)
    } else {
        return binarySearchRecursive(array, target: target, low: low, high: mid - 1)
    }
}

// Swiftの標準ライブラリには firstIndex(of:) がある
let fruits = ["apple", "banana", "cherry", "date"]
if let idx = fruits.firstIndex(of: "cherry") {
    print("cherry at \\(idx)")  // cherry at 2
}
// コレクションが Comparable なら binarySearch を使うか
// sorted() してから二分探索するのが効率的`}
        height="280px"
        expectedOutput="cherry at 2"
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="algorithms" lessonId="searching" />
      </div>
      <LessonNav lessons={lessons} currentId="searching" basePath="/learn/algorithms" />
    </div>
  );
}

import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const lessons = CATEGORIES.find((c) => c.id === "algorithms")!.lessons;

export default function SortingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">アルゴリズム</span>
        <h1 className="text-3xl font-bold text-gray-100">ソートアルゴリズム</h1>
        <p className="text-gray-400">バブル・クイック・マージソートをSwiftで実装しましょう。</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <p>
          ソートアルゴリズムはデータを特定の順序に並べ替える手順です。
          計算量・安定性・メモリ使用量など特性が異なるアルゴリズムを理解することで、
          適切な選択ができるようになります。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`// バブルソート O(n²)
func bubbleSort<T: Comparable>(_ array: [T]) -> [T] {
    var arr = array
    let n = arr.count
    for i in 0..<n {
        var swapped = false
        for j in 0..<(n - i - 1) {
            if arr[j] > arr[j + 1] {
                arr.swapAt(j, j + 1)
                swapped = true
            }
        }
        if !swapped { break }  // 最適化：交換なし=ソート済み
    }
    return arr
}

let nums = [64, 34, 25, 12, 22, 11, 90]
print(bubbleSort(nums))
// [11, 12, 22, 25, 34, 64, 90]

// 文字列も同様にソートできる（Comparable準拠）
let words = ["banana", "apple", "cherry"]
print(bubbleSort(words))
// ["apple", "banana", "cherry"]`}
        height="280px"
        expectedOutput={"[11, 12, 22, 25, 34, 64, 90]\n[\"apple\", \"banana\", \"cherry\"]"}
      />

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <h2 className="text-xl font-semibold text-gray-100">クイックソート O(n log n) 平均</h2>
        <p>
          ピボットを選んで要素を分割する分割統治法です。平均O(n log n)と高速ですが、
          最悪ケースはO(n²)になることがあります。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`// クイックソート - 再帰的実装
func quickSort<T: Comparable>(_ array: [T]) -> [T] {
    guard array.count > 1 else { return array }

    let pivot = array[array.count / 2]
    let less    = array.filter { $0 < pivot }
    let equal   = array.filter { $0 == pivot }
    let greater = array.filter { $0 > pivot }

    return quickSort(less) + equal + quickSort(greater)
}

let data = [3, 6, 8, 10, 1, 2, 1]
print(quickSort(data))
// [1, 1, 2, 3, 6, 8, 10]`}
        height="220px"
        expectedOutput="[1, 1, 2, 3, 6, 8, 10]"
      />

      <SwiftEditor
        defaultCode={`// マージソート O(n log n) - 安定ソート
func mergeSort<T: Comparable>(_ array: [T]) -> [T] {
    guard array.count > 1 else { return array }

    let mid = array.count / 2
    let left  = mergeSort(Array(array[..<mid]))
    let right = mergeSort(Array(array[mid...]))

    return merge(left, right)
}

func merge<T: Comparable>(_ left: [T], _ right: [T]) -> [T] {
    var result: [T] = []
    var l = 0, r = 0

    while l < left.count && r < right.count {
        if left[l] <= right[r] {
            result.append(left[l]); l += 1
        } else {
            result.append(right[r]); r += 1
        }
    }
    return result + left[l...] + right[r...]
}

let arr = [38, 27, 43, 3, 9, 82, 10]
print(mergeSort(arr))
// [3, 9, 10, 27, 38, 43, 82]`}
        height="300px"
        expectedOutput="[3, 9, 10, 27, 38, 43, 82]"
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="algorithms" lessonId="sorting" />
      </div>
      <LessonNav lessons={lessons} currentId="sorting" basePath="/learn/algorithms" />
    </div>
  );
}

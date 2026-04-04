import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "generics")!.lessons;

export default function ConstraintsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">ジェネリクス レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">型制約</h1>
        <p className="text-gray-400">プロトコルを使って型パラメータに制約を付け、安全に演算を行います。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">型制約とは</h2>
        <p className="text-gray-300 mb-3">
          型制約は型パラメータが満たすべきプロトコルや基底クラスを指定します。
          <code className="text-blue-300">{"<T: Comparable>"}</code> のようにコロンで制約を付けると、
          その型パラメータに対してプロトコルのメソッドを呼び出せるようになります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">{"<T: Protocol>"}</code> — プロトコル準拠の制約</li>
          <li><code className="text-blue-300">{"<T: Class>"}</code> — 基底クラスの制約</li>
          <li>制約なしの型パラメータでは型固有の操作は不可</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: Comparable制約で比較演算</h2>
        <SwiftEditor
          defaultCode={`// Comparable制約で最大値・最小値・クランプ
func clamp<T: Comparable>(_ value: T, min minVal: T, max maxVal: T) -> T {
    if value < minVal { return minVal }
    if value > maxVal { return maxVal }
    return value
}

print(clamp(5, min: 1, max: 10))
print(clamp(-3, min: 0, max: 100))
print(clamp(150, min: 0, max: 100))
print(clamp("m", min: "a", max: "f"))

func isSorted<T: Comparable>(_ array: [T]) -> Bool {
    guard array.count > 1 else { return true }
    for i in 0..<array.count-1 {
        if array[i] > array[i+1] { return false }
    }
    return true
}

print(isSorted([1, 2, 3, 4, 5]))
print(isSorted([1, 3, 2, 4]))`}
          expectedOutput={`5
0
100
f
true
false`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: Hashable・Numeric制約</h2>
        <SwiftEditor
          defaultCode={`// Hashable制約で頻度カウント
func frequencies<T: Hashable>(_ array: [T]) -> [T: Int] {
    var result: [T: Int] = [:]
    for item in array {
        result[item, default: 0] += 1
    }
    return result
}

let letters = ["a", "b", "a", "c", "b", "a"]
let freq = frequencies(letters)
print(freq["a"]!)
print(freq["b"]!)

// Numeric制約で合計・平均
func sum<T: Numeric>(_ array: [T]) -> T {
    array.reduce(0, +)
}

print(sum([1, 2, 3, 4, 5]))
print(sum([1.5, 2.5, 3.0]))`}
          expectedOutput={`3
2
15
7.0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="generics" lessonId="constraints" />
      </div>
      <LessonNav lessons={lessons} currentId="constraints" basePath="/learn/generics" />
    </div>
  );
}

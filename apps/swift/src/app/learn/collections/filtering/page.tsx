import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "collections")!.lessons;

export default function FilteringPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">コレクション レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">フィルタリング</h1>
        <p className="text-gray-400">filter・reduce・containsを使ったコレクションの絞り込みと集計を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">filterとreduce</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          条件に合う要素を取り出す <code className="text-green-300">filter</code> と、
          コレクションを1つの値に集約する <code className="text-green-300">reduce</code> は
          関数型プログラミングの基本パターンです。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-green-300">filter {"{ 条件 }"}</code> — 条件がtrueの要素だけを返す</li>
          <li><code className="text-green-300">reduce(初期値, 結合関数)</code> — 要素を累積して1つの値にする</li>
          <li><code className="text-green-300">contains(where:)</code> — 条件に合う要素があるか確認</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: filter と reduce</h2>
        <SwiftEditor
          defaultCode={`let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// filter: 偶数のみ
let evens = numbers.filter { $0 % 2 == 0 }
print("偶数: \\(evens)")

// reduce: 合計
let sum = numbers.reduce(0, +)
print("合計: \\(sum)")

// reduce: 最大値
let max = numbers.reduce(Int.min) { Swift.max($0, $1) }
print("最大値: \\(max)")

// reduce: 文字列の結合
let words = ["Swift", "is", "amazing"]
let sentence = words.reduce("") { $0.isEmpty ? $1 : $0 + " " + $1 }
print(sentence)`}
          expectedOutput={`偶数: [2, 4, 6, 8, 10]
合計: 55
最大値: 10
Swift is amazing`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">contains・allSatisfy・first</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          条件チェックのメソッドも重要です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-green-300">contains(where:)</code> — いずれかの要素が条件を満たすか</li>
          <li><code className="text-green-300">allSatisfy</code> — すべての要素が条件を満たすか</li>
          <li><code className="text-green-300">first(where:)</code> — 条件を満たす最初の要素</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 条件チェックメソッド</h2>
        <SwiftEditor
          defaultCode={`let scores = [85, 92, 78, 96, 71, 88]

// contains
print(scores.contains(where: { $0 >= 90 }))  // 90以上がある？

// allSatisfy
print(scores.allSatisfy { $0 >= 70 })  // 全員70以上？
print(scores.allSatisfy { $0 >= 80 })  // 全員80以上？

// first(where:)
if let firstHigh = scores.first(where: { $0 >= 90 }) {
    print("最初の90以上: \\(firstHigh)")
}

// 組み合わせ: 80以上の平均
let highScores = scores.filter { $0 >= 80 }
let avg = Double(highScores.reduce(0, +)) / Double(highScores.count)
print(String(format: "80以上の平均: %.1f", avg))`}
          expectedOutput={`true
true
false
最初の90以上: 92
80以上の平均: 90.2`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collections" lessonId="filtering" />
      </div>
      <LessonNav lessons={lessons} currentId="filtering" basePath="/learn/collections" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "basics")!.lessons;

export default function OperatorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">Swift基礎 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">演算子</h1>
        <p className="text-gray-400">算術・比較・論理演算子と、Swiftに特有の範囲演算子（..&lt;、...）を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">算術演算子</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          基本的な数値計算に使う演算子です。他の言語と同様の記法を使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">+</code> 加算、<code className="text-blue-300">-</code> 減算、<code className="text-blue-300">*</code> 乗算、<code className="text-blue-300">/</code> 除算</li>
          <li><code className="text-blue-300">%</code> 剰余（余り）</li>
          <li><code className="text-blue-300">+=</code>、<code className="text-blue-300">-=</code> などの複合代入演算子</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 算術・比較・論理演算子</h2>
        <SwiftEditor
          defaultCode={`// 算術演算子
let a = 10
let b = 3
print(a + b)   // 13
print(a - b)   // 7
print(a * b)   // 30
print(a / b)   // 3（整数除算）
print(a % b)   // 1（余り）

// 比較演算子
print(a > b)   // true
print(a == 10) // true
print(a != b)  // true

// 論理演算子
let x = true
let y = false
print(x && y)  // false
print(x || y)  // true
print(!x)      // false`}
          expectedOutput={`13
7
30
3
1
true
true
true
false
true
false`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">範囲演算子</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swiftには便利な範囲演算子があります。ループや配列のスライスで活用します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">1...5</code> — 閉じた範囲（1, 2, 3, 4, 5 を含む）</li>
          <li><code className="text-blue-300">1..&lt;5</code> — 半開き範囲（1, 2, 3, 4 を含む。5を含まない）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 範囲演算子</h2>
        <SwiftEditor
          defaultCode={`// 閉じた範囲演算子
for i in 1...5 {
    print(i, terminator: " ")
}
print("")

// 半開き範囲演算子
for i in 0..<3 {
    print("インデックス \\(i)")
}

// 範囲の確認
let range = 1...10
print(range.contains(5))   // true
print(range.contains(11))  // false`}
          expectedOutput={`1 2 3 4 5
インデックス 0
インデックス 1
インデックス 2
true
false`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="operators" />
      </div>
      <LessonNav lessons={lessons} currentId="operators" basePath="/learn/basics" />
    </div>
  );
}

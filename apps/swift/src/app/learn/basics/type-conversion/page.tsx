import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "basics")!.lessons;

export default function TypeConversionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">Swift基礎 レッスン11</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">型変換</h1>
        <p className="text-gray-400">Int()・Double()・String()などを使った明示的な型変換の方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">明示的な型変換</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swiftは暗黙的な型変換を行いません。異なる型の値を使うには明示的に変換する必要があります。
          これにより型安全性が保たれ、バグを防ぐことができます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">Int(value)</code> — 値をInt型に変換（失敗するとnil）</li>
          <li><code className="text-blue-300">Double(value)</code> — 値をDouble型に変換</li>
          <li><code className="text-blue-300">String(value)</code> — 値をString型に変換</li>
          <li><code className="text-blue-300">Bool(value)</code> — 値をBool型に変換</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 基本的な型変換</h2>
        <SwiftEditor
          defaultCode={`// Int と Double の変換
let intValue: Int = 42
let doubleValue: Double = Double(intValue)
print("Int → Double: \\(doubleValue)")

let pi: Double = 3.14
let truncated: Int = Int(pi)  // 小数点以下切り捨て
print("Double → Int: \\(truncated)")

// 数値 → 文字列
let number = 100
let str = String(number)
print("型: \\(type(of: str)), 値: \\(str)")

// 文字列 → 数値（Optional）
let text = "123"
if let parsed = Int(text) {
    print("解析成功: \\(parsed)")
}

let invalid = "abc"
if let parsed = Int(invalid) {
    print("解析成功: \\(parsed)")
} else {
    print("解析失敗")`}
          expectedOutput={`Int → Double: 42.0
Double → Int: 3
型: String, 値: 100
解析成功: 123
解析失敗`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">型変換が必要な場面</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swiftでは異なる型同士の演算はコンパイルエラーになります。
          計算前に必ず型を揃える必要があります。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 演算時の型変換</h2>
        <SwiftEditor
          defaultCode={`let items: Int = 5
let price: Double = 1980.0

// Int と Double を演算するには変換が必要
let total = Double(items) * price
print("合計: \\(total)円")

// 文字列への変換と連結
let score = 95
let message = "スコア: " + String(score) + "点"
print(message)

// 数値フォーマット
let ratio = 0.8765
print(String(format: "達成率: %.1f%%", ratio * 100))`}
          expectedOutput={`合計: 9900.0円
スコア: 95点
達成率: 87.6%`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="type-conversion" />
      </div>
      <LessonNav lessons={lessons} currentId="type-conversion" basePath="/learn/basics" />
    </div>
  );
}

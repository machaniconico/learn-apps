import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "strings")!.lessons;

export default function InterpolationPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">文字列操作 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字列補間</h1>
        <p className="text-gray-400">\()構文で文字列に値や式を埋め込む文字列補間を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">文字列補間とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          文字列補間（String Interpolation）は文字列リテラルの中に
          <code className="text-purple-300">\(式)</code> の形式で値や式を埋め込む機能です。
          文字列の連結より読みやすく、あらゆる型の値を埋め込めます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>変数・定数・式・関数呼び出しが使える</li>
          <li>Swiftのあらゆる型（CustomStringConvertible準拠）が使える</li>
          <li>ネストも可能（ただし推奨しない）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 文字列補間の基本</h2>
        <SwiftEditor
          defaultCode={`let name = "Swift"
let version = 5.9
let year = 2014

// 変数の埋め込み
print("\\(name) バージョン \\(version)")

// 式の埋め込み
let a = 10
let b = 3
print("\\(a) + \\(b) = \\(a + b)")
print("\\(a) × \\(b) = \\(a * b)")

// 条件式
let age = 20
print("ステータス: \\(age >= 18 ? "成人" : "未成年")")

// 関数呼び出し
print("大文字: \\(name.uppercased())")
print("文字数: \\(name.count)文字")`}
          expectedOutput={`Swift バージョン 5.9
10 + 3 = 13
10 × 3 = 30
ステータス: 成人
大文字: SWIFT
文字数: 5文字`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">数値フォーマット</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          文字列補間でも <code className="text-purple-300">String(format:)</code> を使って
          小数点桁数や数値フォーマットを制御できます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 数値フォーマットと実用例</h2>
        <SwiftEditor
          defaultCode={`// 数値フォーマット
let price = 1980.5
let tax = 0.10
let total = price * (1 + tax)

print(String(format: "本体: %.0f円", price))
print(String(format: "税込: %.0f円", total))

// 桁区切り
let bigNumber = 1_234_567
print("人口: \\(bigNumber)人")

// 配列の補間
let fruits = ["りんご", "バナナ", "みかん"]
print("フルーツ: \\(fruits.joined(separator: "・"))")
print("数: \\(fruits.count)種類")`}
          expectedOutput={`本体: 1981円
税込: 2179円
人口: 1234567人
フルーツ: りんご・バナナ・みかん
数: 3種類`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="interpolation" />
      </div>
      <LessonNav lessons={lessons} currentId="interpolation" basePath="/learn/strings" />
    </div>
  );
}

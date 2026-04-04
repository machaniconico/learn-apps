import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "basics")!.lessons;

export default function PrintFunctionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">Swift基礎 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">print関数</h1>
        <p className="text-gray-400">print()関数の使い方、文字列補間、separator・terminatorパラメータを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">print()関数の基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-300">print()</code> はコンソールに値を出力する関数です。
          複数の値をカンマ区切りで渡すと、スペースで区切って出力します。
          デフォルトで末尾に改行が追加されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">print(value)</code> — 値を出力して改行</li>
          <li><code className="text-blue-300">print(a, b, c)</code> — 複数の値をスペース区切りで出力</li>
          <li><code className="text-blue-300">print("\\(変数)")</code> — 文字列補間で変数を埋め込む</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: print()の基本的な使い方</h2>
        <SwiftEditor
          defaultCode={`// 単一の値
print("Hello, Swift!")
print(42)
print(3.14)
print(true)

// 複数の値（スペース区切り）
print("名前:", "太郎", "年齢:", 25)

// 文字列補間
let city = "東京"
let population = 14_000_000
print("\\(city)の人口は約\\(population)人です")`}
          expectedOutput={`Hello, Swift!
42
3.14
true
名前: 太郎 年齢: 25
東京の人口は約14000000人です`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">separator と terminator</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-300">separator</code> で複数の値の区切り文字を変更できます。
          <code className="text-blue-300">terminator</code> で末尾の文字を変更できます（デフォルトは改行 <code className="text-blue-300">"\\n"</code>）。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: separator と terminator</h2>
        <SwiftEditor
          defaultCode={`// separatorで区切り文字を変更
print("Apple", "Banana", "Cherry", separator: ", ")
print(1, 2, 3, separator: " - ")

// terminatorで末尾を変更
print("進行中", terminator: "...")
print("完了！")

// 改行なしで複数行
for i in 1...5 {
    print(i, terminator: i < 5 ? ", " : "\\n")
}`}
          expectedOutput={`Apple, Banana, Cherry
1 - 2 - 3
進行中...完了！
1, 2, 3, 4, 5`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="print-function" />
      </div>
      <LessonNav lessons={lessons} currentId="print-function" basePath="/learn/basics" />
    </div>
  );
}

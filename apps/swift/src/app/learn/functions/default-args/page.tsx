import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "functions")!.lessons;

export default function DefaultArgsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">関数 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">デフォルト引数</h1>
        <p className="text-gray-400">引数にデフォルト値を設定して、省略可能な引数を作る方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">デフォルト値の設定</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          引数に <code className="text-teal-300">= 値</code> を付けるとデフォルト値が設定されます。
          呼び出し時にその引数を省略するとデフォルト値が使われます。
          デフォルト値を持つ引数は通常、引数リストの末尾に置きます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: デフォルト引数の基本</h2>
        <SwiftEditor
          defaultCode={`func greet(_ name: String, greeting: String = "こんにちは") {
    print("\\(greeting)、\\(name)さん！")
}

greet("太郎")                        // デフォルト値を使用
greet("花子", greeting: "おはよう")  // デフォルト値を上書き

func createProfile(name: String, age: Int = 0, city: String = "不明") -> String {
    return "名前: \\(name), 年齢: \\(age), 都市: \\(city)"
}

print(createProfile(name: "Alice"))
print(createProfile(name: "Bob", age: 25))
print(createProfile(name: "Carol", age: 30, city: "大阪"))`}
          expectedOutput={`こんにちは、太郎さん！
おはよう、花子さん！
名前: Alice, 年齢: 0, 都市: 不明
名前: Bob, 年齢: 25, 都市: 不明
名前: Carol, 年齢: 30, 都市: 大阪`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">実用的なデフォルト引数</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          標準ライブラリの多くの関数もデフォルト引数を使っています。
          例えば <code className="text-teal-300">print()</code> の <code className="text-teal-300">separator</code> と <code className="text-teal-300">terminator</code> もデフォルト値を持ちます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 実用的な例</h2>
        <SwiftEditor
          defaultCode={`func formatPrice(_ price: Double, currency: String = "円", decimals: Int = 0) -> String {
    let formatted = String(format: "%.\(decimals)f", price)
    return "\\(formatted)\\(currency)"
}

print(formatPrice(1980))
print(formatPrice(1980.5, decimals: 1))
print(formatPrice(19.99, currency: "USD", decimals: 2))

func repeat(_ str: String, count: Int = 3, separator: String = "") -> String {
    return Array(repeating: str, count: count).joined(separator: separator)
}

print(repeat("Swift"))
print(repeat("Ha", count: 4, separator: ", "))`}
          expectedOutput={`1980円
1980.5円
19.99USD
SwiftSwiftSwift
Ha, Ha, Ha, Ha`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="default-args" />
      </div>
      <LessonNav lessons={lessons} currentId="default-args" basePath="/learn/functions" />
    </div>
  );
}

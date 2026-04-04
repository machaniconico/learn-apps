import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "functions")!.lessons;

export default function ParametersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">関数 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">引数</h1>
        <p className="text-gray-400">引数ラベルとパラメータ名の使い方、ラベルの省略を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">引数ラベルとパラメータ名</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swiftの関数は引数に2種類の名前があります：
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><strong className="text-gray-200">引数ラベル（外部名）</strong> — 呼び出し時に使う名前</li>
          <li><strong className="text-gray-200">パラメータ名（内部名）</strong> — 関数内で使う名前</li>
          <li><code className="text-teal-300">_</code> でラベルを省略できる</li>
          <li>例: <code className="text-teal-300">func move(from start: Int, to end: Int)</code></li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 引数ラベルの使い方</h2>
        <SwiftEditor
          defaultCode={`// 引数ラベルあり（読みやすい呼び出し）
func greet(person name: String, from city: String) {
    print("\\(city)から来た\\(name)さん、こんにちは！")
}
greet(person: "太郎", from: "東京")

// アンダースコアでラベルを省略
func add(_ a: Int, _ b: Int) -> Int {
    return a + b
}
print(add(3, 5))  // ラベルなしで呼び出せる

// ラベルとパラメータ名が同じ場合
func repeat(text: String, count: Int) {
    for _ in 0..<count {
        print(text, terminator: " ")
    }
    print("")
}
repeat(text: "Swift", count: 3)`}
          expectedOutput={`東京から来た太郎さん、こんにちは！
8
Swift Swift Swift`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">自然な英語のような関数名</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          引数ラベルを活用すると、関数呼び出しが自然な文のように読めます。
          これはSwiftのAPI設計指針の重要な部分です。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 自然な読み方の関数</h2>
        <SwiftEditor
          defaultCode={`func insert(_ value: Int, at index: Int, into array: inout [Int]) {
    array.insert(value, at: index)
}

func multiply(_ x: Int, by factor: Int) -> Int {
    return x * factor
}

func divide(_ x: Double, by divisor: Double) -> Double {
    return x / divisor
}

// 自然な英語のように読める
print(multiply(6, by: 7))
print(divide(100.0, by: 4.0))

var numbers = [1, 3, 5]
insert(2, at: 1, into: &numbers)
print(numbers)`}
          expectedOutput={`42
25.0
[1, 2, 3, 5]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="parameters" />
      </div>
      <LessonNav lessons={lessons} currentId="parameters" basePath="/learn/functions" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "collections")!.lessons;

export default function TransformationsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">コレクション レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">変換</h1>
        <p className="text-gray-400">map・flatMap・compactMapを使ったコレクションの変換を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">高階関数による変換</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swiftのコレクションには変換のための高階関数が豊富に用意されています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-green-300">map</code> — 各要素を変換して新しい配列を返す</li>
          <li><code className="text-green-300">flatMap</code> — ネストした配列を平坦化しながら変換</li>
          <li><code className="text-green-300">compactMap</code> — nilを取り除きながら変換（Optionalを扱う）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: map と compactMap</h2>
        <SwiftEditor
          defaultCode={`// map: 各要素を変換
let numbers = [1, 2, 3, 4, 5]
let doubled = numbers.map { $0 * 2 }
print(doubled)

let strings = numbers.map { "数値\\($0)" }
print(strings)

// compactMap: nilを除きながら変換
let rawValues = ["1", "abc", "3", "xyz", "5"]
let parsed = rawValues.compactMap { Int($0) }
print(parsed)

// Optionalの配列からnilを除く
let optionals: [Int?] = [1, nil, 3, nil, 5]
let nonNils = optionals.compactMap { $0 }
print(nonNils)`}
          expectedOutput={`[2, 4, 6, 8, 10]
["数値1", "数値2", "数値3", "数値4", "数値5"]
[1, 3, 5]
[1, 3, 5]`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">flatMap</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-green-300">flatMap</code> はネストした配列を1段階平坦化します。
          各要素から配列を生成し、それらをすべて結合した配列を返します。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: flatMap と メソッドチェーン</h2>
        <SwiftEditor
          defaultCode={`// flatMap: ネストを平坦化
let nested = [[1, 2, 3], [4, 5], [6, 7, 8, 9]]
let flat = nested.flatMap { $0 }
print(flat)

// 各要素から複数の値を生成
let words = ["Hello", "Swift"]
let chars = words.flatMap { $0 }
print(chars)

// メソッドチェーン
let result = (1...10)
    .filter { $0 % 2 == 0 }      // 偶数のみ
    .map { $0 * $0 }              // 二乗
    .reduce(0, +)                 // 合計
print("偶数の二乗の合計: \\(result)")`}
          expectedOutput={`[1, 2, 3, 4, 5, 6, 7, 8, 9]
["H", "e", "l", "l", "o", "S", "w", "i", "f", "t"]
偶数の二乗の合計: 220`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collections" lessonId="transformations" />
      </div>
      <LessonNav lessons={lessons} currentId="transformations" basePath="/learn/collections" />
    </div>
  );
}

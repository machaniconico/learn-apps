import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "collections")!.lessons;

export default function IterationPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">コレクション レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">反復処理</h1>
        <p className="text-gray-400">for-inを使ったコレクションの走査と、enumerated・zip・strideを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コレクションの反復</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swiftのコレクションはすべて <code className="text-green-300">Sequence</code> プロトコルに準拠しており、
          <code className="text-green-300">for-in</code> ループで走査できます。
          いくつかの便利なメソッドも合わせて覚えましょう。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-green-300">enumerated()</code> — インデックスと値のタプルを返す</li>
          <li><code className="text-green-300">zip(a, b)</code> — 2つのシーケンスを組み合わせる</li>
          <li><code className="text-green-300">forEach</code> — クロージャで各要素を処理</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 様々な反復方法</h2>
        <SwiftEditor
          defaultCode={`let fruits = ["りんご", "バナナ", "みかん", "ぶどう"]

// 基本のfor-in
for fruit in fruits {
    print(fruit, terminator: " ")
}
print("")

// enumerated()でインデックス付き
for (i, fruit) in fruits.enumerated() {
    print("\\(i + 1). \\(fruit)")
}

// forEach
print("--- forEach ---")
fruits.forEach { print($0, terminator: " ") }
print("")`}
          expectedOutput={`りんご バナナ みかん ぶどう
1. りんご
2. バナナ
3. みかん
4. ぶどう
--- forEach ---
りんご バナナ みかん ぶどう`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">zip と reversed</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-green-300">zip</code> は2つのシーケンスを同時に走査できます。
          短い方の長さに合わせて終了します。
          <code className="text-green-300">reversed()</code> で逆順に走査できます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: zipとreversed</h2>
        <SwiftEditor
          defaultCode={`let names = ["Alice", "Bob", "Carol"]
let scores = [90, 75, 88]

// zip で2つを同時に処理
for (name, score) in zip(names, scores) {
    print("\\(name): \\(score)点")
}

// 逆順
let numbers = [1, 2, 3, 4, 5]
for n in numbers.reversed() {
    print(n, terminator: " ")
}
print("")

// joined で文字列に変換
let words = ["Swift", "is", "great"]
print(words.joined(separator: " "))`}
          expectedOutput={`Alice: 90点
Bob: 75点
Carol: 88点
5 4 3 2 1
Swift is great`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collections" lessonId="iteration" />
      </div>
      <LessonNav lessons={lessons} currentId="iteration" basePath="/learn/collections" />
    </div>
  );
}

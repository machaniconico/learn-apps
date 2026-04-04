import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "collections")!.lessons;

export default function SortingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">コレクション レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ソート</h1>
        <p className="text-gray-400">sorted・sort・カスタム比較を使ったコレクションの並べ替えを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">sortedとsort</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swiftには2種類のソートメソッドがあります：
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-green-300">sorted()</code> — 新しいソート済み配列を返す（元の配列は変更しない）</li>
          <li><code className="text-green-300">sort()</code> — 元の配列をインプレースでソート（var配列のみ）</li>
          <li><code className="text-green-300">sorted(by:)</code> — カスタム比較でソート</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 基本的なソート</h2>
        <SwiftEditor
          defaultCode={`// sorted(): 新しい配列を返す
let numbers = [3, 1, 4, 1, 5, 9, 2, 6]
let ascending = numbers.sorted()
let descending = numbers.sorted(by: >)
print("昇順: \\(ascending)")
print("降順: \\(descending)")

// sort(): インプレース変更
var mutableNumbers = [3, 1, 4, 1, 5, 9, 2, 6]
mutableNumbers.sort()
print("ソート後: \\(mutableNumbers)")

// 文字列のソート
let fruits = ["バナナ", "りんご", "みかん", "ぶどう"]
print(fruits.sorted())`}
          expectedOutput={`昇順: [1, 1, 2, 3, 4, 5, 6, 9]
降順: [9, 6, 5, 4, 3, 1, 1, 2]
ソート後: [1, 1, 2, 3, 4, 5, 6, 9]
["バナナ", "ぶどう", "みかん", "りんご"]`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">カスタムソート</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-green-300">sorted(by:)</code> にクロージャを渡すことで、
          カスタムの比較ロジックでソートできます。
          構造体や複雑なオブジェクトのソートに便利です。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: カスタムソート</h2>
        <SwiftEditor
          defaultCode={`struct Student {
    let name: String
    let score: Int
}

let students = [
    Student(name: "Alice", score: 85),
    Student(name: "Bob", score: 92),
    Student(name: "Carol", score: 78),
    Student(name: "Dave", score: 92),
]

// スコアの降順、同スコアは名前の昇順
let ranked = students.sorted {
    if $0.score != $1.score {
        return $0.score > $1.score
    }
    return $0.name < $1.name
}

for (i, s) in ranked.enumerated() {
    print("\\(i + 1)位: \\(s.name) (\\(s.score)点)")
}`}
          expectedOutput={`1位: Bob (92点)
2位: Dave (92点)
3位: Alice (85点)
4位: Carol (78点)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collections" lessonId="sorting" />
      </div>
      <LessonNav lessons={lessons} currentId="sorting" basePath="/learn/collections" />
    </div>
  );
}

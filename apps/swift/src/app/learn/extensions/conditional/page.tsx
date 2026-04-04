import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "extensions")!.lessons;

export default function ConditionalExtPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">エクステンション レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">条件付き拡張</h1>
        <p className="text-gray-400">whereを使って特定の条件を満たす型にのみ拡張を適用します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">where句による条件付き拡張</h2>
        <p className="text-gray-300 mb-3">
          <code className="text-cyan-300">extension Array where Element: Equatable</code> のように
          where句を使うと、型パラメータが特定の条件を満たす場合にのみ拡張が適用されます。
          これにより型安全なユーティリティメソッドを追加できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">where Element: Protocol</code> — プロトコル準拠の条件</li>
          <li><code className="text-cyan-300">where Element == Type</code> — 具体的な型の条件</li>
          <li>複数条件はカンマで区切る</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: Array の条件付き拡張</h2>
        <SwiftEditor
          defaultCode={`// Equatable な要素のみ
extension Array where Element: Equatable {
    func removeDuplicates() -> [Element] {
        var seen: [Element] = []
        return filter { item in
            if seen.contains(item) { return false }
            seen.append(item)
            return true
        }
    }

    func count(of element: Element) -> Int {
        filter { $0 == element }.count
    }
}

let nums = [1, 2, 3, 2, 1, 4, 3]
print(nums.removeDuplicates())
print(nums.count(of: 2))

let words = ["a", "b", "a", "c", "b"]
print(words.removeDuplicates())`}
          expectedOutput={`[1, 2, 3, 4]
2
["a", "b", "c"]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 具体型条件と複数条件</h2>
        <SwiftEditor
          defaultCode={`// Element が String のときだけ
extension Array where Element == String {
    var joined: String { joined(separator: ", ") }
    var uppercasedAll: [String] { map { $0.uppercased() } }
}

let fruits = ["apple", "banana", "cherry"]
print(fruits.joined)
print(fruits.uppercasedAll)

// Numeric に準拠した要素
extension Array where Element: Numeric {
    var sum: Element { reduce(0, +) }
    func scaled(by factor: Element) -> [Element] {
        map { $0 * factor }
    }
}

let ints = [1, 2, 3, 4, 5]
print(ints.sum)
print(ints.scaled(by: 3))

let doubles = [1.5, 2.5, 3.0]
print(doubles.sum)`}
          expectedOutput={`apple, banana, cherry
["APPLE", "BANANA", "CHERRY"]
15
[3, 6, 9, 12, 15]
7.0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="extensions" lessonId="conditional" />
      </div>
      <LessonNav lessons={lessons} currentId="conditional" basePath="/learn/extensions" />
    </div>
  );
}

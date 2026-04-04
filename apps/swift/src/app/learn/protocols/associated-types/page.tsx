import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "protocols")!.lessons;

export default function AssociatedTypesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">プロトコル レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">関連型</h1>
        <p className="text-gray-400">associatedtypeを使ってプロトコルでジェネリックな型要件を表現します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">associatedtype とは</h2>
        <p className="text-gray-300 mb-3">
          <code className="text-teal-300">associatedtype</code> はプロトコルで使うプレースホルダー型です。
          プロトコルに準拠する型が具体的な型を提供します。
          これによりプロトコルをジェネリックにすることができます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-300">associatedtype Element</code> でプレースホルダーを宣言</li>
          <li>準拠する型が <code className="text-teal-300">typealias Element = Int</code> などで具体化</li>
          <li>型推論により typealias の明示が不要な場合も多い</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: コンテナプロトコル</h2>
        <SwiftEditor
          defaultCode={`protocol Container {
    associatedtype Item
    var count: Int { get }
    mutating func append(_ item: Item)
    subscript(i: Int) -> Item { get }
}

struct IntStack: Container {
    private var items: [Int] = []

    var count: Int { items.count }

    mutating func append(_ item: Int) {
        items.append(item)
    }

    subscript(i: Int) -> Int {
        return items[i]
    }
}

var stack = IntStack()
stack.append(10)
stack.append(20)
stack.append(30)
print("要素数: \\(stack.count)")
print("最初の要素: \\(stack[0])")
print("2番目: \\(stack[1])")`}
          expectedOutput={`要素数: 3
最初の要素: 10
2番目: 20`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: associated typeに制約を付ける</h2>
        <SwiftEditor
          defaultCode={`protocol SortableContainer {
    associatedtype Item: Comparable
    var items: [Item] { get }
    func sorted() -> [Item]
    func min() -> Item?
    func max() -> Item?
}

extension SortableContainer {
    func sorted() -> [Item] { items.sorted() }
    func min() -> Item? { items.min() }
    func max() -> Item? { items.max() }
}

struct NumberList: SortableContainer {
    var items: [Int]
}

struct WordList: SortableContainer {
    var items: [String]
}

let nums = NumberList(items: [5, 2, 8, 1, 9])
print(nums.sorted())
print("最小: \\(nums.min()!), 最大: \\(nums.max()!)")

let words = WordList(items: ["banana", "apple", "cherry"])
print(words.sorted())`}
          expectedOutput={`[1, 2, 5, 8, 9]
最小: 1, 最大: 9
["apple", "banana", "cherry"]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="protocols" lessonId="associated-types" />
      </div>
      <LessonNav lessons={lessons} currentId="associated-types" basePath="/learn/protocols" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "generics")!.lessons;

export default function GenericsAssociatedTypesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">ジェネリクス レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">関連型との組み合わせ</h1>
        <p className="text-gray-400">プロトコルのassociatedtypeとジェネリクスを組み合わせた高度な型表現を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">associatedtype とジェネリクスの関係</h2>
        <p className="text-gray-300 mb-3">
          プロトコルの <code className="text-blue-300">associatedtype</code> はジェネリクスのプロトコル版です。
          ジェネリック関数でこのようなプロトコルを型制約として使うと、
          関連型を通じた型情報にアクセスできます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>associated type を持つプロトコルは型制約として使える</li>
          <li><code className="text-blue-300">{"<C: Collection>"}</code> で C.Element にアクセス可能</li>
          <li>Swiftの Collection・Sequence プロトコルが典型例</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: Collection プロトコルを使う</h2>
        <SwiftEditor
          defaultCode={`// Collection を制約として使う
func printAll<C: Collection>(_ collection: C) {
    for element in collection {
        print(element, terminator: " ")
    }
    print()
}

printAll([1, 2, 3, 4, 5])
printAll("Swift")
printAll(["a", "b", "c"])

// Element に制約を付ける
func sum<C: Collection>(_ collection: C) -> C.Element
    where C.Element: Numeric {
    collection.reduce(0, +)
}

print(sum([1, 2, 3, 4, 5]))
print(sum([1.1, 2.2, 3.3]))`}
          expectedOutput={`1 2 3 4 5
S w i f t
a b c
15
6.6000000000000005`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: カスタムプロトコルとジェネリクス</h2>
        <SwiftEditor
          defaultCode={`protocol Mappable {
    associatedtype Input
    associatedtype Output
    func transform(_ input: Input) -> Output
}

struct Doubler: Mappable {
    func transform(_ input: Int) -> Int { input * 2 }
}

struct Stringifier: Mappable {
    func transform(_ input: Int) -> String { "値: \\(input)" }
}

func applyAll<M: Mappable>(_ mapper: M, to items: [M.Input]) -> [M.Output] {
    items.map { mapper.transform($0) }
}

let doubled = applyAll(Doubler(), to: [1, 2, 3, 4, 5])
print(doubled)

let stringified = applyAll(Stringifier(), to: [10, 20, 30])
print(stringified)`}
          expectedOutput={`[2, 4, 6, 8, 10]
["値: 10", "値: 20", "値: 30"]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="generics" lessonId="associated-types" />
      </div>
      <LessonNav lessons={lessons} currentId="associated-types" basePath="/learn/generics" />
    </div>
  );
}

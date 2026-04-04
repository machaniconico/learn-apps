import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "generics")!.lessons;

export default function GenericTypesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">ジェネリクス レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ジェネリック型</h1>
        <p className="text-gray-400">汎用的なカスタム型をジェネリクスで定義します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ジェネリック型の定義</h2>
        <p className="text-gray-300 mb-3">
          <code className="text-blue-300">{"struct MyType<T> { }"}</code> のように型名の後に型パラメータを付けます。
          struct・class・enum すべてジェネリック型にできます。
          Swiftの <code className="text-blue-300">Array{"<Element>"}</code> や <code className="text-blue-300">{"Optional<Wrapped>"}</code> も同じ仕組みです。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>型パラメータはプロパティ・メソッドの型として使える</li>
          <li>インスタンス生成時に型が決まる</li>
          <li>extensionでジェネリック型を拡張できる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: スタック（Stack）の実装</h2>
        <SwiftEditor
          defaultCode={`struct Stack<Element> {
    private var storage: [Element] = []

    var isEmpty: Bool { storage.isEmpty }
    var count: Int { storage.count }
    var top: Element? { storage.last }

    mutating func push(_ element: Element) {
        storage.append(element)
    }

    @discardableResult
    mutating func pop() -> Element? {
        storage.popLast()
    }
}

var intStack = Stack<Int>()
intStack.push(1)
intStack.push(2)
intStack.push(3)
print("top: \\(intStack.top!)")
print("pop: \\(intStack.pop()!)")
print("count: \\(intStack.count)")

var strStack = Stack<String>()
strStack.push("Swift")
strStack.push("iOS")
print(strStack.top!)`}
          expectedOutput={`top: 3
pop: 3
count: 2
iOS`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: ジェネリッククラスと拡張</h2>
        <SwiftEditor
          defaultCode={`class Box<T> {
    var value: T
    init(_ value: T) { self.value = value }
}

extension Box {
    func map<U>(_ transform: (T) -> U) -> Box<U> {
        Box<U>(transform(value))
    }
}

let intBox = Box(42)
let strBox = intBox.map { "値は\\($0)です" }
print(strBox.value)

// ジェネリック enum
enum Result2<Success, Failure> {
    case success(Success)
    case failure(Failure)

    var isSuccess: Bool {
        if case .success = self { return true }
        return false
    }
}

let ok = Result2<Int, String>.success(100)
let ng = Result2<Int, String>.failure("エラー")
print(ok.isSuccess)
print(ng.isSuccess)`}
          expectedOutput={`値は42です
true
false`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="generics" lessonId="types" />
      </div>
      <LessonNav lessons={lessons} currentId="types" basePath="/learn/generics" />
    </div>
  );
}

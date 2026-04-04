import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "protocols")!.lessons;

export default function ProtocolExtensionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">プロトコル レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">プロトコル拡張</h1>
        <p className="text-gray-400">extensionを使ってプロトコルにデフォルト実装を追加します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">プロトコル拡張とデフォルト実装</h2>
        <p className="text-gray-300 mb-3">
          <code className="text-teal-300">extension MyProtocol {"{ }"}</code> でプロトコルにデフォルト実装を追加できます。
          準拠する型はデフォルト実装をそのまま使うか、独自にオーバーライドできます。
          これによりコードの重複を大幅に削減できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>デフォルト実装は準拠する型が実装しなくても使える</li>
          <li>型が同名のメソッドを定義すると型の実装が優先される</li>
          <li>where句で特定の型にのみ拡張を適用できる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: デフォルト実装の追加</h2>
        <SwiftEditor
          defaultCode={`protocol Greetable {
    var name: String { get }
    func greet() -> String
    func farewell() -> String
}

// デフォルト実装
extension Greetable {
    func greet() -> String {
        return "こんにちは、\\(name)！"
    }
    func farewell() -> String {
        return "さようなら、\\(name)！"
    }
}

struct Japanese: Greetable {
    var name: String
    // greet をオーバーライド
    func greet() -> String { "よろしくお願いします、\\(name)！" }
}

struct English: Greetable {
    var name: String
    // デフォルト実装をそのまま使う
}

let j = Japanese(name: "田中")
let e = English(name: "Smith")
print(j.greet())
print(j.farewell())
print(e.greet())
print(e.farewell())`}
          expectedOutput={`よろしくお願いします、田中！
さようなら、田中！
こんにちは、Smith！
さようなら、Smith！`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: where句を使った条件付き拡張</h2>
        <SwiftEditor
          defaultCode={`protocol Container {
    associatedtype Item
    var items: [Item] { get }
}

// Item が Equatable の場合だけ追加メソッドを提供
extension Container where Item: Equatable {
    func contains(_ item: Item) -> Bool {
        return items.contains(item)
    }
}

struct NumberBag: Container {
    var items: [Int]
}

let bag = NumberBag(items: [1, 2, 3, 4, 5])
print(bag.contains(3))
print(bag.contains(9))`}
          expectedOutput={`true
false`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="protocols" lessonId="protocol-extensions" />
      </div>
      <LessonNav lessons={lessons} currentId="protocol-extensions" basePath="/learn/protocols" />
    </div>
  );
}

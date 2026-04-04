import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "generics")!.lessons;

export default function WhereClausePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">ジェネリクス レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">where句</h1>
        <p className="text-gray-400">where句を使って複雑な型制約を表現します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ジェネリクスのwhere句</h2>
        <p className="text-gray-300 mb-3">
          where句は型パラメータに対して複数の制約や等価条件を表現します。
          <code className="text-blue-300">{"func f<T, U>() where T: Equatable, T == U.Element"}</code>
          のように、関数シグネチャの後に追加します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">T: Protocol</code> — プロトコル準拠の条件</li>
          <li><code className="text-blue-300">T == U</code> — 型の等価条件</li>
          <li><code className="text-blue-300">T.Element: Protocol</code> — 関連型への制約</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 複数制約と等価条件</h2>
        <SwiftEditor
          defaultCode={`// 2つのCollectionの要素が等しいか比較
func allItemsMatch<C1: Collection, C2: Collection>(_ c1: C1, _ c2: C2) -> Bool
    where C1.Element == C2.Element, C1.Element: Equatable {
    guard c1.count == c2.count else { return false }
    return zip(c1, c2).allSatisfy { $0 == $1 }
}

let array = [1, 2, 3]
let set: Set = [1, 2, 3]

// Array と Set を比較（要素の型が同じ）
// ※ Set は順序がないので注意
print(array.count == set.count)

let a = [1, 2, 3]
let b = [1, 2, 3]
let c = [1, 2, 4]
print(allItemsMatch(a, b))
print(allItemsMatch(a, c))`}
          expectedOutput={`true
true
false`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: where句を使ったextension</h2>
        <SwiftEditor
          defaultCode={`struct Wrapper<T> {
    var value: T
}

// T が Numeric のときだけ演算メソッドを追加
extension Wrapper where T: Numeric {
    func doubled() -> T { value + value }
    func plus(_ other: T) -> T { value + other }
}

// T が Equatable のときだけ比較メソッドを追加
extension Wrapper where T: Equatable {
    func isEqual(to other: T) -> Bool { value == other }
}

// T が String のときだけ特定メソッドを追加
extension Wrapper where T == String {
    var uppercased: String { value.uppercased() }
}

let intWrapper = Wrapper(value: 5)
print(intWrapper.doubled())
print(intWrapper.plus(3))
print(intWrapper.isEqual(to: 5))

let strWrapper = Wrapper(value: "hello")
print(strWrapper.uppercased)
print(strWrapper.isEqual(to: "hello"))`}
          expectedOutput={`10
8
true
HELLO
true`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="generics" lessonId="where-clause" />
      </div>
      <LessonNav lessons={lessons} currentId="where-clause" basePath="/learn/generics" />
    </div>
  );
}

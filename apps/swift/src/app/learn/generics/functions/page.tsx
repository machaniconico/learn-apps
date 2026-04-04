import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "generics")!.lessons;

export default function GenericFunctionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">ジェネリクス レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ジェネリック関数</h1>
        <p className="text-gray-400">型に依存しない汎用的な関数をジェネリクスで実装します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ジェネリック関数の定義</h2>
        <p className="text-gray-300 mb-3">
          <code className="text-blue-300">func myFunc{"<T>"}(_ param: T) -{">"} T</code> のように
          関数名の後に山括弧で型パラメータを宣言します。
          呼び出し時に型推論が働くため、通常は型を明示する必要はありません。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>型推論により呼び出し時の型指定が不要なことが多い</li>
          <li>型パラメータは引数・戻り値・関数本体で使える</li>
          <li>型制約と組み合わせて安全に演算できる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 汎用的なユーティリティ関数</h2>
        <SwiftEditor
          defaultCode={`// 配列の最初と最後を返す
func firstAndLast<T>(_ array: [T]) -> (T, T)? {
    guard let first = array.first, let last = array.last else { return nil }
    return (first, last)
}

if let (f, l) = firstAndLast([1, 2, 3, 4, 5]) {
    print("最初: \\(f), 最後: \\(l)")
}

if let (f, l) = firstAndLast(["Swift", "Java", "Python"]) {
    print("最初: \\(f), 最後: \\(l)")
}

// 要素をn回繰り返した配列を作る
func repeated<T>(_ element: T, count: Int) -> [T] {
    Array(repeating: element, count: count)
}

print(repeated(0, count: 5))
print(repeated("★", count: 3))`}
          expectedOutput={`最初: 1, 最後: 5
最初: Swift, 最後: Python
[0, 0, 0, 0, 0]
["★", "★", "★"]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: ジェネリック関数の応用</h2>
        <SwiftEditor
          defaultCode={`// Optional のデフォルト値
func unwrap<T>(_ optional: T?, default value: T) -> T {
    optional ?? value
}

let name: String? = nil
let age: Int? = 25

print(unwrap(name, default: "名前なし"))
print(unwrap(age, default: 0))

// 配列をDictionaryに変換
func toDictionary<T, K: Hashable>(_ array: [T], keyedBy keyPath: KeyPath<T, K>) -> [K: T] {
    var dict: [K: T] = [:]
    for item in array {
        dict[item[keyPath: keyPath]] = item
    }
    return dict
}

struct User {
    var id: Int
    var name: String
}

let users = [User(id: 1, name: "Alice"), User(id: 2, name: "Bob")]
let dict = toDictionary(users, keyedBy: \.id)
print(dict[1]?.name ?? "not found")
print(dict[2]?.name ?? "not found")`}
          expectedOutput={`名前なし
25
Alice
Bob`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="generics" lessonId="functions" />
      </div>
      <LessonNav lessons={lessons} currentId="functions" basePath="/learn/generics" />
    </div>
  );
}

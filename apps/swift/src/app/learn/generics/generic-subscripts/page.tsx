import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "generics")!.lessons;

export default function GenericSubscriptsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">ジェネリクス レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ジェネリックサブスクリプト</h1>
        <p className="text-gray-400">subscriptにジェネリクスを組み合わせて汎用的な添字アクセスを実現します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ジェネリックサブスクリプトとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swift 4以降、<code className="text-blue-300">subscript</code> にもジェネリック型パラメータを持たせることができます。
          戻り値の型をジェネリクスにすることで、呼び出し側が期待する型に応じて動的に変換できます。
          JSONやDictionaryのような異種混合データを型安全にアクセスする際に特に有効です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">subscript&lt;T&gt;(key: K) -&gt; T?</code> — 戻り値をジェネリクスに</li>
          <li>型推論により呼び出し側で型を明示する必要がある</li>
          <li><code className="text-blue-300">where</code> 句で型パラメータに制約を追加できる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 型安全なDictionaryアクセス</h2>
        <SwiftEditor
          defaultCode={`struct JSONObject {
    private var storage: [String: Any] = [:]

    init(_ dict: [String: Any]) {
        self.storage = dict
    }

    // ジェネリックサブスクリプト：期待する型にキャスト
    subscript<T>(key: String) -> T? {
        return storage[key] as? T
    }
}

let json = JSONObject([
    "name": "田中太郎",
    "age": 25,
    "active": true,
    "score": 98.5
])

let name: String? = json["name"]
let age: Int? = json["age"]
let active: Bool? = json["active"]
let score: Double? = json["score"]

print(name ?? "nil")
print(age ?? 0)
print(active ?? false)
print(score ?? 0.0)`}
          expectedOutput={`田中太郎
25
true
98.5`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: キーパスを使ったジェネリックサブスクリプト</h2>
        <SwiftEditor
          defaultCode={`struct User {
    var name: String
    var age: Int
    var email: String
}

extension User {
    // KeyPathを使ったジェネリックサブスクリプト
    subscript<T>(keyPath: KeyPath<User, T>) -> T {
        return self[keyPath: keyPath]
    }
}

let user = User(name: "Yamada", age: 30, email: "yamada@example.com")

let name = user[\.name]
let age = user[\.age]
let email = user[\.email]

print("名前: \\(name)")
print("年齢: \\(age)")
print("メール: \\(email)")`}
          expectedOutput={`名前: Yamada
年齢: 30
メール: yamada@example.com`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: コレクション型へのジェネリックサブスクリプト</h2>
        <SwiftEditor
          defaultCode={`struct TypedContainer {
    private var items: [Any] = []

    mutating func append<T>(_ item: T) {
        items.append(item)
    }

    // インデックスと型で要素を取得
    subscript<T>(index: Int, as type: T.Type) -> T? {
        guard index >= 0, index < items.count else { return nil }
        return items[index] as? T
    }

    var count: Int { items.count }
}

var container = TypedContainer()
container.append("Hello")
container.append(42)
container.append(3.14)
container.append(true)

if let str = container[0, as: String.self] {
    print("文字列: \\(str)")
}
if let num = container[1, as: Int.self] {
    print("整数: \\(num)")
}
if let pi = container[2, as: Double.self] {
    print("小数: \\(pi)")
}
if let flag = container[3, as: Bool.self] {
    print("真偽値: \\(flag)")
}`}
          expectedOutput={`文字列: Hello
整数: 42
小数: 3.14
真偽値: true`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="generics" lessonId="generic-subscripts" />
      </div>
      <LessonNav lessons={lessons} currentId="generic-subscripts" basePath="/learn/generics" />
    </div>
  );
}

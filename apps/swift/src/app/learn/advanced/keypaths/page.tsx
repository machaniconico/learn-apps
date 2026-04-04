import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const lessons = CATEGORIES.find((c) => c.id === "advanced")!.lessons;

export default function KeyPathsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-red-400">上級機能</span>
        <h1 className="text-3xl font-bold text-gray-100">KeyPath</h1>
        <p className="text-gray-400">KeyPath&lt;Root,Value&gt; によるプロパティアクセスを学びましょう。</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <p>
          KeyPath はプロパティへの参照を値として扱うSwiftの機能です。
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-300">\\.propertyName</code> という構文で作成し、
          型安全にプロパティを参照・更新できます。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`struct Person {
    var name: String
    var age: Int
    var address: Address
}

struct Address {
    var city: String
    var country: String
}

let alice = Person(
    name: "Alice",
    age: 30,
    address: Address(city: "Tokyo", country: "Japan")
)

// KeyPath の作成と使用
let namePath: KeyPath<Person, String> = \\.name
let agePath: KeyPath<Person, Int> = \\.age

print(alice[keyPath: namePath])  // Alice
print(alice[keyPath: agePath])   // 30

// ネストしたプロパティへの KeyPath
let cityPath: KeyPath<Person, String> = \\.address.city
print(alice[keyPath: cityPath])  // Tokyo`}
        height="280px"
        expectedOutput="Alice\n30\nTokyo"
      />

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <h2 className="text-xl font-semibold text-gray-100">WritableKeyPath と ReferenceWritableKeyPath</h2>
        <p>
          var プロパティには <code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-300">WritableKeyPath</code> が使えます。
          クラスのプロパティには <code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-300">ReferenceWritableKeyPath</code> を使います。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`struct Config {
    var debug: Bool
    var maxRetries: Int
    var timeout: Double
}

var config = Config(debug: false, maxRetries: 3, timeout: 30.0)

// WritableKeyPath で値を書き換える
let debugPath: WritableKeyPath<Config, Bool> = \\.debug
config[keyPath: debugPath] = true
print(config.debug)  // true

// 汎用的な設定関数
func update<Root, Value>(
    _ root: inout Root,
    keyPath: WritableKeyPath<Root, Value>,
    value: Value
) {
    root[keyPath: keyPath] = value
}

update(&config, keyPath: \\.maxRetries, value: 5)
update(&config, keyPath: \\.timeout, value: 60.0)
print(config.maxRetries)  // 5
print(config.timeout)     // 60.0`}
        height="300px"
        expectedOutput="true\n5\n60.0"
      />

      <SwiftEditor
        defaultCode={`// KeyPath を使った高階関数
struct Product {
    let name: String
    let price: Double
    let rating: Double
}

let products = [
    Product(name: "Swift Book", price: 3200, rating: 4.8),
    Product(name: "Xcode Guide", price: 2800, rating: 4.5),
    Product(name: "iOS Cookbook", price: 3500, rating: 4.9),
]

// map に KeyPath を渡す（Swiftの標準機能）
let names = products.map(\\.name)
print(names)  // ["Swift Book", "Xcode Guide", "iOS Cookbook"]

// sorted に KeyPath を使う
let byPrice = products.sorted(by: \\.price)
print(byPrice.map(\\.name))
// ["Xcode Guide", "Swift Book", "iOS Cookbook"]

// KeyPath でフィルタリング
let highRated = products.filter { $0[keyPath: \\.rating] >= 4.8 }
print(highRated.map(\\.name))
// ["Swift Book", "iOS Cookbook"]`}
        height="280px"
        expectedOutput={"[\"Swift Book\", \"Xcode Guide\", \"iOS Cookbook\"]\n[\"Xcode Guide\", \"Swift Book\", \"iOS Cookbook\"]\n[\"Swift Book\", \"iOS Cookbook\"]"}
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="advanced" lessonId="keypaths" />
      </div>
      <LessonNav lessons={lessons} currentId="keypaths" basePath="/learn/advanced" />
    </div>
  );
}

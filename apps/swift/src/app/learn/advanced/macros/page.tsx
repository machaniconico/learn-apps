import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const lessons = CATEGORIES.find((c) => c.id === "advanced")!.lessons;

export default function MacrosPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-red-400">上級機能</span>
        <h1 className="text-3xl font-bold text-gray-100">Swiftマクロ</h1>
        <p className="text-gray-400">#stringify と @Observable マクロの仕組みを学びましょう。</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <p>
          Swift Macros（Swift 5.9）はコンパイル時にソースコードを変換・生成する仕組みです。
          <strong>独立型マクロ（freestanding）</strong>は <code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-300">#</code> プレフィックス、
          <strong>付加型マクロ（attached）</strong>は <code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-300">@</code> プレフィックスで使います。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`// #stringify マクロの例（Swift Macros サンプルより）
// マクロ定義（別パッケージに実装される）
// @freestanding(expression)
// public macro stringify<T>(_ value: T) -> (T, String) =
//     #externalMacro(module: "MyMacros", type: "StringifyMacro")

// マクロの使用例（展開後のイメージ）
// let (value, code) = #stringify(1 + 2)
// ↓ コンパイル時に展開される
// let (value, code) = (1 + 2, "1 + 2")

// 実際の動作を模倣した例
func stringify<T>(_ value: T, code: String) -> (T, String) {
    (value, code)
}

let (result, expression) = stringify(1 + 2, code: "1 + 2")
print("Value: \\(result)")       // Value: 3
print("Expression: \\(expression)") // Expression: 1 + 2`}
        height="280px"
        expectedOutput="Value: 3\nExpression: 1 + 2"
      />

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <h2 className="text-xl font-semibold text-gray-100">@Observable マクロ</h2>
        <p>
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-300">@Observable</code>（Swift 5.9 / iOS 17+）は
          クラスを観察可能にするマクロです。手動で <code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-300">ObservableObject</code> と
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-300">@Published</code> を書く必要がなくなります。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`import Observation  // iOS 17+ / macOS 14+

// @Observable マクロを使った新しい書き方
@Observable
class CounterModel {
    var count = 0           // 自動的に観察可能
    var name = "Counter"    // 自動的に観察可能

    func increment() { count += 1 }
    func reset() { count = 0 }
}

// マクロが展開するコード（概念的なイメージ）
// class CounterModel: Observable {
//     @ObservationIgnored private var _count = 0
//     var count: Int {
//         get {
//             access(keyPath: \\.count)
//             return _count
//         }
//         set {
//             withMutation(keyPath: \\.count) { _count = newValue }
//         }
//     }
//     ...
// }

// SwiftUI での使用
// struct CounterView: View {
//     @State private var model = CounterModel()
//     var body: some View {
//         Text("\\(model.count)")
//         Button("Increment") { model.increment() }
//     }
// }

let model = CounterModel()
model.increment()
model.increment()
print(model.count)  // 2
print(model.name)   // Counter`}
        height="360px"
        expectedOutput="2\nCounter"
      />

      <SwiftEditor
        defaultCode={`// マクロの種類まとめ

// 1. Expression macros (#) - 式を変換
// #stringify(expr) → (value, "expr")
// #line, #file, #function (既存の特殊リテラル)

// 2. Declaration macros (@) - 宣言を追加
// @Observable - 観察可能プロパティを自動生成
// @Codable の自動合成も同様の仕組み

// 3. Accessor macros - プロパティアクセサを追加
// @Observable が内部で使う

// 4. Member macros - 型にメンバーを追加
// @Observable が init() を追加するなど

// マクロの展開を確認するには Xcode で
// マクロ名を右クリック → "Expand Macro" を選択

// @Model (SwiftData) もマクロ
import Foundation

// CodingKeys の自動生成もマクロ的な仕組み
struct User: Codable {
    let id: Int
    let username: String
    let email: String
    // CodingKeys enum が自動合成される
}

let json = """
{"id": 1, "username": "alice", "email": "alice@example.com"}
"""
let user = try! JSONDecoder().decode(User.self, from: json.data(using: .utf8)!)
print(user.username)  // alice`}
        height="340px"
        expectedOutput="alice"
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="advanced" lessonId="macros" />
      </div>
      <LessonNav lessons={lessons} currentId="macros" basePath="/learn/advanced" />
    </div>
  );
}

import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "memory")!.lessons;

export default function ValueVsReferencePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">メモリ管理 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">値型と参照型</h1>
        <p className="text-gray-400">struct（値型）とclass（参照型）のメモリ上の振る舞いの違いを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">値型と参照型の違い</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swiftでは<code className="text-pink-300">struct・enum・tuple</code>が値型、
          <code className="text-pink-300">class・function・closure</code>が参照型です。
          値型はコピーが渡され、参照型は同じインスタンスへの参照が渡されます。
        </p>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-gray-800 rounded-lg border border-pink-500/30">
            <p className="text-pink-400 font-semibold mb-2">値型（struct）</p>
            <ul className="text-gray-400 space-y-1">
              <li>・代入するとコピーが作られる</li>
              <li>・スタックに格納（高速）</li>
              <li>・ARCの対象外</li>
              <li>・変更が他の変数に影響しない</li>
            </ul>
          </div>
          <div className="p-3 bg-gray-800 rounded-lg border border-blue-500/30">
            <p className="text-blue-400 font-semibold mb-2">参照型（class）</p>
            <ul className="text-gray-400 space-y-1">
              <li>・代入すると参照が共有される</li>
              <li>・ヒープに格納（ARC管理）</li>
              <li>・ARCでメモリ管理</li>
              <li>・変更が全参照に影響する</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">値型（struct）のコピー動作</h2>
        <p className="text-gray-400 mb-4">
          structは代入するたびにコピーが作られます。
          一方を変更しても、もう一方には影響しません。
        </p>
        <SwiftEditor
          defaultCode={`struct Point {
    var x: Int
    var y: Int

    mutating func moveBy(dx: Int, dy: Int) {
        x += dx
        y += dy
    }
}

var point1 = Point(x: 0, y: 0)
var point2 = point1  // コピーが作られる

point2.moveBy(dx: 10, dy: 5)

print("point1: (\\(point1.x), \\(point1.y))")  // 変化しない
print("point2: (\\(point2.x), \\(point2.y))")  // 変化している

// 配列も値型
var array1 = [1, 2, 3]
var array2 = array1  // コピー

array2.append(4)
print("array1:", array1)  // [1, 2, 3]
print("array2:", array2)  // [1, 2, 3, 4]`}
          expectedOutput={`point1: (0, 0)
point2: (10, 5)
array1: [1, 2, 3]
array2: [1, 2, 3, 4]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">参照型（class）の共有動作</h2>
        <p className="text-gray-400 mb-4">
          classは代入しても同じインスタンスへの参照が共有されます。
          一方を変更すると、すべての参照から変更が見えます。
        </p>
        <SwiftEditor
          defaultCode={`class Counter {
    var count: Int = 0

    func increment() {
        count += 1
    }
}

let counter1 = Counter()
let counter2 = counter1  // 同じインスタンスを参照

counter1.increment()
counter1.increment()
counter2.increment()

print("counter1.count:", counter1.count)  // 3
print("counter2.count:", counter2.count)  // 3（同じインスタンス）
print("同じインスタンス?", counter1 === counter2)  // true

// 新しいインスタンスとの比較
let counter3 = Counter()
print("counter1 === counter3:", counter1 === counter3)  // false`}
          expectedOutput={`counter1.count: 3
counter2.count: 3
同じインスタンス? true
counter1 === counter3: false`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">どちらを使うべきか</h2>
        <p className="text-gray-400 mb-4">
          Swiftの設計ガイドラインでは、デフォルトはstructを使うことが推奨されています。
        </p>
        <SwiftEditor
          defaultCode={`// ✅ 値型が適切な例：データモデル
struct UserProfile {
    var name: String
    var age: Int
    var email: String
}

// ✅ 参照型が適切な例：共有状態・ライフサイクル管理
class AppState {
    static let shared = AppState()
    var isLoggedIn = false
    var currentUser: UserProfile?
    private init() {}
}

// 使用例
var profile1 = UserProfile(name: "田中", age: 25, email: "tanaka@example.com")
var profile2 = profile1  // コピー

profile2.name = "山田"

print("profile1:", profile1.name)  // "田中" - 変化なし
print("profile2:", profile2.name)  // "山田" - 変化している

// 共有状態
AppState.shared.isLoggedIn = true
print("ログイン状態:", AppState.shared.isLoggedIn)`}
          expectedOutput={`profile1: 田中
profile2: 山田
ログイン状態: true`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="memory" lessonId="value-vs-reference" />
      </div>
      <LessonNav lessons={lessons} currentId="value-vs-reference" basePath="/learn/memory" />
    </div>
  );
}

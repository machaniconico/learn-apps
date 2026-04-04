import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "structs")!.lessons;

export default function StructInitializersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">構造体 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">イニシャライザ</h1>
        <p className="text-gray-400">initキーワードを使った初期化処理の定義と複数イニシャライザの使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">カスタムイニシャライザ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">init</code>キーワードでカスタムイニシャライザを定義できます。
          イニシャライザはインスタンス生成時に呼び出され、すべての格納プロパティに初期値を設定する責任があります。
          カスタムイニシャライザを定義すると、自動生成されるメンバーワイズイニシャライザは使えなくなります
          （extensionに書けば共存可能）。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-orange-300">init(引数) &#123; &#125;</code> — イニシャライザの定義</li>
          <li>すべてのプロパティに値を設定する必要がある</li>
          <li><code className="text-orange-300">self.プロパティ = 引数</code> で値を設定</li>
          <li>失敗するイニシャライザ: <code className="text-orange-300">init?()</code></li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">複数のイニシャライザ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          構造体には複数のイニシャライザを定義できます。引数の型や数が異なれば、同じ名前の<code className="text-orange-300">init</code>を複数定義できます（オーバーロード）。
          また、あるイニシャライザから<code className="text-orange-300">self.init()</code>を呼んで別のイニシャライザに処理を委譲することもできます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>引数が異なる複数の<code className="text-orange-300">init</code>を定義できる</li>
          <li><code className="text-orange-300">self.init()</code> — 別のイニシャライザへの委譲</li>
          <li>委譲先のイニシャライザがすべてのプロパティを設定すれば良い</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">失敗するイニシャライザ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">init?</code>と書くと、初期化に失敗した場合に<code className="text-orange-300">nil</code>を返す<strong className="text-white">失敗するイニシャライザ</strong>を定義できます。
          不正な値が渡された場合などに<code className="text-orange-300">return nil</code>で失敗を表現します。
          呼び出し結果はオプショナル型となり、<code className="text-orange-300">if let</code>でアンラップして使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-orange-300">init?() &#123; &#125;</code> — 失敗するイニシャライザ</li>
          <li>失敗時は<code className="text-orange-300">return nil</code></li>
          <li>結果は<code className="text-orange-300">型名?</code>（オプショナル）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: カスタムイニシャライザ</h2>
        <SwiftEditor
          defaultCode={`struct Person {
    let name: String
    let age: Int
    let email: String

    init(name: String, age: Int, email: String) {
        self.name = name
        self.age = age
        self.email = email
    }

    func introduce() {
        print("名前: \\(name), 年齢: \\(age), メール: \\(email)")
    }
}

let p = Person(name: "鈴木一郎", age: 28, email: "ichiro@example.com")
p.introduce()
print("名前: \\(p.name)")
print("年齢: \\(p.age)歳")`}
          expectedOutput={`名前: 鈴木一郎, 年齢: 28, メール: ichiro@example.com
名前: 鈴木一郎
年齢: 28歳`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 複数のイニシャライザと委譲</h2>
        <SwiftEditor
          defaultCode={`struct Rectangle {
    var width: Double
    var height: Double

    // メインイニシャライザ
    init(width: Double, height: Double) {
        self.width = width
        self.height = height
    }

    // 正方形用の便利イニシャライザ（委譲）
    init(side: Double) {
        self.init(width: side, height: side)
    }

    // デフォルト値を使うイニシャライザ
    init() {
        self.init(width: 1.0, height: 1.0)
    }

    var area: Double { width * height }
}

let rect = Rectangle(width: 6.0, height: 4.0)
print("長方形: \\(rect.width) x \\(rect.height) = \\(rect.area)")

let square = Rectangle(side: 5.0)
print("正方形: \\(square.width) x \\(square.height) = \\(square.area)")

let unit = Rectangle()
print("単位長方形: \\(unit.width) x \\(unit.height) = \\(unit.area)")`}
          expectedOutput={`長方形: 6.0 x 4.0 = 24.0
正方形: 5.0 x 5.0 = 25.0
単位長方形: 1.0 x 1.0 = 1.0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 失敗するイニシャライザ</h2>
        <SwiftEditor
          defaultCode={`struct PositiveNumber {
    let value: Double

    init?(_ value: Double) {
        guard value > 0 else {
            return nil  // 0以下は失敗
        }
        self.value = value
    }
}

struct Email {
    let address: String

    init?(_ address: String) {
        guard address.contains("@") && address.contains(".") else {
            return nil  // 不正なメール形式は失敗
        }
        self.address = address
    }
}

// 成功ケース
if let num = PositiveNumber(42.0) {
    print("正の数: \\(num.value)")
}

// 失敗ケース
if let num = PositiveNumber(-5.0) {
    print("正の数: \\(num.value)")
} else {
    print("初期化失敗: 負の数は作れません")
}

// メール検証
if let email = Email("user@example.com") {
    print("有効なメール: \\(email.address)")
}

if let email = Email("invalid-email") {
    print("有効なメール: \\(email.address)")
} else {
    print("初期化失敗: 無効なメール形式")
}`}
          expectedOutput={`正の数: 42.0
初期化失敗: 負の数は作れません
有効なメール: user@example.com
初期化失敗: 無効なメール形式`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="structs" lessonId="initializers" />
      </div>
      <LessonNav lessons={lessons} currentId="initializers" basePath="/learn/structs" />
    </div>
  );
}

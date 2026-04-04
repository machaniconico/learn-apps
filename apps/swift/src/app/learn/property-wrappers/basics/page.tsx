import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "property-wrappers")!.lessons;

export default function PropertyWrappersBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">Property Wrapper レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Property Wrapperの基本</h1>
        <p className="text-gray-400">@propertyWrapperアトリビュートとwrappedValue/projectedValueの使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Property Wrapperとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-violet-300">Property Wrapper</code>はプロパティの読み書きに
          共通ロジックを付加する仕組みです。
          <code className="text-violet-300">@propertyWrapper</code>アトリビュートを付けた型を定義し、
          <code className="text-violet-300">wrappedValue</code>プロパティでラップする値を管理します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-violet-300">@propertyWrapper</code>を型に付ける</li>
          <li><code className="text-violet-300">wrappedValue</code>が必須プロパティ</li>
          <li><code className="text-violet-300">projectedValue</code>で$記法による追加アクセス（任意）</li>
          <li>struct・class・enumに適用可能</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">最初のProperty Wrapper</h2>
        <p className="text-gray-400 mb-4">
          文字列を常に小文字で保存するシンプルなProperty Wrapperを作ります。
        </p>
        <SwiftEditor
          defaultCode={`@propertyWrapper
struct Lowercased {
    private var value: String = ""

    var wrappedValue: String {
        get { value }
        set { value = newValue.lowercased() }
    }

    init(wrappedValue: String) {
        self.value = wrappedValue.lowercased()
    }
}

struct User {
    @Lowercased var email: String
    @Lowercased var username: String
}

var user = User(email: "TANAKA@EXAMPLE.COM", username: "Tanaka123")

print("メール:", user.email)       // tanaka@example.com
print("ユーザー名:", user.username) // tanaka123

user.email = "YAMADA@EXAMPLE.COM"
print("更新後:", user.email)       // yamada@example.com`}
          expectedOutput={`メール: tanaka@example.com
ユーザー名: tanaka123
更新後: yamada@example.com`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">wrappedValueとprojectedValue</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-300">wrappedValue</code>は通常アクセス、
          <code className="text-violet-300">projectedValue</code>は$記法でアクセスする追加情報です。
        </p>
        <SwiftEditor
          defaultCode={`@propertyWrapper
struct TrimmedString {
    private var value: String = ""

    // 通常アクセス: トリム済み文字列
    var wrappedValue: String {
        get { value }
        set { value = newValue.trimmingCharacters(in: .whitespacesAndNewlines) }
    }

    // $記法: 元の文字列と変更されたかどうか
    var projectedValue: (original: String, wasTrimmed: Bool) {
        let original = value
        let trimmed = original.trimmingCharacters(in: .whitespacesAndNewlines)
        return (original: original, wasTrimmed: original != trimmed)
    }

    init(wrappedValue: String) {
        self.value = wrappedValue.trimmingCharacters(in: .whitespacesAndNewlines)
    }
}

struct FormInput {
    @TrimmedString var name: String = "  田中太郎  "
    @TrimmedString var message: String = "こんにちは"
}

var form = FormInput()
print("名前:", form.name)              // "田中太郎"（トリム済み）
print("変更前の値は", form.$name)       // projectedValue

form.name = "  山田  "
print("更新後:", form.name)            // "山田"`}
          expectedOutput={`名前: 田中太郎
変更前の値は (original: "田中太郎", wasTrimmed: false)
更新後: 山田`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">初期値のカスタマイズ</h2>
        <p className="text-gray-400 mb-4">
          Property Wrapperの初期化に引数を渡すことで、動作をカスタマイズできます。
        </p>
        <SwiftEditor
          defaultCode={`@propertyWrapper
struct Bounded<T: Comparable> {
    private var value: T
    let min: T
    let max: T

    var wrappedValue: T {
        get { value }
        set { value = Swift.min(Swift.max(newValue, min), max) }
    }

    init(wrappedValue: T, min: T, max: T) {
        self.min = min
        self.max = max
        // 初期値も範囲内に収める
        self.value = Swift.min(Swift.max(wrappedValue, min), max)
    }
}

struct GamePlayer {
    @Bounded(min: 0, max: 100) var health: Int = 100
    @Bounded(min: 0, max: 999) var score: Int = 0
    @Bounded(min: 1, max: 10) var level: Int = 1
}

var player = GamePlayer()
print("HP:", player.health, "スコア:", player.score, "レベル:", player.level)

player.health -= 150  // 0以下にならない
player.score += 500
player.level = 15     // 10を超えない

print("HP:", player.health, "スコア:", player.score, "レベル:", player.level)`}
          expectedOutput={`HP: 100 スコア: 0 レベル: 1
HP: 0 スコア: 500 レベル: 10`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="property-wrappers" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/property-wrappers" />
    </div>
  );
}

import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "property-wrappers")!.lessons;

export default function CustomWrapperPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">Property Wrapper レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">カスタムWrapper作成</h1>
        <p className="text-gray-400">実用的なカスタムProperty Wrapperを設計・実装する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">カスタムWrapperの設計</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          カスタムProperty Wrapperを作る際は、以下の点を考慮します。
          Wrapperは構造体・クラス・列挙型のいずれでも作れますが、
          通常はstructが推奨されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>wrappedValueの型をジェネリクスにするか固定するか</li>
          <li>初期値のデフォルトを提供するか</li>
          <li>projectedValueで追加情報を提供するか</li>
          <li>structにするかclassにするか（値型vs参照型）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">UserDefaults連携Wrapper</h2>
        <p className="text-gray-400 mb-4">
          UserDefaultsへの読み書きを自動化するProperty Wrapperを作ります。
          （注: SwiftUIでは@AppStorageが標準ですが、純粋なSwiftコードでも使えます）
        </p>
        <SwiftEditor
          defaultCode={`@propertyWrapper
struct UserDefault<T> {
    let key: String
    let defaultValue: T

    var wrappedValue: T {
        get {
            UserDefaults.standard.object(forKey: key) as? T ?? defaultValue
        }
        set {
            UserDefaults.standard.set(newValue, forKey: key)
        }
    }

    // projectedValueでkeyを公開
    var projectedValue: String { key }
}

struct AppPreferences {
    @UserDefault(key: "theme", defaultValue: "light")
    var theme: String

    @UserDefault(key: "fontSize", defaultValue: 14)
    var fontSize: Int

    @UserDefault(key: "isFirstLaunch", defaultValue: true)
    var isFirstLaunch: Bool
}

var prefs = AppPreferences()
print("テーマ:", prefs.theme)            // light
print("フォントサイズ:", prefs.fontSize)  // 14
print("初回起動:", prefs.isFirstLaunch)  // true

prefs.theme = "dark"
prefs.fontSize = 16
prefs.isFirstLaunch = false

print("保存後テーマ:", prefs.theme)       // dark
print("キー名:", prefs.$theme)            // theme (projectedValue)`}
          expectedOutput={`テーマ: light
フォントサイズ: 14
初回起動: true
保存後テーマ: dark
キー名: theme`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ログ付きWrapper</h2>
        <p className="text-gray-400 mb-4">
          プロパティの変更を自動的にログ出力するProperty Wrapperです。
          デバッグやオーディットログに活用できます。
        </p>
        <SwiftEditor
          defaultCode={`@propertyWrapper
struct Logged<T: CustomStringConvertible> {
    private var value: T
    let name: String

    var wrappedValue: T {
        get { value }
        set {
            print("[LOG] \\(name): \\(value) → \\(newValue)")
            value = newValue
        }
    }

    var projectedValue: [String] {
        // 変更履歴を返す（簡略化）
        ["\\(name) = \\(value)"]
    }

    init(wrappedValue: T, name: String) {
        self.value = wrappedValue
        self.name = name
    }
}

struct BankAccount {
    @Logged(name: "残高") var balance: Double = 0
    @Logged(name: "取引数") var transactionCount: Int = 0

    mutating func deposit(_ amount: Double) {
        balance += amount
        transactionCount += 1
    }

    mutating func withdraw(_ amount: Double) {
        guard balance >= amount else {
            print("残高不足")
            return
        }
        balance -= amount
        transactionCount += 1
    }
}

var account = BankAccount()
account.deposit(10000)
account.deposit(5000)
account.withdraw(3000)
print("現在の残高:", account.balance)`}
          expectedOutput={`[LOG] 残高: 0.0 → 10000.0
[LOG] 取引数: 0 → 1
[LOG] 残高: 10000.0 → 15000.0
[LOG] 取引数: 1 → 2
[LOG] 残高: 15000.0 → 12000.0
[LOG] 取引数: 2 → 3
現在の残高: 12000.0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="property-wrappers" lessonId="custom" />
      </div>
      <LessonNav lessons={lessons} currentId="custom" basePath="/learn/property-wrappers" />
    </div>
  );
}

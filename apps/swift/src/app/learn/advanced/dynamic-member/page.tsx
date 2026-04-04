import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "advanced")!.lessons;

export default function DynamicMemberPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">上級機能 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">@dynamicMemberLookup</h1>
        <p className="text-gray-400">動的メンバーアクセスを実装してDSLや動的なプロパティアクセスを実現します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">@dynamicMemberLookupとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-red-300">@dynamicMemberLookup</code>属性を型に付けると、
          コンパイル時に存在しないプロパティ名でもドット記法でアクセスできるようになります。
          アクセスは<code className="text-red-300">subscript(dynamicMember:)</code>メソッドに転送されます。
          PythonブリッジやJSON操作、設定管理システムの実装に使われます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">@dynamicMemberLookup</code> — 型に付ける属性</li>
          <li><code className="text-blue-300">subscript(dynamicMember: String)</code> — 文字列ベースの動的アクセス</li>
          <li><code className="text-blue-300">subscript(dynamicMember: KeyPath)</code> — KeyPathベースの型安全な動的アクセス</li>
          <li><code className="text-blue-300">プロトコル拡張</code> — プロトコルに@dynamicMemberLookupを付けることも可能</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例1: JSON動的アクセス</h2>
        <SwiftEditor
          defaultCode={`// @dynamicMemberLookupを使ったJSON動的アクセス

@dynamicMemberLookup
struct JSON {
    private var dict: [String: Any]

    init(_ dict: [String: Any]) {
        self.dict = dict
    }

    subscript(dynamicMember key: String) -> JSON {
        if let nestedDict = dict[key] as? [String: Any] {
            return JSON(nestedDict)
        }
        return JSON([:])
    }

    var string: String? { dict.values.first as? String ?? dict["value"] as? String }
    var int: Int? { dict.values.first as? Int ?? dict["value"] as? Int }
    var array: [Any]? { dict.values.first as? [Any] }

    // キーでアクセスするバージョン
    subscript(key: String) -> Any? { dict[key] }
}

// JSONデータをシミュレート
let userData: [String: Any] = [
    "name": "田中太郎",
    "age": 28,
    "address": [
        "city": "東京",
        "zip": "100-0001"
    ]
]

let json = JSON(userData)

// ドット記法でアクセス（動的）
print("名前:", json["name"] as? String ?? "")
print("年齢:", json["age"] as? Int ?? 0)
print("住所:", (json["address"] as? [String: Any])?["city"] as? String ?? "")

// @dynamicMemberLookupの動的プロパティアクセス
let address = json.address
print("都市（動的）:", address["city"] as? String ?? "")
print("郵便番号（動的）:", address["zip"] as? String ?? "")`}
          expectedOutput={`名前: 田中太郎
年齢: 28
住所: 東京
都市（動的）: 東京
郵便番号（動的）: 100-0001`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">KeyPathベースの動的メンバーアクセス</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-red-300">subscript(dynamicMember:)</code>の引数型を<code className="text-red-300">KeyPath</code>にすると、
          型安全な動的アクセスが実現できます。これはSwiftUIの<code className="text-red-300">@Binding</code>や
          <code className="text-red-300">@Environment</code>の実装に使われている重要なテクニックです。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例2: KeyPathベースの動的アクセス</h2>
        <SwiftEditor
          defaultCode={`// KeyPathを使った型安全な@dynamicMemberLookup

struct User {
    var name: String
    var age: Int
    var email: String
}

@dynamicMemberLookup
struct Wrapper<T> {
    private var value: T

    init(_ value: T) {
        self.value = value
    }

    // KeyPathで型安全な動的アクセス
    subscript<U>(dynamicMember keyPath: KeyPath<T, U>) -> U {
        return value[keyPath: keyPath]
    }

    // WritableKeyPathでset/getの両方に対応
    subscript<U>(dynamicMember keyPath: WritableKeyPath<T, U>) -> U {
        get { value[keyPath: keyPath] }
        set { value[keyPath: keyPath] = newValue }
    }
}

var wrappedUser = Wrapper(User(name: "山田花子", age: 32, email: "hanako@example.com"))

// ドット記法で型安全にアクセス
print("名前:", wrappedUser.name)
print("年齢:", wrappedUser.age)
print("メール:", wrappedUser.email)

// 値を変更
wrappedUser.name = "山田花子（更新）"
print("更新後:", wrappedUser.name)

// 設定管理への応用
struct AppSettings {
    var isDarkMode: Bool = false
    var fontSize: Double = 16.0
    var language: String = "ja"
    var maxCacheSize: Int = 100
}

@dynamicMemberLookup
class SettingsManager {
    private var settings = AppSettings()

    subscript<T>(dynamicMember keyPath: WritableKeyPath<AppSettings, T>) -> T {
        get { settings[keyPath: keyPath] }
        set { settings[keyPath: keyPath] = newValue }
    }
}

let manager = SettingsManager()
print("\\nダークモード:", manager.isDarkMode)
print("フォントサイズ:", manager.fontSize)
manager.isDarkMode = true
manager.fontSize = 18.0
print("更新後ダークモード:", manager.isDarkMode)
print("更新後フォントサイズ:", manager.fontSize)`}
          expectedOutput={`名前: 山田花子
年齢: 32
メール: hanako@example.com
更新後: 山田花子（更新）

ダークモード: false
フォントサイズ: 16.0
更新後ダークモード: true
更新後フォントサイズ: 18.0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例3: 動的DSLビルダー</h2>
        <SwiftEditor
          defaultCode={`// @dynamicMemberLookupを使ったHTMLビルダーDSL

@dynamicMemberLookup
struct HTMLBuilder {
    private var content: String = ""

    // 動的にHTMLタグを生成
    subscript(dynamicMember tag: String) -> (String) -> HTMLBuilder {
        return { text in
            var builder = self
            builder.content += "<\\(tag)>\\(text)</\\(tag)>"
            return builder
        }
    }

    var build: String { content }
}

// チェーンしてHTMLを構築
let html = HTMLBuilder()
    .h1("Swift @dynamicMemberLookup")
    .p("動的メンバーアクセスは強力な機能です。")
    .p("DSLの構築に役立ちます。")

print("生成されたHTML:")
print(html.build)

// 設定ファイル風DSL
@dynamicMemberLookup
struct Config {
    private var values: [String: String] = [:]

    subscript(dynamicMember key: String) -> String {
        get { values[key] ?? "" }
    }

    mutating func set(_ key: String, _ value: String) {
        values[key] = value
    }
}

var config = Config()
config.set("host", "localhost")
config.set("port", "8080")
config.set("database", "mydb")

print("\\nサーバー設定:")
print("ホスト:", config.host)
print("ポート:", config.port)
print("データベース:", config.database)`}
          expectedOutput={`生成されたHTML:
<h1>Swift @dynamicMemberLookup</h1><p>動的メンバーアクセスは強力な機能です。</p><p>DSLの構築に役立ちます。</p>

サーバー設定:
ホスト: localhost
ポート: 8080
データベース: mydb`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="advanced" lessonId="dynamic-member" />
      </div>
      <LessonNav lessons={lessons} currentId="dynamic-member" basePath="/learn/advanced" />
    </div>
  );
}

import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "patterns")!.lessons;

export default function BuilderPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">デザインパターン レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Builder</h1>
        <p className="text-gray-400">複雑なオブジェクトを段階的に構築するBuilderパターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Builderパターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-purple-300">Builderパターン</code>は、複雑なオブジェクトの構築プロセスを表現から分離する生成パターンです。
          多くのオプションパラメータを持つオブジェクトを生成する際、長いイニシャライザの代わりにメソッドチェーンで
          段階的に設定できます。Swiftでは<code className="text-purple-300">@resultBuilder</code>を使ったDSLスタイルも可能です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">Builder クラス/構造体</code> — 構築状態を保持するオブジェクト</li>
          <li><code className="text-blue-300">メソッドチェーン</code> — 各設定メソッドがselfを返す</li>
          <li><code className="text-blue-300">build()</code> — 最終的なオブジェクトを生成するメソッド</li>
          <li><code className="text-blue-300">Director</code> — 構築手順を定義するオプショナルな役割</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例1: HTTPリクエストのBuilder</h2>
        <SwiftEditor
          defaultCode={`import Foundation

// Builderパターン: HTTPリクエスト構築
struct HTTPRequest {
    let url: String
    let method: String
    let headers: [String: String]
    let body: String?
    let timeout: TimeInterval
}

class HTTPRequestBuilder {
    private var url: String = ""
    private var method: String = "GET"
    private var headers: [String: String] = [:]
    private var body: String? = nil
    private var timeout: TimeInterval = 30.0

    @discardableResult
    func setURL(_ url: String) -> HTTPRequestBuilder {
        self.url = url
        return self
    }

    @discardableResult
    func setMethod(_ method: String) -> HTTPRequestBuilder {
        self.method = method
        return self
    }

    @discardableResult
    func addHeader(key: String, value: String) -> HTTPRequestBuilder {
        self.headers[key] = value
        return self
    }

    @discardableResult
    func setBody(_ body: String) -> HTTPRequestBuilder {
        self.body = body
        return self
    }

    @discardableResult
    func setTimeout(_ timeout: TimeInterval) -> HTTPRequestBuilder {
        self.timeout = timeout
        return self
    }

    func build() -> HTTPRequest {
        return HTTPRequest(
            url: url,
            method: method,
            headers: headers,
            body: body,
            timeout: timeout
        )
    }
}

// メソッドチェーンで直感的に構築
let request = HTTPRequestBuilder()
    .setURL("https://api.example.com/users")
    .setMethod("POST")
    .addHeader(key: "Content-Type", value: "application/json")
    .addHeader(key: "Authorization", value: "Bearer token123")
    .setBody("{\"name\": \"Swift\"}")
    .setTimeout(60.0)
    .build()

print("URL:", request.url)
print("メソッド:", request.method)
print("ヘッダー数:", request.headers.count)
print("ボディ:", request.body ?? "なし")
print("タイムアウト:", request.timeout, "秒")`}
          expectedOutput={`URL: https://api.example.com/users
メソッド: POST
ヘッダー数: 2
ボディ: {"name": "Swift"}
タイムアウト: 60.0 秒`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">SwiftスタイルのBuilderパターン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swiftでは<code className="text-purple-300">クロージャを使った初期化パターン</code>もよく使われます。
          オブジェクトを作成してクロージャ内で設定する方法は、SwiftUIの<code className="text-purple-300">configure()</code>パターンに似ています。
          これにより、設定と作成を一か所にまとめて可読性を高めます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例2: UIコンポーネントのBuilder</h2>
        <SwiftEditor
          defaultCode={`// SwiftスタイルのBuilderパターン

// プロトコルによるconfigure拡張
protocol Configurable {}

extension Configurable {
    @discardableResult
    func configure(_ block: (inout Self) -> Void) -> Self {
        var copy = self
        block(&copy)
        return copy
    }
}

// フォーム設定のBuilder
struct FormConfig: Configurable {
    var title: String = ""
    var placeholder: String = ""
    var isRequired: Bool = false
    var maxLength: Int = 255
    var validationPattern: String? = nil
}

struct AlertConfig: Configurable {
    var title: String = ""
    var message: String = ""
    var confirmLabel: String = "OK"
    var cancelLabel: String? = nil
    var isDestructive: Bool = false
}

// クロージャスタイルで設定
let emailField = FormConfig().configure {
    $0.title = "メールアドレス"
    $0.placeholder = "example@email.com"
    $0.isRequired = true
    $0.maxLength = 100
    $0.validationPattern = "^[A-Za-z0-9+_.-]+@(.+)$"
}

let deleteAlert = AlertConfig().configure {
    $0.title = "削除確認"
    $0.message = "このアイテムを削除しますか？"
    $0.confirmLabel = "削除"
    $0.cancelLabel = "キャンセル"
    $0.isDestructive = true
}

print("フォーム設定:")
print("  タイトル:", emailField.title)
print("  必須:", emailField.isRequired)
print("  最大文字数:", emailField.maxLength)
print("アラート設定:")
print("  タイトル:", deleteAlert.title)
print("  破壊的操作:", deleteAlert.isDestructive)
print("  キャンセルラベル:", deleteAlert.cancelLabel ?? "なし")`}
          expectedOutput={`フォーム設定:
  タイトル: メールアドレス
  必須: true
  最大文字数: 100
アラート設定:
  タイトル: 削除確認
  破壊的操作: true
  キャンセルラベル: キャンセル`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例3: DirectorパターンでBuilderを制御</h2>
        <SwiftEditor
          defaultCode={`// Directorパターン: 構築手順を再利用可能にする

struct Pizza {
    let size: String
    let crust: String
    let sauce: String
    let toppings: [String]
}

class PizzaBuilder {
    private var size: String = "M"
    private var crust: String = "薄生地"
    private var sauce: String = "トマト"
    private var toppings: [String] = []

    func setSize(_ size: String) -> PizzaBuilder {
        self.size = size; return self
    }
    func setCrust(_ crust: String) -> PizzaBuilder {
        self.crust = crust; return self
    }
    func setSauce(_ sauce: String) -> PizzaBuilder {
        self.sauce = sauce; return self
    }
    func addTopping(_ topping: String) -> PizzaBuilder {
        self.toppings.append(topping); return self
    }
    func reset() -> PizzaBuilder {
        size = "M"; crust = "薄生地"; sauce = "トマト"; toppings = []
        return self
    }
    func build() -> Pizza {
        return Pizza(size: size, crust: crust, sauce: sauce, toppings: toppings)
    }
}

// Directorが構築手順を定義
class PizzaDirector {
    private let builder: PizzaBuilder

    init(builder: PizzaBuilder) {
        self.builder = builder
    }

    func buildMargherita() -> Pizza {
        return builder.reset()
            .setSize("M")
            .setCrust("薄生地")
            .setSauce("トマト")
            .addTopping("モッツァレラ")
            .addTopping("バジル")
            .build()
    }

    func buildMeatLover() -> Pizza {
        return builder.reset()
            .setSize("L")
            .setCrust("厚生地")
            .setSauce("トマト")
            .addTopping("ペパロニ")
            .addTopping("ソーセージ")
            .addTopping("ベーコン")
            .build()
    }
}

let director = PizzaDirector(builder: PizzaBuilder())

let margherita = director.buildMargherita()
print("マルゲリータ: \\(margherita.size) / \\(margherita.crust) / トッピング: \\(margherita.toppings.joined(separator: ", "))")

let meatLover = director.buildMeatLover()
print("ミートラバー: \\(meatLover.size) / \\(meatLover.crust) / トッピング: \\(meatLover.toppings.joined(separator: ", "))")`}
          expectedOutput={`マルゲリータ: M / 薄生地 / トッピング: モッツァレラ, バジル
ミートラバー: L / 厚生地 / トッピング: ペパロニ, ソーセージ, ベーコン`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="patterns" lessonId="builder" />
      </div>
      <LessonNav lessons={lessons} currentId="builder" basePath="/learn/patterns" />
    </div>
  );
}

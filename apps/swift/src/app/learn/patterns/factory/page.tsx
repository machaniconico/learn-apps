import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "patterns")!.lessons;

export default function FactoryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">デザインパターン レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Factoryパターン</h1>
        <p className="text-gray-400">オブジェクト生成を抽象化・集約するFactoryパターンの実装を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Factoryパターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-purple-300">Factory</code>パターンはオブジェクトの生成ロジックを
          専門のファクトリクラス・メソッドに集約するデザインパターンです。
          生成の詳細を隠蔽し、呼び出し元は具体的な型を知らなくてよくなります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>生成ロジックを一箇所に集約する</li>
          <li>Factory Method: メソッドでオブジェクトを生成</li>
          <li>Abstract Factory: 関連オブジェクト群を生成するインターフェース</li>
          <li>DIと組み合わせるとテストしやすくなる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Factory Methodパターン</h2>
        <p className="text-gray-400 mb-4">
          ボタンやUIコンポーネントの生成をファクトリに集約します。
        </p>
        <SwiftEditor
          defaultCode={`import Foundation

// プロトコルで共通インターフェースを定義
protocol PaymentProcessor {
    var name: String { get }
    func processPayment(amount: Int) -> String
    func validateCard(number: String) -> Bool
}

// 具体的な実装
class CreditCardProcessor: PaymentProcessor {
    let name = "クレジットカード"

    func processPayment(amount: Int) -> String {
        "クレジットカードで ¥\\(amount) を処理しました"
    }

    func validateCard(number: String) -> Bool {
        number.count == 16 && number.allSatisfy { $0.isNumber }
    }
}

class PayPalProcessor: PaymentProcessor {
    let name = "PayPal"
    let email: String

    init(email: String) { self.email = email }

    func processPayment(amount: Int) -> String {
        "PayPal (\\(email)) で ¥\\(amount) を処理しました"
    }

    func validateCard(number: String) -> Bool { true }
}

class ApplePayProcessor: PaymentProcessor {
    let name = "Apple Pay"

    func processPayment(amount: Int) -> String {
        "Apple Pay で ¥\\(amount) を処理しました（Touch ID確認済み）"
    }

    func validateCard(number: String) -> Bool { true }
}

// Factory: 生成ロジックを集約
enum PaymentMethod {
    case creditCard
    case paypal(email: String)
    case applePay
}

class PaymentProcessorFactory {
    static func create(for method: PaymentMethod) -> PaymentProcessor {
        switch method {
        case .creditCard:
            return CreditCardProcessor()
        case .paypal(let email):
            return PayPalProcessor(email: email)
        case .applePay:
            return ApplePayProcessor()
        }
    }
}

// 呼び出し元は具体的な型を知らなくてよい
let methods: [PaymentMethod] = [
    .creditCard,
    .paypal(email: "user@example.com"),
    .applePay,
]

for method in methods {
    let processor = PaymentProcessorFactory.create(for: method)
    print(processor.processPayment(amount: 3980))
}`}
          expectedOutput={`クレジットカードで ¥3980 を処理しました
PayPal (user@example.com) で ¥3980 を処理しました
Apple Pay で ¥3980 を処理しました（Touch ID確認済み）`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Abstract Factoryパターン</h2>
        <p className="text-gray-400 mb-4">
          関連するオブジェクト群をまとめて生成するAbstract Factoryパターンです。
          テーマ（ライト/ダーク）に応じてUIコンポーネント群を生成します。
        </p>
        <SwiftEditor
          defaultCode={`import Foundation

// Abstract Factory: 関連オブジェクト群のファクトリ
protocol UIComponentFactory {
    func makeButton(title: String) -> UIComponent
    func makeInput(placeholder: String) -> UIComponent
    func makeCard(content: String) -> UIComponent
}

struct UIComponent {
    let type: String
    let style: String
    let content: String

    func render() -> String {
        "[\\(style) \\(type)] \\(content)"
    }
}

// ライトテーマファクトリ
class LightThemeFactory: UIComponentFactory {
    func makeButton(title: String) -> UIComponent {
        UIComponent(type: "Button", style: "Light", content: title)
    }
    func makeInput(placeholder: String) -> UIComponent {
        UIComponent(type: "Input", style: "Light", content: placeholder)
    }
    func makeCard(content: String) -> UIComponent {
        UIComponent(type: "Card", style: "Light", content: content)
    }
}

// ダークテーマファクトリ
class DarkThemeFactory: UIComponentFactory {
    func makeButton(title: String) -> UIComponent {
        UIComponent(type: "Button", style: "Dark", content: title)
    }
    func makeInput(placeholder: String) -> UIComponent {
        UIComponent(type: "Input", style: "Dark", content: placeholder)
    }
    func makeCard(content: String) -> UIComponent {
        UIComponent(type: "Card", style: "Dark", content: content)
    }
}

// Factoryを使う側（具体的な型を知らない）
class LoginScreen {
    private let factory: UIComponentFactory

    init(factory: UIComponentFactory) {
        self.factory = factory
    }

    func render() {
        let button = factory.makeButton(title: "ログイン")
        let input = factory.makeInput(placeholder: "メールアドレス")
        let card = factory.makeCard(content: "ログインフォーム")

        print(card.render())
        print(input.render())
        print(button.render())
    }
}

print("=== ライトテーマ ===")
LoginScreen(factory: LightThemeFactory()).render()

print("\\n=== ダークテーマ ===")
LoginScreen(factory: DarkThemeFactory()).render()`}
          expectedOutput={`=== ライトテーマ ===
[Light Card] ログインフォーム
[Light Input] メールアドレス
[Light Button] ログイン

=== ダークテーマ ===
[Dark Card] ログインフォーム
[Dark Input] メールアドレス
[Dark Button] ログイン`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="patterns" lessonId="factory" />
      </div>
      <LessonNav lessons={lessons} currentId="factory" basePath="/learn/patterns" />
    </div>
  );
}

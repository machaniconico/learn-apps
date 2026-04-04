import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "patterns")!.lessons;

export default function StrategyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">デザインパターン レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Strategy</h1>
        <p className="text-gray-400">アルゴリズムを交換可能にするStrategyパターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Strategyパターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-purple-300">Strategyパターン</code>は、アルゴリズムのファミリーを定義し、それぞれをカプセル化して交換可能にする振る舞いパターンです。
          Swiftではプロトコルを使って戦略インターフェースを定義し、具体的なアルゴリズムを準拠した型として実装します。
          クライアントコードはプロトコル経由でアルゴリズムを使用するため、実装を意識せずに切り替えられます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">Strategy プロトコル</code> — アルゴリズムの共通インターフェース</li>
          <li><code className="text-blue-300">ConcreteStrategy</code> — 具体的なアルゴリズムの実装</li>
          <li><code className="text-blue-300">Context</code> — Strategyを保持して利用するオブジェクト</li>
          <li><code className="text-blue-300">クロージャ版</code> — シンプルな場合はクロージャでStrategyを表現</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例1: ソート戦略の切り替え</h2>
        <SwiftEditor
          defaultCode={`// Strategyパターン: ソートアルゴリズムの交換

// Strategy プロトコル
protocol SortStrategy {
    func sort(_ array: [Int]) -> [Int]
}

// ConcreteStrategy 1: バブルソート
struct BubbleSortStrategy: SortStrategy {
    func sort(_ array: [Int]) -> [Int] {
        var arr = array
        for i in 0..<arr.count {
            for j in 0..<(arr.count - i - 1) {
                if arr[j] > arr[j + 1] { arr.swapAt(j, j + 1) }
            }
        }
        return arr
    }
}

// ConcreteStrategy 2: 標準ソート
struct StandardSortStrategy: SortStrategy {
    func sort(_ array: [Int]) -> [Int] {
        return array.sorted()
    }
}

// ConcreteStrategy 3: 逆順ソート
struct ReverseSortStrategy: SortStrategy {
    func sort(_ array: [Int]) -> [Int] {
        return array.sorted(by: >)
    }
}

// Context: Strategyを保持して使用
class Sorter {
    var strategy: SortStrategy

    init(strategy: SortStrategy) {
        self.strategy = strategy
    }

    func sort(_ array: [Int]) -> [Int] {
        return strategy.sort(array)
    }
}

let numbers = [5, 2, 8, 1, 9, 3]
let sorter = Sorter(strategy: StandardSortStrategy())

print("入力:", numbers)
print("昇順:", sorter.sort(numbers))

// 実行時に戦略を切り替え
sorter.strategy = ReverseSortStrategy()
print("降順:", sorter.sort(numbers))

sorter.strategy = BubbleSortStrategy()
print("バブル:", sorter.sort(numbers))`}
          expectedOutput={`入力: [5, 2, 8, 1, 9, 3]
昇順: [1, 2, 3, 5, 8, 9]
降順: [9, 8, 5, 3, 2, 1]
バブル: [1, 2, 3, 5, 8, 9]`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">クロージャを使ったStrategyパターン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swiftでは、シンプルなStrategyはプロトコルの代わりに<code className="text-purple-300">クロージャ（関数型）</code>で表現できます。
          これにより型定義が不要になり、コードが簡潔になります。
          複雑なロジックや状態が必要な場合はプロトコルを、単純な変換処理にはクロージャを使うと良いでしょう。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例2: バリデーション戦略</h2>
        <SwiftEditor
          defaultCode={`// クロージャ版Strategyパターン: バリデーション

// バリデーション戦略をクロージャで定義
typealias ValidationStrategy = (String) -> String?  // nilなら成功、Stringならエラーメッセージ

// 具体的なバリデーション戦略
let notEmptyStrategy: ValidationStrategy = { value in
    value.isEmpty ? "入力は必須です" : nil
}

let emailStrategy: ValidationStrategy = { value in
    let parts = value.split(separator: "@")
    return parts.count == 2 && !parts[1].isEmpty ? nil : "有効なメールアドレスを入力してください"
}

let minLengthStrategy: (Int) -> ValidationStrategy = { minLen in
    { value in
        value.count >= minLen ? nil : "\\(minLen)文字以上で入力してください"
    }
}

let numericStrategy: ValidationStrategy = { value in
    Int(value) != nil ? nil : "数値を入力してください"
}

// バリデーターコンテキスト
struct Validator {
    private let strategies: [ValidationStrategy]

    init(strategies: ValidationStrategy...) {
        self.strategies = strategies
    }

    func validate(_ value: String) -> [String] {
        return strategies.compactMap { $0(value) }
    }
}

// 組み合わせてバリデーター作成
let emailValidator = Validator(strategies: notEmptyStrategy, emailStrategy, minLengthStrategy(5))
let ageValidator = Validator(strategies: notEmptyStrategy, numericStrategy)

func printValidation(label: String, errors: [String]) {
    if errors.isEmpty {
        print("\\(label): OK")
    } else {
        print("\\(label): 失敗 - \\(errors.joined(separator: ", "))")
    }
}

printValidation(label: "メール(空)", errors: emailValidator.validate(""))
printValidation(label: "メール(無効)", errors: emailValidator.validate("invalid"))
printValidation(label: "メール(有効)", errors: emailValidator.validate("test@example.com"))
printValidation(label: "年齢(数値)", errors: ageValidator.validate("25"))
printValidation(label: "年齢(文字列)", errors: ageValidator.validate("abc"))`}
          expectedOutput={`メール(空): 失敗 - 入力は必須です, 有効なメールアドレスを入力してください, 5文字以上で入力してください
メール(無効): 失敗 - 有効なメールアドレスを入力してください
メール(有効): OK
年齢(数値): OK
年齢(文字列): 失敗 - 数値を入力してください`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例3: 支払い戦略パターン</h2>
        <SwiftEditor
          defaultCode={`// Strategyパターン: 支払い方法の切り替え

protocol PaymentStrategy {
    var name: String { get }
    func pay(amount: Double) -> String
}

struct CreditCardPayment: PaymentStrategy {
    let cardNumber: String
    var name: String { "クレジットカード" }

    func pay(amount: Double) -> String {
        let masked = String(cardNumber.suffix(4))
        return "カード末尾\\(masked)で \\(amount)円 を決済しました"
    }
}

struct CashPayment: PaymentStrategy {
    var name: String { "現金" }

    func pay(amount: Double) -> String {
        return "現金で \\(amount)円 を支払いました"
    }
}

struct PointPayment: PaymentStrategy {
    let availablePoints: Int
    var name: String { "ポイント" }

    func pay(amount: Double) -> String {
        let points = Int(amount)
        guard points <= availablePoints else {
            return "ポイントが不足しています（必要: \\(points)pt / 保有: \\(availablePoints)pt）"
        }
        return "\\(points)ポイントで \\(amount)円 を支払いました"
    }
}

class ShoppingCart {
    var paymentStrategy: PaymentStrategy
    private var items: [(name: String, price: Double)] = []

    init(strategy: PaymentStrategy) {
        self.paymentStrategy = strategy
    }

    func addItem(name: String, price: Double) {
        items.append((name, price))
    }

    func checkout() {
        let total = items.reduce(0) { $0 + $1.price }
        print("支払方法: \\(paymentStrategy.name)")
        print("合計: \\(total)円")
        print(paymentStrategy.pay(amount: total))
    }
}

let cart = ShoppingCart(strategy: CreditCardPayment(cardNumber: "1234567890123456"))
cart.addItem(name: "Swift本", price: 3500)
cart.addItem(name: "キーボード", price: 12000)
cart.checkout()

print("---")
cart.paymentStrategy = PointPayment(availablePoints: 20000)
cart.checkout()`}
          expectedOutput={`支払方法: クレジットカード
合計: 15500.0円
カード末尾3456で 15500.0円 を決済しました
---
支払方法: ポイント
合計: 15500.0円
15500ポイントで 15500.0円 を支払いました`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="patterns" lessonId="strategy" />
      </div>
      <LessonNav lessons={lessons} currentId="strategy" basePath="/learn/patterns" />
    </div>
  );
}

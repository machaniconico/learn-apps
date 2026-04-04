import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "extensions")!.lessons;

export default function NestedTypesExtPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">拡張 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ネスト型の追加</h1>
        <p className="text-gray-400">extensionを使って既存の型にネストされた型を定義します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">extensionでネスト型を追加</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swiftでは型の中に型（ネスト型）を定義できます。
          extensionを使うことで、既存の型に後からネスト型（struct、class、enum）を追加できます。
          ネスト型は外側の型と密接に関連するヘルパー型の整理に役立ち、名前空間の整理にも使われます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>ネスト型には <code className="text-cyan-300">OuterType.InnerType</code> でアクセス</li>
          <li>extensionで後からネスト型を追加してコードを整理できる</li>
          <li>enum・struct・classすべてネスト型として定義可能</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: Intにネスト型enumを追加</h2>
        <SwiftEditor
          defaultCode={`extension Int {
    enum Kind {
        case negative
        case zero
        case positive
    }

    var kind: Kind {
        if self < 0 { return .negative }
        if self == 0 { return .zero }
        return .positive
    }
}

func describeNumber(_ n: Int) {
    switch n.kind {
    case .negative: print("\\(n) は負の数")
    case .zero:     print("\\(n) はゼロ")
    case .positive: print("\\(n) は正の数")
    }
}

describeNumber(-5)
describeNumber(0)
describeNumber(42)`}
          expectedOutput={`-5 は負の数
0 はゼロ
42 は正の数`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 既存structにネスト型を追加</h2>
        <SwiftEditor
          defaultCode={`struct Order {
    var id: String
    var amount: Double
}

// extensionでネスト型を追加
extension Order {
    enum Status {
        case pending
        case processing
        case shipped
        case delivered

        var label: String {
            switch self {
            case .pending:    return "保留中"
            case .processing: return "処理中"
            case .shipped:    return "発送済み"
            case .delivered:  return "配達完了"
            }
        }
    }

    struct Summary {
        var orderId: String
        var status: Status
        var displayAmount: String
    }

    func makeSummary(status: Status) -> Summary {
        Summary(
            orderId: id,
            status: status,
            displayAmount: "¥\\(Int(amount))"
        )
    }
}

let order = Order(id: "ORD-001", amount: 3500)
let summary = order.makeSummary(status: .shipped)
print("注文ID: \\(summary.orderId)")
print("状態: \\(summary.status.label)")
print("金額: \\(summary.displayAmount)")`}
          expectedOutput={`注文ID: ORD-001
状態: 発送済み
金額: ¥3500`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: Stringにネスト型でパーサを整理</h2>
        <SwiftEditor
          defaultCode={`extension String {
    struct ParseResult {
        var words: [String]
        var wordCount: Int
        var charCount: Int

        func describe() {
            print("単語数: \\(wordCount), 文字数: \\(charCount)")
            print("単語: \\(words.joined(separator: ", "))")
        }
    }

    enum Separator {
        case space
        case comma
        case custom(Character)

        var character: Character {
            switch self {
            case .space:          return " "
            case .comma:          return ","
            case .custom(let ch): return ch
            }
        }
    }

    func parse(by separator: Separator) -> ParseResult {
        let words = self
            .split(separator: separator.character)
            .map { String($0).trimmingCharacters(in: .whitespaces) }
            .filter { !$0.isEmpty }
        return ParseResult(words: words, wordCount: words.count, charCount: count)
    }
}

let sentence = "Swift, Kotlin, Python, Go"
let result = sentence.parse(by: .comma)
result.describe()`}
          expectedOutput={`単語数: 4, 文字数: 24
単語: Swift, Kotlin, Python, Go`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="extensions" lessonId="nested-types" />
      </div>
      <LessonNav lessons={lessons} currentId="nested-types" basePath="/learn/extensions" />
    </div>
  );
}

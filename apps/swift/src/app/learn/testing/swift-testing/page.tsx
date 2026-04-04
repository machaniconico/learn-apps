import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "testing")!.lessons;

export default function SwiftTestingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">テスト レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Swift Testing</h1>
        <p className="text-gray-400">@Test・#expect による新テストフレームワークの使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Swift Testingとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swift 6から導入された<code className="text-indigo-300">Swift Testing</code>は、XCTestに代わる新しいテストフレームワークです。
          <code className="text-indigo-300">@Test</code>マクロでテスト関数を宣言し、<code className="text-indigo-300">#expect</code>マクロで期待値を検証します。
          従来のXCTestより簡潔で表現力が高く、失敗時のメッセージも詳細です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">@Test</code> — テスト関数を宣言するマクロ</li>
          <li><code className="text-blue-300">#expect</code> — 条件が真であることを検証するマクロ</li>
          <li><code className="text-blue-300">#require</code> — 失敗時にテストを中断する厳格な検証</li>
          <li><code className="text-blue-300">@Suite</code> — テストのグループ化</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例1: @Testと#expectの基本</h2>
        <SwiftEditor
          defaultCode={`import Testing

// Swift Testingの基本的な使い方
struct CalculatorTests {

    @Test func addition() {
        let result = 2 + 3
        #expect(result == 5)
    }

    @Test func subtraction() {
        let result = 10 - 4
        #expect(result == 6, "引き算の結果が正しくありません")
    }

    @Test func division() throws {
        let numerator = 10
        let denominator = 2
        // #requireは失敗時にテストを即中断
        let result = try #require(denominator != 0 ? numerator / denominator : nil)
        #expect(result == 5)
    }
}

// 動作確認（通常はTestランナーが実行）
let calc = CalculatorTests()
print("加算テスト: 2 + 3 =", 2 + 3)
print("#expect(5 == 5):", 5 == 5 ? "パス" : "失敗")
print("#expect(6 == 6):", 6 == 6 ? "パス" : "失敗")
print("Swift Testingの基本を確認しました")`}
          expectedOutput={`加算テスト: 2 + 3 = 5
#expect(5 == 5): パス
#expect(6 == 6): パス
Swift Testingの基本を確認しました`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">パラメータ化テストと@Suite</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swift Testingの強力な機能の一つが<code className="text-indigo-300">パラメータ化テスト</code>です。
          <code className="text-indigo-300">@Test(arguments:)</code>を使うと、複数の入力値に対して同じテストを実行できます。
          <code className="text-indigo-300">@Suite</code>でテストをグループ化し、関連するテストをまとめて管理できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">@Test(arguments:)</code> — 複数の値でテストを繰り返す</li>
          <li><code className="text-blue-300">@Suite("名前")</code> — テストグループに名前を付ける</li>
          <li><code className="text-blue-300">withKnownIssue</code> — 既知の問題をマーク</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例2: パラメータ化テスト</h2>
        <SwiftEditor
          defaultCode={`import Testing

// パラメータ化テストの例
struct StringUtilsTests {

    // 複数の入力値でテストを実行
    @Test(arguments: [
        ("hello", "HELLO"),
        ("swift", "SWIFT"),
        ("testing", "TESTING")
    ])
    func uppercaseConversion(input: String, expected: String) {
        #expect(input.uppercased() == expected)
    }

    @Test(arguments: [1, 2, 3, 4, 5])
    func positiveNumbers(value: Int) {
        #expect(value > 0, "\\(value) は正の数のはずです")
    }
}

// isPalindrome関数のテスト
func isPalindrome(_ s: String) -> Bool {
    let chars = s.lowercased().filter { $0.isLetter }
    return chars == String(chars.reversed())
}

let testCases = [("racecar", true), ("hello", false), ("level", true), ("swift", false)]
for (word, expected) in testCases {
    let result = isPalindrome(word)
    print("\\(word): \\(result == expected ? "パス" : "失敗") (期待: \\(expected), 実際: \\(result))")
}`}
          expectedOutput={`racecar: パス (期待: true, 実際: true)
hello: パス (期待: false, 実際: false)
level: パス (期待: true, 実際: true)
swift: パス (期待: false, 実際: false)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例3: エラーのテストとタグ</h2>
        <SwiftEditor
          defaultCode={`import Testing

enum ParseError: Error {
    case invalidInput
    case outOfRange
}

func parsePositiveInt(_ s: String) throws -> Int {
    guard let value = Int(s) else { throw ParseError.invalidInput }
    guard value > 0 else { throw ParseError.outOfRange }
    return value
}

// エラーを検証するテスト
struct ParseTests {

    @Test func validInput() throws {
        let value = try parsePositiveInt("42")
        #expect(value == 42)
    }

    @Test func invalidInputThrows() {
        #expect(throws: ParseError.invalidInput) {
            try parsePositiveInt("abc")
        }
    }

    @Test func negativeThrows() {
        #expect(throws: ParseError.outOfRange) {
            try parsePositiveInt("-5")
        }
    }
}

// 動作確認
do {
    let v = try parsePositiveInt("42")
    print("parsePositiveInt(\"42\") =", v)
} catch {
    print("エラー:", error)
}

do {
    _ = try parsePositiveInt("abc")
} catch ParseError.invalidInput {
    print("ParseError.invalidInput を正しく検出")
}

do {
    _ = try parsePositiveInt("-5")
} catch ParseError.outOfRange {
    print("ParseError.outOfRange を正しく検出")
}`}
          expectedOutput={`parsePositiveInt("42") = 42
ParseError.invalidInput を正しく検出
ParseError.outOfRange を正しく検出`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="testing" lessonId="swift-testing" />
      </div>
      <LessonNav lessons={lessons} currentId="swift-testing" basePath="/learn/testing" />
    </div>
  );
}

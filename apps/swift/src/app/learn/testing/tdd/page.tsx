import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "testing")!.lessons;

export default function TDDPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">テスト レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">TDD（テスト駆動開発）</h1>
        <p className="text-gray-400">Red-Green-RefactorサイクルによるTDDの実践方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">TDDとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-indigo-300">TDD（Test-Driven Development）</code>はテストを先に書いてから
          実装するソフトウェア開発手法です。
          <code className="text-indigo-300">Red → Green → Refactor</code>の3ステップを繰り返します。
        </p>
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 font-semibold mb-1">1. Red</p>
            <p className="text-gray-400 text-xs">失敗するテストを書く。まだ実装がないのでテストは失敗する。</p>
          </div>
          <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-green-400 font-semibold mb-1">2. Green</p>
            <p className="text-gray-400 text-xs">テストが通る最小限のコードを実装する。完璧でなくてよい。</p>
          </div>
          <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-blue-400 font-semibold mb-1">3. Refactor</p>
            <p className="text-gray-400 text-xs">テストが通った状態のままコードを整理・改善する。</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">TDDの実践例：スタック実装</h2>
        <p className="text-gray-400 mb-4">
          Stackデータ構造をTDDで実装します。テストを先に書き、それに合わせて実装を進めます。
        </p>
        <SwiftEditor
          defaultCode={`import XCTest

// === Step 1: Red - テストを先に書く ===
// （この時点ではStackが未実装のためコンパイルエラーになる）

// === Step 2: Green - 最小限の実装 ===
struct Stack<T> {
    private var storage: [T] = []

    var isEmpty: Bool { storage.isEmpty }
    var count: Int { storage.count }
    var top: T? { storage.last }

    mutating func push(_ element: T) {
        storage.append(element)
    }

    mutating func pop() -> T? {
        storage.popLast()
    }
}

// === Step 3: テストを通す確認 ===
class StackTests: XCTestCase {

    func testNewStackIsEmpty() {
        let stack = Stack<Int>()
        XCTAssertTrue(stack.isEmpty)
        XCTAssertEqual(stack.count, 0)
    }

    func testPush() {
        var stack = Stack<Int>()
        stack.push(1)
        XCTAssertFalse(stack.isEmpty)
        XCTAssertEqual(stack.count, 1)
        XCTAssertEqual(stack.top, 1)
    }

    func testPop() {
        var stack = Stack<Int>()
        stack.push(1)
        stack.push(2)
        stack.push(3)

        XCTAssertEqual(stack.pop(), 3)  // LIFO
        XCTAssertEqual(stack.pop(), 2)
        XCTAssertEqual(stack.count, 1)
    }

    func testPopFromEmptyReturnsNil() {
        var stack = Stack<Int>()
        XCTAssertNil(stack.pop())
    }

    func testTopDoesNotRemoveElement() {
        var stack = Stack<Int>()
        stack.push(42)
        _ = stack.top
        XCTAssertEqual(stack.count, 1)
    }
}

// 動作確認
var stack = Stack<String>()
print("空?", stack.isEmpty)
stack.push("A")
stack.push("B")
stack.push("C")
print("サイズ:", stack.count, "先頭:", stack.top ?? "")
print("pop:", stack.pop() ?? "", stack.pop() ?? "")
print("残り:", stack.count)`}
          expectedOutput={`空? true
サイズ: 3 先頭: C
pop: C B
残り: 1`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">TDDのメリットと注意点</h2>
        <p className="text-gray-400 mb-4">
          TDDを実際のプロジェクトに適用するためのポイントを理解します。
        </p>
        <SwiftEditor
          defaultCode={`import XCTest

// TDD実践例：バリデーター
// Step1 Red: テストを先に書く
class EmailValidatorTests: XCTestCase {

    var validator: EmailValidator!

    override func setUp() {
        validator = EmailValidator()
    }

    func testValidEmail() {
        XCTAssertTrue(validator.isValid("user@example.com"))
        XCTAssertTrue(validator.isValid("test.email+tag@domain.co.jp"))
    }

    func testInvalidEmail_missingAt() {
        XCTAssertFalse(validator.isValid("userexample.com"))
    }

    func testInvalidEmail_missingDomain() {
        XCTAssertFalse(validator.isValid("user@"))
    }

    func testInvalidEmail_empty() {
        XCTAssertFalse(validator.isValid(""))
    }
}

// Step2 Green: テストを通す最小実装
struct EmailValidator {
    func isValid(_ email: String) -> Bool {
        let parts = email.split(separator: "@")
        guard parts.count == 2 else { return false }
        let domain = String(parts[1])
        return !domain.isEmpty && domain.contains(".")
    }
}

// Step3 Refactor: 必要に応じて改善（Regexなど）

// 動作確認
let v = EmailValidator()
let emails = ["user@example.com", "invalid", "user@", "test@domain.co.jp"]
for email in emails {
    print("\\(email): \\(v.isValid(email) ? "有効" : "無効")")
}`}
          expectedOutput={`user@example.com: 有効
invalid: 無効
user@: 無効
test@domain.co.jp: 有効`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="testing" lessonId="tdd" />
      </div>
      <LessonNav lessons={lessons} currentId="tdd" basePath="/learn/testing" />
    </div>
  );
}

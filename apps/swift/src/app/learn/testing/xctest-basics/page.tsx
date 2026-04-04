import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "testing")!.lessons;

export default function XCTestBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">テスト レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">XCTestの基本</h1>
        <p className="text-gray-400">XCTestCaseを継承してテストクラスを作り、テストメソッドを書く方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">XCTestとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-indigo-300">XCTest</code>はAppleが提供するSwift・Objective-C用のテストフレームワークです。
          <code className="text-indigo-300">XCTestCase</code>を継承したクラスに
          <code className="text-indigo-300">test</code>で始まるメソッドを書くとテストとして認識されます。
          Xcodeのテストターゲットに配置し、Cmd+Uで実行します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-indigo-300">import XCTest</code>でインポート</li>
          <li><code className="text-indigo-300">class XxxTests: XCTestCase</code>でテストクラスを定義</li>
          <li><code className="text-indigo-300">func testXxx()</code>でテストメソッドを定義</li>
          <li><code className="text-indigo-300">setUp()</code>・<code className="text-indigo-300">tearDown()</code>で前後処理</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">最初のテスト</h2>
        <p className="text-gray-400 mb-4">
          シンプルな計算クラスに対するテストを書きます。
          testで始まるメソッドが自動的にテストとして実行されます。
        </p>
        <SwiftEditor
          defaultCode={`import XCTest

// テスト対象クラス
struct StringUtility {
    func reverse(_ str: String) -> String {
        String(str.reversed())
    }

    func isPalindrome(_ str: String) -> Bool {
        let cleaned = str.lowercased().filter { $0.isLetter }
        return cleaned == String(cleaned.reversed())
    }

    func wordCount(_ str: String) -> Int {
        str.split(separator: " ").count
    }
}

// テストクラス
class StringUtilityTests: XCTestCase {

    var utility: StringUtility!

    // 各テストの前に実行される
    override func setUp() {
        super.setUp()
        utility = StringUtility()
    }

    // 各テストの後に実行される
    override func tearDown() {
        utility = nil
        super.tearDown()
    }

    func testReverse() {
        XCTAssertEqual(utility.reverse("Swift"), "tfiwS")
        XCTAssertEqual(utility.reverse(""), "")
        XCTAssertEqual(utility.reverse("a"), "a")
    }

    func testIsPalindrome() {
        XCTAssertTrue(utility.isPalindrome("racecar"))
        XCTAssertTrue(utility.isPalindrome("A man a plan a canal Panama"))
        XCTAssertFalse(utility.isPalindrome("Swift"))
    }

    func testWordCount() {
        XCTAssertEqual(utility.wordCount("Hello World"), 2)
        XCTAssertEqual(utility.wordCount("one"), 1)
    }
}

// テスト実行（通常はXcodeのCmd+Uで実行）
let suite = StringUtilityTests()
suite.setUp()
print("testReverse:", suite.utility.reverse("Swift"))
print("isPalindrome racecar:", suite.utility.isPalindrome("racecar"))
print("wordCount:", suite.utility.wordCount("Hello World"))`}
          expectedOutput={`testReverse: tfiwS
isPalindrome racecar: true
wordCount: 2`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">setUp・tearDownの活用</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-indigo-300">setUp</code>でテストに必要なオブジェクトを初期化し、
          <code className="text-indigo-300">tearDown</code>で後片付けをします。
        </p>
        <SwiftEditor
          defaultCode={`import XCTest

class ShoppingCart {
    private var items: [String: Int] = [:]

    func addItem(_ name: String, quantity: Int = 1) {
        items[name, default: 0] += quantity
    }

    func removeItem(_ name: String) {
        items.removeValue(forKey: name)
    }

    var totalItems: Int {
        items.values.reduce(0, +)
    }

    var itemCount: Int { items.count }

    func quantity(of name: String) -> Int {
        items[name] ?? 0
    }
}

class ShoppingCartTests: XCTestCase {
    var cart: ShoppingCart!

    override func setUp() {
        super.setUp()
        cart = ShoppingCart()  // 各テストで新しいカートを作成
    }

    override func tearDown() {
        cart = nil
        super.tearDown()
    }

    func testAddItem() {
        cart.addItem("リンゴ", quantity: 3)
        XCTAssertEqual(cart.quantity(of: "リンゴ"), 3)
        XCTAssertEqual(cart.totalItems, 3)
    }

    func testAddMultipleItems() {
        cart.addItem("リンゴ")
        cart.addItem("バナナ", quantity: 2)
        XCTAssertEqual(cart.itemCount, 2)
        XCTAssertEqual(cart.totalItems, 3)
    }

    func testRemoveItem() {
        cart.addItem("リンゴ")
        cart.removeItem("リンゴ")
        XCTAssertEqual(cart.quantity(of: "リンゴ"), 0)
    }
}

print("テストクラスの構造を確認しました")
print("setUp: 各テスト前にcartを初期化")
print("tearDown: 各テスト後にcartをnil")`}
          expectedOutput={`テストクラスの構造を確認しました
setUp: 各テスト前にcartを初期化
tearDown: 各テスト後にcartをnil`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="testing" lessonId="xctest-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="xctest-basics" basePath="/learn/testing" />
    </div>
  );
}

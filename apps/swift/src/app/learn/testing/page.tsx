import { SwiftEditor } from "@/components/swift-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "testing")!;

const quizQuestions: QuizQuestion[] = [
  {
    question: "XCTestでテストクラスが継承するクラスは？",
    options: ["TestCase", "XCTest", "XCTestCase", "UnitTest"],
    answer: 2,
    explanation: "XCTestCaseを継承したクラスにtest〜で始まるメソッドを書くとテストとして認識されます。",
  },
  {
    question: "2つの値が等しいことを確認するアサーションは？",
    options: ["XCTAssertTrue", "XCTAssertNil", "XCTAssertEqual", "XCTAssertSame"],
    answer: 2,
    explanation: "XCTAssertEqual(actual, expected)で2つの値が等しいことを確認します。",
  },
  {
    question: "TDDのサイクルの正しい順序は？",
    options: ["Green→Red→Refactor", "Refactor→Red→Green", "Red→Green→Refactor", "Green→Refactor→Red"],
    answer: 2,
    explanation: "TDDはRed（失敗するテストを書く）→Green（テストを通す）→Refactor（リファクタリング）のサイクルです。",
  },
  {
    question: "非同期テストで使うキーワードの組み合わせは？",
    options: ["@Test async", "async/await + XCTestExpectation", "func testAsync + await", "async func test + await"],
    answer: 3,
    explanation: "Swift Concurrencyではasync funcにawaitを使い、XCTestでそのまま非同期テストが書けます。",
  },
];

export default function TestingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-400 mb-2">{category.name}</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty={category.difficulty} />
          <span className="text-gray-500 text-sm">{category.lessons.length}レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          XCTestフレームワークを使ったSwiftのテスト手法を学びます。
          XCTestCase、各種アサーション、非同期テスト、プロトコルベースのモック、
          XCUITestによるUIテスト、TDDのRed-Green-Refactorサイクルまでカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="testing" totalLessons={category.lessons.length} color="indigo" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全{category.lessons.length}レッスン</h2>
        <LessonList lessons={category.lessons} basePath="/learn/testing" color="indigo" categoryId="testing" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">XCTestの基本的な書き方</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-indigo-300">XCTestCase</code>を継承し、
          <code className="text-indigo-300">test</code>で始まるメソッドを書きます。
          setUp/tearDownでテストの前後処理を行います。
        </p>
        <SwiftEditor
          defaultCode={`import XCTest

// テスト対象のコード
struct Calculator {
    func add(_ a: Int, _ b: Int) -> Int { a + b }
    func divide(_ a: Int, by b: Int) throws -> Int {
        guard b != 0 else { throw NSError(domain: "Math", code: 1) }
        return a / b
    }
}

// テストクラス
class CalculatorTests: XCTestCase {
    var calculator: Calculator!

    override func setUp() {
        super.setUp()
        calculator = Calculator()
    }

    override func tearDown() {
        calculator = nil
        super.tearDown()
    }

    func testAdd() {
        XCTAssertEqual(calculator.add(2, 3), 5)
        XCTAssertEqual(calculator.add(-1, 1), 0)
    }

    func testDivideByZeroThrows() {
        XCTAssertThrowsError(try calculator.divide(10, by: 0))
    }
}`}
          expectedOutput={`// テスト実行結果（Xcode Test Navigator）:
// ✓ testAdd() - passed (0.001s)
// ✓ testDivideByZeroThrows() - passed (0.001s)
// 全テスト通過`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">プロトコルベースのモック</h2>
        <p className="text-gray-400 mb-4">
          プロトコルで依存を抽象化することで、テスト時にモックに差し替えられます。
        </p>
        <SwiftEditor
          defaultCode={`import XCTest

// プロトコルで抽象化
protocol NetworkService {
    func fetchUser(id: Int) async throws -> String
}

// プロダクションコード
struct UserViewModel {
    let service: NetworkService

    func loadUser(id: Int) async -> String {
        do {
            return try await service.fetchUser(id: id)
        } catch {
            return "エラー: \\(error.localizedDescription)"
        }
    }
}

// テスト用モック
class MockNetworkService: NetworkService {
    var stubbedUser: String = ""
    var shouldThrow = false

    func fetchUser(id: Int) async throws -> String {
        if shouldThrow { throw URLError(.notConnectedToInternet) }
        return stubbedUser
    }
}

// テスト
class UserViewModelTests: XCTestCase {
    func testLoadUserSuccess() async {
        let mock = MockNetworkService()
        mock.stubbedUser = "田中太郎"
        let vm = UserViewModel(service: mock)
        let result = await vm.loadUser(id: 1)
        XCTAssertEqual(result, "田中太郎")
    }
}`}
          expectedOutput={`// ✓ testLoadUserSuccess() - passed
// モックを使えば実際のネットワーク接続なしにテストできます`}
        />
      </section>
      <Quiz questions={quizQuestions} color="indigo" />
    </div>
  );
}

import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "testing")!.lessons;

export default function UITestingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">テスト レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">UIテスト</h1>
        <p className="text-gray-400">XCUITestを使ってアプリのUIを自動テストする方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">XCUITestとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-indigo-300">XCUITest</code>はXcodeに組み込まれたUI自動テストフレームワークです。
          実際のアプリを起動し、ボタンのタップ・テキスト入力・スクロールなどのユーザー操作をシミュレートして
          UIの動作を検証します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-indigo-300">XCUIApplication</code>でアプリを操作する</li>
          <li><code className="text-indigo-300">XCUIElement</code>でUI要素にアクセス</li>
          <li>accessibility identifierでUI要素を特定する</li>
          <li>Xcodeの「Record」機能でテストを自動生成できる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なUIテスト</h2>
        <p className="text-gray-400 mb-4">
          ログイン画面のUIテストを例に、XCUITestの基本的な書き方を学びます。
        </p>
        <SwiftEditor
          defaultCode={`import XCTest

// UIテストクラス（UITestターゲットに配置）
class LoginUITests: XCTestCase {
    var app: XCUIApplication!

    override func setUp() {
        super.setUp()
        continueAfterFailure = false  // テスト失敗時に停止
        app = XCUIApplication()
        app.launch()  // アプリを起動
    }

    override func tearDown() {
        app.terminate()
        super.tearDown()
    }

    func testLoginSuccess() {
        // UI要素を取得（accessibilityIdentifierで指定）
        let usernameField = app.textFields["usernameTextField"]
        let passwordField = app.secureTextFields["passwordTextField"]
        let loginButton = app.buttons["loginButton"]

        // 操作
        usernameField.tap()
        usernameField.typeText("testuser")

        passwordField.tap()
        passwordField.typeText("password123")

        loginButton.tap()

        // 検証: ログイン後の画面要素が存在するか
        let welcomeLabel = app.staticTexts["welcomeLabel"]
        XCTAssertTrue(welcomeLabel.waitForExistence(timeout: 5))
        XCTAssertTrue(welcomeLabel.label.contains("ようこそ"))
    }

    func testLoginWithEmptyFields() {
        let loginButton = app.buttons["loginButton"]

        // 何も入力せずにログインボタンをタップ
        loginButton.tap()

        // エラーメッセージが表示されるか確認
        let errorLabel = app.staticTexts["errorLabel"]
        XCTAssertTrue(errorLabel.exists)
    }
}

// SwiftUIでのaccessibilityIdentifier設定（アプリ側のコード）
/*
struct LoginView: View {
    @State private var username = ""
    @State private var password = ""

    var body: some View {
        VStack {
            TextField("ユーザー名", text: $username)
                .accessibilityIdentifier("usernameTextField")

            SecureField("パスワード", text: $password)
                .accessibilityIdentifier("passwordTextField")

            Button("ログイン") { login() }
                .accessibilityIdentifier("loginButton")
        }
    }
}
*/
print("UIテストはXcodeのUITestターゲットで実行します")
print("accessibilityIdentifierでUI要素を特定します")`}
          expectedOutput={`UIテストはXcodeのUITestターゲットで実行します
accessibilityIdentifierでUI要素を特定します`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スクロールと待機</h2>
        <p className="text-gray-400 mb-4">
          リストのスクロールや非同期読み込みの完了を待つテストパターンを学びます。
        </p>
        <SwiftEditor
          defaultCode={`import XCTest

class ListUITests: XCTestCase {
    var app: XCUIApplication!

    override func setUp() {
        super.setUp()
        app = XCUIApplication()
        app.launch()
    }

    func testScrollToBottom() {
        let tableView = app.tables["itemList"]

        // 最初の要素が存在するか確認
        XCTAssertTrue(tableView.cells.firstMatch.exists)

        // 最後のセルまでスクロール
        tableView.swipeUp()
        tableView.swipeUp()

        // 特定のセルが見えるか
        let lastCell = tableView.cells["item-49"]
        if !lastCell.isHittable {
            lastCell.scrollIntoView()
        }
        XCTAssertTrue(lastCell.exists)
    }

    func testWaitForLoadingToFinish() {
        // ローディングインジケーターの消えるのを待つ
        let loadingIndicator = app.activityIndicators["loadingIndicator"]

        // ローディング中は表示されている
        if loadingIndicator.exists {
            // 最大10秒待つ
            XCTAssertTrue(
                loadingIndicator.waitForExistence(timeout: 10) == false
                    || !loadingIndicator.isHittable
            )
        }

        // データが読み込まれたか確認
        let firstCell = app.tables.cells.firstMatch
        XCTAssertTrue(firstCell.waitForExistence(timeout: 5))
    }

    func testSwipeToDelete() {
        let tableView = app.tables["itemList"]
        let firstCell = tableView.cells.firstMatch
        let initialCount = tableView.cells.count

        // スワイプして削除
        firstCell.swipeLeft()
        app.buttons["削除"].tap()

        // 件数が減ったか確認
        XCTAssertEqual(tableView.cells.count, initialCount - 1)
    }
}

print("XCUITestの主要操作:")
print("- tap(): タップ")
print("- typeText(): テキスト入力")
print("- swipeUp/Down/Left/Right(): スワイプ")
print("- waitForExistence(timeout:): 要素の出現を待つ")`}
          expectedOutput={`XCUITestの主要操作:
- tap(): タップ
- typeText(): テキスト入力
- swipeUp/Down/Left/Right(): スワイプ
- waitForExistence(timeout:): 要素の出現を待つ`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="testing" lessonId="ui-testing" />
      </div>
      <LessonNav lessons={lessons} currentId="ui-testing" basePath="/learn/testing" />
    </div>
  );
}

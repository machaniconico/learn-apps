import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "testing")!.lessons;

export default function MockingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">テスト レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">モック</h1>
        <p className="text-gray-400">プロトコルベースのモックを使った依存の置き換えとテストの分離を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">モックとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-indigo-300">モック（Mock）</code>はテスト用の偽の実装です。
          ネットワーク・データベース・時刻などの外部依存をプロトコルで抽象化し、
          テスト時にモック実装に差し替えることで、外部環境に依存しない安定したテストが書けます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>依存をプロトコルで抽象化する</li>
          <li>テスト用クラスがプロトコルに準拠する（Mock）</li>
          <li>イニシャライザで依存を注入する（DI）</li>
          <li>呼ばれたか・引数が正しいかを検証できる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">プロトコルベースのモック</h2>
        <p className="text-gray-400 mb-4">
          プロトコルで依存を定義し、テスト用にモック実装を作ります。
        </p>
        <SwiftEditor
          defaultCode={`import XCTest

// プロトコルで依存を定義
protocol UserRepository {
    func findUser(id: Int) async throws -> User
    func saveUser(_ user: User) async throws
}

struct User: Equatable {
    let id: Int
    var name: String
    var email: String
}

// ユースケース（テスト対象）
class UpdateUserUseCase {
    private let repository: UserRepository

    init(repository: UserRepository) {
        self.repository = repository
    }

    func execute(userId: Int, newName: String) async throws -> User {
        var user = try await repository.findUser(id: userId)
        user.name = newName
        try await repository.saveUser(user)
        return user
    }
}

// テスト用モック
class MockUserRepository: UserRepository {
    var stubbedUser: User?
    var savedUser: User?
    var shouldThrow = false

    func findUser(id: Int) async throws -> User {
        if shouldThrow { throw URLError(.notConnectedToInternet) }
        return stubbedUser ?? User(id: id, name: "デフォルト", email: "default@test.com")
    }

    func saveUser(_ user: User) async throws {
        if shouldThrow { throw URLError(.notConnectedToInternet) }
        savedUser = user  // 保存を記録
    }
}

// テスト
class UpdateUserUseCaseTests: XCTestCase {

    func testUpdateNameSuccess() async throws {
        let mock = MockUserRepository()
        mock.stubbedUser = User(id: 1, name: "田中", email: "tanaka@test.com")

        let useCase = UpdateUserUseCase(repository: mock)
        let result = try await useCase.execute(userId: 1, newName: "山田")

        XCTAssertEqual(result.name, "山田")
        XCTAssertEqual(mock.savedUser?.name, "山田") // 保存されたか確認
    }

    func testUpdateWhenRepositoryThrows() async {
        let mock = MockUserRepository()
        mock.shouldThrow = true

        let useCase = UpdateUserUseCase(repository: mock)
        do {
            _ = try await useCase.execute(userId: 1, newName: "テスト")
            XCTFail("エラーが発生するはずでした")
        } catch {
            XCTAssertNotNil(error)
        }
    }
}

// 動作確認
Task {
    let mock = MockUserRepository()
    mock.stubbedUser = User(id: 1, name: "田中", email: "tanaka@test.com")
    let useCase = UpdateUserUseCase(repository: mock)
    let result = try await useCase.execute(userId: 1, newName: "山田")
    print("更新後:", result.name)
    print("保存された:", mock.savedUser?.name ?? "なし")
}`}
          expectedOutput={`更新後: 山田
保存された: 山田`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">呼び出し検証</h2>
        <p className="text-gray-400 mb-4">
          モックがどのように呼ばれたかを記録・検証することで、
          「正しいパラメータで呼ばれているか」を確認できます。
        </p>
        <SwiftEditor
          defaultCode={`import XCTest

protocol AnalyticsService {
    func track(event: String, properties: [String: String])
}

class MockAnalyticsService: AnalyticsService {
    var trackedEvents: [(event: String, properties: [String: String])] = []

    func track(event: String, properties: [String: String]) {
        trackedEvents.append((event: event, properties: properties))
    }

    var lastEvent: String? { trackedEvents.last?.event }
    var callCount: Int { trackedEvents.count }
}

class LoginViewModel {
    private let analytics: AnalyticsService

    init(analytics: AnalyticsService) {
        self.analytics = analytics
    }

    func login(username: String) {
        analytics.track(event: "login", properties: ["username": username])
    }

    func logout() {
        analytics.track(event: "logout", properties: [:])
    }
}

class LoginViewModelTests: XCTestCase {
    func testLoginTracksEvent() {
        let mockAnalytics = MockAnalyticsService()
        let vm = LoginViewModel(analytics: mockAnalytics)

        vm.login(username: "田中太郎")

        XCTAssertEqual(mockAnalytics.callCount, 1)
        XCTAssertEqual(mockAnalytics.lastEvent, "login")
        XCTAssertEqual(mockAnalytics.trackedEvents.last?.properties["username"], "田中太郎")
    }
}

let mock = MockAnalyticsService()
let vm = LoginViewModel(analytics: mock)
vm.login(username: "テストユーザー")
vm.logout()
print("イベント数:", mock.callCount)
print("最後のイベント:", mock.lastEvent ?? "なし")`}
          expectedOutput={`イベント数: 2
最後のイベント: logout`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="testing" lessonId="mocking" />
      </div>
      <LessonNav lessons={lessons} currentId="mocking" basePath="/learn/testing" />
    </div>
  );
}

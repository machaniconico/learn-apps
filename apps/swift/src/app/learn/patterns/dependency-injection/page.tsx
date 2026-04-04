import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "patterns")!.lessons;

export default function DependencyInjectionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">デザインパターン レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">依存性注入（DI）</h1>
        <p className="text-gray-400">プロトコルベースの依存性注入でテスタブルで柔軟なコードを書く方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">依存性注入とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-purple-300">依存性注入（DI: Dependency Injection）</code>は、
          オブジェクトが必要とする依存（サービス・リポジトリ等）を外部から渡すパターンです。
          依存をプロトコルで抽象化することで、テスト時にモックに差し替えられます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>依存を内部で生成せず外部から渡す</li>
          <li>プロトコルで抽象化してテスタビリティを高める</li>
          <li>イニシャライザ注入が最も一般的</li>
          <li>プロパティ注入・メソッド注入もある</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">イニシャライザ注入</h2>
        <p className="text-gray-400 mb-4">
          最も推奨されるDIの方法です。依存をinitの引数で受け取ります。
        </p>
        <SwiftEditor
          defaultCode={`import Foundation

// プロトコルで依存を定義
protocol HTTPClient {
    func get(url: String) async throws -> Data
}

protocol TokenStorage {
    func getToken() -> String?
    func saveToken(_ token: String)
}

// 実装クラス
class URLSessionHTTPClient: HTTPClient {
    func get(url: String) async throws -> Data {
        let (data, _) = try await URLSession.shared.data(from: URL(string: url)!)
        return data
    }
}

class KeychainTokenStorage: TokenStorage {
    func getToken() -> String? { /* Keychain実装 */ return nil }
    func saveToken(_ token: String) { /* Keychain実装 */ }
}

// テスト用モック
class MockHTTPClient: HTTPClient {
    var stubbedData: Data = Data()
    func get(url: String) async throws -> Data { stubbedData }
}

class MockTokenStorage: TokenStorage {
    var token: String?
    func getToken() -> String? { token }
    func saveToken(_ token: String) { self.token = token }
}

// 依存を注入するサービス
class AuthService {
    private let httpClient: HTTPClient
    private let tokenStorage: TokenStorage

    // イニシャライザ注入（デフォルト値で本番実装を提供）
    init(
        httpClient: HTTPClient = URLSessionHTTPClient(),
        tokenStorage: TokenStorage = KeychainTokenStorage()
    ) {
        self.httpClient = httpClient
        self.tokenStorage = tokenStorage
    }

    func login(username: String, password: String) async throws {
        print("ログイン試行: \\(username)")
        // httpClientでAPIを呼ぶ
        // tokenStorageでトークンを保存
        tokenStorage.saveToken("mock-jwt-token")
        print("トークン保存完了")
    }

    func currentToken() -> String? {
        tokenStorage.getToken()
    }
}

// テスト環境では依存を差し替える
Task {
    let mockHTTP = MockHTTPClient()
    let mockStorage = MockTokenStorage()
    let service = AuthService(httpClient: mockHTTP, tokenStorage: mockStorage)

    try await service.login(username: "testuser", password: "pass")
    print("保存されたトークン:", mockStorage.token ?? "nil")
}`}
          expectedOutput={`ログイン試行: testuser
トークン保存完了
保存されたトークン: mock-jwt-token`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">DIコンテナ（簡易版）</h2>
        <p className="text-gray-400 mb-4">
          大規模アプリでは依存の登録・解決を管理するDIコンテナを使います。
        </p>
        <SwiftEditor
          defaultCode={`import Foundation

// 簡易DIコンテナ
class Container {
    private var factories: [ObjectIdentifier: () -> Any] = [:]

    func register<T>(_ type: T.Type, factory: @escaping () -> T) {
        factories[ObjectIdentifier(type)] = factory
    }

    func resolve<T>(_ type: T.Type) -> T {
        guard let factory = factories[ObjectIdentifier(type)] else {
            fatalError("\\(type) が登録されていません")
        }
        return factory() as! T
    }
}

// プロトコル定義
protocol Logger {
    func log(_ message: String)
}

protocol DataStore {
    func save(key: String, value: String)
    func load(key: String) -> String?
}

// 実装
class ConsoleLogger: Logger {
    func log(_ message: String) { print("[LOG] \\(message)") }
}

class InMemoryStore: DataStore {
    private var storage: [String: String] = [:]
    func save(key: String, value: String) { storage[key] = value }
    func load(key: String) -> String? { storage[key] }
}

// DIコンテナに登録
let container = Container()
container.register(Logger.self) { ConsoleLogger() }
container.register(DataStore.self) { InMemoryStore() }

// 依存を解決して使用
let logger = container.resolve(Logger.self)
let store = container.resolve(DataStore.self)

logger.log("アプリ起動")
store.save(key: "username", value: "田中太郎")
logger.log("ユーザー名保存: \\(store.load(key: "username") ?? "なし")")`}
          expectedOutput={`[LOG] アプリ起動
[LOG] ユーザー名保存: 田中太郎`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="patterns" lessonId="dependency-injection" />
      </div>
      <LessonNav lessons={lessons} currentId="dependency-injection" basePath="/learn/patterns" />
    </div>
  );
}

import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "ios")!.lessons;

export default function NetworkingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">iOS開発基礎 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">URLSession</h1>
        <p className="text-gray-400">URLSessionによるHTTP通信とJSONデコードの実装を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">URLSessionとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-300">URLSession</code>はiOS/macOSでHTTP通信を行うための標準APIです。
          Swift Concurrencyの<code className="text-blue-300">async/await</code>に対応しており、
          非同期通信を直感的に記述できます。レスポンスのJSONは<code className="text-blue-300">JSONDecoder</code>と
          <code className="text-blue-300">Codable</code>プロトコルで型安全にデコードできます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">URLSession.shared</code> — シングルトンのデフォルトセッション</li>
          <li><code className="text-blue-300">data(from:)</code> — async/awaitでデータを取得</li>
          <li><code className="text-blue-300">JSONDecoder</code> — JSONデータをCodable型にデコード</li>
          <li><code className="text-blue-300">URLRequest</code> — HTTPメソッド・ヘッダー・ボディを設定</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例1: Codableモデルの定義とJSONデコード</h2>
        <SwiftEditor
          defaultCode={`import Foundation

// APIレスポンスのCodableモデル定義
struct User: Codable {
    let id: Int
    let name: String
    let email: String
    let username: String

    // JSONキーとプロパティ名が異なる場合はCodingKeysを使用
    enum CodingKeys: String, CodingKey {
        case id, name, email, username
    }
}

struct Post: Codable {
    let userId: Int
    let id: Int
    let title: String
    let body: String
}

// JSONデコードのシミュレーション
let userJSON = """
{
    "id": 1,
    "name": "Leanne Graham",
    "email": "Sincere@april.biz",
    "username": "Bret"
}
""".data(using: .utf8)!

let postJSON = """
[
    {"userId": 1, "id": 1, "title": "sunt aut facere", "body": "quia et suscipit"},
    {"userId": 1, "id": 2, "title": "qui est esse", "body": "est rerum tempore"}
]
""".data(using: .utf8)!

let decoder = JSONDecoder()
decoder.keyDecodingStrategy = .convertFromSnakeCase

do {
    let user = try decoder.decode(User.self, from: userJSON)
    print("ユーザー:", user.name, "/", user.email)

    let posts = try decoder.decode([Post].self, from: postJSON)
    print("投稿数:", posts.count)
    for post in posts {
        print("  [\\(post.id)] \\(post.title)")
    }
} catch {
    print("デコードエラー:", error)
}`}
          expectedOutput={`ユーザー: Leanne Graham / Sincere@april.biz
投稿数: 2
  [1] sunt aut facere
  [2] qui est esse`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">async/awaitによるHTTP通信</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          iOS 15以降では<code className="text-blue-300">URLSession.data(from:)</code>が
          <code className="text-blue-300">async/await</code>に対応しています。
          コールバックベースのコードと比べて、非同期処理を同期コードのように読みやすく書けます。
          エラーハンドリングも<code className="text-blue-300">do-catch</code>で統一できます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例2: async/awaitでのAPIクライアント実装</h2>
        <SwiftEditor
          defaultCode={`import Foundation

// エラー定義
enum NetworkError: Error, LocalizedError {
    case invalidURL
    case invalidResponse(statusCode: Int)
    case decodingError(Error)
    case networkError(Error)

    var errorDescription: String? {
        switch self {
        case .invalidURL: return "無効なURLです"
        case .invalidResponse(let code): return "HTTPエラー: \\(code)"
        case .decodingError(let err): return "デコードエラー: \\(err.localizedDescription)"
        case .networkError(let err): return "ネットワークエラー: \\(err.localizedDescription)"
        }
    }
}

// 汎用APIクライアント
struct APIClient {
    private let session: URLSession
    private let decoder: JSONDecoder

    init(session: URLSession = .shared) {
        self.session = session
        self.decoder = JSONDecoder()
        self.decoder.keyDecodingStrategy = .convertFromSnakeCase
    }

    // GETリクエスト
    func get<T: Decodable>(_ urlString: String, as type: T.Type) async throws -> T {
        guard let url = URL(string: urlString) else {
            throw NetworkError.invalidURL
        }

        do {
            let (data, response) = try await session.data(from: url)

            guard let httpResponse = response as? HTTPURLResponse else {
                throw NetworkError.invalidResponse(statusCode: 0)
            }
            guard 200..<300 ~= httpResponse.statusCode else {
                throw NetworkError.invalidResponse(statusCode: httpResponse.statusCode)
            }

            do {
                return try decoder.decode(T.self, from: data)
            } catch {
                throw NetworkError.decodingError(error)
            }
        } catch let error as NetworkError {
            throw error
        } catch {
            throw NetworkError.networkError(error)
        }
    }

    // POSTリクエスト
    func post<T: Encodable, R: Decodable>(_ urlString: String, body: T, returning: R.Type) async throws -> R {
        guard let url = URL(string: urlString) else { throw NetworkError.invalidURL }

        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try JSONEncoder().encode(body)

        let (data, _) = try await session.data(for: request)
        return try decoder.decode(R.self, from: data)
    }
}

// シミュレーション（実際はAPIを呼び出す）
struct TodoItem: Codable {
    let id: Int
    let title: String
    let completed: Bool
}

let sampleJSON = """
{"id": 1, "title": "Swift を学ぶ", "completed": false}
""".data(using: .utf8)!

let decoder = JSONDecoder()
decoder.keyDecodingStrategy = .convertFromSnakeCase
let todo = try! decoder.decode(TodoItem.self, from: sampleJSON)
print("Todo: [\\(todo.id)] \\(todo.title) - 完了: \\(todo.completed)")

print("\\nAPIクライアントの使用例:")
print("let client = APIClient()")
print("let users = try await client.get(\"https://jsonplaceholder.typicode.com/users\", as: [User].self)")`}
          expectedOutput={`Todo: [1] Swift を学ぶ - 完了: false

APIクライアントの使用例:
let client = APIClient()
let users = try await client.get("https://jsonplaceholder.typicode.com/users", as: [User].self)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例3: キャッシュと並列リクエスト</h2>
        <SwiftEditor
          defaultCode={`import Foundation

// キャッシュ付きネットワーク層とasync let並列リクエスト

actor NetworkCache {
    private var cache: [String: (data: Data, timestamp: Date)] = [:]
    private let ttl: TimeInterval

    init(ttl: TimeInterval = 300) {  // デフォルト5分
        self.ttl = ttl
    }

    func get(_ key: String) -> Data? {
        guard let entry = cache[key] else { return nil }
        guard Date().timeIntervalSince(entry.timestamp) < ttl else {
            cache.removeValue(forKey: key)
            return nil
        }
        return entry.data
    }

    func set(_ key: String, data: Data) {
        cache[key] = (data: data, timestamp: Date())
    }

    var count: Int { cache.count }
}

// 並列リクエストのパターン（async letを使用）
struct ParallelFetcher {

    // 複数のエンドポイントから並列でデータを取得
    func fetchMultiple() async throws -> (users: Int, posts: Int, todos: Int) {
        // シミュレーション（実際はURLSessionを使用）
        async let userCount = simulateFetch(count: 10, delay: 0.1)
        async let postCount = simulateFetch(count: 100, delay: 0.15)
        async let todoCount = simulateFetch(count: 200, delay: 0.08)

        // 3つのリクエストが並列実行され、すべて完了するのを待つ
        return try await (users: userCount, posts: postCount, todos: todoCount)
    }

    private func simulateFetch(count: Int, delay: Double) async throws -> Int {
        // 実際の実装: URLSessionでAPIを呼び出す
        return count
    }
}

// キャッシュの使用例
Task {
    let cache = NetworkCache(ttl: 60)
    let key = "https://api.example.com/users"
    let mockData = "{\"count\": 42}".data(using: .utf8)!

    await cache.set(key, data: mockData)
    let cached = await cache.get(key)
    print("キャッシュヒット:", cached != nil)
    print("キャッシュ件数:", await cache.count)
}

// 並列フェッチの例
print("並列リクエストパターン:")
print("  async let userRequest = fetchUsers()")
print("  async let postRequest = fetchPosts()")
print("  let (users, posts) = try await (userRequest, postRequest)")
print("  → 2つのリクエストが並列実行される")`}
          expectedOutput={`キャッシュヒット: true
キャッシュ件数: 1
並列リクエストパターン:
  async let userRequest = fetchUsers()
  async let postRequest = fetchPosts()
  let (users, posts) = try await (userRequest, postRequest)
  → 2つのリクエストが並列実行される`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ios" lessonId="networking" />
      </div>
      <LessonNav lessons={lessons} currentId="networking" basePath="/learn/ios" />
    </div>
  );
}

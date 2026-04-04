import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "patterns")!.lessons;

export default function SingletonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">デザインパターン レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Singletonパターン</h1>
        <p className="text-gray-400">static let sharedを使ってアプリ全体で唯一のインスタンスを共有する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Singletonパターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-purple-300">Singleton</code>パターンはクラスのインスタンスがアプリ全体で
          ただ1つだけ存在することを保証するデザインパターンです。
          Swiftでは<code className="text-purple-300">static let shared</code>でスレッドセーフに実装できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-purple-300">static let shared</code>でシングルトンインスタンスを宣言</li>
          <li><code className="text-purple-300">private init()</code>で外部からのインスタンス化を禁止</li>
          <li>Swiftのstatic letはスレッドセーフに初期化される</li>
          <li>テスタビリティが下がる点に注意（DIと組み合わせると改善）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なSingleton</h2>
        <p className="text-gray-400 mb-4">
          アプリの設定を管理するシングルトンを実装します。
        </p>
        <SwiftEditor
          defaultCode={`class AppConfiguration {
    // シングルトンインスタンス（スレッドセーフ）
    static let shared = AppConfiguration()

    // 外部からのインスタンス化を禁止
    private init() {
        print("AppConfiguration 初期化")
    }

    var apiBaseURL: String = "https://api.example.com"
    var apiVersion: String = "v2"
    var timeout: TimeInterval = 30.0
    var debugMode: Bool = false

    var fullAPIURL: String {
        "\\(apiBaseURL)/\\(apiVersion)"
    }
}

// どこからでも同じインスタンスにアクセス
let config1 = AppConfiguration.shared
let config2 = AppConfiguration.shared

config1.debugMode = true
config1.timeout = 60.0

// config2も同じインスタンスなので変更が反映されている
print("デバッグモード:", config2.debugMode)  // true
print("タイムアウト:", config2.timeout)      // 60.0
print("API URL:", config2.fullAPIURL)
print("同じインスタンス?", config1 === config2)`}
          expectedOutput={`AppConfiguration 初期化
デバッグモード: true
タイムアウト: 60.0
API URL: https://api.example.com/v2
同じインスタンス? true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実用的なSingleton例</h2>
        <p className="text-gray-400 mb-4">
          ログ管理システムをSingletonで実装します。
          アプリ全体で一貫したログ出力が必要なケースに適しています。
        </p>
        <SwiftEditor
          defaultCode={`import Foundation

enum LogLevel: String {
    case debug = "DEBUG"
    case info  = "INFO"
    case warn  = "WARN"
    case error = "ERROR"
}

class Logger {
    static let shared = Logger()

    private init() {}

    private var logs: [(level: LogLevel, message: String, date: Date)] = []
    var minimumLevel: LogLevel = .debug

    func log(_ message: String, level: LogLevel = .info, file: String = #file) {
        let filename = URL(fileURLWithPath: file).lastPathComponent
        let entry = "[\(level.rawValue)] \(filename): \(message)"
        logs.append((level: level, message: message, date: Date()))
        print(entry)
    }

    func debug(_ message: String) { log(message, level: .debug) }
    func info(_ message: String)  { log(message, level: .info) }
    func warn(_ message: String)  { log(message, level: .warn) }
    func error(_ message: String) { log(message, level: .error) }

    var logCount: Int { logs.count }
}

// アプリの様々な場所から使う
class NetworkManager {
    func fetchData() {
        Logger.shared.info("ネットワークリクエスト開始")
        // ... ネットワーク処理 ...
        Logger.shared.debug("レスポンス受信")
    }
}

class DatabaseManager {
    func save() {
        Logger.shared.info("データ保存開始")
        Logger.shared.debug("保存完了")
    }
}

let network = NetworkManager()
let database = DatabaseManager()

network.fetchData()
database.save()
Logger.shared.warn("メモリ使用量が高くなっています")
print("ログ件数:", Logger.shared.logCount)`}
          expectedOutput={`[INFO] main.swift: ネットワークリクエスト開始
[DEBUG] main.swift: レスポンス受信
[INFO] main.swift: データ保存開始
[DEBUG] main.swift: 保存完了
[WARN] main.swift: メモリ使用量が高くなっています
ログ件数: 5`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Singletonの注意点</h2>
        <p className="text-gray-400 mb-4">
          Singletonはグローバル状態を持つため、テストが難しくなる場合があります。
          プロトコルと組み合わせてテスタビリティを向上させます。
        </p>
        <SwiftEditor
          defaultCode={`// プロトコルで抽象化してテスタビリティを確保
protocol ConfigurationProvider {
    var apiBaseURL: String { get }
    var timeout: TimeInterval { get }
}

class ProductionConfig: ConfigurationProvider {
    static let shared = ProductionConfig()
    private init() {}

    var apiBaseURL: String = "https://api.example.com"
    var timeout: TimeInterval = 30.0
}

class TestConfig: ConfigurationProvider {
    var apiBaseURL: String = "https://test.example.com"
    var timeout: TimeInterval = 5.0
}

// 依存を注入することでテストが容易になる
class APIClient {
    private let config: ConfigurationProvider

    // プロダクションではSingleton、テストではモックを注入
    init(config: ConfigurationProvider = ProductionConfig.shared) {
        self.config = config
    }

    func makeRequest() -> String {
        "\\(config.apiBaseURL) タイムアウト: \\(config.timeout)s"
    }
}

// プロダクション
let client = APIClient()
print("本番:", client.makeRequest())

// テスト
let testClient = APIClient(config: TestConfig())
print("テスト:", testClient.makeRequest())`}
          expectedOutput={`本番: https://api.example.com タイムアウト: 30.0s
テスト: https://test.example.com タイムアウト: 5.0s`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="patterns" lessonId="singleton" />
      </div>
      <LessonNav lessons={lessons} currentId="singleton" basePath="/learn/patterns" />
    </div>
  );
}

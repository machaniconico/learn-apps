import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "spm")!.lessons;

export default function ResourcesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Swift Package Manager レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">リソースの追加</h1>
        <p className="text-gray-400">Bundle.moduleによるリソースファイルのパッケージへの同梱方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">SPMのリソース管理</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swift 5.3からSPMはリソースファイル（画像・JSON・設定ファイルなど）をパッケージに同梱できるようになりました。
          リソースには<code className="text-green-300">process</code>（プラットフォーム最適化）と<code className="text-green-300">copy</code>（そのままコピー）の2種類の扱い方があります。
          コード内からは<code className="text-green-300">Bundle.module</code>でアクセスします。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">Bundle.module</code> — パッケージのリソースバンドルへのアクセス</li>
          <li><code className="text-blue-300">.process("Resources")</code> — プラットフォームに応じた最適化処理</li>
          <li><code className="text-blue-300">.copy("Resources")</code> — ファイルをそのままコピー</li>
          <li><code className="text-blue-300">.excludes</code> — リソースから除外するファイル/ディレクトリ</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例1: リソースを含むPackage.swiftの設定</h2>
        <SwiftEditor
          defaultCode={`// リソースを含むパッケージのPackage.swift設定

let packageWithResources = """
// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "MyLibrary",
    products: [
        .library(name: "MyLibrary", targets: ["MyLibrary"])
    ],
    targets: [
        .target(
            name: "MyLibrary",
            resources: [
                // process: プラットフォームに応じた最適化
                // 画像はアセットカタログに変換、NIBはコンパイルされる
                .process("Resources"),

                // copy: そのままコピー（JSONやカスタムファイルに適切）
                // .copy("Config/settings.json"),
            ]
        )
    ]
)
"""

// パッケージのディレクトリ構造
let directoryStructure = """
MyLibrary/
├── Package.swift
└── Sources/
    └── MyLibrary/
        ├── MyLibrary.swift
        └── Resources/
            ├── config.json
            ├── default-data.json
            └── Images/
                ├── icon.png
                └── background.jpg
"""

print("Package.swift:")
print(packageWithResources)
print("ディレクトリ構造:")
print(directoryStructure)

// Bundleのリソースアクセスパターン
let accessPatterns = [
    ("URL", "Bundle.module.url(forResource: \"config\", withExtension: \"json\")"),
    ("パス", "Bundle.module.path(forResource: \"data\", ofType: \"json\")"),
    ("画像(UIKit)", "UIImage(named: \"icon\", in: .module, compatibleWith: nil)"),
    ("画像(SwiftUI)", "Image(\"background\", bundle: .module)"),
]

print("リソースアクセス方法:")
for (type, code) in accessPatterns {
    print("  \\(type): \\(code)")
}`}
          expectedOutput={`Package.swift:
// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "MyLibrary",
    products: [
        .library(name: "MyLibrary", targets: ["MyLibrary"])
    ],
    targets: [
        .target(
            name: "MyLibrary",
            resources: [
                .process("Resources"),
            ]
        )
    ]
)
ディレクトリ構造:
MyLibrary/
├── Package.swift
└── Sources/
    └── MyLibrary/
        ├── MyLibrary.swift
        └── Resources/
            ├── config.json
            ├── default-data.json
            └── Images/
                ├── icon.png
                └── background.jpg
リソースアクセス方法:
  URL: Bundle.module.url(forResource: "config", withExtension: "json")
  パス: Bundle.module.path(forResource: "data", ofType: "json")
  画像(UIKit): UIImage(named: "icon", in: .module, compatibleWith: nil)
  画像(SwiftUI): Image("background", bundle: .module)`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Bundle.moduleでのJSONリソース読み込み</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          最も一般的なリソース利用パターンは<code className="text-green-300">JSONファイルの読み込み</code>です。
          設定データやローカライズ文字列などをJSONファイルにまとめ、<code className="text-green-300">Bundle.module</code>経由で
          読み込むことで、ハードコードを避けたクリーンな設計が実現できます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例2: JSONリソースのCodable読み込み</h2>
        <SwiftEditor
          defaultCode={`import Foundation

// Bundle.moduleを使ったリソース読み込みパターン
// （実際のパッケージ内での使用例）

struct AppConfig: Codable {
    let version: String
    let apiBaseURL: String
    let features: [String]
    let maxRetries: Int
}

// リソース読み込みを担当するクラス
class ResourceLoader {

    // Bundle.moduleからJSONを読み込む汎用関数
    static func loadJSON<T: Decodable>(_ filename: String, as type: T.Type) throws -> T {
        // 実際のパッケージでは Bundle.module を使用
        // ここではシミュレーション用にインラインJSONを使用
        guard let data = mockJSONData(for: filename) else {
            throw NSError(domain: "ResourceLoader", code: 404,
                         userInfo: [NSLocalizedDescriptionKey: "\\(filename) が見つかりません"])
        }
        return try JSONDecoder().decode(T.self, from: data)
    }

    // テスト用モックデータ
    private static func mockJSONData(for filename: String) -> Data? {
        switch filename {
        case "config.json":
            let json = """
            {
                "version": "2.1.0",
                "apiBaseURL": "https://api.example.com",
                "features": ["darkMode", "pushNotifications", "biometricAuth"],
                "maxRetries": 3
            }
            """
            return json.data(using: .utf8)
        default:
            return nil
        }
    }
}

// 使用例
do {
    let config = try ResourceLoader.loadJSON("config.json", as: AppConfig.self)
    print("アプリバージョン:", config.version)
    print("API URL:", config.apiBaseURL)
    print("有効な機能:", config.features.joined(separator: ", "))
    print("最大リトライ:", config.maxRetries)
} catch {
    print("読み込みエラー:", error.localizedDescription)
}`}
          expectedOutput={`アプリバージョン: 2.1.0
API URL: https://api.example.com
有効な機能: darkMode, pushNotifications, biometricAuth
最大リトライ: 3`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例3: ローカライズリソースの管理</h2>
        <SwiftEditor
          defaultCode={`import Foundation

// ローカライズリソースをパッケージで管理するパターン

// Stringsファイルの代わりにCodableで定義
struct Localizations: Codable {
    let greeting: String
    let farewell: String
    let errorMessage: String
}

// パッケージ内のローカライズマネージャー
class LocalizationManager {
    private var strings: [String: String] = [:]

    // Bundle.moduleからStringsファイルを読み込む
    // 実際には: Bundle.module.localizedString(forKey:value:table:)
    init(language: String = "ja") {
        // シミュレーション用
        switch language {
        case "ja":
            strings = [
                "greeting": "こんにちは",
                "farewell": "さようなら",
                "error.network": "ネットワークエラーが発生しました",
                "error.auth": "認証に失敗しました",
            ]
        case "en":
            strings = [
                "greeting": "Hello",
                "farewell": "Goodbye",
                "error.network": "A network error occurred",
                "error.auth": "Authentication failed",
            ]
        default:
            strings = [:]
        }
    }

    subscript(key: String) -> String {
        return strings[key] ?? key
    }
}

// 使用例
let ja = LocalizationManager(language: "ja")
let en = LocalizationManager(language: "en")

print("日本語:")
print("  greeting:", ja["greeting"])
print("  farewell:", ja["farewell"])
print("  error.network:", ja["error.network"])

print("English:")
print("  greeting:", en["greeting"])
print("  farewell:", en["farewell"])
print("  error.auth:", en["error.auth"])`}
          expectedOutput={`日本語:
  greeting: こんにちは
  farewell: さようなら
  error.network: ネットワークエラーが発生しました
English:
  greeting: Hello
  farewell: Goodbye
  error.auth: Authentication failed`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="spm" lessonId="resources" />
      </div>
      <LessonNav lessons={lessons} currentId="resources" basePath="/learn/spm" />
    </div>
  );
}

import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "spm")!.lessons;

export default function PublishingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Swift Package Manager レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">パッケージの公開</h1>
        <p className="text-gray-400">GitHubリポジトリでのパッケージ公開とバージョンタグの付け方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">SPMパッケージを公開する流れ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swift Package Managerのパッケージは、<code className="text-green-300">GitHubリポジトリ</code>に公開することで
          他の開発者が利用できるようになります。公開に必要なのは正しく設定された<code className="text-green-300">Package.swift</code>と、
          Semantic Versioningに従った<code className="text-green-300">Gitタグ</code>だけです。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">git tag 1.0.0</code> — バージョンタグを作成</li>
          <li><code className="text-blue-300">git push origin --tags</code> — タグをリモートにプッシュ</li>
          <li><code className="text-blue-300">swift package resolve</code> — 依存関係を解決・確認</li>
          <li><code className="text-blue-300">.package(url:from:)</code> — 公開パッケージを利用する側の記述</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例1: 公開用Package.swiftの設定</h2>
        <SwiftEditor
          defaultCode={`// Package.swift - 公開パッケージの完全な設定例
// これはPackage.swiftの内容を文字列として確認するデモです

let packageManifest = """
// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "SwiftUtils",
    // 対応プラットフォームを明示（公開パッケージでは重要）
    platforms: [
        .macOS(.v13),
        .iOS(.v16),
        .watchOS(.v9),
        .tvOS(.v16)
    ],
    // 公開するプロダクト（外部から使える成果物）
    products: [
        .library(
            name: "SwiftUtils",
            targets: ["SwiftUtils"]
        )
    ],
    // 外部依存パッケージ（なければ空配列）
    dependencies: [],
    // ターゲット定義
    targets: [
        .target(
            name: "SwiftUtils",
            dependencies: [],
            // ドキュメントコメントを有効化
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency")
            ]
        ),
        .testTarget(
            name: "SwiftUtilsTests",
            dependencies: ["SwiftUtils"]
        )
    ]
)
"""

print("Package.swift の設定:")
print(packageManifest)

// 公開手順のチェックリスト
let publishingSteps = [
    "1. Package.swiftが正しく設定されている",
    "2. README.mdにドキュメントがある",
    "3. LICENSEファイルが存在する",
    "4. テストがすべてパスしている",
    "5. git tag 1.0.0 でタグを作成",
    "6. git push origin --tags でタグを公開"
]

print("\\n公開チェックリスト:")
for step in publishingSteps {
    print("  ✓", step)
}`}
          expectedOutput={`Package.swift の設定:
// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "SwiftUtils",
    platforms: [
        .macOS(.v13),
        .iOS(.v16),
        .watchOS(.v9),
        .tvOS(.v16)
    ],
    products: [
        .library(
            name: "SwiftUtils",
            targets: ["SwiftUtils"]
        )
    ],
    dependencies: [],
    targets: [
        .target(
            name: "SwiftUtils",
            dependencies: [],
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency")
            ]
        ),
        .testTarget(
            name: "SwiftUtilsTests",
            dependencies: ["SwiftUtils"]
        )
    ]
)

公開チェックリスト:
  ✓ 1. Package.swiftが正しく設定されている
  ✓ 2. README.mdにドキュメントがある
  ✓ 3. LICENSEファイルが存在する
  ✓ 4. テストがすべてパスしている
  ✓ 5. git tag 1.0.0 でタグを作成
  ✓ 6. git push origin --tags でタグを公開`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">公開パッケージの利用方法</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          公開されたパッケージは<code className="text-green-300">.package(url:from:)</code>でURLを指定して利用できます。
          XcodeではFile → Add Package Dependencies から GUIで追加することもできます。
          パッケージのURLはGitHubリポジトリのURLをそのまま使います（<code className="text-green-300">.git</code>なしでも可）。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例2: 公開パッケージを依存関係に追加する</h2>

        <SwiftEditor
          defaultCode={`// 利用側のPackage.swift
// 公開されたパッケージを依存として追加する例

let consumerManifest = """
// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "MyApp",
    dependencies: [
        // GitHubのURLとバージョンを指定
        .package(
            url: "https://github.com/username/SwiftUtils",
            from: "1.0.0"    // 1.0.0以上の最新版を使用
        ),
        // 特定バージョン範囲を指定する場合
        .package(
            url: "https://github.com/apple/swift-algorithms",
            "1.0.0"..<"2.0.0"  // 1.x.x のみ
        ),
        // 正確なバージョンを固定する場合
        .package(
            url: "https://github.com/apple/swift-collections",
            exact: "1.1.0"
        )
    ],
    targets: [
        .executableTarget(
            name: "MyApp",
            dependencies: [
                "SwiftUtils",
                .product(name: "Algorithms", package: "swift-algorithms"),
                .product(name: "Collections", package: "swift-collections")
            ]
        )
    ]
)
"""

print("利用側のPackage.swift:")
print(consumerManifest)

// バージョン指定方法のまとめ
let versionSpecs = [
    ("from: \"1.0.0\"", "1.0.0以上の互換バージョン（~> 1.0と同等）"),
    (".upToNextMajor(from: \"1.0.0\")", "1.x.x の最新版（メジャーバージョン固定）"),
    (".upToNextMinor(from: \"1.2.0\")", "1.2.x の最新版（マイナーバージョン固定）"),
    ("exact: \"1.2.3\"", "完全に固定（1.2.3のみ）"),
    ("branch: \"main\"", "ブランチの最新コミット（開発時のみ推奨）"),
]

print("\\nバージョン指定方法:")
for (spec, desc) in versionSpecs {
    print("  \\(spec)")
    print("    → \\(desc)")
}`}
          expectedOutput={`利用側のPackage.swift:
// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "MyApp",
    dependencies: [
        .package(
            url: "https://github.com/username/SwiftUtils",
            from: "1.0.0"
        ),
        .package(
            url: "https://github.com/apple/swift-algorithms",
            "1.0.0"..<"2.0.0"
        ),
        .package(
            url: "https://github.com/apple/swift-collections",
            exact: "1.1.0"
        )
    ],
    targets: [...]
)

バージョン指定方法:
  from: "1.0.0"
    → 1.0.0以上の互換バージョン（~> 1.0と同等）
  .upToNextMajor(from: "1.0.0")
    → 1.x.x の最新版（メジャーバージョン固定）
  .upToNextMinor(from: "1.2.0")
    → 1.2.x の最新版（マイナーバージョン固定）
  exact: "1.2.3"
    → 完全に固定（1.2.3のみ）
  branch: "main"
    → ブランチの最新コミット（開発時のみ推奨）`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="spm" lessonId="publishing" />
      </div>
      <LessonNav lessons={lessons} currentId="publishing" basePath="/learn/spm" />
    </div>
  );
}

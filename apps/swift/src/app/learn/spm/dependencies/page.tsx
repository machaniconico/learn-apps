import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const lessons = CATEGORIES.find((c) => c.id === "spm")!.lessons;

export default function DependenciesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-green-400">Swift Package Manager</span>
        <h1 className="text-3xl font-bold text-gray-100">依存関係の追加</h1>
        <p className="text-gray-400">Package.swift への外部依存パッケージの追加方法を学びましょう。</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <p>
          SPM では <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-300">dependencies</code> フィールドに
          外部パッケージのGitリポジトリURLとバージョン要件を指定します。
          バージョン要件はセマンティックバージョニングに基づき複数の方法で指定できます。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`// Package.swift での依存関係の指定方法

import PackageDescription

let package = Package(
    name: "MyApp",
    dependencies: [
        // バージョン範囲（from: は "1.0.0" 以上の最新を取得）
        .package(
            url: "https://github.com/apple/swift-algorithms",
            from: "1.0.0"
        ),
        // 厳密なバージョン指定
        .package(
            url: "https://github.com/apple/swift-collections",
            exact: "1.1.0"
        ),
        // バージョン範囲
        .package(
            url: "https://github.com/nicklockwood/SwiftyJSON",
            .upToNextMajor(from: "5.0.0")
        ),
        // ブランチ指定（開発中）
        .package(
            url: "https://github.com/vapor/vapor",
            branch: "main"
        ),
    ],
    targets: [
        .target(
            name: "MyApp",
            dependencies: [
                .product(name: "Algorithms", package: "swift-algorithms"),
                .product(name: "Collections", package: "swift-collections"),
            ]
        ),
    ]
)`}
        height="360px"
        expectedOutput="依存関係のバージョン指定方法のサンプルです。"
      />

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <h2 className="text-xl font-semibold text-gray-100">ローカルパッケージの依存</h2>
        <p>
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-300">.package(path:)</code> を使うと
          ローカルのパッケージを依存先として指定できます。開発中の自作ライブラリのデバッグに便利です。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`// ローカルパッケージへの依存

import PackageDescription

let package = Package(
    name: "MyApp",
    dependencies: [
        // 相対パスでローカルパッケージを参照
        .package(path: "../MyLocalLibrary"),
        // または絶対パス
        .package(path: "/Users/dev/projects/SharedUtils"),
    ],
    targets: [
        .target(
            name: "MyApp",
            dependencies: [
                "MyLocalLibrary",
                "SharedUtils",
            ]
        ),
    ]
)

// Package.resolved ファイル
// 依存パッケージの解決済みバージョンが記録される
// git管理に含めることで再現性を確保できる
// $ swift package update  → バージョンを更新
// $ swift package resolve → Package.resolved を再生成`}
        height="280px"
        expectedOutput="ローカルパッケージの依存設定例です。"
      />

      <SwiftEditor
        defaultCode={`// 条件付き依存（プラットフォーム別）
import PackageDescription

let package = Package(
    name: "CrossPlatform",
    dependencies: [
        .package(
            url: "https://github.com/apple/swift-argument-parser",
            from: "1.3.0"
        ),
    ],
    targets: [
        .target(
            name: "CrossPlatform",
            dependencies: [
                // macOSのみ依存を追加
                .product(
                    name: "ArgumentParser",
                    package: "swift-argument-parser",
                    condition: .when(platforms: [.macOS])
                ),
            ]
        ),
    ]
)`}
        height="240px"
        expectedOutput="条件付き依存の Package.swift 例です。"
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="spm" lessonId="dependencies" />
      </div>
      <LessonNav lessons={lessons} currentId="dependencies" basePath="/learn/spm" />
    </div>
  );
}

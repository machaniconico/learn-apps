import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const lessons = CATEGORIES.find((c) => c.id === "spm")!.lessons;

export default function SPMBasicsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-green-400">Swift Package Manager</span>
        <h1 className="text-3xl font-bold text-gray-100">SPMの基本</h1>
        <p className="text-gray-400">swift package init コマンドと Package.swift の構造を学びましょう。</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <p>
          Swift Package Manager（SPM）はSwift公式のビルドシステム兼パッケージ管理ツールです。
          Xcodeに統合されており、ライブラリの共有・配布・依存関係の管理を行います。
        </p>
        <p>
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-300">swift package init</code> コマンドで
          新しいパッケージを作成します。<code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-300">--type</code> フラグで
          ライブラリか実行ファイルかを指定できます。
        </p>
        <p>
          パッケージのルートには <strong>Package.swift</strong> マニフェストファイルが作成されます。
          このファイルでパッケージ名、対応プラットフォーム、プロダクト、ターゲットを宣言します。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`// ターミナルでパッケージを作成
// $ mkdir MyPackage && cd MyPackage
// $ swift package init --type library

// 生成される Package.swift の最小構成
// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "MyPackage",
    products: [
        .library(
            name: "MyPackage",
            targets: ["MyPackage"]
        ),
    ],
    targets: [
        .target(name: "MyPackage"),
        .testTarget(
            name: "MyPackageTests",
            dependencies: ["MyPackage"]
        ),
    ]
)`}
        height="280px"
        expectedOutput="Package.swift マニフェストの基本構造です。"
      />

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <h2 className="text-xl font-semibold text-gray-100">ディレクトリ構成</h2>
        <p>
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-300">swift package init</code> を実行すると
          以下のディレクトリ構成が生成されます。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`// 生成されるディレクトリ構成
// MyPackage/
// ├── Package.swift        ← マニフェスト
// ├── Sources/
// │   └── MyPackage/
// │       └── MyPackage.swift
// └── Tests/
//     └── MyPackageTests/
//         └── MyPackageTests.swift

// Sources/MyPackage/MyPackage.swift の初期内容
public struct MyPackage {
    public private(set) var text = "Hello, World!"

    public init() {}
}

// ビルド: swift build
// テスト: swift test`}
        height="260px"
        expectedOutput="SPMが生成するディレクトリ構成と初期ファイルの例です。"
      />

      <SwiftEditor
        defaultCode={`// swift-tools-version の役割
// Package.swift の先頭行に必須
// Swift Package Manager のバージョン要件を指定する

// swift-tools-version: 5.9
// → Swift 5.9以降のSPM機能が使用可能

// platforms フィールドで対応OSを制限できる
import PackageDescription

let package = Package(
    name: "CrossPlatformLib",
    platforms: [
        .macOS(.v13),
        .iOS(.v16),
        .watchOS(.v9),
        .tvOS(.v16),
    ],
    products: [
        .library(name: "CrossPlatformLib", targets: ["CrossPlatformLib"]),
    ],
    targets: [
        .target(name: "CrossPlatformLib"),
    ]
)`}
        height="260px"
        expectedOutput="swift-tools-version と platforms フィールドの使い方です。"
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="spm" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/spm" />
    </div>
  );
}

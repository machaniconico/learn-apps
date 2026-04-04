import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const lessons = CATEGORIES.find((c) => c.id === "spm")!.lessons;

export default function TargetsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-green-400">Swift Package Manager</span>
        <h1 className="text-3xl font-bold text-gray-100">ターゲットとプロダクト</h1>
        <p className="text-gray-400">targets・products・testTargets の設定方法を学びましょう。</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <p>
          SPM では <strong>ターゲット（target）</strong>がビルドの基本単位です。
          ターゲットはソースファイルの集合で、他のターゲットに依存できます。
          <strong>プロダクト（product）</strong>はパッケージが外部に公開するもので、ライブラリや実行ファイルです。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`// ターゲットの種類
import PackageDescription

let package = Package(
    name: "MyPackage",
    products: [
        // 外部公開するライブラリ
        .library(name: "MyLib", targets: ["MyLib"]),
        // 外部公開する実行ファイル
        .executable(name: "MyCLI", targets: ["MyCLI"]),
    ],
    targets: [
        // 通常のライブラリターゲット
        .target(
            name: "MyLib",
            path: "Sources/MyLib",
            sources: ["MyLib.swift", "Utils.swift"],
            resources: [.process("Resources")],
            publicHeadersPath: "include",
            swiftSettings: [
                .enableExperimentalFeature("StrictConcurrency")
            ]
        ),
        // 実行ファイルターゲット
        .executableTarget(
            name: "MyCLI",
            dependencies: ["MyLib"],
            path: "Sources/MyCLI"
        ),
        // テストターゲット
        .testTarget(
            name: "MyLibTests",
            dependencies: ["MyLib"],
            path: "Tests/MyLibTests"
        ),
    ]
)`}
        height="340px"
        expectedOutput="各種ターゲット定義の例です。"
      />

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <h2 className="text-xl font-semibold text-gray-100">システムライブラリターゲット</h2>
        <p>
          C言語などのシステムライブラリをラップする場合は
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-300">.systemLibrary</code> を使います。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`// システムライブラリターゲット
import PackageDescription

let package = Package(
    name: "CWrapper",
    targets: [
        // Cのlibpngをラップする例
        .systemLibrary(
            name: "Cpng",
            pkgConfig: "libpng",
            providers: [
                .brew(["libpng"]),
                .apt(["libpng-dev"]),
            ]
        ),
        .target(
            name: "SwiftPNG",
            dependencies: ["Cpng"]
        ),
    ]
)

// バイナリターゲット（プリコンパイル済みXCFramework）
let packageWithBinary = Package(
    name: "BinaryWrapper",
    targets: [
        .binaryTarget(
            name: "MyFramework",
            url: "https://example.com/MyFramework-1.0.0.zip",
            checksum: "abc123..."
        ),
    ]
)`}
        height="280px"
        expectedOutput="systemLibrary と binaryTarget の例です。"
      />

      <SwiftEditor
        defaultCode={`// swiftSettings でコンパイラフラグを設定
import PackageDescription

let package = Package(
    name: "FeatureFlags",
    targets: [
        .target(
            name: "FeatureFlags",
            swiftSettings: [
                // 条件コンパイルフラグ
                .define("DEBUG_MODE", .when(configuration: .debug)),
                // 実験的機能の有効化
                .enableExperimentalFeature("StrictConcurrency"),
                // Swift言語バージョン（将来対応）
                // .swiftLanguageVersion(.v6),
            ],
            linkerSettings: [
                // Cライブラリとリンク
                .linkedLibrary("z"),  // zlib
                .linkedFramework(
                    "CoreLocation",
                    .when(platforms: [.macOS, .iOS])
                ),
            ]
        ),
    ]
)`}
        height="260px"
        expectedOutput="swiftSettings と linkerSettings の使用例です。"
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="spm" lessonId="targets" />
      </div>
      <LessonNav lessons={lessons} currentId="targets" basePath="/learn/spm" />
    </div>
  );
}

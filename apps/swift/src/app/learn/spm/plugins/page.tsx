import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const lessons = CATEGORIES.find((c) => c.id === "spm")!.lessons;

export default function PluginsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-green-400">Swift Package Manager</span>
        <h1 className="text-3xl font-bold text-gray-100">プラグイン</h1>
        <p className="text-gray-400">ビルドツールプラグインとコマンドプラグインの仕組みを学びましょう。</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <p>
          SPM プラグインはSwift 5.6から導入された機能で、ビルドプロセスやコマンドラインツールをPackageに統合できます。
          主に2種類あります。
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>ビルドツールプラグイン</strong>：ビルド時にコード生成などを行う</li>
          <li><strong>コマンドプラグイン</strong>：<code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-300">swift package</code> コマンドとして実行する</li>
        </ul>
      </div>

      <SwiftEditor
        defaultCode={`// ビルドツールプラグインの定義
// Package.swift

import PackageDescription

let package = Package(
    name: "MyPackageWithPlugin",
    targets: [
        // メインターゲット
        .target(
            name: "MyLibrary",
            plugins: [
                .plugin(name: "GenerateCode")
            ]
        ),
        // ビルドツールプラグインターゲット
        .plugin(
            name: "GenerateCode",
            capability: .buildTool(),
            dependencies: [
                .target(name: "CodeGenerator")
            ]
        ),
        // プラグインが使うツール本体
        .executableTarget(name: "CodeGenerator"),
    ]
)`}
        height="280px"
        expectedOutput="ビルドツールプラグインの Package.swift 定義例です。"
      />

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <h2 className="text-xl font-semibold text-gray-100">コマンドプラグイン</h2>
        <p>
          コマンドプラグインは <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-300">swift package &lt;plugin-name&gt;</code> として
          実行します。SwiftLint などをSPMプラグインとして統合するのに使います。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`// コマンドプラグインの例（SwiftLint統合）
// Package.swift

import PackageDescription

let package = Package(
    name: "MyProject",
    dependencies: [
        .package(
            url: "https://github.com/SimplyDanny/SwiftLintPlugins",
            from: "0.57.0"
        ),
    ],
    targets: [
        .target(
            name: "MyProject",
            plugins: [
                .plugin(
                    name: "SwiftLintBuildToolPlugin",
                    package: "SwiftLintPlugins"
                )
            ]
        ),
    ]
)

// 使用: $ swift package lint
// または Xcode のビルド時に自動実行される`}
        height="260px"
        expectedOutput="SwiftLintをSPMプラグインとして統合する例です。"
      />

      <SwiftEditor
        defaultCode={`// カスタムコマンドプラグインの実装
// Plugins/FormatCode/FormatCode.swift

import PackagePlugin

@main
struct FormatCode: CommandPlugin {
    func performCommand(
        context: PluginContext,
        arguments: [String]
    ) async throws {
        // swift-format ツールのパスを取得
        let tool = try context.tool(named: "swift-format")

        // ターゲットのSwiftファイルを取得
        for target in context.package.targets {
            guard let swiftTarget = target as? SwiftSourceModuleTarget else { continue }
            let files = swiftTarget.sourceFiles.filter { $0.type == .source }
            for file in files {
                let process = Process()
                process.executableURL = URL(fileURLWithPath: tool.path.string)
                process.arguments = ["--in-place", file.path.string]
                try process.run()
                process.waitUntilExit()
            }
        }
        print("Formatting complete!")
    }
}`}
        height="300px"
        expectedOutput="Formatting complete!"
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="spm" lessonId="plugins" />
      </div>
      <LessonNav lessons={lessons} currentId="plugins" basePath="/learn/spm" />
    </div>
  );
}

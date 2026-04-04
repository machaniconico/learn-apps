import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const lessons = CATEGORIES.find((c) => c.id === "spm")!.lessons;

export default function CreatingPackagePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-green-400">Swift Package Manager</span>
        <h1 className="text-3xl font-bold text-gray-100">パッケージの作成</h1>
        <p className="text-gray-400">ライブラリと実行ファイルパッケージの作成方法を学びましょう。</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <p>
          SPM では主に2種類のパッケージを作成できます。<strong>ライブラリ</strong>は他のパッケージに取り込まれる
          コードのコレクションで、<strong>実行ファイル</strong>はビルドするとバイナリが生成されるプログラムです。
        </p>
        <p>
          ライブラリはさらに <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-300">static</code>（静的リンク）と
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-300">dynamic</code>（動的リンク）を指定できます。
          省略すると SPM が自動選択します。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`// ライブラリパッケージの作成
// $ swift package init --type library

// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "MathUtils",
    products: [
        // 静的ライブラリ
        .library(
            name: "MathUtils",
            type: .static,
            targets: ["MathUtils"]
        ),
    ],
    targets: [
        .target(name: "MathUtils"),
        .testTarget(
            name: "MathUtilsTests",
            dependencies: ["MathUtils"]
        ),
    ]
)

// Sources/MathUtils/MathUtils.swift
public func factorial(_ n: Int) -> Int {
    guard n > 1 else { return 1 }
    return n * factorial(n - 1)
}

// 使用例
// print(factorial(5))  // 120`}
        height="300px"
        expectedOutput="120"
      />

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <h2 className="text-xl font-semibold text-gray-100">実行ファイルパッケージ</h2>
        <p>
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-300">--type executable</code> で
          実行ファイルを作成します。エントリーポイントは <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-300">main.swift</code> か
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-300">@main</code> アノテーションを持つ型です。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`// 実行ファイルパッケージ
// $ swift package init --type executable

// Package.swift
import PackageDescription

let package = Package(
    name: "MyCLI",
    products: [
        .executable(name: "MyCLI", targets: ["MyCLI"]),
    ],
    targets: [
        .executableTarget(name: "MyCLI"),
    ]
)

// Sources/MyCLI/main.swift
import Foundation

@main
struct MyCLI {
    static func main() {
        let args = CommandLine.arguments
        if args.count > 1 {
            print("Hello, \\(args[1])!")
        } else {
            print("Usage: MyCLI <name>")
        }
    }
}`}
        height="300px"
        expectedOutput="Usage: MyCLI <name>"
      />

      <SwiftEditor
        defaultCode={`// マルチモジュール構成
// 1つのパッケージに複数のライブラリを含める

import PackageDescription

let package = Package(
    name: "MyApp",
    products: [
        .library(name: "CoreLogic", targets: ["CoreLogic"]),
        .library(name: "Networking", targets: ["Networking"]),
    ],
    targets: [
        .target(name: "CoreLogic"),
        .target(
            name: "Networking",
            dependencies: ["CoreLogic"]  // 内部依存
        ),
        .testTarget(
            name: "NetworkingTests",
            dependencies: ["Networking"]
        ),
    ]
)`}
        height="240px"
        expectedOutput="マルチモジュール構成の Package.swift 例です。"
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="spm" lessonId="creating-package" />
      </div>
      <LessonNav lessons={lessons} currentId="creating-package" basePath="/learn/spm" />
    </div>
  );
}

import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const lessons = CATEGORIES.find((c) => c.id === "ecosystem")!.lessons;

export default function CICDPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-green-400">Swiftエコシステム</span>
        <h1 className="text-3xl font-bold text-gray-100">CI/CD</h1>
        <p className="text-gray-400">Xcode Cloud・GitHub Actions による Swift CI/CD を学びましょう。</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <p>
          CI/CD（継続的インテグレーション/継続的デリバリー）はコードの品質を自動的に保証する仕組みです。
          <strong>Xcode Cloud</strong> は Apple 公式のCI/CDサービス、<strong>GitHub Actions</strong> は
          GitHub 上で実行できる汎用CI/CDです。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`// GitHub Actions ワークフロー
// .github/workflows/swift.yml

// name: Swift CI
//
// on:
//   push:
//     branches: [ main, develop ]
//   pull_request:
//     branches: [ main ]
//
// jobs:
//   build-and-test:
//     name: Build and Test
//     runs-on: macos-14  # Xcode 15が入ったmacOS
//
//     steps:
//     - name: Checkout
//       uses: actions/checkout@v4
//
//     - name: Select Xcode version
//       run: sudo xcode-select -s /Applications/Xcode_15.2.app
//
//     - name: Show Xcode version
//       run: xcodebuild -version
//
//     - name: Build (SPM)
//       run: swift build -v
//
//     - name: Test (SPM)
//       run: swift test -v --enable-code-coverage
//
//     - name: Build iOS App
//       run: |
//         xcodebuild clean build test \\
//           -project MyApp.xcodeproj \\
//           -scheme MyApp \\
//           -destination "platform=iOS Simulator,name=iPhone 15" \\
//           -resultBundlePath TestResults.xcresult
//
//     - name: Upload test results
//       uses: actions/upload-artifact@v4
//       if: failure()
//       with:
//         name: test-results
//         path: TestResults.xcresult

print("GitHub Actions workflow example")`}
        height="420px"
        expectedOutput="GitHub Actions workflow example"
      />

      <SwiftEditor
        defaultCode={`// SwiftLint を CI に統合
// .github/workflows/lint.yml

// name: SwiftLint
//
// on: [push, pull_request]
//
// jobs:
//   lint:
//     runs-on: macos-14
//     steps:
//     - uses: actions/checkout@v4
//     - name: Install SwiftLint
//       run: brew install swiftlint
//     - name: Run SwiftLint
//       run: swiftlint lint --reporter github-actions-logging

// Fastlane を使った自動化
// Fastfile の例:
// lane :test do
//   run_tests(
//     project: "MyApp.xcodeproj",
//     scheme: "MyApp",
//     devices: ["iPhone 15"]
//   )
// end
//
// lane :beta do
//   increment_build_number
//   build_app(scheme: "MyApp")
//   upload_to_testflight
// end

// Xcode Cloud の設定（ci_scripts/ci_post_clone.sh）
// #!/bin/sh
// # Xcode Cloud のビルド後スクリプト
// set -e
// echo "Running post-clone script"
// # SPM 依存関係の解決は自動
// # カスタム設定があればここに追加
// brew install swiftlint
// swiftlint lint

print("CI/CD pipeline setup complete")`}
        height="360px"
        expectedOutput="CI/CD pipeline setup complete"
      />

      <SwiftEditor
        defaultCode={`// Makefile で CI コマンドを統一
// Makefile

// .PHONY: build test lint format clean
//
// build:
// 	swift build
//
// test:
// 	swift test --enable-code-coverage
//
// lint:
// 	swiftlint lint
//
// format:
// 	swift-format format --in-place -r Sources/ Tests/
//
// clean:
// 	swift package clean
//
// ci: lint build test

// パッケージのバージョン管理
// Package.resolved（コミットすることで再現性を保証）
// {
//   "originHash": "...",
//   "pins": [
//     {
//       "identity": "swift-algorithms",
//       "kind": "remoteSourceControl",
//       "location": "https://github.com/apple/swift-algorithms",
//       "state": {
//         "revision": "...",
//         "version": "1.2.0"
//       }
//     }
//   ],
//   "version": 3
// }

// CI/CD ベストプラクティス
let practices = [
    "全テストをプッシュごとに実行",
    "SwiftLint を PR チェックに組み込む",
    "Package.resolved をコミット管理",
    "TestFlight への自動デプロイ",
    "コードカバレッジの計測と維持",
]

for (i, practice) in practices.enumerated() {
    print("\\(i + 1). \\(practice)")
}`}
        height="380px"
        expectedOutput="1. 全テストをプッシュごとに実行\n2. SwiftLint を PR チェックに組み込む\n3. Package.resolved をコミット管理\n4. TestFlight への自動デプロイ\n5. コードカバレッジの計測と維持"
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="ecosystem" lessonId="ci-cd" />
      </div>
      <LessonNav lessons={lessons} currentId="ci-cd" basePath="/learn/ecosystem" />
    </div>
  );
}

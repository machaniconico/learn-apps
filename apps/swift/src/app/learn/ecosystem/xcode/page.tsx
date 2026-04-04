import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const lessons = CATEGORIES.find((c) => c.id === "ecosystem")!.lessons;

export default function XcodePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-green-400">Swiftエコシステム</span>
        <h1 className="text-3xl font-bold text-gray-100">Xcode</h1>
        <p className="text-gray-400">ワークスペース・プロジェクト・スキームの構成を学びましょう。</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <p>
          Xcode は Apple の統合開発環境（IDE）です。
          <strong>ワークスペース（.xcworkspace）</strong>は複数のプロジェクトを束ね、
          <strong>プロジェクト（.xcodeproj）</strong>はソースファイル・リソース・設定を管理し、
          <strong>スキーム</strong>はビルド・テスト・実行の設定をまとめます。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`// Xcode プロジェクト構成の概念図
//
// MyApp.xcworkspace
// ├── MyApp.xcodeproj          ← メインアプリ
// │   ├── MyApp/
// │   │   ├── AppDelegate.swift
// │   │   ├── SceneDelegate.swift
// │   │   ├── ViewController.swift
// │   │   ├── Assets.xcassets  ← 画像・色リソース
// │   │   └── Info.plist       ← アプリ設定
// │   ├── MyAppTests/
// │   │   └── MyAppTests.swift
// │   └── MyAppUITests/
// │       └── MyAppUITests.swift
// └── Pods/                    ← CocoaPods (or SPM)
//     └── Pods.xcodeproj

// スキームの構成
// Build Configuration:
//   - Debug   : 最適化なし、デバッグ情報あり
//   - Release : 最適化あり、App Store 提出用

// Build Settings の主要項目:
// SWIFT_VERSION        = 5.9
// IPHONEOS_DEPLOYMENT_TARGET = 16.0
// PRODUCT_BUNDLE_IDENTIFIER  = com.example.MyApp
// CODE_SIGN_IDENTITY         = Apple Development

print("Xcode project structure example")`}
        height="300px"
        expectedOutput="Xcode project structure example"
      />

      <SwiftEditor
        defaultCode={`// ビルド設定のカスタマイズ（xcconfig）
// MyApp-Debug.xcconfig

// SWIFT_ACTIVE_COMPILATION_CONDITIONS = DEBUG
// GCC_PREPROCESSOR_DEFINITIONS = DEBUG=1
// ONLY_ACTIVE_ARCH = YES
// MTL_ENABLE_DEBUG_INFO = INCLUDE_SOURCE

// MyApp-Release.xcconfig
// SWIFT_ACTIVE_COMPILATION_CONDITIONS =
// ONLY_ACTIVE_ARCH = NO
// SWIFT_OPTIMIZATION_LEVEL = -O

// コード内での設定使い分け
#if DEBUG
func debugLog(_ message: String) {
    print("[DEBUG] \\(message)")
}
#else
func debugLog(_ message: String) {
    // Release では何もしない
}
#endif

debugLog("App started")  // DEBUG ビルドのみ出力

// Info.plist のよく使う設定キー
// NSCameraUsageDescription        - カメラ使用許可
// NSPhotoLibraryUsageDescription  - 写真ライブラリ使用許可
// NSLocationWhenInUseUsageDescription - 位置情報使用許可
// UILaunchStoryboardName          - 起動画面

print("Build configuration setup complete")`}
        height="300px"
        expectedOutput="[DEBUG] App started\nBuild configuration setup complete"
      />

      <SwiftEditor
        defaultCode={`// Xcode ショートカット一覧（主要なもの）

// ビルド・実行:
// Cmd + B        ビルド
// Cmd + R        実行
// Cmd + U        テスト実行
// Cmd + .        停止

// ナビゲーション:
// Cmd + Shift + O  ファイルクイックオープン
// Cmd + Shift + F  プロジェクト内検索
// Ctrl + 6         メンバージャンプ（アウトライン）
// Cmd + Ctrl + ←  前の編集位置に戻る

// 編集:
// Ctrl + I         インデント整形
// Cmd + /          コメントアウト
// Cmd + Option + [  行を上に移動
// Cmd + Option + ]  行を下に移動

// デバッグ:
// Cmd + \\         ブレークポイントのトグル
// F6              ステップオーバー
// F7              ステップイン
// F8              ステップアウト

let shortcuts = ["Cmd+B": "Build", "Cmd+R": "Run", "Cmd+U": "Test"]
for (key, action) in shortcuts.sorted(by: { $0.key < $1.key }) {
    print("\\(key): \\(action)")
}`}
        height="320px"
        expectedOutput="Cmd+B: Build\nCmd+R: Run\nCmd+U: Test"
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="ecosystem" lessonId="xcode" />
      </div>
      <LessonNav lessons={lessons} currentId="xcode" basePath="/learn/ecosystem" />
    </div>
  );
}

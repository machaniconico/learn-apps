import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "ecosystem")!.lessons;

export default function DoCCPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Swiftエコシステム レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">DocC</h1>
        <p className="text-gray-400">DocCによるドキュメント生成と公開の方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">DocCとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-green-300">DocC（Documentation Compiler）</code>はAppleが提供するSwift向けドキュメント生成ツールです。
          ソースコードのコメントから自動でリッチなドキュメントを生成し、Xcodeのドキュメントブラウザや
          静的サイトとして公開できます。<code className="text-green-300">///</code>コメント記法と
          <code className="text-green-300">Markdownのシンタックス</code>でドキュメントを記述します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">/// ドキュメントコメント</code> — 三連スラッシュでDocCコメントを記述</li>
          <li><code className="text-blue-300">- Parameters:</code> — 引数の説明</li>
          <li><code className="text-blue-300">- Returns:</code> — 戻り値の説明</li>
          <li><code className="text-blue-300">- Throws:</code> — スローするエラーの説明</li>
          <li><code className="text-blue-300">.docc カタログ</code> — 追加記事・チュートリアルを含むフォルダ</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例1: DocCコメントの書き方</h2>
        <SwiftEditor
          defaultCode={`import Foundation

// DocCドキュメントコメントの書き方

/// ユーザーアカウントを表す構造体。
///
/// アプリ内のユーザー情報を保持し、認証状態の管理を行います。
///
/// ## 使用例
/// (swift)
/// let user = User(id: 1, name: "田中", email: "tanaka@example.com")
/// print(user.displayName)  // "田中 (tanaka@example.com)"
/// (/swift)
///
/// ## トピック
/// ### プロパティ
/// - id, name, email
struct User {
    /// ユーザーの一意識別子。
    let id: Int
    /// ユーザーの表示名。
    let name: String
    /// ユーザーのメールアドレス。
    let email: String

    /// 表示用の完全な名前文字列を返します。
    var displayName: String {
        "\\(name) (\\(email))"
    }
}

/// 2つの整数を加算します。
///
/// - Parameters:
///   - a: 最初の整数。
///   - b: 2番目の整数。
/// - Returns: a と b の合計値。
func add(_ a: Int, _ b: Int) -> Int {
    return a + b
}

/// ファイルを読み込み、内容を返します。
///
/// - Parameter path: 読み込むファイルのパス。
/// - Returns: ファイルの内容。
/// - Throws: FileError.notFound または FileError.permissionDenied
enum FileError: Error {
    /// ファイルが見つかりません。
    case notFound
    /// 読み取り権限がありません。
    case permissionDenied
}

// ドキュメントコメントの効果を確認
let user = User(id: 1, name: "田中", email: "tanaka@example.com")
print("displayName:", user.displayName)
print("add(3, 4):", add(3, 4))
print("DocCコメントはXcodeのドキュメントブラウザで表示されます")`}
          expectedOutput={`displayName: 田中 (tanaka@example.com)
add(3, 4): 7
DocCコメントはXcodeのドキュメントブラウザで表示されます`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">DocCカタログと追加記事</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-green-300">.doccカタログ</code>はSPMのターゲット内に配置するフォルダで、
          追加のMarkdown記事やチュートリアルを含めることができます。
          <code className="text-green-300">swift package generate-documentation</code>コマンドでドキュメントをビルドし、
          <code className="text-green-300">--hosting-base-path</code>オプションでGitHub Pagesに公開できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">MyLibrary.docc/</code> — DocCカタログのルートフォルダ</li>
          <li><code className="text-blue-300">MyLibrary.md</code> — ライブラリのランディングページ</li>
          <li><code className="text-blue-300">Articles/GettingStarted.md</code> — ガイド記事</li>
          <li><code className="text-blue-300">Tutorials/</code> — インタラクティブチュートリアル</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例2: DocCカタログの構造</h2>
        <SwiftEditor
          defaultCode={`// DocCカタログの構造とMarkdownファイルのサンプル

let doccStructure = """
MyLibrary/
├── Package.swift
└── Sources/
    └── MyLibrary/
        ├── MyLibrary.swift
        ├── User.swift
        └── MyLibrary.docc/          ← DocCカタログ
            ├── MyLibrary.md          ← ランディングページ
            ├── Articles/
            │   ├── GettingStarted.md
            │   └── AdvancedUsage.md
            └── Tutorials/
                └── BuildingYourFirst.tutorial
"""

let landingPageMD = """
# MyLibrary

Swiftでユーザー管理を簡単に実装するためのライブラリです。

## 概要

MyLibraryは以下の機能を提供します：
- ユーザーの作成と管理
- 認証とセッション管理
- データの永続化

## トピック

### 基本的な使い方

- GettingStarted

### モデル

- User
- Session
"""

print("DocCカタログ構造:")
print(doccStructure)
print("ランディングページ (MyLibrary.md):")
print(landingPageMD)`}
          expectedOutput={`DocCカタログ構造:
MyLibrary/
├── Package.swift
└── Sources/
    └── MyLibrary/
        ├── MyLibrary.swift
        ├── User.swift
        └── MyLibrary.docc/
            ├── MyLibrary.md
            ├── Articles/
            │   ├── GettingStarted.md
            │   └── AdvancedUsage.md
            └── Tutorials/
                └── BuildingYourFirst.tutorial

ランディングページ (MyLibrary.md):
# MyLibrary

Swiftでユーザー管理を簡単に実装するためのライブラリです。
...`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例3: DocCのビルドとGitHub Pages公開</h2>
        <SwiftEditor
          defaultCode={`// DocCドキュメントのビルドと公開コマンド

let buildCommands = [
    ("ローカルプレビュー",
     "swift package --disable-sandbox preview-documentation --target MyLibrary"),
    ("ドキュメントビルド",
     "swift package generate-documentation --target MyLibrary"),
    ("GitHub Pages向けビルド",
     "swift package generate-documentation --target MyLibrary --output-path ./docs --hosting-base-path MyLibrary --transform-for-static-hosting"),
]

print("DocCビルドコマンド:")
for (label, cmd) in buildCommands {
    print("\\n【\\(label)】")
    print(cmd)
}

// GitHub Actionsワークフロー例
let githubActionsWorkflow = """
name: Deploy DocC to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: macos-14
    steps:
      - uses: actions/checkout@v4
      - name: Generate DocC
        run: |
          swift package generate-documentation \\\\
            --target MyLibrary \\\\
            --output-path ./docs \\\\
            --hosting-base-path MyLibrary \\\\
            --transform-for-static-hosting
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: GITHUB_TOKEN_HERE
          publish_dir: ./docs
"""

print("\\nGitHub Actions ワークフロー:")
print(githubActionsWorkflow)`}
          expectedOutput={`DocCビルドコマンド:

【ローカルプレビュー】
swift package --disable-sandbox preview-documentation --target MyLibrary

【ドキュメントビルド】
swift package generate-documentation --target MyLibrary

【GitHub Pages向けビルド】
swift package generate-documentation --target MyLibrary --output-path ./docs --hosting-base-path MyLibrary --transform-for-static-hosting

GitHub Actions ワークフロー:
name: Deploy DocC to GitHub Pages
...`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="docc" />
      </div>
      <LessonNav lessons={lessons} currentId="docc" basePath="/learn/ecosystem" />
    </div>
  );
}

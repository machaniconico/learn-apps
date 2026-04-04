import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("packages");

export default function InternalPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">パッケージ・モジュール レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">internalパッケージ</h1>
        <p className="text-gray-400">internal/ディレクトリによるパッケージアクセス制限の仕組みを学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">internalの仕組み</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">internal/</code> ディレクトリ内のパッケージは、
          そのinternalの親ディレクトリのサブツリーからのみインポートできます。
          これにより、パッケージの内部実装を外部に公開せずに済みます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fmt.Println("=== internal パッケージの構造 ===")
    fmt.Println()
    fmt.Println("myproject/")
    fmt.Println("├── cmd/")
    fmt.Println("│   └── app/")
    fmt.Println("│       └── main.go        # ← internal/ にアクセス可能")
    fmt.Println("├── internal/")
    fmt.Println("│   ├── auth/")
    fmt.Println("│   │   └── auth.go        # 内部パッケージ")
    fmt.Println("│   └── database/")
    fmt.Println("│       └── db.go          # 内部パッケージ")
    fmt.Println("├── pkg/")
    fmt.Println("│   └── api/")
    fmt.Println("│       └── handler.go     # ← internal/ にアクセス可能")
    fmt.Println("└── go.mod")
    fmt.Println()
    fmt.Println("■ 外部プロジェクトからはインポート不可！")
    fmt.Println("  use of internal package ... not allowed")
}`}
          expectedOutput={`=== internal パッケージの構造 ===

myproject/
├── cmd/
│   └── app/
│       └── main.go        # ← internal/ にアクセス可能
├── internal/
│   ├── auth/
│   │   └── auth.go        # 内部パッケージ
│   └── database/
│       └── db.go          # 内部パッケージ
├── pkg/
│   └── api/
│       └── handler.go     # ← internal/ にアクセス可能
└── go.mod

■ 外部プロジェクトからはインポート不可！
  use of internal package ... not allowed`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">internalの使いどころ</h2>
        <p className="text-gray-400 mb-4">
          公開APIを安定させつつ、内部実装を自由に変更したい場合に
          <code className="text-cyan-300">internal</code> が有効です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fmt.Println("=== internal の使いどころ ===")
    fmt.Println()
    fmt.Println("■ 適しているケース:")
    fmt.Println("  - ヘルパー関数（外部に公開不要）")
    fmt.Println("  - データベース接続の詳細")
    fmt.Println("  - 認証ロジック")
    fmt.Println("  - 設定ファイルの読み込み処理")
    fmt.Println()
    fmt.Println("■ pkg/ との違い:")
    fmt.Println("  pkg/    → 外部から利用されることを想定")
    fmt.Println("  internal/ → 内部でのみ使用")
    fmt.Println()
    fmt.Println("■ ネストも可能:")
    fmt.Println("  pkg/server/internal/middleware/")
    fmt.Println("  → server パッケージからのみアクセス可能")
}`}
          expectedOutput={`=== internal の使いどころ ===

■ 適しているケース:
  - ヘルパー関数（外部に公開不要）
  - データベース接続の詳細
  - 認証ロジック
  - 設定ファイルの読み込み処理

■ pkg/ との違い:
  pkg/    → 外部から利用されることを想定
  internal/ → 内部でのみ使用

■ ネストも可能:
  pkg/server/internal/middleware/
  → server パッケージからのみアクセス可能`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実践的なプロジェクト構成</h2>
        <p className="text-gray-400 mb-4">
          Go標準のプロジェクトレイアウトでは、
          <code className="text-cyan-300">cmd/</code>、
          <code className="text-cyan-300">internal/</code>、
          <code className="text-cyan-300">pkg/</code> の3つが基本です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fmt.Println("=== Go プロジェクト構成例 ===")
    fmt.Println()
    fmt.Println("myservice/")
    fmt.Println("├── cmd/")
    fmt.Println("│   ├── server/main.go    # APIサーバー")
    fmt.Println("│   └── worker/main.go    # バックグラウンドワーカー")
    fmt.Println("├── internal/")
    fmt.Println("│   ├── handler/          # HTTPハンドラ")
    fmt.Println("│   ├── service/          # ビジネスロジック")
    fmt.Println("│   ├── repository/       # データアクセス")
    fmt.Println("│   └── model/            # ドメインモデル")
    fmt.Println("├── pkg/")
    fmt.Println("│   └── client/           # 公開クライアントSDK")
    fmt.Println("├── go.mod")
    fmt.Println("└── go.sum")
}`}
          expectedOutput={`=== Go プロジェクト構成例 ===

myservice/
├── cmd/
│   ├── server/main.go    # APIサーバー
│   └── worker/main.go    # バックグラウンドワーカー
├── internal/
│   ├── handler/          # HTTPハンドラ
│   ├── service/          # ビジネスロジック
│   ├── repository/       # データアクセス
│   └── model/            # ドメインモデル
├── pkg/
│   └── client/           # 公開クライアントSDK
├── go.mod
└── go.sum`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="packages" lessonId="internal" />
      </div>
      <LessonNav lessons={lessons} currentId="internal" basePath="/learn/packages" />
    </div>
  );
}

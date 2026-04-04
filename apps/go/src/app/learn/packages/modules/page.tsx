import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("packages");

export default function ModulesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">パッケージ・モジュール レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">モジュール</h1>
        <p className="text-gray-400">go mod initによるモジュールの初期化、go.mod、go.sum、依存関係管理を学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">go mod init</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">go mod init モジュールパス</code> でモジュールを初期化します。
          通常、モジュールパスはリポジトリのURLに対応させます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fmt.Println("=== モジュールの初期化 ===")
    fmt.Println()
    fmt.Println("■ 基本コマンド:")
    fmt.Println("  go mod init github.com/user/myproject")
    fmt.Println()
    fmt.Println("■ 生成されるファイル:")
    fmt.Println("  go.mod - モジュール定義と依存関係")
    fmt.Println("  go.sum - 依存関係のチェックサム")
    fmt.Println()
    fmt.Println("■ go.mod の中身（例）:")
    fmt.Println("  module github.com/user/myproject")
    fmt.Println("  go 1.21")
    fmt.Println("  require (")
    fmt.Println("      github.com/gin-gonic/gin v1.9.1")
    fmt.Println("  )")
}`}
          expectedOutput={`=== モジュールの初期化 ===

■ 基本コマンド:
  go mod init github.com/user/myproject

■ 生成されるファイル:
  go.mod - モジュール定義と依存関係
  go.sum - 依存関係のチェックサム

■ go.mod の中身（例）:
  module github.com/user/myproject
  go 1.21
  require (
      github.com/gin-gonic/gin v1.9.1
  )`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">依存関係の管理</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">go get</code> で依存パッケージを追加・更新し、
          <code className="text-cyan-300">go mod tidy</code> で不要な依存を整理します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fmt.Println("=== 依存関係管理コマンド ===")
    fmt.Println()
    fmt.Println("■ パッケージの追加:")
    fmt.Println("  go get github.com/gin-gonic/gin")
    fmt.Println("  go get github.com/gin-gonic/gin@v1.9.1")
    fmt.Println()
    fmt.Println("■ パッケージの更新:")
    fmt.Println("  go get -u github.com/gin-gonic/gin")
    fmt.Println("  go get -u ./...  # 全依存を更新")
    fmt.Println()
    fmt.Println("■ 依存の整理:")
    fmt.Println("  go mod tidy     # 不要な依存を削除")
    fmt.Println("  go mod download # 依存をダウンロード")
    fmt.Println("  go mod verify   # チェックサムを検証")
    fmt.Println()
    fmt.Println("■ 依存の確認:")
    fmt.Println("  go list -m all  # 全依存を一覧")
}`}
          expectedOutput={`=== 依存関係管理コマンド ===

■ パッケージの追加:
  go get github.com/gin-gonic/gin
  go get github.com/gin-gonic/gin@v1.9.1

■ パッケージの更新:
  go get -u github.com/gin-gonic/gin
  go get -u ./...  # 全依存を更新

■ 依存の整理:
  go mod tidy     # 不要な依存を削除
  go mod download # 依存をダウンロード
  go mod verify   # チェックサムを検証

■ 依存の確認:
  go list -m all  # 全依存を一覧`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">セマンティックバージョニング</h2>
        <p className="text-gray-400 mb-4">
          Goモジュールはセマンティックバージョニング（SemVer）に従います。
          メジャーバージョン2以降はモジュールパスに含めるのがGoの規約です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fmt.Println("=== セマンティックバージョニング ===")
    fmt.Println()
    fmt.Println("v1.2.3")
    fmt.Println("  v1 = メジャー（互換性のない変更）")
    fmt.Println("  .2 = マイナー（後方互換な機能追加）")
    fmt.Println("  .3 = パッチ（バグ修正）")
    fmt.Println()
    fmt.Println("■ v2以降のインポート:")
    fmt.Println("  import \"github.com/user/pkg/v2\"")
    fmt.Println("  import \"github.com/user/pkg/v3\"")
    fmt.Println()
    fmt.Println("■ バージョン指定:")
    fmt.Println("  go get pkg@v1.2.3   # 特定バージョン")
    fmt.Println("  go get pkg@latest   # 最新版")
}`}
          expectedOutput={`=== セマンティックバージョニング ===

v1.2.3
  v1 = メジャー（互換性のない変更）
  .2 = マイナー（後方互換な機能追加）
  .3 = パッチ（バグ修正）

■ v2以降のインポート:
  import "github.com/user/pkg/v2"
  import "github.com/user/pkg/v3"

■ バージョン指定:
  go get pkg@v1.2.3   # 特定バージョン
  go get pkg@latest   # 最新版`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="packages" lessonId="modules" />
      </div>
      <LessonNav lessons={lessons} currentId="modules" basePath="/learn/packages" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

export default function LintingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Goエコシステム レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">リンター</h1>
        <p className="text-gray-400">golangci-lintの設定と一般的なルールを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">golangci-lintとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">golangci-lint</code>は多数のGoリンターを統合実行できるメタリンターです。
          <code className="text-cyan-300">.golangci.yml</code>設定ファイルでルールをカスタマイズできます。
          CIに組み込んでコード品質を自動的にチェックするのが一般的です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">インストールと基本使用</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">golangci-lint</code>の基本コマンドを確認しましょう。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // インストール方法
    install := []string{
        "go install github.com/golangci-lint/golangci-lint/cmd/golangci-lint@latest",
        "brew install golangci-lint",
        "curl -sSfL https://raw.githubusercontent.com/golangci-lint/golangci-lint/HEAD/install.sh | sh",
    }

    fmt.Println("=== インストール方法 ===")
    for _, cmd := range install {
        fmt.Printf("  $ %s\\n", cmd)
    }

    // 基本コマンド
    commands := map[string]string{
        "golangci-lint run":         "全リンターを実行",
        "golangci-lint run ./...":   "全パッケージを対象",
        "golangci-lint run --fix":   "自動修正可能な問題を修正",
        "golangci-lint linters":     "利用可能なリンター一覧",
        "golangci-lint cache clean": "キャッシュをクリア",
    }

    fmt.Println("\\n=== 基本コマンド ===")
    for cmd, desc := range commands {
        fmt.Printf("  %-35s %s\\n", cmd, desc)
    }
}`}
          expectedOutput={`=== インストール方法 ===
  $ go install github.com/golangci-lint/golangci-lint/cmd/golangci-lint@latest
  $ brew install golangci-lint
  $ curl -sSfL https://raw.githubusercontent.com/golangci-lint/golangci-lint/HEAD/install.sh | sh

=== 基本コマンド ===
  golangci-lint run                   全リンターを実行
  golangci-lint run ./...             全パッケージを対象
  golangci-lint run --fix             自動修正可能な問題を修正
  golangci-lint linters               利用可能なリンター一覧
  golangci-lint cache clean           キャッシュをクリア`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">.golangci.yml設定例</h2>
        <p className="text-gray-400 mb-4">
          設定ファイルでリンターの有効化・無効化とルールを管理します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // .golangci.yml の構成例
    config := ` + "`" + `
# .golangci.yml
run:
  timeout: 5m
  tests: true

linters:
  enable:
    - errcheck      # エラーチェック漏れ
    - govet         # go vetと同等
    - staticcheck   # 高度な静的解析
    - unused        # 未使用コード
    - gosimple      # コード簡略化
    - ineffassign   # 無効な代入
    - gocritic      # コード品質チェック
    - gofmt         # フォーマットチェック
    - misspell      # スペルチェック

linters-settings:
  govet:
    enable-all: true
  errcheck:
    check-type-assertions: true

issues:
  max-issues-per-linter: 50
  max-same-issues: 3
` + "`" + `

    fmt.Println("=== .golangci.yml 設定例 ===")
    fmt.Println(config)
}`}
          expectedOutput={`=== .golangci.yml 設定例 ===

# .golangci.yml
run:
  timeout: 5m
  tests: true

linters:
  enable:
    - errcheck      # エラーチェック漏れ
    - govet         # go vetと同等
    - staticcheck   # 高度な静的解析
    - unused        # 未使用コード
    - gosimple      # コード簡略化
    - ineffassign   # 無効な代入
    - gocritic      # コード品質チェック
    - gofmt         # フォーマットチェック
    - misspell      # スペルチェック

linters-settings:
  govet:
    enable-all: true
  errcheck:
    check-type-assertions: true

issues:
  max-issues-per-linter: 50
  max-same-issues: 3
`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">よく使うリンタールール</h2>
        <p className="text-gray-400 mb-4">
          リンターが検出する一般的な問題パターンを理解しましょう。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    linters := []struct {
        name    string
        detects string
        example string
    }{
        {"errcheck", "エラー未チェック", "f.Close() // errを無視"},
        {"govet", "printfの書式不一致", "Printf(\"%d\", \"str\")"},
        {"staticcheck", "非推奨API使用", "strings.Title() // 非推奨"},
        {"unused", "未使用変数・関数", "var x int // 使われない"},
        {"gosimple", "簡略化可能コード", "if x == true { // 冗長 }"},
        {"ineffassign", "無効な代入", "x = 1; x = 2 // 最初は不要"},
        {"misspell", "スペルミス", "// Recieve -> Receive"},
    }

    fmt.Println("=== 主要リンターと検出対象 ===")
    for _, l := range linters {
        fmt.Printf("\\n[%s] %s\\n", l.name, l.detects)
        fmt.Printf("  例: %s\\n", l.example)
    }
}`}
          expectedOutput={`=== 主要リンターと検出対象 ===

[errcheck] エラー未チェック
  例: f.Close() // errを無視

[govet] printfの書式不一致
  例: Printf("%d", "str")

[staticcheck] 非推奨API使用
  例: strings.Title() // 非推奨

[unused] 未使用変数・関数
  例: var x int // 使われない

[gosimple] 簡略化可能コード
  例: if x == true { // 冗長 }

[ineffassign] 無効な代入
  例: x = 1; x = 2 // 最初は不要

[misspell] スペルミス
  例: // Recieve -> Receive`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="linting" />
      </div>
      <LessonNav lessons={lessons} currentId="linting" basePath="/learn/ecosystem" />
    </div>
  );
}

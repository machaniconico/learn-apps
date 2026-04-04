import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

export default function CommunityPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Goエコシステム レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コミュニティ</h1>
        <p className="text-gray-400">Goのバージョン管理、アップグレード戦略、学習リソースを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Goコミュニティ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          GoはGoogleが開発し、オープンソースコミュニティが支える言語です。
          約6ヶ月ごとにメジャーバージョンがリリースされ、後方互換性が重視されています。
          <code className="text-cyan-300">Go 1 互換性保証</code>により、Go 1.x で書いたコードは将来も動作します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Goのバージョン管理</h2>
        <p className="text-gray-400 mb-4">
          Goのリリースサイクルとバージョン管理の仕組みを理解しましょう。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "runtime"
)

func main() {
    fmt.Printf("現在のGoバージョン: %s\\n\\n", runtime.Version())

    // リリース履歴（主要なもの）
    releases := []struct {
        version  string
        year     string
        features string
    }{
        {"Go 1.18", "2022", "ジェネリクス、ファジング"},
        {"Go 1.19", "2022", "メモリモデル改訂"},
        {"Go 1.20", "2023", "PGO、arena実験的追加"},
        {"Go 1.21", "2023", "min/max/clear組み込み、slog"},
        {"Go 1.22", "2024", "ループ変数のスコープ変更、ServeMux改善"},
        {"Go 1.23", "2024", "range over func、iterator"},
    }

    fmt.Println("=== Goリリース履歴 ===")
    for _, r := range releases {
        fmt.Printf("  %s (%s): %s\\n", r.version, r.year, r.features)
    }

    fmt.Println("\\nリリースサイクル: 約6ヶ月ごと")
    fmt.Println("サポート: 最新2バージョンにセキュリティ修正")
}`}
          expectedOutput={`現在のGoバージョン: go1.22.0

=== Goリリース履歴 ===
  Go 1.18 (2022): ジェネリクス、ファジング
  Go 1.19 (2022): メモリモデル改訂
  Go 1.20 (2023): PGO、arena実験的追加
  Go 1.21 (2023): min/max/clear組み込み、slog
  Go 1.22 (2024): ループ変数のスコープ変更、ServeMux改善
  Go 1.23 (2024): range over func、iterator

リリースサイクル: 約6ヶ月ごと
サポート: 最新2バージョンにセキュリティ修正`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">アップグレード戦略</h2>
        <p className="text-gray-400 mb-4">
          Goのアップグレードは比較的安全ですが、計画的に行うことが重要です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    steps := []struct {
        step string
        desc string
    }{
        {"1. リリースノートを確認",
            "新機能・破壊的変更・非推奨APIをチェック"},
        {"2. go.modのgoディレクティブを更新",
            "go 1.21 -> go 1.22 に変更"},
        {"3. go mod tidy を実行",
            "依存関係を整理"},
        {"4. テストを実行",
            "go test -race ./... で全テスト"},
        {"5. go vet を実行",
            "新しいバージョンの静的解析チェック"},
        {"6. CI環境も更新",
            "GitHub Actionsのgo-versionを変更"},
    }

    fmt.Println("=== Goアップグレード手順 ===")
    for _, s := range steps {
        fmt.Printf("\\n%s\\n  %s\\n", s.step, s.desc)
    }

    fmt.Println("\\n=== go.modの更新 ===")
    fmt.Println("  go mod edit -go=1.22")
    fmt.Println("  go mod tidy")
    fmt.Println("  go test ./...")
}`}
          expectedOutput={`=== Goアップグレード手順 ===

1. リリースノートを確認
  新機能・破壊的変更・非推奨APIをチェック

2. go.modのgoディレクティブを更新
  go 1.21 -> go 1.22 に変更

3. go mod tidy を実行
  依存関係を整理

4. テストを実行
  go test -race ./... で全テスト

5. go vet を実行
  新しいバージョンの静的解析チェック

6. CI環境も更新
  GitHub Actionsのgo-versionを変更

=== go.modの更新 ===
  go mod edit -go=1.22
  go mod tidy
  go test ./...`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">学習リソースとコミュニティ</h2>
        <p className="text-gray-400 mb-4">
          Go学習に役立つリソースとコミュニティを紹介します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    resources := map[string][]struct {
        name string
        url  string
    }{
        "公式リソース": {
            {"Go公式サイト", "go.dev"},
            {"A Tour of Go", "go.dev/tour"},
            {"Effective Go", "go.dev/doc/effective_go"},
            {"Go Blog", "go.dev/blog"},
            {"Go Playground", "go.dev/play"},
        },
        "学習サイト": {
            {"Go by Example", "gobyexample.com"},
            {"Go Wiki", "go.dev/wiki"},
            {"Awesome Go", "awesome-go.com"},
        },
        "コミュニティ": {
            {"Gophers Slack", "gophers.slack.com"},
            {"Go Forum", "forum.golangbridge.org"},
            {"Reddit r/golang", "reddit.com/r/golang"},
            {"Go Conference", "gocon.jp（日本）"},
        },
    }

    for category, items := range resources {
        fmt.Printf("=== %s ===\\n", category)
        for _, item := range items {
            fmt.Printf("  %-25s %s\\n", item.name, item.url)
        }
        fmt.Println()
    }
}`}
          expectedOutput={`=== 公式リソース ===
  Go公式サイト                  go.dev
  A Tour of Go               go.dev/tour
  Effective Go               go.dev/doc/effective_go
  Go Blog                    go.dev/blog
  Go Playground              go.dev/play

=== 学習サイト ===
  Go by Example              gobyexample.com
  Go Wiki                    go.dev/wiki
  Awesome Go                 awesome-go.com

=== コミュニティ ===
  Gophers Slack              gophers.slack.com
  Go Forum                   forum.golangbridge.org
  Reddit r/golang            reddit.com/r/golang
  Go Conference              gocon.jp（日本）
`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="community" />
      </div>
      <LessonNav lessons={lessons} currentId="community" basePath="/learn/ecosystem" />
    </div>
  );
}

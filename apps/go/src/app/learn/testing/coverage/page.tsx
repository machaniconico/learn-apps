import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("testing");

export default function CoveragePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">テスト レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">カバレッジ</h1>
        <p className="text-gray-400">go test -coverでテストカバレッジを計測し、カバー率を可視化する方法を学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なカバレッジ計測</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">go test -cover</code> でテストカバレッジの概要を表示します。
          カバレッジは、テストによって実行されたコードの割合を示します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fmt.Println("=== カバレッジ計測 ===")
    fmt.Println()
    fmt.Println("■ 基本コマンド:")
    fmt.Println("  go test -cover")
    fmt.Println()
    fmt.Println("  出力例:")
    fmt.Println("  PASS")
    fmt.Println("  coverage: 85.7% of statements")
    fmt.Println()
    fmt.Println("■ 全パッケージ:")
    fmt.Println("  go test -cover ./...")
    fmt.Println()
    fmt.Println("  出力例:")
    fmt.Println("  ok  myapp/handler  0.5s  coverage: 92.3%")
    fmt.Println("  ok  myapp/service  0.3s  coverage: 78.1%")
    fmt.Println("  ok  myapp/model    0.1s  coverage: 100.0%")
}`}
          expectedOutput={`=== カバレッジ計測 ===

■ 基本コマンド:
  go test -cover

  出力例:
  PASS
  coverage: 85.7% of statements

■ 全パッケージ:
  go test -cover ./...

  出力例:
  ok  myapp/handler  0.5s  coverage: 92.3%
  ok  myapp/service  0.3s  coverage: 78.1%
  ok  myapp/model    0.1s  coverage: 100.0%`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カバレッジプロファイル</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">-coverprofile</code> でプロファイルを出力し、
          <code className="text-cyan-300">go tool cover</code> でHTMLレポートを生成できます。
          どの行がカバーされていないか視覚的に確認できます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fmt.Println("=== カバレッジプロファイル ===")
    fmt.Println()
    fmt.Println("■ プロファイル出力:")
    fmt.Println("  go test -coverprofile=coverage.out")
    fmt.Println()
    fmt.Println("■ HTMLレポート生成:")
    fmt.Println("  go tool cover -html=coverage.out")
    fmt.Println("  → ブラウザで開かれる")
    fmt.Println("  → 緑: カバー済み、赤: 未カバー")
    fmt.Println()
    fmt.Println("■ ファイルに出力:")
    fmt.Println("  go tool cover -html=coverage.out -o coverage.html")
    fmt.Println()
    fmt.Println("■ 関数ごとのカバレッジ:")
    fmt.Println("  go tool cover -func=coverage.out")
    fmt.Println()
    fmt.Println("  出力例:")
    fmt.Println("  myapp/calc.go:5:   Add        100.0%")
    fmt.Println("  myapp/calc.go:9:   Subtract   100.0%")
    fmt.Println("  myapp/calc.go:13:  Divide     66.7%")
    fmt.Println("  total:             (statements) 88.9%")
}`}
          expectedOutput={`=== カバレッジプロファイル ===

■ プロファイル出力:
  go test -coverprofile=coverage.out

■ HTMLレポート生成:
  go tool cover -html=coverage.out
  → ブラウザで開かれる
  → 緑: カバー済み、赤: 未カバー

■ ファイルに出力:
  go tool cover -html=coverage.out -o coverage.html

■ 関数ごとのカバレッジ:
  go tool cover -func=coverage.out

  出力例:
  myapp/calc.go:5:   Add        100.0%
  myapp/calc.go:9:   Subtract   100.0%
  myapp/calc.go:13:  Divide     66.7%
  total:             (statements) 88.9%`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カバレッジモード</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">-covermode</code> で計測モードを変更できます。
          デフォルトは <code className="text-cyan-300">set</code> ですが、
          <code className="text-cyan-300">count</code> や <code className="text-cyan-300">atomic</code> も利用可能です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fmt.Println("=== カバレッジモード ===")
    fmt.Println()
    fmt.Println("■ set（デフォルト）:")
    fmt.Println("  各文が実行されたかどうか（true/false）")
    fmt.Println("  go test -covermode=set")
    fmt.Println()
    fmt.Println("■ count:")
    fmt.Println("  各文が何回実行されたか")
    fmt.Println("  go test -covermode=count")
    fmt.Println("  → ホットスポットの発見に有用")
    fmt.Println()
    fmt.Println("■ atomic:")
    fmt.Println("  countと同じだが並行安全")
    fmt.Println("  go test -covermode=atomic -race")
    fmt.Println("  → 並行テストで正確な結果")
    fmt.Println()
    fmt.Println("■ 目安:")
    fmt.Println("  80%以上 → 良好")
    fmt.Println("  90%以上 → 優秀")
    fmt.Println("  100%は非現実的（エラーパス等）")
}`}
          expectedOutput={`=== カバレッジモード ===

■ set（デフォルト）:
  各文が実行されたかどうか（true/false）
  go test -covermode=set

■ count:
  各文が何回実行されたか
  go test -covermode=count
  → ホットスポットの発見に有用

■ atomic:
  countと同じだが並行安全
  go test -covermode=atomic -race
  → 並行テストで正確な結果

■ 目安:
  80%以上 → 良好
  90%以上 → 優秀
  100%は非現実的（エラーパス等）`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="testing" lessonId="coverage" />
      </div>
      <LessonNav lessons={lessons} currentId="coverage" basePath="/learn/testing" />
    </div>
  );
}

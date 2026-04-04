import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("packages");

export default function WorkspacePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">パッケージ・モジュール レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ワークスペース</h1>
        <p className="text-gray-400">go.workファイルでマルチモジュール開発を効率化するワークスペースモードを学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ワークスペースとは</h2>
        <p className="text-gray-400 mb-4">
          Go 1.18で導入された<code className="text-cyan-300">ワークスペース</code>は、
          複数のモジュールを同時に開発する際に便利です。
          <code className="text-cyan-300">go.work</code> ファイルで管理します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fmt.Println("=== Go ワークスペース ===")
    fmt.Println()
    fmt.Println("■ 初期化:")
    fmt.Println("  go work init ./module-a ./module-b")
    fmt.Println()
    fmt.Println("■ 生成される go.work:")
    fmt.Println("  go 1.21")
    fmt.Println("  use (")
    fmt.Println("      ./module-a")
    fmt.Println("      ./module-b")
    fmt.Println("  )")
    fmt.Println()
    fmt.Println("■ モジュールの追加:")
    fmt.Println("  go work use ./module-c")
    fmt.Println()
    fmt.Println("■ 依存の同期:")
    fmt.Println("  go work sync")
}`}
          expectedOutput={`=== Go ワークスペース ===

■ 初期化:
  go work init ./module-a ./module-b

■ 生成される go.work:
  go 1.21
  use (
      ./module-a
      ./module-b
  )

■ モジュールの追加:
  go work use ./module-c

■ 依存の同期:
  go work sync`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">マルチモジュールの構成例</h2>
        <p className="text-gray-400 mb-4">
          ワークスペースを使うと、ローカルの別モジュールを直接参照でき、
          <code className="text-cyan-300">replace</code> ディレクティブが不要になります。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fmt.Println("=== マルチモジュール構成 ===")
    fmt.Println()
    fmt.Println("myworkspace/")
    fmt.Println("├── go.work              # ワークスペース定義")
    fmt.Println("├── api/")
    fmt.Println("│   ├── go.mod           # module example.com/api")
    fmt.Println("│   └── server.go")
    fmt.Println("├── shared/")
    fmt.Println("│   ├── go.mod           # module example.com/shared")
    fmt.Println("│   └── types.go")
    fmt.Println("└── cli/")
    fmt.Println("    ├── go.mod           # module example.com/cli")
    fmt.Println("    └── main.go")
    fmt.Println()
    fmt.Println("■ メリット:")
    fmt.Println("  - ローカル変更が即座に反映")
    fmt.Println("  - go.mod にreplaceを書かなくてよい")
    fmt.Println("  - モノレポのマルチモジュールに最適")
}`}
          expectedOutput={`=== マルチモジュール構成 ===

myworkspace/
├── go.work              # ワークスペース定義
├── api/
│   ├── go.mod           # module example.com/api
│   └── server.go
├── shared/
│   ├── go.mod           # module example.com/shared
│   └── types.go
└── cli/
    ├── go.mod           # module example.com/cli
    └── main.go

■ メリット:
  - ローカル変更が即座に反映
  - go.mod にreplaceを書かなくてよい
  - モノレポのマルチモジュールに最適`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">注意点とベストプラクティス</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">go.work</code> はローカル開発用であり、
          リポジトリにコミットするかはプロジェクト次第です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fmt.Println("=== ワークスペースの注意点 ===")
    fmt.Println()
    fmt.Println("■ go.work をコミットする？")
    fmt.Println("  モノレポ → コミットする")
    fmt.Println("  個人の開発環境 → .gitignore に追加")
    fmt.Println()
    fmt.Println("■ CI/CDでの扱い:")
    fmt.Println("  GOWORK=off で無効化可能")
    fmt.Println("  各モジュールを個別にテスト")
    fmt.Println()
    fmt.Println("■ replaceとの違い:")
    fmt.Println("  replace: go.modに書く（全環境に影響）")
    fmt.Println("  workspace: go.workに書く（ローカルのみ）")
    fmt.Println()
    fmt.Println("■ コマンドまとめ:")
    fmt.Println("  go work init   # 初期化")
    fmt.Println("  go work use    # モジュール追加")
    fmt.Println("  go work sync   # 依存同期")
    fmt.Println("  go work edit   # go.work編集")
}`}
          expectedOutput={`=== ワークスペースの注意点 ===

■ go.work をコミットする？
  モノレポ → コミットする
  個人の開発環境 → .gitignore に追加

■ CI/CDでの扱い:
  GOWORK=off で無効化可能
  各モジュールを個別にテスト

■ replaceとの違い:
  replace: go.modに書く（全環境に影響）
  workspace: go.workに書く（ローカルのみ）

■ コマンドまとめ:
  go work init   # 初期化
  go work use    # モジュール追加
  go work sync   # 依存同期
  go work edit   # go.work編集`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="packages" lessonId="workspace" />
      </div>
      <LessonNav lessons={lessons} currentId="workspace" basePath="/learn/packages" />
    </div>
  );
}

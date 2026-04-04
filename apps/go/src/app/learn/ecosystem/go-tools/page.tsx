import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

export default function GoToolsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Goエコシステム レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Goツール</h1>
        <p className="text-gray-400">go build、go run、go vet、go fmt、go docの使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Goツールチェーン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Goは豊富な標準ツールチェーンを持っています。
          <code className="text-cyan-300">go</code>コマンド1つでビルド、実行、テスト、フォーマットまで完結します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">go build</code> — バイナリのコンパイル</li>
          <li><code className="text-cyan-300">go run</code> — コンパイル＆即実行</li>
          <li><code className="text-cyan-300">go vet</code> — 静的解析で問題を検出</li>
          <li><code className="text-cyan-300">go fmt</code> — コードの自動フォーマット</li>
          <li><code className="text-cyan-300">go doc</code> — ドキュメントの表示</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">go buildとgo run</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">go build</code>はバイナリを生成し、
          <code className="text-cyan-300">go run</code>はコンパイルと実行を一度に行います。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// go build: バイナリファイルを生成
// $ go build -o myapp main.go
// $ ./myapp
//
// go run: コンパイル＆即実行
// $ go run main.go
//
// クロスコンパイル:
// $ GOOS=linux GOARCH=amd64 go build -o myapp-linux
// $ GOOS=windows GOARCH=amd64 go build -o myapp.exe

func main() {
    commands := []struct {
        cmd  string
        desc string
    }{
        {"go build", "バイナリをコンパイル（カレントディレクトリに生成）"},
        {"go build -o app", "出力ファイル名を指定"},
        {"go run main.go", "コンパイルして即実行（バイナリ残さない）"},
        {"go run .", "カレントパッケージを実行"},
        {"go install", "バイナリを $GOPATH/bin にインストール"},
    }

    fmt.Println("=== ビルド・実行コマンド ===")
    for _, c := range commands {
        fmt.Printf("  %-25s %s\\n", c.cmd, c.desc)
    }
}`}
          expectedOutput={`=== ビルド・実行コマンド ===
  go build                  バイナリをコンパイル（カレントディレクトリに生成）
  go build -o app           出力ファイル名を指定
  go run main.go            コンパイルして即実行（バイナリ残さない）
  go run .                  カレントパッケージを実行
  go install                バイナリを $GOPATH/bin にインストール`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">go vetによる静的解析</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">go vet</code>はコンパイラが検出しない問題（フォーマット文字列の不一致など）を検出します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// go vet が検出する問題の例:
// 1. fmt.Printf のフォーマット不一致
//    fmt.Printf("%d", "hello") // %d に string を渡している
//
// 2. 到達不能コード
//    return x
//    fmt.Println("ここには到達しない")
//
// 3. コピー不可な値のコピー
//    var mu sync.Mutex
//    mu2 := mu  // Mutexのコピーは危険

func main() {
    vetChecks := []struct {
        check string
        desc  string
    }{
        {"printf", "フォーマット文字列と引数の不一致"},
        {"unreachable", "到達不能コード"},
        {"copylocks", "ロックのコピー検出"},
        {"shadow", "変数のシャドーイング"},
        {"structtag", "構造体タグの書式エラー"},
        {"unusedresult", "戻り値の未使用"},
    }

    fmt.Println("=== go vet の検査項目 ===")
    for _, c := range vetChecks {
        fmt.Printf("  %-15s %s\\n", c.check, c.desc)
    }

    fmt.Println("\\n実行方法:")
    fmt.Println("  go vet ./...        全パッケージを検査")
    fmt.Println("  go vet -json ./...  JSON形式で出力")
}`}
          expectedOutput={`=== go vet の検査項目 ===
  printf          フォーマット文字列と引数の不一致
  unreachable     到達不能コード
  copylocks       ロックのコピー検出
  shadow          変数のシャドーイング
  structtag       構造体タグの書式エラー
  unusedresult    戻り値の未使用

実行方法:
  go vet ./...        全パッケージを検査
  go vet -json ./...  JSON形式で出力`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">go fmtとgo doc</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">go fmt</code>はGo公式スタイルにコードを整形します。
          <code className="text-cyan-300">go doc</code>でパッケージのドキュメントを表示できます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// go fmt / gofmt:
// - タブでインデント
// - 中括弧の位置を統一
// - import文のグループ化
// - 不要な空行の除去

// go doc の使い方:
// $ go doc fmt            // fmtパッケージの概要
// $ go doc fmt.Println    // 特定関数のドキュメント
// $ go doc -all fmt       // 全詳細表示

func main() {
    tools := map[string][]string{
        "フォーマット": {
            "go fmt ./...    全ファイルをフォーマット",
            "gofmt -w .      gofmtを直接使う",
            "goimports       import文も自動整理",
        },
        "ドキュメント": {
            "go doc fmt           パッケージ概要",
            "go doc fmt.Println   関数詳細",
            "godoc -http=:6060    ブラウザで閲覧",
        },
    }

    for category, cmds := range tools {
        fmt.Printf("=== %s ===\\n", category)
        for _, cmd := range cmds {
            fmt.Printf("  %s\\n", cmd)
        }
        fmt.Println()
    }
}`}
          expectedOutput={`=== フォーマット ===
  go fmt ./...    全ファイルをフォーマット
  gofmt -w .      gofmtを直接使う
  goimports       import文も自動整理

=== ドキュメント ===
  go doc fmt           パッケージ概要
  go doc fmt.Println   関数詳細
  godoc -http=:6060    ブラウザで閲覧
`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="go-tools" />
      </div>
      <LessonNav lessons={lessons} currentId="go-tools" basePath="/learn/ecosystem" />
    </div>
  );
}

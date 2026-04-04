import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("io");

export default function EmbedPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">ファイルI/O レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">embed</h1>
        <p className="text-gray-400">//go:embedディレクティブでファイルをバイナリに埋め込む方法を学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">go:embedの基本</h2>
        <p className="text-gray-400 mb-4">
          Go 1.16で追加された <code className="text-cyan-300">//go:embed</code> ディレクティブを使うと、
          コンパイル時にファイルの内容をバイナリに埋め込めます。
          実行時にファイルシステムに依存しなくなります。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// 実際のコードでは以下のように使います：
// import "embed"
//
// //go:embed hello.txt
// var content string
//
// //go:embed data.bin
// var data []byte

func main() {
    fmt.Println("=== //go:embed の使い方 ===")
    fmt.Println()
    fmt.Println("■ 文字列として埋め込み:")
    fmt.Println("  //go:embed message.txt")
    fmt.Println("  var message string")
    fmt.Println()
    fmt.Println("■ バイトスライスとして埋め込み:")
    fmt.Println("  //go:embed image.png")
    fmt.Println("  var imageData []byte")
    fmt.Println()
    fmt.Println("■ 注意点:")
    fmt.Println("  - import \"embed\" が必要")
    fmt.Println("  - パッケージレベルの変数のみ")
    fmt.Println("  - 相対パスで指定")
    fmt.Println("  - //go:embed の前にスペースを入れない")
}`}
          expectedOutput={`=== //go:embed の使い方 ===

■ 文字列として埋め込み:
  //go:embed message.txt
  var message string

■ バイトスライスとして埋め込み:
  //go:embed image.png
  var imageData []byte

■ 注意点:
  - import "embed" が必要
  - パッケージレベルの変数のみ
  - 相対パスで指定
  - //go:embed の前にスペースを入れない`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">embed.FSでディレクトリ埋め込み</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">embed.FS</code> を使うと、ディレクトリ全体を埋め込んで
          ファイルシステムのように扱えます。Webサーバーの静的ファイル配信に便利です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// 実際のコードでは以下のように使います：
// import "embed"
//
// //go:embed static/*
// var staticFiles embed.FS
//
// //go:embed templates/*.html
// var templates embed.FS

func main() {
    fmt.Println("=== embed.FS の活用 ===")
    fmt.Println()
    fmt.Println("■ ディレクトリの埋め込み:")
    fmt.Println("  //go:embed static/*")
    fmt.Println("  var staticFS embed.FS")
    fmt.Println()
    fmt.Println("■ ファイルの読み取り:")
    fmt.Println("  data, err := staticFS.ReadFile(\"static/index.html\")")
    fmt.Println()
    fmt.Println("■ HTTPサーバーでの利用:")
    fmt.Println("  http.Handle(\"/static/\",")
    fmt.Println("    http.FileServer(http.FS(staticFS)))")
    fmt.Println()
    fmt.Println("■ 複数パターン:")
    fmt.Println("  //go:embed images/*.png images/*.jpg")
    fmt.Println("  var imageFS embed.FS")
}`}
          expectedOutput={`=== embed.FS の活用 ===

■ ディレクトリの埋め込み:
  //go:embed static/*
  var staticFS embed.FS

■ ファイルの読み取り:
  data, err := staticFS.ReadFile("static/index.html")

■ HTTPサーバーでの利用:
  http.Handle("/static/",
    http.FileServer(http.FS(staticFS)))

■ 複数パターン:
  //go:embed images/*.png images/*.jpg
  var imageFS embed.FS`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実践例：設定ファイルの埋め込み</h2>
        <p className="text-gray-400 mb-4">
          デフォルト設定やSQLマイグレーションファイルなど、
          アプリケーションに必要なファイルを埋め込むのが一般的な使い方です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fmt.Println("=== embed の実践的な用途 ===")
    fmt.Println()
    fmt.Println("1. デフォルト設定ファイル")
    fmt.Println("   //go:embed config/default.yaml")
    fmt.Println("   var defaultConfig string")
    fmt.Println()
    fmt.Println("2. SQLマイグレーション")
    fmt.Println("   //go:embed migrations/*.sql")
    fmt.Println("   var migrationsFS embed.FS")
    fmt.Println()
    fmt.Println("3. HTMLテンプレート")
    fmt.Println("   //go:embed templates/*")
    fmt.Println("   var templateFS embed.FS")
    fmt.Println()
    fmt.Println("4. 静的Webアセット")
    fmt.Println("   //go:embed dist/*")
    fmt.Println("   var webAssets embed.FS")
    fmt.Println()
    fmt.Println("■ メリット:")
    fmt.Println("  - 単一バイナリでデプロイ可能")
    fmt.Println("  - ファイル不足のリスクなし")
    fmt.Println("  - Dockerイメージの簡素化")
}`}
          expectedOutput={`=== embed の実践的な用途 ===

1. デフォルト設定ファイル
   //go:embed config/default.yaml
   var defaultConfig string

2. SQLマイグレーション
   //go:embed migrations/*.sql
   var migrationsFS embed.FS

3. HTMLテンプレート
   //go:embed templates/*
   var templateFS embed.FS

4. 静的Webアセット
   //go:embed dist/*
   var webAssets embed.FS

■ メリット:
  - 単一バイナリでデプロイ可能
  - ファイル不足のリスクなし
  - Dockerイメージの簡素化`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="io" lessonId="embed" />
      </div>
      <LessonNav lessons={lessons} currentId="embed" basePath="/learn/io" />
    </div>
  );
}

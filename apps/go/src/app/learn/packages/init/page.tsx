import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("packages");

export default function InitPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">パッケージ・モジュール レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">init関数</h1>
        <p className="text-gray-400">パッケージの初期化に使われるinit()関数の動作と実行順序を学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">init()関数の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">init()</code> 関数はパッケージの初期化時に自動的に呼ばれます。
          引数も戻り値もなく、明示的に呼び出すことはできません。
          <code className="text-cyan-300">main()</code> より先に実行されます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

var config string

func init() {
    fmt.Println("1. init() が呼ばれました")
    config = "初期化済み"
}

func main() {
    fmt.Println("2. main() が呼ばれました")
    fmt.Printf("config = %s\\n", config)
}`}
          expectedOutput={`1. init() が呼ばれました
2. main() が呼ばれました
config = 初期化済み`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数のinit関数</h2>
        <p className="text-gray-400 mb-4">
          1つのファイルに複数の <code className="text-cyan-300">init()</code> 関数を定義できます。
          ファイル内では上から順に実行されます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func init() {
    fmt.Println("init #1: データベース接続を準備")
}

func init() {
    fmt.Println("init #2: キャッシュを初期化")
}

func init() {
    fmt.Println("init #3: 設定を読み込み")
}

func main() {
    fmt.Println("main: アプリケーション開始")
}`}
          expectedOutput={`init #1: データベース接続を準備
init #2: キャッシュを初期化
init #3: 設定を読み込み
main: アプリケーション開始`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実行順序</h2>
        <p className="text-gray-400 mb-4">
          パッケージの初期化順序は: パッケージレベルの変数 → init() → main() です。
          依存パッケージのinitが先に実行されます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// 1. パッケージレベル変数が先に初期化
var startTime = initStartTime()

func initStartTime() string {
    fmt.Println("1. パッケージ変数の初期化")
    return "2024-01-01"
}

// 2. init()が次に実行
func init() {
    fmt.Println("2. init() の実行")
    fmt.Printf("   startTime = %s\\n", startTime)
}

// 3. main()が最後に実行
func main() {
    fmt.Println("3. main() の実行")
    fmt.Println()
    fmt.Println("=== 実行順序まとめ ===")
    fmt.Println("  依存パッケージの初期化")
    fmt.Println("  → パッケージ変数の初期化")
    fmt.Println("  → init() 関数")
    fmt.Println("  → main() 関数")
}`}
          expectedOutput={`1. パッケージ変数の初期化
2. init() の実行
   startTime = 2024-01-01
3. main() の実行

=== 実行順序まとめ ===
  依存パッケージの初期化
  → パッケージ変数の初期化
  → init() 関数
  → main() 関数`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="packages" lessonId="init" />
      </div>
      <LessonNav lessons={lessons} currentId="init" basePath="/learn/packages" />
    </div>
  );
}

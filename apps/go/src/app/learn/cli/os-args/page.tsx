import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("cli");

export default function OsArgsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">CLIアプリ レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">os.Args</h1>
        <p className="text-gray-400">os.Argsによる引数の直接取得と手動パースを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">os.Argsとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">os.Args</code>はコマンドライン引数を格納する文字列スライスです。
          <code className="text-cyan-300">os.Args[0]</code>はプログラム名、<code className="text-cyan-300">os.Args[1:]</code>が実際の引数です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">os.Args[0]</code> — プログラムのパス名</li>
          <li><code className="text-cyan-300">os.Args[1:]</code> — ユーザーが渡した引数</li>
          <li><code className="text-cyan-300">len(os.Args)</code> — 引数の総数（プログラム名含む）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">os.Argsの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">os.Args</code>はシンプルな引数処理に適しています。
          flagパッケージより低レベルですが自由度が高いです。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // 実際のCLIでは os.Args を使います
    // ここではシミュレーション
    args := []string{"./myapp", "hello", "world", "go"}

    fmt.Printf("プログラム名: %s\\n", args[0])
    fmt.Printf("引数の数: %d\\n", len(args)-1)
    fmt.Println("引数一覧:")
    for i, arg := range args[1:] {
        fmt.Printf("  [%d] %s\\n", i+1, arg)
    }
}`}
          expectedOutput={`プログラム名: ./myapp
引数の数: 3
引数一覧:
  [1] hello
  [2] world
  [3] go`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">手動での引数パース</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">os.Args</code>を使ったサブコマンドの手動パースの例です。
          シンプルなCLIツールではこのパターンが有用です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // サブコマンドパターンのシミュレーション
    args := []string{"./tool", "greet", "--name", "Gopher"}

    if len(args) < 2 {
        fmt.Println("使い方: tool <command> [args]")
        return
    }

    command := args[1]
    switch command {
    case "greet":
        name := "World"
        for i := 2; i < len(args)-1; i++ {
            if args[i] == "--name" {
                name = args[i+1]
            }
        }
        fmt.Printf("Hello, %s!\\n", name)
    case "version":
        fmt.Println("v1.0.0")
    default:
        fmt.Printf("不明なコマンド: %s\\n", command)
    }
}`}
          expectedOutput={`Hello, Gopher!`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">strings.Joinで引数を結合</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">strings.Join</code>を使って引数をまとめて処理する例です。
          echoコマンドのような動作を再現します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "strings"
)

func main() {
    args := []string{"./echo", "Go", "is", "awesome!"}

    if len(args) > 1 {
        message := strings.Join(args[1:], " ")
        fmt.Println(message)
    }

    // 引数をスライスで操作
    items := args[1:]
    fmt.Printf("引数の数: %d\\n", len(items))
    fmt.Printf("最初の引数: %s\\n", items[0])
    fmt.Printf("最後の引数: %s\\n", items[len(items)-1])
}`}
          expectedOutput={`Go is awesome!
引数の数: 3
最初の引数: Go
最後の引数: awesome!`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="cli" lessonId="os-args" />
      </div>
      <LessonNav lessons={lessons} currentId="os-args" basePath="/learn/cli" />
    </div>
  );
}

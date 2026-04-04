import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("cli");

export default function CobraPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">CLIアプリ レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Cobraの紹介</h1>
        <p className="text-gray-400">Cobraライブラリを使った本格的なCLIアプリの構築を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Cobraとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">cobra</code>はGoで最も人気のあるCLIフレームワークです。
          kubectl、Hugo、GitHub CLIなど多くの著名プロジェクトで使用されています。
          サブコマンド、フラグ、ヘルプ生成を自動的に処理します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">cobra.Command</code> — コマンドの定義</li>
          <li><code className="text-cyan-300">AddCommand()</code> — サブコマンドの追加</li>
          <li><code className="text-cyan-300">Flags()</code> — コマンド固有フラグ</li>
          <li><code className="text-cyan-300">PersistentFlags()</code> — 全サブコマンド共通フラグ</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Cobraのコマンド構造</h2>
        <p className="text-gray-400 mb-4">
          Cobraではルートコマンドにサブコマンドを追加していく構造です。
          以下はCobraのようなコマンド構造を手動で再現した例です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// Cobraのコマンド構造を模倣
type Command struct {
    Use   string
    Short string
    Run   func(args []string)
    subs  []*Command
}

func (c *Command) AddCommand(sub *Command) {
    c.subs = append(c.subs, sub)
}

func (c *Command) Execute(args []string) {
    if len(args) > 0 {
        for _, sub := range c.subs {
            if sub.Use == args[0] {
                sub.Run(args[1:])
                return
            }
        }
    }
    c.Run(args)
}

func main() {
    root := &Command{
        Use:   "myapp",
        Short: "サンプルCLIアプリ",
        Run: func(args []string) {
            fmt.Println("myapp: ヘルプを見るには --help を使ってください")
        },
    }

    greet := &Command{
        Use:   "greet",
        Short: "挨拶を表示",
        Run: func(args []string) {
            name := "World"
            if len(args) > 0 {
                name = args[0]
            }
            fmt.Printf("Hello, %s!\\n", name)
        },
    }

    version := &Command{
        Use:   "version",
        Short: "バージョンを表示",
        Run: func(args []string) {
            fmt.Println("myapp v1.0.0")
        },
    }

    root.AddCommand(greet)
    root.AddCommand(version)

    root.Execute([]string{"greet", "Gopher"})
    root.Execute([]string{"version"})
}`}
          expectedOutput={`Hello, Gopher!
myapp v1.0.0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">フラグの扱い</h2>
        <p className="text-gray-400 mb-4">
          Cobraのフラグシステムは<code className="text-cyan-300">pflag</code>パッケージに基づいています。
          PersistentFlagsは全サブコマンドで有効、Flagsはそのコマンドだけで有効です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// Cobraのフラグ管理を模倣
type Flags struct {
    values map[string]string
}

func NewFlags() *Flags {
    return &Flags{values: make(map[string]string)}
}

func (f *Flags) StringVar(name, defaultVal, usage string) {
    f.values[name] = defaultVal
    fmt.Printf("フラグ登録: --%s (デフォルト: %q) %s\\n", name, defaultVal, usage)
}

func (f *Flags) Get(name string) string {
    return f.values[name]
}

func main() {
    // PersistentFlags（全コマンド共通）
    persistent := NewFlags()
    persistent.StringVar("config", "~/.config/app.yaml", "設定ファイルパス")
    persistent.StringVar("log-level", "info", "ログレベル")

    fmt.Println()

    // ローカルFlags（特定コマンドのみ）
    local := NewFlags()
    local.StringVar("output", "json", "出力形式")
    local.StringVar("count", "10", "取得件数")

    fmt.Println()
    fmt.Printf("設定ファイル: %s\\n", persistent.Get("config"))
    fmt.Printf("出力形式: %s\\n", local.Get("output"))
}`}
          expectedOutput={`フラグ登録: --config (デフォルト: "~/.config/app.yaml") 設定ファイルパス
フラグ登録: --log-level (デフォルト: "info") ログレベル

フラグ登録: --output (デフォルト: "json") 出力形式
フラグ登録: --count (デフォルト: "10") 取得件数

設定ファイル: ~/.config/app.yaml
出力形式: json`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実際のCobraコード構造</h2>
        <p className="text-gray-400 mb-4">
          実際のCobraアプリのファイル構成と、<code className="text-cyan-300">cobra.Command</code>の定義方法を確認しましょう。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// 実際のCobraコードはこのように書きます:
//
// var rootCmd = &cobra.Command{
//     Use:   "myapp",
//     Short: "My application",
//     Long:  "A longer description...",
// }
//
// var serveCmd = &cobra.Command{
//     Use:   "serve",
//     Short: "Start the server",
//     RunE: func(cmd *cobra.Command, args []string) error {
//         port, _ := cmd.Flags().GetInt("port")
//         return startServer(port)
//     },
// }
//
// func init() {
//     serveCmd.Flags().IntP("port", "p", 8080, "port number")
//     rootCmd.AddCommand(serveCmd)
// }

func main() {
    // Cobraのファイル構成例
    files := map[string]string{
        "cmd/root.go":    "ルートコマンド定義",
        "cmd/serve.go":   "serveサブコマンド",
        "cmd/version.go": "versionサブコマンド",
        "main.go":        "rootCmd.Execute()を呼ぶ",
    }
    fmt.Println("Cobraプロジェクト構成:")
    for file, desc := range files {
        fmt.Printf("  %s — %s\\n", file, desc)
    }
}`}
          expectedOutput={`Cobraプロジェクト構成:
  cmd/root.go — ルートコマンド定義
  cmd/serve.go — serveサブコマンド
  cmd/version.go — versionサブコマンド
  main.go — rootCmd.Execute()を呼ぶ`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="cli" lessonId="cobra" />
      </div>
      <LessonNav lessons={lessons} currentId="cobra" basePath="/learn/cli" />
    </div>
  );
}

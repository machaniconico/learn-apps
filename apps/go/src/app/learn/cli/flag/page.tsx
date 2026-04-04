import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("cli");

export default function FlagPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">CLIアプリ レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">flagパッケージ</h1>
        <p className="text-gray-400">コマンドラインフラグの定義と解析を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">flagパッケージの基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">flag</code>パッケージはGoの標準ライブラリで、コマンドラインフラグを簡単に定義・解析できます。
          <code className="text-cyan-300">flag.String</code>、<code className="text-cyan-300">flag.Int</code>、
          <code className="text-cyan-300">flag.Bool</code>でフラグを定義し、<code className="text-cyan-300">flag.Parse()</code>で解析します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">flag.String(name, default, usage)</code> — 文字列フラグ</li>
          <li><code className="text-cyan-300">flag.Int(name, default, usage)</code> — 整数フラグ</li>
          <li><code className="text-cyan-300">flag.Bool(name, default, usage)</code> — 真偽値フラグ</li>
          <li><code className="text-cyan-300">flag.Parse()</code> — フラグの解析実行</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なフラグ定義</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">flag.String</code>や<code className="text-cyan-300">flag.Int</code>はポインタを返します。
          値を取得するには<code className="text-cyan-300">*</code>で間接参照します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "flag"
    "fmt"
)

func main() {
    // フラグの定義（ポインタが返る）
    name := flag.String("name", "World", "挨拶する相手")
    age := flag.Int("age", 0, "年齢")
    verbose := flag.Bool("verbose", false, "詳細出力")

    // フラグの解析
    flag.Parse()

    fmt.Printf("名前: %s\\n", *name)
    fmt.Printf("年齢: %d\\n", *age)
    fmt.Printf("詳細モード: %t\\n", *verbose)
}`}
          expectedOutput={`名前: World
年齢: 0
詳細モード: false`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">flag.XxxVarによる変数への直接バインド</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">flag.StringVar</code>を使うと、既存の変数にフラグの値を直接バインドできます。
          ポインタの間接参照が不要になります。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "flag"
    "fmt"
)

func main() {
    var host string
    var port int
    var debug bool

    // 変数に直接バインド
    flag.StringVar(&host, "host", "localhost", "サーバーホスト")
    flag.IntVar(&port, "port", 8080, "ポート番号")
    flag.BoolVar(&debug, "debug", false, "デバッグモード")

    flag.Parse()

    fmt.Printf("サーバー: %s:%d\\n", host, port)
    fmt.Printf("デバッグ: %t\\n", debug)

    // 未解析の引数
    fmt.Printf("残りの引数: %v\\n", flag.Args())
}`}
          expectedOutput={`サーバー: localhost:8080
デバッグ: false
残りの引数: []`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">フラグのカスタム使い方メッセージ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">flag.Usage</code>をカスタマイズして、独自のヘルプメッセージを表示できます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "flag"
    "fmt"
    "os"
)

func main() {
    // カスタムUsage関数
    flag.Usage = func() {
        fmt.Fprintf(os.Stderr, "使い方: myapp [オプション]\\n\\nオプション:\\n")
        flag.PrintDefaults()
    }

    format := flag.String("format", "text", "出力形式(text/json/csv)")
    output := flag.String("output", "", "出力ファイル")
    flag.Parse()

    fmt.Printf("出力形式: %s\\n", *format)
    if *output == "" {
        fmt.Println("出力先: 標準出力")
    } else {
        fmt.Printf("出力先: %s\\n", *output)
    }
}`}
          expectedOutput={`出力形式: text
出力先: 標準出力`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="cli" lessonId="flag" />
      </div>
      <LessonNav lessons={lessons} currentId="flag" basePath="/learn/cli" />
    </div>
  );
}

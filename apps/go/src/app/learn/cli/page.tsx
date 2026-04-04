import { GoEditor } from "@/components/go-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("cli");

const quizQuestions: QuizQuestion[] = [
  {
    question: "flagパッケージでコマンドラインフラグを解析するために呼ぶ関数は？",
    options: ["flag.Read()", "flag.Parse()", "flag.Get()", "flag.Init()"],
    answer: 1,
    explanation: "flag.Parse() を呼ぶことで、定義したフラグがコマンドライン引数から解析されます。",
  },
  {
    question: "os.Argsの最初の要素（インデックス0）は何ですか？",
    options: ["最初の引数", "プログラム名", "空文字列", "引数の数"],
    answer: 1,
    explanation: "os.Args[0] は実行されたプログラム自身のパス（名前）です。引数は os.Args[1] 以降に格納されます。",
  },
  {
    question: "os.Exit(1) を呼んだ場合、defer文は実行されますか？",
    options: ["実行される", "実行されない", "条件による", "panicが発生する"],
    answer: 1,
    explanation: "os.Exit はプログラムを即座に終了するため、defer文は実行されません。",
  },
  {
    question: "標準入力から1行ずつ読み取るのに使うパッケージの組み合わせは？",
    options: ["io + os", "bufio + os", "fmt + io", "strings + os"],
    answer: 1,
    explanation: "bufio.NewScanner(os.Stdin) で標準入力から1行ずつ読み取ることができます。",
  },
];

export default function CliPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">CLIアプリ</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Goでコマンドラインアプリケーションを構築する方法を学びます。flagパッケージによるフラグ解析、
          os.Argsによる引数処理、Cobraフレームワーク、標準入出力の操作、終了コードの扱いをカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="cli" totalLessons={5} color="teal" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/cli" color="teal" categoryId="cli" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">CLIツールの基本</h2>
        <p className="text-gray-400 mb-4">
          GoはCLIツール開発に最適です。<code className="text-cyan-300">flag</code>パッケージで簡単にコマンドラインフラグを処理できます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "flag"
    "fmt"
)

func main() {
    name := flag.String("name", "World", "挨拶する相手の名前")
    count := flag.Int("count", 1, "挨拶する回数")
    flag.Parse()

    for i := 0; i < *count; i++ {
        fmt.Printf("Hello, %s!\\n", *name)
    }
}`}
          expectedOutput={`Hello, World!`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">標準入力の読み取り</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">bufio.Scanner</code>で標準入力から対話的にデータを読み取れます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "strings"
)

func main() {
    // 実際のCLIではbufio.NewScanner(os.Stdin)を使います
    inputs := []string{"Go", "CLI", "App"}
    for _, input := range inputs {
        fmt.Printf("入力: %s -> 大文字: %s\\n", input, strings.ToUpper(input))
    }
}`}
          expectedOutput={`入力: Go -> 大文字: GO
入力: CLI -> 大文字: CLI
入力: App -> 大文字: APP`}
        />
      </section>
      <Quiz questions={quizQuestions} color="teal" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("cli");

export default function StdinStdoutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">CLIアプリ レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">標準入出力</h1>
        <p className="text-gray-400">bufio.Scannerとos.Stdinを使ったCLI操作を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">標準入出力の基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">os.Stdin</code>は標準入力、<code className="text-cyan-300">os.Stdout</code>は標準出力、
          <code className="text-cyan-300">os.Stderr</code>は標準エラー出力です。
          <code className="text-cyan-300">bufio.Scanner</code>を使うと行単位の読み取りが簡単です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">bufio.NewScanner(os.Stdin)</code> — 標準入力からスキャナ作成</li>
          <li><code className="text-cyan-300">scanner.Scan()</code> — 次の行を読み取り</li>
          <li><code className="text-cyan-300">scanner.Text()</code> — 読み取った文字列を取得</li>
          <li><code className="text-cyan-300">fmt.Fprintln(os.Stderr, ...)</code> — 標準エラーに出力</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">bufio.Scannerで行読み取り</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">bufio.Scanner</code>を使って文字列を1行ずつ処理する基本パターンです。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "bufio"
    "fmt"
    "strings"
)

func main() {
    // 実際のCLIでは os.Stdin を使いますが
    // ここでは strings.Reader でシミュレーション
    input := "Hello Go\\nこんにちは\\nGoodbye"
    reader := strings.NewReader(input)
    scanner := bufio.NewScanner(reader)

    lineNum := 1
    for scanner.Scan() {
        line := scanner.Text()
        fmt.Printf("%d: %s\\n", lineNum, line)
        lineNum++
    }

    if err := scanner.Err(); err != nil {
        fmt.Printf("読み取りエラー: %v\\n", err)
    }
}`}
          expectedOutput={`1: Hello Go
2: こんにちは
3: Goodbye`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">標準出力と標準エラーの使い分け</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">fmt.Fprintln</code>を使って出力先を明示的に指定します。
          正常なデータはstdout、メッセージやエラーはstderrに出力するのが慣例です。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "os"
    "strings"
)

func main() {
    // CLIツールの出力パターン
    data := []string{"Alice,30", "Bob,25", "Charlie,35"}

    // 進捗情報はstderrに出力（パイプ時にデータを汚さない）
    fmt.Fprintln(os.Stderr, "処理開始...")

    // データはstdoutに出力
    fmt.Println("名前,年齢")
    for _, line := range data {
        parts := strings.Split(line, ",")
        fmt.Fprintf(os.Stdout, "%s は %s 歳\\n", parts[0], parts[1])
    }

    fmt.Fprintln(os.Stderr, "処理完了")
}`}
          expectedOutput={`処理開始...
名前,年齢
Alice は 30 歳
Bob は 25 歳
Charlie は 35 歳
処理完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">対話型CLIの実装</h2>
        <p className="text-gray-400 mb-4">
          ユーザーからの入力を受けて応答する対話型CLIのパターンです。
          <code className="text-cyan-300">bufio.NewReader</code>でプロンプト付き入力も可能です。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "bufio"
    "fmt"
    "strings"
)

func processCommand(cmd string) string {
    switch strings.TrimSpace(strings.ToLower(cmd)) {
    case "hello":
        return "こんにちは！"
    case "time":
        return "現在の時刻: 12:00"
    case "help":
        return "コマンド: hello, time, help, quit"
    case "quit":
        return "終了します"
    default:
        return fmt.Sprintf("不明なコマンド: %s", cmd)
    }
}

func main() {
    // 対話型CLIのシミュレーション
    commands := "hello\\ntime\\nhelp\\nquit"
    scanner := bufio.NewScanner(strings.NewReader(commands))

    fmt.Println("対話型CLIへようこそ（quit で終了）")
    for scanner.Scan() {
        cmd := scanner.Text()
        fmt.Printf("> %s\\n", cmd)
        result := processCommand(cmd)
        fmt.Println(result)
        if strings.TrimSpace(cmd) == "quit" {
            break
        }
    }
}`}
          expectedOutput={`対話型CLIへようこそ（quit で終了）
> hello
こんにちは！
> time
現在の時刻: 12:00
> help
コマンド: hello, time, help, quit
> quit
終了します`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="cli" lessonId="stdin-stdout" />
      </div>
      <LessonNav lessons={lessons} currentId="stdin-stdout" basePath="/learn/cli" />
    </div>
  );
}

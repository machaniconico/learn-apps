import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("cli");

export default function ExitPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">CLIアプリ レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">終了コード</h1>
        <p className="text-gray-400">os.Exitとプログラムの終了コードの扱いを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">os.Exitの基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">os.Exit(code)</code>はプログラムを即座に終了します。
          終了コード0は成功、1以上はエラーを意味します。
          重要な注意点として、<code className="text-cyan-300">defer</code>文は実行されません。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">os.Exit(0)</code> — 正常終了</li>
          <li><code className="text-cyan-300">os.Exit(1)</code> — 一般的なエラー</li>
          <li><code className="text-cyan-300">os.Exit(2)</code> — 使い方の誤り</li>
          <li>deferは<strong>実行されない</strong>ので注意</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">終了コードの慣例</h2>
        <p className="text-gray-400 mb-4">
          Unixの慣例に従い、終了コードはプログラムの実行結果を表します。
          シェルスクリプトや他のプログラムがこの値を参照します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // 終了コードの慣例
    exitCodes := map[int]string{
        0: "正常終了（成功）",
        1: "一般的なエラー",
        2: "コマンドの使い方が間違っている",
        126: "コマンドが実行できない（権限なし）",
        127: "コマンドが見つからない",
        128: "不正な終了コード引数",
        130: "Ctrl+Cで中断",
    }

    for code, desc := range exitCodes {
        fmt.Printf("コード %3d: %s\\n", code, desc)
    }
}`}
          expectedOutput={`コード   0: 正常終了（成功）
コード   1: 一般的なエラー
コード   2: コマンドの使い方が間違っている
コード 126: コマンドが実行できない（権限なし）
コード 127: コマンドが見つからない
コード 128: 不正な終了コード引数
コード 130: Ctrl+Cで中断`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">deferが実行されない問題</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">os.Exit</code>を呼ぶと<code className="text-cyan-300">defer</code>は実行されません。
          リソースの解放が必要な場合は、別の関数に分離するパターンを使います。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// os.Exitを使う場合のパターン
func run() int {
    // deferは run() の終了時に実行される
    fmt.Println("リソースを確保")
    defer fmt.Println("リソースを解放（deferで実行）")

    err := doWork()
    if err != nil {
        fmt.Printf("エラー: %v\\n", err)
        return 1
    }

    fmt.Println("処理成功")
    return 0
}

func doWork() error {
    fmt.Println("処理実行中...")
    return nil // エラーなし
}

func main() {
    // main では run() の戻り値を使って終了
    // 実際のコードでは: os.Exit(run())
    code := run()
    fmt.Printf("終了コード: %d\\n", code)
}`}
          expectedOutput={`リソースを確保
処理実行中...
処理成功
リソースを解放（deferで実行）
終了コード: 0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">CLIアプリの典型的な終了パターン</h2>
        <p className="text-gray-400 mb-4">
          実践的なCLIアプリでの適切なエラーハンドリングと終了処理のパターンです。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "os"
)

type AppError struct {
    Code    int
    Message string
}

func (e *AppError) Error() string {
    return e.Message
}

func validateArgs(args []string) *AppError {
    if len(args) < 2 {
        return &AppError{Code: 2, Message: "引数が不足しています"}
    }
    return nil
}

func process(filename string) *AppError {
    if filename == "" {
        return &AppError{Code: 1, Message: "ファイル名が空です"}
    }
    fmt.Printf("ファイル処理: %s\\n", filename)
    return nil
}

func run(args []string) int {
    if err := validateArgs(args); err != nil {
        fmt.Fprintf(os.Stderr, "使い方エラー: %s\\n", err.Message)
        return err.Code
    }

    if err := process(args[1]); err != nil {
        fmt.Fprintf(os.Stderr, "処理エラー: %s\\n", err.Message)
        return err.Code
    }

    fmt.Println("正常完了")
    return 0
}

func main() {
    // テスト1: 正常ケース
    code := run([]string{"app", "data.txt"})
    fmt.Printf("終了コード: %d\\n\\n", code)

    // テスト2: 引数不足
    code = run([]string{"app"})
    fmt.Printf("終了コード: %d\\n", code)
}`}
          expectedOutput={`ファイル処理: data.txt
正常完了
終了コード: 0

使い方エラー: 引数が不足しています
終了コード: 2`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="cli" lessonId="exit" />
      </div>
      <LessonNav lessons={lessons} currentId="exit" basePath="/learn/cli" />
    </div>
  );
}

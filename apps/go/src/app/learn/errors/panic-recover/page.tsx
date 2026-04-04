import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("errors");

export default function PanicRecoverPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">エラー処理 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">panic・recover</h1>
        <p className="text-gray-400">panic()、recover()、deferを使ったパニック処理を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">panicとrecoverとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">panic</code> はプログラムの実行を停止する致命的エラーを発生させます。
          <code className="text-cyan-300">recover</code> は <code className="text-cyan-300">defer</code> 関数内でのみ呼べ、パニックを捕捉して回復します。
          通常のエラーには <code className="text-cyan-300">error</code> を使い、panicは回復不能な状況でのみ使うのがGoの慣習です。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">deferの基本</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fmt.Println("開始")

    // deferは関数の終了時に実行される（LIFO順）
    defer fmt.Println("defer 1")
    defer fmt.Println("defer 2")
    defer fmt.Println("defer 3")

    fmt.Println("処理中")
    fmt.Println("終了")
}`}
          expectedOutput={`開始
処理中
終了
defer 3
defer 2
defer 1`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">panicとrecoverの使い方</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func safeDiv(a, b int) (result int, err error) {
    // deferでpanicを捕捉
    defer func() {
        if r := recover(); r != nil {
            err = fmt.Errorf("パニックを回復: %v", r)
        }
    }()

    return a / b, nil  // b=0だとパニック
}

func main() {
    // 正常
    result, err := safeDiv(10, 2)
    if err != nil {
        fmt.Println("エラー:", err)
    } else {
        fmt.Println("10 / 2 =", result)
    }

    // パニックを回復
    result, err = safeDiv(10, 0)
    if err != nil {
        fmt.Println("エラー:", err)
    } else {
        fmt.Println("10 / 0 =", result)
    }

    // プログラムは続行される
    fmt.Println("プログラムは正常に続行しています")
}`}
          expectedOutput={`10 / 2 = 5
エラー: パニックを回復: runtime error: integer divide by zero
プログラムは正常に続行しています`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">HTTPサーバーでのrecover</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

// HTTPハンドラのシミュレーション
func handleRequest(path string) {
    // recoverでパニックを安全に処理
    defer func() {
        if r := recover(); r != nil {
            fmt.Printf("[RECOVERED] %s: %v\\n", path, r)
        }
    }()

    switch path {
    case "/ok":
        fmt.Printf("[200] %s: 成功\\n", path)
    case "/error":
        panic("内部エラーが発生しました")
    case "/nil":
        var s *string
        fmt.Println(*s)  // nilポインタでパニック
    }
}

func main() {
    paths := []string{"/ok", "/error", "/nil", "/ok"}

    for _, path := range paths {
        handleRequest(path)
    }
    fmt.Println("サーバーは稼働中です")
}`}
          expectedOutput={`[200] /ok: 成功
[RECOVERED] /error: 内部エラーが発生しました
[RECOVERED] /nil: runtime error: invalid memory address or nil pointer dereference
[200] /ok: 成功
サーバーは稼働中です`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="errors" lessonId="panic-recover" />
      </div>
      <LessonNav lessons={lessons} currentId="panic-recover" basePath="/learn/errors" />
    </div>
  );
}

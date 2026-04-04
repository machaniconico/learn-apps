import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("channels");

export default function CloseRangePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">チャネル レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">close・range</h1>
        <p className="text-gray-400">close(ch)でチャネルを閉じ、for range chで全データを受信するパターンを学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">チャネルのクローズ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">close(ch)</code> でチャネルを閉じると、
          受信側にこれ以上データがないことを伝えます。閉じたチャネルに送信するとパニックが発生します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    ch := make(chan int, 5)

    // データを送信して閉じる
    for i := 1; i <= 5; i++ {
        ch <- i
    }
    close(ch)

    // 閉じたチャネルから受信（ok パターン）
    for {
        val, ok := <-ch
        if !ok {
            fmt.Println("チャネルが閉じられました")
            break
        }
        fmt.Printf("受信: %d (ok=%t)\\n", val, ok)
    }
}`}
          expectedOutput={`受信: 1 (ok=true)
受信: 2 (ok=true)
受信: 3 (ok=true)
受信: 4 (ok=true)
受信: 5 (ok=true)
チャネルが閉じられました`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">for rangeでチャネルを走査</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">for val := range ch</code> は
          チャネルが閉じられるまで自動的に受信を続けます。okチェックが不要でシンプルです。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func fibonacci(n int, ch chan<- int) {
    a, b := 0, 1
    for i := 0; i < n; i++ {
        ch <- a
        a, b = b, a+b
    }
    close(ch) // rangeが終了するために必要
}

func main() {
    ch := make(chan int)
    go fibonacci(8, ch)

    fmt.Println("フィボナッチ数列:")
    for val := range ch {
        fmt.Printf("%d ", val)
    }
    fmt.Println()
}`}
          expectedOutput={`フィボナッチ数列:
0 1 1 2 3 5 8 13 `}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">クローズの注意点</h2>
        <p className="text-gray-400 mb-4">
          チャネルのクローズに関する重要なルールを確認しましょう。
          送信側がクローズするのが原則です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fmt.Println("=== チャネルクローズのルール ===")
    fmt.Println()

    // ルール1: 送信側がクローズする
    ch := make(chan string, 2)
    ch <- "データ1"
    ch <- "データ2"
    close(ch)

    // ルール2: 閉じたチャネルからはゼロ値が返る
    val1, ok1 := <-ch
    fmt.Printf("受信: %q, ok=%t\\n", val1, ok1)
    val2, ok2 := <-ch
    fmt.Printf("受信: %q, ok=%t\\n", val2, ok2)
    val3, ok3 := <-ch
    fmt.Printf("受信: %q, ok=%t\\n", val3, ok3) // ゼロ値

    fmt.Println()
    fmt.Println("■ 注意:")
    fmt.Println("  - 閉じたチャネルに送信 → panic")
    fmt.Println("  - 同じチャネルを2回閉じる → panic")
    fmt.Println("  - nilチャネルの送受信 → 永久ブロック")
}`}
          expectedOutput={`=== チャネルクローズのルール ===

受信: "データ1", ok=true
受信: "データ2", ok=true
受信: "", ok=false

■ 注意:
  - 閉じたチャネルに送信 → panic
  - 同じチャネルを2回閉じる → panic
  - nilチャネルの送受信 → 永久ブロック`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="channels" lessonId="close-range" />
      </div>
      <LessonNav lessons={lessons} currentId="close-range" basePath="/learn/channels" />
    </div>
  );
}

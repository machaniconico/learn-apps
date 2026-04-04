import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("channels");

export default function TimeoutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">チャネル レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">タイムアウト</h1>
        <p className="text-gray-400">time.Afterやtime.NewTimerを使って、チャネル操作にタイムアウトを設定する方法を学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">time.Afterによるタイムアウト</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">time.After(d)</code> は指定した時間後に値を送信するチャネルを返します。
          selectと組み合わせることでタイムアウト処理を実現できます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "time"
)

func slowOperation() chan string {
    ch := make(chan string)
    go func() {
        time.Sleep(50 * time.Millisecond)
        ch <- "処理完了"
    }()
    return ch
}

func main() {
    // タイムアウト：200ms（成功するケース）
    select {
    case result := <-slowOperation():
        fmt.Println("成功:", result)
    case <-time.After(200 * time.Millisecond):
        fmt.Println("タイムアウト！")
    }

    // タイムアウト：10ms（タイムアウトするケース）
    select {
    case result := <-slowOperation():
        fmt.Println("成功:", result)
    case <-time.After(10 * time.Millisecond):
        fmt.Println("タイムアウト！")
    }
}`}
          expectedOutput={`成功: 処理完了
タイムアウト！`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">time.NewTimerの活用</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">time.NewTimer</code> は
          <code className="text-cyan-300">Stop()</code> で停止でき、
          リソースのクリーンアップが可能です。長時間のタイムアウトにはこちらが推奨されます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "time"
)

func main() {
    timer := time.NewTimer(100 * time.Millisecond)
    defer timer.Stop() // リソースをクリーンアップ

    ch := make(chan string)
    go func() {
        time.Sleep(50 * time.Millisecond)
        ch <- "データ到着"
    }()

    select {
    case data := <-ch:
        // タイマーが不要になったので停止
        if !timer.Stop() {
            <-timer.C
        }
        fmt.Println("受信:", data)
    case <-timer.C:
        fmt.Println("タイムアウト")
    }
}`}
          expectedOutput={`受信: データ到着`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">定期的なタイムアウトチェック</h2>
        <p className="text-gray-400 mb-4">
          ループ内でタイムアウトを設定し、一定時間データが来なければ処理を中断するパターンです。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "time"
)

func main() {
    data := make(chan int)

    // 3つのデータを徐々に送信
    go func() {
        for i := 1; i <= 3; i++ {
            time.Sleep(30 * time.Millisecond)
            data <- i
        }
        // 以降は送信しない → タイムアウトで終了
    }()

    for {
        select {
        case val := <-data:
            fmt.Printf("受信: %d\\n", val)
        case <-time.After(100 * time.Millisecond):
            fmt.Println("100ms間データなし - 終了")
            return
        }
    }
}`}
          expectedOutput={`受信: 1
受信: 2
受信: 3
100ms間データなし - 終了`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="channels" lessonId="timeout" />
      </div>
      <LessonNav lessons={lessons} currentId="timeout" basePath="/learn/channels" />
    </div>
  );
}

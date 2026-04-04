import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("channels");

export default function SelectPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">チャネル レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">select文</h1>
        <p className="text-gray-400">select文で複数のチャネル操作を同時に待ち受ける方法を学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">selectの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">select</code> はswitch文に似ていますが、
          チャネル操作を対象とします。準備ができたケースが実行され、
          複数のケースが準備できている場合はランダムに1つが選ばれます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "time"
)

func main() {
    ch1 := make(chan string)
    ch2 := make(chan string)

    go func() {
        time.Sleep(10 * time.Millisecond)
        ch1 <- "チャネル1から"
    }()

    go func() {
        time.Sleep(20 * time.Millisecond)
        ch2 <- "チャネル2から"
    }()

    // 2回selectして両方受信
    for i := 0; i < 2; i++ {
        select {
        case msg := <-ch1:
            fmt.Println("受信:", msg)
        case msg := <-ch2:
            fmt.Println("受信:", msg)
        }
    }
}`}
          expectedOutput={`受信: チャネル1から
受信: チャネル2から`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">defaultケース</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">default</code> ケースを使うと、
          どのチャネル操作も即座に実行できない場合に処理を行えます。
          ノンブロッキングなチャネル操作に使えます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    ch := make(chan string, 1)

    // ノンブロッキング受信
    select {
    case msg := <-ch:
        fmt.Println("受信:", msg)
    default:
        fmt.Println("データなし（ノンブロッキング）")
    }

    // データを送信
    ch <- "テストデータ"

    // 今度はデータがある
    select {
    case msg := <-ch:
        fmt.Println("受信:", msg)
    default:
        fmt.Println("データなし")
    }
}`}
          expectedOutput={`データなし（ノンブロッキング）
受信: テストデータ`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">selectでのループ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">for-select</code> パターンは、
          複数のチャネルからイベントを継続的に受信する一般的なパターンです。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    data := make(chan int)
    done := make(chan bool)

    go func() {
        for i := 1; i <= 5; i++ {
            data <- i
        }
        done <- true
    }()

    running := true
    for running {
        select {
        case val := <-data:
            fmt.Printf("データ受信: %d\\n", val)
        case <-done:
            fmt.Println("完了シグナル受信")
            running = false
        }
    }
    fmt.Println("ループ終了")
}`}
          expectedOutput={`データ受信: 1
データ受信: 2
データ受信: 3
データ受信: 4
データ受信: 5
完了シグナル受信
ループ終了`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="channels" lessonId="select" />
      </div>
      <LessonNav lessons={lessons} currentId="select" basePath="/learn/channels" />
    </div>
  );
}

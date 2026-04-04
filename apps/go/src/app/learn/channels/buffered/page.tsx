import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("channels");

export default function BufferedPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">チャネル レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">バッファ付きチャネル</h1>
        <p className="text-gray-400">make(chan T, N)でバッファサイズを指定し、非同期的な送信ができるチャネルを学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">バッファ付きチャネルの作成</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">make(chan T, N)</code> で容量Nのバッファ付きチャネルを作成します。
          バッファが満杯になるまで送信はブロックしません。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // 容量3のバッファ付きチャネル
    ch := make(chan string, 3)

    // バッファに余裕があるので、ゴルーチンなしで送信可能
    ch <- "メッセージ1"
    ch <- "メッセージ2"
    ch <- "メッセージ3"

    fmt.Println(<-ch)
    fmt.Println(<-ch)
    fmt.Println(<-ch)
}`}
          expectedOutput={`メッセージ1
メッセージ2
メッセージ3`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">容量と長さ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">cap(ch)</code> でバッファ容量を、
          <code className="text-cyan-300">len(ch)</code> で現在バッファにある要素数を取得できます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    ch := make(chan int, 5)

    fmt.Printf("容量: %d, 長さ: %d\\n", cap(ch), len(ch))

    ch <- 10
    ch <- 20
    ch <- 30

    fmt.Printf("3件送信後 - 容量: %d, 長さ: %d\\n", cap(ch), len(ch))

    <-ch // 1件受信
    fmt.Printf("1件受信後 - 容量: %d, 長さ: %d\\n", cap(ch), len(ch))
}`}
          expectedOutput={`容量: 5, 長さ: 0
3件送信後 - 容量: 5, 長さ: 3
1件受信後 - 容量: 5, 長さ: 2`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ワーカープールでの活用</h2>
        <p className="text-gray-400 mb-4">
          バッファ付きチャネルはジョブキューとして使えます。
          ワーカーが処理を並行して行い、結果を別のチャネルに送ります。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sync"
)

func worker(id int, jobs <-chan int, results chan<- string, wg *sync.WaitGroup) {
    defer wg.Done()
    for job := range jobs {
        result := fmt.Sprintf("ワーカー%d: ジョブ%dを処理", id, job)
        results <- result
    }
}

func main() {
    jobs := make(chan int, 5)
    results := make(chan string, 5)
    var wg sync.WaitGroup

    // 3つのワーカーを起動
    for w := 1; w <= 3; w++ {
        wg.Add(1)
        go worker(w, jobs, results, &wg)
    }

    // 5つのジョブを送信
    for j := 1; j <= 5; j++ {
        jobs <- j
    }
    close(jobs)

    // ワーカー完了後に結果チャネルを閉じる
    go func() {
        wg.Wait()
        close(results)
    }()

    for result := range results {
        fmt.Println(result)
    }
}`}
          expectedOutput={`ワーカー1: ジョブ1を処理
ワーカー2: ジョブ2を処理
ワーカー3: ジョブ3を処理
ワーカー1: ジョブ4を処理
ワーカー2: ジョブ5を処理`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="channels" lessonId="buffered" />
      </div>
      <LessonNav lessons={lessons} currentId="buffered" basePath="/learn/channels" />
    </div>
  );
}

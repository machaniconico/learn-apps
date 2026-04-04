import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("channels");

export default function PatternsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">チャネル レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">チャネルパターン</h1>
        <p className="text-gray-400">fan-out、fan-in、パイプラインなど、実践的なチャネルの活用パターンを学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">パイプラインパターン</h2>
        <p className="text-gray-400 mb-4">
          各ステージがチャネルで繋がり、データが流れるようにパイプラインを構成します。
          各ステージは独立したゴルーチンで実行されます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// ステージ1: 数値を生成
func gen(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        for _, n := range nums {
            out <- n
        }
        close(out)
    }()
    return out
}

// ステージ2: 2乗する
func sq(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        for n := range in {
            out <- n * n
        }
        close(out)
    }()
    return out
}

func main() {
    // パイプライン: gen → sq → 出力
    for val := range sq(gen(2, 3, 4, 5)) {
        fmt.Println(val)
    }
}`}
          expectedOutput={`4
9
16
25`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">fan-out / fan-in</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">fan-out</code> は1つの入力を複数のワーカーに分散し、
          <code className="text-cyan-300">fan-in</code> は複数の結果を1つのチャネルに集約します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sync"
)

// fan-in: 複数のチャネルを1つに統合
func merge(channels ...<-chan string) <-chan string {
    out := make(chan string)
    var wg sync.WaitGroup

    for _, ch := range channels {
        wg.Add(1)
        go func(c <-chan string) {
            defer wg.Done()
            for val := range c {
                out <- val
            }
        }(ch)
    }

    go func() {
        wg.Wait()
        close(out)
    }()
    return out
}

func worker(id int, jobs <-chan int) <-chan string {
    out := make(chan string)
    go func() {
        for job := range jobs {
            out <- fmt.Sprintf("ワーカー%d: ジョブ%d完了", id, job)
        }
        close(out)
    }()
    return out
}

func main() {
    jobs := make(chan int, 6)
    for i := 1; i <= 6; i++ {
        jobs <- i
    }
    close(jobs)

    // fan-out: 3つのワーカーにジョブチャネルを共有
    w1 := worker(1, jobs)
    w2 := worker(2, jobs)
    w3 := worker(3, jobs)

    // fan-in: 結果を統合
    for result := range merge(w1, w2, w3) {
        fmt.Println(result)
    }
}`}
          expectedOutput={`ワーカー1: ジョブ1完了
ワーカー1: ジョブ2完了
ワーカー2: ジョブ3完了
ワーカー2: ジョブ4完了
ワーカー3: ジョブ5完了
ワーカー3: ジョブ6完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">doneチャネルによるキャンセル</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">done</code> チャネルを閉じることで、
          関連するすべてのゴルーチンにキャンセルを通知できます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func generator(done <-chan struct{}) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        n := 0
        for {
            select {
            case out <- n:
                n++
            case <-done:
                fmt.Println("ジェネレータ: キャンセル受信")
                return
            }
        }
    }()
    return out
}

func main() {
    done := make(chan struct{})
    gen := generator(done)

    // 5つだけ取得
    for i := 0; i < 5; i++ {
        fmt.Printf("受信: %d\\n", <-gen)
    }

    // キャンセル
    close(done)
    fmt.Println("メイン: キャンセル送信")
}`}
          expectedOutput={`受信: 0
受信: 1
受信: 2
受信: 3
受信: 4
メイン: キャンセル送信
ジェネレータ: キャンセル受信`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="channels" lessonId="patterns" />
      </div>
      <LessonNav lessons={lessons} currentId="patterns" basePath="/learn/channels" />
    </div>
  );
}

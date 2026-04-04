import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("concurrency");

export default function WorkerPoolPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">並行パターン レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ワーカープール</h1>
        <p className="text-gray-400">N個のワーカーゴルーチンでジョブチャネルからタスクを消費するパターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ワーカープールパターン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ワーカープールは事前に一定数の<code className="text-cyan-300">ゴルーチン</code>を起動し、
          <code className="text-cyan-300">ジョブチャネル</code>からタスクを受け取って処理するパターンです。
          ゴルーチンの数を制限することでリソースの使い過ぎを防ぎます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>ジョブチャネル — ワーカーに渡すタスクのキュー</li>
          <li>結果チャネル — ワーカーからの処理結果</li>
          <li><code className="text-cyan-300">sync.WaitGroup</code> — 全ワーカーの完了待ち</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なワーカープール</h2>
        <p className="text-gray-400 mb-4">
          3つのワーカーで5つのジョブを処理する基本的なワーカープールの実装です。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sync"
)

func worker(id int, jobs <-chan int, results chan<- string, wg *sync.WaitGroup) {
    defer wg.Done()
    for j := range jobs {
        result := fmt.Sprintf("ワーカー%d がジョブ%d を処理 -> 結果: %d", id, j, j*j)
        results <- result
    }
}

func main() {
    const numWorkers = 3
    const numJobs = 5

    jobs := make(chan int, numJobs)
    results := make(chan string, numJobs)
    var wg sync.WaitGroup

    // ワーカーを起動
    for w := 1; w <= numWorkers; w++ {
        wg.Add(1)
        go worker(w, jobs, results, &wg)
    }

    // ジョブを送信
    for j := 1; j <= numJobs; j++ {
        jobs <- j
    }
    close(jobs)

    // ワーカー完了を待って結果チャネルを閉じる
    go func() {
        wg.Wait()
        close(results)
    }()

    // 結果を収集
    for r := range results {
        fmt.Println(r)
    }
    fmt.Println("全ジョブ完了")
}`}
          expectedOutput={`ワーカー1 がジョブ1 を処理 -> 結果: 1
ワーカー2 がジョブ2 を処理 -> 結果: 4
ワーカー3 がジョブ3 を処理 -> 結果: 9
ワーカー1 がジョブ4 を処理 -> 結果: 16
ワーカー2 がジョブ5 を処理 -> 結果: 25
全ジョブ完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">構造化されたワーカープール</h2>
        <p className="text-gray-400 mb-4">
          ジョブと結果を構造体で定義し、より実践的なワーカープールを構築します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sync"
)

type Job struct {
    ID    int
    Input string
}

type Result struct {
    JobID  int
    Output string
}

func process(id int, jobs <-chan Job, results chan<- Result, wg *sync.WaitGroup) {
    defer wg.Done()
    for job := range jobs {
        output := fmt.Sprintf("[W%d] %s を処理完了", id, job.Input)
        results <- Result{JobID: job.ID, Output: output}
    }
}

func main() {
    jobs := make(chan Job, 4)
    results := make(chan Result, 4)
    var wg sync.WaitGroup

    // 2つのワーカー
    for w := 1; w <= 2; w++ {
        wg.Add(1)
        go process(w, jobs, results, &wg)
    }

    // ジョブ投入
    inputs := []string{"データA", "データB", "データC", "データD"}
    for i, input := range inputs {
        jobs <- Job{ID: i + 1, Input: input}
    }
    close(jobs)

    go func() {
        wg.Wait()
        close(results)
    }()

    for r := range results {
        fmt.Printf("ジョブ%d: %s\\n", r.JobID, r.Output)
    }
}`}
          expectedOutput={`ジョブ1: [W1] データA を処理完了
ジョブ2: [W2] データB を処理完了
ジョブ3: [W1] データC を処理完了
ジョブ4: [W2] データD を処理完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">動的なワーカー数の調整</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">runtime.NumCPU()</code>を使ってCPUコア数に基づいたワーカー数を設定できます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "runtime"
    "sync"
)

func main() {
    numCPU := runtime.NumCPU()
    numWorkers := numCPU // CPUコア数に合わせる
    fmt.Printf("CPUコア数: %d\\n", numCPU)
    fmt.Printf("ワーカー数: %d\\n", numWorkers)

    jobs := make(chan int, 10)
    var wg sync.WaitGroup
    var mu sync.Mutex
    processed := 0

    for w := 0; w < numWorkers; w++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            for j := range jobs {
                _ = j * j // 処理
                mu.Lock()
                processed++
                mu.Unlock()
            }
        }(w)
    }

    for j := 0; j < 10; j++ {
        jobs <- j
    }
    close(jobs)
    wg.Wait()

    fmt.Printf("処理済みジョブ: %d\\n", processed)
}`}
          expectedOutput={`CPUコア数: 8
ワーカー数: 8
処理済みジョブ: 10`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="concurrency" lessonId="worker-pool" />
      </div>
      <LessonNav lessons={lessons} currentId="worker-pool" basePath="/learn/concurrency" />
    </div>
  );
}

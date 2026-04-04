import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("concurrency");

export default function SemaphorePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">並行パターン レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">セマフォ</h1>
        <p className="text-gray-400">チャネルベースのセマフォで同時実行数を制限するパターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">セマフォパターン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">セマフォ</code>は同時にアクセスできるリソースの数を制限するための仕組みです。
          Goではバッファ付きチャネルを使って自然にセマフォを実装できます。
          チャネルのバッファサイズが同時実行数の上限になります。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">チャネルベースのセマフォ</h2>
        <p className="text-gray-400 mb-4">
          バッファ付きチャネルに送信してからゴルーチンを実行し、完了時に受信することでセマフォを実現します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sync"
)

func main() {
    // 同時に最大2つまで実行を許可するセマフォ
    semaphore := make(chan struct{}, 2)
    var wg sync.WaitGroup

    tasks := []string{"タスクA", "タスクB", "タスクC", "タスクD", "タスクE"}

    for _, task := range tasks {
        wg.Add(1)
        go func(name string) {
            defer wg.Done()

            // セマフォ取得（バッファが一杯ならブロック）
            semaphore <- struct{}{}
            fmt.Printf("%s: 実行開始\\n", name)

            // 処理（シミュレーション）
            // time.Sleep(100 * time.Millisecond)

            fmt.Printf("%s: 実行完了\\n", name)
            // セマフォ解放
            <-semaphore
        }(task)
    }

    wg.Wait()
    fmt.Println("全タスク完了")
}`}
          expectedOutput={`タスクA: 実行開始
タスクA: 実行完了
タスクB: 実行開始
タスクB: 実行完了
タスクC: 実行開始
タスクC: 実行完了
タスクD: 実行開始
タスクD: 実行完了
タスクE: 実行開始
タスクE: 実行完了
全タスク完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">セマフォ構造体の実装</h2>
        <p className="text-gray-400 mb-4">
          再利用可能な<code className="text-cyan-300">Semaphore</code>構造体を作成します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Semaphore struct {
    ch chan struct{}
}

func NewSemaphore(maxConcurrency int) *Semaphore {
    return &Semaphore{
        ch: make(chan struct{}, maxConcurrency),
    }
}

func (s *Semaphore) Acquire() {
    s.ch <- struct{}{}
}

func (s *Semaphore) Release() {
    <-s.ch
}

func (s *Semaphore) TryAcquire() bool {
    select {
    case s.ch <- struct{}{}:
        return true
    default:
        return false
    }
}

func (s *Semaphore) Available() int {
    return cap(s.ch) - len(s.ch)
}

func main() {
    sem := NewSemaphore(3) // 最大3並行

    fmt.Printf("空きスロット: %d\\n", sem.Available())

    sem.Acquire()
    fmt.Printf("1つ取得後の空き: %d\\n", sem.Available())

    sem.Acquire()
    fmt.Printf("2つ取得後の空き: %d\\n", sem.Available())

    sem.Acquire()
    fmt.Printf("3つ取得後の空き: %d\\n", sem.Available())

    // 4つ目はTryAcquireで試行
    if !sem.TryAcquire() {
        fmt.Println("4つ目: 取得できず（上限に達した）")
    }

    sem.Release()
    fmt.Printf("1つ解放後の空き: %d\\n", sem.Available())
}`}
          expectedOutput={`空きスロット: 3
1つ取得後の空き: 2
2つ取得後の空き: 1
3つ取得後の空き: 0
4つ目: 取得できず（上限に達した）
1つ解放後の空き: 1`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">重み付きセマフォ</h2>
        <p className="text-gray-400 mb-4">
          タスクの重さに応じて複数のトークンを消費する<code className="text-cyan-300">重み付きセマフォ</code>です。
          <code className="text-cyan-300">golang.org/x/sync/semaphore</code>パッケージでも同様の機能があります。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type WeightedSemaphore struct {
    ch chan struct{}
}

func NewWeightedSemaphore(capacity int) *WeightedSemaphore {
    return &WeightedSemaphore{ch: make(chan struct{}, capacity)}
}

func (ws *WeightedSemaphore) Acquire(weight int) {
    for i := 0; i < weight; i++ {
        ws.ch <- struct{}{}
    }
}

func (ws *WeightedSemaphore) Release(weight int) {
    for i := 0; i < weight; i++ {
        <-ws.ch
    }
}

func (ws *WeightedSemaphore) Available() int {
    return cap(ws.ch) - len(ws.ch)
}

func main() {
    sem := NewWeightedSemaphore(10) // 合計キャパシティ10

    tasks := []struct {
        name   string
        weight int
    }{
        {"軽いタスク", 1},
        {"通常タスク", 3},
        {"重いタスク", 5},
    }

    for _, task := range tasks {
        fmt.Printf("空き: %d -> %s (重み%d) を取得...",
            sem.Available(), task.name, task.weight)
        sem.Acquire(task.weight)
        fmt.Printf(" 残り: %d\\n", sem.Available())
    }

    fmt.Printf("\\n使用中: %d / %d\\n", cap(sem.ch)-sem.Available(), cap(sem.ch))

    // 解放
    sem.Release(3)
    fmt.Printf("通常タスク解放後の空き: %d\\n", sem.Available())
}`}
          expectedOutput={`空き: 10 -> 軽いタスク (重み1) を取得... 残り: 9
空き: 9 -> 通常タスク (重み3) を取得... 残り: 6
空き: 6 -> 重いタスク (重み5) を取得... 残り: 1

使用中: 9 / 10
通常タスク解放後の空き: 4`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="concurrency" lessonId="semaphore" />
      </div>
      <LessonNav lessons={lessons} currentId="semaphore" basePath="/learn/concurrency" />
    </div>
  );
}

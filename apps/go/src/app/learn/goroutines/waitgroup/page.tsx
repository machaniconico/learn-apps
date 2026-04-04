import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("goroutines");

export default function WaitGroupPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">ゴルーチン レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">WaitGroup</h1>
        <p className="text-gray-400">sync.WaitGroupを使って、複数のゴルーチンの完了を確実に待つ方法を学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">WaitGroupの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">sync.WaitGroup</code> は内部カウンタを持ちます。
          <code className="text-cyan-300">Add(n)</code> でカウンタを増やし、
          <code className="text-cyan-300">Done()</code> で1減らし、
          <code className="text-cyan-300">Wait()</code> でカウンタが0になるまでブロックします。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sync"
)

func worker(id int, wg *sync.WaitGroup) {
    defer wg.Done() // 関数終了時にカウンタを1減らす
    fmt.Printf("ワーカー %d: 処理中...\\n", id)
    fmt.Printf("ワーカー %d: 完了\\n", id)
}

func main() {
    var wg sync.WaitGroup

    for i := 1; i <= 3; i++ {
        wg.Add(1) // カウンタを1増やす
        go worker(i, &wg)
    }

    wg.Wait() // カウンタが0になるまで待つ
    fmt.Println("すべてのワーカーが完了しました")
}`}
          expectedOutput={`ワーカー 1: 処理中...
ワーカー 1: 完了
ワーカー 2: 処理中...
ワーカー 2: 完了
ワーカー 3: 処理中...
ワーカー 3: 完了
すべてのワーカーが完了しました`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">deferパターン</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">defer wg.Done()</code> を関数の先頭に書くのがベストプラクティスです。
          パニックが発生しても確実にカウンタが減ります。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sync"
)

func fetchData(source string, wg *sync.WaitGroup) {
    defer wg.Done()
    fmt.Printf("データ取得中: %s\\n", source)
    // 実際にはHTTPリクエストなどを行う
    fmt.Printf("取得完了: %s\\n", source)
}

func main() {
    var wg sync.WaitGroup
    sources := []string{"API-A", "API-B", "API-C"}

    for _, src := range sources {
        wg.Add(1)
        go fetchData(src, &wg)
    }

    wg.Wait()
    fmt.Println("全データ取得完了")
}`}
          expectedOutput={`データ取得中: API-A
取得完了: API-A
データ取得中: API-B
取得完了: API-B
データ取得中: API-C
取得完了: API-C
全データ取得完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">結果の集約</h2>
        <p className="text-gray-400 mb-4">
          WaitGroupとスライスを組み合わせて、各ゴルーチンの結果を集約できます。
          各ゴルーチンが異なるインデックスに書き込む場合、ロックは不要です。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sync"
)

func square(n int, results []int, idx int, wg *sync.WaitGroup) {
    defer wg.Done()
    results[idx] = n * n
}

func main() {
    numbers := []int{2, 4, 6, 8, 10}
    results := make([]int, len(numbers))
    var wg sync.WaitGroup

    for i, n := range numbers {
        wg.Add(1)
        go square(n, results, i, &wg)
    }

    wg.Wait()

    fmt.Println("入力:", numbers)
    fmt.Println("二乗:", results)
}`}
          expectedOutput={`入力: [2 4 6 8 10]
二乗: [4 16 36 64 100]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="goroutines" lessonId="waitgroup" />
      </div>
      <LessonNav lessons={lessons} currentId="waitgroup" basePath="/learn/goroutines" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("concurrency");

export default function FanOutInPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">並行パターン レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">fan-out/fan-in</h1>
        <p className="text-gray-400">タスクを複数のゴルーチンに分散し、結果を集約するパターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">fan-out/fan-inとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">fan-out</code>は1つの入力から複数のゴルーチンに作業を分散するパターンです。
          <code className="text-cyan-300">fan-in</code>は複数のチャネルからの結果を1つのチャネルに集約するパターンです。
          組み合わせることで並行処理のスループットを最大化できます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">fan-outパターン</h2>
        <p className="text-gray-400 mb-4">
          1つのデータソースから複数のワーカーに処理を分散します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sync"
)

func generate(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        for _, n := range nums {
            out <- n
        }
        close(out)
    }()
    return out
}

func square(id int, in <-chan int, wg *sync.WaitGroup) <-chan string {
    out := make(chan string)
    go func() {
        defer wg.Done()
        defer close(out)
        for n := range in {
            out <- fmt.Sprintf("ワーカー%d: %d^2 = %d", id, n, n*n)
        }
    }()
    return out
}

func main() {
    data := generate(1, 2, 3, 4, 5, 6)

    // fan-out: 複数のワーカーに分散
    var wg sync.WaitGroup
    channels := make([]<-chan string, 3)
    for i := 0; i < 3; i++ {
        wg.Add(1)
        channels[i] = square(i+1, data, &wg)
    }

    // 結果を収集
    for _, ch := range channels {
        for result := range ch {
            fmt.Println(result)
        }
    }
}`}
          expectedOutput={`ワーカー1: 1^2 = 1
ワーカー1: 2^2 = 4
ワーカー1: 3^2 = 9
ワーカー1: 4^2 = 16
ワーカー1: 5^2 = 25
ワーカー1: 6^2 = 36`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">fan-inパターン</h2>
        <p className="text-gray-400 mb-4">
          複数のチャネルからの出力を1つのチャネルにマージする<code className="text-cyan-300">fan-in</code>関数です。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sync"
)

func producer(id int, items ...string) <-chan string {
    out := make(chan string)
    go func() {
        defer close(out)
        for _, item := range items {
            out <- fmt.Sprintf("生産者%d: %s", id, item)
        }
    }()
    return out
}

func fanIn(channels ...<-chan string) <-chan string {
    merged := make(chan string)
    var wg sync.WaitGroup

    for _, ch := range channels {
        wg.Add(1)
        go func(c <-chan string) {
            defer wg.Done()
            for v := range c {
                merged <- v
            }
        }(ch)
    }

    go func() {
        wg.Wait()
        close(merged)
    }()

    return merged
}

func main() {
    ch1 := producer(1, "りんご", "みかん")
    ch2 := producer(2, "バナナ", "ぶどう")
    ch3 := producer(3, "メロン")

    // fan-in: 3つのチャネルを1つに集約
    merged := fanIn(ch1, ch2, ch3)

    for result := range merged {
        fmt.Println(result)
    }
    fmt.Println("全生産者から収集完了")
}`}
          expectedOutput={`生産者1: りんご
生産者1: みかん
生産者2: バナナ
生産者2: ぶどう
生産者3: メロン
全生産者から収集完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">fan-out/fan-inの組み合わせ</h2>
        <p className="text-gray-400 mb-4">
          分散と集約を組み合わせた実践的なパターンです。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "strings"
    "sync"
)

func processText(id int, texts <-chan string) <-chan string {
    out := make(chan string)
    go func() {
        defer close(out)
        for text := range texts {
            // 各ワーカーがテキスト変換を実行
            result := strings.ToUpper(text)
            out <- fmt.Sprintf("[W%d] %s -> %s", id, text, result)
        }
    }()
    return out
}

func merge(channels ...<-chan string) <-chan string {
    out := make(chan string)
    var wg sync.WaitGroup
    for _, ch := range channels {
        wg.Add(1)
        go func(c <-chan string) {
            defer wg.Done()
            for v := range c {
                out <- v
            }
        }(ch)
    }
    go func() {
        wg.Wait()
        close(out)
    }()
    return out
}

func main() {
    // 入力データを生成
    input := make(chan string, 4)
    words := []string{"hello", "world", "go", "lang"}
    go func() {
        for _, w := range words {
            input <- w
        }
        close(input)
    }()

    // fan-out: 入力を2つのワーカーに分散
    ch1 := processText(1, input)
    // 注: 実際にはinputチャネルは1つのワーカーが消費
    // 複数に分散するにはワーカープールパターンを使います

    // 結果を表示
    for r := range ch1 {
        fmt.Println(r)
    }
}`}
          expectedOutput={`[W1] hello -> HELLO
[W1] world -> WORLD
[W1] go -> GO
[W1] lang -> LANG`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="concurrency" lessonId="fan-out-in" />
      </div>
      <LessonNav lessons={lessons} currentId="fan-out-in" basePath="/learn/concurrency" />
    </div>
  );
}

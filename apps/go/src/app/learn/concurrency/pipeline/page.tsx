import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("concurrency");

export default function PipelinePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">並行パターン レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">パイプライン</h1>
        <p className="text-gray-400">チャネルで繋いだステージ間でデータを流すパイプラインパターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">パイプラインパターン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          パイプラインは各処理ステージを<code className="text-cyan-300">チャネル</code>で接続し、
          データをステージ間で流していくパターンです。各ステージは独立したゴルーチンで実行されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>ステージ1（生成） -&gt; ステージ2（変換） -&gt; ステージ3（出力）</li>
          <li>各ステージは受信チャネルを入力、送信チャネルを出力とする関数</li>
          <li>チャネルの<code className="text-cyan-300">close</code>で完了を伝播</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な3ステージパイプライン</h2>
        <p className="text-gray-400 mb-4">
          数値を生成し、2倍にし、1を加えるパイプラインです。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// ステージ1: 数値を生成
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

// ステージ2: 2倍にする
func double(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        for n := range in {
            out <- n * 2
        }
        close(out)
    }()
    return out
}

// ステージ3: 1を加える
func addOne(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        for n := range in {
            out <- n + 1
        }
        close(out)
    }()
    return out
}

func main() {
    // パイプライン: generate -> double -> addOne
    ch := generate(1, 2, 3, 4, 5)
    doubled := double(ch)
    result := addOne(doubled)

    for v := range result {
        fmt.Println(v)
    }
}`}
          expectedOutput={`3
5
7
9
11`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列処理パイプライン</h2>
        <p className="text-gray-400 mb-4">
          文字列データを複数のステージで変換するパイプラインの例です。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "strings"
)

func source(items ...string) <-chan string {
    out := make(chan string)
    go func() {
        for _, s := range items {
            out <- s
        }
        close(out)
    }()
    return out
}

func toUpper(in <-chan string) <-chan string {
    out := make(chan string)
    go func() {
        for s := range in {
            out <- strings.ToUpper(s)
        }
        close(out)
    }()
    return out
}

func addPrefix(prefix string, in <-chan string) <-chan string {
    out := make(chan string)
    go func() {
        for s := range in {
            out <- prefix + s
        }
        close(out)
    }()
    return out
}

func main() {
    // source -> toUpper -> addPrefix
    data := source("hello", "world", "go")
    upper := toUpper(data)
    result := addPrefix("[INFO] ", upper)

    for v := range result {
        fmt.Println(v)
    }
}`}
          expectedOutput={`[INFO] HELLO
[INFO] WORLD
[INFO] GO`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">フィルタ付きパイプライン</h2>
        <p className="text-gray-400 mb-4">
          パイプラインにフィルタステージを追加して、条件に合うデータだけを通過させます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func numbers(start, end int) <-chan int {
    out := make(chan int)
    go func() {
        for i := start; i <= end; i++ {
            out <- i
        }
        close(out)
    }()
    return out
}

func filter(in <-chan int, predicate func(int) bool) <-chan int {
    out := make(chan int)
    go func() {
        for n := range in {
            if predicate(n) {
                out <- n
            }
        }
        close(out)
    }()
    return out
}

func transform(in <-chan int, fn func(int) string) <-chan string {
    out := make(chan string)
    go func() {
        for n := range in {
            out <- fn(n)
        }
        close(out)
    }()
    return out
}

func main() {
    // 1-20 -> 偶数フィルタ -> 3の倍数フィルタ -> 文字列変換
    nums := numbers(1, 20)
    evens := filter(nums, func(n int) bool { return n%2 == 0 })
    divisibleBy3 := filter(evens, func(n int) bool { return n%3 == 0 })
    result := transform(divisibleBy3, func(n int) string {
        return fmt.Sprintf("%d は2と3の倍数", n)
    })

    for s := range result {
        fmt.Println(s)
    }
}`}
          expectedOutput={`6 は2と3の倍数
12 は2と3の倍数
18 は2と3の倍数`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="concurrency" lessonId="pipeline" />
      </div>
      <LessonNav lessons={lessons} currentId="pipeline" basePath="/learn/concurrency" />
    </div>
  );
}

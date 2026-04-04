import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("channels");

export default function DirectionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">チャネル レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">方向付きチャネル</h1>
        <p className="text-gray-400">chan&lt;- T（送信専用）と&lt;-chan T（受信専用）で関数のインターフェースを明確にします。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">送信専用・受信専用チャネル</h2>
        <p className="text-gray-400 mb-4">
          関数のパラメータでチャネルの方向を指定することで、誤った操作をコンパイル時に防げます。
          <code className="text-cyan-300">chan&lt;- T</code> は送信専用、
          <code className="text-cyan-300">&lt;-chan T</code> は受信専用です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// 送信専用チャネルを受け取る
func producer(ch chan<- string) {
    ch <- "データA"
    ch <- "データB"
    ch <- "データC"
}

// 受信専用チャネルを受け取る
func consumer(ch <-chan string) {
    for i := 0; i < 3; i++ {
        msg := <-ch
        fmt.Println("受信:", msg)
    }
}

func main() {
    ch := make(chan string)

    go producer(ch) // 自動的に送信専用に変換
    consumer(ch)    // 自動的に受信専用に変換
}`}
          expectedOutput={`受信: データA
受信: データB
受信: データC`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">パイプラインでの活用</h2>
        <p className="text-gray-400 mb-4">
          方向付きチャネルはパイプラインパターンで威力を発揮します。
          各ステージは入力チャネル（受信専用）から読み取り、出力チャネル（送信専用）に書き込みます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// 数値を生成する
func generate(out chan<- int) {
    for i := 1; i <= 5; i++ {
        out <- i
    }
    close(out)
}

// 数値を2倍にする
func double(in <-chan int, out chan<- int) {
    for val := range in {
        out <- val * 2
    }
    close(out)
}

func main() {
    naturals := make(chan int)
    doubles := make(chan int)

    go generate(naturals)
    go double(naturals, doubles)

    for val := range doubles {
        fmt.Println(val)
    }
}`}
          expectedOutput={`2
4
6
8
10`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">戻り値としてのチャネル</h2>
        <p className="text-gray-400 mb-4">
          関数が受信専用チャネルを返すパターンは、非常にGoらしいAPIデザインです。
          呼び出し側は読み取りのみ可能になります。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// 受信専用チャネルを返す
func counter(max int) <-chan int {
    ch := make(chan int)
    go func() {
        for i := 1; i <= max; i++ {
            ch <- i
        }
        close(ch)
    }()
    return ch // 自動的に受信専用に変換
}

func main() {
    // 呼び出し側は受信のみ可能
    for val := range counter(5) {
        fmt.Printf("カウント: %d\\n", val)
    }
}`}
          expectedOutput={`カウント: 1
カウント: 2
カウント: 3
カウント: 4
カウント: 5`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="channels" lessonId="direction" />
      </div>
      <LessonNav lessons={lessons} currentId="direction" basePath="/learn/channels" />
    </div>
  );
}

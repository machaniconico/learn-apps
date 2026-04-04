import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("channels");

export default function ChannelBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">チャネル レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">チャネルの基本</h1>
        <p className="text-gray-400">make(chan T)でチャネルを作成し、&lt;-演算子で値を送受信する基本を学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">チャネルの作成と送受信</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">make(chan T)</code> でチャネルを作成します。
          <code className="text-cyan-300">ch &lt;- val</code> で送信、
          <code className="text-cyan-300">val := &lt;-ch</code> で受信します。
          バッファなしチャネルは送信と受信が同期的に行われます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // intのチャネルを作成
    ch := make(chan int)

    // ゴルーチンで送信
    go func() {
        ch <- 42
    }()

    // メインゴルーチンで受信
    value := <-ch
    fmt.Println("受信した値:", value)
}`}
          expectedOutput={`受信した値: 42`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列のチャネル</h2>
        <p className="text-gray-400 mb-4">
          チャネルは任意の型で作成できます。複数の値を順番に送受信することもできます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func greet(ch chan string, name string) {
    msg := fmt.Sprintf("こんにちは、%sさん！", name)
    ch <- msg // メッセージを送信
}

func main() {
    ch := make(chan string)

    go greet(ch, "太郎")
    go greet(ch, "花子")

    // 2つのメッセージを受信
    msg1 := <-ch
    msg2 := <-ch
    fmt.Println(msg1)
    fmt.Println(msg2)
}`}
          expectedOutput={`こんにちは、太郎さん！
こんにちは、花子さん！`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">チャネルの同期的な性質</h2>
        <p className="text-gray-400 mb-4">
          バッファなしチャネルでは、送信側は受信側が準備できるまでブロックし、
          受信側は送信側がデータを送るまでブロックします。これにより自然な同期が実現されます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func compute(ch chan int) {
    sum := 0
    for i := 1; i <= 10; i++ {
        sum += i
    }
    ch <- sum // 計算結果を送信
}

func main() {
    ch := make(chan int)

    go compute(ch)

    // 結果が届くまで自動的に待つ
    result := <-ch
    fmt.Printf("1から10の合計: %d\\n", result)
}`}
          expectedOutput={`1から10の合計: 55`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="channels" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/channels" />
    </div>
  );
}

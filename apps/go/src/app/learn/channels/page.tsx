import { GoEditor } from "@/components/go-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("channels");

const quizQuestions: QuizQuestion[] = [
  {
    question: "バッファなしチャネルを作成する構文は？",
    options: ["make(chan int, 0)", "make(chan int)", "new(chan int)", "chan int{}"],
    answer: 1,
    explanation: "make(chan int) でバッファなし（アンバッファード）チャネルを作成します。",
  },
  {
    question: "送信専用チャネルの型表記は？",
    options: ["<-chan int", "chan<- int", "chan int<-", "send chan int"],
    answer: 1,
    explanation: "chan<- int は送信専用チャネルです。<-chan int は受信専用チャネルです。",
  },
  {
    question: "select文でどのcaseも準備できていない場合に実行されるのは？",
    options: ["最初のcase", "最後のcase", "default", "ランダムなcase"],
    answer: 2,
    explanation: "default ブロックは、どのチャネル操作も即座に実行できない場合に実行されます。",
  },
  {
    question: "閉じたチャネルから受信すると何が返りますか？",
    options: ["パニック", "ゼロ値", "nil", "エラー"],
    answer: 1,
    explanation: "閉じたチャネルからの受信はゼロ値を返します。2番目の戻り値 ok が false になります。",
  },
];

export default function ChannelsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">チャネル</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">7レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          ゴルーチン間の通信手段であるチャネルを学びます。基本的な送受信からバッファ付きチャネル、
          方向付きチャネル、select文、タイムアウト処理、close/rangeパターン、
          fan-out/fan-inなどの実践的な並行パターンまでカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="channels" totalLessons={7} color="teal" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全7レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/channels" color="teal" categoryId="channels" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">チャネルの基本操作</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">make(chan T)</code> でチャネルを作成し、
          <code className="text-cyan-300">&lt;-</code> 演算子で値を送受信します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    ch := make(chan string)

    go func() {
        ch <- "Hello from goroutine!"
    }()

    msg := <-ch
    fmt.Println(msg)
}`}
          expectedOutput={`Hello from goroutine!`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">select文による多重化</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">select</code> は複数のチャネル操作を同時に待ち受けます。
          準備できたケースがランダムに選ばれます。
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
        ch1 <- "チャネル1"
    }()
    go func() {
        time.Sleep(20 * time.Millisecond)
        ch2 <- "チャネル2"
    }()

    for i := 0; i < 2; i++ {
        select {
        case msg := <-ch1:
            fmt.Println("受信:", msg)
        case msg := <-ch2:
            fmt.Println("受信:", msg)
        }
    }
}`}
          expectedOutput={`受信: チャネル1
受信: チャネル2`}
        />
      </section>
      <Quiz questions={quizQuestions} color="teal" />
    </div>
  );
}

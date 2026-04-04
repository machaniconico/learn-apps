import { GoEditor } from "@/components/go-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("concurrency");

const quizQuestions: QuizQuestion[] = [
  {
    question: "ワーカープールパターンの主な目的は？",
    options: ["メモリ削減", "ゴルーチン数の制御と再利用", "コードの可読性向上", "型安全性の確保"],
    answer: 1,
    explanation: "ワーカープールは一定数のゴルーチンを事前に起動し、ジョブチャネルからタスクを受け取ることでゴルーチンの数を制御します。",
  },
  {
    question: "fan-outパターンとは何ですか？",
    options: ["結果を集約する", "タスクを複数のゴルーチンに分散する", "チャネルを閉じる", "エラーを伝播する"],
    answer: 1,
    explanation: "fan-outは1つの入力チャネルから複数のゴルーチンにタスクを分散するパターンです。fan-inはその逆で結果を集約します。",
  },
  {
    question: "errgroup.Groupの Wait() メソッドは何を返しますか？",
    options: ["全てのエラーのスライス", "最初に発生したエラー", "エラーの数", "bool値"],
    answer: 1,
    explanation: "errgroup.Group の Wait() は最初に発生した非nilエラーを返します。エラーが発生するとキャンセルも伝播されます。",
  },
  {
    question: "チャネルベースのセマフォで同時実行数を制限する方法は？",
    options: ["mutexを使う", "バッファ付きチャネルに送信してからgoroutineを実行", "WaitGroupのカウントを設定", "time.Sleepで制御"],
    answer: 1,
    explanation: "バッファ付きチャネルのバッファサイズが同時実行数の上限となり、送信がブロックされることで制限を実現します。",
  },
];

export default function ConcurrencyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-purple-400 mb-2">並行パターン</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Goの並行処理における実践的なパターンを学びます。ワーカープール、fan-out/fan-in、パイプライン、
          レートリミット、errgroup、セマフォなど、本番で使える並行パターンをマスターしましょう。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="concurrency" totalLessons={6} color="purple" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/concurrency" color="purple" categoryId="concurrency" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ワーカープールの概要</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">ワーカープール</code>は一定数のゴルーチンでジョブを処理するパターンです。
          チャネルを使ってジョブの送信と結果の受信を行います。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sync"
)

func worker(id int, jobs <-chan int, results chan<- int, wg *sync.WaitGroup) {
    defer wg.Done()
    for j := range jobs {
        result := j * 2
        fmt.Printf("ワーカー%d: ジョブ%d -> 結果%d\\n", id, j, result)
        results <- result
    }
}

func main() {
    jobs := make(chan int, 5)
    results := make(chan int, 5)
    var wg sync.WaitGroup

    for w := 1; w <= 3; w++ {
        wg.Add(1)
        go worker(w, jobs, results, &wg)
    }

    for j := 1; j <= 5; j++ {
        jobs <- j
    }
    close(jobs)

    go func() {
        wg.Wait()
        close(results)
    }()

    for r := range results {
        _ = r
    }
    fmt.Println("全ジョブ完了")
}`}
          expectedOutput={`ワーカー1: ジョブ1 -> 結果2
ワーカー2: ジョブ2 -> 結果4
ワーカー3: ジョブ3 -> 結果6
ワーカー1: ジョブ4 -> 結果8
ワーカー2: ジョブ5 -> 結果10
全ジョブ完了`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">パイプラインパターン</h2>
        <p className="text-gray-400 mb-4">
          ステージをチャネルで接続し、データを流していく<code className="text-cyan-300">パイプライン</code>パターンです。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

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

func main() {
    ch := generate(1, 2, 3, 4, 5)
    result := double(ch)
    for v := range result {
        fmt.Println(v)
    }
}`}
          expectedOutput={`2
4
6
8
10`}
        />
      </section>
      <Quiz questions={quizQuestions} color="purple" />
    </div>
  );
}

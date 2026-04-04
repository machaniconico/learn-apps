import { GoEditor } from "@/components/go-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("goroutines");

const quizQuestions: QuizQuestion[] = [
  {
    question: "ゴルーチンを起動するキーワードは？",
    options: ["goroutine", "go", "async", "spawn"],
    answer: 1,
    explanation: "go キーワードを関数呼び出しの前に付けることで、新しいゴルーチンが起動されます。",
  },
  {
    question: "sync.WaitGroupのDone()はカウンタをどう変化させますか？",
    options: ["1増やす", "1減らす", "0にリセット", "変化なし"],
    answer: 1,
    explanation: "Done() はカウンタを1減らします。Add(1) で増やし、Wait() でカウンタが0になるまで待ちます。",
  },
  {
    question: "sync.Mutexで保護された領域を何と呼びますか？",
    options: ["セーフゾーン", "クリティカルセクション", "ロックエリア", "プロテクトブロック"],
    answer: 1,
    explanation: "Lock() と Unlock() の間のコードをクリティカルセクション（排他区間）と呼びます。",
  },
  {
    question: "データ競合を検出するコマンドは？",
    options: ["go test -check", "go run -race", "go vet -race", "go build -detect"],
    answer: 1,
    explanation: "go run -race や go test -race でレースディテクタを有効にし、データ競合を検出できます。",
  },
];

export default function GoroutinesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-cyan-400 mb-2">ゴルーチン</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Goの並行処理の基盤であるゴルーチンを学びます。goキーワードによる軽量スレッドの起動から、
          sync.WaitGroupによる同期、Mutex・RWMutexによる排他制御、atomicパッケージによるアトミック操作、
          レースディテクタまで、安全な並行プログラミングの基礎をカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="goroutines" totalLessons={6} color="cyan" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/goroutines" color="cyan" categoryId="goroutines" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ゴルーチンの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">go</code> キーワードを使って関数を並行実行します。
          ゴルーチンはOSスレッドより遥かに軽量で、数千単位で起動できます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "time"
)

func sayHello(name string) {
    fmt.Printf("Hello, %s!\\n", name)
}

func main() {
    go sayHello("ゴルーチン1")
    go sayHello("ゴルーチン2")

    fmt.Println("メイン関数")
    time.Sleep(100 * time.Millisecond)
}`}
          expectedOutput={`メイン関数
Hello, ゴルーチン1!
Hello, ゴルーチン2!`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">WaitGroupで同期</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">sync.WaitGroup</code> を使って、すべてのゴルーチンの完了を確実に待ちます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sync"
)

func worker(id int, wg *sync.WaitGroup) {
    defer wg.Done()
    fmt.Printf("ワーカー %d 完了\\n", id)
}

func main() {
    var wg sync.WaitGroup

    for i := 1; i <= 3; i++ {
        wg.Add(1)
        go worker(i, &wg)
    }

    wg.Wait()
    fmt.Println("全ワーカー完了")
}`}
          expectedOutput={`ワーカー 1 完了
ワーカー 2 完了
ワーカー 3 完了
全ワーカー完了`}
        />
      </section>
      <Quiz questions={quizQuestions} color="cyan" />
    </div>
  );
}

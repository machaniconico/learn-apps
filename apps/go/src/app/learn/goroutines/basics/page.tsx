import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("goroutines");

export default function GoroutinesBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">ゴルーチン レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ゴルーチンの基本</h1>
        <p className="text-gray-400">goキーワードで関数を並行実行し、軽量スレッドであるゴルーチンの基本を学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">goキーワード</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">go</code> キーワードを関数呼び出しの前に付けると、
          その関数は新しいゴルーチンとして並行に実行されます。ゴルーチンはOSスレッドよりはるかに軽量で、
          数千〜数万のゴルーチンを同時に実行できます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "time"
)

func greet(name string) {
    fmt.Printf("こんにちは、%s！\\n", name)
}

func main() {
    // 通常の関数呼び出し
    greet("メイン")

    // ゴルーチンとして起動
    go greet("ゴルーチンA")
    go greet("ゴルーチンB")

    // メインが先に終了しないように待つ
    time.Sleep(100 * time.Millisecond)
    fmt.Println("メイン関数終了")
}`}
          expectedOutput={`こんにちは、メイン！
こんにちは、ゴルーチンA！
こんにちは、ゴルーチンB！
メイン関数終了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">無名関数でゴルーチン</h2>
        <p className="text-gray-400 mb-4">
          名前付き関数だけでなく、<code className="text-cyan-300">無名関数（クロージャ）</code>もゴルーチンとして起動できます。
          ただし、ループ変数のキャプチャには注意が必要です。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "time"
)

func main() {
    // 無名関数をゴルーチンとして実行
    go func() {
        fmt.Println("無名ゴルーチン実行中")
    }()

    // 引数を渡す（ループ変数の安全なキャプチャ）
    for i := 0; i < 3; i++ {
        go func(n int) {
            fmt.Printf("ゴルーチン %d\\n", n)
        }(i) // i を引数として渡す
    }

    time.Sleep(100 * time.Millisecond)
    fmt.Println("完了")
}`}
          expectedOutput={`無名ゴルーチン実行中
ゴルーチン 0
ゴルーチン 1
ゴルーチン 2
完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">メインゴルーチンの終了</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">main()</code> 関数が終了すると、
          すべてのゴルーチンも強制終了されます。実際のコードでは
          <code className="text-cyan-300">time.Sleep</code> ではなく
          <code className="text-cyan-300">sync.WaitGroup</code> やチャネルで同期します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "time"
)

func longTask(id int) {
    fmt.Printf("タスク%d: 開始\\n", id)
    time.Sleep(50 * time.Millisecond)
    fmt.Printf("タスク%d: 完了\\n", id)
}

func main() {
    fmt.Println("=== 並行タスクの実行 ===")

    go longTask(1)
    go longTask(2)
    go longTask(3)

    // 全タスクの完了を待つ（簡易版）
    time.Sleep(200 * time.Millisecond)
    fmt.Println("=== すべてのタスク完了 ===")
}`}
          expectedOutput={`=== 並行タスクの実行 ===
タスク1: 開始
タスク2: 開始
タスク3: 開始
タスク1: 完了
タスク2: 完了
タスク3: 完了
=== すべてのタスク完了 ===`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="goroutines" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/goroutines" />
    </div>
  );
}

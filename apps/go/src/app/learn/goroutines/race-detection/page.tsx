import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("goroutines");

export default function RaceDetectionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">ゴルーチン レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">競合検出</h1>
        <p className="text-gray-400">go run -race によるデータ競合の検出方法と、よくある競合パターンを学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">レースディテクタの使い方</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">go run -race</code> や
          <code className="text-cyan-300">go test -race</code> でレースディテクタを有効にすると、
          実行時にデータ競合を検出して報告してくれます。
          CI/CDパイプラインでも常に有効にすることが推奨されます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fmt.Println("=== レースディテクタの使い方 ===")
    fmt.Println()
    fmt.Println("■ 実行コマンド:")
    fmt.Println("  go run -race main.go")
    fmt.Println("  go test -race ./...")
    fmt.Println("  go build -race -o myapp")
    fmt.Println()
    fmt.Println("■ 検出時の出力例:")
    fmt.Println("  WARNING: DATA RACE")
    fmt.Println("  Write at 0x00c0000b4010 by goroutine 7:")
    fmt.Println("  Previous read at 0x00c0000b4010 by goroutine 6:")
    fmt.Println()
    fmt.Println("■ 注意点:")
    fmt.Println("  - パフォーマンスが低下するためプロダクションでは無効に")
    fmt.Println("  - 実際に実行されたパスのみ検出")
}`}
          expectedOutput={`=== レースディテクタの使い方 ===

■ 実行コマンド:
  go run -race main.go
  go test -race ./...
  go build -race -o myapp

■ 検出時の出力例:
  WARNING: DATA RACE
  Write at 0x00c0000b4010 by goroutine 7:
  Previous read at 0x00c0000b4010 by goroutine 6:

■ 注意点:
  - パフォーマンスが低下するためプロダクションでは無効に
  - 実際に実行されたパスのみ検出`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">よくある競合パターン</h2>
        <p className="text-gray-400 mb-4">
          ループ変数のキャプチャ、共有変数への同時アクセス、
          マップへの並行書き込みが典型的な競合パターンです。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sync"
)

func main() {
    fmt.Println("=== 競合パターンと対策 ===")
    fmt.Println()

    // パターン1: ループ変数キャプチャ（修正版）
    var wg sync.WaitGroup
    fmt.Println("■ ループ変数の安全なキャプチャ:")
    for i := 0; i < 3; i++ {
        wg.Add(1)
        go func(n int) { // 引数で渡す
            defer wg.Done()
            fmt.Printf("  ゴルーチン: %d\\n", n)
        }(i)
    }
    wg.Wait()

    // パターン2: 共有カウンタの保護
    fmt.Println()
    fmt.Println("■ 共有カウンタの保護:")
    var mu sync.Mutex
    count := 0
    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            mu.Lock()
            count++
            mu.Unlock()
        }()
    }
    wg.Wait()
    fmt.Printf("  安全なカウント: %d\\n", count)
}`}
          expectedOutput={`=== 競合パターンと対策 ===

■ ループ変数の安全なキャプチャ:
  ゴルーチン: 0
  ゴルーチン: 1
  ゴルーチン: 2

■ 共有カウンタの保護:
  安全なカウント: 5`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">安全な並行処理の原則</h2>
        <p className="text-gray-400 mb-4">
          データ競合を避けるための基本原則をまとめます。
          「共有するな、通信せよ」がGoの並行処理の哲学です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fmt.Println("=== 安全な並行処理の原則 ===")
    fmt.Println()
    fmt.Println("1. チャネルで通信する（共有メモリより推奨）")
    fmt.Println("   ch := make(chan int)")
    fmt.Println()
    fmt.Println("2. Mutexで共有データを保護する")
    fmt.Println("   mu.Lock() / defer mu.Unlock()")
    fmt.Println()
    fmt.Println("3. atomicで単純な数値操作")
    fmt.Println("   atomic.AddInt64(&counter, 1)")
    fmt.Println()
    fmt.Println("4. ループ変数は引数で渡す")
    fmt.Println("   go func(n int) { ... }(i)")
    fmt.Println()
    fmt.Println("5. テストでは常に -race を使う")
    fmt.Println("   go test -race ./...")
}`}
          expectedOutput={`=== 安全な並行処理の原則 ===

1. チャネルで通信する（共有メモリより推奨）
   ch := make(chan int)

2. Mutexで共有データを保護する
   mu.Lock() / defer mu.Unlock()

3. atomicで単純な数値操作
   atomic.AddInt64(&counter, 1)

4. ループ変数は引数で渡す
   go func(n int) { ... }(i)

5. テストでは常に -race を使う
   go test -race ./...`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="goroutines" lessonId="race-detection" />
      </div>
      <LessonNav lessons={lessons} currentId="race-detection" basePath="/learn/goroutines" />
    </div>
  );
}

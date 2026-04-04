import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("goroutines");

export default function AtomicPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">ゴルーチン レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">atomic</h1>
        <p className="text-gray-400">sync/atomicパッケージによるロックフリーのアトミック操作を学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">アトミック操作とは</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">sync/atomic</code> パッケージは、ロックなしでスレッドセーフな操作を提供します。
          Mutexより軽量ですが、単純な数値操作に限られます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sync"
    "sync/atomic"
)

func main() {
    var counter int64
    var wg sync.WaitGroup

    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            atomic.AddInt64(&counter, 1)
        }()
    }

    wg.Wait()
    fmt.Printf("カウンター: %d\\n", atomic.LoadInt64(&counter))
}`}
          expectedOutput={`カウンター: 1000`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Load・Store操作</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">atomic.LoadInt64</code> で安全に読み取り、
          <code className="text-cyan-300">atomic.StoreInt64</code> で安全に書き込みます。
          通常の代入や読み取りとは異なり、他のゴルーチンとの整合性が保証されます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sync/atomic"
)

func main() {
    var value int64

    // Store: アトミックに値を設定
    atomic.StoreInt64(&value, 100)
    fmt.Printf("Store後: %d\\n", atomic.LoadInt64(&value))

    // Add: アトミックに加算
    atomic.AddInt64(&value, 50)
    fmt.Printf("Add 50後: %d\\n", atomic.LoadInt64(&value))

    // Add（負の値で減算）
    atomic.AddInt64(&value, -30)
    fmt.Printf("Add -30後: %d\\n", atomic.LoadInt64(&value))

    // Load: アトミックに読み取り
    current := atomic.LoadInt64(&value)
    fmt.Printf("最終値: %d\\n", current)
}`}
          expectedOutput={`Store後: 100
Add 50後: 150
Add -30後: 120
最終値: 120`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">CompareAndSwap (CAS)</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">CompareAndSwapInt64</code> は現在の値が期待値と一致する場合のみ
          新しい値に更新します。ロックフリーアルゴリズムの基盤です。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sync/atomic"
)

func main() {
    var value int64 = 10

    // CAS: 現在値が10なら20に変更
    swapped := atomic.CompareAndSwapInt64(&value, 10, 20)
    fmt.Printf("CAS(10→20): swapped=%t, value=%d\\n",
        swapped, atomic.LoadInt64(&value))

    // CAS: 現在値が10なら30に変更（もう10ではない）
    swapped = atomic.CompareAndSwapInt64(&value, 10, 30)
    fmt.Printf("CAS(10→30): swapped=%t, value=%d\\n",
        swapped, atomic.LoadInt64(&value))

    // CAS: 現在値が20なら30に変更
    swapped = atomic.CompareAndSwapInt64(&value, 20, 30)
    fmt.Printf("CAS(20→30): swapped=%t, value=%d\\n",
        swapped, atomic.LoadInt64(&value))
}`}
          expectedOutput={`CAS(10→20): swapped=true, value=20
CAS(10→30): swapped=false, value=20
CAS(20→30): swapped=true, value=30`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="goroutines" lessonId="atomic" />
      </div>
      <LessonNav lessons={lessons} currentId="atomic" basePath="/learn/goroutines" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("goroutines");

export default function MutexPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">ゴルーチン レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Mutex</h1>
        <p className="text-gray-400">sync.MutexによるLock/Unlockで共有データへの排他制御を学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">データ競合の問題</h2>
        <p className="text-gray-400 mb-4">
          複数のゴルーチンが同じ変数に同時にアクセスすると、<code className="text-cyan-300">データ競合（data race）</code>が
          発生します。結果が不定になり、バグの原因になります。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sync"
)

func main() {
    counter := 0
    var wg sync.WaitGroup

    // Mutexなしの場合（危険！）
    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            counter++ // データ競合！
        }()
    }
    wg.Wait()

    // 結果が1000にならない可能性がある
    fmt.Printf("Mutexなし: counter = %d（1000が期待値）\\n", counter)
}`}
          expectedOutput={`Mutexなし: counter = 1000（1000が期待値）`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Mutexで保護する</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">sync.Mutex</code> の <code className="text-cyan-300">Lock()</code> と
          <code className="text-cyan-300">Unlock()</code> で共有データへのアクセスを排他制御します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sync"
)

type SafeCounter struct {
    mu    sync.Mutex
    count int
}

func (c *SafeCounter) Increment() {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.count++
}

func (c *SafeCounter) Value() int {
    c.mu.Lock()
    defer c.mu.Unlock()
    return c.count
}

func main() {
    counter := &SafeCounter{}
    var wg sync.WaitGroup

    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            counter.Increment()
        }()
    }

    wg.Wait()
    fmt.Printf("Mutexあり: counter = %d\\n", counter.Value())
}`}
          expectedOutput={`Mutexあり: counter = 1000`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Mutexで安全なマップ</h2>
        <p className="text-gray-400 mb-4">
          Goの <code className="text-cyan-300">map</code> は並行安全ではありません。
          複数のゴルーチンからアクセスする場合は Mutex で保護します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sync"
)

type SafeMap struct {
    mu   sync.Mutex
    data map[string]int
}

func NewSafeMap() *SafeMap {
    return &SafeMap{data: make(map[string]int)}
}

func (m *SafeMap) Set(key string, value int) {
    m.mu.Lock()
    defer m.mu.Unlock()
    m.data[key] = value
}

func (m *SafeMap) Get(key string) (int, bool) {
    m.mu.Lock()
    defer m.mu.Unlock()
    val, ok := m.data[key]
    return val, ok
}

func main() {
    sm := NewSafeMap()
    var wg sync.WaitGroup

    // 並行に書き込み
    keys := []string{"apple", "banana", "cherry"}
    for i, key := range keys {
        wg.Add(1)
        go func(k string, v int) {
            defer wg.Done()
            sm.Set(k, v)
        }(key, (i+1)*10)
    }
    wg.Wait()

    // 結果を確認
    for _, key := range keys {
        val, _ := sm.Get(key)
        fmt.Printf("%s: %d\\n", key, val)
    }
}`}
          expectedOutput={`apple: 10
banana: 20
cherry: 30`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="goroutines" lessonId="mutex" />
      </div>
      <LessonNav lessons={lessons} currentId="mutex" basePath="/learn/goroutines" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("goroutines");

export default function RWMutexPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">ゴルーチン レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">RWMutex</h1>
        <p className="text-gray-400">sync.RWMutexを使って、読み取りが多い場面でのパフォーマンスを改善する方法を学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">RWMutexとは</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">sync.RWMutex</code> は読み取りロック（RLock）と書き込みロック（Lock）を分離します。
          複数のゴルーチンが同時に読み取りでき、書き込みは排他的に行われます。
          読み取りが多く書き込みが少ないワークロードで効果的です。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sync"
)

type Config struct {
    mu       sync.RWMutex
    settings map[string]string
}

func NewConfig() *Config {
    return &Config{settings: make(map[string]string)}
}

// 読み取り: RLock（複数同時OK）
func (c *Config) Get(key string) string {
    c.mu.RLock()
    defer c.mu.RUnlock()
    return c.settings[key]
}

// 書き込み: Lock（排他的）
func (c *Config) Set(key, value string) {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.settings[key] = value
}

func main() {
    config := NewConfig()
    config.Set("host", "localhost")
    config.Set("port", "8080")

    fmt.Printf("host: %s\\n", config.Get("host"))
    fmt.Printf("port: %s\\n", config.Get("port"))
}`}
          expectedOutput={`host: localhost
port: 8080`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">並行読み取りの利点</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">RLock()</code> は複数のゴルーチンが同時に取得できます。
          通常の <code className="text-cyan-300">Mutex</code> では読み取り同士もブロックし合いますが、
          RWMutex では読み取りは並行に行えます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sync"
)

type Cache struct {
    mu   sync.RWMutex
    data map[string]int
}

func NewCache() *Cache {
    return &Cache{data: make(map[string]int)}
}

func (c *Cache) Read(key string) (int, bool) {
    c.mu.RLock()         // 読み取りロック
    defer c.mu.RUnlock() // 読み取りアンロック
    val, ok := c.data[key]
    return val, ok
}

func (c *Cache) Write(key string, val int) {
    c.mu.Lock()         // 書き込みロック
    defer c.mu.Unlock() // 書き込みアンロック
    c.data[key] = val
}

func main() {
    cache := NewCache()
    var wg sync.WaitGroup

    // 書き込み
    cache.Write("count", 42)

    // 並行読み取り（RLockなので同時実行可能）
    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            val, _ := cache.Read("count")
            fmt.Printf("リーダー%d: count = %d\\n", id, val)
        }(i)
    }
    wg.Wait()
    fmt.Println("全リーダー完了")
}`}
          expectedOutput={`リーダー0: count = 42
リーダー1: count = 42
リーダー2: count = 42
リーダー3: count = 42
リーダー4: count = 42
全リーダー完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">MutexとRWMutexの使い分け</h2>
        <p className="text-gray-400 mb-4">
          読み取りが多い場合は <code className="text-cyan-300">RWMutex</code>、
          読み書きが同程度なら通常の <code className="text-cyan-300">Mutex</code> が適切です。
          RWMutex はオーバーヘッドがあるため、常に有利とは限りません。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fmt.Println("=== Mutex vs RWMutex の使い分け ===")
    fmt.Println()
    fmt.Println("sync.Mutex:")
    fmt.Println("  - 読み書きの比率が同程度")
    fmt.Println("  - シンプルなカウンタ")
    fmt.Println("  - 実装がシンプルでオーバーヘッド小")
    fmt.Println()
    fmt.Println("sync.RWMutex:")
    fmt.Println("  - 読み取りが圧倒的に多い（キャッシュ等）")
    fmt.Println("  - 設定の読み取り")
    fmt.Println("  - 読み取りの並行性を確保したい場合")
}`}
          expectedOutput={`=== Mutex vs RWMutex の使い分け ===

sync.Mutex:
  - 読み書きの比率が同程度
  - シンプルなカウンタ
  - 実装がシンプルでオーバーヘッド小

sync.RWMutex:
  - 読み取りが圧倒的に多い（キャッシュ等）
  - 設定の読み取り
  - 読み取りの並行性を確保したい場合`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="goroutines" lessonId="rwmutex" />
      </div>
      <LessonNav lessons={lessons} currentId="rwmutex" basePath="/learn/goroutines" />
    </div>
  );
}

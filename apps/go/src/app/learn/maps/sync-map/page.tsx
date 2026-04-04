import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("maps");

export default function SyncMapPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">マップ レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">sync.Map</h1>
        <p className="text-gray-400">並行安全なsync.Mapの使い方を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">なぜsync.Mapが必要か</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          通常の <code className="text-cyan-300">map</code> はゴルーチンセーフではありません。
          複数のゴルーチンから同時に読み書きするとランタイムパニックが発生します。
          <code className="text-cyan-300">sync.Map</code> はロックなしで安全に並行アクセスできるマップです。
          特に読み取りが多く書き込みが少ないケースで効率的です。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">sync.Mapの基本操作</h2>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sync"
)

func main() {
    var m sync.Map

    // Store: 値を保存
    m.Store("name", "Go")
    m.Store("version", 1.21)
    m.Store("year", 2009)

    // Load: 値を取得
    if val, ok := m.Load("name"); ok {
        fmt.Println("name:", val)
    }

    if val, ok := m.Load("version"); ok {
        fmt.Println("version:", val)
    }

    // 存在しないキー
    if _, ok := m.Load("missing"); !ok {
        fmt.Println("missing: キーが見つかりません")
    }

    // Delete: 値を削除
    m.Delete("year")
    if _, ok := m.Load("year"); !ok {
        fmt.Println("year: 削除されました")
    }
}`}
          expectedOutput={`name: Go
version: 1.21
missing: キーが見つかりません
year: 削除されました`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">LoadOrStoreとRange</h2>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sync"
)

func main() {
    var m sync.Map

    // LoadOrStore: 存在すれば取得、なければ保存
    val, loaded := m.LoadOrStore("key1", "value1")
    fmt.Printf("key1: val=%v, loaded=%t\\n", val, loaded)

    // 既に存在するキー
    val, loaded = m.LoadOrStore("key1", "newvalue")
    fmt.Printf("key1再度: val=%v, loaded=%t\\n", val, loaded)

    m.Store("key2", "value2")
    m.Store("key3", "value3")

    // Range: 全要素を走査
    fmt.Println("全要素:")
    m.Range(func(key, value any) bool {
        fmt.Printf("  %v: %v\\n", key, value)
        return true  // falseを返すと走査を停止
    })
}`}
          expectedOutput={`key1: val=value1, loaded=false
key1再度: val=value1, loaded=true
全要素:
  key1: value1
  key2: value2
  key3: value3`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">並行処理での使用例</h2>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sync"
)

func main() {
    var cache sync.Map
    var wg sync.WaitGroup

    // 複数のゴルーチンから安全にアクセス
    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            key := fmt.Sprintf("worker-%d", id)
            cache.Store(key, id*10)
        }(i)
    }

    wg.Wait()

    // 結果を表示
    fmt.Println("キャッシュ内容:")
    cache.Range(func(key, value any) bool {
        fmt.Printf("  %v: %v\\n", key, value)
        return true
    })
}`}
          expectedOutput={`キャッシュ内容:
  worker-0: 0
  worker-1: 10
  worker-2: 20
  worker-3: 30
  worker-4: 40`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="maps" lessonId="sync-map" />
      </div>
      <LessonNav lessons={lessons} currentId="sync-map" basePath="/learn/maps" />
    </div>
  );
}

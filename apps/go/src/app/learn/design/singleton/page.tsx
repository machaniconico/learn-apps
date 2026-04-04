import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function SingletonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">設計パターン レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">シングルトン</h1>
        <p className="text-gray-400">sync.Onceでスレッドセーフなシングルトンを実装する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">シングルトンパターン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          シングルトンはプログラム全体で1つだけのインスタンスを保証するパターンです。
          Goでは<code className="text-cyan-300">sync.Once</code>を使うことで、
          スレッドセーフに一度だけ初期化を行うことができます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">sync.Once</code> — 一度だけ実行することを保証</li>
          <li><code className="text-cyan-300">once.Do(func())</code> — 2回目以降は何もしない</li>
          <li>並行アクセスでも安全にインスタンスを返す</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">sync.Onceによるシングルトン</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">sync.Once</code>で設定オブジェクトのシングルトンを実装します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sync"
)

type Database struct {
    Host string
    Port int
}

var (
    dbInstance *Database
    dbOnce    sync.Once
)

func GetDB() *Database {
    dbOnce.Do(func() {
        fmt.Println("データベース接続を初期化...")
        dbInstance = &Database{
            Host: "localhost",
            Port: 5432,
        }
    })
    return dbInstance
}

func main() {
    // 複数回呼んでも初期化は1回だけ
    db1 := GetDB()
    db2 := GetDB()
    db3 := GetDB()

    fmt.Printf("db1 == db2: %v\\n", db1 == db2)
    fmt.Printf("db2 == db3: %v\\n", db2 == db3)
    fmt.Printf("接続先: %s:%d\\n", db1.Host, db1.Port)
}`}
          expectedOutput={`データベース接続を初期化...
db1 == db2: true
db2 == db3: true
接続先: localhost:5432`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ジェネリックなシングルトン</h2>
        <p className="text-gray-400 mb-4">
          ジェネリクスを使って汎用的なシングルトンファクトリを作成します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sync"
)

type Singleton[T any] struct {
    once     sync.Once
    instance *T
    init     func() *T
}

func NewSingleton[T any](initFunc func() *T) *Singleton[T] {
    return &Singleton[T]{init: initFunc}
}

func (s *Singleton[T]) Get() *T {
    s.once.Do(func() {
        s.instance = s.init()
    })
    return s.instance
}

type Logger struct {
    Level string
}

type Cache struct {
    MaxSize int
}

func main() {
    loggerSingleton := NewSingleton(func() *Logger {
        fmt.Println("Logger初期化")
        return &Logger{Level: "INFO"}
    })

    cacheSingleton := NewSingleton(func() *Cache {
        fmt.Println("Cache初期化")
        return &Cache{MaxSize: 1000}
    })

    log1 := loggerSingleton.Get()
    log2 := loggerSingleton.Get()
    cache := cacheSingleton.Get()

    fmt.Printf("Logger同一: %v (Level: %s)\\n", log1 == log2, log1.Level)
    fmt.Printf("Cache MaxSize: %d\\n", cache.MaxSize)
}`}
          expectedOutput={`Logger初期化
Cache初期化
Logger同一: true (Level: INFO)
Cache MaxSize: 1000`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">並行アクセスでの安全性</h2>
        <p className="text-gray-400 mb-4">
          複数のゴルーチンから同時にアクセスしても安全にシングルトンが返されます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sync"
)

type AppConfig struct {
    AppName string
    Version string
}

var (
    config     *AppConfig
    configOnce sync.Once
)

func GetConfig() *AppConfig {
    configOnce.Do(func() {
        config = &AppConfig{
            AppName: "MyGoApp",
            Version: "2.0.0",
        }
    })
    return config
}

func main() {
    var wg sync.WaitGroup
    results := make([]*AppConfig, 5)

    // 5つのゴルーチンから同時アクセス
    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func(idx int) {
            defer wg.Done()
            results[idx] = GetConfig()
        }(i)
    }
    wg.Wait()

    // 全て同じインスタンスか確認
    allSame := true
    for i := 1; i < len(results); i++ {
        if results[i] != results[0] {
            allSame = false
            break
        }
    }

    fmt.Printf("全ゴルーチンで同一インスタンス: %v\\n", allSame)
    fmt.Printf("アプリ名: %s\\n", results[0].AppName)
    fmt.Printf("バージョン: %s\\n", results[0].Version)
}`}
          expectedOutput={`全ゴルーチンで同一インスタンス: true
アプリ名: MyGoApp
バージョン: 2.0.0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="singleton" />
      </div>
      <LessonNav lessons={lessons} currentId="singleton" basePath="/learn/design" />
    </div>
  );
}

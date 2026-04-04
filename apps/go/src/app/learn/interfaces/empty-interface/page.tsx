import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("interfaces");

export default function EmptyInterfacePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">インターフェース レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">空インターフェース</h1>
        <p className="text-gray-400">interface{}とanyを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">空インターフェース</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">interface{`{}`}</code> はメソッドを一つも要求しないインターフェースです。
          すべての型がこれを満たすため、任意の値を受け取れます。
          Go 1.18以降は <code className="text-cyan-300">any</code> というエイリアスが使えます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">任意の型を受け取る</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">any</code> 型の引数はどんな値でも受け取れます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func printValue(v any) {
    fmt.Printf("値: %v (型: %T)\\n", v, v)
}

func main() {
    printValue(42)
    printValue("hello")
    printValue(true)
    printValue(3.14)
    printValue([]int{1, 2, 3})
}`}
          expectedOutput={`値: 42 (型: int)
値: hello (型: string)
値: true (型: bool)
値: 3.14 (型: float64)
値: [1 2 3] (型: []int)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">anyのスライスとマップ</h2>
        <p className="text-gray-400 mb-4">
          異なる型の値を1つのスライスやマップに格納できます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // 異なる型を1つのスライスに
    items := []any{1, "hello", true, 3.14}
    for i, item := range items {
        fmt.Printf("[%d] %v (%T)\\n", i, item, item)
    }

    // マップの値をany型に
    fmt.Println("---")
    config := map[string]any{
        "host":  "localhost",
        "port":  8080,
        "debug": true,
    }
    for k, v := range config {
        fmt.Printf("%s: %v\\n", k, v)
    }
}`}
          expectedOutput={`[0] 1 (int)
[1] hello (string)
[2] true (bool)
[3] 3.14 (float64)
---
host: localhost
port: 8080
debug: true`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="interfaces" lessonId="empty-interface" />
      </div>
      <LessonNav lessons={lessons} currentId="empty-interface" basePath="/learn/interfaces" />
    </div>
  );
}

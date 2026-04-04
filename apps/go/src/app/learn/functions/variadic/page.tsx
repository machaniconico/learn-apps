import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function VariadicPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">関数 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">可変長引数</h1>
        <p className="text-gray-400">...を使った可変長引数を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">可変長引数</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">...</code> を型名の前に付けると、任意の数の引数を受け取れます。
          関数内ではスライスとして扱われます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">可変長引数の関数</h2>
        <p className="text-gray-400 mb-4">
          引数の数を自由に指定できます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func sum(numbers ...int) int {
    total := 0
    for _, n := range numbers {
        total += n
    }
    return total
}

func main() {
    fmt.Println(sum(1, 2, 3))
    fmt.Println(sum(10, 20, 30, 40, 50))
    fmt.Println(sum()) // 引数なしも可
}`}
          expectedOutput={`6
150
0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スライスの展開</h2>
        <p className="text-gray-400 mb-4">
          スライスを可変長引数に渡すには <code className="text-cyan-300">...</code> を付けて展開します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func printAll(prefix string, values ...string) {
    for _, v := range values {
        fmt.Printf("%s: %s\\n", prefix, v)
    }
}

func main() {
    printAll("果物", "りんご", "バナナ", "みかん")

    // スライスを展開して渡す
    fmt.Println("---")
    langs := []string{"Go", "Python", "Rust"}
    printAll("言語", langs...)
}`}
          expectedOutput={`果物: りんご
果物: バナナ
果物: みかん
---
言語: Go
言語: Python
言語: Rust`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="variadic" />
      </div>
      <LessonNav lessons={lessons} currentId="variadic" basePath="/learn/functions" />
    </div>
  );
}

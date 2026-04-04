import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function ReturnValuesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">関数 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">戻り値</h1>
        <p className="text-gray-400">単一・複数の戻り値を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">戻り値の基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          関数の戻り値の型は引数の後に指定します。
          <code className="text-cyan-300">return</code> で値を返します。
          戻り値がない関数は型指定を省略できます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">単一の戻り値</h2>
        <p className="text-gray-400 mb-4">
          1つの値を返す基本的な関数です。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "math"
)

func circleArea(radius float64) float64 {
    return math.Pi * radius * radius
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}

func main() {
    area := circleArea(5.0)
    fmt.Printf("半径5の円の面積: %.2f\\n", area)
    fmt.Println("大きい方:", max(10, 25))
}`}
          expectedOutput={`半径5の円の面積: 78.54
大きい方: 25`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">早期リターン</h2>
        <p className="text-gray-400 mb-4">
          条件に応じて早めに <code className="text-cyan-300">return</code> するパターンです。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func classify(score int) string {
    if score < 0 || score > 100 {
        return "不正な値"
    }
    if score >= 90 {
        return "A"
    }
    if score >= 70 {
        return "B"
    }
    return "C"
}

func main() {
    fmt.Println("95:", classify(95))
    fmt.Println("80:", classify(80))
    fmt.Println("50:", classify(50))
    fmt.Println("-1:", classify(-1))
}`}
          expectedOutput={`95: A
80: B
50: C
-1: 不正な値`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="return-values" />
      </div>
      <LessonNav lessons={lessons} currentId="return-values" basePath="/learn/functions" />
    </div>
  );
}

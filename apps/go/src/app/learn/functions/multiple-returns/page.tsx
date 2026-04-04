import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function MultipleReturnsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">関数 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">複数戻り値</h1>
        <p className="text-gray-400">Goの特徴的な複数戻り値を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">複数戻り値</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Goの関数は複数の値を返せます。特にエラー処理で <code className="text-cyan-300">(result, error)</code> パターンが標準的です。
          使わない戻り値は <code className="text-cyan-300">_</code> で無視できます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な複数戻り値</h2>
        <p className="text-gray-400 mb-4">
          複数の値を返して、呼び出し側で受け取ります。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func swap(a, b string) (string, string) {
    return b, a
}

func minMax(numbers []int) (int, int) {
    min, max := numbers[0], numbers[0]
    for _, n := range numbers {
        if n < min {
            min = n
        }
        if n > max {
            max = n
        }
    }
    return min, max
}

func main() {
    x, y := swap("hello", "world")
    fmt.Println(x, y)

    min, max := minMax([]int{3, 1, 4, 1, 5, 9})
    fmt.Printf("最小: %d, 最大: %d\\n", min, max)
}`}
          expectedOutput={`world hello
最小: 1, 最大: 9`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">エラー処理パターン</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">(値, error)</code> は Go で最もよく使われるパターンです。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "strconv"
)

func parseAge(s string) (int, error) {
    age, err := strconv.Atoi(s)
    if err != nil {
        return 0, fmt.Errorf("年齢の解析に失敗: %w", err)
    }
    if age < 0 || age > 150 {
        return 0, fmt.Errorf("不正な年齢: %d", age)
    }
    return age, nil
}

func main() {
    age, err := parseAge("25")
    if err != nil {
        fmt.Println("エラー:", err)
    } else {
        fmt.Println("年齢:", age)
    }

    _, err2 := parseAge("abc")
    if err2 != nil {
        fmt.Println("エラー:", err2)
    }
}`}
          expectedOutput={`年齢: 25
エラー: 年齢の解析に失敗: strconv.Atoi: parsing "abc": invalid syntax`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="multiple-returns" />
      </div>
      <LessonNav lessons={lessons} currentId="multiple-returns" basePath="/learn/functions" />
    </div>
  );
}

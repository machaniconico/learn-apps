import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("generics");

export default function FunctionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">ジェネリクス レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ジェネリック関数</h1>
        <p className="text-gray-400">Map、Filter、Reduceなどのジェネリック関数を実装します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">汎用的なジェネリック関数</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ジェネリクスを使うと、<code className="text-cyan-300">Map</code>、<code className="text-cyan-300">Filter</code>、
          <code className="text-cyan-300">Reduce</code> のような汎用的な高階関数を型安全に実装できます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Map関数</h2>
        <p className="text-gray-400 mb-4">
          スライスの各要素に関数を適用して新しいスライスを返す <code className="text-cyan-300">Map</code> 関数です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func Map[T any, U any](slice []T, fn func(T) U) []U {
    result := make([]U, len(slice))
    for i, v := range slice {
        result[i] = fn(v)
    }
    return result
}

func main() {
    // int → int（2倍にする）
    nums := []int{1, 2, 3, 4, 5}
    doubled := Map(nums, func(n int) int { return n * 2 })
    fmt.Println("2倍:", doubled)

    // string → int（文字列の長さ）
    words := []string{"Go", "言語", "ジェネリクス"}
    lengths := Map(words, func(s string) int { return len(s) })
    fmt.Println("バイト長:", lengths)

    // int → string（フォーマット）
    formatted := Map(nums, func(n int) string {
        return fmt.Sprintf("#%d", n)
    })
    fmt.Println("フォーマット:", formatted)
}`}
          expectedOutput={`2倍: [2 4 6 8 10]
バイト長: [2 6 21]
フォーマット: [#1 #2 #3 #4 #5]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Filter関数</h2>
        <p className="text-gray-400 mb-4">
          条件に一致する要素だけを抽出する <code className="text-cyan-300">Filter</code> 関数です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func Filter[T any](slice []T, predicate func(T) bool) []T {
    var result []T
    for _, v := range slice {
        if predicate(v) {
            result = append(result, v)
        }
    }
    return result
}

func main() {
    nums := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}

    // 偶数のみ
    evens := Filter(nums, func(n int) bool { return n%2 == 0 })
    fmt.Println("偶数:", evens)

    // 5より大きい
    big := Filter(nums, func(n int) bool { return n > 5 })
    fmt.Println("5より大きい:", big)

    // 文字列のフィルタ
    langs := []string{"Go", "Python", "Rust", "Java", "Ruby"}
    short := Filter(langs, func(s string) bool { return len(s) <= 4 })
    fmt.Println("4文字以下:", short)
}`}
          expectedOutput={`偶数: [2 4 6 8 10]
5より大きい: [6 7 8 9 10]
4文字以下: [Go Rust Java Ruby]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Reduce関数</h2>
        <p className="text-gray-400 mb-4">
          スライスを単一の値に集約する <code className="text-cyan-300">Reduce</code> 関数です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func Reduce[T any, U any](slice []T, initial U, fn func(U, T) U) U {
    result := initial
    for _, v := range slice {
        result = fn(result, v)
    }
    return result
}

func main() {
    nums := []int{1, 2, 3, 4, 5}

    // 合計
    sum := Reduce(nums, 0, func(acc, n int) int { return acc + n })
    fmt.Println("合計:", sum)

    // 積
    product := Reduce(nums, 1, func(acc, n int) int { return acc * n })
    fmt.Println("積:", product)

    // 文字列の結合
    words := []string{"Go", "は", "最高"}
    sentence := Reduce(words, "", func(acc, s string) string {
        if acc == "" {
            return s
        }
        return acc + s
    })
    fmt.Println("結合:", sentence)
}`}
          expectedOutput={`合計: 15
積: 120
結合: Goは最高`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="generics" lessonId="functions" />
      </div>
      <LessonNav lessons={lessons} currentId="functions" basePath="/learn/generics" />
    </div>
  );
}

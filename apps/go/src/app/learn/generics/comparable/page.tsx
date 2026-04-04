import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("generics");

export default function ComparablePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">ジェネリクス レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">comparable制約</h1>
        <p className="text-gray-400">comparable制約とmapキーとしての利用を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">comparable とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">comparable</code> は <code className="text-cyan-300">==</code> と
          <code className="text-cyan-300">!=</code> で比較できる型の制約です。mapのキーとして使える型に対応します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>数値型、文字列、真偽値 — comparable</li>
          <li>配列（要素がcomparable）— comparable</li>
          <li>構造体（全フィールドがcomparable）— comparable</li>
          <li>スライス、マップ、関数 — comparable ではない</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">comparable を使った関数</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">comparable</code> 制約で、==による比較が必要な関数を定義します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func IndexOf[T comparable](slice []T, target T) int {
    for i, v := range slice {
        if v == target {
            return i
        }
    }
    return -1
}

func main() {
    nums := []int{10, 20, 30, 40, 50}
    fmt.Println("30のインデックス:", IndexOf(nums, 30))
    fmt.Println("99のインデックス:", IndexOf(nums, 99))

    langs := []string{"Go", "Python", "Rust"}
    fmt.Println("Goのインデックス:", IndexOf(langs, "Go"))
    fmt.Println("Javaのインデックス:", IndexOf(langs, "Java"))
}`}
          expectedOutput={`30のインデックス: 2
99のインデックス: -1
Goのインデックス: 0
Javaのインデックス: -1`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">mapキーとしての利用</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">comparable</code> 制約により、
          ジェネリック関数内でmapのキーとして型パラメータを使用できます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// 重複を除去
func Unique[T comparable](slice []T) []T {
    seen := make(map[T]bool)
    var result []T
    for _, v := range slice {
        if !seen[v] {
            seen[v] = true
            result = append(result, v)
        }
    }
    return result
}

// 出現回数をカウント
func Count[T comparable](slice []T) map[T]int {
    counts := make(map[T]int)
    for _, v := range slice {
        counts[v]++
    }
    return counts
}

func main() {
    nums := []int{1, 2, 3, 2, 1, 4, 3, 5}
    fmt.Println("元:", nums)
    fmt.Println("重複除去:", Unique(nums))

    words := []string{"Go", "Go", "Rust", "Go", "Rust"}
    fmt.Println("カウント:", Count(words))
}`}
          expectedOutput={`元: [1 2 3 2 1 4 3 5]
重複除去: [1 2 3 4 5]
カウント: map[Go:3 Rust:2]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">構造体と comparable</h2>
        <p className="text-gray-400 mb-4">
          フィールドがすべて comparable な構造体は、comparable 制約を満たします。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Point struct {
    X, Y int
}

func Contains[T comparable](slice []T, target T) bool {
    for _, v := range slice {
        if v == target {
            return true
        }
    }
    return false
}

func main() {
    points := []Point{
        {1, 2},
        {3, 4},
        {5, 6},
    }

    fmt.Println("(3,4)を含む:", Contains(points, Point{3, 4}))
    fmt.Println("(7,8)を含む:", Contains(points, Point{7, 8}))

    // 構造体もmapのキーにできる
    visits := map[Point]int{
        {1, 2}: 5,
        {3, 4}: 3,
    }
    fmt.Println("訪問回数:", visits)
}`}
          expectedOutput={`(3,4)を含む: true
(7,8)を含む: false
訪問回数: map[{1 2}:5 {3 4}:3]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="generics" lessonId="comparable" />
      </div>
      <LessonNav lessons={lessons} currentId="comparable" basePath="/learn/generics" />
    </div>
  );
}

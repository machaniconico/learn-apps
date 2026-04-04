import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function MultidimensionalPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">配列・スライス レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">多次元</h1>
        <p className="text-gray-400">2次元スライス[][]Tの作成と操作を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">多次元スライス</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Goではスライスのスライス <code className="text-cyan-300">[][]T</code> で多次元データを表現します。
          行列、グリッド、テーブルデータなどに使えます。各行は独立したスライスなので、行ごとに長さが異なることも可能です。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">2次元スライスの基本</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // リテラルで作成
    matrix := [][]int{
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9},
    }

    // 全要素を表示
    for i, row := range matrix {
        for j, val := range row {
            fmt.Printf("matrix[%d][%d]=%d ", i, j, val)
        }
        fmt.Println()
    }

    // 特定の要素にアクセス
    fmt.Println("matrix[1][2]:", matrix[1][2])
}`}
          expectedOutput={`matrix[0][0]=1 matrix[0][1]=2 matrix[0][2]=3
matrix[1][0]=4 matrix[1][1]=5 matrix[1][2]=6
matrix[2][0]=7 matrix[2][1]=8 matrix[2][2]=9
matrix[1][2]: 6`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">makeで動的に作成</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    rows, cols := 3, 4

    // 2次元スライスを動的に作成
    grid := make([][]int, rows)
    for i := range grid {
        grid[i] = make([]int, cols)
    }

    // 値を設定
    counter := 1
    for i := 0; i < rows; i++ {
        for j := 0; j < cols; j++ {
            grid[i][j] = counter
            counter++
        }
    }

    // 表示
    for _, row := range grid {
        fmt.Println(row)
    }
}`}
          expectedOutput={`[1 2 3 4]
[5 6 7 8]
[9 10 11 12]`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ジャグ配列（不規則な行長）</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // 各行の長さが異なるスライス
    triangle := [][]int{
        {1},
        {1, 1},
        {1, 2, 1},
        {1, 3, 3, 1},
        {1, 4, 6, 4, 1},
    }

    fmt.Println("パスカルの三角形:")
    for _, row := range triangle {
        fmt.Println(row)
    }
}`}
          expectedOutput={`パスカルの三角形:
[1]
[1 1]
[1 2 1]
[1 3 3 1]
[1 4 6 4 1]`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="multidimensional" />
      </div>
      <LessonNav lessons={lessons} currentId="multidimensional" basePath="/learn/arrays" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function SortingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">配列・スライス レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ソート</h1>
        <p className="text-gray-400">sort.Slice、sort.Intsなどを使ったスライスのソートを学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">sortパッケージ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Goの <code className="text-cyan-300">sort</code> パッケージは、スライスのソートに便利な関数を提供します。
          <code className="text-cyan-300">sort.Ints</code>、<code className="text-cyan-300">sort.Strings</code> で基本型をソートし、
          <code className="text-cyan-300">sort.Slice</code> でカスタム比較関数によるソートができます。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本型のソート</h2>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sort"
)

func main() {
    // 整数のソート
    nums := []int{5, 3, 8, 1, 9, 2}
    sort.Ints(nums)
    fmt.Println("整数:", nums)

    // 文字列のソート
    words := []string{"Go", "Python", "Rust", "C", "Java"}
    sort.Strings(words)
    fmt.Println("文字列:", words)

    // float64のソート
    floats := []float64{3.14, 1.41, 2.72, 0.58}
    sort.Float64s(floats)
    fmt.Println("小数:", floats)
}`}
          expectedOutput={`整数: [1 2 3 5 8 9]
文字列: [C Go Java Python Rust]
小数: [0.58 1.41 2.72 3.14]`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">sort.Sliceでカスタムソート</h2>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sort"
)

type Person struct {
    Name string
    Age  int
}

func main() {
    people := []Person{
        {"Alice", 30},
        {"Bob", 25},
        {"Carol", 28},
        {"Dave", 22},
    }

    // 年齢で昇順ソート
    sort.Slice(people, func(i, j int) bool {
        return people[i].Age < people[j].Age
    })
    fmt.Println("年齢順:")
    for _, p := range people {
        fmt.Printf("  %s (%d歳)\\n", p.Name, p.Age)
    }

    // 名前で降順ソート
    sort.Slice(people, func(i, j int) bool {
        return people[i].Name > people[j].Name
    })
    fmt.Println("名前逆順:")
    for _, p := range people {
        fmt.Printf("  %s\\n", p.Name)
    }
}`}
          expectedOutput={`年齢順:
  Dave (22歳)
  Bob (25歳)
  Carol (28歳)
  Alice (30歳)
名前逆順:
  Dave
  Carol
  Bob
  Alice`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ソート済みか確認</h2>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sort"
)

func main() {
    sorted := []int{1, 2, 3, 4, 5}
    unsorted := []int{5, 3, 1, 4, 2}

    fmt.Println("sorted:", sort.IntsAreSorted(sorted))
    fmt.Println("unsorted:", sort.IntsAreSorted(unsorted))

    // 安定ソート（同じキーの要素の順序を保持）
    type Item struct {
        Name     string
        Priority int
    }
    items := []Item{
        {"A", 2}, {"B", 1}, {"C", 2}, {"D", 1},
    }
    sort.SliceStable(items, func(i, j int) bool {
        return items[i].Priority < items[j].Priority
    })
    fmt.Println("安定ソート:")
    for _, item := range items {
        fmt.Printf("  %s (優先度%d)\\n", item.Name, item.Priority)
    }
}`}
          expectedOutput={`sorted: true
unsorted: false
安定ソート:
  B (優先度1)
  D (優先度1)
  A (優先度2)
  C (優先度2)`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="sorting" />
      </div>
      <LessonNav lessons={lessons} currentId="sorting" basePath="/learn/arrays" />
    </div>
  );
}

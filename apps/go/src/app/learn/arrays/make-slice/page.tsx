import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function MakeSlicePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">配列・スライス レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">makeでスライス作成</h1>
        <p className="text-gray-400">make([]T, len, cap)で長さと容量を指定してスライスを作成する方法を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">makeによるスライス作成</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">make([]T, len, cap)</code> でスライスを作成します。
          <code className="text-cyan-300">len</code>は初期長さ、<code className="text-cyan-300">cap</code>は初期容量です。
          容量を省略すると長さと同じになります。適切な容量を指定することで、appendによるメモリ再割り当てを減らせます。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な使い方</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // 長さ3、容量3
    s1 := make([]int, 3)
    fmt.Printf("s1: %v (len=%d, cap=%d)\\n", s1, len(s1), cap(s1))

    // 長さ3、容量5
    s2 := make([]int, 3, 5)
    fmt.Printf("s2: %v (len=%d, cap=%d)\\n", s2, len(s2), cap(s2))

    // 長さ0、容量10（追加用に予約）
    s3 := make([]string, 0, 10)
    fmt.Printf("s3: %v (len=%d, cap=%d)\\n", s3, len(s3), cap(s3))

    s3 = append(s3, "Hello", "Go")
    fmt.Printf("追加後: %v (len=%d, cap=%d)\\n", s3, len(s3), cap(s3))
}`}
          expectedOutput={`s1: [0 0 0] (len=3, cap=3)
s2: [0 0 0] (len=3, cap=5)
s3: [] (len=0, cap=10)
追加後: [Hello Go] (len=2, cap=10)`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">容量を事前に確保する利点</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // 容量を事前確保しない場合
    s1 := []int{}
    for i := 0; i < 5; i++ {
        s1 = append(s1, i)
        fmt.Printf("追加%d: len=%d, cap=%d\\n", i, len(s1), cap(s1))
    }

    fmt.Println("---")

    // 容量を事前確保する場合
    s2 := make([]int, 0, 5)
    for i := 0; i < 5; i++ {
        s2 = append(s2, i)
        fmt.Printf("追加%d: len=%d, cap=%d\\n", i, len(s2), cap(s2))
    }
}`}
          expectedOutput={`追加0: len=1, cap=1
追加1: len=2, cap=2
追加2: len=3, cap=4
追加3: len=4, cap=4
追加4: len=5, cap=8
---
追加0: len=1, cap=5
追加1: len=2, cap=5
追加2: len=3, cap=5
追加3: len=4, cap=5
追加4: len=5, cap=5`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実用的な例</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func filterEven(nums []int) []int {
    // 結果のスライスを事前確保
    result := make([]int, 0, len(nums)/2)
    for _, n := range nums {
        if n%2 == 0 {
            result = append(result, n)
        }
    }
    return result
}

func main() {
    nums := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
    evens := filterEven(nums)
    fmt.Println("偶数:", evens)
}`}
          expectedOutput={`偶数: [2 4 6 8 10]`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="make-slice" />
      </div>
      <LessonNav lessons={lessons} currentId="make-slice" basePath="/learn/arrays" />
    </div>
  );
}

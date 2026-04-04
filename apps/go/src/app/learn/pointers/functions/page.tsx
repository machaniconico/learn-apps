import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pointers");

export default function PointersFunctionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">ポインタ レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">関数とポインタ</h1>
        <p className="text-gray-400">ポインタを関数の引数として渡し、元の値を変更する方法を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">値渡しとポインタ渡し</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Goの関数は引数を<strong>値渡し</strong>します。つまり、関数内で引数を変更しても呼び出し元の変数は変わりません。
          呼び出し元の変数を変更したい場合は、<code className="text-cyan-300">ポインタ</code>を引数として渡します。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">値渡しの問題</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func tryDouble(n int) {
    n = n * 2  // コピーを変更しているだけ
    fmt.Println("関数内:", n)
}

func main() {
    x := 10
    tryDouble(x)
    fmt.Println("関数外:", x)  // 元の値は変わらない
}`}
          expectedOutput={`関数内: 20
関数外: 10`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ポインタ渡しで解決</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func double(n *int) {
    *n = *n * 2  // ポインタ経由で元の値を変更
}

func main() {
    x := 10
    fmt.Println("変更前:", x)

    double(&x)  // アドレスを渡す
    fmt.Println("変更後:", x)
}`}
          expectedOutput={`変更前: 10
変更後: 20`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数の値を変更する関数</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func swap(a, b *int) {
    *a, *b = *b, *a
}

func minMax(nums []int, min, max *int) {
    *min = nums[0]
    *max = nums[0]
    for _, n := range nums {
        if n < *min {
            *min = n
        }
        if n > *max {
            *max = n
        }
    }
}

func main() {
    x, y := 10, 20
    fmt.Printf("交換前: x=%d, y=%d\\n", x, y)
    swap(&x, &y)
    fmt.Printf("交換後: x=%d, y=%d\\n", x, y)

    nums := []int{3, 1, 4, 1, 5, 9, 2, 6}
    var min, max int
    minMax(nums, &min, &max)
    fmt.Printf("最小=%d, 最大=%d\\n", min, max)
}`}
          expectedOutput={`交換前: x=10, y=20
交換後: x=20, y=10
最小=1, 最大=9`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="pointers" lessonId="functions" />
      </div>
      <LessonNav lessons={lessons} currentId="functions" basePath="/learn/pointers" />
    </div>
  );
}

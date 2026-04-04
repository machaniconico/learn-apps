import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function SlicesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">配列・スライス レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">スライス</h1>
        <p className="text-gray-400">可変長のスライス[]Tの作成と基本操作を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">スライスとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          スライスは<code className="text-cyan-300">[]T</code>の形式で宣言する可変長のデータ構造です。
          配列と違い長さが固定されておらず、<code className="text-cyan-300">append</code>で要素を追加できます。
          Goでは配列よりもスライスの方が圧倒的に多く使われます。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スライスの作成</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // リテラルで作成
    s1 := []int{1, 2, 3, 4, 5}
    fmt.Println("s1:", s1)

    // 空のスライス
    s2 := []string{}
    fmt.Println("s2:", s2)
    fmt.Println("s2 == nil:", s2 == nil)

    // var宣言（nilスライス）
    var s3 []int
    fmt.Println("s3:", s3)
    fmt.Println("s3 == nil:", s3 == nil)

    // 配列からスライスを作成
    arr := [5]int{10, 20, 30, 40, 50}
    s4 := arr[1:4]
    fmt.Println("s4:", s4)
}`}
          expectedOutput={`s1: [1 2 3 4 5]
s2: []
s2 == nil: false
s3: []
s3 == nil: true
s4: [20 30 40]`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スライスの長さと容量</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    s := []int{1, 2, 3}
    fmt.Printf("値: %v, 長さ: %d, 容量: %d\\n", s, len(s), cap(s))

    // appendで要素を追加
    s = append(s, 4)
    fmt.Printf("追加後: %v, 長さ: %d, 容量: %d\\n", s, len(s), cap(s))

    s = append(s, 5, 6)
    fmt.Printf("さらに追加: %v, 長さ: %d, 容量: %d\\n", s, len(s), cap(s))
}`}
          expectedOutput={`値: [1 2 3], 長さ: 3, 容量: 3
追加後: [1 2 3 4], 長さ: 4, 容量: 6
さらに追加: [1 2 3 4 5 6], 長さ: 6, 容量: 6`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スライスの走査</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fruits := []string{"りんご", "バナナ", "みかん", "ぶどう"}

    // for rangeで走査
    for i, fruit := range fruits {
        fmt.Printf("%d: %s\\n", i, fruit)
    }

    // インデックスのみ
    fmt.Println("---")
    for i := range fruits {
        fmt.Printf("index: %d\\n", i)
    }

    // 値のみ（_でインデックスを無視）
    fmt.Println("---")
    for _, fruit := range fruits {
        fmt.Println(fruit)
    }
}`}
          expectedOutput={`0: りんご
1: バナナ
2: みかん
3: ぶどう
---
index: 0
index: 1
index: 2
index: 3
---
りんご
バナナ
みかん
ぶどう`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="slices" />
      </div>
      <LessonNav lessons={lessons} currentId="slices" basePath="/learn/arrays" />
    </div>
  );
}

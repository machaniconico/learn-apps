import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function SliceInternalsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">配列・スライス レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">スライスの内部構造</h1>
        <p className="text-gray-400">スライスヘッダ、バッキング配列、容量の仕組みを学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">スライスヘッダ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          スライスは内部的に3つのフィールドを持つヘッダ構造体です。
          <code className="text-cyan-300">ポインタ</code>（バッキング配列の先頭へのポインタ）、
          <code className="text-cyan-300">長さ（len）</code>、<code className="text-cyan-300">容量（cap）</code>です。
          スライスを関数に渡す際、ヘッダはコピーされますがバッキング配列は共有されます。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">バッキング配列の共有</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    original := []int{1, 2, 3, 4, 5}

    // 部分スライスはバッキング配列を共有
    sub := original[1:4]
    fmt.Println("original:", original)
    fmt.Println("sub:", sub)

    // subを変更するとoriginalにも影響
    sub[0] = 20
    fmt.Println("sub[0]=20後:")
    fmt.Println("  original:", original)
    fmt.Println("  sub:", sub)
}`}
          expectedOutput={`original: [1 2 3 4 5]
sub: [2 3 4]
sub[0]=20後:
  original: [1 20 3 4 5]
  sub: [20 3 4]`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">容量の変化とメモリ再割り当て</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    s := make([]int, 0, 4)
    fmt.Printf("初期: len=%d, cap=%d\\n", len(s), cap(s))

    for i := 1; i <= 8; i++ {
        s = append(s, i)
        fmt.Printf("追加%d: len=%d, cap=%d\\n", i, len(s), cap(s))
    }
    // 容量を超えるとGoが自動的に新しい配列を割り当て
    // 容量は概ね2倍ずつ増加する
}`}
          expectedOutput={`初期: len=0, cap=4
追加1: len=1, cap=4
追加2: len=2, cap=4
追加3: len=3, cap=4
追加4: len=4, cap=4
追加5: len=5, cap=8
追加6: len=6, cap=8
追加7: len=7, cap=8
追加8: len=8, cap=8`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">独立したコピーを作る</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    original := []int{1, 2, 3, 4, 5}

    // copyで独立したスライスを作る
    independent := make([]int, len(original))
    copy(independent, original)

    independent[0] = 100
    fmt.Println("original:", original)     // 変わらない
    fmt.Println("independent:", independent)

    // append(nil, s...)でもコピー可能
    another := append([]int(nil), original...)
    another[0] = 999
    fmt.Println("original:", original)     // 変わらない
    fmt.Println("another:", another)
}`}
          expectedOutput={`original: [1 2 3 4 5]
independent: [100 2 3 4 5]
original: [1 2 3 4 5]
another: [999 2 3 4 5]`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="slice-internals" />
      </div>
      <LessonNav lessons={lessons} currentId="slice-internals" basePath="/learn/arrays" />
    </div>
  );
}

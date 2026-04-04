import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function ArraysBasicPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">配列・スライス レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">配列</h1>
        <p className="text-gray-400">固定長配列[N]Tの宣言と操作を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">配列とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Goの配列は<code className="text-cyan-300">[N]T</code>の形式で宣言する固定長のデータ構造です。
          Nは配列の長さ（コンパイル時に決定）、Tは要素の型です。
          配列の長さは型の一部であり、<code className="text-cyan-300">[3]int</code>と<code className="text-cyan-300">[5]int</code>は異なる型です。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列の宣言と初期化</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // 宣言（ゼロ値で初期化）
    var a [5]int
    fmt.Println("ゼロ値:", a)

    // リテラルで初期化
    b := [3]string{"Go", "Python", "Rust"}
    fmt.Println("リテラル:", b)

    // ...で長さを自動推定
    c := [...]int{10, 20, 30, 40}
    fmt.Println("自動推定:", c)
    fmt.Println("長さ:", len(c))
}`}
          expectedOutput={`ゼロ値: [0 0 0 0 0]
リテラル: [Go Python Rust]
自動推定: [10 20 30 40]
長さ: 4`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列の操作</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    arr := [5]int{1, 2, 3, 4, 5}

    // インデックスでアクセス
    fmt.Println("先頭:", arr[0])
    fmt.Println("末尾:", arr[len(arr)-1])

    // 値の変更
    arr[2] = 30
    fmt.Println("変更後:", arr)

    // for rangeで走査
    for i, v := range arr {
        fmt.Printf("index=%d, value=%d\\n", i, v)
    }
}`}
          expectedOutput={`先頭: 1
末尾: 5
変更後: [1 2 30 4 5]
index=0, value=1
index=1, value=2
index=2, value=30
index=3, value=4
index=4, value=5`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列は値型</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    a := [3]int{1, 2, 3}
    b := a  // コピーが作成される

    b[0] = 100
    fmt.Println("a:", a)  // 変わらない
    fmt.Println("b:", b)  // 変わる

    // 比較も可能
    c := [3]int{1, 2, 3}
    fmt.Println("a == c:", a == c)
    fmt.Println("a == b:", a == b)
}`}
          expectedOutput={`a: [1 2 3]
b: [100 2 3]
a == c: true
a == b: false`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="arrays" />
      </div>
      <LessonNav lessons={lessons} currentId="arrays" basePath="/learn/arrays" />
    </div>
  );
}

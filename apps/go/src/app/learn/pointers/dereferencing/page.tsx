import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pointers");

export default function DereferencingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">ポインタ レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">参照と間接参照</h1>
        <p className="text-gray-400">ポインタを通じて値を読み書きする方法を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">デリファレンスとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          デリファレンス（間接参照）は、ポインタが指すメモリ上の値にアクセスすることです。
          <code className="text-cyan-300">*p</code> のように <code className="text-cyan-300">*</code> をポインタ変数の前に置くと、
          そのポインタが指す先の値を読み書きできます。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">値の読み取り</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    x := 42
    p := &x

    // デリファレンスで値を読み取り
    fmt.Println("ポインタpが指す値:", *p)

    // 元の変数を変更するとポインタ経由でも反映される
    x = 100
    fmt.Println("x変更後の*p:", *p)
}`}
          expectedOutput={`ポインタpが指す値: 42
x変更後の*p: 100`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">値の書き込み</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    x := 10
    p := &x

    fmt.Println("変更前のx:", x)

    // ポインタ経由で値を書き込み
    *p = 50
    fmt.Println("*p=50 後のx:", x)

    *p = *p + 25
    fmt.Println("*p+25 後のx:", x)
}`}
          expectedOutput={`変更前のx: 10
*p=50 後のx: 50
*p+25 後のx: 75`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数のポインタが同じ変数を指す</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    x := 100
    p1 := &x
    p2 := &x

    fmt.Println("p1 == p2:", p1 == p2)  // 同じアドレス
    fmt.Println("*p1:", *p1)
    fmt.Println("*p2:", *p2)

    // p1経由で変更するとp2でも反映
    *p1 = 200
    fmt.Println("p1で変更後の*p2:", *p2)
    fmt.Println("p1で変更後のx:", x)
}`}
          expectedOutput={`p1 == p2: true
*p1: 100
*p2: 100
p1で変更後の*p2: 200
p1で変更後のx: 200`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="pointers" lessonId="dereferencing" />
      </div>
      <LessonNav lessons={lessons} currentId="dereferencing" basePath="/learn/pointers" />
    </div>
  );
}

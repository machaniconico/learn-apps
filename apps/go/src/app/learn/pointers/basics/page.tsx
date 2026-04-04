import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pointers");

export default function PointersBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">ポインタ レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ポインタの基本</h1>
        <p className="text-gray-400">*と&演算子を使ったポインタの宣言と基本操作を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ポインタとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ポインタとは、変数のメモリアドレスを格納する変数です。Goでは <code className="text-cyan-300">*T</code> でT型へのポインタ型を宣言し、
          <code className="text-cyan-300">&</code> 演算子で変数のアドレスを取得します。
          ポインタを使うことで、値のコピーを避けてメモリ効率を上げたり、関数から元の変数を変更したりできます。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ポインタの宣言とアドレス取得</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // 変数の宣言
    x := 42

    // ポインタの宣言（&でアドレスを取得）
    var p *int = &x

    fmt.Println("xの値:", x)
    fmt.Println("xのアドレス:", &x)
    fmt.Println("pの値（アドレス）:", p)
    fmt.Printf("pの型: %T\\n", p)
}`}
          expectedOutput={`xの値: 42
xのアドレス: 0xc0000b6010
pの値（アドレス）: 0xc0000b6010
pの型: *int`}
        />
      </section>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">*と&の違い</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">&</code> はアドレス演算子で、変数のメモリアドレスを取得します。
          <code className="text-cyan-300">*</code> は2つの用途があります。型名の前では「ポインタ型」を表し（例: <code className="text-cyan-300">*int</code>）、
          ポインタ変数の前では「デリファレンス（間接参照）」を行い、ポインタが指す値を読み書きします。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">短縮宣言でポインタを作る</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    name := "Go言語"
    ptr := &name  // 短縮宣言でポインタ取得

    fmt.Println("name:", name)
    fmt.Println("ptr が指す値:", *ptr)
    fmt.Printf("ptr の型: %T\\n", ptr)

    // 各型のポインタ
    num := 100
    flag := true
    pi := 3.14

    fmt.Println("int pointer:", &num)
    fmt.Println("bool pointer:", &flag)
    fmt.Println("float64 pointer:", &pi)
}`}
          expectedOutput={`name: Go言語
ptr が指す値: Go言語
ptr の型: *string
int pointer: 0xc0000b6020
bool pointer: 0xc0000b6028
float64 pointer: 0xc0000b6030`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ポインタのゼロ値</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // ポインタのゼロ値はnil
    var p *int
    fmt.Println("ポインタのゼロ値:", p)
    fmt.Println("nilかどうか:", p == nil)

    // 値を代入するとnilではなくなる
    x := 42
    p = &x
    fmt.Println("代入後:", p)
    fmt.Println("nilかどうか:", p == nil)
}`}
          expectedOutput={`ポインタのゼロ値: <nil>
nilかどうか: true
代入後: 0xc0000b6010
nilかどうか: false`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="pointers" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/pointers" />
    </div>
  );
}

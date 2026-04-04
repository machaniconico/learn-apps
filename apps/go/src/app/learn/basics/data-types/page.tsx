import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function DataTypesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">基礎 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">データ型</h1>
        <p className="text-gray-400">Goの基本的なデータ型を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">基本データ型</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Goには <code className="text-cyan-300">int</code>、<code className="text-cyan-300">float64</code>、
          <code className="text-cyan-300">string</code>、<code className="text-cyan-300">bool</code> など
          の基本データ型があります。静的型付け言語なので、型は宣言時に決まります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">int</code> — 整数型</li>
          <li><code className="text-cyan-300">float64</code> — 浮動小数点数型</li>
          <li><code className="text-cyan-300">string</code> — 文字列型</li>
          <li><code className="text-cyan-300">bool</code> — 真偽値型</li>
          <li><code className="text-cyan-300">complex128</code> — 複素数型</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">各データ型の使用例</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">%T</code> フォーマット動詞で変数の型を確認できます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    var i int = 42
    var f float64 = 3.14
    var s string = "Hello"
    var b bool = true

    fmt.Printf("整数: %d (型: %T)\\n", i, i)
    fmt.Printf("小数: %f (型: %T)\\n", f, f)
    fmt.Printf("文字列: %s (型: %T)\\n", s, s)
    fmt.Printf("真偽値: %t (型: %T)\\n", b, b)
}`}
          expectedOutput={`整数: 42 (型: int)
小数: 3.140000 (型: float64)
文字列: Hello (型: string)
真偽値: true (型: bool)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">型推論</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">:=</code> を使うと、Goが自動的に型を推論します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    a := 100        // int
    b := 2.718      // float64
    c := "Go言語"   // string
    d := true       // bool
    e := 3 + 4i     // complex128

    fmt.Printf("a: %v (型: %T)\\n", a, a)
    fmt.Printf("b: %v (型: %T)\\n", b, b)
    fmt.Printf("c: %v (型: %T)\\n", c, c)
    fmt.Printf("d: %v (型: %T)\\n", d, d)
    fmt.Printf("e: %v (型: %T)\\n", e, e)
}`}
          expectedOutput={`a: 100 (型: int)
b: 2.718 (型: float64)
c: Go言語 (型: string)
d: true (型: bool)
e: (3+4i) (型: complex128)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="data-types" />
      </div>
      <LessonNav lessons={lessons} currentId="data-types" basePath="/learn/basics" />
    </div>
  );
}

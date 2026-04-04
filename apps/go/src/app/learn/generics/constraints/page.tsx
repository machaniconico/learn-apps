import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("generics");

export default function ConstraintsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">ジェネリクス レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">制約</h1>
        <p className="text-gray-400">型制約の定義方法と ~int | ~float64 のような近似型を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">型制約とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          型制約はインターフェースで定義され、ジェネリック関数が受け入れる型を制限します。
          <code className="text-cyan-300">~</code> は近似型（基底型が同じすべての型）を表します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">any</code> — 任意の型（制約なし）</li>
          <li><code className="text-cyan-300">comparable</code> — == で比較可能な型</li>
          <li><code className="text-cyan-300">~int | ~float64</code> — 基底型が int または float64</li>
          <li><code className="text-cyan-300">interface{'{'} Method() {'}'}</code> — メソッド制約</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">型要素による制約</h2>
        <p className="text-gray-400 mb-4">
          インターフェースに型要素を列挙して、受け入れる型を制限します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// 整数型のみ受け入れる制約
type Integer interface {
    ~int | ~int8 | ~int16 | ~int32 | ~int64
}

// 数値型の制約
type Number interface {
    ~int | ~float64
}

func Double[T Number](v T) T {
    return v * 2
}

func Abs[T Integer](v T) T {
    if v < 0 {
        return -v
    }
    return v
}

func main() {
    fmt.Println("Double(5):", Double(5))
    fmt.Println("Double(3.14):", Double(3.14))
    fmt.Println("Abs(-42):", Abs(-42))
    fmt.Println("Abs(10):", Abs(10))
}`}
          expectedOutput={`Double(5): 10
Double(3.14): 6.28
Abs(-42): 42
Abs(10): 10`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">近似型 (~) の意味</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">~int</code> は <code className="text-cyan-300">int</code> を基底型とする
          すべての型を含みます。カスタム型も受け入れます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Meter int
type Second int

type Addable interface {
    ~int | ~float64
}

func Add[T Addable](a, b T) T {
    return a + b
}

func main() {
    // int型
    fmt.Println("int:", Add(10, 20))

    // カスタム型（基底型がint）
    var d1 Meter = 100
    var d2 Meter = 200
    fmt.Println("Meter:", Add(d1, d2))

    var t1 Second = 30
    var t2 Second = 60
    fmt.Println("Second:", Add(t1, t2))

    // float64
    fmt.Println("float64:", Add(1.5, 2.5))
}`}
          expectedOutput={`int: 30
Meter: 300
Second: 90
float64: 4`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">メソッド制約</h2>
        <p className="text-gray-400 mb-4">
          型制約にメソッドを含めることで、特定のメソッドを持つ型のみを受け入れます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Stringer interface {
    String() string
}

func PrintAll[T Stringer](items []T) {
    for i, item := range items {
        fmt.Printf("%d: %s\\n", i+1, item.String())
    }
}

type Color struct {
    Name string
    Hex  string
}

func (c Color) String() string {
    return fmt.Sprintf("%s(%s)", c.Name, c.Hex)
}

func main() {
    colors := []Color{
        {"赤", "#FF0000"},
        {"緑", "#00FF00"},
        {"青", "#0000FF"},
    }
    PrintAll(colors)
}`}
          expectedOutput={`1: 赤(#FF0000)
2: 緑(#00FF00)
3: 青(#0000FF)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="generics" lessonId="constraints" />
      </div>
      <LessonNav lessons={lessons} currentId="constraints" basePath="/learn/generics" />
    </div>
  );
}

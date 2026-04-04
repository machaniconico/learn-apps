import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("generics");

export default function TypesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">ジェネリクス レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ジェネリック型</h1>
        <p className="text-gray-400">型パラメータ付き構造体 Stack[T] などの定義方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ジェネリック型の定義</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          構造体やインターフェースにも型パラメータを付けることができます。
          <code className="text-cyan-300">type Stack[T any] struct</code> のように定義します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Stack[T] の実装</h2>
        <p className="text-gray-400 mb-4">
          ジェネリックなスタックデータ構造を実装します。どの型でも利用できます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Stack[T any] struct {
    items []T
}

func (s *Stack[T]) Push(item T) {
    s.items = append(s.items, item)
}

func (s *Stack[T]) Pop() (T, bool) {
    if len(s.items) == 0 {
        var zero T
        return zero, false
    }
    last := s.items[len(s.items)-1]
    s.items = s.items[:len(s.items)-1]
    return last, true
}

func (s *Stack[T]) Size() int {
    return len(s.items)
}

func main() {
    // int のスタック
    intStack := &Stack[int]{}
    intStack.Push(10)
    intStack.Push(20)
    intStack.Push(30)
    fmt.Println("サイズ:", intStack.Size())

    val, _ := intStack.Pop()
    fmt.Println("Pop:", val)

    // string のスタック
    strStack := &Stack[string]{}
    strStack.Push("Go")
    strStack.Push("Rust")
    s, _ := strStack.Pop()
    fmt.Println("Pop:", s)
}`}
          expectedOutput={`サイズ: 3
Pop: 30
Pop: Rust`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Result[T] 型</h2>
        <p className="text-gray-400 mb-4">
          成功値またはエラーを持つ <code className="text-cyan-300">Result</code> 型を実装します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "errors"
    "fmt"
)

type Result[T any] struct {
    Value T
    Err   error
}

func Ok[T any](value T) Result[T] {
    return Result[T]{Value: value}
}

func Fail[T any](err error) Result[T] {
    return Result[T]{Err: err}
}

func (r Result[T]) Unwrap() (T, error) {
    return r.Value, r.Err
}

func divide(a, b float64) Result[float64] {
    if b == 0 {
        return Fail[float64](errors.New("ゼロ除算"))
    }
    return Ok(a / b)
}

func main() {
    r1 := divide(10, 3)
    if v, err := r1.Unwrap(); err == nil {
        fmt.Printf("10 / 3 = %.2f\\n", v)
    }

    r2 := divide(10, 0)
    if _, err := r2.Unwrap(); err != nil {
        fmt.Println("エラー:", err)
    }
}`}
          expectedOutput={`10 / 3 = 3.33
エラー: ゼロ除算`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Pair[A, B] 型</h2>
        <p className="text-gray-400 mb-4">
          2つの異なる型の値を持つ <code className="text-cyan-300">Pair</code> 型です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Pair[A any, B any] struct {
    First  A
    Second B
}

func NewPair[A any, B any](a A, b B) Pair[A, B] {
    return Pair[A, B]{First: a, Second: b}
}

func (p Pair[A, B]) String() string {
    return fmt.Sprintf("(%v, %v)", p.First, p.Second)
}

func main() {
    p1 := NewPair("名前", "太郎")
    fmt.Println(p1.String())

    p2 := NewPair("年齢", 30)
    fmt.Println(p2.String())

    p3 := NewPair(3.14, true)
    fmt.Println(p3.String())
}`}
          expectedOutput={`(名前, 太郎)
(年齢, 30)
(3.14, true)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="generics" lessonId="types" />
      </div>
      <LessonNav lessons={lessons} currentId="types" basePath="/learn/generics" />
    </div>
  );
}

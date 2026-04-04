import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("generics");

export default function BasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">ジェネリクス レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ジェネリクスの基本</h1>
        <p className="text-gray-400">型パラメータ [T any] の導入と基本的な使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ジェネリクスとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Go 1.18で導入されたジェネリクスは、<code className="text-cyan-300">型パラメータ</code>を使って
          異なる型で再利用できるコードを書く仕組みです。<code className="text-cyan-300">[T any]</code> で任意の型を受け取れます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">[T any]</code> — 任意の型を受け取る型パラメータ</li>
          <li><code className="text-cyan-300">any</code> は <code className="text-cyan-300">interface{'{}'}</code> のエイリアス</li>
          <li>コンパイル時に型安全性が保証される</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">型パラメータの基本</h2>
        <p className="text-gray-400 mb-4">
          関数名の後に <code className="text-cyan-300">[T any]</code> を書くことで、
          型パラメータ付きの関数を定義できます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// T は型パラメータ、any は制約（任意の型）
func Print[T any](value T) {
    fmt.Printf("値: %v (型: %T)\\n", value, value)
}

func main() {
    Print(42)
    Print("Hello")
    Print(3.14)
    Print(true)
}`}
          expectedOutput={`値: 42 (型: int)
値: Hello (型: string)
値: 3.14 (型: float64)
値: true (型: bool)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ジェネリクスなしとの比較</h2>
        <p className="text-gray-400 mb-4">
          ジェネリクスなしでは型ごとに関数を書く必要がありましたが、
          ジェネリクスで1つの関数にまとめられます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// ジェネリクスなし: 型ごとに関数が必要
func ContainsInt(slice []int, target int) bool {
    for _, v := range slice {
        if v == target {
            return true
        }
    }
    return false
}

// ジェネリクスあり: 1つの関数で済む
func Contains[T comparable](slice []T, target T) bool {
    for _, v := range slice {
        if v == target {
            return true
        }
    }
    return false
}

func main() {
    nums := []int{1, 2, 3, 4, 5}
    fmt.Println("int版:", ContainsInt(nums, 3))

    // ジェネリック版はどの型でも使える
    fmt.Println("int:", Contains(nums, 3))
    fmt.Println("string:", Contains([]string{"Go", "Rust", "Python"}, "Go"))
    fmt.Println("float64:", Contains([]float64{1.1, 2.2, 3.3}, 4.4))
}`}
          expectedOutput={`int版: true
int: true
string: true
float64: false`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数の型パラメータ</h2>
        <p className="text-gray-400 mb-4">
          複数の型パラメータをカンマ区切りで指定できます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// 2つの型パラメータ
func Pair[A any, B any](a A, b B) string {
    return fmt.Sprintf("(%v, %v)", a, b)
}

// マップのキーと値を入れ替え
func Invert[K comparable, V comparable](m map[K]V) map[V]K {
    result := make(map[V]K)
    for k, v := range m {
        result[v] = k
    }
    return result
}

func main() {
    fmt.Println(Pair("名前", 42))
    fmt.Println(Pair(true, 3.14))

    original := map[string]int{"a": 1, "b": 2, "c": 3}
    inverted := Invert(original)
    fmt.Println("反転:", inverted)
}`}
          expectedOutput={`(名前, 42)
(true, 3.14)
反転: map[1:a 2:b 3:c]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="generics" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/generics" />
    </div>
  );
}

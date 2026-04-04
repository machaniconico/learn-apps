import { GoEditor } from "@/components/go-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("generics");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Goのジェネリクスで任意の型を受け取る制約は？",
    options: ["interface{}", "any", "T", "object"],
    answer: 1,
    explanation: "any は interface{} のエイリアスで、任意の型を受け入れるジェネリック制約です。",
  },
  {
    question: "型制約で近似型を表すプレフィックスは？",
    options: ["&", "~", "*", "@"],
    answer: 1,
    explanation: "~ は基底型が同じすべての型を含む近似型制約です。例: ~int は int を基底型とするすべての型を含みます。",
  },
  {
    question: "comparable制約はどのような型を受け入れますか？",
    options: [
      "== で比較できる型",
      "< > で比較できる型",
      "すべての型",
      "数値型のみ",
    ],
    answer: 0,
    explanation: "comparable は == と != で比較できる型の制約です。mapのキーとして使用できる型です。",
  },
  {
    question: "Go 1.21の slices.Sort が要求する制約は？",
    options: ["any", "comparable", "cmp.Ordered", "sort.Interface"],
    answer: 2,
    explanation: "slices.Sort は cmp.Ordered 制約を要求し、<, >, == で比較できる型（数値と文字列）に対応します。",
  },
];

export default function GenericsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-red-400 mb-2">ジェネリクス</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Go 1.18で導入されたジェネリクス（型パラメータ）を学びます。型制約、ジェネリック関数、ジェネリック型、
          comparable制約、標準ライブラリのジェネリック関数までをカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="generics" totalLessons={6} color="red" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/generics" color="red" categoryId="generics" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ジェネリック関数の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">[T any]</code> で型パラメータを宣言し、
          異なる型で再利用できる関数を書けます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func PrintSlice[T any](s []T) {
    for i, v := range s {
        if i > 0 {
            fmt.Print(", ")
        }
        fmt.Print(v)
    }
    fmt.Println()
}

func main() {
    PrintSlice([]int{1, 2, 3})
    PrintSlice([]string{"Go", "は", "最高"})
}`}
          expectedOutput={`1, 2, 3
Go, は, 最高`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">型制約の定義</h2>
        <p className="text-gray-400 mb-4">
          インターフェースで<code className="text-cyan-300">型制約</code>を定義し、
          ジェネリック関数が使える型を制限できます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Number interface {
    ~int | ~float64
}

func Sum[T Number](nums []T) T {
    var total T
    for _, n := range nums {
        total += n
    }
    return total
}

func main() {
    ints := []int{1, 2, 3, 4, 5}
    fmt.Println("整数の合計:", Sum(ints))

    floats := []float64{1.5, 2.5, 3.0}
    fmt.Println("小数の合計:", Sum(floats))
}`}
          expectedOutput={`整数の合計: 15
小数の合計: 7`}
        />
      </section>
      <Quiz questions={quizQuestions} color="red" />
    </div>
  );
}

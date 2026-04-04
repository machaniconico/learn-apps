import { GoEditor } from "@/components/go-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Goの配列とスライスの違いは何ですか？",
    options: ["違いはない", "配列は固定長、スライスは可変長", "スライスは固定長、配列は可変長", "配列はint型のみ"],
    answer: 1,
    explanation: "配列は[N]Tで固定長、スライスは[]Tで可変長です。",
  },
  {
    question: "スライスに要素を追加する関数はどれですか？",
    options: ["add()", "push()", "append()", "insert()"],
    answer: 2,
    explanation: "append()関数でスライスに要素を追加します。結果を変数に再代入する必要があります。",
  },
  {
    question: "make([]int, 3, 5) で作成されるスライスの長さと容量はいくつですか？",
    options: ["長さ5, 容量3", "長さ3, 容量5", "長さ3, 容量3", "長さ5, 容量5"],
    answer: 1,
    explanation: "make([]T, len, cap) で長さlenと容量capを指定します。",
  },
  {
    question: "sort.Slice関数の第2引数は何ですか？",
    options: ["ソート順を示すstring", "比較関数(less)", "ソートキー", "最大要素数"],
    answer: 1,
    explanation: "sort.Slice(s, func(i, j int) bool { ... }) の形式で、less関数を渡します。",
  },
];

export default function ArraysPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-green-400 mb-2">配列・スライス</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          配列とスライスはGoのデータ構造の基本です。配列は固定長のデータを扱い、
          スライスは可変長で柔軟なデータ操作を可能にします。
          このカテゴリでは、配列の基本からスライスの内部構造、高度なテクニックまで学びます。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="arrays" totalLessons={8} color="green" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/arrays" color="green" categoryId="arrays" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列とスライスの基本例</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // 配列（固定長）
    arr := [3]int{10, 20, 30}
    fmt.Println("配列:", arr)

    // スライス（可変長）
    s := []int{1, 2, 3}
    s = append(s, 4, 5)
    fmt.Println("スライス:", s)
    fmt.Println("長さ:", len(s), "容量:", cap(s))
}`}
          expectedOutput={`配列: [10 20 30]
スライス: [1 2 3 4 5]
長さ: 5 容量: 6`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スライス操作の例</h2>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sort"
)

func main() {
    nums := []int{5, 3, 8, 1, 9, 2}
    sort.Ints(nums)
    fmt.Println("ソート後:", nums)

    // 部分スライス
    sub := nums[1:4]
    fmt.Println("部分スライス:", sub)
}`}
          expectedOutput={`ソート後: [1 2 3 5 8 9]
部分スライス: [2 3 5]`}
        />
      </section>
      <Quiz questions={quizQuestions} color="green" />
    </div>
  );
}

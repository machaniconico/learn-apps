import { GoEditor } from "@/components/go-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("interfaces");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Goのインターフェースの実装方法は？",
    options: ["implements キーワード", "暗黙的（メソッドを実装するだけ）", "extends キーワード", "register 関数"],
    answer: 1,
    explanation: "Goではインターフェースのメソッドをすべて実装するだけで、暗黙的に実装したことになります。",
  },
  {
    question: "空インターフェース interface{} はどんな値を受け取れる？",
    options: ["int のみ", "構造体のみ", "任意の型の値", "nil のみ"],
    answer: 2,
    explanation: "空インターフェースはメソッドを要求しないので、すべての型の値を受け取れます。Go 1.18以降は any と書けます。",
  },
  {
    question: "型アサーションの構文は？",
    options: ["value.(Type)", "Type(value)", "cast(value, Type)", "value as Type"],
    answer: 0,
    explanation: "i.(Type) の形式で型アサーションを行います。2つ目の戻り値で成功を確認できます。",
  },
  {
    question: "インターフェースの合成とは？",
    options: ["継承", "複数のインターフェースを1つにまとめること", "インターフェースの削除", "型変換"],
    answer: 1,
    explanation: "複数のインターフェースを埋め込んで、1つの大きなインターフェースを作ることです。",
  },
];

export default function InterfacesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-violet-400 mb-2">インターフェース</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">7レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Goのインターフェースを学びます。暗黙的な実装、ポリモーフィズム、
          空インターフェース、型アサーション、型switch、インターフェースの合成をカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="interfaces" totalLessons={7} color="violet" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全7レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/interfaces" color="violet" categoryId="interfaces" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">インターフェースの力</h2>
        <p className="text-gray-400 mb-4">
          インターフェースは「振る舞い」を定義します。メソッドを実装するだけで、
          どの型でもインターフェースを満たせます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "math"
)

type Shape interface {
    Area() float64
}

type Circle struct{ Radius float64 }
type Rectangle struct{ Width, Height float64 }

func (c Circle) Area() float64    { return math.Pi * c.Radius * c.Radius }
func (r Rectangle) Area() float64 { return r.Width * r.Height }

func printArea(s Shape) {
    fmt.Printf("面積: %.2f\\n", s.Area())
}

func main() {
    printArea(Circle{Radius: 5})
    printArea(Rectangle{Width: 3, Height: 4})
}`}
          expectedOutput={`面積: 78.54
面積: 12.00`}
        />
      </section>
      <Quiz questions={quizQuestions} color="violet" />
    </div>
  );
}

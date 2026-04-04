import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("structs");

export default function MethodsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">構造体 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">メソッド</h1>
        <p className="text-gray-400">構造体にメソッドを定義する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">メソッドとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          メソッドは特定の型に紐づいた関数です。レシーバを指定して
          <code className="text-cyan-300">func (レシーバ) メソッド名()</code> の形で定義します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">メソッドの定義</h2>
        <p className="text-gray-400 mb-4">
          値レシーバでメソッドを定義します。レシーバは構造体のコピーを受け取ります。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "math"
)

type Circle struct {
    Radius float64
}

func (c Circle) Area() float64 {
    return math.Pi * c.Radius * c.Radius
}

func (c Circle) Perimeter() float64 {
    return 2 * math.Pi * c.Radius
}

func (c Circle) String() string {
    return fmt.Sprintf("Circle(半径=%.1f)", c.Radius)
}

func main() {
    c := Circle{Radius: 5}
    fmt.Println(c)
    fmt.Printf("面積: %.2f\\n", c.Area())
    fmt.Printf("周長: %.2f\\n", c.Perimeter())
}`}
          expectedOutput={`Circle(半径=5.0)
面積: 78.54
周長: 31.42`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数のメソッド</h2>
        <p className="text-gray-400 mb-4">
          1つの構造体に複数のメソッドを定義できます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type BankAccount struct {
    Owner   string
    Balance int
}

func (a BankAccount) Display() {
    fmt.Printf("%sの残高: %d円\\n", a.Owner, a.Balance)
}

func (a BankAccount) CanWithdraw(amount int) bool {
    return a.Balance >= amount
}

func main() {
    account := BankAccount{Owner: "太郎", Balance: 10000}
    account.Display()

    fmt.Println("5000円引き出せる？", account.CanWithdraw(5000))
    fmt.Println("15000円引き出せる？", account.CanWithdraw(15000))
}`}
          expectedOutput={`太郎の残高: 10000円
5000円引き出せる？ true
15000円引き出せる？ false`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="structs" lessonId="methods" />
      </div>
      <LessonNav lessons={lessons} currentId="methods" basePath="/learn/structs" />
    </div>
  );
}

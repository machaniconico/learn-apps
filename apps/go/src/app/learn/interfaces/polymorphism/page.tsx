import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("interfaces");

export default function PolymorphismPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">インターフェース レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ポリモーフィズム</h1>
        <p className="text-gray-400">インターフェースによる多態性を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ポリモーフィズムとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ポリモーフィズム（多態性）とは、同じインターフェースを通じて異なる型を同一の方法で扱うことです。
          Goではインターフェースでこれを実現します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">図形の面積計算</h2>
        <p className="text-gray-400 mb-4">
          異なる図形を同じインターフェースで扱い、合計面積を計算します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "math"
)

type Shape interface {
    Area() float64
    Name() string
}

type Circle struct{ Radius float64 }
func (c Circle) Area() float64 { return math.Pi * c.Radius * c.Radius }
func (c Circle) Name() string  { return "円" }

type Rectangle struct{ Width, Height float64 }
func (r Rectangle) Area() float64 { return r.Width * r.Height }
func (r Rectangle) Name() string  { return "長方形" }

type Triangle struct{ Base, Height float64 }
func (t Triangle) Area() float64 { return t.Base * t.Height / 2 }
func (t Triangle) Name() string  { return "三角形" }

func totalArea(shapes []Shape) float64 {
    total := 0.0
    for _, s := range shapes {
        fmt.Printf("%s の面積: %.2f\\n", s.Name(), s.Area())
        total += s.Area()
    }
    return total
}

func main() {
    shapes := []Shape{
        Circle{Radius: 5},
        Rectangle{Width: 3, Height: 4},
        Triangle{Base: 6, Height: 8},
    }
    fmt.Printf("合計面積: %.2f\\n", totalArea(shapes))
}`}
          expectedOutput={`円 の面積: 78.54
長方形 の面積: 12.00
三角形 の面積: 24.00
合計面積: 114.54`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">支払い処理の例</h2>
        <p className="text-gray-400 mb-4">
          異なる支払い方法を同じインターフェースで処理します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type PaymentMethod interface {
    Pay(amount int) string
}

type CreditCard struct{ Number string }
func (c CreditCard) Pay(amount int) string {
    return fmt.Sprintf("クレジットカード(%s)で%d円支払い", c.Number, amount)
}

type BankTransfer struct{ BankName string }
func (b BankTransfer) Pay(amount int) string {
    return fmt.Sprintf("%sから%d円振込", b.BankName, amount)
}

func processPayment(method PaymentMethod, amount int) {
    fmt.Println(method.Pay(amount))
}

func main() {
    processPayment(CreditCard{Number: "****-1234"}, 5000)
    processPayment(BankTransfer{BankName: "Go銀行"}, 10000)
}`}
          expectedOutput={`クレジットカード(****-1234)で5000円支払い
Go銀行から10000円振込`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="interfaces" lessonId="polymorphism" />
      </div>
      <LessonNav lessons={lessons} currentId="polymorphism" basePath="/learn/interfaces" />
    </div>
  );
}

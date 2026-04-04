import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("structs");

export default function PointerReceiversPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">構造体 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ポインタレシーバ</h1>
        <p className="text-gray-400">値レシーバとポインタレシーバの違いを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ポインタレシーバ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">*型名</code> をレシーバにすると、構造体を直接変更できます。
          値レシーバはコピーを受け取るため、変更は呼び出し元に反映されません。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>値レシーバ: <code className="text-cyan-300">func (s Struct) Method()</code> — 読み取り専用</li>
          <li>ポインタレシーバ: <code className="text-cyan-300">func (s *Struct) Method()</code> — 変更可能</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">値レシーバ vs ポインタレシーバ</h2>
        <p className="text-gray-400 mb-4">
          値レシーバでは元の構造体は変更されません。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Counter struct {
    Value int
}

// 値レシーバ — コピーを変更
func (c Counter) IncrementValue() {
    c.Value++ // 元は変わらない
}

// ポインタレシーバ — 元を変更
func (c *Counter) Increment() {
    c.Value++
}

func main() {
    c := Counter{Value: 0}

    c.IncrementValue()
    fmt.Println("値レシーバ後:", c.Value) // 0

    c.Increment()
    fmt.Println("ポインタレシーバ後:", c.Value) // 1

    c.Increment()
    c.Increment()
    fmt.Println("2回追加後:", c.Value) // 3
}`}
          expectedOutput={`値レシーバ後: 0
ポインタレシーバ後: 1
2回追加後: 3`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実用例：銀行口座</h2>
        <p className="text-gray-400 mb-4">
          状態を変更するメソッドにはポインタレシーバを使います。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Account struct {
    Name    string
    Balance int
}

func (a *Account) Deposit(amount int) {
    a.Balance += amount
    fmt.Printf("%d円入金 → 残高: %d円\\n", amount, a.Balance)
}

func (a *Account) Withdraw(amount int) bool {
    if a.Balance < amount {
        fmt.Println("残高不足")
        return false
    }
    a.Balance -= amount
    fmt.Printf("%d円出金 → 残高: %d円\\n", amount, a.Balance)
    return true
}

func main() {
    acc := &Account{Name: "太郎", Balance: 5000}
    acc.Deposit(3000)
    acc.Withdraw(2000)
    acc.Withdraw(10000)
}`}
          expectedOutput={`3000円入金 → 残高: 8000円
2000円出金 → 残高: 6000円
残高不足`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="structs" lessonId="pointer-receivers" />
      </div>
      <LessonNav lessons={lessons} currentId="pointer-receivers" basePath="/learn/structs" />
    </div>
  );
}

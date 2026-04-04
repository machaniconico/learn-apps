import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("database");

export default function TransactionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">データベース レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">トランザクション</h1>
        <p className="text-gray-400">db.Begin、tx.Commit、tx.Rollbackの使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">トランザクションとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          トランザクションは複数のSQL操作を一つの原子的な操作としてまとめます。
          すべて成功するか、すべて元に戻すか（ロールバック）のどちらかです。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">tx, err := db.Begin()</code> — トランザクション開始</li>
          <li><code className="text-cyan-300">tx.Commit()</code> — 変更を確定</li>
          <li><code className="text-cyan-300">tx.Rollback()</code> — 変更を取り消し</li>
          <li><code className="text-cyan-300">tx.Query / tx.Exec</code> — トランザクション内でクエリ</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なトランザクション</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">db.Begin()</code> でトランザクションを開始し、
          成功なら <code className="text-cyan-300">Commit</code>、失敗なら <code className="text-cyan-300">Rollback</code> します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fmt.Println("=== トランザクションの基本フロー ===")
    fmt.Println()

    // 成功ケース
    fmt.Println("--- 成功ケース ---")
    fmt.Println("tx, err := db.Begin()")
    fmt.Println("tx.Exec(\"UPDATE accounts SET balance = balance - 1000 WHERE id = 1\")")
    fmt.Println("tx.Exec(\"UPDATE accounts SET balance = balance + 1000 WHERE id = 2\")")
    fmt.Println("tx.Commit()  ← 両方の更新が確定")
    fmt.Println()

    // 失敗ケース
    fmt.Println("--- 失敗ケース ---")
    fmt.Println("tx, err := db.Begin()")
    fmt.Println("tx.Exec(\"UPDATE accounts SET balance = balance - 1000 WHERE id = 1\")")
    fmt.Println("// エラー発生！")
    fmt.Println("tx.Rollback()  ← すべての変更を取り消し")
}`}
          expectedOutput={`=== トランザクションの基本フロー ===

--- 成功ケース ---
tx, err := db.Begin()
tx.Exec("UPDATE accounts SET balance = balance - 1000 WHERE id = 1")
tx.Exec("UPDATE accounts SET balance = balance + 1000 WHERE id = 2")
tx.Commit()  ← 両方の更新が確定

--- 失敗ケース ---
tx, err := db.Begin()
tx.Exec("UPDATE accounts SET balance = balance - 1000 WHERE id = 1")
// エラー発生！
tx.Rollback()  ← すべての変更を取り消し`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">安全なトランザクションパターン</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">defer tx.Rollback()</code> を使うと、エラー時も安全にロールバックされます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "errors"
    "fmt"
)

type Account struct {
    ID      int
    Name    string
    Balance int
}

func transfer(from, to *Account, amount int) error {
    if from.Balance < amount {
        return errors.New("残高不足")
    }
    from.Balance -= amount
    to.Balance += amount
    return nil
}

func main() {
    alice := &Account{1, "Alice", 5000}
    bob := &Account{2, "Bob", 3000}

    fmt.Printf("送金前: %s=%d円, %s=%d円\\n", alice.Name, alice.Balance, bob.Name, bob.Balance)

    // 成功する送金
    err := transfer(alice, bob, 2000)
    if err != nil {
        fmt.Println("Rollback:", err)
    } else {
        fmt.Println("Commit: 送金成功")
    }
    fmt.Printf("送金後: %s=%d円, %s=%d円\\n\\n", alice.Name, alice.Balance, bob.Name, bob.Balance)

    // 失敗する送金（残高不足）
    err = transfer(alice, bob, 10000)
    if err != nil {
        fmt.Println("Rollback:", err)
    } else {
        fmt.Println("Commit: 送金成功")
    }
    fmt.Printf("残高: %s=%d円, %s=%d円\\n", alice.Name, alice.Balance, bob.Name, bob.Balance)
}`}
          expectedOutput={`送金前: Alice=5000円, Bob=3000円
Commit: 送金成功
送金後: Alice=3000円, Bob=5000円

Rollback: 残高不足
残高: Alice=3000円, Bob=5000円`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">トランザクションのヘルパー関数</h2>
        <p className="text-gray-400 mb-4">
          トランザクション処理を関数でラップするとコードがきれいになります。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// トランザクションヘルパーのパターン
func main() {
    fmt.Println("=== トランザクションヘルパー関数 ===")
    fmt.Println()
    fmt.Println("func withTx(db *sql.DB, fn func(*sql.Tx) error) error {")
    fmt.Println("    tx, err := db.Begin()")
    fmt.Println("    if err != nil {")
    fmt.Println("        return err")
    fmt.Println("    }")
    fmt.Println("    defer tx.Rollback() // Commit済みなら何もしない")
    fmt.Println()
    fmt.Println("    if err := fn(tx); err != nil {")
    fmt.Println("        return err // Rollbackはdeferで実行")
    fmt.Println("    }")
    fmt.Println("    return tx.Commit()")
    fmt.Println("}")
    fmt.Println()
    fmt.Println("// 使用例:")
    fmt.Println("err := withTx(db, func(tx *sql.Tx) error {")
    fmt.Println("    tx.Exec(\"INSERT ...\")")
    fmt.Println("    tx.Exec(\"UPDATE ...\")")
    fmt.Println("    return nil // エラーがあればrollback")
    fmt.Println("})")
}`}
          expectedOutput={`=== トランザクションヘルパー関数 ===

func withTx(db *sql.DB, fn func(*sql.Tx) error) error {
    tx, err := db.Begin()
    if err != nil {
        return err
    }
    defer tx.Rollback() // Commit済みなら何もしない

    if err := fn(tx); err != nil {
        return err // Rollbackはdeferで実行
    }
    return tx.Commit()
}

// 使用例:
err := withTx(db, func(tx *sql.Tx) error {
    tx.Exec("INSERT ...")
    tx.Exec("UPDATE ...")
    return nil // エラーがあればrollback
})`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="database" lessonId="transactions" />
      </div>
      <LessonNav lessons={lessons} currentId="transactions" basePath="/learn/database" />
    </div>
  );
}

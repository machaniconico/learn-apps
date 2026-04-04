import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("database");

export default function ScanningPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">データベース レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">スキャン</h1>
        <p className="text-gray-400">rows.Scanの使い方とNULL値の取り扱いを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">rows.Scan の仕組み</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">rows.Scan</code> はSQLの結果カラムをGoの変数にマッピングします。
          カラムの順番と変数の順番が一致する必要があります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">rows.Scan(&amp;id, &amp;name, &amp;email)</code> — ポインタで渡す</li>
          <li><code className="text-cyan-300">sql.NullString</code> — NULL許容の文字列</li>
          <li><code className="text-cyan-300">sql.NullInt64</code> — NULL許容の整数</li>
          <li><code className="text-cyan-300">sql.NullBool</code> — NULL許容の真偽値</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なScan</h2>
        <p className="text-gray-400 mb-4">
          SELECT文のカラム順に合わせて変数のポインタを渡します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Product struct {
    ID    int
    Name  string
    Price int
    Stock int
}

func main() {
    // rows.Scan の使用パターンを解説
    fmt.Println("=== rows.Scan のパターン ===")
    fmt.Println()

    // 模擬データ
    products := []Product{
        {1, "Goプログラミング実践", 3200, 50},
        {2, "Go言語入門", 2800, 30},
        {3, "Goデザインパターン", 3500, 15},
    }

    fmt.Println("// SQL: SELECT id, name, price, stock FROM products")
    fmt.Println("// for rows.Next() {")
    fmt.Println("//     var p Product")
    fmt.Println("//     rows.Scan(&p.ID, &p.Name, &p.Price, &p.Stock)")
    fmt.Println("// }")
    fmt.Println()

    for _, p := range products {
        fmt.Printf("  ID:%d  %-25s  ¥%d  在庫:%d\\n", p.ID, p.Name, p.Price, p.Stock)
    }
}`}
          expectedOutput={`=== rows.Scan のパターン ===

// SQL: SELECT id, name, price, stock FROM products
// for rows.Next() {
//     var p Product
//     rows.Scan(&p.ID, &p.Name, &p.Price, &p.Stock)
// }

  ID:1  Goプログラミング実践             ¥3200  在庫:50
  ID:2  Go言語入門                        ¥2800  在庫:30
  ID:3  Goデザインパターン                ¥3500  在庫:15`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">NULL値の処理</h2>
        <p className="text-gray-400 mb-4">
          SQLのNULLを扱うには <code className="text-cyan-300">sql.NullString</code> などのNull型を使います。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "database/sql"
    "fmt"
)

type Employee struct {
    ID       int
    Name     string
    Email    sql.NullString // NULLの可能性がある
    Phone    sql.NullString
    ManagerID sql.NullInt64
}

func main() {
    employees := []Employee{
        {1, "太郎", sql.NullString{String: "taro@example.com", Valid: true},
            sql.NullString{String: "090-1234-5678", Valid: true},
            sql.NullInt64{Int64: 0, Valid: false}},
        {2, "花子", sql.NullString{String: "hanako@example.com", Valid: true},
            sql.NullString{Valid: false},
            sql.NullInt64{Int64: 1, Valid: true}},
        {3, "一郎", sql.NullString{Valid: false},
            sql.NullString{Valid: false},
            sql.NullInt64{Int64: 1, Valid: true}},
    }

    for _, e := range employees {
        email := "NULL"
        if e.Email.Valid {
            email = e.Email.String
        }
        phone := "NULL"
        if e.Phone.Valid {
            phone = e.Phone.String
        }
        manager := "NULL"
        if e.ManagerID.Valid {
            manager = fmt.Sprintf("%d", e.ManagerID.Int64)
        }
        fmt.Printf("ID:%d  %s  email:%s  phone:%s  manager:%s\\n",
            e.ID, e.Name, email, phone, manager)
    }
}`}
          expectedOutput={`ID:1  太郎  email:taro@example.com  phone:090-1234-5678  manager:NULL
ID:2  花子  email:hanako@example.com  phone:NULL  manager:1
ID:3  一郎  email:NULL  phone:NULL  manager:1`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ポインタによるNULL処理</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">sql.NullString</code> の代わりに、
          ポインタ型（<code className="text-cyan-300">*string</code>）を使う方法もあります。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type User struct {
    ID    int
    Name  string
    Bio   *string // nilならNULL
    Age   *int    // nilならNULL
}

func strPtr(s string) *string { return &s }
func intPtr(i int) *int { return &i }

func printField(label string, val interface{}) {
    if val == nil {
        fmt.Printf("  %s: NULL\\n", label)
    } else {
        fmt.Printf("  %s: %v\\n", label, val)
    }
}

func main() {
    users := []User{
        {1, "太郎", strPtr("Goが好き"), intPtr(30)},
        {2, "花子", nil, intPtr(25)},
        {3, "一郎", strPtr("新人です"), nil},
    }

    for _, u := range users {
        fmt.Printf("User %d: %s\\n", u.ID, u.Name)
        if u.Bio != nil {
            printField("Bio", *u.Bio)
        } else {
            printField("Bio", nil)
        }
        if u.Age != nil {
            printField("Age", *u.Age)
        } else {
            printField("Age", nil)
        }
        fmt.Println()
    }
}`}
          expectedOutput={`User 1: 太郎
  Bio: Goが好き
  Age: 30

User 2: 花子
  Bio: NULL
  Age: 25

User 3: 一郎
  Bio: 新人です
  Age: NULL
`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="database" lessonId="scanning" />
      </div>
      <LessonNav lessons={lessons} currentId="scanning" basePath="/learn/database" />
    </div>
  );
}

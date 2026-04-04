import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("database");

export default function SqlxPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">データベース レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">sqlxの紹介</h1>
        <p className="text-gray-400">sqlxライブラリのStructScan、NamedExecなどの機能を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">sqlx とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">sqlx</code> は <code className="text-cyan-300">database/sql</code> を拡張した
          ライブラリで、構造体への自動マッピング、名前付きパラメータ、IN句のサポートなどを提供します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">sqlx.Select(&amp;users, sql, args...)</code> — スライスに自動マッピング</li>
          <li><code className="text-cyan-300">sqlx.Get(&amp;user, sql, args...)</code> — 単一行を自動マッピング</li>
          <li><code className="text-cyan-300">sqlx.NamedExec(sql, map)</code> — 名前付きパラメータ</li>
          <li><code className="text-cyan-300">sqlx.In(sql, args)</code> — IN句の展開</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">構造体への自動マッピング</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">db</code> タグで構造体フィールドとカラム名を対応付けます。
          <code className="text-cyan-300">rows.Scan</code> を手動で書く必要がなくなります。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "encoding/json"
    "fmt"
    "os"
)

// db タグでカラム名を指定
type User struct {
    ID        int    \`db:"id"        json:"id"\`
    Name      string \`db:"name"      json:"name"\`
    Email     string \`db:"email"     json:"email"\`
    CreatedAt string \`db:"created_at" json:"created_at"\`
}

func main() {
    // sqlx.Select の使い方を解説
    fmt.Println("// database/sql の場合:")
    fmt.Println("// rows, _ := db.Query(\"SELECT ...\")")
    fmt.Println("// for rows.Next() {")
    fmt.Println("//     rows.Scan(&u.ID, &u.Name, &u.Email, &u.CreatedAt)")
    fmt.Println("// }")
    fmt.Println()
    fmt.Println("// sqlx の場合（はるかに簡潔）:")
    fmt.Println("// var users []User")
    fmt.Println("// db.Select(&users, \"SELECT * FROM users\")")
    fmt.Println()

    // 結果の模擬
    users := []User{
        {1, "太郎", "taro@example.com", "2024-01-15"},
        {2, "花子", "hanako@example.com", "2024-02-20"},
    }

    fmt.Println("=== 結果 ===")
    enc := json.NewEncoder(os.Stdout)
    enc.SetIndent("", "  ")
    enc.Encode(users)
}`}
          expectedOutput={`// database/sql の場合:
// rows, _ := db.Query("SELECT ...")
// for rows.Next() {
//     rows.Scan(&u.ID, &u.Name, &u.Email, &u.CreatedAt)
// }

// sqlx の場合（はるかに簡潔）:
// var users []User
// db.Select(&users, "SELECT * FROM users")

=== 結果 ===
[
  {
    "id": 1,
    "name": "太郎",
    "email": "taro@example.com",
    "created_at": "2024-01-15"
  },
  {
    "id": 2,
    "name": "花子",
    "email": "hanako@example.com",
    "created_at": "2024-02-20"
  }
]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">名前付きパラメータ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">NamedExec</code> で構造体やマップから名前付きパラメータを展開できます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type CreateUserInput struct {
    Name  string \`db:"name"\`
    Email string \`db:"email"\`
    Role  string \`db:"role"\`
}

func main() {
    // NamedExec の使い方
    fmt.Println("=== NamedExec による名前付きパラメータ ===")
    fmt.Println()

    input := CreateUserInput{
        Name:  "太郎",
        Email: "taro@example.com",
        Role:  "admin",
    }

    sql := "INSERT INTO users (name, email, role) VALUES (:name, :email, :role)"
    fmt.Println("SQL:", sql)
    fmt.Printf("パラメータ: name=%s, email=%s, role=%s\\n", input.Name, input.Email, input.Role)
    fmt.Println()

    // マップでも可能
    fmt.Println("=== マップ版 ===")
    params := map[string]interface{}{
        "name":  "花子",
        "email": "hanako@example.com",
        "role":  "user",
    }
    fmt.Printf("パラメータ: %v\\n", params)
    fmt.Println()

    fmt.Println("※ $1, $2 の代わりに :name, :email のような名前付きパラメータを使用")
}`}
          expectedOutput={`=== NamedExec による名前付きパラメータ ===

SQL: INSERT INTO users (name, email, role) VALUES (:name, :email, :role)
パラメータ: name=太郎, email=taro@example.com, role=admin

=== マップ版 ===
パラメータ: map[email:hanako@example.com name:花子 role:user]

※ $1, $2 の代わりに :name, :email のような名前付きパラメータを使用`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">database/sql vs sqlx 比較</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">sqlx</code> を使うことで、ボイラープレートコードを大幅に削減できます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    comparisons := []struct {
        feature string
        stdLib  string
        sqlx    string
    }{
        {
            "複数行取得",
            "rows.Next() + rows.Scan(...)",
            "db.Select(&slice, sql)",
        },
        {
            "単一行取得",
            "row.Scan(...)",
            "db.Get(&struct, sql)",
        },
        {
            "パラメータ",
            "$1, $2, $3",
            ":name, :email",
        },
        {
            "IN句",
            "手動で $1,$2,$3 生成",
            "sqlx.In(sql, ids)",
        },
        {
            "NULLハンドリング",
            "sql.NullString",
            "sql.NullString (同じ)",
        },
    }

    fmt.Println("=== database/sql vs sqlx ===")
    fmt.Println()
    for _, c := range comparisons {
        fmt.Printf("  [%s]\\n", c.feature)
        fmt.Printf("    標準: %s\\n", c.stdLib)
        fmt.Printf("    sqlx: %s\\n\\n", c.sqlx)
    }
}`}
          expectedOutput={`=== database/sql vs sqlx ===

  [複数行取得]
    標準: rows.Next() + rows.Scan(...)
    sqlx: db.Select(&slice, sql)

  [単一行取得]
    標準: row.Scan(...)
    sqlx: db.Get(&struct, sql)

  [パラメータ]
    標準: $1, $2, $3
    sqlx: :name, :email

  [IN句]
    標準: 手動で $1,$2,$3 生成
    sqlx: sqlx.In(sql, ids)

  [NULLハンドリング]
    標準: sql.NullString
    sqlx: sql.NullString (同じ)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="database" lessonId="sqlx" />
      </div>
      <LessonNav lessons={lessons} currentId="sqlx" basePath="/learn/database" />
    </div>
  );
}

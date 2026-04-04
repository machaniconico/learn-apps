import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("database");

export default function QueriesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">データベース レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">クエリ</h1>
        <p className="text-gray-400">db.Query、db.QueryRow、db.Execの使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">3つのクエリメソッド</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">database/sql</code> は用途に応じた3つのクエリメソッドを提供します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">db.Query(sql, args...)</code> — 複数行を返すSELECT</li>
          <li><code className="text-cyan-300">db.QueryRow(sql, args...)</code> — 1行だけ返すSELECT</li>
          <li><code className="text-cyan-300">db.Exec(sql, args...)</code> — INSERT/UPDATE/DELETE</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">db.Query で複数行取得</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">db.Query</code> は <code className="text-cyan-300">*sql.Rows</code> を返します。
          <code className="text-cyan-300">rows.Next()</code> と <code className="text-cyan-300">rows.Scan()</code> で走査します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// データベースの結果を模擬
type User struct {
    ID    int
    Name  string
    Email string
}

func queryUsers() []User {
    // db.Query("SELECT id, name, email FROM users") の結果を模擬
    return []User{
        {1, "田中太郎", "tanaka@example.com"},
        {2, "佐藤花子", "sato@example.com"},
        {3, "鈴木一郎", "suzuki@example.com"},
    }
}

func main() {
    fmt.Println("// rows, err := db.Query(\"SELECT id, name, email FROM users\")")
    fmt.Println("// defer rows.Close()  ← 必ずクローズ！")
    fmt.Println("// for rows.Next() {")
    fmt.Println("//     rows.Scan(&id, &name, &email)")
    fmt.Println("// }")
    fmt.Println()

    users := queryUsers()
    fmt.Println("=== ユーザー一覧 ===")
    for _, u := range users {
        fmt.Printf("  ID:%d  名前:%-10s  メール:%s\\n", u.ID, u.Name, u.Email)
    }
    fmt.Printf("\\n合計: %d件\\n", len(users))
}`}
          expectedOutput={`// rows, err := db.Query("SELECT id, name, email FROM users")
// defer rows.Close()  ← 必ずクローズ！
// for rows.Next() {
//     rows.Scan(&id, &name, &email)
// }

=== ユーザー一覧 ===
  ID:1  名前:田中太郎       メール:tanaka@example.com
  ID:2  名前:佐藤花子       メール:sato@example.com
  ID:3  名前:鈴木一郎       メール:suzuki@example.com

合計: 3件`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">db.QueryRow で単一行取得</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">db.QueryRow</code> は1行だけ取得します。
          行がない場合は <code className="text-cyan-300">sql.ErrNoRows</code> を返します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "errors"
    "fmt"
)

// sql.ErrNoRows を模擬
var ErrNoRows = errors.New("sql: no rows in result set")

type User struct {
    ID   int
    Name string
}

func queryRow(id int) (User, error) {
    // db.QueryRow("SELECT id, name FROM users WHERE id = $1", id)
    users := map[int]string{1: "太郎", 2: "花子"}
    if name, ok := users[id]; ok {
        return User{id, name}, nil
    }
    return User{}, ErrNoRows
}

func main() {
    // 存在するユーザー
    user, err := queryRow(1)
    if err != nil {
        fmt.Println("エラー:", err)
    } else {
        fmt.Printf("取得: ID=%d, Name=%s\\n", user.ID, user.Name)
    }

    // 存在しないユーザー
    _, err = queryRow(99)
    if errors.Is(err, ErrNoRows) {
        fmt.Println("ユーザーが見つかりません (sql.ErrNoRows)")
    } else if err != nil {
        fmt.Println("DBエラー:", err)
    }
}`}
          expectedOutput={`取得: ID=1, Name=太郎
ユーザーが見つかりません (sql.ErrNoRows)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">db.Exec で更新系クエリ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">db.Exec</code> はINSERT/UPDATE/DELETEに使います。
          <code className="text-cyan-300">sql.Result</code> から影響行数やIDを取得できます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// sql.Result を模擬
type Result struct {
    lastID   int64
    affected int64
}

func (r Result) LastInsertId() (int64, error) { return r.lastID, nil }
func (r Result) RowsAffected() (int64, error) { return r.affected, nil }

func insertUser(name, email string) Result {
    // db.Exec("INSERT INTO users (name, email) VALUES ($1, $2)", name, email)
    fmt.Printf("INSERT: name=%s, email=%s\\n", name, email)
    return Result{lastID: 4, affected: 1}
}

func updateUser(id int, name string) Result {
    // db.Exec("UPDATE users SET name = $1 WHERE id = $2", name, id)
    fmt.Printf("UPDATE: id=%d, name=%s\\n", id, name)
    return Result{affected: 1}
}

func main() {
    // INSERT
    result := insertUser("新井次郎", "arai@example.com")
    id, _ := result.LastInsertId()
    fmt.Printf("→ LastInsertId: %d\\n\\n", id)

    // UPDATE
    result = updateUser(1, "田中太郎（更新）")
    rows, _ := result.RowsAffected()
    fmt.Printf("→ RowsAffected: %d\\n", rows)
}`}
          expectedOutput={`INSERT: name=新井次郎, email=arai@example.com
→ LastInsertId: 4

UPDATE: id=1, name=田中太郎（更新）
→ RowsAffected: 1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="database" lessonId="queries" />
      </div>
      <LessonNav lessons={lessons} currentId="queries" basePath="/learn/database" />
    </div>
  );
}

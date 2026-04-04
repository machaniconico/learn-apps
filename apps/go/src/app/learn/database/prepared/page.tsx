import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("database");

export default function PreparedPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">データベース レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">プリペアドステートメント</h1>
        <p className="text-gray-400">db.PrepareとSQLインジェクション対策を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">プリペアドステートメントとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">db.Prepare</code> でSQLを事前にコンパイルし、パラメータだけ変えて繰り返し実行できます。
          SQLインジェクション対策としても重要です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">db.Prepare(sql)</code> — ステートメントの準備</li>
          <li><code className="text-cyan-300">stmt.Query(args...)</code> — パラメータ付きクエリ</li>
          <li><code className="text-cyan-300">stmt.Exec(args...)</code> — パラメータ付き実行</li>
          <li><code className="text-cyan-300">stmt.Close()</code> — ステートメントのクローズ</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">プレースホルダの使い方</h2>
        <p className="text-gray-400 mb-4">
          データベースによってプレースホルダの形式が異なります。パラメータは安全にエスケープされます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // 各データベースのプレースホルダ形式
    formats := []struct {
        db       string
        style    string
        example  string
    }{
        {"PostgreSQL", "$1, $2, ...", "WHERE id = $1 AND name = $2"},
        {"MySQL", "?, ?, ...", "WHERE id = ? AND name = ?"},
        {"SQLite", "?, ?, ...", "WHERE id = ? AND name = ?"},
        {"Oracle", ":name", "WHERE id = :id AND name = :name"},
    }

    fmt.Println("=== プレースホルダ形式 ===")
    for _, f := range formats {
        fmt.Printf("  %-12s %s\\n", f.db+":", f.style)
        fmt.Printf("             例: %s\\n\\n", f.example)
    }
}`}
          expectedOutput={`=== プレースホルダ形式 ===
  PostgreSQL:  $1, $2, ...
             例: WHERE id = $1 AND name = $2

  MySQL:       ?, ?, ...
             例: WHERE id = ? AND name = ?

  SQLite:      ?, ?, ...
             例: WHERE id = ? AND name = ?

  Oracle:      :name
             例: WHERE id = :id AND name = :name`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">SQLインジェクション対策</h2>
        <p className="text-gray-400 mb-4">
          文字列連結でSQLを組み立てるのは危険です。必ずプレースホルダを使いましょう。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    userInput := "'; DROP TABLE users; --"

    // 危険: 文字列連結
    unsafeSQL := fmt.Sprintf("SELECT * FROM users WHERE name = '%s'", userInput)
    fmt.Println("=== 危険なSQL（文字列連結）===")
    fmt.Println(unsafeSQL)
    fmt.Println("↑ SQLインジェクションが可能！")

    // 安全: プレースホルダ
    fmt.Println()
    fmt.Println("=== 安全なSQL（プレースホルダ）===")
    fmt.Println("db.Query(\"SELECT * FROM users WHERE name = $1\", userInput)")
    fmt.Println("↑ userInput はパラメータとして安全に処理される")

    fmt.Println()
    fmt.Println("=== ルール ===")
    fmt.Println("  × fmt.Sprintf でSQLを組み立てない")
    fmt.Println("  × 文字列連結 + でSQLを組み立てない")
    fmt.Println("  ○ 常にプレースホルダ ($1, ?) を使う")
}`}
          expectedOutput={`=== 危険なSQL（文字列連結）===
SELECT * FROM users WHERE name = ''; DROP TABLE users; --'
↑ SQLインジェクションが可能！

=== 安全なSQL（プレースホルダ）===
db.Query("SELECT * FROM users WHERE name = $1", userInput)
↑ userInput はパラメータとして安全に処理される

=== ルール ===
  × fmt.Sprintf でSQLを組み立てない
  × 文字列連結 + でSQLを組み立てない
  ○ 常にプレースホルダ ($1, ?) を使う`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Prepare の使用パターン</h2>
        <p className="text-gray-400 mb-4">
          同じクエリを繰り返し実行する場合は <code className="text-cyan-300">db.Prepare</code> が効率的です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // db.Prepare の使用パターン
    fmt.Println("=== プリペアドステートメントのパターン ===")
    fmt.Println()

    fmt.Println("// 1. ステートメントの準備")
    fmt.Println("stmt, err := db.Prepare(\"INSERT INTO users (name, email) VALUES ($1, $2)\")")
    fmt.Println("if err != nil { log.Fatal(err) }")
    fmt.Println("defer stmt.Close()")
    fmt.Println()

    // バッチ挿入の模擬
    users := []struct {
        name  string
        email string
    }{
        {"太郎", "taro@example.com"},
        {"花子", "hanako@example.com"},
        {"一郎", "ichiro@example.com"},
    }

    fmt.Println("// 2. 同じステートメントを繰り返し実行")
    for _, u := range users {
        fmt.Printf("stmt.Exec(\"%s\", \"%s\")\\n", u.name, u.email)
    }

    fmt.Printf("\\n→ %d件のINSERTを効率的に実行\\n", len(users))
}`}
          expectedOutput={`=== プリペアドステートメントのパターン ===

// 1. ステートメントの準備
stmt, err := db.Prepare("INSERT INTO users (name, email) VALUES ($1, $2)")
if err != nil { log.Fatal(err) }
defer stmt.Close()

// 2. 同じステートメントを繰り返し実行
stmt.Exec("太郎", "taro@example.com")
stmt.Exec("花子", "hanako@example.com")
stmt.Exec("一郎", "ichiro@example.com")

→ 3件のINSERTを効率的に実行`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="database" lessonId="prepared" />
      </div>
      <LessonNav lessons={lessons} currentId="prepared" basePath="/learn/database" />
    </div>
  );
}

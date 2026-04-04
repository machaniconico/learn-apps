import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("database");

export default function SqlBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">データベース レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">database/sqlの基本</h1>
        <p className="text-gray-400">database/sqlパッケージの基本概念、sql.Open、Pingを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">database/sql パッケージ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">database/sql</code> はGoの標準ライブラリに含まれるSQL用の汎用インターフェースです。
          具体的なデータベースドライバ（MySQL、PostgreSQL等）は別途インポートします。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">sql.Open(driver, dsn)</code> — DB接続プールを開く</li>
          <li><code className="text-cyan-300">db.Ping()</code> — 接続の確認</li>
          <li><code className="text-cyan-300">db.Close()</code> — 接続プールのクローズ</li>
          <li><code className="text-cyan-300">sql.DB</code> はコネクションプールを管理</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">sql.Open の仕組み</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">sql.Open</code> はコネクションプールを初期化しますが、
          実際の接続は初めてのクエリ時に行われます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // sql.Open の使用パターン
    fmt.Println("=== データベース接続の流れ ===")
    fmt.Println()

    steps := []struct {
        step int
        code string
        desc string
    }{
        {1, "import _ \"github.com/lib/pq\"", "ドライバをimport（副作用のみ）"},
        {2, "db, err := sql.Open(\"postgres\", dsn)", "コネクションプール初期化"},
        {3, "defer db.Close()", "プログラム終了時にクローズ"},
        {4, "err = db.Ping()", "実際に接続を確認"},
        {5, "db.SetMaxOpenConns(25)", "最大接続数を設定"},
        {6, "db.SetMaxIdleConns(5)", "アイドル接続数を設定"},
    }

    for _, s := range steps {
        fmt.Printf("  %d. %s\\n     → %s\\n\\n", s.step, s.code, s.desc)
    }
}`}
          expectedOutput={`=== データベース接続の流れ ===

  1. import _ "github.com/lib/pq"
     → ドライバをimport（副作用のみ）

  2. db, err := sql.Open("postgres", dsn)
     → コネクションプール初期化

  3. defer db.Close()
     → プログラム終了時にクローズ

  4. err = db.Ping()
     → 実際に接続を確認

  5. db.SetMaxOpenConns(25)
     → 最大接続数を設定

  6. db.SetMaxIdleConns(5)
     → アイドル接続数を設定`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">DSN（接続文字列）</h2>
        <p className="text-gray-400 mb-4">
          DSN（Data Source Name）はデータベースへの接続情報を含む文字列です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // 各データベースのDSN形式
    dsns := []struct {
        db  string
        dsn string
    }{
        {"PostgreSQL", "postgres://user:pass@localhost:5432/mydb?sslmode=disable"},
        {"MySQL", "user:pass@tcp(localhost:3306)/mydb?parseTime=true"},
        {"SQLite3", "file:mydb.sqlite3?cache=shared&mode=rwc"},
    }

    fmt.Println("=== DSN（接続文字列）の形式 ===")
    for _, d := range dsns {
        fmt.Printf("\\n  %s:\\n  %s\\n", d.db, d.dsn)
    }

    // ドライバ名の対応
    fmt.Println("\\n=== ドライバ名 ===")
    drivers := []struct {
        driver  string
        pkg     string
    }{
        {"postgres", "github.com/lib/pq"},
        {"mysql", "github.com/go-sql-driver/mysql"},
        {"sqlite3", "github.com/mattn/go-sqlite3"},
    }

    for _, d := range drivers {
        fmt.Printf("  %-10s → %s\\n", d.driver, d.pkg)
    }
}`}
          expectedOutput={`=== DSN（接続文字列）の形式 ===

  PostgreSQL:
  postgres://user:pass@localhost:5432/mydb?sslmode=disable

  MySQL:
  user:pass@tcp(localhost:3306)/mydb?parseTime=true

  SQLite3:
  file:mydb.sqlite3?cache=shared&mode=rwc

=== ドライバ名 ===
  postgres   → github.com/lib/pq
  mysql      → github.com/go-sql-driver/mysql
  sqlite3    → github.com/mattn/go-sqlite3`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コネクションプールの設定</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">sql.DB</code> のプール設定はパフォーマンスに大きく影響します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "time"
)

func main() {
    // コネクションプールの推奨設定
    settings := []struct {
        method string
        value  string
        desc   string
    }{
        {"SetMaxOpenConns(25)", "25", "最大オープン接続数"},
        {"SetMaxIdleConns(5)", "5", "最大アイドル接続数"},
        {"SetConnMaxLifetime(5m)", "5分", "接続の最大生存時間"},
        {"SetConnMaxIdleTime(1m)", "1分", "アイドル接続の最大時間"},
    }

    fmt.Println("=== コネクションプール設定 ===")
    for _, s := range settings {
        fmt.Printf("  db.%-30s → %s\\n", s.method, s.desc)
    }

    fmt.Println()
    maxLife := 5 * time.Minute
    maxIdle := 1 * time.Minute
    fmt.Printf("接続の最大生存: %v\\n", maxLife)
    fmt.Printf("アイドルの最大: %v\\n", maxIdle)
}`}
          expectedOutput={`=== コネクションプール設定 ===
  db.SetMaxOpenConns(25)             → 最大オープン接続数
  db.SetMaxIdleConns(5)              → 最大アイドル接続数
  db.SetConnMaxLifetime(5m)          → 接続の最大生存時間
  db.SetConnMaxIdleTime(1m)          → アイドル接続の最大時間

接続の最大生存: 5m0s
アイドルの最大: 1m0s`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="database" lessonId="sql-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="sql-basics" basePath="/learn/database" />
    </div>
  );
}

import { GoEditor } from "@/components/go-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("database");

const quizQuestions: QuizQuestion[] = [
  {
    question: "GoでデータベースのSQL操作に使う標準パッケージは？",
    options: ["database/driver", "database/sql", "sql/db", "db/query"],
    answer: 1,
    explanation: "database/sql はGoの標準ライブラリで、SQL データベースへの汎用インターフェースを提供します。",
  },
  {
    question: "単一行を取得するメソッドは？",
    options: ["db.Query", "db.QueryRow", "db.Exec", "db.Get"],
    answer: 1,
    explanation: "db.QueryRow は最大1行を返すクエリに使用します。結果がない場合は sql.ErrNoRows を返します。",
  },
  {
    question: "トランザクションを開始するメソッドは？",
    options: ["db.Transaction()", "db.Begin()", "db.StartTx()", "db.NewTx()"],
    answer: 1,
    explanation: "db.Begin() でトランザクションを開始し、tx.Commit() または tx.Rollback() で完了します。",
  },
  {
    question: "sqlx の StructScan の利点は？",
    options: [
      "より高速なクエリ実行",
      "構造体フィールドへの自動マッピング",
      "型安全なクエリビルダー",
      "自動マイグレーション",
    ],
    answer: 1,
    explanation: "sqlx の StructScan はカラム名と構造体の db タグを照合し、自動的にフィールドにマッピングします。",
  },
];

export default function DatabasePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-cyan-400 mb-2">データベース</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Goの database/sql パッケージを使ったデータベース操作を学びます。接続管理、クエリ実行、プリペアドステートメント、
          トランザクション、行データのスキャン、sqlxライブラリの活用までをカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="database" totalLessons={6} color="cyan" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/database" color="cyan" categoryId="database" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">database/sql の基本概念</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">database/sql</code> はドライバに依存しない汎用的なSQLインターフェースです。
          実際のドライバは別途インポートします。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// database/sql の基本的な型を解説
func main() {
    // sql.DB — コネクションプールを管理
    fmt.Println("sql.DB: コネクションプールの管理")

    // sql.Rows — 複数行の結果セット
    fmt.Println("sql.Rows: SELECT結果の走査")

    // sql.Row — 単一行の結果
    fmt.Println("sql.Row: 単一行の取得")

    // sql.Tx — トランザクション
    fmt.Println("sql.Tx: トランザクション管理")

    // sql.Stmt — プリペアドステートメント
    fmt.Println("sql.Stmt: パラメータ化クエリ")
}`}
          expectedOutput={`sql.DB: コネクションプールの管理
sql.Rows: SELECT結果の走査
sql.Row: 単一行の取得
sql.Tx: トランザクション管理
sql.Stmt: パラメータ化クエリ`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">クエリパターンの概要</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">db.Query</code>、<code className="text-cyan-300">db.QueryRow</code>、
          <code className="text-cyan-300">db.Exec</code> を使い分けます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // Query — 複数行を返すSELECT
    fmt.Println("db.Query: rows, err := db.Query(\"SELECT ...\")")

    // QueryRow — 1行だけ返すSELECT
    fmt.Println("db.QueryRow: row := db.QueryRow(\"SELECT ... WHERE id=?\")")

    // Exec — INSERT, UPDATE, DELETE
    fmt.Println("db.Exec: result, err := db.Exec(\"INSERT ...\")")

    // Result から影響行数を取得
    fmt.Println("result.RowsAffected(): 変更された行数")
    fmt.Println("result.LastInsertId(): 最後に挿入されたID")
}`}
          expectedOutput={`db.Query: rows, err := db.Query("SELECT ...")
db.QueryRow: row := db.QueryRow("SELECT ... WHERE id=?")
db.Exec: result, err := db.Exec("INSERT ...")
result.RowsAffected(): 変更された行数
result.LastInsertId(): 最後に挿入されたID`}
        />
      </section>
      <Quiz questions={quizQuestions} color="cyan" />
    </div>
  );
}

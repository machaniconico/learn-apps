import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("testing");

export default function TestMainPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">テスト レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">TestMain</h1>
        <p className="text-gray-400">TestMain(m *testing.M)でパッケージ全体のテストのセットアップ・クリーンアップを学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">TestMainの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">TestMain</code> はパッケージ内のすべてのテストの実行を制御します。
          テスト全体の前後でセットアップ・クリーンアップを行えます。
          <code className="text-cyan-300">m.Run()</code> で実テストを実行し、
          <code className="text-cyan-300">os.Exit</code> で終了コードを返します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fmt.Println("=== TestMain の基本構造 ===")
    fmt.Println()
    fmt.Println("func TestMain(m *testing.M) {")
    fmt.Println("    // セットアップ")
    fmt.Println("    fmt.Println(\"テスト前のセットアップ\")")
    fmt.Println("    db := setupDatabase()")
    fmt.Println()
    fmt.Println("    // テスト実行")
    fmt.Println("    code := m.Run()")
    fmt.Println()
    fmt.Println("    // クリーンアップ")
    fmt.Println("    fmt.Println(\"テスト後のクリーンアップ\")")
    fmt.Println("    db.Close()")
    fmt.Println()
    fmt.Println("    // 終了")
    fmt.Println("    os.Exit(code)")
    fmt.Println("}")
    fmt.Println()
    fmt.Println("■ 実行順序:")
    fmt.Println("  1. TestMain のセットアップ")
    fmt.Println("  2. m.Run() → 全テスト関数を実行")
    fmt.Println("  3. TestMain のクリーンアップ")
    fmt.Println("  4. os.Exit(code)")
}`}
          expectedOutput={`=== TestMain の基本構造 ===

func TestMain(m *testing.M) {
    // セットアップ
    fmt.Println("テスト前のセットアップ")
    db := setupDatabase()

    // テスト実行
    code := m.Run()

    // クリーンアップ
    fmt.Println("テスト後のクリーンアップ")
    db.Close()

    // 終了
    os.Exit(code)
}

■ 実行順序:
  1. TestMain のセットアップ
  2. m.Run() → 全テスト関数を実行
  3. TestMain のクリーンアップ
  4. os.Exit(code)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実践例：テストデータベース</h2>
        <p className="text-gray-400 mb-4">
          データベースを使うテストの典型的なパターンです。TestMainでDB接続を確立し、
          テスト終了後にクリーンアップします。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// テスト用のモックDB
type TestDB struct {
    connected bool
}

func setupTestDB() *TestDB {
    fmt.Println("[Setup] テストDB接続")
    return &TestDB{connected: true}
}

func (db *TestDB) Close() {
    fmt.Println("[Cleanup] テストDB切断")
    db.connected = false
}

func (db *TestDB) IsConnected() bool {
    return db.connected
}

func main() {
    // TestMain のセットアップに相当
    fmt.Println("=== TestMain 実行シミュレーション ===")
    db := setupTestDB()

    // m.Run() に相当：テスト実行
    fmt.Println()
    fmt.Println("[Test] TestCreateUser: PASS")
    fmt.Printf("  DB接続状態: %t\\n", db.IsConnected())
    fmt.Println("[Test] TestGetUser: PASS")
    fmt.Println("[Test] TestDeleteUser: PASS")
    fmt.Println()

    // クリーンアップ
    db.Close()
    fmt.Println()
    fmt.Println("全テスト完了")
}`}
          expectedOutput={`=== TestMain 実行シミュレーション ===
[Setup] テストDB接続

[Test] TestCreateUser: PASS
  DB接続状態: true
[Test] TestGetUser: PASS
[Test] TestDeleteUser: PASS

[Cleanup] テストDB切断

全テスト完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">t.Cleanupとの使い分け</h2>
        <p className="text-gray-400 mb-4">
          個々のテストのクリーンアップには <code className="text-cyan-300">t.Cleanup</code> が適しています。
          TestMainはパッケージ全体のリソース管理に使います。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fmt.Println("=== TestMain vs t.Cleanup ===")
    fmt.Println()
    fmt.Println("■ TestMain:")
    fmt.Println("  - パッケージ全体で1回だけ実行")
    fmt.Println("  - DB接続、サーバー起動など")
    fmt.Println("  - os.Exit() が必須")
    fmt.Println()
    fmt.Println("■ t.Cleanup:")
    fmt.Println("  - 各テスト関数ごとに設定")
    fmt.Println("  - テスト終了時に自動実行")
    fmt.Println("  - 一時ファイル削除などに最適")
    fmt.Println()
    fmt.Println("  func TestExample(t *testing.T) {")
    fmt.Println("      file := createTempFile()")
    fmt.Println("      t.Cleanup(func() {")
    fmt.Println("          os.Remove(file)")
    fmt.Println("      })")
    fmt.Println("      // テストロジック...")
    fmt.Println("  }")
    fmt.Println()
    fmt.Println("■ t.TempDir():")
    fmt.Println("  一時ディレクトリを自動作成・削除")
    fmt.Println("  dir := t.TempDir()")
}`}
          expectedOutput={`=== TestMain vs t.Cleanup ===

■ TestMain:
  - パッケージ全体で1回だけ実行
  - DB接続、サーバー起動など
  - os.Exit() が必須

■ t.Cleanup:
  - 各テスト関数ごとに設定
  - テスト終了時に自動実行
  - 一時ファイル削除などに最適

  func TestExample(t *testing.T) {
      file := createTempFile()
      t.Cleanup(func() {
          os.Remove(file)
      })
      // テストロジック...
  }

■ t.TempDir():
  一時ディレクトリを自動作成・削除
  dir := t.TempDir()`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="testing" lessonId="testmain" />
      </div>
      <LessonNav lessons={lessons} currentId="testmain" basePath="/learn/testing" />
    </div>
  );
}

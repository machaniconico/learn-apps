import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("testing");

export default function SubtestsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">テスト レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">サブテスト</h1>
        <p className="text-gray-400">t.Run()でサブテストを作成し、テストの構造化とフィルタリングを学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">t.Runの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">t.Run(name, func(t *testing.T))</code> でサブテストを作成します。
          テーブル駆動テストと組み合わせると、各テストケースが独立したサブテストになります。
          <code className="text-cyan-300">go test -run TestXxx/サブテスト名</code> で個別に実行できます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func Max(a, b int) int {
    if a > b {
        return a
    }
    return b
}

func main() {
    // t.Run のパターン（デモ版）
    tests := []struct {
        name     string
        a, b     int
        expected int
    }{
        {"両方正の数", 3, 5, 5},
        {"両方負の数", -3, -1, -1},
        {"同じ値", 7, 7, 7},
        {"正と負", -2, 8, 8},
    }

    fmt.Println("=== TestMax ===")
    for _, tt := range tests {
        result := Max(tt.a, tt.b)
        status := "PASS"
        if result != tt.expected {
            status = "FAIL"
        }
        // t.Run("name", ...) に相当
        fmt.Printf("  --- %s: %s: Max(%d, %d) = %d\\n",
            status, tt.name, tt.a, tt.b, result)
    }
    fmt.Println("--- PASS: TestMax")
}`}
          expectedOutput={`=== TestMax ===
  --- PASS: 両方正の数: Max(3, 5) = 5
  --- PASS: 両方負の数: Max(-3, -1) = -1
  --- PASS: 同じ値: Max(7, 7) = 7
  --- PASS: 正と負: Max(-2, 8) = 8
--- PASS: TestMax`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">サブテストの活用パターン</h2>
        <p className="text-gray-400 mb-4">
          サブテストを使うと、テストをグループ化して見やすくなります。
          セットアップの共有や並列実行も可能です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fmt.Println("=== サブテストの構造 ===")
    fmt.Println()
    fmt.Println("func TestUser(t *testing.T) {")
    fmt.Println("    // 共通セットアップ")
    fmt.Println("    db := setupTestDB()")
    fmt.Println()
    fmt.Println("    t.Run(\"作成\", func(t *testing.T) {")
    fmt.Println("        // ユーザー作成テスト")
    fmt.Println("    })")
    fmt.Println()
    fmt.Println("    t.Run(\"取得\", func(t *testing.T) {")
    fmt.Println("        // ユーザー取得テスト")
    fmt.Println("    })")
    fmt.Println()
    fmt.Println("    t.Run(\"削除\", func(t *testing.T) {")
    fmt.Println("        // ユーザー削除テスト")
    fmt.Println("    })")
    fmt.Println("}")
    fmt.Println()
    fmt.Println("■ 個別実行:")
    fmt.Println("  go test -run TestUser/作成")
    fmt.Println("  go test -run TestUser/取得")
}`}
          expectedOutput={`=== サブテストの構造 ===

func TestUser(t *testing.T) {
    // 共通セットアップ
    db := setupTestDB()

    t.Run("作成", func(t *testing.T) {
        // ユーザー作成テスト
    })

    t.Run("取得", func(t *testing.T) {
        // ユーザー取得テスト
    })

    t.Run("削除", func(t *testing.T) {
        // ユーザー削除テスト
    })
}

■ 個別実行:
  go test -run TestUser/作成
  go test -run TestUser/取得`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">並列サブテスト</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">t.Parallel()</code> を呼ぶと、
          そのサブテストは他の並列テストと同時に実行されます。
          独立したテストケースの実行時間を短縮できます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fmt.Println("=== 並列サブテスト ===")
    fmt.Println()
    fmt.Println("func TestParallel(t *testing.T) {")
    fmt.Println("    tests := []struct {")
    fmt.Println("        name  string")
    fmt.Println("        input int")
    fmt.Println("    }{")
    fmt.Println("        {\"ケースA\", 1},")
    fmt.Println("        {\"ケースB\", 2},")
    fmt.Println("        {\"ケースC\", 3},")
    fmt.Println("    }")
    fmt.Println()
    fmt.Println("    for _, tt := range tests {")
    fmt.Println("        t.Run(tt.name, func(t *testing.T) {")
    fmt.Println("            t.Parallel() // 並列実行を宣言")
    fmt.Println("            // テストロジック...")
    fmt.Println("        })")
    fmt.Println("    }")
    fmt.Println("}")
    fmt.Println()
    fmt.Println("■ 注意点:")
    fmt.Println("  - ループ変数はGo1.22+で安全")
    fmt.Println("  - 共有リソースにはMutexが必要")
    fmt.Println("  - t.Parallel()の前にt.Cleanupを設定")
}`}
          expectedOutput={`=== 並列サブテスト ===

func TestParallel(t *testing.T) {
    tests := []struct {
        name  string
        input int
    }{
        {"ケースA", 1},
        {"ケースB", 2},
        {"ケースC", 3},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            t.Parallel() // 並列実行を宣言
            // テストロジック...
        })
    }
}

■ 注意点:
  - ループ変数はGo1.22+で安全
  - 共有リソースにはMutexが必要
  - t.Parallel()の前にt.Cleanupを設定`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="testing" lessonId="subtests" />
      </div>
      <LessonNav lessons={lessons} currentId="subtests" basePath="/learn/testing" />
    </div>
  );
}

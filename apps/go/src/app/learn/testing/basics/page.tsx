import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("testing");

export default function TestingBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">テスト レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">テストの基本</h1>
        <p className="text-gray-400">func TestXxx(t *testing.T)でテストを書き、t.Errorやt.Fatalでアサーションする基本を学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テスト関数の構造</h2>
        <p className="text-gray-400 mb-4">
          Goのテストは <code className="text-cyan-300">_test.go</code> ファイルに書き、
          テスト関数は <code className="text-cyan-300">Test</code> で始まり、
          <code className="text-cyan-300">*testing.T</code> を引数に取ります。
          <code className="text-cyan-300">go test</code> コマンドで実行します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "testing"
)

// テスト対象の関数
func Add(a, b int) int {
    return a + b
}

func Subtract(a, b int) int {
    return a - b
}

// テスト関数
func TestAdd(t *testing.T) {
    result := Add(2, 3)
    if result != 5 {
        t.Errorf("Add(2, 3) = %d; want 5", result)
    }
}

func TestSubtract(t *testing.T) {
    result := Subtract(10, 4)
    if result != 6 {
        t.Errorf("Subtract(10, 4) = %d; want 6", result)
    }
}

func main() {
    fmt.Printf("Add(2, 3) = %d\\n", Add(2, 3))
    fmt.Printf("Subtract(10, 4) = %d\\n", Subtract(10, 4))
    fmt.Println("\\nテスト実行: go test -v")
}`}
          expectedOutput={`Add(2, 3) = 5
Subtract(10, 4) = 6

テスト実行: go test -v`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">t.Error vs t.Fatal</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">t.Error</code> / <code className="text-cyan-300">t.Errorf</code> は
          エラーを記録するが実行を継続します。
          <code className="text-cyan-300">t.Fatal</code> / <code className="text-cyan-300">t.Fatalf</code> は
          エラーを記録してテストを即座に中止します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fmt.Println("=== t.Error vs t.Fatal ===")
    fmt.Println()
    fmt.Println("■ t.Error / t.Errorf:")
    fmt.Println("  - エラーを記録するが、テストは継続")
    fmt.Println("  - 複数のアサーションを確認したい場合に使う")
    fmt.Println()
    fmt.Println("  func TestMultiple(t *testing.T) {")
    fmt.Println("      t.Error(\"1つ目の失敗\") // 記録して続行")
    fmt.Println("      t.Error(\"2つ目の失敗\") // これも実行される")
    fmt.Println("  }")
    fmt.Println()
    fmt.Println("■ t.Fatal / t.Fatalf:")
    fmt.Println("  - エラーを記録し、テストを即座に中止")
    fmt.Println("  - 前提条件が満たされない場合に使う")
    fmt.Println()
    fmt.Println("  func TestFatal(t *testing.T) {")
    fmt.Println("      conn := connect()")
    fmt.Println("      if conn == nil {")
    fmt.Println("          t.Fatal(\"接続失敗\") // ここで中止")
    fmt.Println("      }")
    fmt.Println("      // connを使うテスト...")
    fmt.Println("  }")
}`}
          expectedOutput={`=== t.Error vs t.Fatal ===

■ t.Error / t.Errorf:
  - エラーを記録するが、テストは継続
  - 複数のアサーションを確認したい場合に使う

  func TestMultiple(t *testing.T) {
      t.Error("1つ目の失敗") // 記録して続行
      t.Error("2つ目の失敗") // これも実行される
  }

■ t.Fatal / t.Fatalf:
  - エラーを記録し、テストを即座に中止
  - 前提条件が満たされない場合に使う

  func TestFatal(t *testing.T) {
      conn := connect()
      if conn == nil {
          t.Fatal("接続失敗") // ここで中止
      }
      // connを使うテスト...
  }`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テストの実行</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">go test</code> コマンドのオプションを確認しましょう。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fmt.Println("=== go test コマンド ===")
    fmt.Println()
    fmt.Println("■ 基本:")
    fmt.Println("  go test            # 現在パッケージのテスト")
    fmt.Println("  go test ./...      # 全パッケージのテスト")
    fmt.Println("  go test -v         # 詳細出力")
    fmt.Println()
    fmt.Println("■ フィルタ:")
    fmt.Println("  go test -run TestAdd     # 名前でフィルタ")
    fmt.Println("  go test -run 'Test.*'    # 正規表現")
    fmt.Println()
    fmt.Println("■ オプション:")
    fmt.Println("  go test -count=1     # キャッシュを無視")
    fmt.Println("  go test -timeout 30s # タイムアウト設定")
    fmt.Println("  go test -short       # 短いテストのみ")
    fmt.Println("  go test -race        # レースディテクタ有効")
}`}
          expectedOutput={`=== go test コマンド ===

■ 基本:
  go test            # 現在パッケージのテスト
  go test ./...      # 全パッケージのテスト
  go test -v         # 詳細出力

■ フィルタ:
  go test -run TestAdd     # 名前でフィルタ
  go test -run 'Test.*'    # 正規表現

■ オプション:
  go test -count=1     # キャッシュを無視
  go test -timeout 30s # タイムアウト設定
  go test -short       # 短いテストのみ
  go test -race        # レースディテクタ有効`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="testing" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/testing" />
    </div>
  );
}

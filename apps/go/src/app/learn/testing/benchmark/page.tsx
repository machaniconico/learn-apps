import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("testing");

export default function BenchmarkPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">テスト レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ベンチマーク</h1>
        <p className="text-gray-400">func BenchmarkXxx(b *testing.B)で関数のパフォーマンスを測定する方法を学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ベンチマーク関数の書き方</h2>
        <p className="text-gray-400 mb-4">
          ベンチマーク関数は <code className="text-cyan-300">Benchmark</code> で始まり、
          <code className="text-cyan-300">*testing.B</code> を引数に取ります。
          <code className="text-cyan-300">b.N</code> 回のループを実行することで、
          正確な実行時間を測定します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// テスト対象の関数
func sumLoop(n int) int {
    sum := 0
    for i := 1; i <= n; i++ {
        sum += i
    }
    return sum
}

func sumFormula(n int) int {
    return n * (n + 1) / 2
}

func main() {
    fmt.Println("=== ベンチマーク関数 ===")
    fmt.Println()
    fmt.Println("func BenchmarkSumLoop(b *testing.B) {")
    fmt.Println("    for i := 0; i < b.N; i++ {")
    fmt.Println("        sumLoop(1000)")
    fmt.Println("    }")
    fmt.Println("}")
    fmt.Println()
    fmt.Println("func BenchmarkSumFormula(b *testing.B) {")
    fmt.Println("    for i := 0; i < b.N; i++ {")
    fmt.Println("        sumFormula(1000)")
    fmt.Println("    }")
    fmt.Println("}")
    fmt.Println()

    // 結果の確認
    fmt.Printf("sumLoop(1000) = %d\\n", sumLoop(1000))
    fmt.Printf("sumFormula(1000) = %d\\n", sumFormula(1000))
    fmt.Println()
    fmt.Println("実行: go test -bench=.")
}`}
          expectedOutput={`=== ベンチマーク関数 ===

func BenchmarkSumLoop(b *testing.B) {
    for i := 0; i < b.N; i++ {
        sumLoop(1000)
    }
}

func BenchmarkSumFormula(b *testing.B) {
    for i := 0; i < b.N; i++ {
        sumFormula(1000)
    }
}

sumLoop(1000) = 500500
sumFormula(1000) = 500500

実行: go test -bench=.`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ベンチマーク結果の読み方</h2>
        <p className="text-gray-400 mb-4">
          ベンチマーク結果には実行回数と、1回あたりの時間（ns/op）が表示されます。
          <code className="text-cyan-300">-benchmem</code> でメモリ割り当て情報も確認できます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fmt.Println("=== ベンチマーク結果の読み方 ===")
    fmt.Println()
    fmt.Println("実行コマンド:")
    fmt.Println("  go test -bench=. -benchmem")
    fmt.Println()
    fmt.Println("出力例:")
    fmt.Println("  BenchmarkSumLoop-8    5000000    250 ns/op    0 B/op    0 allocs/op")
    fmt.Println("  BenchmarkSumFormula-8 1000000000 0.3 ns/op    0 B/op    0 allocs/op")
    fmt.Println()
    fmt.Println("■ 各列の意味:")
    fmt.Println("  BenchmarkXxx-8  → テスト名-GOMAXPROCS")
    fmt.Println("  5000000         → 実行回数 (b.N)")
    fmt.Println("  250 ns/op       → 1回あたりの実行時間")
    fmt.Println("  0 B/op          → 1回あたりのメモリ割当")
    fmt.Println("  0 allocs/op     → 1回あたりのアロケーション数")
    fmt.Println()
    fmt.Println("■ 便利なオプション:")
    fmt.Println("  -benchtime=5s   → 5秒間実行")
    fmt.Println("  -count=3        → 3回繰り返し")
    fmt.Println("  -cpuprofile=cpu.prof → CPUプロファイル出力")
}`}
          expectedOutput={`=== ベンチマーク結果の読み方 ===

実行コマンド:
  go test -bench=. -benchmem

出力例:
  BenchmarkSumLoop-8    5000000    250 ns/op    0 B/op    0 allocs/op
  BenchmarkSumFormula-8 1000000000 0.3 ns/op    0 B/op    0 allocs/op

■ 各列の意味:
  BenchmarkXxx-8  → テスト名-GOMAXPROCS
  5000000         → 実行回数 (b.N)
  250 ns/op       → 1回あたりの実行時間
  0 B/op          → 1回あたりのメモリ割当
  0 allocs/op     → 1回あたりのアロケーション数

■ 便利なオプション:
  -benchtime=5s   → 5秒間実行
  -count=3        → 3回繰り返し
  -cpuprofile=cpu.prof → CPUプロファイル出力`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列結合のベンチマーク比較</h2>
        <p className="text-gray-400 mb-4">
          実践的な例として、文字列結合の3つの方法を比較します。
          <code className="text-cyan-300">strings.Builder</code> が最も効率的です。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "strings"
)

// 方法1: += で結合
func concatPlus(n int) string {
    s := ""
    for i := 0; i < n; i++ {
        s += "x"
    }
    return s
}

// 方法2: strings.Builder
func concatBuilder(n int) string {
    var b strings.Builder
    for i := 0; i < n; i++ {
        b.WriteString("x")
    }
    return b.String()
}

// 方法3: strings.Join
func concatJoin(n int) string {
    parts := make([]string, n)
    for i := 0; i < n; i++ {
        parts[i] = "x"
    }
    return strings.Join(parts, "")
}

func main() {
    n := 100
    fmt.Printf("+=:      長さ=%d\\n", len(concatPlus(n)))
    fmt.Printf("Builder: 長さ=%d\\n", len(concatBuilder(n)))
    fmt.Printf("Join:    長さ=%d\\n", len(concatJoin(n)))
    fmt.Println()
    fmt.Println("■ パフォーマンス順（速い→遅い）:")
    fmt.Println("  1. strings.Builder（メモリ効率◎）")
    fmt.Println("  2. strings.Join（事前にスライスが必要）")
    fmt.Println("  3. += 結合（毎回新しい文字列を生成）")
}`}
          expectedOutput={`+=:      長さ=100
Builder: 長さ=100
Join:    長さ=100

■ パフォーマンス順（速い→遅い）:
  1. strings.Builder（メモリ効率◎）
  2. strings.Join（事前にスライスが必要）
  3. += 結合（毎回新しい文字列を生成）`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="testing" lessonId="benchmark" />
      </div>
      <LessonNav lessons={lessons} currentId="benchmark" basePath="/learn/testing" />
    </div>
  );
}

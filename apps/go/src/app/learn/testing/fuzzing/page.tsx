import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("testing");

export default function FuzzingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">テスト レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ファジング</h1>
        <p className="text-gray-400">Go 1.18で導入されたファジングテスト（func FuzzXxx）でエッジケースを自動発見する方法を学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ファジングとは</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">ファジング</code>はランダムな入力を自動生成し、
          プログラムのクラッシュや予期しない動作を検出するテスト手法です。
          Go 1.18で標準のテストフレームワークに組み込まれました。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fmt.Println("=== ファジングテストの基本 ===")
    fmt.Println()
    fmt.Println("func FuzzReverse(f *testing.F) {")
    fmt.Println("    // シードコーパス（初期入力）の追加")
    fmt.Println("    f.Add(\"hello\")")
    fmt.Println("    f.Add(\"こんにちは\")")
    fmt.Println("    f.Add(\"\")")
    fmt.Println()
    fmt.Println("    // ファジングターゲット")
    fmt.Println("    f.Fuzz(func(t *testing.T, s string) {")
    fmt.Println("        rev := Reverse(s)")
    fmt.Println("        doubleRev := Reverse(rev)")
    fmt.Println("        if s != doubleRev {")
    fmt.Println("            t.Errorf(\"2回反転で元に戻らない\")")
    fmt.Println("        }")
    fmt.Println("    })")
    fmt.Println("}")
    fmt.Println()
    fmt.Println("■ 実行:")
    fmt.Println("  go test -fuzz=FuzzReverse")
    fmt.Println("  go test -fuzz=FuzzReverse -fuzztime=30s")
}`}
          expectedOutput={`=== ファジングテストの基本 ===

func FuzzReverse(f *testing.F) {
    // シードコーパス（初期入力）の追加
    f.Add("hello")
    f.Add("こんにちは")
    f.Add("")

    // ファジングターゲット
    f.Fuzz(func(t *testing.T, s string) {
        rev := Reverse(s)
        doubleRev := Reverse(rev)
        if s != doubleRev {
            t.Errorf("2回反転で元に戻らない")
        }
    })
}

■ 実行:
  go test -fuzz=FuzzReverse
  go test -fuzz=FuzzReverse -fuzztime=30s`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列反転の例</h2>
        <p className="text-gray-400 mb-4">
          ファジングで発見されやすいバグの例です。
          バイト単位の反転ではマルチバイト文字（日本語など）が壊れます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// バグあり版: バイト単位で反転
func ReverseBuggy(s string) string {
    b := []byte(s)
    for i, j := 0, len(b)-1; i < j; i, j = i+1, j-1 {
        b[i], b[j] = b[j], b[i]
    }
    return string(b)
}

// 修正版: rune単位で反転
func ReverseCorrect(s string) string {
    r := []rune(s)
    for i, j := 0, len(r)-1; i < j; i, j = i+1, j-1 {
        r[i], r[j] = r[j], r[i]
    }
    return string(r)
}

func main() {
    tests := []string{"hello", "Go言語", "日本語テスト"}

    for _, s := range tests {
        buggy := ReverseBuggy(s)
        correct := ReverseCorrect(s)
        fmt.Printf("入力: %s\\n", s)
        fmt.Printf("  バイト反転: %s\\n", buggy)
        fmt.Printf("  rune反転:   %s\\n", correct)
        fmt.Println()
    }
}`}
          expectedOutput={`入力: hello
  バイト反転: olleh
  rune反転:   olleh

入力: Go言語
  バイト反転: èªč¨oG
  rune反転:   語言oG

入力: 日本語テスト
  バイト反転: ãã¹ãèªæ¬æ¥
  rune反転:   トステ語本日`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ファジングのベストプラクティス</h2>
        <p className="text-gray-400 mb-4">
          ファジングを効果的に活用するためのポイントをまとめます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fmt.Println("=== ファジングのベストプラクティス ===")
    fmt.Println()
    fmt.Println("■ シードコーパス:")
    fmt.Println("  f.Add() で代表的な入力を追加")
    fmt.Println("  正常値、境界値、空文字列を含める")
    fmt.Println()
    fmt.Println("■ サポートされる型:")
    fmt.Println("  string, []byte, int, int8~64")
    fmt.Println("  uint, uint8~64, float32, float64")
    fmt.Println("  bool, rune")
    fmt.Println()
    fmt.Println("■ 実行オプション:")
    fmt.Println("  -fuzztime=30s     # 30秒間実行")
    fmt.Println("  -fuzztime=1000x   # 1000回実行")
    fmt.Println("  -parallel=4       # 並列数")
    fmt.Println()
    fmt.Println("■ 失敗ケースの管理:")
    fmt.Println("  testdata/fuzz/FuzzXxx/ に自動保存")
    fmt.Println("  次回 go test で再実行される")
    fmt.Println()
    fmt.Println("■ 適したテスト対象:")
    fmt.Println("  - パーサー（JSON, XML, URL等）")
    fmt.Println("  - エンコーダー/デコーダー")
    fmt.Println("  - バリデーション関数")
    fmt.Println("  - 文字列操作関数")
}`}
          expectedOutput={`=== ファジングのベストプラクティス ===

■ シードコーパス:
  f.Add() で代表的な入力を追加
  正常値、境界値、空文字列を含める

■ サポートされる型:
  string, []byte, int, int8~64
  uint, uint8~64, float32, float64
  bool, rune

■ 実行オプション:
  -fuzztime=30s     # 30秒間実行
  -fuzztime=1000x   # 1000回実行
  -parallel=4       # 並列数

■ 失敗ケースの管理:
  testdata/fuzz/FuzzXxx/ に自動保存
  次回 go test で再実行される

■ 適したテスト対象:
  - パーサー（JSON, XML, URL等）
  - エンコーダー/デコーダー
  - バリデーション関数
  - 文字列操作関数`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="testing" lessonId="fuzzing" />
      </div>
      <LessonNav lessons={lessons} currentId="fuzzing" basePath="/learn/testing" />
    </div>
  );
}

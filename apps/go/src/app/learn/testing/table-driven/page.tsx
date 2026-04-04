import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("testing");

export default function TableDrivenPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">テスト レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">テーブル駆動テスト</h1>
        <p className="text-gray-400">テストケースを構造体スライスで定義し、ループで効率的にテストするGoの定番パターンを学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テーブル駆動テストとは</h2>
        <p className="text-gray-400 mb-4">
          テストケースをデータ（テーブル）として定義し、ループで実行するパターンです。
          テストケースの追加が容易で、Go標準ライブラリでも広く使われています。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func Abs(n int) int {
    if n < 0 {
        return -n
    }
    return n
}

func main() {
    // テーブル駆動テストのパターン
    tests := []struct {
        name     string
        input    int
        expected int
    }{
        {"正の数", 5, 5},
        {"負の数", -3, 3},
        {"ゼロ", 0, 0},
        {"大きな負の数", -100, 100},
    }

    for _, tt := range tests {
        result := Abs(tt.input)
        status := "PASS"
        if result != tt.expected {
            status = "FAIL"
        }
        fmt.Printf("[%s] %s: Abs(%d) = %d\\n",
            status, tt.name, tt.input, result)
    }
}`}
          expectedOutput={`[PASS] 正の数: Abs(5) = 5
[PASS] 負の数: Abs(-3) = 3
[PASS] ゼロ: Abs(0) = 0
[PASS] 大きな負の数: Abs(-100) = 100`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">エラーケースのテスト</h2>
        <p className="text-gray-400 mb-4">
          テーブルにエラーの期待値を含めることで、正常系と異常系を統一的にテストできます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "errors"
    "fmt"
)

func Divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("ゼロ除算エラー")
    }
    return a / b, nil
}

func main() {
    tests := []struct {
        name    string
        a, b    float64
        want    float64
        wantErr bool
    }{
        {"正常: 10/2", 10, 2, 5, false},
        {"正常: 9/3", 9, 3, 3, false},
        {"エラー: ゼロ除算", 5, 0, 0, true},
        {"正常: 負の数", -6, 3, -2, false},
    }

    for _, tt := range tests {
        result, err := Divide(tt.a, tt.b)

        hasErr := err != nil
        if hasErr != tt.wantErr {
            fmt.Printf("[FAIL] %s: エラー期待=%t, 実際=%t\\n",
                tt.name, tt.wantErr, hasErr)
            continue
        }

        if !tt.wantErr && result != tt.want {
            fmt.Printf("[FAIL] %s: got=%.1f, want=%.1f\\n",
                tt.name, result, tt.want)
            continue
        }

        fmt.Printf("[PASS] %s\\n", tt.name)
    }
}`}
          expectedOutput={`[PASS] 正常: 10/2
[PASS] 正常: 9/3
[PASS] エラー: ゼロ除算
[PASS] 正常: 負の数`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">mapを使ったテーブル</h2>
        <p className="text-gray-400 mb-4">
          テストケースを <code className="text-cyan-300">map[string]struct{`{...}`}</code> で定義する方法もあります。
          テスト名がキーになるため、名前の重複を防げます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func IsPalindrome(s string) bool {
    runes := []rune(s)
    n := len(runes)
    for i := 0; i < n/2; i++ {
        if runes[i] != runes[n-1-i] {
            return false
        }
    }
    return true
}

func main() {
    tests := map[string]struct {
        input string
        want  bool
    }{
        "回文: しんぶんし": {"しんぶんし", true},
        "回文: aba":      {"aba", true},
        "非回文: hello":   {"hello", false},
        "空文字":          {"", true},
        "1文字":           {"a", true},
    }

    for name, tt := range tests {
        got := IsPalindrome(tt.input)
        status := "PASS"
        if got != tt.want {
            status = "FAIL"
        }
        fmt.Printf("[%s] %s\\n", status, name)
    }
}`}
          expectedOutput={`[PASS] 回文: しんぶんし
[PASS] 回文: aba
[PASS] 非回文: hello
[PASS] 空文字
[PASS] 1文字`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="testing" lessonId="table-driven" />
      </div>
      <LessonNav lessons={lessons} currentId="table-driven" basePath="/learn/testing" />
    </div>
  );
}

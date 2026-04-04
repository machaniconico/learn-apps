import { GoEditor } from "@/components/go-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("testing");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Goのテスト関数名の命名規則は？",
    options: ["test_xxx", "TestXxx", "test.Xxx", "Testxxx"],
    answer: 1,
    explanation: "テスト関数は Test で始まり、次の文字が大文字である必要があります（例：TestAdd）。",
  },
  {
    question: "テストを即座に中止するメソッドは？",
    options: ["t.Error", "t.Fail", "t.Fatal", "t.Skip"],
    answer: 2,
    explanation: "t.Fatal はエラーメッセージを記録し、即座にそのテストを中止します。t.Error は記録するだけで続行します。",
  },
  {
    question: "ベンチマーク関数のシグネチャは？",
    options: ["func BenchXxx(t *testing.T)", "func BenchmarkXxx(b *testing.B)", "func Bench(b *testing.B)", "func TestBench(t *testing.T)"],
    answer: 1,
    explanation: "ベンチマーク関数は BenchmarkXxx(b *testing.B) というシグネチャを使います。",
  },
  {
    question: "テストカバレッジを計測するフラグは？",
    options: ["-coverage", "-cover", "-cov", "-profile"],
    answer: 1,
    explanation: "go test -cover でテストカバレッジの概要を表示します。",
  },
];

export default function TestingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-400 mb-2">テスト</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">7レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Goの標準テストフレームワークを学びます。testing.Tによる基本テストからテーブル駆動テスト、
          サブテスト、ベンチマーク、TestMainによるセットアップ・クリーンアップ、
          カバレッジ計測、Go 1.18で導入されたファジングテストまでカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="testing" totalLessons={7} color="indigo" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全7レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/testing" color="indigo" categoryId="testing" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テストの基本構造</h2>
        <p className="text-gray-400 mb-4">
          テストファイルは <code className="text-cyan-300">_test.go</code> で終わり、
          テスト関数は <code className="text-cyan-300">func TestXxx(t *testing.T)</code> で定義します。
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

// テスト関数
func TestAdd(t *testing.T) {
    result := Add(2, 3)
    if result != 5 {
        t.Errorf("Add(2, 3) = %d; want 5", result)
    }
}

func main() {
    // テストを手動実行（デモ用）
    result := Add(2, 3)
    fmt.Printf("Add(2, 3) = %d\\n", result)

    result2 := Add(-1, 1)
    fmt.Printf("Add(-1, 1) = %d\\n", result2)

    fmt.Println("テスト: go test で実行します")
}`}
          expectedOutput={`Add(2, 3) = 5
Add(-1, 1) = 0
テスト: go test で実行します`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テーブル駆動テスト</h2>
        <p className="text-gray-400 mb-4">
          Goで最も一般的なテストパターンです。テストケースをスライスで定義し、ループで実行します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func Multiply(a, b int) int {
    return a * b
}

func main() {
    // テーブル駆動テストのパターン（デモ用）
    tests := []struct {
        name     string
        a, b     int
        expected int
    }{
        {"正の数同士", 3, 4, 12},
        {"ゼロを含む", 5, 0, 0},
        {"負の数", -2, 3, -6},
        {"両方負", -3, -4, 12},
    }

    for _, tt := range tests {
        result := Multiply(tt.a, tt.b)
        status := "PASS"
        if result != tt.expected {
            status = "FAIL"
        }
        fmt.Printf("[%s] %s: Multiply(%d, %d) = %d\\n",
            status, tt.name, tt.a, tt.b, result)
    }
}`}
          expectedOutput={`[PASS] 正の数同士: Multiply(3, 4) = 12
[PASS] ゼロを含む: Multiply(5, 0) = 0
[PASS] 負の数: Multiply(-2, 3) = -6
[PASS] 両方負: Multiply(-3, -4) = 12`}
        />
      </section>
      <Quiz questions={quizQuestions} color="indigo" />
    </div>
  );
}

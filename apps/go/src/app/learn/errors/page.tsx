import { GoEditor } from "@/components/go-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("errors");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Goのerrorインターフェースが持つメソッドはどれですか？",
    options: ["Message() string", "Error() string", "String() string", "Describe() string"],
    answer: 1,
    explanation: "errorインターフェースはError() stringメソッドを持ちます。",
  },
  {
    question: "エラーをラップするための書式動詞はどれですか？",
    options: ["%s", "%v", "%w", "%e"],
    answer: 2,
    explanation: "fmt.Errorf(\"...: %w\", err) で%wを使ってエラーをラップします。",
  },
  {
    question: "ラップされたエラーを判定する関数はどれですか？",
    options: ["errors.Match()", "errors.Is()", "errors.Equal()", "errors.Check()"],
    answer: 1,
    explanation: "errors.Is(err, target) でラップされたエラーチェーンを辿って判定します。",
  },
  {
    question: "panic()が発生した場合に回復する関数はどれですか？",
    options: ["catch()", "handle()", "recover()", "rescue()"],
    answer: 2,
    explanation: "recover()はdefer関数内で呼び出すことでpanicから回復します。",
  },
];

export default function ErrorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-orange-400 mb-2">エラー処理</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">7レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Goのエラー処理は例外ベースではなく、戻り値としてエラーを返す独自のアプローチを採用しています。
          この明示的なエラー処理により、コードの信頼性と可読性が向上します。
          このカテゴリでは、基本的なエラー処理からカスタムエラー型、エラーラッピングまで学びます。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="errors" totalLessons={7} color="orange" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全7レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/errors" color="orange" categoryId="errors" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">エラー処理の基本例</h2>
        <GoEditor
          defaultCode={`package main

import (
    "errors"
    "fmt"
)

func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("ゼロで割ることはできません")
    }
    return a / b, nil
}

func main() {
    result, err := divide(10, 3)
    if err != nil {
        fmt.Println("エラー:", err)
        return
    }
    fmt.Printf("10 / 3 = %.2f\\n", result)

    _, err = divide(10, 0)
    if err != nil {
        fmt.Println("エラー:", err)
    }
}`}
          expectedOutput={`10 / 3 = 3.33
エラー: ゼロで割ることはできません`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カスタムエラーの例</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

type ValidationError struct {
    Field   string
    Message string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("%s: %s", e.Field, e.Message)
}

func validateAge(age int) error {
    if age < 0 {
        return &ValidationError{
            Field:   "age",
            Message: "年齢は0以上でなければなりません",
        }
    }
    return nil
}

func main() {
    err := validateAge(-5)
    if err != nil {
        fmt.Println("バリデーションエラー:", err)
    }

    err = validateAge(25)
    if err == nil {
        fmt.Println("バリデーション成功")
    }
}`}
          expectedOutput={`バリデーションエラー: age: 年齢は0以上でなければなりません
バリデーション成功`}
        />
      </section>
      <Quiz questions={quizQuestions} color="orange" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("errors");

export default function ErrorsBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">エラー処理 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">エラーの基本</h1>
        <p className="text-gray-400">errorインターフェース、errors.New、fmt.Errorfを学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">errorインターフェース</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Goのエラーは <code className="text-cyan-300">error</code> インターフェースで表現されます。
          このインターフェースは <code className="text-cyan-300">Error() string</code> メソッドを1つだけ持つシンプルな設計です。
          <code className="text-cyan-300">errors.New</code> や <code className="text-cyan-300">fmt.Errorf</code> でエラーを作成できます。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">errors.Newでエラーを作成</h2>
        <GoEditor
          defaultCode={`package main

import (
    "errors"
    "fmt"
)

func main() {
    // errors.Newでシンプルなエラーを作成
    err1 := errors.New("何かがおかしいです")
    fmt.Println(err1)
    fmt.Println("型:", fmt.Sprintf("%T", err1))

    // エラーはerrorインターフェースを満たす
    var err error = errors.New("エラーが発生しました")
    fmt.Println(err.Error())

    // nilはエラーなしを意味する
    var noErr error = nil
    fmt.Println("エラーなし:", noErr)
}`}
          expectedOutput={`何かがおかしいです
型: *errors.errorString
エラーが発生しました
エラーなし: <nil>`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">fmt.Errorfでフォーマット付きエラー</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func validateAge(age int) error {
    if age < 0 {
        return fmt.Errorf("無効な年齢: %d (0以上である必要があります)", age)
    }
    if age > 150 {
        return fmt.Errorf("無効な年齢: %d (150以下である必要があります)", age)
    }
    return nil
}

func main() {
    ages := []int{25, -5, 200}

    for _, age := range ages {
        err := validateAge(age)
        if err != nil {
            fmt.Printf("年齢 %d: エラー - %s\\n", age, err)
        } else {
            fmt.Printf("年齢 %d: OK\\n", age)
        }
    }
}`}
          expectedOutput={`年齢 25: OK
年齢 -5: エラー - 無効な年齢: -5 (0以上である必要があります)
年齢 200: エラー - 無効な年齢: 200 (150以下である必要があります)`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数からエラーを返す</h2>
        <GoEditor
          defaultCode={`package main

import (
    "errors"
    "fmt"
    "math"
)

func sqrt(x float64) (float64, error) {
    if x < 0 {
        return 0, errors.New("負の数の平方根は計算できません")
    }
    return math.Sqrt(x), nil
}

func main() {
    // 正常なケース
    result, err := sqrt(16)
    if err != nil {
        fmt.Println("エラー:", err)
    } else {
        fmt.Printf("sqrt(16) = %.1f\\n", result)
    }

    // エラーケース
    result, err = sqrt(-4)
    if err != nil {
        fmt.Println("エラー:", err)
    } else {
        fmt.Printf("sqrt(-4) = %.1f\\n", result)
    }
}`}
          expectedOutput={`sqrt(16) = 4.0
エラー: 負の数の平方根は計算できません`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="errors" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/errors" />
    </div>
  );
}

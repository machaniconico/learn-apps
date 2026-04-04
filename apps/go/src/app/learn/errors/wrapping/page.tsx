import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("errors");

export default function ErrorWrappingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">エラー処理 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">エラーラッピング</h1>
        <p className="text-gray-400">fmt.Errorfの%w動詞を使ったエラーのラッピングを学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">エラーのラッピングとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          エラーラッピングは、元のエラーにコンテキスト情報を追加する手法です。
          <code className="text-cyan-300">fmt.Errorf(&quot;...:%w&quot;, err)</code> の <code className="text-cyan-300">%w</code> 動詞で
          元のエラーをラップすると、エラーチェーンが形成されます。
          <code className="text-cyan-300">%s</code> や <code className="text-cyan-300">%v</code> ではエラーチェーンが切れるので注意してください。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">%wでエラーをラップ</h2>
        <GoEditor
          defaultCode={`package main

import (
    "errors"
    "fmt"
)

func readConfig() error {
    return errors.New("ファイルが見つかりません")
}

func initApp() error {
    err := readConfig()
    if err != nil {
        // %wでラップ（エラーチェーンを保持）
        return fmt.Errorf("設定の読み込みに失敗: %w", err)
    }
    return nil
}

func startServer() error {
    err := initApp()
    if err != nil {
        return fmt.Errorf("サーバー起動に失敗: %w", err)
    }
    return nil
}

func main() {
    err := startServer()
    if err != nil {
        fmt.Println("エラー:", err)

        // Unwrapでチェーンを辿る
        unwrapped := errors.Unwrap(err)
        fmt.Println("1段階アンラップ:", unwrapped)

        unwrapped2 := errors.Unwrap(unwrapped)
        fmt.Println("2段階アンラップ:", unwrapped2)
    }
}`}
          expectedOutput={`エラー: サーバー起動に失敗: 設定の読み込みに失敗: ファイルが見つかりません
1段階アンラップ: 設定の読み込みに失敗: ファイルが見つかりません
2段階アンラップ: ファイルが見つかりません`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">%wと%sの違い</h2>
        <GoEditor
          defaultCode={`package main

import (
    "errors"
    "fmt"
)

var ErrNotFound = errors.New("見つかりません")

func withWrap() error {
    return fmt.Errorf("データ取得失敗: %w", ErrNotFound)
}

func withoutWrap() error {
    return fmt.Errorf("データ取得失敗: %s", ErrNotFound)
}

func main() {
    // %w: エラーチェーンが保持される
    err1 := withWrap()
    fmt.Println("%w:", errors.Is(err1, ErrNotFound))

    // %s: エラーチェーンが切れる
    err2 := withoutWrap()
    fmt.Println("%s:", errors.Is(err2, ErrNotFound))

    // 表示は同じ
    fmt.Println("err1:", err1)
    fmt.Println("err2:", err2)
}`}
          expectedOutput={`%w: true
%s: false
err1: データ取得失敗: 見つかりません
err2: データ取得失敗: 見つかりません`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実用的なラッピング例</h2>
        <GoEditor
          defaultCode={`package main

import (
    "errors"
    "fmt"
)

var ErrInvalidInput = errors.New("入力が不正です")

func parseAge(s string) (int, error) {
    var age int
    _, err := fmt.Sscanf(s, "%d", &age)
    if err != nil {
        return 0, fmt.Errorf("年齢のパースに失敗 (%q): %w", s, ErrInvalidInput)
    }
    if age < 0 || age > 150 {
        return 0, fmt.Errorf("年齢が範囲外 (%d): %w", age, ErrInvalidInput)
    }
    return age, nil
}

func main() {
    inputs := []string{"25", "abc", "200"}

    for _, input := range inputs {
        age, err := parseAge(input)
        if err != nil {
            if errors.Is(err, ErrInvalidInput) {
                fmt.Printf("入力 %q: 不正な入力です - %s\\n", input, err)
            } else {
                fmt.Printf("入力 %q: 予期しないエラー - %s\\n", input, err)
            }
        } else {
            fmt.Printf("入力 %q: 年齢=%d\\n", input, age)
        }
    }
}`}
          expectedOutput={`入力 "25": 年齢=25
入力 "abc": 不正な入力です - 年齢のパースに失敗 ("abc"): 入力が不正です
入力 "200": 不正な入力です - 年齢が範囲外 (200): 入力が不正です`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="errors" lessonId="wrapping" />
      </div>
      <LessonNav lessons={lessons} currentId="wrapping" basePath="/learn/errors" />
    </div>
  );
}

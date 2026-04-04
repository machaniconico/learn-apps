import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("errors");

export default function ErrorsIsAsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">エラー処理 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">errors.Is・As</h1>
        <p className="text-gray-400">errors.Is()とerrors.As()でエラーを判定・型変換する方法を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">errors.Isとerrors.As</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">errors.Is(err, target)</code> はエラーチェーンを辿ってtargetと一致するエラーがあるか判定します。
          <code className="text-cyan-300">errors.As(err, &amp;target)</code> はエラーチェーンを辿って特定の型のエラーを取り出します。
          ラップされたエラーでも正しく動作するため、直接の <code className="text-cyan-300">==</code> 比較や型アサーションより推奨されます。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">errors.Isの使い方</h2>
        <GoEditor
          defaultCode={`package main

import (
    "errors"
    "fmt"
)

var (
    ErrNotFound   = errors.New("見つかりません")
    ErrForbidden  = errors.New("アクセス禁止")
)

func getUser(id int) error {
    if id == 0 {
        return fmt.Errorf("ユーザー取得失敗: %w", ErrNotFound)
    }
    if id < 0 {
        return fmt.Errorf("アクセス拒否: %w", ErrForbidden)
    }
    return nil
}

func main() {
    err := getUser(0)

    // errors.Isでチェーンを辿って判定
    if errors.Is(err, ErrNotFound) {
        fmt.Println("ユーザーが見つかりません")
    }

    err2 := getUser(-1)
    if errors.Is(err2, ErrForbidden) {
        fmt.Println("アクセスが禁止されています")
    }

    // ラップされていても判定できる
    wrapped := fmt.Errorf("外側のエラー: %w", err)
    fmt.Println("2段ラップ後もIs:", errors.Is(wrapped, ErrNotFound))
}`}
          expectedOutput={`ユーザーが見つかりません
アクセスが禁止されています
2段ラップ後もIs: true`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">errors.Asの使い方</h2>
        <GoEditor
          defaultCode={`package main

import (
    "errors"
    "fmt"
)

type HTTPError struct {
    Code    int
    Message string
}

func (e *HTTPError) Error() string {
    return fmt.Sprintf("HTTP %d: %s", e.Code, e.Message)
}

func fetchData() error {
    return fmt.Errorf("API呼び出し失敗: %w",
        &HTTPError{Code: 404, Message: "リソースが見つかりません"})
}

func main() {
    err := fetchData()

    // errors.Asで特定の型を取り出す
    var httpErr *HTTPError
    if errors.As(err, &httpErr) {
        fmt.Printf("HTTPエラーコード: %d\\n", httpErr.Code)
        fmt.Printf("メッセージ: %s\\n", httpErr.Message)

        if httpErr.Code == 404 {
            fmt.Println("→ リソースが存在しません")
        }
    }

    // 完全なエラーメッセージ
    fmt.Println("完全メッセージ:", err)
}`}
          expectedOutput={`HTTPエラーコード: 404
メッセージ: リソースが見つかりません
→ リソースが存在しません
完全メッセージ: API呼び出し失敗: HTTP 404: リソースが見つかりません`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">IsとAsの使い分け</h2>
        <GoEditor
          defaultCode={`package main

import (
    "errors"
    "fmt"
)

var ErrTimeout = errors.New("タイムアウト")

type RetryError struct {
    Attempts int
    Last     error
}

func (e *RetryError) Error() string {
    return fmt.Sprintf("%d回リトライ後に失敗: %s", e.Attempts, e.Last)
}

func (e *RetryError) Unwrap() error {
    return e.Last
}

func callAPI() error {
    return &RetryError{
        Attempts: 3,
        Last:     fmt.Errorf("接続失敗: %w", ErrTimeout),
    }
}

func main() {
    err := callAPI()

    // Is: 特定のエラーかどうか判定
    if errors.Is(err, ErrTimeout) {
        fmt.Println("タイムアウトが発生しました")
    }

    // As: エラーの詳細情報を取得
    var retryErr *RetryError
    if errors.As(err, &retryErr) {
        fmt.Printf("リトライ回数: %d\\n", retryErr.Attempts)
    }

    fmt.Println("エラー全文:", err)
}`}
          expectedOutput={`タイムアウトが発生しました
リトライ回数: 3
エラー全文: 3回リトライ後に失敗: 接続失敗: タイムアウト`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="errors" lessonId="errors-is-as" />
      </div>
      <LessonNav lessons={lessons} currentId="errors-is-as" basePath="/learn/errors" />
    </div>
  );
}

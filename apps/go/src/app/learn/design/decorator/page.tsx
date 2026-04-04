import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function DecoratorPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">設計パターン レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">デコレータ</h1>
        <p className="text-gray-400">関数ラッピングによる機能拡張パターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">デコレータパターン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          デコレータパターンは既存の関数やオブジェクトを変更せずに機能を追加するパターンです。
          Goでは<code className="text-cyan-300">関数ラッピング</code>や
          <code className="text-cyan-300">インターフェースの埋め込み</code>で実現します。
          HTTPミドルウェアもデコレータの一種です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数デコレータ</h2>
        <p className="text-gray-400 mb-4">
          関数を引数に取り、拡張された関数を返すデコレータパターンです。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type MathFunc func(a, b int) int

// ログ出力デコレータ
func withLogging(name string, fn MathFunc) MathFunc {
    return func(a, b int) int {
        fmt.Printf("[LOG] %s(%d, %d) を呼び出し\\n", name, a, b)
        result := fn(a, b)
        fmt.Printf("[LOG] 結果: %d\\n", result)
        return result
    }
}

func add(a, b int) int { return a + b }
func multiply(a, b int) int { return a * b }

func main() {
    // デコレータで拡張
    loggedAdd := withLogging("add", add)
    loggedMul := withLogging("multiply", multiply)

    loggedAdd(3, 5)
    fmt.Println()
    loggedMul(4, 6)
}`}
          expectedOutput={`[LOG] add(3, 5) を呼び出し
[LOG] 結果: 8

[LOG] multiply(4, 6) を呼び出し
[LOG] 結果: 24`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数デコレータの連鎖</h2>
        <p className="text-gray-400 mb-4">
          複数のデコレータを重ねて機能を積み上げるパターンです。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "strings"
)

type StringTransform func(string) string

// デコレータ: 大文字変換
func withUpperCase(fn StringTransform) StringTransform {
    return func(s string) string {
        result := fn(s)
        return strings.ToUpper(result)
    }
}

// デコレータ: プレフィックス追加
func withPrefix(prefix string, fn StringTransform) StringTransform {
    return func(s string) string {
        result := fn(s)
        return prefix + result
    }
}

// デコレータ: トリミング
func withTrim(fn StringTransform) StringTransform {
    return func(s string) string {
        result := fn(s)
        return strings.TrimSpace(result)
    }
}

func identity(s string) string { return s }

func main() {
    // デコレータを連鎖
    transform := withPrefix("[INFO] ",
        withUpperCase(
            withTrim(identity),
        ),
    )

    inputs := []string{"  hello world  ", " go lang ", "  design pattern  "}
    for _, input := range inputs {
        fmt.Printf("%q -> %s\\n", input, transform(input))
    }
}`}
          expectedOutput={`"  hello world  " -> [INFO] HELLO WORLD
" go lang " -> [INFO] GO LANG
"  design pattern  " -> [INFO] DESIGN PATTERN`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">HTTPミドルウェアとしてのデコレータ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">HTTPミドルウェア</code>はデコレータの代表的な応用例です。
          リクエスト処理の前後に機能を追加します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// HTTPハンドラのシミュレーション
type Handler func(request string) string

// ログミドルウェア
func loggingMiddleware(next Handler) Handler {
    return func(req string) string {
        fmt.Printf("リクエスト受信: %s\\n", req)
        response := next(req)
        fmt.Printf("レスポンス送信: %s\\n", response)
        return response
    }
}

// 認証ミドルウェア
func authMiddleware(next Handler) Handler {
    return func(req string) string {
        fmt.Println("認証チェック... OK")
        return next(req)
    }
}

// 実際のハンドラ
func helloHandler(req string) string {
    return fmt.Sprintf("Hello from %s!", req)
}

func main() {
    // ミドルウェアをチェーン
    handler := loggingMiddleware(authMiddleware(helloHandler))

    // リクエスト処理
    result := handler("/api/users")
    fmt.Printf("最終結果: %s\\n", result)
}`}
          expectedOutput={`リクエスト受信: /api/users
認証チェック... OK
レスポンス送信: Hello from /api/users!
最終結果: Hello from /api/users!`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="decorator" />
      </div>
      <LessonNav lessons={lessons} currentId="decorator" basePath="/learn/design" />
    </div>
  );
}

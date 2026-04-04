import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("http");

export default function MiddlewarePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">HTTP・Web レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ミドルウェア</h1>
        <p className="text-gray-400">http.Handlerを使ったミドルウェアチェーンパターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ミドルウェアパターン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ミドルウェアは<code className="text-cyan-300">http.Handler</code>を受け取り、新しい
          <code className="text-cyan-300">http.Handler</code>を返す関数です。リクエストの前後に処理を追加できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>ロギング — リクエスト情報の記録</li>
          <li>認証 — アクセス制御</li>
          <li>CORS — クロスオリジン設定</li>
          <li>リカバリ — パニックからの回復</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ミドルウェアの基本構造</h2>
        <p className="text-gray-400 mb-4">
          ミドルウェアは <code className="text-cyan-300">func(http.Handler) http.Handler</code> のシグネチャを持ちます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// ミドルウェアの型を模擬
type Handler func(request string) string
type Middleware func(Handler) Handler

// ロギングミドルウェア
func loggingMiddleware(next Handler) Handler {
    return func(req string) string {
        fmt.Printf("[LOG] リクエスト: %s\\n", req)
        result := next(req)
        fmt.Printf("[LOG] レスポンス: %s\\n", result)
        return result
    }
}

func mainHandler(req string) string {
    return "Hello, " + req
}

func main() {
    // ミドルウェアでハンドラをラップ
    wrapped := loggingMiddleware(mainHandler)
    wrapped("World")
}`}
          expectedOutput={`[LOG] リクエスト: World
[LOG] レスポンス: Hello, World`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ミドルウェアのチェーン</h2>
        <p className="text-gray-400 mb-4">
          複数のミドルウェアを連結して、処理のパイプラインを構築できます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Handler func(string) string
type Middleware func(Handler) Handler

func authMiddleware(next Handler) Handler {
    return func(req string) string {
        fmt.Println("[AUTH] 認証チェック")
        return next(req)
    }
}

func loggingMiddleware(next Handler) Handler {
    return func(req string) string {
        fmt.Println("[LOG] リクエスト開始")
        result := next(req)
        fmt.Println("[LOG] リクエスト終了")
        return result
    }
}

func recoveryMiddleware(next Handler) Handler {
    return func(req string) string {
        fmt.Println("[RECOVER] パニック保護開始")
        result := next(req)
        return result
    }
}

// ミドルウェアを連結する関数
func chain(h Handler, middlewares ...Middleware) Handler {
    for i := len(middlewares) - 1; i >= 0; i-- {
        h = middlewares[i](h)
    }
    return h
}

func main() {
    handler := func(req string) string {
        fmt.Printf("[HANDLER] 処理: %s\\n", req)
        return "OK"
    }

    chained := chain(handler,
        recoveryMiddleware,
        loggingMiddleware,
        authMiddleware,
    )
    chained("/api/users")
}`}
          expectedOutput={`[RECOVER] パニック保護開始
[LOG] リクエスト開始
[AUTH] 認証チェック
[HANDLER] 処理: /api/users
[LOG] リクエスト終了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実用的なミドルウェアのパターン</h2>
        <p className="text-gray-400 mb-4">
          実際のHTTPサーバーでよく使われるミドルウェアのパターンを確認しましょう。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    patterns := []struct {
        name string
        code string
    }{
        {
            "ロギング",
            "func(next http.Handler) http.Handler",
        },
        {
            "CORS",
            "w.Header().Set(\"Access-Control-Allow-Origin\", \"*\")",
        },
        {
            "認証",
            "token := r.Header.Get(\"Authorization\")",
        },
        {
            "タイムアウト",
            "http.TimeoutHandler(next, 30*time.Second, \"timeout\")",
        },
    }

    fmt.Println("=== よく使うミドルウェア ===")
    for _, p := range patterns {
        fmt.Printf("  %s: %s\\n", p.name, p.code)
    }
}`}
          expectedOutput={`=== よく使うミドルウェア ===
  ロギング: func(next http.Handler) http.Handler
  CORS: w.Header().Set("Access-Control-Allow-Origin", "*")
  認証: token := r.Header.Get("Authorization")
  タイムアウト: http.TimeoutHandler(next, 30*time.Second, "timeout")`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="http" lessonId="middleware" />
      </div>
      <LessonNav lessons={lessons} currentId="middleware" basePath="/learn/http" />
    </div>
  );
}

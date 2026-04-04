import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("http");

export default function MuxPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">HTTP・Web レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">マルチプレクサ</h1>
        <p className="text-gray-400">http.ServeMuxによるルーティングとGo 1.22の新パターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ServeMux の概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">http.ServeMux</code> はHTTPリクエストのURLパターンマッチングを行うマルチプレクサです。
          Go 1.22からメソッドとパスパラメータのサポートが追加されました。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">http.NewServeMux()</code> — 新しいmuxを作成</li>
          <li><code className="text-cyan-300">mux.HandleFunc(pattern, handler)</code> — ルート登録</li>
          <li><code className="text-cyan-300">&quot;GET /users&quot;</code> — メソッド付きパターン（Go 1.22）</li>
          <li><code className="text-cyan-300">&quot;/users/{'{'}id{'}'}&quot;</code> — パスパラメータ（Go 1.22）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">http.NewServeMux の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">http.NewServeMux()</code> で独自のマルチプレクサを作成し、
          ルートを登録します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // ServeMux のルーティングパターン
    routes := []struct {
        pattern string
        desc    string
    }{
        {"/", "ルートパス（フォールバック）"},
        {"/users", "/users への完全一致"},
        {"/users/", "/users/ 以下すべて（プレフィックス）"},
        {"/static/", "静的ファイルのプレフィックス"},
    }

    fmt.Println("=== 基本的なパターンマッチング ===")
    for _, r := range routes {
        fmt.Printf("  %-15s → %s\\n", r.pattern, r.desc)
    }
}`}
          expectedOutput={`=== 基本的なパターンマッチング ===
  /               → ルートパス（フォールバック）
  /users          → /users への完全一致
  /users/         → /users/ 以下すべて（プレフィックス）
  /static/        → 静的ファイルのプレフィックス`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Go 1.22のメソッドパターン</h2>
        <p className="text-gray-400 mb-4">
          Go 1.22からパターンにHTTPメソッドを含めることができます。
          <code className="text-cyan-300">&quot;GET /users&quot;</code> のように書きます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // Go 1.22 のメソッド付きパターン
    patterns := []struct {
        pattern string
        desc    string
    }{
        {"GET /users", "GET メソッドのみ"},
        {"POST /users", "POST メソッドのみ"},
        {"PUT /users/{id}", "PUT + パスパラメータ"},
        {"DELETE /users/{id}", "DELETE + パスパラメータ"},
        {"GET /files/{path...}", "ワイルドカード（残りのパス）"},
    }

    fmt.Println("=== Go 1.22 の新パターン ===")
    for _, p := range patterns {
        fmt.Printf("  %-25s → %s\\n", p.pattern, p.desc)
    }
}`}
          expectedOutput={`=== Go 1.22 の新パターン ===
  GET /users                → GET メソッドのみ
  POST /users               → POST メソッドのみ
  PUT /users/{id}           → PUT + パスパラメータ
  DELETE /users/{id}        → DELETE + パスパラメータ
  GET /files/{path...}      → ワイルドカード（残りのパス）`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">パスパラメータの取得</h2>
        <p className="text-gray-400 mb-4">
          Go 1.22では <code className="text-cyan-300">r.PathValue(&quot;id&quot;)</code> でパスパラメータを取得できます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "net/http"
)

func main() {
    // PathValue の使用例を解説
    mux := http.NewServeMux()

    mux.HandleFunc("GET /users/{id}", func(w http.ResponseWriter, r *http.Request) {
        id := r.PathValue("id")
        fmt.Fprintf(w, "ユーザーID: %s", id)
    })

    fmt.Println("パターン: GET /users/{id}")
    fmt.Println("r.PathValue(\"id\") でパスパラメータを取得")
    fmt.Println("例: /users/42 → id = \"42\"")
    fmt.Println("例: /users/abc → id = \"abc\"")
}`}
          expectedOutput={`パターン: GET /users/{id}
r.PathValue("id") でパスパラメータを取得
例: /users/42 → id = "42"
例: /users/abc → id = "abc"`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="http" lessonId="mux" />
      </div>
      <LessonNav lessons={lessons} currentId="mux" basePath="/learn/http" />
    </div>
  );
}

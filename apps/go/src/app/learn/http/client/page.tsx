import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("http");

export default function ClientPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">HTTP・Web レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">HTTPクライアント</h1>
        <p className="text-gray-400">http.Get、http.Post、http.Clientの使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">HTTPクライアントの概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">net/http</code> パッケージはHTTPクライアントの機能も提供します。
          シンプルな関数呼び出しから、カスタマイズ可能な <code className="text-cyan-300">http.Client</code> まで対応しています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">http.Get(url)</code> — GETリクエスト</li>
          <li><code className="text-cyan-300">http.Post(url, contentType, body)</code> — POSTリクエスト</li>
          <li><code className="text-cyan-300">http.Client{'{'}Timeout: ...{'}'}</code> — カスタムクライアント</li>
          <li><code className="text-cyan-300">http.NewRequest</code> — カスタムリクエスト作成</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">http.NewRequest でリクエスト作成</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">http.NewRequest</code> でメソッド、URL、ヘッダーを細かく設定できます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "net/http"
)

func main() {
    // カスタムリクエストの作成
    req, err := http.NewRequest("GET", "https://api.example.com/users", nil)
    if err != nil {
        fmt.Println("エラー:", err)
        return
    }

    // ヘッダーの設定
    req.Header.Set("Authorization", "Bearer token123")
    req.Header.Set("Accept", "application/json")

    fmt.Println("メソッド:", req.Method)
    fmt.Println("URL:", req.URL)
    fmt.Println("Authorization:", req.Header.Get("Authorization"))
    fmt.Println("Accept:", req.Header.Get("Accept"))
}`}
          expectedOutput={`メソッド: GET
URL: https://api.example.com/users
Authorization: Bearer token123
Accept: application/json`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">http.Client のカスタマイズ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">http.Client</code> でタイムアウトやリダイレクトポリシーを設定できます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "time"
)

func main() {
    // http.Client の設定項目
    settings := []struct {
        field string
        value string
        desc  string
    }{
        {"Timeout", "30 * time.Second", "リクエスト全体のタイムアウト"},
        {"Transport", "http.DefaultTransport", "コネクション管理"},
        {"CheckRedirect", "func(req, via) error", "リダイレクトポリシー"},
        {"Jar", "cookiejar.New(nil)", "Cookie管理"},
    }

    timeout := 30 * time.Second
    fmt.Printf("タイムアウト設定: %v\\n\\n", timeout)

    for _, s := range settings {
        fmt.Printf("%-15s = %-25s (%s)\\n", s.field, s.value, s.desc)
    }
}`}
          expectedOutput={`タイムアウト設定: 30s

Timeout         = 30 * time.Second           (リクエスト全体のタイムアウト)
Transport       = http.DefaultTransport       (コネクション管理)
CheckRedirect   = func(req, via) error        (リダイレクトポリシー)
Jar             = cookiejar.New(nil)           (Cookie管理)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">レスポンスの処理パターン</h2>
        <p className="text-gray-400 mb-4">
          HTTPレスポンスは必ず <code className="text-cyan-300">resp.Body.Close()</code> で閉じる必要があります。
          <code className="text-cyan-300">defer</code> を使うのが定番です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // HTTPレスポンス処理の定番パターン
    fmt.Println("=== レスポンス処理のパターン ===")
    fmt.Println()
    fmt.Println("resp, err := client.Do(req)")
    fmt.Println("if err != nil {")
    fmt.Println("    log.Fatal(err)")
    fmt.Println("}")
    fmt.Println("defer resp.Body.Close()  // 必ずBodyを閉じる")
    fmt.Println()
    fmt.Println("// ステータスコードの確認")
    fmt.Println("fmt.Println(resp.StatusCode)  // 200")
    fmt.Println("fmt.Println(resp.Status)      // \"200 OK\"")
    fmt.Println()
    fmt.Println("// ボディの読み取り")
    fmt.Println("body, err := io.ReadAll(resp.Body)")
}`}
          expectedOutput={`=== レスポンス処理のパターン ===

resp, err := client.Do(req)
if err != nil {
    log.Fatal(err)
}
defer resp.Body.Close()  // 必ずBodyを閉じる

// ステータスコードの確認
fmt.Println(resp.StatusCode)  // 200
fmt.Println(resp.Status)      // "200 OK"

// ボディの読み取り
body, err := io.ReadAll(resp.Body)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="http" lessonId="client" />
      </div>
      <LessonNav lessons={lessons} currentId="client" basePath="/learn/http" />
    </div>
  );
}

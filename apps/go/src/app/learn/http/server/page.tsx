import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("http");

export default function ServerPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">HTTP・Web レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">HTTPサーバー</h1>
        <p className="text-gray-400">net/httpパッケージで簡単なHTTPサーバーを構築しましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">http.ListenAndServe</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">http.ListenAndServe</code> は指定したアドレスでHTTPサーバーを起動します。
          第1引数はアドレス（<code className="text-cyan-300">":8080"</code>）、第2引数はハンドラ（<code className="text-cyan-300">nil</code> でデフォルトマルチプレクサ）です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">http.ListenAndServe(addr, handler)</code> — サーバー起動</li>
          <li><code className="text-cyan-300">http.HandleFunc(pattern, handler)</code> — ルート登録</li>
          <li><code className="text-cyan-300">http.ResponseWriter</code> — レスポンスの書き込み</li>
          <li><code className="text-cyan-300">*http.Request</code> — リクエスト情報</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">最小のHTTPサーバー</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">http.HandleFunc</code> でルートを登録し、
          <code className="text-cyan-300">http.ListenAndServe</code> でサーバーを起動します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "net/http"
)

func main() {
    // ハンドラ関数の登録
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello, World!")
    })

    fmt.Println("サーバー起動準備: :8080")
    fmt.Println("ハンドラ登録: / -> Hello, World!")

    // 実際に起動する場合:
    // http.ListenAndServe(":8080", nil)
}`}
          expectedOutput={`サーバー起動準備: :8080
ハンドラ登録: / -> Hello, World!`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数のルートを登録</h2>
        <p className="text-gray-400 mb-4">
          複数のパスに対して異なるハンドラを登録できます。
          <code className="text-cyan-300">r.URL.Path</code> でリクエストパスを取得します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // 複数ルートの登録例
    routes := map[string]string{
        "/":      "トップページ",
        "/about": "Aboutページ",
        "/api":   "APIエンドポイント",
    }

    for path, desc := range routes {
        fmt.Printf("ルート: %s -> %s\\n", path, desc)
    }

    fmt.Println("\\nサーバーは各パスに対応するレスポンスを返します")
}`}
          expectedOutput={`ルート: / -> トップページ
ルート: /about -> Aboutページ
ルート: /api -> APIエンドポイント

サーバーは各パスに対応するレスポンスを返します`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">リクエスト情報の取得</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">*http.Request</code> からメソッド、パス、ヘッダーなどの情報を取得できます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "net/http"
)

func main() {
    // http.Request の主要フィールド
    req, _ := http.NewRequest("GET", "http://localhost:8080/users?page=1", nil)
    req.Header.Set("Content-Type", "application/json")

    fmt.Println("メソッド:", req.Method)
    fmt.Println("URL:", req.URL)
    fmt.Println("パス:", req.URL.Path)
    fmt.Println("クエリ:", req.URL.RawQuery)
    fmt.Println("Content-Type:", req.Header.Get("Content-Type"))
}`}
          expectedOutput={`メソッド: GET
URL: http://localhost:8080/users?page=1
パス: /users
クエリ: page=1
Content-Type: application/json`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="http" lessonId="server" />
      </div>
      <LessonNav lessons={lessons} currentId="server" basePath="/learn/http" />
    </div>
  );
}

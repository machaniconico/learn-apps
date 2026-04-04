import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("http");

export default function RestPatternsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">HTTP・Web レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">RESTパターン</h1>
        <p className="text-gray-400">GoでRESTful APIを設計・実装するパターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">RESTful API設計</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          REST APIはリソースをURLで表し、HTTPメソッドで操作を表現します。
          Go 1.22の新しいServeMuxパターンにより、標準ライブラリだけでRESTful APIを構築できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">GET /resources</code> — リソース一覧の取得</li>
          <li><code className="text-cyan-300">GET /resources/{'{'}id{'}'}</code> — 単一リソースの取得</li>
          <li><code className="text-cyan-300">POST /resources</code> — リソースの作成</li>
          <li><code className="text-cyan-300">PUT /resources/{'{'}id{'}'}</code> — リソースの更新</li>
          <li><code className="text-cyan-300">DELETE /resources/{'{'}id{'}'}</code> — リソースの削除</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">REST APIのルーティング</h2>
        <p className="text-gray-400 mb-4">
          Go 1.22のServeMuxでRESTfulなルーティングを構築します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // REST APIのルーティング定義
    routes := []struct {
        method  string
        path    string
        handler string
    }{
        {"GET", "/api/users", "listUsers"},
        {"GET", "/api/users/{id}", "getUser"},
        {"POST", "/api/users", "createUser"},
        {"PUT", "/api/users/{id}", "updateUser"},
        {"DELETE", "/api/users/{id}", "deleteUser"},
    }

    fmt.Println("=== ユーザー API ルーティング ===")
    for _, r := range routes {
        fmt.Printf("  %-7s %-20s -> %s()\\n", r.method, r.path, r.handler)
    }
}`}
          expectedOutput={`=== ユーザー API ルーティング ===
  GET     /api/users           -> listUsers()
  GET     /api/users/{id}      -> getUser()
  POST    /api/users           -> createUser()
  PUT     /api/users/{id}      -> updateUser()
  DELETE  /api/users/{id}      -> deleteUser()`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">CRUD操作のパターン</h2>
        <p className="text-gray-400 mb-4">
          インメモリストレージを使ったCRUD操作の実装パターンを確認しましょう。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "encoding/json"
    "fmt"
    "os"
)

type User struct {
    ID   int    \`json:"id"\`
    Name string \`json:"name"\`
}

// インメモリストレージ
var users = []User{
    {ID: 1, Name: "田中太郎"},
    {ID: 2, Name: "佐藤花子"},
}
var nextID = 3

func listUsers() []User {
    return users
}

func createUser(name string) User {
    user := User{ID: nextID, Name: name}
    users = append(users, user)
    nextID++
    return user
}

func main() {
    // 一覧取得
    fmt.Println("=== GET /api/users ===")
    enc := json.NewEncoder(os.Stdout)
    enc.SetIndent("", "  ")
    enc.Encode(listUsers())

    // 新規作成
    fmt.Println("=== POST /api/users ===")
    newUser := createUser("鈴木一郎")
    enc.Encode(newUser)

    // 更新後の一覧
    fmt.Println("=== GET /api/users (更新後) ===")
    fmt.Printf("合計ユーザー数: %d\\n", len(users))
}`}
          expectedOutput={`=== GET /api/users ===
[
  {
    "id": 1,
    "name": "田中太郎"
  },
  {
    "id": 2,
    "name": "佐藤花子"
  }
]
=== POST /api/users ===
{
  "id": 3,
  "name": "鈴木一郎"
}
=== GET /api/users (更新後) ===
合計ユーザー数: 3`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">HTTPステータスコードの使い分け</h2>
        <p className="text-gray-400 mb-4">
          REST APIでは適切なHTTPステータスコードを返すことが重要です。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "net/http"
)

func main() {
    codes := []struct {
        code int
        text string
        use  string
    }{
        {http.StatusOK, http.StatusText(200), "取得・更新成功"},
        {http.StatusCreated, http.StatusText(201), "作成成功"},
        {http.StatusNoContent, http.StatusText(204), "削除成功"},
        {http.StatusBadRequest, http.StatusText(400), "不正なリクエスト"},
        {http.StatusNotFound, http.StatusText(404), "リソースが見つからない"},
        {http.StatusInternalServerError, http.StatusText(500), "サーバーエラー"},
    }

    fmt.Println("=== REST API ステータスコード ===")
    for _, c := range codes {
        fmt.Printf("  %d %-25s %s\\n", c.code, c.text, c.use)
    }
}`}
          expectedOutput={`=== REST API ステータスコード ===
  200 OK                        取得・更新成功
  201 Created                   作成成功
  204 No Content                削除成功
  400 Bad Request               不正なリクエスト
  404 Not Found                 リソースが見つからない
  500 Internal Server Error     サーバーエラー`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="http" lessonId="rest-patterns" />
      </div>
      <LessonNav lessons={lessons} currentId="rest-patterns" basePath="/learn/http" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("http");

export default function JsonApiPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">HTTP・Web レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">JSON API</h1>
        <p className="text-gray-400">encoding/jsonとnet/httpを組み合わせてJSON APIを構築しましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">JSON APIの基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          GoでJSON APIを構築するには、<code className="text-cyan-300">encoding/json</code> でデータをシリアライズし、
          <code className="text-cyan-300">Content-Type</code> ヘッダーを設定してレスポンスを返します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">json.NewEncoder(w).Encode(data)</code> — JSON書き込み</li>
          <li><code className="text-cyan-300">json.NewDecoder(r.Body).Decode(&amp;data)</code> — JSONの読み取り</li>
          <li><code className="text-cyan-300">w.Header().Set(&quot;Content-Type&quot;, &quot;application/json&quot;)</code></li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">JSONレスポンスの返却</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">json.NewEncoder</code> で構造体を直接レスポンスに書き込みます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "encoding/json"
    "fmt"
    "os"
)

type User struct {
    ID    int    \`json:"id"\`
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
}

func main() {
    user := User{ID: 1, Name: "田中太郎", Email: "tanaka@example.com"}

    // json.NewEncoder で直接書き込み
    fmt.Println("=== JSON レスポンス ===")
    encoder := json.NewEncoder(os.Stdout)
    encoder.SetIndent("", "  ")
    encoder.Encode(user)
}`}
          expectedOutput={`=== JSON レスポンス ===
{
  "id": 1,
  "name": "田中太郎",
  "email": "tanaka@example.com"
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">リクエストボディのパース</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">json.NewDecoder</code> でリクエストボディのJSONをデコードします。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "encoding/json"
    "fmt"
    "strings"
)

type CreateUserRequest struct {
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
}

func main() {
    // リクエストボディを模擬
    body := strings.NewReader(\`{"name": "佐藤花子", "email": "sato@example.com"}\`)

    var req CreateUserRequest
    err := json.NewDecoder(body).Decode(&req)
    if err != nil {
        fmt.Println("デコードエラー:", err)
        return
    }

    fmt.Printf("名前: %s\\n", req.Name)
    fmt.Printf("メール: %s\\n", req.Email)
}`}
          expectedOutput={`名前: 佐藤花子
メール: sato@example.com`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">エラーレスポンスの返却</h2>
        <p className="text-gray-400 mb-4">
          APIエラーも統一されたJSON形式で返すのがベストプラクティスです。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "encoding/json"
    "fmt"
    "os"
)

type ErrorResponse struct {
    Error   string \`json:"error"\`
    Message string \`json:"message"\`
    Code    int    \`json:"code"\`
}

type SuccessResponse struct {
    Data    interface{} \`json:"data"\`
    Message string      \`json:"message"\`
}

func main() {
    // エラーレスポンス
    errResp := ErrorResponse{
        Error:   "not_found",
        Message: "ユーザーが見つかりません",
        Code:    404,
    }
    fmt.Println("=== エラーレスポンス ===")
    enc := json.NewEncoder(os.Stdout)
    enc.SetIndent("", "  ")
    enc.Encode(errResp)

    // 成功レスポンス
    fmt.Println("=== 成功レスポンス ===")
    successResp := SuccessResponse{
        Data:    map[string]string{"id": "1", "name": "太郎"},
        Message: "取得成功",
    }
    enc.Encode(successResp)
}`}
          expectedOutput={`=== エラーレスポンス ===
{
  "error": "not_found",
  "message": "ユーザーが見つかりません",
  "code": 404
}
=== 成功レスポンス ===
{
  "data": {
    "id": "1",
    "name": "太郎"
  },
  "message": "取得成功"
}`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="http" lessonId="json-api" />
      </div>
      <LessonNav lessons={lessons} currentId="json-api" basePath="/learn/http" />
    </div>
  );
}

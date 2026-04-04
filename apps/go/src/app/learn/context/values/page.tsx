import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("context");

export default function ValuesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">コンテキスト レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">値の伝搬</h1>
        <p className="text-gray-400">context.WithValueでリクエストスコープのデータを受け渡す方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">context.WithValue</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">context.WithValue</code> はコンテキストにキーと値のペアを格納します。
          リクエストID、認証情報、トレース情報などのリクエストスコープのデータを渡すのに使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">context.WithValue(parent, key, value)</code> — 値の格納</li>
          <li><code className="text-cyan-300">ctx.Value(key)</code> — 値の取得</li>
          <li>キーはエクスポートされない型を使うのがベストプラクティス</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な値の格納と取得</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">WithValue</code> で値を格納し、
          <code className="text-cyan-300">Value</code> で取得します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "context"
    "fmt"
)

// キーの型を非公開にする（ベストプラクティス）
type contextKey string

const (
    requestIDKey contextKey = "requestID"
    userNameKey  contextKey = "userName"
)

func main() {
    ctx := context.Background()

    // 値を格納
    ctx = context.WithValue(ctx, requestIDKey, "req-12345")
    ctx = context.WithValue(ctx, userNameKey, "太郎")

    // 値を取得
    reqID := ctx.Value(requestIDKey)
    userName := ctx.Value(userNameKey)

    fmt.Printf("リクエストID: %s\\n", reqID)
    fmt.Printf("ユーザー名: %s\\n", userName)

    // 存在しないキー
    missing := ctx.Value(contextKey("missing"))
    fmt.Printf("存在しないキー: %v\\n", missing)
}`}
          expectedOutput={`リクエストID: req-12345
ユーザー名: 太郎
存在しないキー: <nil>`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数間での値の伝搬</h2>
        <p className="text-gray-400 mb-4">
          コンテキストを通じて、関数の呼び出しチェーン全体で値を共有できます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "context"
    "fmt"
)

type ctxKey string

const traceIDKey ctxKey = "traceID"

func handleRequest(ctx context.Context) {
    traceID := ctx.Value(traceIDKey).(string)
    fmt.Printf("[%s] リクエスト処理開始\\n", traceID)
    processData(ctx)
}

func processData(ctx context.Context) {
    traceID := ctx.Value(traceIDKey).(string)
    fmt.Printf("[%s] データ処理中\\n", traceID)
    saveResult(ctx)
}

func saveResult(ctx context.Context) {
    traceID := ctx.Value(traceIDKey).(string)
    fmt.Printf("[%s] 結果保存完了\\n", traceID)
}

func main() {
    ctx := context.WithValue(context.Background(), traceIDKey, "trace-abc-123")
    handleRequest(ctx)
}`}
          expectedOutput={`[trace-abc-123] リクエスト処理開始
[trace-abc-123] データ処理中
[trace-abc-123] 結果保存完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">型安全なヘルパー関数</h2>
        <p className="text-gray-400 mb-4">
          値の設定・取得をヘルパー関数でラップすると、型安全性が向上します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "context"
    "fmt"
)

type userKey struct{}

type User struct {
    ID   int
    Name string
    Role string
}

// コンテキストにユーザーを設定
func WithUser(ctx context.Context, user *User) context.Context {
    return context.WithValue(ctx, userKey{}, user)
}

// コンテキストからユーザーを取得
func GetUser(ctx context.Context) (*User, bool) {
    user, ok := ctx.Value(userKey{}).(*User)
    return user, ok
}

func authorize(ctx context.Context) {
    user, ok := GetUser(ctx)
    if !ok {
        fmt.Println("認証エラー: ユーザー情報なし")
        return
    }
    fmt.Printf("認証OK: %s (ID:%d, Role:%s)\\n", user.Name, user.ID, user.Role)
}

func main() {
    ctx := context.Background()

    // ユーザー情報を設定
    user := &User{ID: 1, Name: "太郎", Role: "admin"}
    ctx = WithUser(ctx, user)

    authorize(ctx)

    // ユーザーなしの場合
    authorize(context.Background())
}`}
          expectedOutput={`認証OK: 太郎 (ID:1, Role:admin)
認証エラー: ユーザー情報なし`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="context" lessonId="values" />
      </div>
      <LessonNav lessons={lessons} currentId="values" basePath="/learn/context" />
    </div>
  );
}

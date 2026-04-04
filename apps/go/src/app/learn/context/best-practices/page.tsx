import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("context");

export default function BestPracticesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">コンテキスト レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ベストプラクティス</h1>
        <p className="text-gray-400">コンテキストの正しい使い方と避けるべきパターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コンテキストのルール</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Goチームが推奨するコンテキストの使い方のルールを守ることで、
          保守性が高く安全なコードを書けます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>関数の第1引数として渡す（<code className="text-cyan-300">ctx context.Context</code>）</li>
          <li>構造体のフィールドに保存しない</li>
          <li>nilのコンテキストを渡さない</li>
          <li>WithValueはリクエストスコープのデータのみに使う</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">第1引数として渡す</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">context.Context</code> は常に関数の第1引数に置きます。
          変数名は <code className="text-cyan-300">ctx</code> が慣例です。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "context"
    "fmt"
)

// 良い例: ctx が第1引数
func fetchUser(ctx context.Context, id int) string {
    _ = ctx // コンテキストを使用
    return fmt.Sprintf("ユーザー%d", id)
}

func saveData(ctx context.Context, data string) error {
    _ = ctx
    fmt.Printf("保存: %s\\n", data)
    return nil
}

func processRequest(ctx context.Context, userID int) {
    user := fetchUser(ctx, userID)
    saveData(ctx, user)
}

func main() {
    ctx := context.Background()
    processRequest(ctx, 42)

    // 正しい関数シグネチャの例
    signatures := []string{
        "func Get(ctx context.Context, key string) (string, error)",
        "func (s *Server) Handle(ctx context.Context, req *Request)",
        "func DoWork(ctx context.Context, opts ...Option) error",
    }
    fmt.Println("\\n=== 正しいシグネチャ ===")
    for _, sig := range signatures {
        fmt.Println(" ", sig)
    }
}`}
          expectedOutput={`保存: ユーザー42

=== 正しいシグネチャ ===
  func Get(ctx context.Context, key string) (string, error)
  func (s *Server) Handle(ctx context.Context, req *Request)
  func DoWork(ctx context.Context, opts ...Option) error`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">避けるべきパターン</h2>
        <p className="text-gray-400 mb-4">
          構造体にコンテキストを保存するのは避けましょう。代わりにメソッドの引数として渡します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fmt.Println("=== 避けるべきパターン ===")
    fmt.Println()

    bad := []struct {
        pattern string
        reason  string
    }{
        {
            "type Server struct { ctx context.Context }",
            "構造体にctxを保存しない",
        },
        {
            "func DoWork(data string, ctx context.Context)",
            "ctxは第1引数にする",
        },
        {
            "func Process(ctx context.Context = nil)",
            "nilを渡さない（Background()を使う）",
        },
        {
            "ctx.WithValue(ctx, \"user\", user)",
            "string型のキーを使わない",
        },
    }

    for _, b := range bad {
        fmt.Printf("  NG: %s\\n", b.pattern)
        fmt.Printf("      理由: %s\\n\\n", b.reason)
    }
}`}
          expectedOutput={`=== 避けるべきパターン ===

  NG: type Server struct { ctx context.Context }
      理由: 構造体にctxを保存しない

  NG: func DoWork(data string, ctx context.Context)
      理由: ctxは第1引数にする

  NG: func Process(ctx context.Context = nil)
      理由: nilを渡さない（Background()を使う）

  NG: ctx.WithValue(ctx, "user", user)
      理由: string型のキーを使わない`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">WithValue の適切な使い方</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">WithValue</code> はリクエストスコープのメタデータに限定して使います。
          ビジネスロジックのパラメータには使いません。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fmt.Println("=== WithValue の適切な使い方 ===")
    fmt.Println()

    good := []string{
        "リクエストID (トレーシング)",
        "認証済みユーザー情報",
        "分散トレースのスパン",
        "ロガーインスタンス",
    }

    bad := []string{
        "データベース接続 (引数で渡す)",
        "設定値 (引数やDIで渡す)",
        "関数のパラメータ (引数で渡す)",
        "エラーハンドリング (戻り値で返す)",
    }

    fmt.Println("  適切:")
    for _, g := range good {
        fmt.Println("    ○", g)
    }

    fmt.Println()
    fmt.Println("  不適切:")
    for _, b := range bad {
        fmt.Println("    ×", b)
    }
}`}
          expectedOutput={`=== WithValue の適切な使い方 ===

  適切:
    ○ リクエストID (トレーシング)
    ○ 認証済みユーザー情報
    ○ 分散トレースのスパン
    ○ ロガーインスタンス

  不適切:
    × データベース接続 (引数で渡す)
    × 設定値 (引数やDIで渡す)
    × 関数のパラメータ (引数で渡す)
    × エラーハンドリング (戻り値で返す)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="context" lessonId="best-practices" />
      </div>
      <LessonNav lessons={lessons} currentId="best-practices" basePath="/learn/context" />
    </div>
  );
}

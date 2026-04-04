import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("context");

export default function BasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">コンテキスト レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コンテキストの基本</h1>
        <p className="text-gray-400">context.Background()とcontext.TODO()の使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">context パッケージ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">context</code> パッケージはキャンセルシグナル、タイムアウト、リクエストスコープの値を
          ゴルーチン間で伝播するための仕組みです。APIの境界を越えて処理のライフサイクルを管理します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">context.Background()</code> — ルートコンテキスト</li>
          <li><code className="text-cyan-300">context.TODO()</code> — 未決定時の仮コンテキスト</li>
          <li><code className="text-cyan-300">ctx.Done()</code> — キャンセルチャネル</li>
          <li><code className="text-cyan-300">ctx.Err()</code> — キャンセル理由</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">context.Background()</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">context.Background()</code> はコンテキストツリーのルートです。
          main関数、初期化、テストで使います。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "context"
    "fmt"
)

func process(ctx context.Context, name string) {
    fmt.Printf("処理: %s\\n", name)
    fmt.Printf("  Done: %v\\n", ctx.Done())
    fmt.Printf("  Err: %v\\n", ctx.Err())
}

func main() {
    // ルートコンテキストの作成
    ctx := context.Background()
    fmt.Println("Background コンテキスト作成")
    fmt.Printf("型: %T\\n\\n", ctx)

    process(ctx, "タスクA")
    process(ctx, "タスクB")
}`}
          expectedOutput={`Background コンテキスト作成
型: context.backgroundCtx

処理: タスクA
  Done: <nil>
  Err: <nil>
処理: タスクB
  Done: <nil>
  Err: <nil>`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">context.TODO()</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">context.TODO()</code> はどのコンテキストを使うか
          まだ決まっていない場合に使う仮のコンテキストです。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "context"
    "fmt"
)

func main() {
    // Background と TODO の使い分け
    bg := context.Background()
    todo := context.TODO()

    fmt.Println("Background:", bg)
    fmt.Println("TODO:", todo)
    fmt.Println()

    // 使い分けガイド
    cases := []struct {
        context string
        useCase string
    }{
        {"Background()", "main関数のエントリーポイント"},
        {"Background()", "テストの初期化"},
        {"Background()", "HTTPサーバーのトップレベル"},
        {"TODO()", "まだ適切なctxが不明な場合"},
        {"TODO()", "リファクタリング途中の仮配置"},
    }

    for _, c := range cases {
        fmt.Printf("  %s → %s\\n", c.context, c.useCase)
    }
}`}
          expectedOutput={`Background: context.background
TODO: context.todo

  Background() → main関数のエントリーポイント
  Background() → テストの初期化
  Background() → HTTPサーバーのトップレベル
  TODO() → まだ適切なctxが不明な場合
  TODO() → リファクタリング途中の仮配置`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">context.Context インターフェース</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">context.Context</code> が持つ4つのメソッドを理解しましょう。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // context.Context インターフェースの定義
    methods := []struct {
        signature string
        desc      string
    }{
        {"Deadline() (time.Time, bool)", "デッドラインの取得"},
        {"Done() <-chan struct{}", "キャンセル通知のチャネル"},
        {"Err() error", "キャンセル理由（CanceledかDeadlineExceeded）"},
        {"Value(key any) any", "コンテキストに格納された値"},
    }

    fmt.Println("=== context.Context インターフェース ===")
    for _, m := range methods {
        fmt.Printf("  %-35s  %s\\n", m.signature, m.desc)
    }

    fmt.Println()
    fmt.Println("すべてのメソッドはゴルーチンセーフです")
}`}
          expectedOutput={`=== context.Context インターフェース ===
  Deadline() (time.Time, bool)        デッドラインの取得
  Done() <-chan struct{}               キャンセル通知のチャネル
  Err() error                          キャンセル理由（CanceledかDeadlineExceeded）
  Value(key any) any                   コンテキストに格納された値

すべてのメソッドはゴルーチンセーフです`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="context" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/context" />
    </div>
  );
}

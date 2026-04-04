import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("context");

export default function CancelPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">コンテキスト レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">キャンセル</h1>
        <p className="text-gray-400">context.WithCancelによるキャンセル伝播のパターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">context.WithCancel</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">context.WithCancel</code> は親コンテキストから派生した新しいコンテキストと、
          キャンセル関数を返します。キャンセル関数を呼ぶと、そのコンテキストと全ての子コンテキストがキャンセルされます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">ctx, cancel := context.WithCancel(parent)</code></li>
          <li><code className="text-cyan-300">cancel()</code> — キャンセルを実行</li>
          <li><code className="text-cyan-300">defer cancel()</code> — リソースリークを防ぐ</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なキャンセル</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">WithCancel</code> でキャンセル可能なコンテキストを作成します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "context"
    "fmt"
)

func main() {
    ctx, cancel := context.WithCancel(context.Background())

    // キャンセル前
    fmt.Println("キャンセル前:")
    fmt.Println("  Err:", ctx.Err())

    // Done チャネルの状態チェック
    select {
    case <-ctx.Done():
        fmt.Println("  Done: 閉じている")
    default:
        fmt.Println("  Done: まだ開いている")
    }

    // キャンセル実行
    cancel()

    fmt.Println("\\nキャンセル後:")
    fmt.Println("  Err:", ctx.Err())

    select {
    case <-ctx.Done():
        fmt.Println("  Done: 閉じている")
    default:
        fmt.Println("  Done: まだ開いている")
    }
}`}
          expectedOutput={`キャンセル前:
  Err: <nil>
  Done: まだ開いている

キャンセル後:
  Err: context canceled
  Done: 閉じている`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">キャンセルの伝播</h2>
        <p className="text-gray-400 mb-4">
          親コンテキストをキャンセルすると、全ての子コンテキストも自動的にキャンセルされます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "context"
    "fmt"
)

func main() {
    // 親コンテキスト
    parent, cancelParent := context.WithCancel(context.Background())

    // 子コンテキスト
    child1, cancelChild1 := context.WithCancel(parent)
    child2, _ := context.WithCancel(parent)

    // 孫コンテキスト
    grandchild, _ := context.WithCancel(child1)

    _ = cancelChild1 // 未使用警告を避ける

    fmt.Println("=== キャンセル前 ===")
    fmt.Printf("parent: %v\\n", parent.Err())
    fmt.Printf("child1: %v\\n", child1.Err())
    fmt.Printf("child2: %v\\n", child2.Err())
    fmt.Printf("grandchild: %v\\n", grandchild.Err())

    // 親をキャンセル → 全て伝播
    cancelParent()

    fmt.Println("\\n=== 親キャンセル後 ===")
    fmt.Printf("parent: %v\\n", parent.Err())
    fmt.Printf("child1: %v\\n", child1.Err())
    fmt.Printf("child2: %v\\n", child2.Err())
    fmt.Printf("grandchild: %v\\n", grandchild.Err())
}`}
          expectedOutput={`=== キャンセル前 ===
parent: <nil>
child1: <nil>
child2: <nil>
grandchild: <nil>

=== 親キャンセル後 ===
parent: context canceled
child1: context canceled
child2: context canceled
grandchild: context canceled`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">defer cancel() のパターン</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">defer cancel()</code> でリソースリークを防ぐのが定番パターンです。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "context"
    "fmt"
)

func doTask(ctx context.Context, name string) error {
    // 子コンテキストを作成（必ず defer cancel()）
    ctx, cancel := context.WithCancel(ctx)
    defer cancel() // 関数終了時にリソース解放

    select {
    case <-ctx.Done():
        return ctx.Err()
    default:
        fmt.Printf("タスク '%s' 完了\\n", name)
        return nil
    }
}

func main() {
    ctx := context.Background()

    doTask(ctx, "データ取得")
    doTask(ctx, "変換処理")
    doTask(ctx, "保存処理")

    fmt.Println("\\n※ defer cancel() により各タスクのリソースは自動解放")
}`}
          expectedOutput={`タスク 'データ取得' 完了
タスク '変換処理' 完了
タスク '保存処理' 完了

※ defer cancel() により各タスクのリソースは自動解放`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="context" lessonId="cancel" />
      </div>
      <LessonNav lessons={lessons} currentId="cancel" basePath="/learn/context" />
    </div>
  );
}

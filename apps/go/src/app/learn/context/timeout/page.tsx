import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("context");

export default function TimeoutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">コンテキスト レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">タイムアウト</h1>
        <p className="text-gray-400">context.WithTimeoutとcontext.WithDeadlineの使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">タイムアウトとデッドライン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">context.WithTimeout</code> は相対的な時間（例: 3秒後）、
          <code className="text-cyan-300">context.WithDeadline</code> は絶対的な時刻でキャンセルを設定します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">context.WithTimeout(parent, duration)</code> — 相対時間</li>
          <li><code className="text-cyan-300">context.WithDeadline(parent, time)</code> — 絶対時刻</li>
          <li><code className="text-cyan-300">ctx.Deadline()</code> — デッドラインの取得</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">WithTimeout の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">WithTimeout</code> で指定時間後にキャンセルされるコンテキストを作成します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "context"
    "fmt"
    "time"
)

func main() {
    // 100ミリ秒のタイムアウト
    ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
    defer cancel()

    deadline, ok := ctx.Deadline()
    fmt.Println("デッドラインあり:", ok)
    fmt.Println("残り時間（約）:", time.Until(deadline).Round(time.Millisecond))

    // タイムアウトを待つ
    <-ctx.Done()
    fmt.Println("Err:", ctx.Err())
}`}
          expectedOutput={`デッドラインあり: true
残り時間（約）: 100ms
Err: context deadline exceeded`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">タイムアウト付き処理</h2>
        <p className="text-gray-400 mb-4">
          処理がタイムアウト内に完了するかチェックするパターンです。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "context"
    "fmt"
    "time"
)

func slowTask(ctx context.Context) (string, error) {
    select {
    case <-time.After(50 * time.Millisecond):
        return "完了", nil
    case <-ctx.Done():
        return "", ctx.Err()
    }
}

func main() {
    // 十分な時間がある場合
    ctx1, cancel1 := context.WithTimeout(context.Background(), 200*time.Millisecond)
    defer cancel1()
    result, err := slowTask(ctx1)
    if err != nil {
        fmt.Println("タスク1: エラー -", err)
    } else {
        fmt.Println("タスク1:", result)
    }

    // 時間が足りない場合
    ctx2, cancel2 := context.WithTimeout(context.Background(), 10*time.Millisecond)
    defer cancel2()
    result, err = slowTask(ctx2)
    if err != nil {
        fmt.Println("タスク2: エラー -", err)
    } else {
        fmt.Println("タスク2:", result)
    }
}`}
          expectedOutput={`タスク1: 完了
タスク2: エラー - context deadline exceeded`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">WithTimeout と WithDeadline の関係</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">WithTimeout</code> は内部的に <code className="text-cyan-300">WithDeadline</code> を使っています。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "time"
)

func main() {
    now := time.Now()

    // WithTimeout(ctx, 5*time.Second) は内部的に以下と同じ
    // WithDeadline(ctx, time.Now().Add(5*time.Second))

    timeout := 5 * time.Second
    deadline := now.Add(timeout)

    fmt.Println("=== WithTimeout vs WithDeadline ===")
    fmt.Printf("WithTimeout(ctx, %v)\\n", timeout)
    fmt.Printf("  → 内部: WithDeadline(ctx, now + %v)\\n", timeout)
    fmt.Println()

    fmt.Println("使い分け:")
    fmt.Println("  WithTimeout → 相対的: \"3秒以内に完了\"")
    fmt.Printf("  WithDeadline → 絶対的: \"%s までに完了\"\\n", deadline.Format("15:04:05"))
    fmt.Println()
    fmt.Println("※ 通常は WithTimeout の方がよく使われます")
}`}
          expectedOutput={`=== WithTimeout vs WithDeadline ===
WithTimeout(ctx, 5s)
  → 内部: WithDeadline(ctx, now + 5s)

使い分け:
  WithTimeout → 相対的: "3秒以内に完了"
  WithDeadline → 絶対的: "現在時刻+5s までに完了"

※ 通常は WithTimeout の方がよく使われます`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="context" lessonId="timeout" />
      </div>
      <LessonNav lessons={lessons} currentId="timeout" basePath="/learn/context" />
    </div>
  );
}

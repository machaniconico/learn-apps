import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("concurrency");

export default function ErrgroupPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">並行パターン レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">errgroup</h1>
        <p className="text-gray-400">golang.org/x/sync/errgroupを使った並行エラーハンドリングを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">errgroupとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">errgroup</code>は並行タスクのエラー処理を簡潔にするパッケージです。
          <code className="text-cyan-300">sync.WaitGroup</code>＋エラー伝播を1つにまとめています。
          エラーが発生すると自動的にキャンセルを伝播できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">errgroup.Group</code> — ゴルーチングループの管理</li>
          <li><code className="text-cyan-300">g.Go(func() error)</code> — ゴルーチンの追加</li>
          <li><code className="text-cyan-300">g.Wait()</code> — 全完了を待ち、最初のエラーを返す</li>
          <li><code className="text-cyan-300">errgroup.WithContext</code> — キャンセル付きグループ</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">errgroupの基本パターン</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">errgroup</code>の構造をシミュレーションして、基本的な使い方を確認します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "errors"
    "fmt"
    "sync"
)

// errgroup.Groupの簡易実装
type ErrGroup struct {
    wg   sync.WaitGroup
    mu   sync.Mutex
    err  error
}

func (g *ErrGroup) Go(f func() error) {
    g.wg.Add(1)
    go func() {
        defer g.wg.Done()
        if err := f(); err != nil {
            g.mu.Lock()
            if g.err == nil {
                g.err = err // 最初のエラーを保持
            }
            g.mu.Unlock()
        }
    }()
}

func (g *ErrGroup) Wait() error {
    g.wg.Wait()
    return g.err
}

func main() {
    var g ErrGroup

    urls := []string{
        "https://api.example.com/users",
        "https://api.example.com/posts",
        "https://api.example.com/error", // エラーが起きるURL
    }

    for _, url := range urls {
        url := url // ループ変数キャプチャ
        g.Go(func() error {
            if url == "https://api.example.com/error" {
                return errors.New("接続エラー: " + url)
            }
            fmt.Printf("取得成功: %s\\n", url)
            return nil
        })
    }

    if err := g.Wait(); err != nil {
        fmt.Printf("エラー発生: %v\\n", err)
    } else {
        fmt.Println("全タスク成功")
    }
}`}
          expectedOutput={`取得成功: https://api.example.com/users
取得成功: https://api.example.com/posts
エラー発生: 接続エラー: https://api.example.com/error`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実際のerrgroupの使用例</h2>
        <p className="text-gray-400 mb-4">
          実際の<code className="text-cyan-300">errgroup</code>パッケージのAPIを確認しましょう。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// 実際のerrgroupコード:
// import "golang.org/x/sync/errgroup"
//
// func fetchAll(ctx context.Context) error {
//     g, ctx := errgroup.WithContext(ctx)
//
//     g.Go(func() error {
//         return fetchUsers(ctx)
//     })
//
//     g.Go(func() error {
//         return fetchPosts(ctx)
//     })
//
//     return g.Wait() // 最初のエラーを返す
// }

func main() {
    // errgroupの特徴まとめ
    features := []struct {
        method string
        desc   string
    }{
        {"errgroup.WithContext(ctx)", "キャンセル可能なグループ作成"},
        {"g.Go(func() error)", "新しいゴルーチンを追加"},
        {"g.Wait()", "全完了を待ち、最初のエラーを返す"},
        {"g.SetLimit(n)", "同時実行ゴルーチン数を制限"},
        {"g.TryGo(func() error)", "リミット内なら実行、超えたらfalse"},
    }

    fmt.Println("errgroup API一覧:")
    for _, f := range features {
        fmt.Printf("  %s\\n    -> %s\\n", f.method, f.desc)
    }
}`}
          expectedOutput={`errgroup API一覧:
  errgroup.WithContext(ctx)
    -> キャンセル可能なグループ作成
  g.Go(func() error)
    -> 新しいゴルーチンを追加
  g.Wait()
    -> 全完了を待ち、最初のエラーを返す
  g.SetLimit(n)
    -> 同時実行ゴルーチン数を制限
  g.TryGo(func() error)
    -> リミット内なら実行、超えたらfalse`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">並行処理と結果の集約</h2>
        <p className="text-gray-400 mb-4">
          errgroupで並行処理した結果を安全に集約するパターンです。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sync"
)

type ErrGroup struct {
    wg  sync.WaitGroup
    mu  sync.Mutex
    err error
}

func (g *ErrGroup) Go(f func() error) {
    g.wg.Add(1)
    go func() {
        defer g.wg.Done()
        if err := f(); err != nil {
            g.mu.Lock()
            if g.err == nil {
                g.err = err
            }
            g.mu.Unlock()
        }
    }()
}

func (g *ErrGroup) Wait() error {
    g.wg.Wait()
    return g.err
}

func main() {
    var g ErrGroup
    var mu sync.Mutex
    results := make(map[string]int)

    tasks := map[string]int{
        "ユーザー数":  100,
        "投稿数":    500,
        "コメント数":  1200,
    }

    for name, count := range tasks {
        name, count := name, count
        g.Go(func() error {
            // 並行処理（シミュレーション）
            mu.Lock()
            results[name] = count
            mu.Unlock()
            return nil
        })
    }

    if err := g.Wait(); err != nil {
        fmt.Printf("エラー: %v\\n", err)
        return
    }

    fmt.Println("集計結果:")
    for name, count := range results {
        fmt.Printf("  %s: %d\\n", name, count)
    }
}`}
          expectedOutput={`集計結果:
  ユーザー数: 100
  投稿数: 500
  コメント数: 1200`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="concurrency" lessonId="errgroup" />
      </div>
      <LessonNav lessons={lessons} currentId="errgroup" basePath="/learn/concurrency" />
    </div>
  );
}

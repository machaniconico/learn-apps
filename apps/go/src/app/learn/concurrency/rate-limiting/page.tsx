import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("concurrency");

export default function RateLimitingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">並行パターン レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">レートリミット</h1>
        <p className="text-gray-400">time.Tickerとトークンバケットパターンでレート制限を実装する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">レートリミットとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          レートリミットは処理の実行頻度を制限するパターンです。
          API呼び出しの制限やリソースの過負荷防止に使われます。
          Goでは<code className="text-cyan-300">time.Ticker</code>やチャネルベースのトークンバケットで実装できます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">time.Tickerによる基本的なレート制限</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">time.Ticker</code>を使って一定間隔でリクエストを処理します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "time"
)

func main() {
    // 毎秒2リクエストのレートリミット
    requests := []string{"API/users", "API/posts", "API/comments", "API/likes"}

    // time.Tickerの概念をシミュレーション
    interval := 500 * time.Millisecond // 500ms間隔
    fmt.Printf("レートリミット: %v間隔\\n\\n", interval)

    for i, req := range requests {
        // 実際のコードでは <-ticker.C で待機
        fmt.Printf("[%d] リクエスト: %s (処理時刻: +%dms)\\n",
            i+1, req, (i)*500)
    }

    fmt.Println("\\n全リクエスト処理完了")
}`}
          expectedOutput={`レートリミット: 500ms間隔

[1] リクエスト: API/users (処理時刻: +0ms)
[2] リクエスト: API/posts (処理時刻: +500ms)
[3] リクエスト: API/comments (処理時刻: +1000ms)
[4] リクエスト: API/likes (処理時刻: +1500ms)

全リクエスト処理完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">トークンバケットパターン</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">トークンバケット</code>は一定の速度でトークンを補充し、
          リクエスト時にトークンを消費するパターンです。バースト対応が可能です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type TokenBucket struct {
    capacity int
    tokens   int
    rate     int // 1秒あたりの補充数
}

func NewTokenBucket(capacity, rate int) *TokenBucket {
    return &TokenBucket{
        capacity: capacity,
        tokens:   capacity, // 初期はフル
        rate:     rate,
    }
}

func (tb *TokenBucket) Allow() bool {
    if tb.tokens > 0 {
        tb.tokens--
        return true
    }
    return false
}

func (tb *TokenBucket) Refill() {
    tb.tokens += tb.rate
    if tb.tokens > tb.capacity {
        tb.tokens = tb.capacity
    }
}

func main() {
    bucket := NewTokenBucket(3, 1) // 容量3、毎秒1トークン補充

    // 5つのリクエストを連続実行
    for i := 1; i <= 5; i++ {
        if bucket.Allow() {
            fmt.Printf("リクエスト%d: 許可 (残りトークン: %d)\\n", i, bucket.tokens)
        } else {
            fmt.Printf("リクエスト%d: 拒否 (トークン不足)\\n", i)
        }
    }

    fmt.Println("\\n--- トークン補充 ---")
    bucket.Refill()
    bucket.Refill()
    fmt.Printf("トークン補充後: %d\\n", bucket.tokens)

    if bucket.Allow() {
        fmt.Println("リクエスト6: 許可")
    }
}`}
          expectedOutput={`リクエスト1: 許可 (残りトークン: 2)
リクエスト2: 許可 (残りトークン: 1)
リクエスト3: 許可 (残りトークン: 0)
リクエスト4: 拒否 (トークン不足)
リクエスト5: 拒否 (トークン不足)

--- トークン補充 ---
トークン補充後: 2
リクエスト6: 許可`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">チャネルベースのレートリミッター</h2>
        <p className="text-gray-400 mb-4">
          バッファ付きチャネルをトークンバケットとして使い、並行安全なレートリミッターを実装します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type RateLimiter struct {
    tokens chan struct{}
}

func NewRateLimiter(limit int) *RateLimiter {
    rl := &RateLimiter{
        tokens: make(chan struct{}, limit),
    }
    // 初期トークンを充填
    for i := 0; i < limit; i++ {
        rl.tokens <- struct{}{}
    }
    return rl
}

func (rl *RateLimiter) Acquire() bool {
    select {
    case <-rl.tokens:
        return true
    default:
        return false
    }
}

func (rl *RateLimiter) Release() {
    select {
    case rl.tokens <- struct{}{}:
    default:
    }
}

func main() {
    limiter := NewRateLimiter(2) // 同時2リクエストまで

    for i := 1; i <= 4; i++ {
        if limiter.Acquire() {
            fmt.Printf("リクエスト%d: 実行開始\\n", i)
        } else {
            fmt.Printf("リクエスト%d: リミット超過\\n", i)
        }
    }

    // リソース解放
    fmt.Println("\\nリソース解放...")
    limiter.Release()
    limiter.Release()

    // 再度実行
    if limiter.Acquire() {
        fmt.Println("リクエスト5: 実行開始")
    }
}`}
          expectedOutput={`リクエスト1: 実行開始
リクエスト2: 実行開始
リクエスト3: リミット超過
リクエスト4: リミット超過

リソース解放...
リクエスト5: 実行開始`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="concurrency" lessonId="rate-limiting" />
      </div>
      <LessonNav lessons={lessons} currentId="rate-limiting" basePath="/learn/concurrency" />
    </div>
  );
}

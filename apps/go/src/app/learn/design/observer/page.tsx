import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function ObserverPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">設計パターン レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">オブザーバー</h1>
        <p className="text-gray-400">チャネルベースのイベント通知パターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">オブザーバーパターン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          オブザーバーパターンは、あるオブジェクトの状態変化を他のオブジェクトに自動通知する仕組みです。
          Goでは<code className="text-cyan-300">チャネル</code>を使って自然に実装できます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なオブザーバー</h2>
        <p className="text-gray-400 mb-4">
          イベントを発行し、登録されたオブザーバーに通知するパターンです。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Event struct {
    Type    string
    Message string
}

type Observer interface {
    OnEvent(event Event)
}

type EventBus struct {
    observers []Observer
}

func (eb *EventBus) Subscribe(obs Observer) {
    eb.observers = append(eb.observers, obs)
}

func (eb *EventBus) Publish(event Event) {
    for _, obs := range eb.observers {
        obs.OnEvent(event)
    }
}

// オブザーバー実装
type Logger struct{ name string }
func (l *Logger) OnEvent(e Event) {
    fmt.Printf("[%s] ログ: %s - %s\\n", l.name, e.Type, e.Message)
}

type Monitor struct{}
func (m *Monitor) OnEvent(e Event) {
    fmt.Printf("[モニター] イベント検知: %s\\n", e.Type)
}

func main() {
    bus := &EventBus{}
    bus.Subscribe(&Logger{name: "AppLogger"})
    bus.Subscribe(&Monitor{})

    bus.Publish(Event{Type: "USER_LOGIN", Message: "user123がログイン"})
    bus.Publish(Event{Type: "ERROR", Message: "DB接続タイムアウト"})
}`}
          expectedOutput={`[AppLogger] ログ: USER_LOGIN - user123がログイン
[モニター] イベント検知: USER_LOGIN
[AppLogger] ログ: ERROR - DB接続タイムアウト
[モニター] イベント検知: ERROR`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">チャネルベースのオブザーバー</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">チャネル</code>を使ったゴルーチン安全なオブザーバーパターンです。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sync"
)

type ChannelObserver struct {
    mu          sync.Mutex
    subscribers map[string][]chan string
}

func NewChannelObserver() *ChannelObserver {
    return &ChannelObserver{
        subscribers: make(map[string][]chan string),
    }
}

func (co *ChannelObserver) Subscribe(event string) <-chan string {
    ch := make(chan string, 10)
    co.mu.Lock()
    co.subscribers[event] = append(co.subscribers[event], ch)
    co.mu.Unlock()
    return ch
}

func (co *ChannelObserver) Publish(event, data string) {
    co.mu.Lock()
    defer co.mu.Unlock()
    for _, ch := range co.subscribers[event] {
        ch <- data
    }
}

func (co *ChannelObserver) Close() {
    co.mu.Lock()
    defer co.mu.Unlock()
    for _, subs := range co.subscribers {
        for _, ch := range subs {
            close(ch)
        }
    }
}

func main() {
    obs := NewChannelObserver()

    // サブスクライバー1: orderイベント
    orderCh := obs.Subscribe("order")
    // サブスクライバー2: orderイベント
    orderCh2 := obs.Subscribe("order")

    // イベント発行
    obs.Publish("order", "注文#101が作成されました")
    obs.Publish("order", "注文#102が作成されました")
    obs.Close()

    // 結果を読み取り
    fmt.Println("サブスクライバー1:")
    for msg := range orderCh {
        fmt.Printf("  受信: %s\\n", msg)
    }
    fmt.Println("サブスクライバー2:")
    for msg := range orderCh2 {
        fmt.Printf("  受信: %s\\n", msg)
    }
}`}
          expectedOutput={`サブスクライバー1:
  受信: 注文#101が作成されました
  受信: 注文#102が作成されました
サブスクライバー2:
  受信: 注文#101が作成されました
  受信: 注文#102が作成されました`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コールバック関数によるオブザーバー</h2>
        <p className="text-gray-400 mb-4">
          関数をコールバックとして登録するシンプルなパターンです。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type EventEmitter struct {
    handlers map[string][]func(interface{})
}

func NewEventEmitter() *EventEmitter {
    return &EventEmitter{handlers: make(map[string][]func(interface{}))}
}

func (e *EventEmitter) On(event string, handler func(interface{})) {
    e.handlers[event] = append(e.handlers[event], handler)
}

func (e *EventEmitter) Emit(event string, data interface{}) {
    for _, handler := range e.handlers[event] {
        handler(data)
    }
}

func main() {
    emitter := NewEventEmitter()

    // ハンドラ登録
    emitter.On("user:created", func(data interface{}) {
        fmt.Printf("ウェルカムメール送信: %v\\n", data)
    })
    emitter.On("user:created", func(data interface{}) {
        fmt.Printf("管理者に通知: 新規ユーザー %v\\n", data)
    })
    emitter.On("user:deleted", func(data interface{}) {
        fmt.Printf("データ削除処理: %v\\n", data)
    })

    // イベント発行
    emitter.Emit("user:created", "alice@example.com")
    emitter.Emit("user:deleted", "bob@example.com")
}`}
          expectedOutput={`ウェルカムメール送信: alice@example.com
管理者に通知: 新規ユーザー alice@example.com
データ削除処理: bob@example.com`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="observer" />
      </div>
      <LessonNav lessons={lessons} currentId="observer" basePath="/learn/design" />
    </div>
  );
}

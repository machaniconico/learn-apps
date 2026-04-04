import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("http");

export default function HandlersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">HTTP・Web レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ハンドラ</h1>
        <p className="text-gray-400">http.HandlerFuncとhttp.Handlerインターフェースを理解しましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Handler と HandlerFunc</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">http.Handler</code> はインターフェースで、
          <code className="text-cyan-300">ServeHTTP(ResponseWriter, *Request)</code> メソッドを持ちます。
          <code className="text-cyan-300">http.HandlerFunc</code> は関数をHandlerに変換するアダプタ型です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">http.Handler</code> — ServeHTTP メソッドを持つインターフェース</li>
          <li><code className="text-cyan-300">http.HandlerFunc</code> — func(w, r) を Handler に変換</li>
          <li><code className="text-cyan-300">http.HandleFunc</code> — デフォルトmuxにHandlerFuncを登録</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">HandlerFunc型</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">http.HandlerFunc</code> は
          <code className="text-cyan-300">func(ResponseWriter, *Request)</code> を Handler に変換する型です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// http.HandlerFunc の型定義を再現
type HandlerFunc func(w string, r string)

// ServeHTTP メソッドにより Handler インターフェースを実装
func (f HandlerFunc) ServeHTTP(w string, r string) {
    f(w, r)
}

func main() {
    // 関数をHandlerFuncに変換
    handler := HandlerFunc(func(w string, r string) {
        fmt.Printf("レスポンス: %s, リクエスト: %s\\n", w, r)
    })

    // ServeHTTP として呼び出し
    handler.ServeHTTP("ResponseWriter", "GET /hello")
    fmt.Println("HandlerFunc は関数を Handler に変換します")
}`}
          expectedOutput={`レスポンス: ResponseWriter, リクエスト: GET /hello
HandlerFunc は関数を Handler に変換します`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">構造体ベースのHandler</h2>
        <p className="text-gray-400 mb-4">
          構造体に <code className="text-cyan-300">ServeHTTP</code> メソッドを実装して、
          状態を持つハンドラを作成できます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// Handler インターフェースの模擬
type Handler interface {
    ServeHTTP(w string, r string)
}

// 状態を持つハンドラ
type CounterHandler struct {
    count int
}

func (h *CounterHandler) ServeHTTP(w string, r string) {
    h.count++
    fmt.Printf("リクエスト #%d: %s\\n", h.count, r)
}

func main() {
    handler := &CounterHandler{}
    handler.ServeHTTP("w", "GET /page1")
    handler.ServeHTTP("w", "GET /page2")
    handler.ServeHTTP("w", "POST /api")
    fmt.Printf("合計リクエスト数: %d\\n", handler.count)
}`}
          expectedOutput={`リクエスト #1: GET /page1
リクエスト #2: GET /page2
リクエスト #3: POST /api
合計リクエスト数: 3`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">レスポンスの書き込み</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">ResponseWriter</code> でステータスコードやヘッダーを設定し、
          レスポンスボディを書き込みます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // ResponseWriter の主要メソッド
    methods := []struct {
        name string
        desc string
    }{
        {"w.Write([]byte)", "バイト列を書き込む"},
        {"w.WriteHeader(status)", "ステータスコードを設定"},
        {"w.Header().Set(k, v)", "レスポンスヘッダーを設定"},
        {"fmt.Fprintf(w, ...)", "フォーマット付き書き込み"},
    }

    for _, m := range methods {
        fmt.Printf("%-30s — %s\\n", m.name, m.desc)
    }
}`}
          expectedOutput={`w.Write([]byte)                 — バイト列を書き込む
w.WriteHeader(status)          — ステータスコードを設定
w.Header().Set(k, v)           — レスポンスヘッダーを設定
fmt.Fprintf(w, ...)            — フォーマット付き書き込み`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="http" lessonId="handlers" />
      </div>
      <LessonNav lessons={lessons} currentId="handlers" basePath="/learn/http" />
    </div>
  );
}

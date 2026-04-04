import { GoEditor } from "@/components/go-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("http");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Goの標準ライブラリでHTTPサーバーを起動する関数は？",
    options: ["http.Start", "http.ListenAndServe", "http.Run", "http.Serve"],
    answer: 1,
    explanation: "http.ListenAndServe はアドレスとハンドラを受け取り、HTTPサーバーを起動します。",
  },
  {
    question: "http.HandlerFunc の型は？",
    options: [
      "func(w http.ResponseWriter, r *http.Request)",
      "func(r *http.Request) http.Response",
      "func(ctx context.Context) error",
      "func(w io.Writer, r io.Reader)",
    ],
    answer: 0,
    explanation: "HandlerFunc は func(ResponseWriter, *Request) 型で、Handlerインターフェースを実装します。",
  },
  {
    question: "Go 1.22でServeMuxに追加されたパターンは？",
    options: ["正規表現パターン", "HTTPメソッドとパスパラメータ", "ワイルドカードのみ", "クエリパラメータパターン"],
    answer: 1,
    explanation: "Go 1.22では \"GET /users/{id}\" のようにメソッドとパスパラメータをパターンに書けるようになりました。",
  },
  {
    question: "JSONレスポンスを返す際に設定すべきヘッダーは？",
    options: ["Content-Length", "Content-Type: application/json", "Accept: text/html", "X-Content-Type"],
    answer: 1,
    explanation: "Content-Type を application/json に設定することで、クライアントにJSON形式であることを伝えます。",
  },
];

export default function HttpPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-violet-400 mb-2">HTTP・Web</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Goの標準ライブラリ net/http を使ったWebプログラミングを学びます。HTTPサーバーの構築、ハンドラ、ルーティング、
          ミドルウェア、HTTPクライアント、JSON API、テンプレート、RESTパターンまでをカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="http" totalLessons={8} color="violet" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/http" color="violet" categoryId="http" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なHTTPサーバー</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">net/http</code> パッケージだけで、本格的なWebサーバーを構築できます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello, %s!", r.URL.Path[1:])
}

func main() {
    http.HandleFunc("/", handler)
    fmt.Println("サーバー起動: http://localhost:8080")
    // http.ListenAndServe(":8080", nil)
    fmt.Println("※ 実際に起動するとブロックします")
}`}
          expectedOutput={`サーバー起動: http://localhost:8080
※ 実際に起動するとブロックします`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">JSON APIの例</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">encoding/json</code> と <code className="text-cyan-300">net/http</code> を
          組み合わせて、JSON APIを構築できます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "encoding/json"
    "fmt"
)

type User struct {
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
    Age   int    \`json:"age"\`
}

func main() {
    user := User{Name: "太郎", Email: "taro@example.com", Age: 30}
    data, _ := json.MarshalIndent(user, "", "  ")
    fmt.Println(string(data))
}`}
          expectedOutput={`{
  "name": "太郎",
  "email": "taro@example.com",
  "age": 30
}`}
        />
      </section>
      <Quiz questions={quizQuestions} color="violet" />
    </div>
  );
}

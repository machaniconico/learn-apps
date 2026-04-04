import { GoEditor } from "@/components/go-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("context");

const quizQuestions: QuizQuestion[] = [
  {
    question: "コンテキストのルートとして使うべき関数は？",
    options: ["context.New()", "context.Background()", "context.Root()", "context.Init()"],
    answer: 1,
    explanation: "context.Background() はコンテキストツリーのルートとして使用します。main関数やテストで使います。",
  },
  {
    question: "context.WithCancel が返すものは？",
    options: [
      "context.Context のみ",
      "context.Context と cancel関数",
      "cancel関数のみ",
      "context.Context と error",
    ],
    answer: 1,
    explanation: "WithCancel は新しいコンテキストとキャンセル関数のペアを返します。",
  },
  {
    question: "context.WithValue の値を取得するメソッドは？",
    options: ["ctx.Get(key)", "ctx.Value(key)", "ctx.Load(key)", "ctx.Fetch(key)"],
    answer: 1,
    explanation: "ctx.Value(key) でコンテキストに格納された値を取得します。",
  },
  {
    question: "コンテキストを関数に渡す際のベストプラクティスは？",
    options: [
      "グローバル変数に保存する",
      "構造体のフィールドに保存する",
      "第1引数として渡す",
      "最後の引数として渡す",
    ],
    answer: 2,
    explanation: "Goの慣習では、context.Context は関数の第1引数として渡します。",
  },
];

export default function ContextPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-orange-400 mb-2">コンテキスト</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Goの context パッケージを学びます。キャンセル伝播、タイムアウト制御、リクエストスコープの値の受け渡し、
          そしてコンテキストのベストプラクティスまでをカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="context" totalLessons={5} color="orange" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/context" color="orange" categoryId="context" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コンテキストの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">context.Background()</code> がルートコンテキストです。
          <code className="text-cyan-300">context.TODO()</code> はまだ決まっていない場合に使います。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "context"
    "fmt"
)

func doWork(ctx context.Context, name string) {
    fmt.Printf("処理開始: %s\\n", name)
    select {
    case <-ctx.Done():
        fmt.Printf("キャンセル: %s (%v)\\n", name, ctx.Err())
    default:
        fmt.Printf("処理完了: %s\\n", name)
    }
}

func main() {
    ctx := context.Background()
    doWork(ctx, "タスク1")
    doWork(ctx, "タスク2")
}`}
          expectedOutput={`処理開始: タスク1
処理完了: タスク1
処理開始: タスク2
処理完了: タスク2`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">キャンセルの伝播</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">context.WithCancel</code> で親から子へキャンセルを伝播できます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "context"
    "fmt"
)

func main() {
    ctx, cancel := context.WithCancel(context.Background())

    fmt.Println("キャンセル前:", ctx.Err())
    cancel()
    fmt.Println("キャンセル後:", ctx.Err())
}`}
          expectedOutput={`キャンセル前: <nil>
キャンセル後: context canceled`}
        />
      </section>
      <Quiz questions={quizQuestions} color="orange" />
    </div>
  );
}

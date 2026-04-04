import { SwiftEditor } from "@/components/swift-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "concurrency")!;
const lessons = category.lessons;

const quizQuestions: QuizQuestion[] = [
  {
    question: "async関数を呼び出す際に必要なキーワードはどれですか？",
    options: ["async", "await", "async/await", "suspend"],
    answer: 1,
    explanation: "非同期関数を呼び出す際は await キーワードを使います。await は非同期処理の完了を待機します。",
  },
  {
    question: "データ競合を防ぐために設計されたSwiftの型はどれですか？",
    options: ["class", "struct", "actor", "enum"],
    answer: 2,
    explanation: "actor はデータ競合を防ぐために設計された参照型です。内部状態へのアクセスは自動的にシリアライズされます。",
  },
  {
    question: "複数の非同期処理を並行して実行し結果を待つ構文はどれですか？",
    options: [
      "Task.detached",
      "async let + await",
      "DispatchQueue.async",
      "Thread.create",
    ],
    answer: 1,
    explanation: "async let で複数の非同期処理を並行起動し、await でそれらの結果をまとめて待機できます。",
  },
  {
    question: "@MainActor の役割は何ですか？",
    options: [
      "メインスレッドで実行されることを保証する",
      "バックグラウンドスレッドに移行する",
      "タスクをキャンセルする",
      "アクターを継承可能にする",
    ],
    answer: 0,
    explanation: "@MainActor を付けた関数やクラスはメインスレッドで実行されることが保証されます。UIの更新に使います。",
  },
];

export default function ConcurrencyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">並行処理</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">{lessons.length}レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Swift 5.5以降のモダンな並行処理モデルを学びます。
          async/awaitによる直感的な非同期コード、Taskによる並行処理の作成・管理、
          actorによるデータ競合防止、async let・TaskGroupによる並列処理、
          Sendableプロトコルによる型安全性まで習得します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="concurrency" totalLessons={lessons.length} color="teal" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全{lessons.length}レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/concurrency" color="teal" categoryId="concurrency" />
      </section>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">コード例</h2>
        <SwiftEditor
          defaultCode={`import Foundation

// async/await の基本
func fetchData() async -> String {
    // 実際はネットワーク通信などが入る
    return "データ取得完了"
}

// Task で非同期コードを実行
Task {
    let result = await fetchData()
    print(result)
}

// actor によるデータ競合防止
actor Counter {
    private var value = 0
    func increment() { value += 1 }
    func getValue() -> Int { value }
}

let counter = Counter()
Task {
    await counter.increment()
    await counter.increment()
    print("カウント: \\(await counter.getValue())")
}

// async let で並行実行
func slowAdd(_ a: Int, _ b: Int) async -> Int {
    return a + b
}

Task {
    async let first = slowAdd(1, 2)
    async let second = slowAdd(3, 4)
    let results = await (first, second)
    print("結果: \\(results.0), \\(results.1)")
}`}
          expectedOutput={`データ取得完了
カウント: 2
結果: 3, 7`}
        />
      </section>
      <Quiz questions={quizQuestions} color="teal" />
    </div>
  );
}

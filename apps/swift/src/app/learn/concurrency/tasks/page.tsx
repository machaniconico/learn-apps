import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "concurrency")!.lessons;

export default function TasksPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">並行処理 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Task</h1>
        <p className="text-gray-400">Task{}を使って非同期タスクを作成・管理します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Task とは</h2>
        <p className="text-gray-300 mb-3">
          <code className="text-teal-300">Task {"{ }"}</code> は非同期コンテキストで動作する並行処理の単位です。
          同期コードから非同期コードを実行する際に使います。
          タスクはキャンセル可能で、優先度を設定することもできます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-300">Task {"{ }"}</code> — 非同期タスクを作成</li>
          <li><code className="text-teal-300">task.cancel()</code> — タスクをキャンセル</li>
          <li><code className="text-teal-300">Task.isCancelled</code> — キャンセル状態を確認</li>
          <li><code className="text-teal-300">Task.detached</code> — 親コンテキストから独立したタスク</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: Taskの基本と値の取得</h2>
        <SwiftEditor
          defaultCode={`import Foundation

// Task から値を受け取る
let task1 = Task<Int, Never> {
    return 42
}

Task {
    let value = await task1.value
    print("タスク結果: \\(value)")
}

// エラーをスローするTask
let task2 = Task<String, Error> {
    return "成功"
}

Task {
    do {
        let result = try await task2.value
        print(result)
    } catch {
        print("エラー: \\(error)")
    }
}

// 優先度付きTask
Task(priority: .high) {
    print("高優先度タスク")
}

Task(priority: .low) {
    print("低優先度タスク")
}`}
          expectedOutput={`タスク結果: 42
成功
高優先度タスク
低優先度タスク`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: タスクのキャンセル</h2>
        <SwiftEditor
          defaultCode={`import Foundation

func countdown(from n: Int) async throws {
    for i in stride(from: n, through: 1, by: -1) {
        try Task.checkCancellation()
        print("\\(i)...")
    }
    print("完了！")
}

// キャンセルされないタスク
let task1 = Task {
    try? await countdown(from: 3)
}

Task {
    await task1.value
}

// キャンセルされるタスク
let task2 = Task {
    do {
        try await countdown(from: 10)
    } catch is CancellationError {
        print("タスクがキャンセルされました")
    }
}

task2.cancel()`}
          expectedOutput={`3...
2...
1...
完了！
タスクがキャンセルされました`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="concurrency" lessonId="tasks" />
      </div>
      <LessonNav lessons={lessons} currentId="tasks" basePath="/learn/concurrency" />
    </div>
  );
}

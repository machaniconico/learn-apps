import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "concurrency")!.lessons;

export default function TaskGroupsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">並行処理 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">TaskGroup</h1>
        <p className="text-gray-400">withTaskGroupで動的な数の並行タスクをグループ管理します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">TaskGroup とは</h2>
        <p className="text-gray-300 mb-3">
          <code className="text-teal-300">withTaskGroup</code> を使うと実行時に決まる数のタスクを並行実行できます。
          async let が静的（コンパイル時固定）なのに対し、TaskGroup は動的にタスクを追加できます。
          すべてのタスクが完了するとグループが解散します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-300">withTaskGroup(of: T.self)</code> — タスクグループを作成</li>
          <li><code className="text-teal-300">group.addTask {"{ }"}</code> — タスクを追加</li>
          <li><code className="text-teal-300">for await result in group</code> — 結果を収集</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: withTaskGroup の基本</h2>
        <SwiftEditor
          defaultCode={`import Foundation

func processItem(_ id: Int) async -> String {
    return "処理済み#\\(id)"
}

Task {
    let results = await withTaskGroup(of: String.self) { group in
        // 動的にタスクを追加
        for i in 1...5 {
            group.addTask {
                await processItem(i)
            }
        }

        // 結果を収集
        var collected: [String] = []
        for await result in group {
            collected.append(result)
        }
        return collected
    }

    // 順序は保証されないためソート
    let sorted = results.sorted()
    for r in sorted {
        print(r)
    }
}`}
          expectedOutput={`処理済み#1
処理済み#2
処理済み#3
処理済み#4
処理済み#5`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: withThrowingTaskGroup</h2>
        <SwiftEditor
          defaultCode={`import Foundation

enum FetchError: Error { case failed(Int) }

func fetchScore(for id: Int) async throws -> Int {
    if id == 3 { throw FetchError.failed(id) }
    return id * 10
}

Task {
    // エラーをスローするタスクグループ
    do {
        let total = try await withThrowingTaskGroup(of: Int.self) { group in
            for i in [1, 2, 4, 5] {
                group.addTask { try await fetchScore(for: i) }
            }
            var sum = 0
            for try await score in group {
                sum += score
            }
            return sum
        }
        print("合計スコア: \\(total)")
    } catch FetchError.failed(let id) {
        print("ID \\(id) の取得に失敗")
    }
}

// エラーが発生するケース
Task {
    do {
        let _ = try await withThrowingTaskGroup(of: Int.self) { group in
            for i in [1, 2, 3, 4] {  // 3がエラー
                group.addTask { try await fetchScore(for: i) }
            }
            for try await _ in group {}
            return 0
        }
    } catch FetchError.failed(let id) {
        print("エラー: ID \\(id)")
    }
}`}
          expectedOutput={`合計スコア: 120
エラー: ID 3`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="concurrency" lessonId="task-groups" />
      </div>
      <LessonNav lessons={lessons} currentId="task-groups" basePath="/learn/concurrency" />
    </div>
  );
}

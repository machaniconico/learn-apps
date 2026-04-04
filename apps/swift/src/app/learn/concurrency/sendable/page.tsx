import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "concurrency")!.lessons;

export default function SendablePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">並行処理 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Sendable</h1>
        <p className="text-gray-400">Sendableプロトコルで並行処理における型安全性を確保します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Sendable とは</h2>
        <p className="text-gray-300 mb-3">
          <code className="text-teal-300">Sendable</code> プロトコルは並行処理のコンテキスト間で
          安全に受け渡せる型であることを示します。
          値型（struct・enum）は通常自動的に Sendable です。
          クラスは <code className="text-teal-300">final</code> かつすべてのプロパティが Sendable の場合に準拠できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>struct・enum・値型は自動的に Sendable に準拠</li>
          <li>クラスは明示的に <code className="text-teal-300">@unchecked Sendable</code> が必要な場合もある</li>
          <li>actor は暗黙的に Sendable に準拠</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: Sendable の基本</h2>
        <SwiftEditor
          defaultCode={`import Foundation

// struct は自動的に Sendable（全プロパティが Sendable なら）
struct UserInfo: Sendable {
    let id: Int
    let name: String
    let score: Double
}

// Sendable な型を受け取る関数
func processUser(_ user: UserInfo) async -> String {
    return "\\(user.name)(スコア: \\(user.score))"
}

Task {
    let user = UserInfo(id: 1, name: "Alice", score: 95.5)
    let result = await processUser(user)
    print(result)
}

// enum も Sendable
enum Priority: Sendable {
    case low, medium, high
}

func scheduleTask(priority: Priority) async {
    switch priority {
    case .high: print("高優先度で実行")
    case .medium: print("通常優先度で実行")
    case .low: print("低優先度で実行")
    }
}

Task {
    await scheduleTask(priority: .high)
    await scheduleTask(priority: .low)
}`}
          expectedOutput={`Alice(スコア: 95.5)
高優先度で実行
低優先度で実行`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: @Sendable クロージャ</h2>
        <SwiftEditor
          defaultCode={`import Foundation

// @Sendable クロージャ: 並行コンテキストで安全に使えるクロージャ
func runAsync(_ work: @Sendable @escaping () async -> Void) {
    Task { await work() }
}

runAsync {
    print("非同期処理 1")
}

runAsync {
    print("非同期処理 2")
}

// actor で Sendable を活用
actor Cache {
    private var storage: [String: String] = [:]

    func set(_ key: String, value: String) {
        storage[key] = value
    }

    func get(_ key: String) -> String? {
        storage[key]
    }
}

let cache = Cache()

Task {
    await cache.set("lang", value: "Swift")
    await cache.set("version", value: "5.9")

    let lang = await cache.get("lang") ?? "unknown"
    let version = await cache.get("version") ?? "unknown"
    print("\\(lang) \\(version)")
}`}
          expectedOutput={`非同期処理 1
非同期処理 2
Swift 5.9`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="concurrency" lessonId="sendable" />
      </div>
      <LessonNav lessons={lessons} currentId="sendable" basePath="/learn/concurrency" />
    </div>
  );
}

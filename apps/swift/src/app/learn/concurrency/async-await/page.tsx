import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "concurrency")!.lessons;

export default function AsyncAwaitPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">並行処理 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">async/await</h1>
        <p className="text-gray-400">非同期関数をasync/awaitで直感的に記述します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">async/await の基本</h2>
        <p className="text-gray-300 mb-3">
          <code className="text-teal-300">async</code> を付けた関数は非同期関数です。
          非同期関数の呼び出しには <code className="text-teal-300">await</code> が必要で、
          処理が完了するまで現在のタスクを一時停止します。
          コールバックより読みやすい直線的なコードが書けます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-300">func f() async -{">"} T</code> — 非同期関数の定義</li>
          <li><code className="text-teal-300">await f()</code> — 非同期関数の呼び出し</li>
          <li><code className="text-teal-300">func f() async throws</code> — エラーもスローできる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: async関数の定義と呼び出し</h2>
        <SwiftEditor
          defaultCode={`import Foundation

// 非同期関数の定義
func fetchGreeting(for name: String) async -> String {
    // 実際はネットワーク処理など
    return "こんにちは、\\(name)！"
}

func fetchNumber() async -> Int {
    return 42
}

// Task内でawaitを使う
Task {
    let greeting = await fetchGreeting(for: "Swift")
    print(greeting)

    let number = await fetchNumber()
    print("数値: \\(number)")
}

// awaitを連続して使う
Task {
    let g1 = await fetchGreeting(for: "太郎")
    let g2 = await fetchGreeting(for: "花子")
    print(g1)
    print(g2)
}`}
          expectedOutput={`こんにちは、Swift！
数値: 42
こんにちは、太郎！
こんにちは、花子！`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: async throws 関数</h2>
        <SwiftEditor
          defaultCode={`import Foundation

enum FetchError: Error {
    case notFound
    case serverError
}

func fetchUser(id: Int) async throws -> String {
    if id <= 0 { throw FetchError.notFound }
    if id == 500 { throw FetchError.serverError }
    return "User#\\(id)"
}

Task {
    do {
        let user = try await fetchUser(id: 1)
        print(user)
    } catch FetchError.notFound {
        print("ユーザーが見つかりません")
    } catch {
        print("エラー: \\(error)")
    }
}

Task {
    do {
        let user = try await fetchUser(id: -1)
        print(user)
    } catch FetchError.notFound {
        print("IDが無効です")
    }
}`}
          expectedOutput={`User#1
IDが無効です`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="concurrency" lessonId="async-await" />
      </div>
      <LessonNav lessons={lessons} currentId="async-await" basePath="/learn/concurrency" />
    </div>
  );
}

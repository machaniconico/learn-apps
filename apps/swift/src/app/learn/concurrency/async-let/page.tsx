import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "concurrency")!.lessons;

export default function AsyncLetPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">並行処理 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">async let</h1>
        <p className="text-gray-400">async letで複数の非同期処理を並行して実行し、結果をまとめて待ちます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">async let による並行実行</h2>
        <p className="text-gray-300 mb-3">
          <code className="text-teal-300">async let</code> を使うと複数の非同期処理を同時に開始し、
          後でまとめて結果を待機できます。
          逐次 await するよりも総実行時間を短縮できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-300">async let x = asyncFunc()</code> — 非同期処理を開始</li>
          <li><code className="text-teal-300">await x</code> — 結果を待機</li>
          <li>複数の async let を同時に開始して並列処理できる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 逐次実行 vs 並行実行</h2>
        <SwiftEditor
          defaultCode={`import Foundation

func fetchTitle() async -> String {
    return "Swiftプログラミング"
}

func fetchAuthor() async -> String {
    return "Apple Inc."
}

func fetchYear() async -> Int {
    return 2014
}

// 並行実行: 3つを同時に開始
Task {
    async let title = fetchTitle()
    async let author = fetchAuthor()
    async let year = fetchYear()

    // 3つの結果をまとめて待機
    let (t, a, y) = await (title, author, year)
    print("タイトル: \\(t)")
    print("著者: \\(a)")
    print("年: \\(y)")
}

// タプルで受け取る
Task {
    async let first = fetchTitle()
    async let second = fetchAuthor()
    let results = await (first, second)
    print("\\(results.0) by \\(results.1)")
}`}
          expectedOutput={`タイトル: Swiftプログラミング
著者: Apple Inc.
年: 2014
Swiftプログラミング by Apple Inc.`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: async let でエラーハンドリング</h2>
        <SwiftEditor
          defaultCode={`import Foundation

enum DataError: Error { case failed }

func loadData(id: Int) async throws -> String {
    if id < 0 { throw DataError.failed }
    return "データ#\\(id)"
}

Task {
    do {
        async let d1 = loadData(id: 1)
        async let d2 = loadData(id: 2)
        async let d3 = loadData(id: 3)

        let results = try await (d1, d2, d3)
        print(results.0)
        print(results.1)
        print(results.2)
    } catch {
        print("エラー: \\(error)")
    }
}

// いずれかが失敗する場合
Task {
    do {
        async let good = loadData(id: 5)
        async let bad = loadData(id: -1)
        let results = try await (good, bad)
        print(results)
    } catch DataError.failed {
        print("データ取得に失敗しました")
    }
}`}
          expectedOutput={`データ#1
データ#2
データ#3
データ取得に失敗しました`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="concurrency" lessonId="async-let" />
      </div>
      <LessonNav lessons={lessons} currentId="async-let" basePath="/learn/concurrency" />
    </div>
  );
}

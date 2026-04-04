import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "concurrency")!.lessons;

export default function ContinuationsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">並行処理 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Continuation</h1>
        <p className="text-gray-400">withCheckedContinuation を使ってコールバックベースの API を async/await に変換します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Continuation とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-300">Continuation</code> は、コールバックベースの既存 API を
          <code className="text-teal-300"> async/await</code> に橋渡しする仕組みです。
          <code className="text-teal-300">withCheckedContinuation</code> や
          <code className="text-teal-300">withCheckedThrowingContinuation</code> を使うと、
          クロージャで完了を通知するコードを await 可能な関数に変換できます。
          "Checked" 版は continuation を一度だけ resume することを実行時に検証します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-300">withCheckedContinuation</code> — エラーなしのコールバック変換</li>
          <li><code className="text-teal-300">withCheckedThrowingContinuation</code> — エラーあり版</li>
          <li><code className="text-teal-300">continuation.resume(returning:)</code> — 成功値で再開</li>
          <li><code className="text-teal-300">continuation.resume(throwing:)</code> — エラーで再開</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: コールバック関数を async に変換</h2>
        <SwiftEditor
          defaultCode={`import Foundation

// 既存のコールバックAPI（変更不可と仮定）
func fetchUserName(id: Int, completion: @escaping (String) -> Void) {
    // 実際にはネットワーク通信などが入る
    DispatchQueue.global().asyncAfter(deadline: .now() + 0.1) {
        completion("ユーザー_\\(id)")
    }
}

// withCheckedContinuation で async に変換
func fetchUserNameAsync(id: Int) async -> String {
    await withCheckedContinuation { continuation in
        fetchUserName(id: id) { name in
            continuation.resume(returning: name)
        }
    }
}

Task {
    let name = await fetchUserNameAsync(id: 42)
    print("取得したユーザー名:", name)

    // async let で並行取得
    async let user1 = fetchUserNameAsync(id: 1)
    async let user2 = fetchUserNameAsync(id: 2)
    let names = await [user1, user2]
    print("並行取得:", names)
}`}
          expectedOutput={`取得したユーザー名: ユーザー_42
並行取得: ["ユーザー_1", "ユーザー_2"]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: エラーありコールバックの変換</h2>
        <SwiftEditor
          defaultCode={`import Foundation

enum NetworkError: Error {
    case notFound
    case serverError(Int)
}

// Result型を返すコールバックAPI
func loadData(url: String, completion: @escaping (Result<Data, NetworkError>) -> Void) {
    DispatchQueue.global().asyncAfter(deadline: .now() + 0.1) {
        if url.contains("invalid") {
            completion(.failure(.notFound))
        } else {
            let data = Data("レスポンスデータ".utf8)
            completion(.success(data))
        }
    }
}

// withCheckedThrowingContinuation で async throws に変換
func loadDataAsync(url: String) async throws -> Data {
    try await withCheckedThrowingContinuation { continuation in
        loadData(url: url) { result in
            switch result {
            case .success(let data):
                continuation.resume(returning: data)
            case .failure(let error):
                continuation.resume(throwing: error)
            }
        }
    }
}

Task {
    // 成功ケース
    do {
        let data = try await loadDataAsync(url: "https://api.example.com/data")
        print("成功:", String(data: data, encoding: .utf8)!)
    } catch {
        print("エラー:", error)
    }

    // 失敗ケース
    do {
        let _ = try await loadDataAsync(url: "https://api.example.com/invalid")
    } catch NetworkError.notFound {
        print("404: リソースが見つかりません")
    }
}`}
          expectedOutput={`成功: レスポンスデータ
404: リソースが見つかりません`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: UnsafeContinuation との違い</h2>
        <SwiftEditor
          defaultCode={`import Foundation

// CheckedContinuation は resume の呼び忘れ・二重呼び出しを検出する
func safeOperation(shouldSucceed: Bool) async -> String {
    await withCheckedContinuation { continuation in
        if shouldSucceed {
            continuation.resume(returning: "成功しました")
        } else {
            continuation.resume(returning: "失敗しましたが安全に処理")
        }
        // ここで再度 resume すると実行時エラーになる（安全）
        // continuation.resume(returning: "二重呼び出し") // ← 危険！
    }
}

Task {
    let result1 = await safeOperation(shouldSucceed: true)
    print(result1)

    let result2 = await safeOperation(shouldSucceed: false)
    print(result2)

    print("Checked版は安全性を保証します")
}`}
          expectedOutput={`成功しました
失敗しましたが安全に処理
Checked版は安全性を保証します`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="concurrency" lessonId="continuations" />
      </div>
      <LessonNav lessons={lessons} currentId="continuations" basePath="/learn/concurrency" />
    </div>
  );
}

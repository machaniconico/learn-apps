import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "concurrency")!.lessons;

export default function AsyncSequencePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">並行処理 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">AsyncSequence</h1>
        <p className="text-gray-400">非同期シーケンスを for await ループで反復処理する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">AsyncSequence とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-300">AsyncSequence</code> は、非同期に要素を生成するシーケンスプロトコルです。
          通常の <code className="text-teal-300">Sequence</code> と同様に <code className="text-teal-300">for</code> ループで反復できますが、
          各要素の取得に <code className="text-teal-300">await</code> が必要です。
          ネットワークストリーム・ファイル読み込み・タイマーなど、時間をかけて到着するデータの処理に適しています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-300">for await element in asyncSeq</code> — 非同期反復</li>
          <li><code className="text-teal-300">AsyncStream</code> — カスタム非同期ストリームの作成</li>
          <li><code className="text-teal-300">AsyncThrowingStream</code> — エラーをスローできるストリーム</li>
          <li><code className="text-teal-300">makeAsyncIterator()</code> — イテレータの生成メソッド</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: AsyncStream の基本</h2>
        <SwiftEditor
          defaultCode={`import Foundation

// カウントダウンを非同期ストリームで生成
func countdown(from n: Int) -> AsyncStream<Int> {
    AsyncStream { continuation in
        Task {
            for i in stride(from: n, through: 1, by: -1) {
                continuation.yield(i)
            }
            continuation.finish()
        }
    }
}

Task {
    print("カウントダウン開始")
    for await value in countdown(from: 5) {
        print("\\(value)...")
    }
    print("発射!")
}`}
          expectedOutput={`カウントダウン開始
5...
4...
3...
2...
1...
発射!`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: カスタム AsyncSequence の実装</h2>
        <SwiftEditor
          defaultCode={`import Foundation

// フィボナッチ数列を非同期生成するシーケンス
struct AsyncFibonacci: AsyncSequence {
    typealias Element = Int
    let limit: Int

    struct AsyncIterator: AsyncIteratorProtocol {
        var limit: Int
        var a = 0, b = 1

        mutating func next() async -> Int? {
            guard a <= limit else { return nil }
            let result = a
            (a, b) = (b, a + b)
            return result
        }
    }

    func makeAsyncIterator() -> AsyncIterator {
        AsyncIterator(limit: limit)
    }
}

Task {
    var results: [Int] = []
    for await fib in AsyncFibonacci(limit: 100) {
        results.append(fib)
    }
    print("フィボナッチ数列:", results)
}`}
          expectedOutput={`フィボナッチ数列: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: AsyncThrowingStream でエラー処理</h2>
        <SwiftEditor
          defaultCode={`import Foundation

enum FetchError: Error {
    case invalidData(Int)
}

// エラーをスローする可能性のあるストリーム
func fetchTemperatures() -> AsyncThrowingStream<Double, Error> {
    AsyncThrowingStream { continuation in
        Task {
            let readings = [22.5, 23.1, -999.0, 24.0]
            for (index, temp) in readings.enumerated() {
                if temp < -100 {
                    continuation.finish(throwing: FetchError.invalidData(index))
                    return
                }
                continuation.yield(temp)
            }
            continuation.finish()
        }
    }
}

Task {
    do {
        for try await temp in fetchTemperatures() {
            print("気温: \\(temp)°C")
        }
    } catch FetchError.invalidData(let index) {
        print("エラー: インデックス \\(index) のデータが無効です")
    }
}`}
          expectedOutput={`気温: 22.5°C
気温: 23.1°C
エラー: インデックス 2 のデータが無効です`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="concurrency" lessonId="async-sequence" />
      </div>
      <LessonNav lessons={lessons} currentId="async-sequence" basePath="/learn/concurrency" />
    </div>
  );
}

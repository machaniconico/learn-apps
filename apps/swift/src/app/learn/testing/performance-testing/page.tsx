import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "testing")!.lessons;

export default function PerformanceTestingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">テスト レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">パフォーマンステスト</h1>
        <p className="text-gray-400">measure()によるベンチマークテストでコードの性能を計測します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">パフォーマンステストとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          XCTestの<code className="text-indigo-300">measure()</code>メソッドを使うと、コードブロックの実行時間を計測できます。
          デフォルトで10回実行して平均・標準偏差を記録し、ベースラインとの比較でリグレッションを検出します。
          アルゴリズムの改善効果を数値で確認するのに役立ちます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">measure &#123; &#125;</code> — 実行時間を計測するブロック</li>
          <li><code className="text-blue-300">measureMetrics(_:automaticallyStartMeasuring:)</code> — 詳細なメトリクス計測</li>
          <li><code className="text-blue-300">XCTClockMetric</code> — 実行時間メトリクス</li>
          <li><code className="text-blue-300">XCTMemoryMetric</code> — メモリ使用量メトリクス</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例1: ソートアルゴリズムの性能比較</h2>
        <SwiftEditor
          defaultCode={`import Foundation

// バブルソート（遅い実装）
func bubbleSort(_ array: [Int]) -> [Int] {
    var arr = array
    let n = arr.count
    for i in 0..<n {
        for j in 0..<(n - i - 1) {
            if arr[j] > arr[j + 1] {
                arr.swapAt(j, j + 1)
            }
        }
    }
    return arr
}

// クイックソート（速い実装）
func quickSort(_ array: [Int]) -> [Int] {
    guard array.count > 1 else { return array }
    let pivot = array[array.count / 2]
    let less = array.filter { $0 < pivot }
    let equal = array.filter { $0 == pivot }
    let greater = array.filter { $0 > pivot }
    return quickSort(less) + equal + quickSort(greater)
}

// 実行時間を簡易計測
func measureTime(label: String, block: () -> Void) {
    let start = Date()
    block()
    let elapsed = Date().timeIntervalSince(start)
    print("\\(label): \\(String(format: "%.4f", elapsed * 1000))ms")
}

let data = (0..<1000).map { _ in Int.random(in: 0...10000) }

measureTime(label: "バブルソート(1000件)") {
    _ = bubbleSort(data)
}

measureTime(label: "クイックソート(1000件)") {
    _ = quickSort(data)
}

measureTime(label: "標準ソート(1000件)") {
    _ = data.sorted()
}

print("ソート結果の先頭5件:", quickSort(data).prefix(5).map { String($0) }.joined(separator: ", "))`}
          expectedOutput={`バブルソート(1000件): 12.5000ms
クイックソート(1000件): 1.2000ms
標準ソート(1000件): 0.3000ms
ソート結果の先頭5件: 3, 7, 12, 15, 21`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">XCTestでのmeasure()の使い方</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          実際のXCTestでは<code className="text-indigo-300">measure &#123; &#125;</code>ブロック内にテスト対象のコードを記述します。
          Xcodeはデフォルトで10回実行し、平均実行時間をベースラインとして記録します。
          その後の実行でベースラインを10%以上超えると警告が出ます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">setUp()</code> — 計測前の初期化（計測対象外）</li>
          <li><code className="text-blue-300">startMeasuring()</code> — 計測開始地点を明示</li>
          <li><code className="text-blue-300">stopMeasuring()</code> — 計測終了地点を明示</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例2: XCTestパフォーマンステストの構造</h2>
        <SwiftEditor
          defaultCode={`import XCTest

// パフォーマンステストの例
class SortingPerformanceTests: XCTestCase {

    var largeArray: [Int] = []

    override func setUp() {
        super.setUp()
        // setUp()は計測対象外 - 前準備はここで行う
        largeArray = (0..<10000).map { _ in Int.random(in: 0...100000) }
    }

    func testSortingPerformance() {
        // measure{}内のコードが10回実行されて平均時間が計測される
        measure {
            _ = largeArray.sorted()
        }
    }

    func testCustomSortPerformance() {
        // startMeasuring/stopMeasuringで計測範囲を指定
        measure {
            var arr = largeArray
            arr.sort { $0 < $1 }
            // ここまでが計測対象
        }
    }
}

// 簡易ベンチマーク実装
struct Benchmark {
    let iterations: Int

    func run(label: String, block: () -> Void) {
        var times: [Double] = []
        for _ in 0..<iterations {
            let start = CFAbsoluteTimeGetCurrent()
            block()
            times.append(CFAbsoluteTimeGetCurrent() - start)
        }
        let avg = times.reduce(0, +) / Double(times.count) * 1000
        let min = times.min()! * 1000
        let max = times.max()! * 1000
        print("\\(label):")
        print("  平均: \\(String(format: "%.3f", avg))ms")
        print("  最小: \\(String(format: "%.3f", min))ms / 最大: \\(String(format: "%.3f", max))ms")
    }
}

let bench = Benchmark(iterations: 5)
let data = (0..<5000).map { _ in Int.random(in: 0...50000) }

bench.run(label: "sorted()") {
    _ = data.sorted()
}

bench.run(label: "filter + sort") {
    _ = data.filter { $0 % 2 == 0 }.sorted()
}`}
          expectedOutput={`sorted():
  平均: 0.850ms
  最小: 0.780ms / 最大: 0.950ms
filter + sort:
  平均: 0.620ms
  最小: 0.580ms / 最大: 0.680ms`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例3: メモリ効率の計測</h2>
        <SwiftEditor
          defaultCode={`import Foundation

// メモリ使用量の比較
// 値型(struct)と参照型(class)の違い

struct PointStruct {
    var x: Double
    var y: Double
    var z: Double
}

class PointClass {
    var x: Double
    var y: Double
    var z: Double
    init(x: Double, y: Double, z: Double) {
        self.x = x; self.y = y; self.z = z
    }
}

// 処理速度の比較
func measureMemoryPattern(label: String, count: Int, block: () -> Void) {
    let start = Date()
    block()
    let elapsed = Date().timeIntervalSince(start) * 1000
    print("\\(label) (\\(count)件): \\(String(format: "%.2f", elapsed))ms")
}

let count = 100000

measureMemoryPattern(label: "struct配列作成", count: count) {
    var points: [PointStruct] = []
    points.reserveCapacity(count)
    for i in 0..<count {
        points.append(PointStruct(x: Double(i), y: Double(i * 2), z: Double(i * 3)))
    }
    _ = points.reduce(0.0) { $0 + $1.x }
}

measureMemoryPattern(label: "class配列作成", count: count) {
    var points: [PointClass] = []
    points.reserveCapacity(count)
    for i in 0..<count {
        points.append(PointClass(x: Double(i), y: Double(i * 2), z: Double(i * 3)))
    }
    _ = points.reduce(0.0) { $0 + $1.x }
}

print("パフォーマンステストの計測が完了しました")`}
          expectedOutput={`struct配列作成 (100000件): 8.50ms
class配列作成 (100000件): 45.20ms
パフォーマンステストの計測が完了しました`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="testing" lessonId="performance-testing" />
      </div>
      <LessonNav lessons={lessons} currentId="performance-testing" basePath="/learn/testing" />
    </div>
  );
}

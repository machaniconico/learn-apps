import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const lessons = CATEGORIES.find((c) => c.id === "ecosystem")!.lessons;

export default function InstrumentsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-green-400">Swiftエコシステム</span>
        <h1 className="text-3xl font-bold text-gray-100">Instruments</h1>
        <p className="text-gray-400">Time Profiler・Leaks・Allocations でプロファイリングを学びましょう。</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <p>
          Instruments は Xcode に付属するパフォーマンス解析ツールです。
          CPU使用率・メモリリーク・アロケーションなどをビジュアルに確認できます。
          Xcode から <strong>Product → Profile（Cmd+I）</strong> で起動します。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`// Time Profiler: CPU のホットスポットを特定

// パフォーマンスが悪いコード例
func slowOperation() {
    // O(n²) のアルゴリズム
    var numbers = Array(1...1000)
    for i in 0..<numbers.count {
        for j in (i+1)..<numbers.count {
            if numbers[i] > numbers[j] {
                numbers.swapAt(i, j)
            }
        }
    }
    print("Sorted \\(numbers.count) items")
}

// 改善版: O(n log n)
func fastOperation() {
    let numbers = Array(1...1000).sorted()
    print("Sorted \\(numbers.count) items")
}

// 計測ツール（Time Profilerの代わりに簡易計測）
func measure(_ label: String, block: () -> Void) {
    let start = Date()
    block()
    let elapsed = Date().timeIntervalSince(start)
    print("\\(label): \\(String(format: "%.4f", elapsed))s")
}

measure("Slow O(n²)") { slowOperation() }
measure("Fast O(n log n)") { fastOperation() }`}
        height="300px"
        expectedOutput="Sorted 1000 items\nSorted 1000 items"
      />

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <h2 className="text-xl font-semibold text-gray-100">Leaks と Allocations</h2>
        <p>
          <strong>Leaks</strong> はメモリリークを検出し、<strong>Allocations</strong> はメモリアロケーションを追跡します。
          循環参照によるリークは <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-300">weak</code> や <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-300">unowned</code> で解決します。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`import Foundation

// メモリリークの例（循環参照）
class NetworkManager {
    var onComplete: (() -> Void)?

    func fetch(completion: @escaping () -> Void) {
        onComplete = completion
    }
}

class ViewController {
    let network = NetworkManager()
    var data: String?

    func loadData() {
        // 問題: [self] を capture list なしで捕捉 → 循環参照
        // network.fetch {
        //     self.data = "loaded"  // self → network → onComplete → self
        // }

        // 修正: [weak self] で循環参照を回避
        network.fetch { [weak self] in
            self?.data = "loaded"
            print("Data loaded: \\(self?.data ?? "nil")")
        }
    }

    deinit {
        print("ViewController deallocated")  // Leaks では deinit が呼ばれるか確認
    }
}

// Autoreleasepool でピークメモリを削減
func processLargeData() {
    for i in 0..<1000 {
        autoreleasepool {
            // 各イテレーションで一時オブジェクトを解放
            let data = Data(count: 1024 * 1024)  // 1MB
            _ = data.count
            if i % 100 == 0 { print("Processing \\(i)...") }
        }
    }
    print("Done")
}

var vc: ViewController? = ViewController()
vc?.loadData()
vc = nil  // deinit が呼ばれる`}
        height="360px"
        expectedOutput="Data loaded: loaded\nViewController deallocated"
      />

      <SwiftEditor
        defaultCode={`// Instruments の使い方まとめ

// 1. Time Profiler
//    - Xcode: Product → Profile (Cmd+I)
//    - "Time Profiler" テンプレートを選択
//    - 記録ボタンをクリックしてアプリを操作
//    - CPU が高い関数を特定 → 改善
//    - "Call Tree" → "Hide System Libraries" でアプリコードを絞り込む

// 2. Leaks
//    - "Leaks" テンプレートを選択
//    - 赤いバーが出たらリーク発生
//    - クリックでリークしたオブジェクトとコールスタックを確認
//    - Cycles & Roots で循環参照のグラフを表示

// 3. Allocations
//    - メモリ使用量の推移を確認
//    - "Mark Generation" でスナップショットを比較
//    - 増え続けるオブジェクトを特定

// 4. Network
//    - HTTP リクエストの内容・タイミングを確認

// 5. Energy Log
//    - バッテリー消費を分析

// コードでパフォーマンス計測（os_signpost）
import os

let log = OSLog(subsystem: "com.example.app", category: "performance")

func profiledOperation() {
    os_signpost(.begin, log: log, name: "MyOperation")
    defer { os_signpost(.end, log: log, name: "MyOperation") }

    // 計測したい処理
    let sum = (1...1000).reduce(0, +)
    print("Sum: \\(sum)")
}

profiledOperation()`}
        height="360px"
        expectedOutput="Sum: 500500"
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="ecosystem" lessonId="instruments" />
      </div>
      <LessonNav lessons={lessons} currentId="instruments" basePath="/learn/ecosystem" />
    </div>
  );
}

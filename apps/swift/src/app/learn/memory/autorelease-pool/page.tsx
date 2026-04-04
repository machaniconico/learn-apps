import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "memory")!.lessons;

export default function AutoreleasePoolPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">メモリ管理 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Autoreleaseプール</h1>
        <p className="text-gray-400">autoreleasepool を使ってループ内の一時オブジェクトのメモリを効率よく解放します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Autoreleasepool とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-300">autoreleasepool</code> は、一時的なオブジェクトをまとめて解放するための仕組みです。
          Objective-C の NSObject 系 API は「autorelease」でオブジェクトを登録し、
          プールが drain されるときに解放します。
          Swift では通常 ARC が自動で管理しますが、ループ内で大量の一時オブジェクトを生成する場合、
          <code className="text-pink-300">autoreleasepool {"{ }"}</code> で明示的にプールを作ると
          メモリピークを大幅に削減できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-pink-300">autoreleasepool {"{ }"}</code> — プールのスコープを定義</li>
          <li>スコープを抜けるとプール内の全オブジェクトが解放される</li>
          <li>大量のループ処理・画像処理・ファイル処理で有効</li>
          <li>macOS/iOS の Foundation/UIKit API を多用するときに特に重要</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: autoreleasepool の基本</h2>
        <SwiftEditor
          defaultCode={`import Foundation

class HeavyObject {
    let id: Int
    let data: String

    init(id: Int) {
        self.id = id
        self.data = String(repeating: "x", count: 1000)
        // print("生成: \\(id)")
    }

    deinit {
        print("解放: \\(id)")
    }
}

print("=== autoreleasepool なし ===")
for i in 0..<3 {
    let obj = HeavyObject(id: i)
    _ = obj.data.count
}
print("ループ終了（スコープ外で解放）")

print("\\n=== autoreleasepool あり ===")
for i in 3..<6 {
    autoreleasepool {
        let obj = HeavyObject(id: i)
        _ = obj.data.count
        // ここでプールが drain → 即座に解放
    }
    print("イテレーション \\(i) 完了")
}`}
          expectedOutput={`=== autoreleasepool なし ===
解放: 0
解放: 1
解放: 2
ループ終了（スコープ外で解放）

=== autoreleasepool あり ===
解放: 3
イテレーション 3 完了
解放: 4
イテレーション 4 完了
解放: 5
イテレーション 5 完了`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 大量データ処理でのメモリ管理</h2>
        <SwiftEditor
          defaultCode={`import Foundation

// NSString を大量生成するシナリオ（Objective-C ブリッジ）
func processStrings(count: Int, usePool: Bool) {
    var totalLength = 0

    for i in 0..<count {
        if usePool {
            autoreleasepool {
                // NSString ベースの操作（autorelease オブジェクトが発生しやすい）
                let nsStr = NSString(format: "item_%04d", i)
                totalLength += nsStr.length
            }
            // ← ここでプール drain、メモリ解放
        } else {
            let nsStr = NSString(format: "item_%04d", i)
            totalLength += nsStr.length
            // ← ループが終わるまで全て保持される
        }
    }
    print("合計文字数:", totalLength)
}

print("プールあり:")
processStrings(count: 5, usePool: true)

print("プールなし:")
processStrings(count: 5, usePool: false)`}
          expectedOutput={`プールあり:
合計文字数: 35
プールなし:
合計文字数: 35`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: autoreleasepool の戻り値</h2>
        <SwiftEditor
          defaultCode={`import Foundation

class Report {
    let title: String
    let content: String

    init(title: String) {
        self.title = title
        self.content = "レポート内容: \\(title)"
        print("生成: \\(title)")
    }

    deinit {
        print("解放: \\(title)")
    }
}

// autoreleasepool はクロージャの戻り値を返せる
let summary: String = autoreleasepool {
    // pool 内で一時オブジェクトを大量生成
    var parts: [String] = []
    for i in 1...3 {
        let report = Report(title: "レポート\\(i)")
        parts.append(report.content)
    }
    // ここでレポートが解放される
    return parts.joined(separator: " | ")
}
// pool 外では summary（String値）のみ残る

print("\\nサマリー:", summary)`}
          expectedOutput={`生成: レポート1
生成: レポート2
生成: レポート3
解放: レポート1
解放: レポート2
解放: レポート3

サマリー: レポート内容: レポート1 | レポート内容: レポート2 | レポート内容: レポート3`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="memory" lessonId="autorelease-pool" />
      </div>
      <LessonNav lessons={lessons} currentId="autorelease-pool" basePath="/learn/memory" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "memory")!.lessons;

export default function MemoryDebuggingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">メモリ管理 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">メモリデバッグ</h1>
        <p className="text-gray-400">Instruments の Leaks・Allocations を使ってメモリリークと過剰消費を検出する手法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">メモリ問題の種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swift アプリのメモリ問題は主に3種類あります。
          <code className="text-pink-300">メモリリーク</code>は参照サイクルなどで解放されないオブジェクト、
          <code className="text-pink-300">過剰なメモリ使用</code>は不要なデータを長期保持するケース、
          <code className="text-pink-300">ダングリング参照</code>は解放済みオブジェクトへのアクセスです。
          Xcode の <code className="text-pink-300">Instruments</code>（Leaks・Allocations テンプレート）で
          これらをリアルタイムに可視化できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-pink-300">Instruments → Leaks</code> — 循環参照によるリークを検出</li>
          <li><code className="text-pink-300">Instruments → Allocations</code> — メモリ割り当てのトレース</li>
          <li><code className="text-pink-300">Memory Graph Debugger</code> — Xcode 内でオブジェクトグラフを可視化</li>
          <li><code className="text-pink-300">weak / unowned</code> — 循環参照を断ち切る</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: メモリリークの原因と修正</h2>
        <SwiftEditor
          defaultCode={`import Foundation

// 悪い例: 強参照サイクルでリーク
class NodeLeak {
    let name: String
    var next: NodeLeak?  // 強参照

    init(name: String) { self.name = name }
    deinit { print("解放: \\(name)") }
}

print("=== リークあり ===")
do {
    let a = NodeLeak(name: "A")
    let b = NodeLeak(name: "B")
    a.next = b
    b.next = a  // 循環参照 → 解放されない
}
print("スコープ終了（解放されなかった）")

// 良い例: weak で循環参照を断ち切る
class NodeSafe {
    let name: String
    weak var next: NodeSafe?  // 弱参照

    init(name: String) { self.name = name }
    deinit { print("解放: \\(name)") }
}

print("\\n=== リークなし ===")
do {
    let a = NodeSafe(name: "A")
    let b = NodeSafe(name: "B")
    a.next = b
    b.next = a
}
print("スコープ終了（正しく解放された）")`}
          expectedOutput={`=== リークあり ===
スコープ終了（解放されなかった）

=== リークなし ===
解放: B
解放: A
スコープ終了（正しく解放された）`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: クロージャによるリークと修正</h2>
        <SwiftEditor
          defaultCode={`import Foundation

class ViewController {
    let name: String
    var onComplete: (() -> Void)?

    init(name: String) {
        self.name = name
        print("生成: \\(name)")
    }

    // 悪い例: self を強参照キャプチャ
    func setupHandlerLeak() {
        onComplete = {
            print("完了: \\(self.name)")  // self を強参照
        }
    }

    // 良い例: [weak self] でキャプチャ
    func setupHandlerSafe() {
        onComplete = { [weak self] in
            guard let self = self else { return }
            print("完了（安全）: \\(self.name)")
        }
    }

    deinit { print("解放: \\(name)") }
}

print("=== weak self 使用 ===")
var vc: ViewController? = ViewController(name: "HomeVC")
vc?.setupHandlerSafe()
vc?.onComplete?()
vc = nil  // 解放される
print("vc = nil 後")`}
          expectedOutput={`=== weak self 使用 ===
生成: HomeVC
完了（安全）: HomeVC
解放: HomeVC
vc = nil 後`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: deinit でリーク検知パターン</h2>
        <SwiftEditor
          defaultCode={`import Foundation

// deinit が呼ばれることでリークがないことを確認するテクニック
class TrackedObject {
    static var instanceCount = 0
    let id: Int

    init() {
        TrackedObject.instanceCount += 1
        self.id = TrackedObject.instanceCount
        print("生成 #\\(id) (合計: \\(TrackedObject.instanceCount))")
    }

    deinit {
        TrackedObject.instanceCount -= 1
        print("解放 #\\(id) (残り: \\(TrackedObject.instanceCount))")
    }
}

func runTest() {
    print("=== テスト開始 ===")
    var objects: [TrackedObject] = []

    for _ in 0..<3 {
        objects.append(TrackedObject())
    }

    print("明示的に解放")
    objects.removeAll()

    print("インスタンス残数:", TrackedObject.instanceCount)
    // 0 なら全て正しく解放 → リークなし
}

runTest()
print("最終インスタンス数:", TrackedObject.instanceCount)`}
          expectedOutput={`=== テスト開始 ===
生成 #1 (合計: 1)
生成 #2 (合計: 2)
生成 #3 (合計: 3)
明示的に解放
解放 #1 (残り: 2)
解放 #2 (残り: 1)
解放 #3 (残り: 0)
インスタンス残数: 0
最終インスタンス数: 0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="memory" lessonId="memory-debugging" />
      </div>
      <LessonNav lessons={lessons} currentId="memory-debugging" basePath="/learn/memory" />
    </div>
  );
}

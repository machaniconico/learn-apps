import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "collections")!.lessons;

export default function LazySequencesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">コレクション レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">遅延シーケンス</h1>
        <p className="text-gray-400">.lazyプロパティを使って大規模コレクションを効率的に処理する遅延評価の仕組みを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">遅延評価とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          通常の <code className="text-blue-300">map</code> や <code className="text-blue-300">filter</code> は全要素に即座に変換を適用して新しい配列を生成します。
          <code className="text-blue-300">.lazy</code> を使うと変換は「必要になった時点」まで遅延されます。
          巨大なコレクションや無限シーケンスを扱う際にメモリと計算コストを大幅に削減できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">collection.lazy</code> — LazySequenceに変換</li>
          <li><code className="text-blue-300">.lazy.map {"{ ... }"}</code> — 遅延map（中間配列を生成しない）</li>
          <li><code className="text-blue-300">.lazy.filter {"{ ... }"}</code> — 遅延filter</li>
          <li>実際のアクセス時（for-in, first, Array()など）に評価が走る</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: lazy map と通常 map の違い</h2>
        <SwiftEditor
          defaultCode={`let numbers = Array(1...10)

// 通常のmap: 全要素を即座に変換した新配列を生成
let eagerResult = numbers.map { n -> Int in
    print("変換中: \\(n)")
    return n * n
}
print("eager最初の要素: \\(eagerResult[0])")

print("---")

// lazyのmap: 要素にアクセスした時だけ変換
let lazyResult = numbers.lazy.map { n -> Int in
    print("遅延変換中: \\(n)")
    return n * n
}
print("lazy最初の要素: \\(lazyResult[0])")`}
          expectedOutput={`変換中: 1
変換中: 2
変換中: 3
変換中: 4
変換中: 5
変換中: 6
変換中: 7
変換中: 8
変換中: 9
変換中: 10
eager最初の要素: 1
---
遅延変換中: 1
lazy最初の要素: 1`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">lazy filter と連鎖</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-300">.lazy.filter</code> はフィルタ条件を各要素が要求されるタイミングで評価します。
          <code className="text-blue-300">map</code> と <code className="text-blue-300">filter</code> を連鎖させても中間コレクションは作られません。
          最後に <code className="text-blue-300">Array()</code> などで具体化することで全評価が行われます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">.lazy.filter { }.map { }</code> — 中間配列なしで連鎖</li>
          <li><code className="text-blue-300">Array(lazySeq)</code> — 遅延シーケンスを配列に具体化</li>
          <li><code className="text-blue-300">lazySeq.first</code> — 条件を満たす最初の要素だけ評価</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: lazy filter と連鎖処理</h2>
        <SwiftEditor
          defaultCode={`let data = Array(1...1000)

// lazyで偶数だけ選んで2乗、最初の5つだけ取得
let result = data.lazy
    .filter { $0 % 2 == 0 }
    .map { $0 * $0 }
    .prefix(5)

print(Array(result))

// firstを使えばさらに最小評価
let firstEvenSquare = data.lazy
    .filter { $0 % 2 == 0 }
    .map { $0 * $0 }
    .first!

print("最初の偶数の2乗: \\(firstEvenSquare)")`}
          expectedOutput={`[4, 16, 36, 64, 100]
最初の偶数の2乗: 4`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">パフォーマンス上のメリット</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          遅延シーケンスが特に効果を発揮するのは、大規模データの一部だけ必要な場面です。
          また <code className="text-blue-300">stride(from:to:by:)</code> などの無限または大きな範囲でも安全に使えます。
          ただし繰り返し利用する場合は <code className="text-blue-300">Array()</code> で一度具体化した方が効率的です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>中間配列を生成しないのでメモリ使用量が少ない</li>
          <li>必要な分だけ評価されるので計算量が削減できる</li>
          <li>繰り返し参照するなら <code className="text-blue-300">Array()</code> で具体化した方が速い</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 大きな範囲での活用</h2>
        <SwiftEditor
          defaultCode={`// 1から1,000,000までで3の倍数かつ7の倍数の最初の3つ
let huge = (1...1_000_000).lazy
    .filter { $0 % 3 == 0 && $0 % 7 == 0 }
    .prefix(3)

print("最初の3つ:", Array(huge))

// strideとlazyの組み合わせ
let stepped = stride(from: 0, to: 100, by: 3).lazy
    .map { "item_\\($0)" }
    .prefix(4)

for item in stepped {
    print(item)
}`}
          expectedOutput={`最初の3つ: [21, 42, 63]
item_0
item_3
item_6
item_9`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collections" lessonId="lazy-sequences" />
      </div>
      <LessonNav lessons={lessons} currentId="lazy-sequences" basePath="/learn/collections" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "basics")!.lessons;

export default function CommentsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">Swift基礎 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コメント</h1>
        <p className="text-gray-400">単一行コメント・複数行コメント・ドキュメントコメントの書き方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コメントの種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          コメントはコードの説明を書くためのもので、コンパイラには無視されます。
          Swiftでは3種類のコメントが使えます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">// コメント</code> — 単一行コメント</li>
          <li><code className="text-blue-300">/* コメント */</code> — 複数行コメント（ネスト可能）</li>
          <li><code className="text-blue-300">/// コメント</code> — ドキュメントコメント（Xcodeで表示される）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 単一行・複数行コメント</h2>
        <SwiftEditor
          defaultCode={`// これは単一行コメントです

let x = 10  // 行末コメントも書けます

/* これは
   複数行コメントです
   複数の行にまたがって書けます */

let y = 20

/* ネストされた /* コメント */ も可能 */
let z = x + y
print(z)`}
          expectedOutput={`30`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ドキュメントコメント</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-300">///</code> で始まるドキュメントコメントはXcodeのQuick Helpに表示されます。
          <code className="text-blue-300">- Parameter</code>、<code className="text-blue-300">- Returns</code> などのキーワードで
          引数や戻り値を説明できます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: ドキュメントコメント</h2>
        <SwiftEditor
          defaultCode={`/// 2つの整数を足して返します。
///
/// - Parameters:
///   - a: 最初の整数
///   - b: 2番目の整数
/// - Returns: aとbの合計
func add(_ a: Int, _ b: Int) -> Int {
    return a + b
}

/// 円の面積を計算します。
///
/// - Parameter radius: 円の半径
/// - Returns: 面積（π × r²）
func circleArea(radius: Double) -> Double {
    return Double.pi * radius * radius
}

print(add(3, 5))
print(String(format: "%.2f", circleArea(radius: 5.0)))`}
          expectedOutput={`8
78.54`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="comments" />
      </div>
      <LessonNav lessons={lessons} currentId="comments" basePath="/learn/basics" />
    </div>
  );
}

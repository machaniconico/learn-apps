import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "control")!.lessons;

export default function ForInPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御構文 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">for-inループ</h1>
        <p className="text-gray-400">コレクションや範囲を反復処理するfor-inループを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">for-inループの基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">for-in</code> ループはシーケンス（範囲・配列・辞書・文字列など）の各要素に対して処理を繰り返します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">for i in 1...5</code> — 範囲の反復</li>
          <li><code className="text-cyan-300">for item in array</code> — 配列の反復</li>
          <li><code className="text-cyan-300">for (key, value) in dict</code> — 辞書の反復</li>
          <li><code className="text-cyan-300">for _ in 1...3</code> — アンダースコアで変数を無視</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 範囲と配列の反復</h2>
        <SwiftEditor
          defaultCode={`// 範囲の反復
for i in 1...5 {
    print("数字: \\(i)")
}

// 配列の反復
let fruits = ["りんご", "バナナ", "みかん"]
for fruit in fruits {
    print("果物: \\(fruit)")
}

// インデックス付き反復
for (index, fruit) in fruits.enumerated() {
    print("\\(index + 1): \\(fruit)")
}`}
          expectedOutput={`数字: 1
数字: 2
数字: 3
数字: 4
数字: 5
果物: りんご
果物: バナナ
果物: みかん
1: りんご
2: バナナ
3: みかん`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">stride と辞書の反復</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">stride(from:to:by:)</code> を使うとステップを指定した反復ができます。
          辞書はキーと値のタプルとして反復できます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: strideと辞書の反復</h2>
        <SwiftEditor
          defaultCode={`// stride: ステップ指定
for i in stride(from: 0, to: 10, by: 2) {
    print(i, terminator: " ")
}
print("")

// stride: 逆順
for i in stride(from: 5, through: 1, by: -1) {
    print(i, terminator: " ")
}
print("")

// 辞書の反復
let scores = ["Alice": 90, "Bob": 75, "Carol": 88]
for (name, score) in scores.sorted(by: { $0.key < $1.key }) {
    print("\\(name): \\(score)点")
}`}
          expectedOutput={`0 2 4 6 8
5 4 3 2 1
Alice: 90点
Bob: 75点
Carol: 88点`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="for-in" />
      </div>
      <LessonNav lessons={lessons} currentId="for-in" basePath="/learn/control" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "collections")!.lessons;

export default function ArraysPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">コレクション レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">配列</h1>
        <p className="text-gray-400">Array型の作成・追加・削除・アクセスなど基本的な配列操作を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">配列の基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swiftの配列は順序付きのコレクションで、同じ型の値を格納します。
          <code className="text-green-300">[Type]</code> または <code className="text-green-300">Array&lt;Type&gt;</code> で型を表します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-green-300">var arr = [1, 2, 3]</code> — リテラルで作成</li>
          <li><code className="text-green-300">arr[0]</code> — インデックスでアクセス</li>
          <li><code className="text-green-300">arr.append(4)</code> — 末尾に追加</li>
          <li><code className="text-green-300">arr.remove(at: 0)</code> — 指定位置を削除</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 配列の基本操作</h2>
        <SwiftEditor
          defaultCode={`// 配列の作成
var fruits = ["りんご", "バナナ", "みかん"]
let emptyArray: [Int] = []

// アクセス
print(fruits[0])
print(fruits.first ?? "なし")
print(fruits.last ?? "なし")
print("要素数: \\(fruits.count)")
print("空？: \\(fruits.isEmpty)")

// 追加
fruits.append("ぶどう")
fruits.insert("いちご", at: 1)
print(fruits)

// 変更
fruits[0] = "梨"
print(fruits[0])`}
          expectedOutput={`りんご
りんご
みかん
要素数: 3
空？: false
["梨", "いちご", "バナナ", "みかん", "ぶどう"]
梨`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">配列の削除と結合</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          要素の削除は <code className="text-green-300">remove(at:)</code>、<code className="text-green-300">removeFirst()</code>、<code className="text-green-300">removeLast()</code> で行います。
          配列同士は <code className="text-green-300">+</code> 演算子で結合できます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 削除・結合・スライス</h2>
        <SwiftEditor
          defaultCode={`var numbers = [1, 2, 3, 4, 5]

// 削除
numbers.remove(at: 2)      // インデックス2を削除
print(numbers)

numbers.removeLast()
print(numbers)

// 結合
let a = [1, 2, 3]
let b = [4, 5, 6]
let combined = a + b
print(combined)

// スライス（部分配列）
let slice = combined[2...4]
print(Array(slice))

// 含まれるか確認
print(combined.contains(3))
print(combined.firstIndex(of: 4) ?? -1)`}
          expectedOutput={`[1, 2, 4, 5]
[1, 2, 4]
[1, 2, 3, 4, 5, 6]
[3, 4, 5]
true
3`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collections" lessonId="arrays" />
      </div>
      <LessonNav lessons={lessons} currentId="arrays" basePath="/learn/collections" />
    </div>
  );
}

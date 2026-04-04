import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "collections")!.lessons;

export default function SetsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">コレクション レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">セット</h1>
        <p className="text-gray-400">重複しない値を持つSet型と集合演算の使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Set型の特徴</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Setは重複しない値を順序なしで格納するコレクションです。
          要素は <code className="text-green-300">Hashable</code> プロトコルに準拠する必要があります。
          重複チェックや集合演算（和・積・差）に適しています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-green-300">var s: Set&lt;Int&gt; = [1, 2, 3]</code> — 型注釈が必要（配列と区別するため）</li>
          <li><code className="text-green-300">s.insert(4)</code> — 要素を追加</li>
          <li><code className="text-green-300">s.contains(2)</code> — 要素の存在確認（O(1)）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: Setの基本操作</h2>
        <SwiftEditor
          defaultCode={`// Setの作成（型注釈が必要）
var colors: Set<String> = ["赤", "青", "緑"]
var numbers: Set = [1, 2, 3, 4, 5]

// 追加（重複は無視される）
colors.insert("青")  // すでにある
colors.insert("黄")
print(colors.count)  // 4

// 削除
colors.remove("赤")
print(colors.sorted())

// 含まれるか確認（配列より高速）
print(numbers.contains(3))
print(numbers.contains(10))

// 空チェック
print(numbers.isEmpty)`}
          expectedOutput={`4
["green", "yellow", "blue"]
true
false
false`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">集合演算</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Setは数学の集合演算をサポートしています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-green-300">a.union(b)</code> — 和集合（AまたはBに含まれる）</li>
          <li><code className="text-green-300">a.intersection(b)</code> — 積集合（AとBの両方に含まれる）</li>
          <li><code className="text-green-300">a.subtracting(b)</code> — 差集合（AにあってBにない）</li>
          <li><code className="text-green-300">a.symmetricDifference(b)</code> — 対称差（どちらか一方のみ）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 集合演算</h2>
        <SwiftEditor
          defaultCode={`let swift: Set = ["変数", "定数", "関数", "クロージャ", "プロトコル"]
let python: Set = ["変数", "関数", "クラス", "デコレータ", "リスト内包"]

// 和集合
let union = swift.union(python)
print("どちらかで使う: \\(union.sorted())")

// 積集合（共通部分）
let common = swift.intersection(python)
print("両方で使う: \\(common.sorted())")

// 差集合
let onlySwift = swift.subtracting(python)
print("Swiftのみ: \\(onlySwift.sorted())")`}
          expectedOutput={`どちらかで使う: ["クラス", "クロージャ", "デコレータ", "プロトコル", "リスト内包", "変数", "定数", "関数"]
両方で使う: ["変数", "関数"]
Swiftのみ: ["クロージャ", "プロトコル", "定数"]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collections" lessonId="sets" />
      </div>
      <LessonNav lessons={lessons} currentId="sets" basePath="/learn/collections" />
    </div>
  );
}

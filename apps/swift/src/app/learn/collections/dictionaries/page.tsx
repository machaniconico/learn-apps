import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "collections")!.lessons;

export default function DictionariesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">コレクション レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">辞書</h1>
        <p className="text-gray-400">Dictionary型のキーと値のペアを使った操作を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">辞書の基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          辞書はキーと値のペアを格納するコレクションです。
          <code className="text-green-300">[KeyType: ValueType]</code> で型を表します。
          キーは <code className="text-green-300">Hashable</code> プロトコルに準拠する必要があります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-green-300">dict["key"]</code> — Optional型で値を取得</li>
          <li><code className="text-green-300">dict["key"] = value</code> — 値を設定（nilで削除）</li>
          <li><code className="text-green-300">dict["key", default: 0]</code> — デフォルト値付きアクセス</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 辞書の基本操作</h2>
        <SwiftEditor
          defaultCode={`// 辞書の作成
var capitals = ["日本": "東京", "フランス": "パリ", "米国": "ワシントンD.C."]

// アクセス（Optionalを返す）
if let capital = capitals["日本"] {
    print("日本の首都: \\(capital)")
}

// デフォルト値付きアクセス
let unknown = capitals["ドイツ", default: "不明"]
print("ドイツの首都: \\(unknown)")

// 追加・更新
capitals["ドイツ"] = "ベルリン"
capitals["日本"] = "Tokyo"  // 更新
print(capitals.count)

// 削除
capitals["米国"] = nil
print(capitals.keys.sorted())`}
          expectedOutput={`日本の首都: 東京
ドイツの首都: 不明
4
["ドイツ", "フランス", "日本"]`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">辞書の反復と変換</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          辞書の <code className="text-green-300">keys</code> と <code className="text-green-300">values</code> プロパティで
          キーや値だけを取得できます。<code className="text-green-300">updateValue(_:forKey:)</code> は古い値を返します。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 辞書の反復と高度な操作</h2>
        <SwiftEditor
          defaultCode={`var wordCount: [String: Int] = [:]
let words = ["apple", "banana", "apple", "cherry", "banana", "apple"]

// 単語の出現回数をカウント
for word in words {
    wordCount[word, default: 0] += 1
}

// ソートして出力
for (word, count) in wordCount.sorted(by: { $0.key < $1.key }) {
    print("\\(word): \\(count)回")
}

// 条件でフィルタリング
let frequent = wordCount.filter { $0.value >= 2 }
print("2回以上: \\(frequent.keys.sorted())")`}
          expectedOutput={`apple: 3回
banana: 2回
cherry: 1回
2回以上: ["apple", "banana"]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collections" lessonId="dictionaries" />
      </div>
      <LessonNav lessons={lessons} currentId="dictionaries" basePath="/learn/collections" />
    </div>
  );
}

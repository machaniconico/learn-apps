import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "basics")!.lessons;

export default function DataTypesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">Swift基礎 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">データ型</h1>
        <p className="text-gray-400">SwiftのInt・Double・String・Bool・Characterなど基本的なデータ型を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">基本データ型</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swiftには多くの組み込みデータ型があります。すべての型は大文字で始まります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">Int</code> — 整数（例: 42, -10）</li>
          <li><code className="text-blue-300">Double</code> — 64bit浮動小数点数（例: 3.14）</li>
          <li><code className="text-blue-300">Float</code> — 32bit浮動小数点数</li>
          <li><code className="text-blue-300">String</code> — 文字列（例: "Hello"）</li>
          <li><code className="text-blue-300">Bool</code> — 真偽値（true / false）</li>
          <li><code className="text-blue-300">Character</code> — 単一の文字（例: "A"）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 各データ型の宣言</h2>
        <SwiftEditor
          defaultCode={`let count: Int = 42
let price: Double = 1980.5
let isAvailable: Bool = true
let title: String = "Swift入門"
let initial: Character = "S"

print("数量: \\(count)")
print("価格: \\(price)円")
print("在庫あり: \\(isAvailable)")
print("タイトル: \\(title)")
print("イニシャル: \\(initial)")`}
          expectedOutput={`数量: 42
価格: 1980.5円
在庫あり: true
タイトル: Swift入門
イニシャル: S`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">型の確認</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-300">type(of:)</code> 関数を使って変数の型を確認できます。
          型推論により明示的な型指定が不要な場合でも、Swiftは正確に型を判定します。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 型推論と型確認</h2>
        <SwiftEditor
          defaultCode={`let integer = 100       // Int と推論
let decimal = 3.14      // Double と推論
let text = "Hello"      // String と推論
let flag = false        // Bool と推論

print(type(of: integer))
print(type(of: decimal))
print(type(of: text))
print(type(of: flag))`}
          expectedOutput={`Int
Double
String
Bool`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="data-types" />
      </div>
      <LessonNav lessons={lessons} currentId="data-types" basePath="/learn/basics" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "basics")!.lessons;

export default function StringBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">Swift基礎 レッスン12</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字列の基本</h1>
        <p className="text-gray-400">Stringリテラルの作成、文字列の連結、isEmptyなど基本的な文字列操作を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">String型の基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SwiftのStringは値型（構造体）で、Unicodeを完全にサポートします。
          ダブルクオートで囲んで文字列リテラルを作ります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">let s = "Hello"</code> — 文字列リテラル</li>
          <li><code className="text-blue-300">s1 + s2</code> — 文字列の連結</li>
          <li><code className="text-blue-300">s.isEmpty</code> — 文字列が空かどうか</li>
          <li><code className="text-blue-300">s.count</code> — 文字数を取得</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 文字列の作成と連結</h2>
        <SwiftEditor
          defaultCode={`// 文字列リテラル
let hello = "こんにちは"
let world = "世界"

// 連結
let greeting = hello + "、" + world + "！"
print(greeting)

// +=で追加
var sentence = "Swift"
sentence += "は楽しい"
print(sentence)

// 文字数
print("文字数: \\(greeting.count)")

// 空文字チェック
let empty = ""
let notEmpty = "Hello"
print("空？: \\(empty.isEmpty)")
print("空？: \\(notEmpty.isEmpty)")`}
          expectedOutput={`こんにちは、世界！
Swiftは楽しい
文字数: 10
空？: true
空？: false`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">文字列の基本プロパティ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Stringには便利なプロパティとメソッドが多数用意されています。
          大文字・小文字変換、前後のチェックなどがよく使われます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 文字列プロパティとメソッド</h2>
        <SwiftEditor
          defaultCode={`let text = "Hello, Swift!"

// 大文字・小文字
print(text.uppercased())
print(text.lowercased())

// 前後チェック
print(text.hasPrefix("Hello"))
print(text.hasSuffix("Swift!"))
print(text.contains("Swift"))

// 繰り返し
let repeated = String(repeating: "Ha", count: 3)
print(repeated)

// 逆順
let reversed = String(text.reversed())
print(reversed)`}
          expectedOutput={`HELLO, SWIFT!
hello, swift!
true
true
true
HaHaHa
!tfiwS ,olleH`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="string-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="string-basics" basePath="/learn/basics" />
    </div>
  );
}

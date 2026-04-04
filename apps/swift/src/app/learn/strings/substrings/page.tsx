import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "strings")!.lessons;

export default function SubstringsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">文字列操作 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">部分文字列</h1>
        <p className="text-gray-400">Substring型とStringインデックスを使った部分文字列の取得方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Substring型</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swiftの文字列スライスは <code className="text-purple-300">Substring</code> 型を返します。
          Substringは元のStringとメモリを共有するため効率的ですが、
          長期間保持する場合は <code className="text-purple-300">String(substring)</code> で変換します。
          Swiftでは整数インデックスは使えず、<code className="text-purple-300">String.Index</code> を使います。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: prefix・suffix・dropFirst/Last</h2>
        <SwiftEditor
          defaultCode={`let text = "Hello, Swift!"

// prefix と suffix
let firstFive = text.prefix(5)
print(firstFive)  // "Hello"

let lastSix = text.suffix(6)
print(lastSix)   // "Swift!"

// drop
let withoutFirst7 = text.dropFirst(7)
print(withoutFirst7)  // "Swift!"

let withoutLast1 = text.dropLast(1)
print(withoutLast1)  // "Hello, Swift"

// Substringを Stringに変換
let swiftPart = String(text.prefix(5))
print(type(of: swiftPart))  // String`}
          expectedOutput={`Hello
Swift!
Swift!
Hello, Swift
String`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">String.Indexによる範囲指定</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swiftの文字列インデックスは <code className="text-purple-300">startIndex</code>・<code className="text-purple-300">endIndex</code> と
          <code className="text-purple-300">index(_:offsetBy:)</code> で操作します。
          これによりUnicode文字を正しく扱えます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: インデックスによるスライス</h2>
        <SwiftEditor
          defaultCode={`let str = "Hello, Swift!"

// startIndex から n文字目まで
let start = str.startIndex
let endIdx = str.index(start, offsetBy: 5)
print(str[start..<endIdx])  // "Hello"

// 最後から n文字
let fromEnd = str.index(str.endIndex, offsetBy: -6)
print(str[fromEnd...])  // "Swift!"

// 文字列から特定文字を検索してスライス
if let commaIdx = str.firstIndex(of: ",") {
    let afterComma = str.index(commaIdx, offsetBy: 2)
    print(str[afterComma...])  // "Swift!"
}`}
          expectedOutput={`Hello
Swift!
Swift!`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="substrings" />
      </div>
      <LessonNav lessons={lessons} currentId="substrings" basePath="/learn/strings" />
    </div>
  );
}

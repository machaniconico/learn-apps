import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "strings")!.lessons;

export default function StringMethodsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">文字列操作 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字列メソッド</h1>
        <p className="text-gray-400">uppercased・lowercased・hasPrefix・trimmingCharactersなど主要なメソッドを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">よく使う文字列メソッド</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swiftの文字列には多彩なメソッドが用意されています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-purple-300">uppercased() / lowercased()</code> — 大文字・小文字変換</li>
          <li><code className="text-purple-300">trimmingCharacters(in:)</code> — 前後の空白や文字を除去</li>
          <li><code className="text-purple-300">replacingOccurrences(of:with:)</code> — 文字列の置換</li>
          <li><code className="text-purple-300">split(separator:)</code> — 文字列の分割</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 変換・検索・置換メソッド</h2>
        <SwiftEditor
          defaultCode={`let text = "  Hello, Swift World!  "

// 前後の空白を除去
let trimmed = text.trimmingCharacters(in: .whitespaces)
print("【\\(trimmed)】")

// 大文字・小文字
print(trimmed.uppercased())
print(trimmed.lowercased())

// 置換
let replaced = trimmed.replacingOccurrences(of: "World", with: "Universe")
print(replaced)

// 前後チェック
print(trimmed.hasPrefix("Hello"))
print(trimmed.hasSuffix("!"))
print(trimmed.contains("Swift"))`}
          expectedOutput={`【Hello, Swift World!】
HELLO, SWIFT WORLD!
hello, swift world!
Hello, Swift Universe!
true
true
true`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">分割・結合メソッド</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-purple-300">split</code> と <code className="text-purple-300">components(separatedBy:)</code> で文字列を分割できます。
          配列の <code className="text-purple-300">joined</code> で結合します。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 分割・結合・繰り返し</h2>
        <SwiftEditor
          defaultCode={`import Foundation

// split: Substring配列を返す
let csv = "Alice,Bob,Carol,Dave"
let names = csv.split(separator: ",")
for name in names {
    print(name)
}

// components(separatedBy:): String配列を返す
let path = "/usr/local/bin/swift"
let parts = path.components(separatedBy: "/")
print(parts.filter { !$0.isEmpty })

// joined: 配列を文字列に結合
let words = ["Swift", "is", "powerful"]
print(words.joined(separator: " "))
print(words.joined(separator: "-"))

// repeating
print(String(repeating: "⭐", count: 5))`}
          expectedOutput={`Alice
Bob
Carol
Dave
["usr", "local", "bin", "swift"]
Swift is powerful
Swift-is-powerful
⭐⭐⭐⭐⭐`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="methods" />
      </div>
      <LessonNav lessons={lessons} currentId="methods" basePath="/learn/strings" />
    </div>
  );
}

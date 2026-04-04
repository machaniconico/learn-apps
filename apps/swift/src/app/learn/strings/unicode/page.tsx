import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "strings")!.lessons;

export default function UnicodePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">文字列操作 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Unicode</h1>
        <p className="text-gray-400">SwiftのUnicode完全対応とCharacter・スカラー値の操作を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">SwiftとUnicode</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SwiftのStringはUnicode準拠で、絵文字や日本語も正しく扱えます。
          <code className="text-purple-300">count</code> はUnicodeの書記素クラスター（目に見える文字）の数を返します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-purple-300">unicodeScalars</code> — Unicodeスカラー値のビュー</li>
          <li><code className="text-purple-300">utf8</code> / <code className="text-purple-300">utf16</code> — UTF-8/16バイト列のビュー</li>
          <li>絵文字は複数のスカラー値で1文字になる場合がある</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: Unicode文字の扱い</h2>
        <SwiftEditor
          defaultCode={`// 絵文字や日本語も正しくカウント
let emoji = "👨‍👩‍👧‍👦"  // 家族の絵文字（複数スカラーで1文字）
let japanese = "日本語"
let mixed = "Hello🌍"

print("emoji.count = \\(emoji.count)")      // 1
print("japanese.count = \\(japanese.count)") // 3
print("mixed.count = \\(mixed.count)")       // 6

// Unicodeスカラー値
let heart = "❤️"
for scalar in heart.unicodeScalars {
    print("U+\\(String(scalar.value, radix: 16, uppercase: true))", terminator: " ")
}
print("")

// UTF-8バイト数
print("UTF-8バイト数: \\(japanese.utf8.count)")`}
          expectedOutput={`emoji.count = 1
japanese.count = 3
mixed.count = 6
U+2764 U+FE0F
UTF-8バイト数: 9`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Character型</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-purple-300">Character</code> 型は1つのUnicode書記素クラスターを表します。
          文字列を1文字ずつ処理するときに使います。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: Character型の操作</h2>
        <SwiftEditor
          defaultCode={`// Character型
let char: Character = "A"
print(char.isLetter)    // true
print(char.isUppercase) // true
print(char.lowercased()) // "a"

// 文字列をCharacterで走査
let word = "Swift"
for c in word {
    print("\\(c): \\(c.isUppercase ? "大文字" : "小文字")")
}

// 文字の判定
let testChars: [Character] = ["a", "Z", "3", "!", "あ"]
for c in testChars {
    if c.isLetter { print("\\(c): 文字") }
    else if c.isNumber { print("\\(c): 数字") }
    else { print("\\(c): その他") }
}`}
          expectedOutput={`true
true
a
S: 大文字
w: 小文字
i: 小文字
f: 小文字
t: 小文字
a: 文字
Z: 文字
3: 数字
!: その他
あ: 文字`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="unicode" />
      </div>
      <LessonNav lessons={lessons} currentId="unicode" basePath="/learn/strings" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "strings")!.lessons;

export default function StringsBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">文字列操作 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字列の基本</h1>
        <p className="text-gray-400">String型の作成・連結・比較・基本プロパティを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">String型の特徴</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SwiftのStringはUnicodeを完全にサポートする値型（構造体）です。
          文字列は変更可能（var）または変更不可（let）として宣言できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>値型なので代入時にコピーされる</li>
          <li><code className="text-purple-300">+</code> 演算子や <code className="text-purple-300">+=</code> で連結</li>
          <li><code className="text-purple-300">==</code> で内容の比較（参照ではなく値を比較）</li>
          <li><code className="text-purple-300">count</code> でUnicode文字数を取得</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 文字列の基本操作</h2>
        <SwiftEditor
          defaultCode={`// 文字列の作成
let greeting = "Hello, Swift!"
var message = "プログラミングは"
message += "楽しい"

print(greeting)
print(message)

// 比較
let a = "Swift"
let b = "Swift"
let c = "Python"
print(a == b)  // true
print(a == c)  // false
print(a < c)   // 辞書順比較

// プロパティ
print("文字数: \\(greeting.count)")
print("空？: \\(greeting.isEmpty)")
print("\"\".isEmpty = \\("".isEmpty)")`}
          expectedOutput={`Hello, Swift!
プログラミングは楽しい
true
false
false
文字数: 13
空？: false
"".isEmpty = true`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">文字列の検索と変換</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Stringには検索・変換・分割など多くの便利なメソッドがあります。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 検索・変換・分割</h2>
        <SwiftEditor
          defaultCode={`let text = "Hello, Swift World!"

// 検索
print(text.contains("Swift"))
print(text.hasPrefix("Hello"))
print(text.hasSuffix("!"))

// 変換
print(text.uppercased())
print(text.lowercased())
print(text.replacingOccurrences(of: "Swift", with: "Beautiful"))

// 分割
let csv = "Alice,Bob,Carol,Dave"
let names = csv.split(separator: ",")
print(names)`}
          expectedOutput={`true
true
true
HELLO, SWIFT WORLD!
hello, swift world!
Hello, Beautiful World!
["Alice", "Bob", "Carol", "Dave"]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/strings" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "control")!.lessons;

export default function IfElsePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御構文 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">if-else文</h1>
        <p className="text-gray-400">条件分岐の基本となるif-else文の書き方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">if文の基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">if</code> 文は条件が <code className="text-cyan-300">true</code> の場合にブロックを実行します。
          Swiftでは条件を括弧で囲む必要はありませんが、波括弧は必須です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>条件式の括弧は省略可能（省略が推奨）</li>
          <li>波括弧 <code className="text-cyan-300">{"{}"}</code> は必須（1行でも省略不可）</li>
          <li>条件は必ず <code className="text-cyan-300">Bool</code> 型でなければならない</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: if-else文の基本</h2>
        <SwiftEditor
          defaultCode={`let temperature = 25

if temperature >= 30 {
    print("暑い！冷房をつけよう")
} else if temperature >= 20 {
    print("快適な気温です")
} else if temperature >= 10 {
    print("少し肌寒いです")
} else {
    print("寒い！暖房をつけよう")
}

// 簡単な条件
let isLoggedIn = true
if isLoggedIn {
    print("ようこそ！")
}`}
          expectedOutput={`快適な気温です
ようこそ！`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">if式（Swift 5.9以降）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swift 5.9からはif文を式として使えます。三項演算子の代わりにより読みやすい形で書けます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 複合条件と三項演算子</h2>
        <SwiftEditor
          defaultCode={`let age = 20
let hasID = true

// 複合条件
if age >= 18 && hasID {
    print("入場できます")
} else {
    print("入場できません")
}

// 三項演算子
let status = age >= 18 ? "成人" : "未成年"
print("ステータス: \\(status)")

// nilチェック
let name: String? = "Swift"
if let unwrapped = name {
    print("名前: \\(unwrapped)")
} else {
    print("名前がありません")
}`}
          expectedOutput={`入場できます
ステータス: 成人
名前: Swift`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="if-else" />
      </div>
      <LessonNav lessons={lessons} currentId="if-else" basePath="/learn/control" />
    </div>
  );
}

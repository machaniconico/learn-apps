import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "basics")!.lessons;

export default function VariablesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">Swift基礎 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">変数</h1>
        <p className="text-gray-400">varキーワードを使って変更可能な変数を宣言する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">varキーワード</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-300">var</code> キーワードで宣言した変数は後から値を変更できます。
          Swiftは型推論により、初期値から型を自動的に決定します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">var 変数名 = 値</code> — 型推論で変数を宣言</li>
          <li><code className="text-blue-300">var 変数名: 型 = 値</code> — 型を明示して変数を宣言</li>
          <li>varで宣言した変数は後から別の値に変更できる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 変数の宣言と変更</h2>
        <SwiftEditor
          defaultCode={`var score = 0
print("初期スコア: \\(score)")

score = 100
print("更新後スコア: \\(score)")

var name = "Alice"
name = "Bob"
print("名前: \\(name)")`}
          expectedOutput={`初期スコア: 0
更新後スコア: 100
名前: Bob`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">型推論と型アノテーション</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swiftは強力な型推論を持ちます。初期値から型を自動判定しますが、
          明示的に型を指定することもできます。一度決まった型は変更できません。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 様々な型の変数</h2>
        <SwiftEditor
          defaultCode={`var age: Int = 25
var height: Double = 175.5
var isStudent: Bool = true
var greeting = "こんにちは"  // 型推論でString

age = 26  // 変更可能
print("年齢: \\(age)")
print("身長: \\(height)cm")
print("学生: \\(isStudent)")
print(greeting)`}
          expectedOutput={`年齢: 26
身長: 175.5cm
学生: true
こんにちは`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="variables" />
      </div>
      <LessonNav lessons={lessons} currentId="variables" basePath="/learn/basics" />
    </div>
  );
}

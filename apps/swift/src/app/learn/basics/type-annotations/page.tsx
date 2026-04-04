import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "basics")!.lessons;

export default function TypeAnnotationsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">Swift基礎 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">型アノテーション</h1>
        <p className="text-gray-400">コロン（:）を使った明示的な型宣言の書き方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">型アノテーションとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          型アノテーションは変数・定数の型を明示的に指定する方法です。
          <code className="text-blue-300">変数名: 型名</code> の形式で書きます。
          型推論でも十分ですが、型アノテーションを使うことでコードの意図が明確になります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">var x: Int = 10</code> — 整数型を明示</li>
          <li><code className="text-blue-300">let name: String</code> — 初期値なしで型だけ宣言も可能</li>
          <li>型推論が効く場合は型アノテーションを省略できる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 型アノテーションの基本</h2>
        <SwiftEditor
          defaultCode={`// 型アノテーションあり
var age: Int = 20
var temperature: Double = 36.5
var message: String = "おはようございます"
var isLoggedIn: Bool = false

print("年齢: \\(age)")
print("体温: \\(temperature)°C")
print("メッセージ: \\(message)")
print("ログイン状態: \\(isLoggedIn)")`}
          expectedOutput={`年齢: 20
体温: 36.5°C
メッセージ: おはようございます
ログイン状態: false`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">初期値なしの宣言</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          型アノテーションを使うと、初期値なしで変数を宣言できます。
          ただし、使用する前に必ず値を代入する必要があります。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 後から値を代入</h2>
        <SwiftEditor
          defaultCode={`var result: Int
var label: String

// 後から値を代入
result = 42
label = "完了"

print("結果: \\(result)")
print("ラベル: \\(label)")

// 型アノテーションで意図を明確に
let ratio: Double = 1  // 1.0ではなく1でもDoubleとして扱われる
print("比率: \\(ratio)")`}
          expectedOutput={`結果: 42
ラベル: 完了
比率: 1.0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="type-annotations" />
      </div>
      <LessonNav lessons={lessons} currentId="type-annotations" basePath="/learn/basics" />
    </div>
  );
}

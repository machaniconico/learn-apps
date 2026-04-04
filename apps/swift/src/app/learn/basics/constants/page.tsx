import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "basics")!.lessons;

export default function ConstantsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">Swift基礎 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">定数</h1>
        <p className="text-gray-400">letキーワードを使って変更不可能な定数を宣言する方法を学びます。Swiftではletを積極的に使うことが推奨されています。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">letキーワード</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-300">let</code> キーワードで宣言した定数は一度値を設定したら変更できません。
          Swiftでは変更しない値には積極的に <code className="text-blue-300">let</code> を使うことが推奨されています。
          コードの安全性が向上し、意図が明確になります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">let 定数名 = 値</code> — 定数を宣言（変更不可）</li>
          <li>変更しようとするとコンパイルエラーになる</li>
          <li>パフォーマンスの最適化にも役立つ</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 定数の宣言</h2>
        <SwiftEditor
          defaultCode={`let pi = 3.14159
let appName = "SwiftLearn"
let maxUsers = 100

print("π = \\(pi)")
print("アプリ名: \\(appName)")
print("最大ユーザー数: \\(maxUsers)")`}
          expectedOutput={`π = 3.14159
アプリ名: SwiftLearn
最大ユーザー数: 100`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">varとletの使い分け</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          値が変わる場合は <code className="text-blue-300">var</code>、変わらない場合は <code className="text-blue-300">let</code> を使います。
          迷ったら <code className="text-blue-300">let</code> から始めて、変更が必要になったら <code className="text-blue-300">var</code> に変えましょう。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: varとletの違い</h2>
        <SwiftEditor
          defaultCode={`let birthYear = 1990  // 変わらない値
var currentAge = 34  // 変わる可能性がある値

print("生まれ年: \\(birthYear)")
print("現在の年齢: \\(currentAge)")

currentAge += 1  // varは変更可能
print("来年の年齢: \\(currentAge)")

// let birthYear = 1991  // エラー！定数は変更不可`}
          expectedOutput={`生まれ年: 1990
現在の年齢: 34
来年の年齢: 35`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="constants" />
      </div>
      <LessonNav lessons={lessons} currentId="constants" basePath="/learn/basics" />
    </div>
  );
}

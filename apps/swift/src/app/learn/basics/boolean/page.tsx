import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "basics")!.lessons;

export default function BooleanPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">Swift基礎 レッスン9</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">真偽値</h1>
        <p className="text-gray-400">Bool型とtrue/false、論理演算子の使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Bool型</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-300">Bool</code> 型は <code className="text-blue-300">true</code> または <code className="text-blue-300">false</code> のいずれかの値を持ちます。
          Swiftでは整数を真偽値として使うことはできず、必ず <code className="text-blue-300">Bool</code> 型を使う必要があります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">&amp;&amp;</code> — 論理AND（両方がtrueの場合にtrue）</li>
          <li><code className="text-blue-300">||</code> — 論理OR（どちらかがtrueの場合にtrue）</li>
          <li><code className="text-blue-300">!</code> — 論理NOT（trueをfalseに、falseをtrueに反転）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: Bool型と論理演算子</h2>
        <SwiftEditor
          defaultCode={`let isRaining = true
let hasUmbrella = false

// 論理AND
if isRaining && hasUmbrella {
    print("傘をさして出かけよう")
} else if isRaining && !hasUmbrella {
    print("雨が降っているが傘がない")
} else {
    print("いい天気だ")
}

// 論理OR
let isWeekend = true
let isHoliday = false
if isWeekend || isHoliday {
    print("休日です")
}

// toggle()で値を反転
var isEnabled = false
isEnabled.toggle()
print("有効: \\(isEnabled)")`}
          expectedOutput={`雨が降っているが傘がない
休日です
有効: true`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">比較演算子とBool</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          比較演算子は常に <code className="text-blue-300">Bool</code> 値を返します。
          条件式の結果をBool変数に代入することもできます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 比較演算子とBool</h2>
        <SwiftEditor
          defaultCode={`let age = 18
let hasLicense = age >= 18
print("免許取得可能: \\(hasLicense)")

let score = 75
let isPassing = score >= 60
let isExcellent = score >= 90
print("合格: \\(isPassing)")
print("優秀: \\(isExcellent)")

// 三項演算子
let grade = isPassing ? "合格" : "不合格"
print("判定: \\(grade)")`}
          expectedOutput={`免許取得可能: true
合格: true
優秀: false
判定: 合格`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="boolean" />
      </div>
      <LessonNav lessons={lessons} currentId="boolean" basePath="/learn/basics" />
    </div>
  );
}

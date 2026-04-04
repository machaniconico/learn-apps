import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function BooleanPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">Kotlin基礎 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">論理型</h1>
        <p className="text-gray-400">Boolean型の値と論理演算子（&&、||、!）の使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Boolean型とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Boolean型はtrueまたはfalseのいずれかの値を持ちます。
          条件分岐やループの条件式、フラグ変数として広く使われます。
          論理演算子を使って複数の条件を組み合わせることができます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>&& (AND): 両方がtrueのときtrue</li>
          <li>|| (OR): どちらかがtrueのときtrue</li>
          <li>! (NOT): trueをfalse、falseをtrueに反転</li>
          <li>比較演算子（==、!=、&lt;、&gt;など）はBooleanを返す</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">論理演算子</h2>
        <p className="text-gray-400 mb-4">AND（&&）、OR（||）、NOT（!）の動作を確認しましょう。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val isKotlin = true
    val isJava = false

    println("isKotlin: \${isKotlin}")
    println("isJava: \${isJava}")
    println("AND: \${isKotlin && isJava}")
    println("OR: \${isKotlin || isJava}")
    println("NOT: \${!isKotlin}")
    println("NOT: \${!isJava}")
}`}
          expectedOutput={`isKotlin: true
isJava: false
AND: false
OR: true
NOT: false
NOT: true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">比較演算子とBoolean</h2>
        <p className="text-gray-400 mb-4">比較演算子の結果はBoolean型です。条件分岐に活用できます。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val age = 20
    val score = 85

    val isAdult = age >= 18
    val isPassing = score >= 60
    val isExcellent = score >= 90

    println("成人: \${isAdult}")
    println("合格: \${isPassing}")
    println("優秀: \${isExcellent}")
    println("成人かつ合格: \${isAdult && isPassing}")
    println("合格または優秀: \${isPassing || isExcellent}")
}`}
          expectedOutput={`成人: true
合格: true
優秀: false
成人かつ合格: true
合格または優秀: true`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="boolean" />
      </div>
      <LessonNav lessons={lessons} currentId="boolean" basePath="/learn/basics" />
    </div>
  );
}

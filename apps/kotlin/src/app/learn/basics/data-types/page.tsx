import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function DataTypesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">Kotlin基礎 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">データ型</h1>
        <p className="text-gray-400">Kotlinの基本的なデータ型（Int、Double、String、Booleanなど）の概要を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Kotlinの基本データ型</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          KotlinはJavaと異なりプリミティブ型がなく、すべてがオブジェクトです。
          主要な基本データ型にはInt、Long、Double、Float、Boolean、Char、Stringがあります。
          コンパイラが自動的に適切な型に最適化します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>Int: 32ビット整数（-2,147,483,648 〜 2,147,483,647）</li>
          <li>Double: 64ビット浮動小数点数</li>
          <li>Boolean: trueまたはfalse</li>
          <li>String: 文字列（不変）</li>
          <li>Char: 単一文字（シングルクォートで囲む）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本データ型の使用例</h2>
        <p className="text-gray-400 mb-4">各データ型の宣言と基本的な使い方を確認しましょう。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val count: Int = 42
    val price: Double = 1980.5
    val isActive: Boolean = true
    val initial: Char = 'K'
    val message: String = "Kotlin"

    println("整数: \${count}")
    println("小数: \${price}")
    println("真偽値: \${isActive}")
    println("文字: \${initial}")
    println("文字列: \${message}")
}`}
          expectedOutput={`整数: 42
小数: 1980.5
真偽値: true
文字: K
文字列: Kotlin`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">型変換</h2>
        <p className="text-gray-400 mb-4">Kotlinでは暗黙の型変換がありません。toInt()などの関数で明示的に変換します。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val intVal: Int = 42
    val doubleVal: Double = intVal.toDouble()
    val longVal: Long = intVal.toLong()
    val strVal: String = intVal.toString()

    println("Int: \${intVal}")
    println("Double: \${doubleVal}")
    println("Long: \${longVal}")
    println("String: \${strVal}")
    println("文字列から整数: \${"123".toInt()}")
}`}
          expectedOutput={`Int: 42
Double: 42.0
Long: 42
String: 42
文字列から整数: 123`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="data-types" />
      </div>
      <LessonNav lessons={lessons} currentId="data-types" basePath="/learn/basics" />
    </div>
  );
}

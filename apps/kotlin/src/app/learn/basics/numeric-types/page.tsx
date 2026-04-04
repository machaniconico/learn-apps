import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function NumericTypesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">Kotlin基礎 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">数値型</h1>
        <p className="text-gray-400">Int、Long、Float、Doubleなど各数値型の特徴と使い分けを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">数値型の種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlinには整数型と浮動小数点型があります。整数型はByte、Short、Int、Long、
          浮動小数点型はFloatとDoubleです。用途に応じて適切な型を選びます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>Byte: 8ビット（-128 〜 127）</li>
          <li>Short: 16ビット（-32,768 〜 32,767）</li>
          <li>Int: 32ビット（一般的な整数）</li>
          <li>Long: 64ビット（大きな整数、末尾にLを付ける）</li>
          <li>Float: 32ビット浮動小数点（末尾にfを付ける）</li>
          <li>Double: 64ビット浮動小数点（高精度）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">整数型</h2>
        <p className="text-gray-400 mb-4">各整数型の最大値と最小値を確認しましょう。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val byteVal: Byte = 127
    val shortVal: Short = 32767
    val intVal: Int = 2147483647
    val longVal: Long = 9223372036854775807L

    println("Byte最大値: \${byteVal}")
    println("Short最大値: \${shortVal}")
    println("Int最大値: \${intVal}")
    println("Long最大値: \${longVal}")

    // アンダースコアで読みやすく
    val million = 1_000_000
    println("百万: \${million}")
}`}
          expectedOutput={`Byte最大値: 127
Short最大値: 32767
Int最大値: 2147483647
Long最大値: 9223372036854775807
百万: 1000000`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">浮動小数点型</h2>
        <p className="text-gray-400 mb-4">FloatとDoubleの違いと精度を確認しましょう。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val floatVal: Float = 3.14f
    val doubleVal: Double = 3.141592653589793

    println("Float: \${floatVal}")
    println("Double: \${doubleVal}")

    // 数値演算
    val a = 10
    val b = 3
    println("整数除算: \${a / b}")
    println("小数除算: \${a.toDouble() / b}")
    println("余り: \${a % b}")
}`}
          expectedOutput={`Float: 3.14
Double: 3.141592653589793
整数除算: 3
小数除算: 3.3333333333333335
余り: 1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="numeric-types" />
      </div>
      <LessonNav lessons={lessons} currentId="numeric-types" basePath="/learn/basics" />
    </div>
  );
}

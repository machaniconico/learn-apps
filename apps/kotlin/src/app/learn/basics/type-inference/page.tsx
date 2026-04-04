import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function TypeInferencePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">Kotlin基礎 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">型推論</h1>
        <p className="text-gray-400">Kotlinの型推論機能を使って型注釈を省略する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">型推論とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlinのコンパイラは、代入される値から変数の型を自動的に推論します。
          型注釈を省略しても、コンパイラが正しい型を判断するので安全に使えます。
          型推論を活用するとコードが簡潔になりますが、明示的な型指定が読みやすい場合もあります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>整数リテラルはIntに推論される</li>
          <li>小数リテラルはDoubleに推論される</li>
          <li>文字列リテラルはStringに推論される</li>
          <li>true/falseはBooleanに推論される</li>
          <li>型を明示したい場合は: 型名を付ける</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">型推論の動作</h2>
        <p className="text-gray-400 mb-4">様々なリテラルから型が推論される様子を確認しましょう。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val count = 42          // Int
    val price = 9.99        // Double
    val name = "Alice"      // String
    val isReady = true      // Boolean
    val letter = 'A'        // Char

    println(count::class.simpleName)
    println(price::class.simpleName)
    println(name::class.simpleName)
    println(isReady::class.simpleName)
    println(letter::class.simpleName)
}`}
          expectedOutput={`Int
Double
String
Boolean
Char`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">型推論と明示的な型指定</h2>
        <p className="text-gray-400 mb-4">型推論を使う場合と明示的に型を指定する場合の比較です。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    // 型推論を使う（簡潔）
    val x = 10
    val y = 20.5
    val z = x + y

    // 型を明示する（明確）
    val a: Int = 10
    val b: Double = 20.5
    val c: Double = a + b

    println("型推論: \${z}")
    println("明示型: \${c}")

    // Longにしたい場合は明示が必要
    val bigNum: Long = 10
    println("Long: \${bigNum}")
}`}
          expectedOutput={`型推論: 30.5
明示型: 30.5
Long: 10`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="type-inference" />
      </div>
      <LessonNav lessons={lessons} currentId="type-inference" basePath="/learn/basics" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function ConstantsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">Kotlin基礎 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">定数</h1>
        <p className="text-gray-400">constとvalを使った定数の定義とその用途の違いを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">valとconstの違い</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlinにはvalとconst valの2種類の不変変数があります。valは実行時に値が決まる読み取り専用変数、
          const valはコンパイル時に値が決まる本当の定数です。
          const valはトップレベルまたはobject/companion object内でのみ使用できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>val: 実行時定数、関数内でも使用可能</li>
          <li>const val: コンパイル時定数、プリミティブ型とStringのみ</li>
          <li>const valはトップレベルかobject内で宣言</li>
          <li>定数名は大文字のSNAKE_CASEが慣例</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">const valの使い方</h2>
        <p className="text-gray-400 mb-4">コンパイル時定数はトップレベルまたはobjectの中で定義します。</p>
        <KotlinEditor
          defaultCode={`const val MAX_SIZE = 100
const val APP_NAME = "KotlinApp"
const val PI = 3.14159

fun main() {
    println("アプリ名: \${APP_NAME}")
    println("最大サイズ: \${MAX_SIZE}")
    println("円周率: \${PI}")

    val radius = 5.0
    val area = PI * radius * radius
    println("面積: \${area}")
}`}
          expectedOutput={`アプリ名: KotlinApp
最大サイズ: 100
円周率: 3.14159
面積: 78.53975`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">valによる実行時定数</h2>
        <p className="text-gray-400 mb-4">valは関数内でも使え、実行時に計算した値を定数として保持できます。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val greeting = "Hello"
    val target = "Kotlin"
    val message = "\${greeting}, \${target}!"

    println(message)
    println("メッセージ長: \${message.length}")

    val numbers = listOf(1, 2, 3, 4, 5)
    val sum = numbers.sum()
    println("合計: \${sum}")
}`}
          expectedOutput={`Hello, Kotlin!
メッセージ長: 14
合計: 15`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="constants" />
      </div>
      <LessonNav lessons={lessons} currentId="constants" basePath="/learn/basics" />
    </div>
  );
}

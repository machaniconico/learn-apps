import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function OperatorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">Kotlin基礎 レッスン9</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">演算子</h1>
        <p className="text-gray-400">算術・比較・代入演算子など、Kotlinで使える各種演算子を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Kotlinの演算子</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlinには算術演算子、比較演算子、代入演算子、論理演算子などがあります。
          Javaと似ていますが、===（参照等価）や..（範囲演算子）などKotlin独自のものもあります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>算術: +, -, *, /, %</li>
          <li>比較: ==, !=, &lt;, &gt;, &lt;=, &gt;=</li>
          <li>代入: =, +=, -=, *=, /=, %=</li>
          <li>インクリメント/デクリメント: ++, --</li>
          <li>範囲: .. (1..10で1から10)</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">算術演算子</h2>
        <p className="text-gray-400 mb-4">基本的な四則演算と剰余演算を確認しましょう。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val a = 10
    val b = 3

    println("加算: \${a + b}")
    println("減算: \${a - b}")
    println("乗算: \${a * b}")
    println("除算: \${a / b}")
    println("剰余: \${a % b}")

    var x = 5
    x += 3
    println("+=後: \${x}")
    x *= 2
    println("*=後: \${x}")
}`}
          expectedOutput={`加算: 13
減算: 7
乗算: 30
除算: 3
剰余: 1
+=後: 8
*=後: 16`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">比較演算子</h2>
        <p className="text-gray-400 mb-4">値の比較にはeq(==)とcompareTo(&lt;, &gt;など)を使います。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val x = 10
    val y = 20

    println("x == y: \${x == y}")
    println("x != y: \${x != y}")
    println("x < y: \${x < y}")
    println("x > y: \${x > y}")
    println("x <= 10: \${x <= 10}")
    println("x >= 10: \${x >= 10}")

    val name1 = "Kotlin"
    val name2 = "Kotlin"
    println("文字列比較: \${name1 == name2}")
}`}
          expectedOutput={`x == y: false
x != y: true
x < y: true
x > y: false
x <= 10: true
x >= 10: true
文字列比較: true`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="operators" />
      </div>
      <LessonNav lessons={lessons} currentId="operators" basePath="/learn/basics" />
    </div>
  );
}

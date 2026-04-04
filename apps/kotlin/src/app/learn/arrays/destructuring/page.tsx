import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">配列・リスト レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">分割代入</h1>
        <p className="text-gray-400">コレクションや配列の値を複数の変数に一度に代入する分割代入を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概念説明</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          分割代入（Destructuring Declaration）は、オブジェクトや配列の値を
          複数の変数に一度に代入する構文です。
          <code className="text-green-300">val (a, b, c) = コレクション</code>のように書きます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          リストの最初のN要素が取り出せます（最大5つ）。
          不要な要素は<code className="text-green-300">_</code>（アンダースコア）でスキップできます。
          データクラスや<code className="text-green-300">Pair</code>/<code className="text-green-300">Triple</code>でも使えます。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 1: リストと配列の分割代入</h2>
        <KotlinEditor
          defaultCode={`fun main() {
    val list = listOf(10, 20, 30, 40, 50)
    val (a, b, c) = list
    println("a=$\{a}, b=$\{b}, c=$\{c}")

    val arr = arrayOf("田中", "太郎", "25")
    val (lastName, firstName, age) = arr
    println("$\{lastName} $\{firstName} ($\{age}歳)")

    // _ でスキップ
    val (first, _, third) = list
    println("first=$\{first}, third=$\{third}")
}`}
          expectedOutput={`a=10, b=20, c=30
田中 太郎 (25歳)
first=10, third=30`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 2: PairとTripleの分割代入</h2>
        <KotlinEditor
          defaultCode={`fun minMax(list: List<Int>): Pair<Int, Int> =
    Pair(list.min(), list.max())

fun stats(list: List<Int>): Triple<Int, Int, Double> =
    Triple(list.min(), list.max(), list.average())

fun main() {
    val numbers = listOf(5, 2, 8, 1, 9, 3)

    val (min, max) = minMax(numbers)
    println("最小: $\{min}, 最大: $\{max}")

    val (lo, hi, avg) = stats(numbers)
    println("最小: $\{lo}, 最大: $\{hi}, 平均: $\{avg}")
}`}
          expectedOutput={`最小: 1, 最大: 9
最小: 1, 最大: 9, 平均: 4.666666666666667`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 3: forループでの分割代入</h2>
        <KotlinEditor
          defaultCode={`fun main() {
    val students = listOf(
        Pair("田中", 85),
        Pair("鈴木", 92),
        Pair("佐藤", 78)
    )

    for ((name, score) in students) {
        val grade = when {
            score >= 90 -> "A"
            score >= 80 -> "B"
            else -> "C"
        }
        println("$\{name}: $\{score}点 ($\{grade})")
    }

    val map = mapOf("x" to 10, "y" to 20, "z" to 30)
    for ((key, value) in map) {
        println("$\{key} = $\{value}")
    }
}`}
          expectedOutput={`田中: 85点 (B)
鈴木: 92点 (A)
佐藤: 78点 (C)
x = 10
y = 20
z = 30`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="destructuring" />
      </div>
      <LessonNav lessons={lessons} currentId="destructuring" basePath="/learn/arrays" />
    </div>
  );
}

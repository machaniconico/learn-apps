import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("generics");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">ジェネリクス レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">型制約</h1>
        <p className="text-gray-400">whereキーワードやコロン記法を使った型パラメータへの制約の設定を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概念説明</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          型制約を使うと、型パラメータが特定のクラスやインターフェースを継承・実装していることを保証できます。
          コロン記法<code className="text-violet-300">T : 上限型</code>で単一の制約を指定します。
          複数の制約を課すには<code className="text-violet-300">where</code>句を使います。
        </p>
        <p className="text-gray-300 leading-relaxed">
          制約を付けることで、型パラメータTに対してその上限型のメソッドやプロパティを
          コンパイル時の安全性を保ちながら呼び出せます。
          制約がない場合はTは<code className="text-violet-300">Any?</code>として扱われます。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 1: コロン記法による制約</h2>
        <KotlinEditor
          defaultCode={`fun <T : Comparable<T>> maxOf(a: T, b: T): T = if (a > b) a else b
fun <T : Comparable<T>> minOf(a: T, b: T): T = if (a < b) a else b
fun <T : Comparable<T>> clamp(value: T, min: T, max: T): T =
    when {
        value < min -> min
        value > max -> max
        else -> value
    }

fun main() {
    println(maxOf(10, 25))
    println(maxOf("apple", "banana"))
    println(minOf(3.14, 2.71))
    println(clamp(15, 1, 10))
    println(clamp(5, 1, 10))
}`}
          expectedOutput={`25
banana
2.71
10
5`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 2: whereによる複数制約</h2>
        <KotlinEditor
          defaultCode={`interface Printable {
    fun print()
}

interface Saveable {
    fun save(): String
}

class Document(val title: String) : Printable, Saveable {
    override fun print() = println("印刷: $\{title}")
    override fun save() = "saved:$\{title}"
}

fun <T> processItem(item: T) where T : Printable, T : Saveable {
    item.print()
    println("保存結果: $\{item.save()}")
}

fun main() {
    val doc = Document("レポート2024")
    processItem(doc)
}`}
          expectedOutput={`印刷: レポート2024
保存結果: saved:レポート2024`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 3: Number制約</h2>
        <KotlinEditor
          defaultCode={`fun <T : Number> sum(list: List<T>): Double =
    list.sumOf { it.toDouble() }

fun <T : Number> average(list: List<T>): Double =
    if (list.isEmpty()) 0.0 else sum(list) / list.size

fun main() {
    val ints = listOf(1, 2, 3, 4, 5)
    val doubles = listOf(1.5, 2.5, 3.5)
    println("合計(Int): $\{sum(ints)}")
    println("合計(Double): $\{sum(doubles)}")
    println("平均(Int): $\{average(ints)}")
    println("平均(Double): $\{average(doubles)}")
}`}
          expectedOutput={`合計(Int): 15.0
合計(Double): 7.5
平均(Int): 3.0
平均(Double): 2.5`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="generics" lessonId="constraints" />
      </div>
      <LessonNav lessons={lessons} currentId="constraints" basePath="/learn/generics" />
    </div>
  );
}

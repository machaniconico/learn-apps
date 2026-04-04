import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("generics");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">ジェネリクス レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ジェネリック関数</h1>
        <p className="text-gray-400">型パラメータを持つ汎用関数の定義と呼び出し方を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概念説明</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ジェネリック関数は<code className="text-violet-300">fun &lt;T&gt; 関数名()</code>のように
          関数名の前に型パラメータを置きます。
          引数の型から型推論が働くため、多くの場合は型引数を明示する必要はありません。
        </p>
        <p className="text-gray-300 leading-relaxed">
          型推論ができない場合や明示が必要な場合は
          <code className="text-violet-300">関数名&lt;型&gt;(引数)</code>のように型を指定します。
          拡張関数もジェネリクスと組み合わせられます。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 1: ジェネリック関数の基本</h2>
        <KotlinEditor
          defaultCode={`fun <T> identity(value: T): T = value

fun <T> printType(value: T) {
    println("値: $\{value}, 型: $\{value!!::class.simpleName}")
}

fun <T> repeat(value: T, times: Int): List<T> = List(times) { value }

fun main() {
    println(identity(42))
    println(identity("Kotlin"))
    printType(3.14)
    printType(true)
    println(repeat("hello", 3))
    println(repeat(0, 4))
}`}
          expectedOutput={`42
Kotlin
値: 3.14, 型: Double
値: true, 型: Boolean
[hello, hello, hello]
[0, 0, 0, 0]`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 2: ジェネリック拡張関数</h2>
        <KotlinEditor
          defaultCode={`fun <T> List<T>.second(): T? = if (size >= 2) this[1] else null
fun <T> List<T>.lastOrDefault(default: T): T = lastOrNull() ?: default
fun <T, R> List<T>.mapIndexedPair(transform: (Int, T) -> R): List<R> =
    mapIndexed { i, v -> transform(i, v) }

fun main() {
    val nums = listOf(10, 20, 30, 40)
    println("2番目: $\{nums.second()}")
    println("最後: $\{nums.lastOrDefault(0)}")
    println(emptyList<Int>().lastOrDefault(99))
    println(nums.mapIndexedPair { i, v -> "$\{i}:$\{v}" })
}`}
          expectedOutput={`2番目: 20
最後: 40
99
[0:10, 1:20, 2:30, 3:40]`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 3: 型引数の明示</h2>
        <KotlinEditor
          defaultCode={`fun <T> emptyMutableList(): MutableList<T> = mutableListOf()

fun <T : Any> safeCast(value: Any): T? =
    try { @Suppress("UNCHECKED_CAST") value as T } catch (e: ClassCastException) { null }

fun main() {
    val list = emptyMutableList<String>()
    list.add("Kotlin")
    list.add("Java")
    println(list)

    val num: Int? = safeCast<Int>(42)
    val str: String? = safeCast<String>(42)
    println("num: $\{num}")
    println("str: $\{str}")
}`}
          expectedOutput={`[Kotlin, Java]
num: 42
str: null`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="generics" lessonId="generic-functions" />
      </div>
      <LessonNav lessons={lessons} currentId="generic-functions" basePath="/learn/generics" />
    </div>
  );
}

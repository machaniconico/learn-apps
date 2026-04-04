import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("generics");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">ジェネリクス レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ジェネリクスの基本</h1>
        <p className="text-gray-400">型パラメータを使った汎用的なクラスや関数の作り方を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概念説明</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ジェネリクスを使うと、型を抽象化した汎用的なクラスや関数を作れます。
          型パラメータ<code className="text-violet-300">&lt;T&gt;</code>はプレースホルダーで、
          使う側が具体的な型を指定します。
          コードの再利用性が高まり、型安全性も保たれます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          慣習的な型パラメータ名: <code className="text-violet-300">T</code>（Type）、
          <code className="text-violet-300">E</code>（Element）、
          <code className="text-violet-300">K</code>（Key）、
          <code className="text-violet-300">V</code>（Value）。
          複数の型パラメータは<code className="text-violet-300">&lt;K, V&gt;</code>のようにカンマで区切ります。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 1: ジェネリッククラス</h2>
        <KotlinEditor
          defaultCode={`class Box<T>(val content: T) {
    fun get(): T = content
    fun describe() = "Box<$\{content!!::class.simpleName}>: $\{content}"
}

fun main() {
    val intBox = Box(42)
    val strBox = Box("Kotlin")
    val listBox = Box(listOf(1, 2, 3))
    println(intBox.describe())
    println(strBox.describe())
    println(listBox.describe())
    println("取り出し: $\{intBox.get()}")
}`}
          expectedOutput={`Box<Int>: 42
Box<String>: Kotlin
Box<ArrayList>: [1, 2, 3]
取り出し: 42`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 2: 複数の型パラメータ</h2>
        <KotlinEditor
          defaultCode={`class Pair<A, B>(val first: A, val second: B) {
    fun swap(): Pair<B, A> = Pair(second, first)
    override fun toString() = "($\{first}, $\{second})"
}

fun main() {
    val p1 = Pair("名前", "田中")
    val p2 = Pair(1, true)
    println(p1)
    println(p1.swap())
    println(p2)
    println(p2.swap())
}`}
          expectedOutput={`(名前, 田中)
(田中, 名前)
(1, true)
(true, 1)`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 3: ジェネリックスタック</h2>
        <KotlinEditor
          defaultCode={`class Stack<T> {
    private val items = mutableListOf<T>()
    fun push(item: T) { items.add(item) }
    fun pop(): T? = if (items.isEmpty()) null else items.removeAt(items.lastIndex)
    fun peek(): T? = items.lastOrNull()
    fun size() = items.size
    fun isEmpty() = items.isEmpty()
}

fun main() {
    val stack = Stack<Int>()
    stack.push(1); stack.push(2); stack.push(3)
    println("サイズ: $\{stack.size()}")
    println("先頭: $\{stack.peek()}")
    println("取り出し: $\{stack.pop()}")
    println("取り出し: $\{stack.pop()}")
    println("残りサイズ: $\{stack.size()}")
}`}
          expectedOutput={`サイズ: 3
先頭: 3
取り出し: 3
取り出し: 2
残りサイズ: 1`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="generics" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/generics" />
    </div>
  );
}

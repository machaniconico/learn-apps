import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("generics");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">ジェネリクス レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">reified型パラメータ</h1>
        <p className="text-gray-400">inlineとreifiedを組み合わせて実行時に型情報を保持する方法を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概念説明</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          通常のジェネリクスでは実行時に型情報が消去されます（型消去）。
          <code className="text-violet-300">inline fun &lt;reified T&gt;</code>を使うと、
          コンパイラが関数をインライン展開するため、実行時にも型情報<code className="text-violet-300">T</code>にアクセスできます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          reifiedを使うと、<code className="text-violet-300">T::class</code>で型クラスを取得したり、
          <code className="text-violet-300">value is T</code>で型チェックができます。
          これにより、Javaで必要だったClassパラメータを渡す冗長なコードが不要になります。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 1: reifiedによる型チェック</h2>
        <KotlinEditor
          defaultCode={`inline fun <reified T> isType(value: Any): Boolean = value is T

inline fun <reified T> filterByType(list: List<Any>): List<T> =
    list.filterIsInstance<T>()

fun main() {
    println(isType<String>("hello"))
    println(isType<Int>("hello"))
    println(isType<Int>(42))

    val mixed: List<Any> = listOf(1, "two", 3, "four", 5.0)
    println("Int: $\{filterByType<Int>(mixed)}")
    println("String: $\{filterByType<String>(mixed)}")
}`}
          expectedOutput={`true
false
true
Int: [1, 3]
String: [two, four]`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 2: 型名の取得</h2>
        <KotlinEditor
          defaultCode={`inline fun <reified T> typeName(): String = T::class.simpleName ?: "Unknown"

inline fun <reified T> createDefault(): T? = when (T::class) {
    Int::class -> 0 as T
    String::class -> "" as T
    Boolean::class -> false as T
    else -> null
}

fun main() {
    println(typeName<Int>())
    println(typeName<String>())
    println(typeName<List<*>>())

    val i: Int? = createDefault<Int>()
    val s: String? = createDefault<String>()
    val b: Boolean? = createDefault<Boolean>()
    println("Int default: $\{i}")
    println("String default: '$\{s}'")
    println("Boolean default: $\{b}")
}`}
          expectedOutput={`Int
String
List
Int default: 0
String default: ''
Boolean default: false`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="generics" lessonId="reified" />
      </div>
      <LessonNav lessons={lessons} currentId="reified" basePath="/learn/generics" />
    </div>
  );
}

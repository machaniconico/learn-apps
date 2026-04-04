import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("extensions");

export default function GenericExtensionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">拡張関数 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ジェネリック拡張関数</h1>
        <p className="text-gray-400">型パラメータを持つ汎用的な拡張関数の作り方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ジェネリック拡張関数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          型パラメータを持つ拡張関数を定義することで、
          様々な型に対して動作する汎用的な操作を実装できます。
          Kotlinの標準ライブラリにも多くのジェネリック拡張関数があります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>fun {"<T>"} T.関数名() の形式で定義</li>
          <li>型パラメータに制約を付けることもできる</li>
          <li>標準ライブラリのlet・run・apply・alsoも拡張関数</li>
          <li>コレクション操作の拡張関数も同様に定義可能</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">汎用的な拡張関数</h2>
        <p className="text-gray-400 mb-4">
          型パラメータを使って任意の型に対して動作する拡張関数を定義します。
        </p>
        <KotlinEditor
          defaultCode={`fun <T> T.printAndReturn(): T {
    println(this)
    return this
}

fun <T> List<T>.second(): T? = if (size >= 2) this[1] else null

fun <T : Comparable<T>> List<T>.minMax(): Pair<T, T>? {
    if (isEmpty()) return null
    return Pair(min(), max())
}

fun main() {
    val x = 42.printAndReturn()
    "Hello".printAndReturn()

    println(listOf(1, 2, 3).second())
    println(listOf(3, 1, 4, 1, 5, 9).minMax())
}`}
          expectedOutput={`42
Hello
2
(1, 9)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">型制約付き拡張関数</h2>
        <p className="text-gray-400 mb-4">
          型パラメータに制約を付けることで、特定の条件を満たす型にのみ
          適用できる拡張関数を定義できます。
        </p>
        <KotlinEditor
          defaultCode={`fun <T : Number> List<T>.sumAsDouble(): Double {
    return this.fold(0.0) { acc, n -> acc + n.toDouble() }
}

fun <T> T?.orElse(default: T): T = this ?: default

fun main() {
    println(listOf(1, 2, 3, 4, 5).sumAsDouble())
    println(listOf(1.5, 2.5, 3.0).sumAsDouble())

    val nullStr: String? = null
    println(nullStr.orElse("default"))
    println("actual".orElse("default"))
}`}
          expectedOutput={`15.0
7.0
default
actual`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="extensions" lessonId="generic-extensions" />
      </div>
      <LessonNav lessons={lessons} currentId="generic-extensions" basePath="/learn/extensions" />
    </div>
  );
}

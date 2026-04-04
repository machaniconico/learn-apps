import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lambdas");

export default function InlineFunctionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">ラムダ レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">インライン関数</h1>
        <p className="text-gray-400">inlineキーワードでラムダのオーバーヘッドを削減する方法を学びます。</p>
      </div>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">inlineの仕組み</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-300">inline</code>を付けると呼び出し元にコードが展開され、ラムダオブジェクト生成のオーバーヘッドがなくなります。
        </p>
        <KotlinEditor
          defaultCode={`inline fun measureTime(label: String, action: () -> Unit) {
    val start = System.currentTimeMillis()
    action()
    println("${"$"}label: ${"$"}{System.currentTimeMillis() - start}ms")
}

fun main() {
    measureTime("合計計算") {
        var sum = 0L
        for (i in 1..100_000L) sum += i
        println("合計: ${"$"}sum")
    }
}`}
          expectedOutput={`合計: 5000050000
合計計算: ...ms`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">reified型パラメータ</h2>
        <p className="text-gray-400 mb-4">
          inline関数では<code className="text-violet-300">reified</code>型パラメータを使えます。実行時に型情報を保持し、isやasを型パラメータで使えます。
        </p>
        <KotlinEditor
          defaultCode={`inline fun <reified T> List<*>.filterIsInstanceOf(): List<T> = filterIsInstance<T>()
inline fun <reified T> Any.isOfType(): Boolean = this is T

fun main() {
    val mixed: List<Any> = listOf(1, "hello", 2, "world", 3.14, true)
    println("文字列: ${"$"}{mixed.filterIsInstanceOf<String>()}")
    println("整数: ${"$"}{mixed.filterIsInstanceOf<Int>()}")
    println("hello is String: ${"$"}{"hello".isOfType<String>()}")
    println("42 is String: ${"$"}{42.isOfType<String>()}")
}`}
          expectedOutput={`文字列: [hello, world]
整数: [1, 2]
hello is String: true
42 is String: false`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">noinlineとcrossinline</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-300">noinline</code>は特定のラムダ引数をインライン化しません。<code className="text-violet-300">crossinline</code>はnon-local returnを禁止します。
        </p>
        <KotlinEditor
          defaultCode={`inline fun runBoth(
    first: () -> Unit,
    noinline second: () -> Unit
) {
    first()
    listOf(second).forEach { it() }
}

fun main() {
    runBoth(
        { println("最初の処理") },
        { println("2番目の処理") }
    )
}`}
          expectedOutput={`最初の処理
2番目の処理`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="lambdas" lessonId="inline-functions" />
      </div>
      <LessonNav lessons={lessons} currentId="inline-functions" basePath="/learn/lambdas" />
    </div>
  );
}

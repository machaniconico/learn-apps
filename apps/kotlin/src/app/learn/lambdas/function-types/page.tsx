import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lambdas");

export default function FunctionTypesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">ラムダ レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">関数型</h1>
        <p className="text-gray-400">(A) -&gt; B形式の関数型の宣言と使い方を学びます。</p>
      </div>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数型の表記</h2>
        <p className="text-gray-400 mb-4">
          Kotlinの関数型は<code className="text-violet-300">(パラメータ型) -&gt; 戻り値型</code>の形式です。
        </p>
        <KotlinEditor
          defaultCode={`val noArgs: () -> Unit = { println("引数なし") }
val oneArg: (Int) -> String = { n -> "数値: ${"$"}n" }
val twoArgs: (String, Int) -> Boolean = { s, n -> s.length == n }

fun main() {
    noArgs()
    println(oneArg(42))
    println(twoArgs("hello", 5))
    val transformers: List<(Int) -> Int> = listOf({ it + 1 }, { it * 2 }, { it * it })
    transformers.forEach { f -> print("${"$"}{f(3)} ") }
    println()
}`}
          expectedOutput={`引数なし
数値: 42
true
4 6 9`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数参照（::）</h2>
        <p className="text-gray-400 mb-4">::関数名で既存の関数を関数型の値として参照できます。</p>
        <KotlinEditor
          defaultCode={`fun isEven(n: Int) = n % 2 == 0
fun double(n: Int) = n * 2
fun String.hasDigit() = any { it.isDigit() }

fun main() {
    val numbers = listOf(1, 2, 3, 4, 5, 6)
    println(numbers.filter(::isEven))
    println(numbers.map(::double))
    val words = listOf("hello", "kotlin123", "world")
    println(words.filter(String::hasDigit))
}`}
          expectedOutput={`[2, 4, 6]
[2, 4, 6, 8, 10, 12]
[kotlin123]`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Null許容関数型</h2>
        <p className="text-gray-400 mb-4">関数型もNull許容にできます。?.invoke()でNull安全に呼び出せます。</p>
        <KotlinEditor
          defaultCode={`fun executeIfNotNull(action: (() -> Unit)?) {
    action?.invoke()
}

fun transform(value: Int, f: ((Int) -> Int)?): Int {
    return f?.invoke(value) ?: value
}

fun main() {
    executeIfNotNull { println("実行されました") }
    executeIfNotNull(null)
    println(transform(5, { it * 3 }))
    println(transform(5, null))
}`}
          expectedOutput={`実行されました
15
5`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="lambdas" lessonId="function-types" />
      </div>
      <LessonNav lessons={lessons} currentId="function-types" basePath="/learn/lambdas" />
    </div>
  );
}

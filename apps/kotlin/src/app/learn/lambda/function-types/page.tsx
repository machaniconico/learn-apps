import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lambda");

export default function FunctionTypesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">ラムダ式 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">関数型</h1>
        <p className="text-gray-400">{"(Int) -> Stringのような関数型の宣言と使い方"}</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">関数型とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlinでは関数も型を持ちます。
          <code className="text-pink-300">(Int) -&gt; String</code>のように
          引数の型と戻り値の型で表現します。
          変数に代入したり、高階関数の引数として渡したりできます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>{"() -> Unit - 引数なし、戻り値なし"}</li>
          <li>{"(Int) -> String - Int引数、String戻り値"}</li>
          <li>{"(Int, String) -> Boolean - 複数引数"}</li>
          <li>{"((Int) -> String)? - null許容関数型"}</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数型の変数</h2>
        <p className="text-gray-400 mb-4">
          関数型の変数にラムダや通常の関数を代入して使えます。
        </p>
        <KotlinEditor
          defaultCode={`fun double(x: Int): Int = x * 2

fun main() {
    val f: (Int) -> Int = ::double
    println(f(5))

    val g: (String) -> Int = String::length
    println(g("Kotlin"))

    val operations: List<(Int) -> Int> = listOf(
        { it + 1 },
        { it * 2 },
        { it * it }
    )

    val value = 3
    operations.forEach { op ->
        println(op(value))
    }
}`}
          expectedOutput={`10
6
4
6
9`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">null許容関数型</h2>
        <p className="text-gray-400 mb-4">
          関数型にも<code className="text-pink-300">?</code>をつけることで
          nullを許容できます。呼び出し時は?.invokeを使います。
        </p>
        <KotlinEditor
          defaultCode={`fun executeIfNotNull(action: (() -> String)?) {
    val result = action?.invoke() ?: "actionがnull"
    println(result)
}

fun main() {
    executeIfNotNull { "実行されました" }
    executeIfNotNull(null)

    var callback: ((String) -> Unit)? = null
    callback?.invoke("test")
    println("コールバックなし")

    callback = { msg -> println("受信: ${"$"}{msg}") }
    callback?.invoke("hello")
}`}
          expectedOutput={`実行されました
actionがnull
コールバックなし
受信: hello`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="lambda" lessonId="function-types" />
      </div>
      <LessonNav lessons={lessons} currentId="function-types" basePath="/learn/lambda" />
    </div>
  );
}

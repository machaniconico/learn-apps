import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lambdas");

export default function HigherOrderPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">ラムダ レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">高階関数</h1>
        <p className="text-gray-400">関数を引数として受け取るか、戻り値として返す高階関数を学びます。</p>
      </div>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数を引数に取る</h2>
        <p className="text-gray-400 mb-4">高階関数は関数を引数として受け取れます。処理の一部を呼び出し元が決定できます。</p>
        <KotlinEditor
          defaultCode={`fun applyTwice(x: Int, f: (Int) -> Int): Int = f(f(x))

fun main() {
    val triple = { n: Int -> n * 3 }
    println(applyTwice(2, triple))
    println(applyTwice(1) { it + 10 })
}`}
          expectedOutput={`18
21`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数を戻り値として返す</h2>
        <p className="text-gray-400 mb-4">関数を戻り値として返す関数も高階関数です。関数ファクトリパターンに使います。</p>
        <KotlinEditor
          defaultCode={`fun makeMultiplier(factor: Int): (Int) -> Int = { x -> x * factor }
fun makeGreeter(greeting: String): (String) -> String = { name -> "${"$"}greeting、${"$"}{name}さん！" }

fun main() {
    val double = makeMultiplier(2)
    val triple = makeMultiplier(3)
    println(double(5))
    println(triple(5))
    println(makeGreeter("こんにちは")("田中"))
    println(makeGreeter("Hello")("Tanaka"))
}`}
          expectedOutput={`10
15
こんにちは、田中さん！
Hello、Tanakaさん！`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数合成</h2>
        <p className="text-gray-400 mb-4">高階関数を使って関数を合成して複雑な処理を構築できます。</p>
        <KotlinEditor
          defaultCode={`fun <A, B, C> compose(f: (B) -> C, g: (A) -> B): (A) -> C = { x -> f(g(x)) }

fun main() {
    val addOne = { x: Int -> x + 1 }
    val double = { x: Int -> x * 2 }
    val doubleAfterAdd = compose(double, addOne)
    println(doubleAfterAdd(3))

    val pipeline = listOf(addOne, double, { x: Int -> x * x })
    val result = pipeline.fold(3) { acc, f -> f(acc) }
    println("3 -> +1 -> *2 -> ^2 = ${"$"}result")
}`}
          expectedOutput={`8
3 -> +1 -> *2 -> ^2 = 64`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="lambdas" lessonId="higher-order" />
      </div>
      <LessonNav lessons={lessons} currentId="higher-order" basePath="/learn/lambdas" />
    </div>
  );
}

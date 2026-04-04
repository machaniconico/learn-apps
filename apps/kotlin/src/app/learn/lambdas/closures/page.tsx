import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lambdas");

export default function ClosuresPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">ラムダ レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">クロージャ</h1>
        <p className="text-gray-400">ラムダが外部スコープの変数をキャプチャするクロージャの仕組みを学びます。</p>
      </div>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">変数のキャプチャ</h2>
        <p className="text-gray-400 mb-4">Kotlinのラムダは外部スコープの変数をキャプチャできます。Javaと違いvarも変更できます。</p>
        <KotlinEditor
          defaultCode={`fun makeCounter(): () -> Int {
    var count = 0
    return { count++; count }
}

fun main() {
    val counter1 = makeCounter()
    val counter2 = makeCounter()
    println(counter1())
    println(counter1())
    println(counter1())
    println(counter2())

    var sum = 0
    listOf(1, 2, 3, 4, 5).forEach { sum += it }
    println("合計: ${"$"}sum")
}`}
          expectedOutput={`1
2
3
1
合計: 15`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">クロージャとスコープ</h2>
        <p className="text-gray-400 mb-4">クロージャはそのスコープ内の変数への参照を保持します。スコープが終わってもラムダが生きている限り変数は保持されます。</p>
        <KotlinEditor
          defaultCode={`fun makeAdder(base: Int): (Int) -> Int = { x -> base + x }

fun main() {
    val addFive = makeAdder(5)
    val addTen = makeAdder(10)
    println(addFive(3))
    println(addTen(3))
    println(addFive(7))
}`}
          expectedOutput={`8
13
12`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実践的なクロージャの活用</h2>
        <p className="text-gray-400 mb-4">クロージャはコールバックやイベントハンドラーのコンテキストを保持するのに便利です。</p>
        <KotlinEditor
          defaultCode={`class Button(val label: String) {
    private val handlers = mutableListOf<() -> Unit>()
    fun onClick(handler: () -> Unit) { handlers.add(handler) }
    fun click() { println("[${"$"}label] クリック!"); handlers.forEach { it() } }
}

fun main() {
    var clickCount = 0
    val btn = Button("送信")
    btn.onClick { clickCount++; println("  カウント: ${"$"}clickCount") }
    btn.click()
    btn.click()
}`}
          expectedOutput={`[送信] クリック!
  カウント: 1
[送信] クリック!
  カウント: 2`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="lambdas" lessonId="closures" />
      </div>
      <LessonNav lessons={lessons} currentId="closures" basePath="/learn/lambdas" />
    </div>
  );
}

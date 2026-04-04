import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lambda");

export default function ClosuresPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">ラムダ式 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">クロージャ</h1>
        <p className="text-gray-400">ラムダが外部スコープの変数をキャプチャする仕組み</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">クロージャとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          クロージャとは、ラムダが定義時の外部スコープの変数を
          キャプチャして保持する機能です。
          Kotlinのラムダはvarの変数も変更できる点でJavaと異なります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>外部スコープのval変数を読み取れる</li>
          <li>外部スコープのvar変数を読み書きできる</li>
          <li>ラムダが変数の参照を保持する</li>
          <li>副作用のあるコードを書けるが注意が必要</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">変数のキャプチャ</h2>
        <p className="text-gray-400 mb-4">
          ラムダは外部スコープのvar変数を参照・変更できます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    var count = 0
    val increment = { count++ }
    val getCount = { count }

    increment()
    increment()
    increment()
    println("count: ${"$"}{getCount()}")

    var sum = 0
    val numbers = listOf(1, 2, 3, 4, 5)
    numbers.forEach { sum += it }
    println("sum: ${"$"}{sum}")
}`}
          expectedOutput={`count: 3
sum: 15`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">クロージャによる状態管理</h2>
        <p className="text-gray-400 mb-4">
          クロージャを使って状態を持つ関数（ファクトリ）を作れます。
        </p>
        <KotlinEditor
          defaultCode={`fun makeCounter(start: Int = 0): () -> Int {
    var count = start
    return { count++ }
}

fun makeAccumulator(): (Int) -> Int {
    var total = 0
    return { n ->
        total += n
        total
    }
}

fun main() {
    val counter = makeCounter()
    println(counter())
    println(counter())
    println(counter())

    val acc = makeAccumulator()
    println(acc(10))
    println(acc(5))
    println(acc(3))
}`}
          expectedOutput={`0
1
2
10
15
18`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="lambda" lessonId="closures" />
      </div>
      <LessonNav lessons={lessons} currentId="closures" basePath="/learn/lambda" />
    </div>
  );
}

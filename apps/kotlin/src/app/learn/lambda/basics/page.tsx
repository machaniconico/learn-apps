import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lambda");

export default function LambdaBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">ラムダ式 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ラムダ式の基本</h1>
        <p className="text-gray-400">{"{ }で書くラムダ式の基本構文と使い方"}</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ラムダ式とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ラムダ式は名前のない無名関数です。
          <code className="text-pink-300">{"{ パラメータ -> 本体 }"}</code>の形式で書き、
          変数に代入したり、関数の引数として渡したりできます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>{"{ x: Int -> x * 2 } の形式"}</li>
          <li>型推論が効く場合は型を省略できる</li>
          <li>最後の式が自動的に戻り値になる</li>
          <li>変数に代入して再利用できる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なラムダ式</h2>
        <p className="text-gray-400 mb-4">
          ラムダ式を変数に代入して呼び出す基本的な使い方を学びます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val square = { x: Int -> x * x }
    println(square(5))
    println(square(10))

    val greet = { name: String -> "こんにちは、${"$"}{name}！" }
    println(greet("Kotlin"))

    val add = { a: Int, b: Int -> a + b }
    println(add(3, 4))
}`}
          expectedOutput={`25
100
こんにちは、Kotlin！
7`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コレクションとラムダ</h2>
        <p className="text-gray-400 mb-4">
          ラムダ式はコレクション操作関数と組み合わせて使うことが多いです。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val numbers = listOf(1, 2, 3, 4, 5)

    val doubled = numbers.map({ n -> n * 2 })
    println(doubled)

    val evens = numbers.filter({ n -> n % 2 == 0 })
    println(evens)

    // 末尾ラムダは括弧の外に出せる
    val sum = numbers.fold(0) { acc, n -> acc + n }
    println(sum)
}`}
          expectedOutput={`[2, 4, 6, 8, 10]
[2, 4]
15`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="lambda" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/lambda" />
    </div>
  );
}

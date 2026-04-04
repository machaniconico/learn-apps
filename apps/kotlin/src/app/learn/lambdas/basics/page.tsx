import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lambdas");

export default function LambdaBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">ラムダ レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ラムダの基本</h1>
        <p className="text-gray-400">ラムダ式の構文と、コレクションでの基本的な使い方を学びます。</p>
      </div>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ラムダ式の構文</h2>
        <p className="text-gray-400 mb-4">
          Kotlinのラムダ式は<code className="text-violet-300">{"{ 引数 -> 処理 }"}</code>の形式です。最後の引数がラムダなら括弧の外に出せます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val double = { x: Int -> x * 2 }
    println(double(5))

    val process = { x: Int, y: Int ->
        val sum = x + y
        "${"$"}x + ${"$"}y = ${"$"}sum"
    }
    println(process(3, 4))

    val numbers = listOf(1, 2, 3, 4, 5)
    println(numbers.map { n -> n * 2 })
}`}
          expectedOutput={`10
3 + 4 = 7
[2, 4, 6, 8, 10]`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">末尾ラムダ構文</h2>
        <p className="text-gray-400 mb-4">関数の最後のパラメータがラムダ型の場合、括弧の外にラムダを書けます。</p>
        <KotlinEditor
          defaultCode={`fun repeat(times: Int, action: (Int) -> Unit) {
    for (i in 1..times) action(i)
}

fun main() {
    repeat(3) { i -> println("回数 ${"$"}i") }
}`}
          expectedOutput={`回数 1
回数 2
回数 3`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ラムダとコレクション操作</h2>
        <p className="text-gray-400 mb-4">map・filter・sortedByDescendingなどのコレクション関数はラムダと組み合わせて強力な処理を実現します。</p>
        <KotlinEditor
          defaultCode={`data class Student(val name: String, val score: Int)

fun main() {
    val students = listOf(
        Student("田中", 85), Student("山田", 92),
        Student("鈴木", 78), Student("佐藤", 95)
    )
    val topStudents = students
        .filter { it.score >= 80 }
        .sortedByDescending { it.score }
        .map { "${"$"}{it.name}(${"$"}{it.score}点)" }
    println("優秀な学生: ${"$"}topStudents")
    println("平均点: ${"$"}{"%.1f".format(students.map { it.score }.average())}")
}`}
          expectedOutput={`優秀な学生: [佐藤(95点), 山田(92点), 田中(85点)]
平均点: 87.5`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="lambdas" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/lambdas" />
    </div>
  );
}

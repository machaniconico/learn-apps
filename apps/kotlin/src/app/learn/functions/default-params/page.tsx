import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function DefaultParamsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">関数 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">デフォルト引数</h1>
        <p className="text-gray-400">引数にデフォルト値を設定して省略可能にする方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">デフォルト引数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          パラメータにデフォルト値を設定すると、呼び出し時にその引数を省略できます。
          省略した場合はデフォルト値が使われます。
          これによりオーバーロード（同名の別関数）が不要になります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>パラメータ名: 型 = デフォルト値 の形式</li>
          <li>デフォルト引数は省略可能</li>
          <li>複数のパラメータにデフォルト値を設定可能</li>
          <li>Javaのオーバーロードを削減できる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">デフォルト引数の基本</h2>
        <p className="text-gray-400 mb-4">デフォルト値を設定することで関数呼び出しを柔軟にできます。</p>
        <KotlinEditor
          defaultCode={`fun greet(name: String, greeting: String = "こんにちは") {
    println("\${greeting}、\${name}！")
}

fun createUser(
    name: String,
    age: Int = 0,
    role: String = "user"
) {
    println("ユーザー: \${name}, 年齢: \${age}, 役割: \${role}")
}

fun main() {
    greet("Alice")
    greet("Bob", "おはよう")
    createUser("Carol")
    createUser("Dave", 30)
    createUser("Eve", 25, "admin")
}`}
          expectedOutput={`こんにちは、Alice！
おはよう、Bob！
ユーザー: Carol, 年齢: 0, 役割: user
ユーザー: Dave, 年齢: 30, 役割: user
ユーザー: Eve, 年齢: 25, 役割: admin`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">デフォルト引数と式</h2>
        <p className="text-gray-400 mb-4">デフォルト値には式も使えます。</p>
        <KotlinEditor
          defaultCode={`fun repeat(text: String, times: Int = 3, separator: String = ", ") {
    val result = List(times) { text }.joinToString(separator)
    println(result)
}

fun power(base: Int, exponent: Int = 2): Int {
    var result = 1
    repeat(exponent) { result *= base }
    return result
}

fun main() {
    repeat("Hello")
    repeat("Kotlin", 2)
    repeat("Hi", 4, " | ")
    println("2^3 = \${power(2, 3)}")
    println("5^2 = \${power(5)}")
}`}
          expectedOutput={`Hello, Hello, Hello
Kotlin, Kotlin
Hi | Hi | Hi | Hi
2^3 = 8
5^2 = 25`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="default-params" />
      </div>
      <LessonNav lessons={lessons} currentId="default-params" basePath="/learn/functions" />
    </div>
  );
}

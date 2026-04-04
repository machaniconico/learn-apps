import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("data-sealed");

export default function CopyDestructuringPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">データクラス・Sealed レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">copy・分割代入</h1>
        <p className="text-gray-400">copyメソッドと分割代入（component関数）の使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">copy()と分割代入</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">copy()</code>は指定したプロパティだけ変えた
          新インスタンスを作成します。
          分割代入（destructuring）はdata classのプロパティを
          個別の変数に展開できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>copy(prop = value) で一部変更した複製を作成</li>
          <li>val (a, b) = obj でプロパティを分割代入</li>
          <li>component1()、component2()...が自動生成される</li>
          <li>for ループやラムダでも使える</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">copy()メソッド</h2>
        <p className="text-gray-400 mb-4">
          イミュータブルなdata classの一部を変えた新インスタンスを作成します。
        </p>
        <KotlinEditor
          defaultCode={`data class Config(
    val host: String = "localhost",
    val port: Int = 8080,
    val debug: Boolean = false
)

fun main() {
    val defaultConfig = Config()
    println(defaultConfig)

    val prodConfig = defaultConfig.copy(host = "example.com", port = 443)
    println(prodConfig)

    val debugConfig = prodConfig.copy(debug = true)
    println(debugConfig)
}`}
          expectedOutput={`Config(host=localhost, port=8080, debug=false)
Config(host=example.com, port=443, debug=false)
Config(host=example.com, port=443, debug=true)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">分割代入</h2>
        <p className="text-gray-400 mb-4">
          data classのインスタンスを複数の変数に一度に展開できます。
        </p>
        <KotlinEditor
          defaultCode={`data class Person(val name: String, val age: Int, val city: String)

fun main() {
    val person = Person("Alice", 25, "Tokyo")
    val (name, age, city) = person
    println("${"$"}{name}, ${"$"}{age}歳, ${"$"}{city}")

    val people = listOf(
        Person("Bob", 30, "Osaka"),
        Person("Carol", 28, "Kyoto")
    )
    for ((n, a, c) in people) {
        println("${"$"}{n}(${"$"}{a}) - ${"$"}{c}")
    }
}`}
          expectedOutput={`Alice, 25歳, Tokyo
Bob(30) - Osaka
Carol(28) - Kyoto`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="data-sealed" lessonId="copy-destructuring" />
      </div>
      <LessonNav lessons={lessons} currentId="copy-destructuring" basePath="/learn/data-sealed" />
    </div>
  );
}

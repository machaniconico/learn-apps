import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lambdas");

export default function WithApplyLetPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">ラムダ レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">with・apply・let</h1>
        <p className="text-gray-400">スコープ関数with・apply・let・run・alsoの使い分けを学びます。</p>
      </div>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">applyでオブジェクト初期化</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-300">apply</code>はオブジェクトにブロックを適用し、オブジェクト自身を返します。thisでアクセスします。
        </p>
        <KotlinEditor
          defaultCode={`data class Person(var name: String = "", var age: Int = 0, var email: String = "")

fun main() {
    val person = Person().apply {
        name = "山田"
        age = 25
        email = "yamada@example.com"
    }
    println(person)
}`}
          expectedOutput={`Person(name=山田, age=25, email=yamada@example.com)`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">letでNull安全処理と変換</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-300">let</code>はオブジェクトをブロックの引数（it）として渡し、ブロックの結果を返します。
        </p>
        <KotlinEditor
          defaultCode={`fun findUser(id: Int): String? = if (id > 0) "ユーザー_${"$"}id" else null

fun main() {
    findUser(1)?.let { user -> println("見つかりました: ${"$"}user") }
    findUser(-1)?.let { println("これは表示されません") } ?: println("ユーザーが見つかりません")

    val result = "  hello kotlin  "
        .let { it.trim() }
        .let { it.split(" ") }
        .let { it.joinToString(" ") { word -> word.replaceFirstChar { c -> c.uppercase() } } }
    println(result)
}`}
          expectedOutput={`見つかりました: ユーザー_1
ユーザーが見つかりません
Hello Kotlin`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">withとrunの使い方</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-300">with</code>はレシーバを引数として渡し結果を返します。<code className="text-violet-300">run</code>はthisでアクセスして結果を返します。
        </p>
        <KotlinEditor
          defaultCode={`data class Config(val host: String, val port: Int, val database: String)

fun main() {
    val config = Config("localhost", 5432, "mydb")
    val connectionString = with(config) {
        "jdbc:postgresql://${"$"}host:${"$"}port/${"$"}database"
    }
    println(connectionString)

    val numbers = listOf(3, 1, 4, 1, 5)
        .also { println("元: ${"$"}it") }
        .sorted()
    println("ソート後: ${"$"}numbers")
}`}
          expectedOutput={`jdbc:postgresql://localhost:5432/mydb
元: [3, 1, 4, 1, 5]
ソート後: [1, 1, 3, 4, 5]`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="lambdas" lessonId="with-apply-let" />
      </div>
      <LessonNav lessons={lessons} currentId="with-apply-let" basePath="/learn/lambdas" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("null-safety");

export default function NullableTypesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">Null安全 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Null許容型</h1>
        <p className="text-gray-400">?を使ってNull許容型を宣言し、Non-null型との違いを理解します。</p>
      </div>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Non-null型とNull許容型</h2>
        <p className="text-gray-400 mb-4">
          Kotlinではすべての型がデフォルトでNull不可です。型名の後に<code className="text-pink-300">?</code>を付けるとNull許容型になります。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val name: String = "Kotlin"
    var nullable: String? = "Hello"
    println(nullable)
    nullable = null
    println(nullable)
    val a: Int = 42
    val b: Int? = null
    println("a = ${"$"}a, b = ${"$"}b")
}`}
          expectedOutput={`Hello
null
a = 42, b = null`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スマートキャスト</h2>
        <p className="text-gray-400 mb-4">
          if文でnullチェックした後はスマートキャストにより自動的にNon-null型として扱えます。
        </p>
        <KotlinEditor
          defaultCode={`fun greet(name: String?) {
    if (name != null) {
        println("こんにちは、${"$"}{name.uppercase()}さん！")
    } else {
        println("名前が指定されていません")
    }
}

fun main() {
    greet("田中")
    greet(null)
}`}
          expectedOutput={`こんにちは、田中さん！
名前が指定されていません`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数のNull許容パラメータ</h2>
        <p className="text-gray-400 mb-4">
          関数のパラメータや戻り値もNull許容型として定義できます。
        </p>
        <KotlinEditor
          defaultCode={`fun findUser(id: Int): String? {
    val users = mapOf(1 to "田中", 2 to "山田")
    return users[id]
}

fun main() {
    println(findUser(1))
    println(findUser(99))
}`}
          expectedOutput={`田中
null`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="null-safety" lessonId="nullable-types" />
      </div>
      <LessonNav lessons={lessons} currentId="nullable-types" basePath="/learn/null-safety" />
    </div>
  );
}

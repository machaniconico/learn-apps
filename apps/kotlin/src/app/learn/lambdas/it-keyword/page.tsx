import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lambdas");

export default function ItKeywordPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">ラムダ レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">itキーワード</h1>
        <p className="text-gray-400">単一引数のラムダで使える暗黙のパラメータ名itを学びます。</p>
      </div>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">itの基本</h2>
        <p className="text-gray-400 mb-4">
          ラムダのパラメータが1つの場合、宣言と{'->'} を省略して<code className="text-violet-300">it</code>で参照できます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val numbers = listOf(1, 2, 3, 4, 5)
    println(numbers.map { it * 2 })
    println(numbers.filter { it % 2 == 0 })

    val words = listOf("kotlin", "java", "python", "go")
    println(words.map { it.uppercase() })
    println(words.filter { it.length > 4 })
}`}
          expectedOutput={`[2, 4, 6, 8, 10]
[2, 4]
[KOTLIN, JAVA, PYTHON, GO]
[kotlin, python]`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">itを使う場面と避ける場面</h2>
        <p className="text-gray-400 mb-4">itはシンプルな変換に適していますが、ネストするとどのitか分かりにくくなります。</p>
        <KotlinEditor
          defaultCode={`data class Department(val name: String, val employees: List<String>)

fun main() {
    val departments = listOf(
        Department("開発", listOf("田中", "山田")),
        Department("営業", listOf("佐藤"))
    )
    // 明示的な名前（ネスト時に推奨）
    departments.forEach { dept ->
        dept.employees.forEach { employee ->
            println("${"$"}{dept.name}: ${"$"}employee")
        }
    }
    // 単純な変換はitでOK
    println(departments.map { it.name })
}`}
          expectedOutput={`開発: 田中
開発: 山田
営業: 佐藤
[開発, 営業]`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スコープ関数のit</h2>
        <p className="text-gray-400 mb-4">let・alsoなどitを使うスコープ関数ではブロック内でitがレシーバになります。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val text: String? = "  Kotlin Programming  "
    val result = text?.let { it.trim().uppercase() }
    println(result)

    val numbers = mutableListOf(3, 1, 4, 1, 5, 9)
        .also { println("元: ${"$"}it") }
        .sorted()
        .also { println("ソート後: ${"$"}it") }
    println("最終: ${"$"}numbers")
}`}
          expectedOutput={`KOTLIN PROGRAMMING
元: [3, 1, 4, 1, 5, 9]
ソート後: [1, 1, 3, 4, 5, 9]
最終: [1, 1, 3, 4, 5, 9]`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="lambdas" lessonId="it-keyword" />
      </div>
      <LessonNav lessons={lessons} currentId="it-keyword" basePath="/learn/lambdas" />
    </div>
  );
}

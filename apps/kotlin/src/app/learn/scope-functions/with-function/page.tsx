import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("scope-functions");

export default function WithFunctionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">スコープ関数 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">with関数</h1>
        <p className="text-gray-400">レシーバを明示的に渡して複数操作をまとめるwith</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">with関数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-300">with</code>はレシーバを最初の引数として受け取る
          通常の関数（拡張関数ではない）です。
          ラムダ内でthisとしてオブジェクトにアクセスし、
          1つのオブジェクトに対して複数の操作をまとめて書けます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>with(obj) {'{ ... }'} の形式で使う</li>
          <li>ラムダ内でthisがobjを指す</li>
          <li>ラムダの最後の式が戻り値</li>
          <li>nullableオブジェクトには?.runを使う方が安全</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">withの基本</h2>
        <p className="text-gray-400 mb-4">
          1つのオブジェクトに複数の操作をまとめるときに
          <code className="text-pink-300">with</code>が役立ちます。
        </p>
        <KotlinEditor
          defaultCode={`data class Person(val name: String, val age: Int, val city: String)

fun main() {
    val person = Person("Alice", 25, "Tokyo")

    val description = with(person) {
        """
        名前: ${"$"}{name}
        年齢: ${"$"}{age}歳
        都市: ${"$"}{city}
        """.trimIndent()
    }
    println(description)
}`}
          expectedOutput={`名前: Alice
年齢: 25歳
都市: Tokyo`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">withでビルダーパターン</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-300">with</code>でStringBuilderなどのビルダーを
          使う際に冗長な記述を避けられます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val sb = StringBuilder()
    val result = with(sb) {
        append("Kotlin")
        append(" is ")
        append("awesome")
        append("!")
        toString()
    }
    println(result)

    val numbers = listOf(1, 2, 3, 4, 5)
    val report = with(numbers) {
        "合計=\${sum()}, 平均=\${average()}, 最大=\${max()}, 最小=\${min()}"
    }
    println(report)
}`}
          expectedOutput={`Kotlin is awesome!
合計=15, 平均=3.0, 最大=5, 最小=1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="scope-functions" lessonId="with-function" />
      </div>
      <LessonNav lessons={lessons} currentId="with-function" basePath="/learn/scope-functions" />
    </div>
  );
}

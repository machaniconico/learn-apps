import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("null-safety");

export default function NotNullAssertionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">Null安全 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">非Nullアサーション</h1>
        <p className="text-gray-400">!!演算子の使い方と注意点を学びます。</p>
      </div>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">!!演算子の動作</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-300">!!</code>はNull許容型をNon-null型に強制変換します。nullの場合はNPEをスローします。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val str: String? = "Hello"
    val length = str!!.length
    println("長さ: ${"$"}length")
    println("!!は確信がある場合のみ使用してください")
}`}
          expectedOutput={`長さ: 5
!!は確信がある場合のみ使用してください`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">安全な代替手段</h2>
        <p className="text-gray-400 mb-4">!!の代わりにrequireNotNullやcheckNotNullを使う方が安全です。</p>
        <KotlinEditor
          defaultCode={`fun processInput(value: String?) {
    val notNullValue = requireNotNull(value) { "valueはnullにできません" }
    println("値: ${"$"}notNullValue, 長さ: ${"$"}{notNullValue.length}")
}

fun main() {
    processInput("Kotlin")
}`}
          expectedOutput={`値: Kotlin, 長さ: 6`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">エルビス演算子との比較</h2>
        <p className="text-gray-400 mb-4">多くの場合、!!よりエルビス演算子の方が明確です。</p>
        <KotlinEditor
          defaultCode={`fun findById(id: Int): String? = if (id > 0) "User_${"$"}id" else null

fun main() {
    val user = findById(42) ?: error("ユーザーが見つかりません")
    println("ユーザー: ${"$"}user")
    val user2 = findById(1) ?: "デフォルトユーザー"
    println("ユーザー2: ${"$"}user2")
}`}
          expectedOutput={`ユーザー: User_42
ユーザー2: User_1`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="null-safety" lessonId="not-null-assertion" />
      </div>
      <LessonNav lessons={lessons} currentId="not-null-assertion" basePath="/learn/null-safety" />
    </div>
  );
}

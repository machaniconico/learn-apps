import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function RegexPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">文字列操作 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">正規表現</h1>
        <p className="text-gray-400">Regexクラスを使ったパターンマッチングと置換</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">正規表現の基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          KotlinではJavaの正規表現エンジンを使います。
          <code className="text-green-300">Regex()</code>クラスまたは
          文字列の<code className="text-green-300">toRegex()</code>メソッドでRegexオブジェクトを作成します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>matches() - 文字列全体がパターンに一致するか</li>
          <li>containsMatchIn() - パターンを含むか</li>
          <li>find() / findAll() - マッチした箇所を取得</li>
          <li>replace() - パターンに一致した部分を置換</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">パターンマッチング</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">matches()</code>と
          <code className="text-green-300">containsMatchIn()</code>でパターンのチェックができます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val emailRegex = Regex("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}")
    println(emailRegex.containsMatchIn("user@example.com"))
    println(emailRegex.containsMatchIn("not-an-email"))

    val digits = "\\d+".toRegex()
    println(digits.matches("12345"))
    println(digits.matches("123abc"))

    val text = "The year 2024 and 2025 are important"
    val years = "\\d{4}".toRegex().findAll(text)
    years.forEach { println(it.value) }
}`}
          expectedOutput={`true
false
true
false
2024
2025`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">正規表現による置換</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">replace()</code>でパターンに一致した部分を
          置換できます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val text = "Hello   World   Kotlin"
    val cleaned = text.replace("\\s+".toRegex(), " ")
    println(cleaned)

    val phone = "090-1234-5678"
    val masked = phone.replace("\\d".toRegex(), "*")
    println(masked)

    val html = "<b>Bold</b> and <i>Italic</i>"
    val plain = html.replace("<[^>]*>".toRegex(), "")
    println(plain)
}`}
          expectedOutput={`Hello World Kotlin
***-****-****
Bold and Italic`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="regex" />
      </div>
      <LessonNav lessons={lessons} currentId="regex" basePath="/learn/strings" />
    </div>
  );
}

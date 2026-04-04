import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function StringComparisonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">文字列操作 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字列の比較</h1>
        <p className="text-gray-400">==演算子とequalsを使った文字列の比較</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">文字列比較のルール</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlinでは<code className="text-green-300">==</code>演算子が構造的等価（内容の比較）を行います。
          Javaのequals()相当の動作です。参照比較には<code className="text-green-300">===</code>を使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>== は内容が等しいか比較（equals()と同じ）</li>
          <li>=== は同じオブジェクトを参照しているか比較</li>
          <li>compareTo() / compareToIgnoreCase() で辞書順比較</li>
          <li>equalsIgnoreCase() は大文字・小文字を無視して比較</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">==と===の違い</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">==</code>は値の比較、
          <code className="text-green-300">===</code>は参照の比較です。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val a = "Hello"
    val b = "Hello"
    val c = "HELLO"

    println(a == b)
    println(a == c)
    println(a.equals(c, ignoreCase = true))

    println(a.compareTo(b))
    println("apple".compareTo("banana"))
}`}
          expectedOutput={`true
false
true
0
-1`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列の順序比較</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">compareTo()</code>を使って辞書順での比較ができます。
          0は等しい、負の数は小さい、正の数は大きいことを表します。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val words = listOf("banana", "apple", "cherry", "date")
    val sorted = words.sorted()
    println(sorted)

    val sortedDesc = words.sortedDescending()
    println(sortedDesc)

    println("kotlin" < "python")
    println("kotlin" > "java")
}`}
          expectedOutput={`[apple, banana, cherry, date]
[date, cherry, banana, apple]
true
true`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="string-comparison" />
      </div>
      <LessonNav lessons={lessons} currentId="string-comparison" basePath="/learn/strings" />
    </div>
  );
}

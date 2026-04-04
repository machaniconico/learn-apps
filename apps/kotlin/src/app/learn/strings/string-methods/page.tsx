import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function StringMethodsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">文字列操作 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字列メソッド</h1>
        <p className="text-gray-400">Kotlinの豊富な文字列操作メソッド</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">主要な文字列メソッド</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlinの文字列には多くの便利なメソッドがあります。
          大文字・小文字変換、検索、置換、トリム、分割など
          日常的な文字列処理がシンプルに書けます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>uppercase() / lowercase() - 大文字・小文字変換</li>
          <li>trim() / trimStart() / trimEnd() - 空白除去</li>
          <li>split() - 区切り文字で分割</li>
          <li>replace() - 文字列置換</li>
          <li>indexOf() / contains() / startsWith() / endsWith()</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">変換・トリムメソッド</h2>
        <p className="text-gray-400 mb-4">
          大文字・小文字変換や空白除去の基本メソッドを学びます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val str = "  Hello, Kotlin!  "
    println(str.trim())
    println(str.trimStart())
    println(str.trimEnd())

    val text = "Hello World"
    println(text.uppercase())
    println(text.lowercase())
    println(text.reversed())
}`}
          expectedOutput={`Hello, Kotlin!
Hello, Kotlin!
  Hello, Kotlin!
HELLO WORLD
hello world
dlroW olleH`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">検索・分割・置換</h2>
        <p className="text-gray-400 mb-4">
          文字列の検索、分割、置換を行うメソッドを学びます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val csv = "apple,banana,cherry,date"
    val fruits = csv.split(",")
    println(fruits)
    println(fruits.size)

    val text = "Kotlin is great. Kotlin is fun."
    println(text.replace("Kotlin", "Java"))
    println(text.indexOf("great"))
    println(text.contains("fun"))
    println(text.startsWith("Kotlin"))
    println(text.endsWith("fun."))
}`}
          expectedOutput={`[apple, banana, cherry, date]
4
Java is great. Java is fun.
10
true
true
true`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="string-methods" />
      </div>
      <LessonNav lessons={lessons} currentId="string-methods" basePath="/learn/strings" />
    </div>
  );
}

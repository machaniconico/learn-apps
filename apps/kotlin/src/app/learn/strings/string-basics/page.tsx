import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function StringBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">文字列操作 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字列の基本</h1>
        <p className="text-gray-400">Kotlinの文字列の宣言、操作、基本プロパティ</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Kotlinの文字列</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlinの文字列はダブルクォートで囲います。Javaと同様にイミュータブル（変更不可）です。
          文字列はCharの配列として扱うことができ、インデックスでアクセスできます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>length - 文字列の長さ</li>
          <li>indices - インデックス範囲</li>
          <li>isEmpty() / isNotEmpty() - 空文字チェック</li>
          <li>isBlank() / isNotBlank() - 空白のみチェック</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列の基本プロパティ</h2>
        <p className="text-gray-400 mb-4">
          文字列の長さ、インデックスアクセス、空チェックなどの基本操作を学びます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val str = "Hello, Kotlin!"
    println(str.length)
    println(str[0])
    println(str.first())
    println(str.last())
    println(str.isEmpty())
    println("".isEmpty())
    println("   ".isBlank())
}`}
          expectedOutput={`14
H
H
!
false
true
true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列の連結とsubstring</h2>
        <p className="text-gray-400 mb-4">
          文字列の連結と部分文字列の取得方法を学びます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val a = "Hello"
    val b = "World"
    println(a + ", " + b + "!")

    val str = "Kotlin Programming"
    println(str.substring(0, 6))
    println(str.substring(7))
    println(str.take(6))
    println(str.drop(7))
}`}
          expectedOutput={`Hello, World!
Kotlin
Programming
Kotlin
Programming`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="string-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="string-basics" basePath="/learn/strings" />
    </div>
  );
}

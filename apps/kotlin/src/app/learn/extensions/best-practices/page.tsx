import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("extensions");

export default function BestPracticesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">拡張関数 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">拡張関数のベストプラクティス</h1>
        <p className="text-gray-400">拡張関数を適切に使うためのガイドラインとアンチパターン</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">いつ拡張関数を使うか</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          拡張関数は強力ですが、適切な場面で使うことが重要です。
          変更できないクラス（標準ライブラリ、サードパーティ）への機能追加、
          ドメイン固有のユーティリティ操作などに向いています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>変更不可なクラスへの機能追加に使う</li>
          <li>状態を持たない純粋な操作に限定する</li>
          <li>クラスのコアロジックはメンバー関数に入れる</li>
          <li>ユーティリティ関数の代替として使える</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">良い使い方の例</h2>
        <p className="text-gray-400 mb-4">
          ドメイン固有の操作を拡張関数で表現すると、読みやすいコードになります。
        </p>
        <KotlinEditor
          defaultCode={`fun String.toSlug(): String =
    this.lowercase()
        .replace(" ", "-")
        .replace("[^a-z0-9-]".toRegex(), "")

fun Int.toOrdinal(): String = when {
    this % 100 in 11..13 -> "${"$"}{this}th"
    this % 10 == 1 -> "${"$"}{this}st"
    this % 10 == 2 -> "${"$"}{this}nd"
    this % 10 == 3 -> "${"$"}{this}rd"
    else -> "${"$"}{this}th"
}

fun main() {
    println("Hello World Kotlin".toSlug())
    println(1.toOrdinal())
    println(2.toOrdinal())
    println(11.toOrdinal())
    println(21.toOrdinal())
}`}
          expectedOutput={`hello-world-kotlin
1st
2nd
11th
21st`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">チェーンによる可読性向上</h2>
        <p className="text-gray-400 mb-4">
          拡張関数をチェーンすることで処理を直感的に表現できます。
        </p>
        <KotlinEditor
          defaultCode={`fun String.removeSpaces() = this.replace(" ", "")
fun String.capitalize() = this.replaceFirstChar { it.uppercase() }
fun String.addExclamation() = "${"$"}{this}!"

fun main() {
    val result = "hello world"
        .removeSpaces()
        .capitalize()
        .addExclamation()
    println(result)

    val numbers = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    val result2 = numbers
        .filter { it % 2 == 0 }
        .map { it * it }
        .take(3)
    println(result2)
}`}
          expectedOutput={`Helloworld!
[4, 16, 36]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="extensions" lessonId="best-practices" />
      </div>
      <LessonNav lessons={lessons} currentId="best-practices" basePath="/learn/extensions" />
    </div>
  );
}

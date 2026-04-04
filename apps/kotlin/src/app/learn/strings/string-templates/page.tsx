import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function StringTemplatesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">文字列操作 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字列テンプレート</h1>
        <p className="text-gray-400">$記号を使った文字列への変数・式の埋め込み</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">文字列テンプレートとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlinの文字列テンプレートを使うと、文字列の中に変数や式を直接埋め込めます。
          <code className="text-green-300">$変数名</code>または
          <code className="text-green-300">{"${式}"}</code>の構文を使います。
          Javaの文字列フォーマットより簡潔に書けます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>$変数名 - 変数の値を埋め込む</li>
          <li>${"{式}"} - 任意の式を評価して埋め込む</li>
          <li>$を文字として使う場合は{"\\$"}と書く</li>
          <li>複雑な式は必ず{"${}"}で囲む</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">変数の埋め込み</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">$変数名</code>で変数の値を文字列に埋め込めます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val name = "太郎"
    val age = 25
    println("名前: ${"$"}{name}, 年齢: ${"$"}{age}歳")

    val language = "Kotlin"
    println("${"$"}{language}はJVM言語です")
    println("${"$"}{language}のバージョン: 2.0")
}`}
          expectedOutput={`名前: 太郎, 年齢: 25歳
KotlinはJVM言語です
Kotlinのバージョン: 2.0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">式の埋め込み</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">{"${式}"}</code>では計算や関数呼び出しなど
          任意の式を評価して埋め込めます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val a = 10
    val b = 3
    println("${"$"}{a} + ${"$"}{b} = ${"$"}{a + b}")
    println("${"$"}{a} * ${"$"}{b} = ${"$"}{a * b}")

    val str = "kotlin"
    println("大文字: ${"$"}{str.uppercase()}")
    println("長さ: ${"$"}{str.length}文字")

    val score = 85
    println("判定: ${"$"}{if (score >= 90) "優" else if (score >= 70) "良" else "可"}")
}`}
          expectedOutput={`10 + 3 = 13
10 * 3 = 30
大文字: KOTLIN
長さ: 6文字
判定: 良`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="string-templates" />
      </div>
      <LessonNav lessons={lessons} currentId="string-templates" basePath="/learn/strings" />
    </div>
  );
}

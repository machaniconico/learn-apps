import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function CommentsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">Kotlin基礎 レッスン11</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コメント</h1>
        <p className="text-gray-400">一行コメントとブロックコメントの書き方とKDocの基本を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コメントの種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          コメントはコードの説明や注釈をするためのもので、実行時には無視されます。
          Kotlinには一行コメント（//）、ブロックコメント（/* */）、
          そしてドキュメント生成に使うKDoc（/** */）があります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>// : 一行コメント（行末まで）</li>
          <li>/* ... */ : ブロックコメント（複数行）</li>
          <li>/** ... */ : KDocコメント（ドキュメント生成用）</li>
          <li>Kotlinのブロックコメントはネスト可能</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">一行コメントとブロックコメント</h2>
        <p className="text-gray-400 mb-4">コメントはコードの説明に使います。実行結果に影響しません。</p>
        <KotlinEditor
          defaultCode={`// これは一行コメントです
fun main() {
    // 変数の宣言
    val name = "Kotlin"  // 名前を格納

    /*
     * ブロックコメントは
     * 複数行にわたって
     * 書けます
     */
    val version = 2

    println("言語: \${name}")
    println("バージョン: \${version}")
}`}
          expectedOutput={`言語: Kotlin
バージョン: 2`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">KDocコメント</h2>
        <p className="text-gray-400 mb-4">KDocは関数やクラスのドキュメントを生成するためのコメント形式です。</p>
        <KotlinEditor
          defaultCode={`/**
 * 2つの数値を加算する関数
 * @param a 最初の数値
 * @param b 2番目の数値
 * @return 2つの数値の合計
 */
fun add(a: Int, b: Int): Int {
    return a + b
}

fun main() {
    val result = add(3, 5)
    println("3 + 5 = \${result}")
    println("10 + 20 = \${add(10, 20)}")
}`}
          expectedOutput={`3 + 5 = 8
10 + 20 = 30`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="comments" />
      </div>
      <LessonNav lessons={lessons} currentId="comments" basePath="/learn/basics" />
    </div>
  );
}

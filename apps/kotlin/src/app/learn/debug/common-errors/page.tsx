import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

export default function CommonErrorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">デバッグ レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">よくあるエラーと対処法</h1>
        <p className="text-gray-400">NullPointerException、ClassCastExceptionなどKotlinでよく遭遇するエラーの解決策を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Kotlinでよくある実行時エラー</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlinは型安全な言語ですが、実行時エラーは起こり得ます。
          よくあるエラーのパターンを知ることで素早く解決できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>NullPointerException: !!演算子の誤用やJava APIのnull</li>
          <li>ClassCastException: as演算子による不正なキャスト</li>
          <li>ArrayIndexOutOfBoundsException: 配列の範囲外アクセス</li>
          <li>StackOverflowError: 無限再帰</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">NullPointerExceptionの回避</h2>
        <p className="text-gray-400 mb-4">!!の代わりに?.やエルビス演算子を使ってNPEを防ぎます。</p>
        <KotlinEditor
          defaultCode={`fun findUser(id: Int): String? = if (id == 1) "Alice" else null

fun main() {
    // 悪い例: !!を使うとnullの場合にNPEが発生
    // val name = findUser(99)!!  // KotlinNPE!

    // 良い例1: ?. で安全にアクセス
    val length = findUser(99)?.length
    println("長さ: \${length}")  // null

    // 良い例2: ?: でデフォルト値
    val name = findUser(99) ?: "ゲスト"
    println("名前: \${name}")

    // 良い例3: let でnull時はスキップ
    findUser(1)?.let { println("見つかった: \${it}") }
    findUser(99)?.let { println("見つかった: \${it}") } ?: println("見つからない")
}`}
          expectedOutput={`長さ: null
名前: ゲスト
見つかった: Alice
見つからない`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ClassCastExceptionの回避</h2>
        <p className="text-gray-400 mb-4">as?を使うと型キャスト失敗時にnullを返し例外を防げます。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val items: List<Any> = listOf("hello", 42, 3.14, "world")

    // 安全なキャスト: as? を使う
    items.forEach { item ->
        val str = item as? String
        val num = item as? Int
        when {
            str != null -> println("文字列: \${str.uppercase()}")
            num != null -> println("整数: \${num * 2}")
            else -> println("その他: \${item}")
        }
    }
}`}
          expectedOutput={`文字列: HELLO
整数: 84
その他: 3.14
文字列: WORLD`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ArrayIndexOutOfBoundsの回避</h2>
        <p className="text-gray-400 mb-4">getOrNullやgetOrElseを使って安全にリスト要素にアクセスします。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val items = listOf("A", "B", "C")

    // 安全なアクセス
    println(items.getOrNull(1))   // B
    println(items.getOrNull(10))  // null
    println(items.getOrElse(10) { "デフォルト" })

    // インデックスの範囲チェック
    val index = 5
    if (index in items.indices) {
        println(items[index])
    } else {
        println("インデックス\${index}は範囲外 (0..\${items.lastIndex})")
    }
}`}
          expectedOutput={`B
null
デフォルト
インデックス5は範囲外 (0..2)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="debug" lessonId="common-errors" />
      </div>
      <LessonNav lessons={lessons} currentId="common-errors" basePath="/learn/debug" />
    </div>
  );
}

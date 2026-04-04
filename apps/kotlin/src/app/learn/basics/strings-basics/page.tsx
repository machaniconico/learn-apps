import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function StringsBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">Kotlin基礎 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字列基礎</h1>
        <p className="text-gray-400">文字列の宣言、連結、長さ取得など文字列操作の基本を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Kotlinの文字列</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          KotlinのStringはJavaのStringと同様に不変（イミュータブル）です。
          ダブルクォートで文字列リテラルを作成し、文字列テンプレートで変数を埋め込めます。
          トリプルクォートで複数行文字列も使えます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>文字列はダブルクォートで囲む</li>
          <li>$変数名 または ${"{式}"} で文字列テンプレート</li>
          <li>+演算子または文字列テンプレートで連結</li>
          <li>length プロパティで文字数を取得</li>
          <li>トリプルクォート(""")で複数行文字列</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列の基本操作</h2>
        <p className="text-gray-400 mb-4">文字列の長さ取得、大文字小文字変換、部分文字列などの基本操作です。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val greeting = "Hello, Kotlin!"
    println("文字列: \${greeting}")
    println("長さ: \${greeting.length}")
    println("大文字: \${greeting.uppercase()}")
    println("小文字: \${greeting.lowercase()}")
    println("最初の文字: \${greeting[0]}")
    println("部分文字列: \${greeting.substring(7)}")
}`}
          expectedOutput={`文字列: Hello, Kotlin!
長さ: 14
大文字: HELLO, KOTLIN!
小文字: hello, kotlin!
最初の文字: H
部分文字列: Kotlin!`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列テンプレートと複数行文字列</h2>
        <p className="text-gray-400 mb-4">文字列テンプレートと三重引用符による複数行文字列を活用しましょう。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val name = "Kotlin"
    val version = 2
    // 文字列テンプレート
    println("言語: \${name}, バージョン: \${version}")
    println("文字数: \${name.length}")

    // 複数行文字列
    val text = """
        Hello,
        World!
    """.trimIndent()
    println(text)
}`}
          expectedOutput={`言語: Kotlin, バージョン: 2
文字数: 6
Hello,
World!`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="strings-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="strings-basics" basePath="/learn/basics" />
    </div>
  );
}

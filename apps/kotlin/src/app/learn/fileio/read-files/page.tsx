import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function ReadFilesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">ファイルI/O レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ファイルの読み込み</h1>
        <p className="text-gray-400">File.readText()やreadLines()を使ったテキストファイルの読み込み方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ファイル読み込みの方法</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlinのjava.io.FileクラスにはKotlin拡張関数が追加されており、
          readText()やreadLines()で簡単にファイルを読み込めます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>readText(): ファイル全体をStringとして読み込む</li>
          <li>readLines(): ファイルをList&lt;String&gt;として読み込む</li>
          <li>forEachLine&#123;&#125;: 行ごとに処理する（メモリ効率が良い）</li>
          <li>useLines&#123;&#125;: Sequenceで遅延処理する</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テキスト処理のシミュレーション</h2>
        <p className="text-gray-400 mb-4">readText()の代わりにStringを使って同様の処理を学びます。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    // ファイル内容をシミュレート（実際はFile("path.txt").readText()）
    val fileContent = """
        Kotlin is a modern language
        It runs on the JVM
        And is fully interoperable with Java
    """.trimIndent()

    println("全内容:")
    println(fileContent)
    println()
    println("文字数: \${fileContent.length}")
    println("行数: \${fileContent.lines().size}")
}`}
          expectedOutput={`全内容:
Kotlin is a modern language
It runs on the JVM
And is fully interoperable with Java

文字数: 75
行数: 3`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">行ごとの処理</h2>
        <p className="text-gray-400 mb-4">readLines()相当の処理で各行を個別に扱います。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val lines = listOf(
        "Alice,25,Engineer",
        "Bob,30,Designer",
        "Charlie,28,Developer"
    )

    println("CSV解析結果:")
    lines.forEachIndexed { index, line ->
        val parts = line.split(",")
        println("行\${index + 1}: 名前=\${parts[0]}, 年齢=\${parts[1]}, 役職=\${parts[2]}")
    }
}`}
          expectedOutput={`CSV解析結果:
行1: 名前=Alice, 年齢=25, 役職=Engineer
行2: 名前=Bob, 年齢=30, 役職=Designer
行3: 名前=Charlie, 年齢=28, 役職=Developer`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実際のファイル読み込みAPI</h2>
        <p className="text-gray-400 mb-4">java.io.Fileを使った実際のファイル読み込みパターンです。</p>
        <KotlinEditor
          defaultCode={`import java.io.File

fun main() {
    // 実際のファイル読み込み（コメントのみ、実行環境にファイルが必要）
    // val text = File("sample.txt").readText()
    // val lines = File("sample.txt").readLines()
    // File("sample.txt").forEachLine { line -> println(line) }

    // StringReaderでシミュレート
    val simulatedContent = "line1\nline2\nline3"
    val lines = simulatedContent.lines()
    lines.forEach { println(it) }
    println("合計 \${lines.size} 行")
}`}
          expectedOutput={`line1
line2
line3
合計 3 行`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="fileio" lessonId="read-files" />
      </div>
      <LessonNav lessons={lessons} currentId="read-files" basePath="/learn/fileio" />
    </div>
  );
}

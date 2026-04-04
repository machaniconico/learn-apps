import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function BufferedIoPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">ファイルI/O レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">バッファI/O</h1>
        <p className="text-gray-400">BufferedReaderとBufferedWriterを使った効率的なI/O処理を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">バッファリングの利点</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          BufferedReaderとBufferedWriterはI/Oをバッファリングして
          ディスクアクセスの回数を減らし、パフォーマンスを向上させます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>BufferedReader: 行単位の読み込みが効率的</li>
          <li>BufferedWriter: 書き込みをバッファして一括フラッシュ</li>
          <li>File.bufferedReader()でKotlinらしく作成できる</li>
          <li>use&#123;&#125;と組み合わせてリソースを安全に管理する</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">BufferedReaderの使い方</h2>
        <p className="text-gray-400 mb-4">BufferedReaderで効率的に行を読み込みます。</p>
        <KotlinEditor
          defaultCode={`import java.io.BufferedReader
import java.io.StringReader

fun main() {
    val data = "Kotlin\nJava\nScala\nGroovy"
    val reader = BufferedReader(StringReader(data))

    reader.use { br ->
        var line = br.readLine()
        var lineNum = 1
        while (line != null) {
            println("\${lineNum}: \${line}")
            lineNum++
            line = br.readLine()
        }
    }
}`}
          expectedOutput={`1: Kotlin
2: Java
3: Scala
4: Groovy`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">BufferedWriterの使い方</h2>
        <p className="text-gray-400 mb-4">BufferedWriterでテキストを効率的に書き込みます。</p>
        <KotlinEditor
          defaultCode={`import java.io.BufferedWriter
import java.io.StringWriter

fun main() {
    val sw = StringWriter()
    BufferedWriter(sw).use { bw ->
        bw.write("1行目")
        bw.newLine()
        bw.write("2行目")
        bw.newLine()
        bw.write("3行目")
        bw.flush()
    }

    val result = sw.toString()
    println("書き込み結果:")
    println(result)
    println("行数: \${result.lines().size}")
}`}
          expectedOutput={`書き込み結果:
1行目
2行目
3行目
行数: 3`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Kotlinの拡張関数でバッファI/O</h2>
        <p className="text-gray-400 mb-4">File.bufferedReader()とFile.bufferedWriter()でシンプルに書けます。</p>
        <KotlinEditor
          defaultCode={`import java.io.StringReader
import java.io.BufferedReader

fun processLines(content: String): List<String> {
    val results = mutableListOf<String>()
    BufferedReader(StringReader(content)).use { reader ->
        reader.lineSequence()
            .filter { it.isNotBlank() }
            .map { it.trim().uppercase() }
            .forEach { results.add(it) }
    }
    return results
}

fun main() {
    val content = "  hello  \n\n  world  \n  kotlin  "
    val processed = processLines(content)
    processed.forEach { println(it) }
}`}
          expectedOutput={`HELLO
WORLD
KOTLIN`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="fileio" lessonId="buffered-io" />
      </div>
      <LessonNav lessons={lessons} currentId="buffered-io" basePath="/learn/fileio" />
    </div>
  );
}

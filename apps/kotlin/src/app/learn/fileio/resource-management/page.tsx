import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function ResourceManagementPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">ファイルI/O レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">リソース管理</h1>
        <p className="text-gray-400">use関数とtry-with-resourcesパターンを使ったストリームの安全なクローズを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">リソースリークの防止</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ファイルやネットワーク接続などのリソースは使用後に必ずクローズしなければなりません。
          use関数を使うと自動的にクローズされます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>use&#123;&#125;はブロック終了時にclose()を自動呼び出し</li>
          <li>例外発生時もclose()が保証される</li>
          <li>複数リソースをネストしたuseで管理できる</li>
          <li>useLines&#123;&#125;でファイルをSequenceとして処理できる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">useでのリソース管理</h2>
        <p className="text-gray-400 mb-4">use関数でAutoCloseableリソースを確実にクローズします。</p>
        <KotlinEditor
          defaultCode={`import java.io.StringReader
import java.io.BufferedReader

class ManagedResource(val name: String) : AutoCloseable {
    var closed = false
    fun read(): String = "[$name] データ"
    override fun close() {
        closed = true
        println("[$name] クローズ済み")
    }
}

fun main() {
    val result = ManagedResource("ファイル1").use { res ->
        val data = res.read()
        println("読み込み: $data")
        data.length
    }
    println("use戻り値: $result")
}`}
          expectedOutput={`読み込み: [ファイル1] データ
[ファイル1] クローズ済み
use戻り値: 10`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数リソースの管理</h2>
        <p className="text-gray-400 mb-4">複数のリソースをネストしたuseで管理します。</p>
        <KotlinEditor
          defaultCode={`import java.io.StringReader
import java.io.StringWriter
import java.io.BufferedReader
import java.io.BufferedWriter

fun copyAndTransform(input: String, transform: (String) -> String): String {
    val output = StringWriter()
    BufferedReader(StringReader(input)).use { reader ->
        BufferedWriter(output).use { writer ->
            reader.lineSequence().forEach { line ->
                writer.write(transform(line))
                writer.newLine()
            }
        }
    }
    return output.toString().trimEnd()
}

fun main() {
    val input = "hello world\nkotlin programming\nfile io"
    val result = copyAndTransform(input) { it.uppercase() }
    println(result)
}`}
          expectedOutput={`HELLO WORLD
KOTLIN PROGRAMMING
FILE IO`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">useLines for large files</h2>
        <p className="text-gray-400 mb-4">useLines&#123;&#125;は大きなファイルを行ごとに遅延処理するのに適しています。</p>
        <KotlinEditor
          defaultCode={`import java.io.StringReader
import java.io.BufferedReader

fun processLargeContent(content: String): Map<String, Int> {
    val wordCount = mutableMapOf<String, Int>()
    BufferedReader(StringReader(content)).use { reader ->
        reader.lineSequence()
            .flatMap { it.split(" ").asSequence() }
            .filter { it.isNotBlank() }
            .forEach { word ->
                wordCount[word] = (wordCount[word] ?: 0) + 1
            }
    }
    return wordCount
}

fun main() {
    val content = "kotlin is great\nkotlin is fun\nfun is good"
    val counts = processLargeContent(content)
    counts.entries.sortedBy { it.key }.forEach { (word, count) ->
        println("\${word}: \${count}")
    }
}`}
          expectedOutput={`fun: 2
good: 1
great: 1
is: 3
kotlin: 2`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="fileio" lessonId="resource-management" />
      </div>
      <LessonNav lessons={lessons} currentId="resource-management" basePath="/learn/fileio" />
    </div>
  );
}

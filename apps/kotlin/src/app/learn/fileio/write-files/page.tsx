import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function WriteFilesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">ファイルI/O レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ファイルへの書き込み</h1>
        <p className="text-gray-400">File.writeText()やappendText()を使ったファイルへの書き込み方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ファイル書き込みの方法</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlinのjava.io.Fileには書き込み用の拡張関数が用意されています。
          writeText()は上書き、appendText()は追記です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>writeText(text): ファイルに文字列を書き込む（上書き）</li>
          <li>appendText(text): ファイルの末尾に文字列を追記する</li>
          <li>writeBytes(bytes): バイト配列を書き込む</li>
          <li>printWriter&#123;&#125;: PrintWriterで行ごとに書き込む</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">書き込みのシミュレーション</h2>
        <p className="text-gray-400 mb-4">StringBuilderを使ってwriteText/appendTextの動作を学びます。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    // writeText相当（上書き）
    val fileContent = StringBuilder()
    fileContent.setLength(0)
    fileContent.append("最初の内容\n")
    println("writeText後: \${fileContent}")

    // appendText相当（追記）
    fileContent.append("追記した内容\n")
    fileContent.append("さらに追記\n")
    println("appendText後: \${fileContent}")
    println("行数: \${fileContent.lines().filter { it.isNotEmpty() }.size}")
}`}
          expectedOutput={`writeText後: 最初の内容

appendText後: 最初の内容
追記した内容
さらに追記

行数: 3`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ログファイルの書き込みパターン</h2>
        <p className="text-gray-400 mb-4">appendText()を使ったログ追記パターンです。</p>
        <KotlinEditor
          defaultCode={`import java.time.LocalDateTime

data class LogEntry(val level: String, val message: String) {
    val timestamp = "2024-01-01T10:00:00"
    override fun toString() = "[\${timestamp}] \${level}: \${message}"
}

fun main() {
    val logs = mutableListOf<LogEntry>()

    // ログを追加（実際はFile.appendText()で書き込む）
    logs.add(LogEntry("INFO", "アプリケーション起動"))
    logs.add(LogEntry("DEBUG", "設定ファイル読み込み完了"))
    logs.add(LogEntry("ERROR", "データベース接続失敗"))
    logs.add(LogEntry("INFO", "再接続試行"))

    logs.forEach { println(it) }
    println("---")
    println("エラー数: \${logs.count { it.level == "ERROR" }}")
}`}
          expectedOutput={`[2024-01-01T10:00:00] INFO: アプリケーション起動
[2024-01-01T10:00:00] DEBUG: 設定ファイル読み込み完了
[2024-01-01T10:00:00] ERROR: データベース接続失敗
[2024-01-01T10:00:00] INFO: 再接続試行
---
エラー数: 1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="fileio" lessonId="write-files" />
      </div>
      <LessonNav lessons={lessons} currentId="write-files" basePath="/learn/fileio" />
    </div>
  );
}

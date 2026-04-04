import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function FileOperationsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">ファイルI/O レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ファイル操作</h1>
        <p className="text-gray-400">ファイルのコピー、移動、削除、存在確認などのファイルシステム操作を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ファイルシステム操作</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          java.io.Fileとjava.nio.file.Filesを使ってファイルシステムを操作できます。
          Kotlinの拡張関数でより簡潔に書けます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>exists(): ファイル・ディレクトリの存在確認</li>
          <li>Files.copy(): ファイルのコピー</li>
          <li>Files.move(): ファイルの移動・リネーム</li>
          <li>delete() / deleteRecursively(): ファイル・ディレクトリの削除</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ファイルの存在確認とメタデータ</h2>
        <p className="text-gray-400 mb-4">Fileオブジェクトのプロパティでファイル情報を取得します。</p>
        <KotlinEditor
          defaultCode={`import java.io.File

fun describeFile(path: String) {
    val file = File(path)
    println("パス: \${path}")
    println("  存在する: \${file.exists()}")
    println("  ファイル: \${file.isFile}")
    println("  ディレクトリ: \${file.isDirectory}")
    println("  絶対パス: \${file.absolutePath}")
}

fun main() {
    // システムの一時ディレクトリで確認
    val tmpDir = System.getProperty("java.io.tmpdir")
    println("一時ディレクトリ: \${tmpDir}")

    val dir = File(tmpDir)
    println("存在: \${dir.exists()}")
    println("ディレクトリ: \${dir.isDirectory}")
}`}
          expectedOutput={`一時ディレクトリ: /tmp
存在: true
ディレクトリ: true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ファイルのコピーと削除</h2>
        <p className="text-gray-400 mb-4">一時ファイルを使ってコピーと削除を実演します。</p>
        <KotlinEditor
          defaultCode={`import java.io.File

fun main() {
    val tmpDir = System.getProperty("java.io.tmpdir")

    // ファイル作成
    val source = File(tmpDir, "source_kotlin.txt")
    source.writeText("Kotlinファイル操作テスト\n行2\n行3")
    println("作成: \${source.name} (\${source.length()}バイト)")

    // コピー
    val dest = File(tmpDir, "dest_kotlin.txt")
    source.copyTo(dest, overwrite = true)
    println("コピー先: \${dest.name} (\${dest.length()}バイト)")

    // 内容確認
    println("内容行数: \${dest.readLines().size}")

    // 削除
    source.delete()
    dest.delete()
    println("削除完了: source=\${!source.exists()}, dest=\${!dest.exists()}")
}`}
          expectedOutput={`作成: source_kotlin.txt (27バイト)
コピー先: dest_kotlin.txt (27バイト)
内容行数: 3
削除完了: source=true, dest=true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ディレクトリ操作</h2>
        <p className="text-gray-400 mb-4">ディレクトリの作成、ファイルの一覧取得、再帰削除を行います。</p>
        <KotlinEditor
          defaultCode={`import java.io.File

fun main() {
    val tmpDir = System.getProperty("java.io.tmpdir")
    val testDir = File(tmpDir, "kotlin_test_dir")

    // ディレクトリ作成
    testDir.mkdirs()
    println("ディレクトリ作成: \${testDir.exists()}")

    // ファイルを作成
    File(testDir, "a.txt").writeText("A")
    File(testDir, "b.txt").writeText("B")

    // ファイル一覧
    val files = testDir.listFiles()?.sortedBy { it.name } ?: emptyList()
    files.forEach { println("  \${it.name}") }

    // 再帰削除
    testDir.deleteRecursively()
    println("削除後の存在: \${testDir.exists()}")
}`}
          expectedOutput={`ディレクトリ作成: true
  a.txt
  b.txt
削除後の存在: false`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="fileio" lessonId="file-operations" />
      </div>
      <LessonNav lessons={lessons} currentId="file-operations" basePath="/learn/fileio" />
    </div>
  );
}

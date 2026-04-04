import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function PathsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">ファイルI/O レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">パス操作</h1>
        <p className="text-gray-400">java.nio.file.Pathを使ったファイルパスの構築と操作方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">java.nio.file.Path</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          java.nio.file.PathはJava7から導入されたモダンなパス操作APIです。
          Paths.get()またはPath.of()でPathオブジェクトを作成します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>Paths.get()またはPath.of()でPathを作成する</li>
          <li>resolve()でパスを結合する</li>
          <li>parent・fileName・rootでパスの構成要素を取得する</li>
          <li>normalize()で相対パスの.や..を解決する</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Pathの基本操作</h2>
        <p className="text-gray-400 mb-4">Paths.get()でPathを作成して各種プロパティを確認します。</p>
        <KotlinEditor
          defaultCode={`import java.nio.file.Paths

fun main() {
    val path = Paths.get("/home/user/documents/report.txt")

    println("フルパス: \${path}")
    println("ファイル名: \${path.fileName}")
    println("親ディレクトリ: \${path.parent}")
    println("要素数: \${path.nameCount}")

    // パスの各要素を取得
    for (i in 0 until path.nameCount) {
        println("要素\${i}: \${path.getName(i)}")
    }
}`}
          expectedOutput={`フルパス: /home/user/documents/report.txt
ファイル名: report.txt
親ディレクトリ: /home/user/documents
要素数: 4
要素0: home
要素1: user
要素2: documents
要素3: report.txt`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">パスの結合と正規化</h2>
        <p className="text-gray-400 mb-4">resolve()でパスを結合し、normalize()で正規化します。</p>
        <KotlinEditor
          defaultCode={`import java.nio.file.Paths

fun main() {
    val base = Paths.get("/home/user")

    // resolve()でパス結合
    val docPath = base.resolve("documents").resolve("report.txt")
    println("結合: \${docPath}")

    // normalize()で正規化
    val messy = Paths.get("/home/user/./documents/../documents/report.txt")
    println("正規化前: \${messy}")
    println("正規化後: \${messy.normalize()}")

    // relativize()で相対パスを取得
    val from = Paths.get("/home/user")
    val to = Paths.get("/home/user/documents/report.txt")
    println("相対パス: \${from.relativize(to)}")
}`}
          expectedOutput={`結合: /home/user/documents/report.txt
正規化前: /home/user/./documents/../documents/report.txt
正規化後: /home/user/documents/report.txt
相対パス: documents/report.txt`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="fileio" lessonId="paths" />
      </div>
      <LessonNav lessons={lessons} currentId="paths" basePath="/learn/fileio" />
    </div>
  );
}

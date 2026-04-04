import { KotlinEditor } from "@/components/kotlin-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

const quizQuestions: QuizQuestion[] = [
  {
    question: "テキストファイルを全行リストとして読み込む関数はどれですか？",
    options: ["readText()", "readLines()", "readFile()", "getLines()"],
    answer: 1,
    explanation: "readLines()はファイルの全行をList<String>として返します。",
  },
  {
    question: "ファイルに文字列を追記するKotlinの関数はどれですか？",
    options: ["writeText()", "appendText()", "addText()", "insertText()"],
    answer: 1,
    explanation: "appendText()は既存ファイルの末尾に文字列を追記します。writeText()は上書きです。",
  },
  {
    question: "use関数でリソースを扱う利点はどれですか？",
    options: [
      "処理が高速になる",
      "ブロックを抜けると自動的にclose()が呼ばれる",
      "例外が発生しなくなる",
      "ファイルが暗号化される",
    ],
    answer: 1,
    explanation: "use関数はブロックの終了時（正常終了・例外発生どちらでも）にclose()を自動で呼び出します。",
  },
  {
    question: "java.nio.file.PathsでPathオブジェクトを作成するメソッドはどれですか？",
    options: ["Paths.create()", "Paths.get()", "Paths.of()", "Paths.new()"],
    answer: 1,
    explanation: "Paths.get()またはPath.of()（Java 11以降）でPathオブジェクトを作成します。",
  },
];

export default function FileioPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-red-400 mb-2">ファイルI/O</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Kotlinのファイル入出力を学びます。readText・readLinesによるファイル読み込み、
          writeText・appendTextによる書き込み、Pathsによるパス操作、
          BufferedI/O、ファイルの操作、use関数によるリソース管理まで幅広くカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="fileio" totalLessons={6} color="red" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/fileio" color="red" categoryId="fileio" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ファイルの基本操作</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">java.io.File</code>クラスを使って
          ファイルの読み書きや存在確認ができます。
        </p>
        <KotlinEditor
          defaultCode={`import java.io.File

fun main() {
    // ファイル操作のシミュレーション
    val content = "Hello, Kotlin File I/O!\n2行目のテキスト\n3行目のテキスト"
    val lines = content.lines()

    println("全行数: \${lines.size}")
    lines.forEachIndexed { index, line ->
        println("行\${index + 1}: \${line}")
    }
}`}
          expectedOutput={`全行数: 3
行1: Hello, Kotlin File I/O!
行2: 2行目のテキスト
行3: 3行目のテキスト`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">use関数によるリソース管理</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">use</code>関数はブロック終了後に自動でリソースをクローズします。
        </p>
        <KotlinEditor
          defaultCode={`import java.io.StringReader
import java.io.BufferedReader

fun main() {
    val data = "行1\n行2\n行3"
    val result = mutableListOf<String>()

    BufferedReader(StringReader(data)).use { reader ->
        var line = reader.readLine()
        while (line != null) {
            result.add(line)
            line = reader.readLine()
        }
    }
    // useブロックを抜けると自動でclose()が呼ばれる
    result.forEach { println(it) }
}`}
          expectedOutput={`行1
行2
行3`}
        />
      </section>
      <Quiz questions={quizQuestions} color="red" />
    </div>
  );
}

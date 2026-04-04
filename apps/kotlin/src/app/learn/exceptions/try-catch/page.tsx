import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("exceptions");

export default function TryCatchPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">例外処理 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">try-catch</h1>
        <p className="text-gray-400">try-catch-finallyブロックを使った例外の捕捉と後処理の書き方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">例外処理の構文</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlinのtry-catchはJavaと同様の構文ですが、式として使える点が異なります。
          finallyブロックは例外の有無に関わらず実行されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>tryブロックに例外が発生する可能性のあるコードを書く</li>
          <li>catchブロックで例外の型を指定して捕捉する</li>
          <li>finallyブロックは常に実行される（リソース解放に使う）</li>
          <li>複数のcatchブロックで異なる例外を個別に処理できる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なtry-catch</h2>
        <p className="text-gray-400 mb-4">try-catch-finallyの基本的な使い方です。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    try {
        val result = 10 / 0
        println("結果: \${result}")
    } catch (e: ArithmeticException) {
        println("算術エラー: \${e.message}")
    } finally {
        println("finallyブロック実行（常に）")
    }
    println("プログラム継続")
}`}
          expectedOutput={`算術エラー: / by zero
finallyブロック実行（常に）
プログラム継続`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数のcatchブロック</h2>
        <p className="text-gray-400 mb-4">複数の例外型を個別に処理できます。</p>
        <KotlinEditor
          defaultCode={`fun parseAndDivide(input: String, divisor: Int): Int {
    val number = input.toInt()  // NumberFormatException
    return number / divisor     // ArithmeticException
}

fun main() {
    val testCases = listOf(
        Pair("10", 2),
        Pair("abc", 2),
        Pair("10", 0)
    )
    testCases.forEach { (input, divisor) ->
        try {
            println("結果: \${parseAndDivide(input, divisor)}")
        } catch (e: NumberFormatException) {
            println("数値変換エラー: '\${input}'")
        } catch (e: ArithmeticException) {
            println("算術エラー: ゼロ除算")
        }
    }
}`}
          expectedOutput={`結果: 5
数値変換エラー: 'abc'
算術エラー: ゼロ除算`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">try-catchのネスト</h2>
        <p className="text-gray-400 mb-4">try-catchをネストして階層的に例外を処理できます。</p>
        <KotlinEditor
          defaultCode={`fun processFile(name: String): String {
    if (name.isEmpty()) throw IllegalArgumentException("ファイル名が空")
    if (!name.endsWith(".txt")) throw IllegalStateException("txtファイルが必要")
    return "処理済み: \${name}"
}

fun main() {
    val files = listOf("report.txt", "", "data.csv")
    files.forEach { file ->
        try {
            println(processFile(file))
        } catch (e: IllegalArgumentException) {
            println("引数エラー: \${e.message}")
        } catch (e: IllegalStateException) {
            println("状態エラー: \${e.message}")
        }
    }
}`}
          expectedOutput={`処理済み: report.txt
引数エラー: ファイル名が空
状態エラー: txtファイルが必要`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="exceptions" lessonId="try-catch" />
      </div>
      <LessonNav lessons={lessons} currentId="try-catch" basePath="/learn/exceptions" />
    </div>
  );
}

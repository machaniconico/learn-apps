import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("exceptions");

export default function CheckedUncheckedPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">例外処理 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">検査例外・非検査例外</h1>
        <p className="text-gray-400">JavaとKotlinの例外体系の違いと@Throwsアノテーションの使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">JavaとKotlinの例外の違い</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Javaには検査例外（Checked Exception）と非検査例外があり、
          検査例外はcatchまたはthrows宣言が必要です。
          Kotlinにはこの区別がなく、すべての例外が非検査扱いです。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>Kotlinはすべての例外が非検査例外（RuntimeException相当）</li>
          <li>@ThrowsアノテーションでJavaとの相互運用時に検査例外を宣言できる</li>
          <li>Javaの検査例外（IOException等）もKotlinではtry-catchが任意</li>
          <li>Result型でエラーを値として扱う方法もある</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Kotlinの例外はすべて非検査</h2>
        <p className="text-gray-400 mb-4">Kotlinではtry-catchなしでもコンパイルエラーになりません。</p>
        <KotlinEditor
          defaultCode={`import java.io.IOException

// Kotlinでは検査例外もcatchが強制されない
fun readData(path: String): String {
    if (path.isEmpty()) throw IOException("パスが空です")
    return "データ: \${path}"
}

fun main() {
    // try-catchなしでも呼び出せる（Kotlinの特徴）
    println(readData("/data/file.txt"))

    // もちろんcatchすることもできる
    try {
        readData("")
    } catch (e: IOException) {
        println("IO例外: \${e.message}")
    }
}`}
          expectedOutput={`データ: /data/file.txt
IO例外: パスが空です`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Result型でエラーを値として扱う</h2>
        <p className="text-gray-400 mb-4">Result型を使うと例外をスローせずに成功・失敗を表現できます。</p>
        <KotlinEditor
          defaultCode={`fun parseNumber(input: String): Result<Int> {
    return runCatching { input.toInt() }
}

fun main() {
    val results = listOf("42", "abc", "100", "")
    results.forEach { input ->
        parseNumber(input)
            .onSuccess { println("成功: \${it}") }
            .onFailure { println("失敗: '\${input}' -> \${it.message}") }
    }
}`}
          expectedOutput={`成功: 42
失敗: 'abc' -> For input string: "abc"
成功: 100
失敗: '' -> For input string: ""`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">@Throwsアノテーション</h2>
        <p className="text-gray-400 mb-4">@ThrowsはJavaコードからKotlin関数を呼ぶ際の検査例外宣言に使います。</p>
        <KotlinEditor
          defaultCode={`import java.io.IOException

// @ThrowsでJavaの検査例外として宣言（JavaとのInterop用）
@Throws(IOException::class)
fun loadConfig(path: String): String {
    if (!path.endsWith(".json")) {
        throw IOException("JSONファイルが必要: \${path}")
    }
    return "{\\"config\\": true}"
}

fun main() {
    try {
        println(loadConfig("config.json"))
        println(loadConfig("config.xml"))
    } catch (e: IOException) {
        println("例外: \${e.message}")
    }
}`}
          expectedOutput={`{"config": true}
例外: JSONファイルが必要: config.xml`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="exceptions" lessonId="checked-unchecked" />
      </div>
      <LessonNav lessons={lessons} currentId="checked-unchecked" basePath="/learn/exceptions" />
    </div>
  );
}

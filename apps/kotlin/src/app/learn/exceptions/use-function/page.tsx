import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("exceptions");

export default function UseFunctionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">例外処理 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">use関数</h1>
        <p className="text-gray-400">AutoCloseableリソースを安全に解放するuse関数の使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">use関数の特徴</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          use関数はAutoCloseableを実装したリソースを安全に扱います。
          ブロックを抜けるときに自動でclose()を呼び出します。
          Javaのtry-with-resources文に相当します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>AutoCloseable/Closeableを実装したオブジェクトに使用できる</li>
          <li>正常終了・例外発生どちらでもclose()が呼ばれる</li>
          <li>ブロックの戻り値がuse関数の戻り値になる</li>
          <li>InputStream、BufferedReaderなどに使える</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カスタムAutoCloseableでuseを学ぶ</h2>
        <p className="text-gray-400 mb-4">AutoCloseableを実装したクラスでuse関数の動作を確認します。</p>
        <KotlinEditor
          defaultCode={`class Resource(val name: String) : AutoCloseable {
    init { println("[\${name}] オープン") }
    fun process() { println("[\${name}] 処理中") }
    override fun close() { println("[\${name}] クローズ") }
}

fun main() {
    Resource("DB接続").use { resource ->
        resource.process()
        println("useブロック内")
    }
    println("useブロック外（closeは済み）")
}`}
          expectedOutput={`[DB接続] オープン
[DB接続] 処理中
useブロック内
[DB接続] クローズ
useブロック外（closeは済み）`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">例外発生時もcloseされる</h2>
        <p className="text-gray-400 mb-4">例外が発生してもclose()が確実に呼ばれます。</p>
        <KotlinEditor
          defaultCode={`class Connection(val id: Int) : AutoCloseable {
    init { println("接続\${id}: オープン") }
    fun query(sql: String): String {
        if (sql.isEmpty()) throw IllegalArgumentException("SQLが空")
        return "結果: \${sql}"
    }
    override fun close() { println("接続\${id}: クローズ") }
}

fun main() {
    try {
        Connection(1).use { conn ->
            println(conn.query("SELECT *"))
            println(conn.query(""))  // 例外発生
        }
    } catch (e: IllegalArgumentException) {
        println("エラー: \${e.message}")
    }
    println("終了")
}`}
          expectedOutput={`接続1: オープン
結果: SELECT *
接続1: クローズ
エラー: SQLが空
終了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">use関数の戻り値</h2>
        <p className="text-gray-400 mb-4">useブロックの最後の式がuse関数の戻り値になります。</p>
        <KotlinEditor
          defaultCode={`import java.io.StringReader
import java.io.BufferedReader

fun countLines(text: String): Int {
    return BufferedReader(StringReader(text)).use { reader ->
        reader.lines().count().toInt()
    }
}

fun main() {
    val text = "1行目\n2行目\n3行目\n4行目"
    val count = countLines(text)
    println("行数: \${count}")
}`}
          expectedOutput={`行数: 4`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="exceptions" lessonId="use-function" />
      </div>
      <LessonNav lessons={lessons} currentId="use-function" basePath="/learn/exceptions" />
    </div>
  );
}

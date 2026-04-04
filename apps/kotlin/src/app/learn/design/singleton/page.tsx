import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function SingletonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">デザインパターン レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">シングルトンパターン</h1>
        <p className="text-gray-400">object宣言を使ってKotlinらしいシングルトンパターンを実装する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">シングルトンパターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          シングルトンパターンはクラスのインスタンスがアプリケーション全体で1つだけ存在することを保証するパターンです。
          設定管理、ログ、キャッシュなどのグローバルな状態管理によく使われます。
          Kotlinではobject宣言で言語レベルのサポートがあります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>object宣言はスレッドセーフなシングルトンを自動的に保証</li>
          <li>遅延初期化（初回アクセス時に生成）される</li>
          <li>クラスを継承したりインターフェースを実装したりできる</li>
          <li>Javaのstaticメンバーに相当する機能も提供</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">object宣言によるシングルトン</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-300">object</code>キーワードを使うだけでシングルトンが作れます。
          Javaのような複雑なダブルチェックロッキングは不要です。
        </p>
        <KotlinEditor
          defaultCode={`object Database {
    private val connections = mutableListOf<String>()
    var maxConnections = 10

    fun connect(name: String) {
        if (connections.size < maxConnections) {
            connections.add(name)
            println("接続確立: \${name}")
        } else {
            println("接続上限に達しています")
        }
    }

    fun disconnect(name: String) {
        connections.remove(name)
        println("接続終了: \${name}")
    }

    fun status(): String = "接続数: \${connections.size}/\${maxConnections}"
}

fun main() {
    Database.connect("App-1")
    Database.connect("App-2")
    println(Database.status())

    Database.disconnect("App-1")
    println(Database.status())

    // 同じインスタンスであることを確認
    val db1 = Database
    val db2 = Database
    println("同じインスタンス: \${db1 === db2}")
}`}
          expectedOutput={`接続確立: App-1
接続確立: App-2
接続数: 2/10
接続終了: App-1
接続数: 1/10
同じインスタンス: true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">インターフェースを実装するシングルトン</h2>
        <p className="text-gray-400 mb-4">
          objectはインターフェースを実装できるため、テスト時にモックに差し替えやすい設計も可能です。
        </p>
        <KotlinEditor
          defaultCode={`interface Logger {
    fun log(message: String)
    fun error(message: String)
}

object ConsoleLogger : Logger {
    private var logCount = 0

    override fun log(message: String) {
        logCount++
        println("[LOG #\${logCount}] \${message}")
    }

    override fun error(message: String) {
        logCount++
        println("[ERROR #\${logCount}] \${message}")
    }

    fun getLogCount() = logCount
}

fun processData(logger: Logger, data: String) {
    logger.log("処理開始: \${data}")
    if (data.isEmpty()) {
        logger.error("データが空です")
        return
    }
    logger.log("処理完了: \${data.uppercase()}")
}

fun main() {
    processData(ConsoleLogger, "hello")
    processData(ConsoleLogger, "")
    println("総ログ数: \${ConsoleLogger.getLogCount()}")
}`}
          expectedOutput={`[LOG #1] 処理開始: hello
[LOG #2] 処理完了: HELLO
[LOG #3] 処理開始:
[ERROR #4] データが空です
総ログ数: 4`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="singleton" />
      </div>
      <LessonNav lessons={lessons} currentId="singleton" basePath="/learn/design" />
    </div>
  );
}

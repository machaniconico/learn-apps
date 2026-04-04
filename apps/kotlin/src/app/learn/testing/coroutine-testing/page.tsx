import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("testing");

export default function CoroutineTestingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">テスト レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コルーチンのテスト</h1>
        <p className="text-gray-400">runTestとTestCoroutineSchedulerを使ったコルーチンの単体テスト方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コルーチンテストの課題と解決策</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          通常のテストでdelayを使うとそのまま待機してしまいます。
          runTestを使うと仮想時間で高速にテストできます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>runTestは仮想時間を使うのでdelayが実際には待機しない</li>
          <li>advanceTimeBy()で仮想時間を進める</li>
          <li>advanceUntilIdle()で全保留中のコルーチンを完了させる</li>
          <li>TestCoroutineDispatcherで実行タイミングを制御できる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">suspend関数のテスト</h2>
        <p className="text-gray-400 mb-4">runBlockingでsuspend関数をテストします。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*

suspend fun fetchMessage(id: Int): String {
    delay(100L)
    return when (id) {
        1 -> "こんにちは"
        2 -> "さようなら"
        else -> "不明"
    }
}

fun main() = runBlocking {
    // suspend関数のテストをシミュレート
    val msg1 = fetchMessage(1)
    println("msg1 == こんにちは: \${msg1 == "こんにちは"}")

    val msg2 = fetchMessage(2)
    println("msg2 == さようなら: \${msg2 == "さようなら"}")

    val msg3 = fetchMessage(99)
    println("msg3 == 不明: \${msg3 == "不明"}")
}`}
          expectedOutput={`msg1 == こんにちは: true
msg2 == さようなら: true
msg3 == 不明: true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コルーチンのタイムアウトテスト</h2>
        <p className="text-gray-400 mb-4">withTimeoutを使ってタイムアウト処理をテストします。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*

suspend fun slowOperation(ms: Long): String {
    delay(ms)
    return "完了"
}

suspend fun withTimeoutOrDefault(ms: Long, default: String, block: suspend () -> String): String {
    return try {
        withTimeout(ms) { block() }
    } catch (e: TimeoutCancellationException) {
        default
    }
}

fun main() = runBlocking {
    // 速い処理: タイムアウトしない
    val result1 = withTimeoutOrDefault(500L, "タイムアウト") {
        slowOperation(100L)
    }
    println(result1)

    // 遅い処理: タイムアウトする
    val result2 = withTimeoutOrDefault(50L, "タイムアウト") {
        slowOperation(200L)
    }
    println(result2)
}`}
          expectedOutput={`完了
タイムアウト`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="testing" lessonId="coroutine-testing" />
      </div>
      <LessonNav lessons={lessons} currentId="coroutine-testing" basePath="/learn/testing" />
    </div>
  );
}

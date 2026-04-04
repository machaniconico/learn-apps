import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("coroutines");

export default function ExceptionHandlingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">コルーチン レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">例外処理</h1>
        <p className="text-gray-400">コルーチン内でのtry-catchとCoroutineExceptionHandlerによる例外処理を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コルーチンの例外処理</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          コルーチン内の例外はtry-catchで捕捉できます。
          CoroutineExceptionHandlerを使うとグローバルな例外ハンドラを設定できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>try-catchでsuspend関数の例外を捕捉できる</li>
          <li>asyncの例外はawait()呼び出し時に発生する</li>
          <li>CoroutineExceptionHandlerで未捕捉例外を処理する</li>
          <li>CancellationExceptionはキャンセルを示す特殊な例外</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">try-catchでの例外処理</h2>
        <p className="text-gray-400 mb-4">suspend関数もtry-catchで例外を捕捉できます。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*

suspend fun riskyOperation(): String {
    delay(100L)
    throw IllegalStateException("処理に失敗しました")
}

fun main() = runBlocking {
    try {
        val result = riskyOperation()
        println(result)
    } catch (e: IllegalStateException) {
        println("例外を捕捉: \${e.message}")
    }
    println("処理続行")
}`}
          expectedOutput={`例外を捕捉: 処理に失敗しました
処理続行`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">CoroutineExceptionHandler</h2>
        <p className="text-gray-400 mb-4">CoroutineExceptionHandlerでグローバル例外ハンドラを設定します。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*

fun main() = runBlocking {
    val handler = CoroutineExceptionHandler { _, exception ->
        println("ハンドラで捕捉: \${exception.message}")
    }
    val job = launch(handler) {
        throw RuntimeException("コルーチンエラー")
    }
    job.join()
    println("メインは継続")
}`}
          expectedOutput={`ハンドラで捕捉: コルーチンエラー
メインは継続`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">asyncの例外処理</h2>
        <p className="text-gray-400 mb-4">asyncの例外はawait()を呼び出すときに発生します。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*

fun main() = runBlocking {
    val deferred = async {
        delay(100L)
        throw ArithmeticException("計算エラー")
        "結果"
    }
    try {
        println(deferred.await())
    } catch (e: ArithmeticException) {
        println("asyncの例外: \${e.message}")
    }
}`}
          expectedOutput={`asyncの例外: 計算エラー`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="coroutines" lessonId="exception-handling" />
      </div>
      <LessonNav lessons={lessons} currentId="exception-handling" basePath="/learn/coroutines" />
    </div>
  );
}

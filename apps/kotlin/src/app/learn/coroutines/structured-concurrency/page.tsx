import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("coroutines");

export default function StructuredConcurrencyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">コルーチン レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">構造化された並行処理</h1>
        <p className="text-gray-400">スコープとジョブを使った構造化並行処理とキャンセルの仕組みを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">構造化並行処理とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          構造化並行処理では、コルーチンは常に特定のスコープに属します。
          親スコープがキャンセルされると子コルーチンも自動的にキャンセルされます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>coroutineScopeで新しいスコープを作成できる</li>
          <li>親のキャンセルは子に伝播する</li>
          <li>子の失敗は親に伝播する（SupervisorJobで防げる）</li>
          <li>スコープが完了すると全ての子も完了している</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">coroutineScopeの使い方</h2>
        <p className="text-gray-400 mb-4">coroutineScopeで子コルーチンを全て待機します。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*

suspend fun doWork() = coroutineScope {
    val job1 = launch {
        delay(200L)
        println("ジョブ1完了")
    }
    val job2 = launch {
        delay(100L)
        println("ジョブ2完了")
    }
    // coroutineScopeは全子コルーチンが完了するまで待つ
}

fun main() = runBlocking {
    println("開始")
    doWork()
    println("全ジョブ完了")
}`}
          expectedOutput={`開始
ジョブ2完了
ジョブ1完了
全ジョブ完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コルーチンのキャンセル</h2>
        <p className="text-gray-400 mb-4">cancel()でコルーチンをキャンセルできます。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*

fun main() = runBlocking {
    val job = launch {
        repeat(10) { i ->
            println("処理中 \${i}")
            delay(200L)
        }
    }
    delay(500L)
    println("キャンセルします")
    job.cancel()
    job.join()
    println("キャンセル完了")
}`}
          expectedOutput={`処理中 0
処理中 1
処理中 2
キャンセルします
キャンセル完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">SupervisorJob</h2>
        <p className="text-gray-400 mb-4">SupervisorJobを使うと子の失敗が他の子に伝播しません。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*

fun main() = runBlocking {
    val supervisor = SupervisorJob()
    with(CoroutineScope(coroutineContext + supervisor)) {
        val child1 = launch {
            delay(100L)
            println("子1: 成功")
        }
        val child2 = launch {
            delay(50L)
            throw RuntimeException("子2失敗")
        }
        delay(300L)
    }
    println("スーパーバイザー完了")
}`}
          expectedOutput={`子1: 成功
スーパーバイザー完了`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="coroutines" lessonId="structured-concurrency" />
      </div>
      <LessonNav lessons={lessons} currentId="structured-concurrency" basePath="/learn/coroutines" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("coroutines");

export default function LaunchAsyncPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">コルーチン レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">launch・async</h1>
        <p className="text-gray-400">launchで起動するコルーチンとasyncで結果を返すコルーチンの違いを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">launchとasyncの違い</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          launchとasyncは両方ともコルーチンを起動しますが、戻り値が異なります。
          launchはJobを返して結果を返しません。asyncはDeferredを返して結果をawait()で取得できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>launch: Jobを返す、Fire-and-forget型</li>
          <li>async: Deferred&lt;T&gt;を返す、結果をawait()で取得</li>
          <li>await()はsuspend関数なのでコルーチン内でのみ呼べる</li>
          <li>asyncで並列処理することでパフォーマンス向上</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">launchの使い方</h2>
        <p className="text-gray-400 mb-4">launchはJobを返し、join()で完了を待てます。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*

fun main() = runBlocking {
    val job = launch {
        delay(500L)
        println("launchのコルーチン完了")
    }
    println("launchを起動しました")
    job.join() // 完了を待つ
    println("joinで待機完了")
}`}
          expectedOutput={`launchを起動しました
launchのコルーチン完了
joinで待機完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">asyncとawait</h2>
        <p className="text-gray-400 mb-4">asyncで非同期処理を起動し、await()で結果を取得します。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*

suspend fun fetchUser(): String {
    delay(300L)
    return "Alice"
}

suspend fun fetchScore(): Int {
    delay(300L)
    return 95
}

fun main() = runBlocking {
    val user = async { fetchUser() }
    val score = async { fetchScore() }
    // 両方が並列で実行される
    println("ユーザー: \${user.await()}, スコア: \${score.await()}")
}`}
          expectedOutput={`ユーザー: Alice, スコア: 95`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">並列実行によるパフォーマンス</h2>
        <p className="text-gray-400 mb-4">asyncで並列実行するとシーケンシャル実行より速くなります。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*
import kotlin.system.measureTimeMillis

suspend fun task(name: String, ms: Long): String {
    delay(ms)
    return "\${name}完了"
}

fun main() = runBlocking {
    val time = measureTimeMillis {
        val t1 = async { task("タスクA", 300L) }
        val t2 = async { task("タスクB", 300L) }
        println(t1.await())
        println(t2.await())
    }
    println("合計時間: \${time}ms（並列なので約300ms）")
}`}
          expectedOutput={`タスクA完了
タスクB完了
合計時間: 310ms（並列なので約300ms）`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="coroutines" lessonId="launch-async" />
      </div>
      <LessonNav lessons={lessons} currentId="launch-async" basePath="/learn/coroutines" />
    </div>
  );
}

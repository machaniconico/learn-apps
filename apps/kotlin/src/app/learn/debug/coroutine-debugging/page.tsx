import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

export default function CoroutineDebuggingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">デバッグ レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コルーチンのデバッグ</h1>
        <p className="text-gray-400">コルーチンダンプとDebuggerプラグインを使ったコルーチンのデバッグ方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コルーチンデバッグの特徴</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          コルーチンは通常のスレッドと異なり、複数のスレッドをまたいで実行されます。
          CoroutineNameを付けるとデバッグ時に識別しやすくなります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>CoroutineNameでコルーチンに名前を付ける</li>
          <li>-Dkotlinx.coroutines.debugJVMオプションで詳細ログ出力</li>
          <li>IntelliJ IDEAのCoroutines Debuggerパネルで一覧表示</li>
          <li>コルーチンの状態（RUNNING/SUSPENDED/CREATED）を確認できる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">CoroutineNameでの識別</h2>
        <p className="text-gray-400 mb-4">コルーチンに名前を付けてデバッグ出力を分かりやすくします。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*

fun main() = runBlocking(CoroutineName("Root")) {
    launch(CoroutineName("Fetcher")) {
        println("[Fetcher] データ取得開始")
        delay(100L)
        println("[Fetcher] データ取得完了")
    }
    launch(CoroutineName("Processor")) {
        delay(50L)
        println("[Processor] 処理開始")
        delay(100L)
        println("[Processor] 処理完了")
    }
    println("[Root] 子コルーチン起動済み")
    delay(300L)
}`}
          expectedOutput={`[Root] 子コルーチン起動済み
[Processor] 処理開始
[Fetcher] データ取得完了
[Processor] 処理完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コルーチンの例外トレース</h2>
        <p className="text-gray-400 mb-4">コルーチン内の例外をトレースして原因を特定します。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*

fun main() = runBlocking {
    val handler = CoroutineExceptionHandler { context, exception ->
        val name = context[CoroutineName]?.name ?: "不明"
        println("コルーチン '\${name}' でエラー: \${exception.message}")
    }

    launch(CoroutineName("Worker1") + handler) {
        println("Worker1: 処理中")
        delay(100L)
        throw RuntimeException("Worker1がクラッシュ")
    }

    launch(CoroutineName("Worker2") + handler) {
        println("Worker2: 処理中")
        delay(200L)
        println("Worker2: 正常完了")
    }

    delay(400L)
}`}
          expectedOutput={`Worker1: 処理中
Worker2: 処理中
コルーチン 'Worker1' でエラー: Worker1がクラッシュ
Worker2: 正常完了`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="debug" lessonId="coroutine-debugging" />
      </div>
      <LessonNav lessons={lessons} currentId="coroutine-debugging" basePath="/learn/debug" />
    </div>
  );
}

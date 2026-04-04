import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("flow");

export default function StateflowSharedflowPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">Flow レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">StateFlow・SharedFlow</h1>
        <p className="text-gray-400">状態保持のStateFlowとイベント共有のSharedFlowの違いと使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ホットFlowとコールドFlow</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          通常のFlowはコールド（collectするまで動かない）ですが、
          StateFlowとSharedFlowはホット（常にアクティブ）なFlowです。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>StateFlow: 現在の状態を1つ保持するホットFlow（初期値が必要）</li>
          <li>SharedFlow: 複数のコレクターにイベントをブロードキャストする</li>
          <li>MutableStateFlow: valueプロパティで状態を更新する</li>
          <li>MutableSharedFlow: emit()でイベントを発行する</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">StateFlowの基本</h2>
        <p className="text-gray-400 mb-4">MutableStateFlowで状態を管理し、変更を監視します。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

class Counter {
    private val _count = MutableStateFlow(0)
    val count: StateFlow<Int> = _count.asStateFlow()

    fun increment() { _count.value++ }
    fun decrement() { _count.value-- }
}

fun main() = runBlocking {
    val counter = Counter()
    val job = launch {
        counter.count.collect { println("カウント: \${it}") }
    }
    counter.increment()
    counter.increment()
    counter.decrement()
    delay(100L)
    job.cancel()
}`}
          expectedOutput={`カウント: 0
カウント: 1
カウント: 2
カウント: 1`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">SharedFlowでイベント共有</h2>
        <p className="text-gray-400 mb-4">SharedFlowで複数のコレクターに同じイベントをブロードキャストします。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun main() = runBlocking {
    val sharedFlow = MutableSharedFlow<String>()

    val job1 = launch {
        sharedFlow.collect { println("コレクター1: \${it}") }
    }
    val job2 = launch {
        sharedFlow.collect { println("コレクター2: \${it}") }
    }

    delay(100L)
    sharedFlow.emit("イベントA")
    sharedFlow.emit("イベントB")
    delay(100L)
    job1.cancel()
    job2.cancel()
}`}
          expectedOutput={`コレクター1: イベントA
コレクター2: イベントA
コレクター1: イベントB
コレクター2: イベントB`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="flow" lessonId="stateflow-sharedflow" />
      </div>
      <LessonNav lessons={lessons} currentId="stateflow-sharedflow" basePath="/learn/flow" />
    </div>
  );
}

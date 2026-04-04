import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("flow");

export default function FlowContextPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">Flow レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Flowのコンテキスト</h1>
        <p className="text-gray-400">flowOnを使ったFlowの実行コンテキストの切り替え方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Flowのコンテキスト保全</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Flowはデフォルトでcollectを呼び出したコンテキストで実行されます。
          flowOnを使うとFlowのemit側のコンテキストだけを変更できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>flowOnはFlowの上流（upstream）のコンテキストを変更する</li>
          <li>collect側は変更されず呼び出し元のコンテキストで実行される</li>
          <li>flow内部でwithContextは使用できない（flowOnを使う）</li>
          <li>launchInでFlowをバックグラウンドで収集できる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">flowOnの使い方</h2>
        <p className="text-gray-400 mb-4">flowOnでFlow側の処理をIO処理向けのDispatcherで実行します。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun dataFlow(): Flow<String> = flow {
    println("emit: \${Thread.currentThread().name}")
    emit("データ1")
    emit("データ2")
}.flowOn(Dispatchers.IO)

fun main() = runBlocking {
    dataFlow().collect { value ->
        println("collect: \${Thread.currentThread().name}")
        println(value)
    }
}`}
          expectedOutput={`emit: DefaultDispatcher-worker-1
collect: main
データ1
collect: main
データ2`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">launchInでの収集</h2>
        <p className="text-gray-400 mb-4">launchInを使うとFlowを指定スコープでバックグラウンド収集できます。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun main() = runBlocking {
    val flow = (1..3).asFlow()
        .onEach { delay(100L) }
        .onEach { println("値: \${it}") }

    flow.launchIn(this) // thisはrunBlockingのスコープ
    println("launchIn後も続行")
    delay(500L)
    println("完了")
}`}
          expectedOutput={`launchIn後も続行
値: 1
値: 2
値: 3
完了`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="flow" lessonId="flow-context" />
      </div>
      <LessonNav lessons={lessons} currentId="flow-context" basePath="/learn/flow" />
    </div>
  );
}

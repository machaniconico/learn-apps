import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("coroutines");

export default function CoroutineContextPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">コルーチン レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コルーチンコンテキスト</h1>
        <p className="text-gray-400">Dispatchers.IO・Main・Defaultなどのコルーチンコンテキストとスレッド切り替えを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">CoroutineContextとDispatchers</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          CoroutineContextはコルーチンの実行環境を定義します。
          Dispatchersはコルーチンが実行されるスレッドを決定します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>Dispatchers.Default: CPUバウンドな計算処理向け</li>
          <li>Dispatchers.IO: ファイルやネットワークのI/O処理向け</li>
          <li>Dispatchers.Main: UIスレッド（Android等）</li>
          <li>withContextでコンテキストを切り替えられる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Dispatchersの使い方</h2>
        <p className="text-gray-400 mb-4">launch・asyncにDispatchersを渡してスレッドを指定します。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*

fun main() = runBlocking {
    launch(Dispatchers.Default) {
        println("Default: \${Thread.currentThread().name}")
    }
    launch(Dispatchers.IO) {
        println("IO: \${Thread.currentThread().name}")
    }
    delay(500L)
}`}
          expectedOutput={`Default: DefaultDispatcher-worker-1
IO: DefaultDispatcher-worker-2`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">withContextでのスレッド切り替え</h2>
        <p className="text-gray-400 mb-4">withContextを使うと処理の途中でディスパッチャを切り替えられます。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*

suspend fun fetchFromNetwork(): String = withContext(Dispatchers.IO) {
    delay(100L)
    "ネットワークデータ"
}

suspend fun processData(data: String): String = withContext(Dispatchers.Default) {
    data.uppercase() + "（処理済み）"
}

fun main() = runBlocking {
    val raw = fetchFromNetwork()
    val processed = processData(raw)
    println(processed)
}`}
          expectedOutput={`ネットワークデータ（処理済み）`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">CoroutineName</h2>
        <p className="text-gray-400 mb-4">CoroutineNameでコルーチンに名前を付けてデバッグしやすくできます。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*

fun main() = runBlocking(CoroutineName("MainCoroutine")) {
    launch(CoroutineName("ChildCoroutine")) {
        println("子: \${coroutineContext[CoroutineName]?.name}")
    }
    println("親: \${coroutineContext[CoroutineName]?.name}")
    delay(200L)
}`}
          expectedOutput={`親: MainCoroutine
子: ChildCoroutine`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="coroutines" lessonId="coroutine-context" />
      </div>
      <LessonNav lessons={lessons} currentId="coroutine-context" basePath="/learn/coroutines" />
    </div>
  );
}

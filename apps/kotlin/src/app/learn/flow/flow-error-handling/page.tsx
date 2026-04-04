import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("flow");

export default function FlowErrorHandlingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">Flow レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Flowのエラー処理</h1>
        <p className="text-gray-400">catch演算子とretryを使ったFlowのエラーハンドリング方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Flowのエラーハンドリング</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Flowのエラーはcatch演算子で処理します。
          collect内のtry-catchとは異なり、catch演算子はFlowの上流の例外のみを捕捉します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>catch演算子: Flowの上流で発生した例外を捕捉する</li>
          <li>onCompletion: Flow完了時（正常・エラー問わず）に呼ばれる</li>
          <li>retry/retryWhen: エラー時に再試行する</li>
          <li>collect内のtry-catchも使用可能</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">catch演算子</h2>
        <p className="text-gray-400 mb-4">catch演算子でFlowの上流例外を処理し、代替値を発行できます。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun riskyFlow(): Flow<Int> = flow {
    emit(1)
    emit(2)
    throw RuntimeException("Flow内でエラー発生")
    emit(3)
}

fun main() = runBlocking {
    riskyFlow()
        .catch { e ->
            println("エラー捕捉: \${e.message}")
            emit(-1) // 代替値を発行
        }
        .collect { println(it) }
}`}
          expectedOutput={`1
2
エラー捕捉: Flow内でエラー発生
-1`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">onCompletionで後処理</h2>
        <p className="text-gray-400 mb-4">onCompletionはFlowが完了したとき（エラー時も含む）に呼ばれます。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun main() = runBlocking {
    (1..3).asFlow()
        .onCompletion { cause ->
            if (cause != null) {
                println("エラーで終了: \${cause.message}")
            } else {
                println("正常に完了")
            }
        }
        .collect { println(it) }
}`}
          expectedOutput={`1
2
3
正常に完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">retryでの再試行</h2>
        <p className="text-gray-400 mb-4">retry演算子でエラー発生時にFlowを再実行します。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

var attempt = 0

fun unstableFlow(): Flow<String> = flow {
    attempt++
    if (attempt < 3) {
        throw IOException("接続失敗 (試行\${attempt})")
    }
    emit("成功（試行\${attempt}回目）")
}

fun main() = runBlocking {
    unstableFlow()
        .retry(3) { e ->
            println("再試行: \${e.message}")
            true
        }
        .collect { println(it) }
}`}
          expectedOutput={`再試行: 接続失敗 (試行1)
再試行: 接続失敗 (試行2)
成功（試行3回目）`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="flow" lessonId="flow-error-handling" />
      </div>
      <LessonNav lessons={lessons} currentId="flow-error-handling" basePath="/learn/flow" />
    </div>
  );
}

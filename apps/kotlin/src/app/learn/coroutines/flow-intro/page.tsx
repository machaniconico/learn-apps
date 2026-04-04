import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("coroutines");

export default function FlowIntroPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">コルーチン レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Flow入門</h1>
        <p className="text-gray-400">複数の値を非同期で流すFlowの基本概念と簡単な使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Flowとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Flowは複数の値を非同期的に順番に流すストリームです。
          コルーチンベースで、遅延評価（コールドストリーム）が特徴です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>flowビルダーでFlowを作成する</li>
          <li>emit()で値を発行する</li>
          <li>collect{}で値を収集する</li>
          <li>Flowはコールドストリーム（collectするまで実行されない）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Flowの基本</h2>
        <p className="text-gray-400 mb-4">flowビルダーでFlowを作成してcollectで収集します。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun simpleFlow(): Flow<Int> = flow {
    println("Flow開始")
    for (i in 1..3) {
        delay(100L)
        emit(i)
    }
}

fun main() = runBlocking {
    simpleFlow().collect { value ->
        println("受信: \${value}")
    }
}`}
          expectedOutput={`Flow開始
受信: 1
受信: 2
受信: 3`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">asFlowとFlowの変換</h2>
        <p className="text-gray-400 mb-4">既存のコレクションをasFlow()でFlowに変換できます。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun main() = runBlocking {
    listOf("apple", "banana", "cherry")
        .asFlow()
        .map { it.uppercase() }
        .collect { println(it) }
}`}
          expectedOutput={`APPLE
BANANA
CHERRY`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">FlowはコールドStream</h2>
        <p className="text-gray-400 mb-4">Flowはcollectが呼ばれるたびに最初から実行されます。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun counter(): Flow<Int> = flow {
    println("--- Flowスタート ---")
    emit(1)
    emit(2)
}

fun main() = runBlocking {
    val flow = counter()
    println("1回目のcollect:")
    flow.collect { println(it) }
    println("2回目のcollect:")
    flow.collect { println(it) }
}`}
          expectedOutput={`1回目のcollect:
--- Flowスタート ---
1
2
2回目のcollect:
--- Flowスタート ---
1
2`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="coroutines" lessonId="flow-intro" />
      </div>
      <LessonNav lessons={lessons} currentId="flow-intro" basePath="/learn/coroutines" />
    </div>
  );
}

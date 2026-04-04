import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("flow");

export default function FlowBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">Flow レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Flowの基本</h1>
        <p className="text-gray-400">flowビルダーを使ったFlowの作成とcollectによる収集方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Flowの概念</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Flowは非同期ストリームで、時間をかけて複数の値を生成できます。
          RxJavaのObservableに似ていますが、コルーチンと自然に統合されています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>flow&#123;&#125;ビルダーでFlowを定義する</li>
          <li>emit()でストリームに値を発行する</li>
          <li>collect&#123;&#125;で値を消費する（終端演算子）</li>
          <li>コールドストリームなのでcollectまで実行されない</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">flowビルダーの基本</h2>
        <p className="text-gray-400 mb-4">flowビルダーの中でemit()を使って値を発行します。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun temperatures(): Flow<Double> = flow {
    val readings = listOf(36.5, 37.0, 36.8)
    for (temp in readings) {
        delay(100L)
        emit(temp)
    }
}

fun main() = runBlocking {
    temperatures().collect { temp ->
        println("体温: \${temp}°C")
    }
}`}
          expectedOutput={`体温: 36.5°C
体温: 37.0°C
体温: 36.8°C`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Flowの作成方法いろいろ</h2>
        <p className="text-gray-400 mb-4">flowOf、asFlow、rangeなど様々な方法でFlowを作れます。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun main() = runBlocking {
    // flowOfで固定値のFlowを作成
    flowOf(1, 2, 3).collect { print("\${it} ") }
    println()

    // asFlowでコレクションをFlowに変換
    listOf("a", "b", "c").asFlow().collect { print("\${it} ") }
    println()

    // rangeAsFlow
    (1..4).asFlow().collect { print("\${it} ") }
    println()
}`}
          expectedOutput={`1 2 3
a b c
1 2 3 4 `}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="flow" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/flow" />
    </div>
  );
}

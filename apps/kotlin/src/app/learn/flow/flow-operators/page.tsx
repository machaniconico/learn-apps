import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("flow");

export default function FlowOperatorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">Flow レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Flow演算子</h1>
        <p className="text-gray-400">map・filter・transform・takeなどFlowに使える中間演算子を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">中間演算子と終端演算子</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Flowの演算子は中間演算子（Flowを返す）と終端演算子（値を返す）に分かれます。
          中間演算子はチェーンして組み合わせられます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>map: 各値を変換する中間演算子</li>
          <li>filter: 条件に合う値のみ通過させる中間演算子</li>
          <li>take: 指定数だけ値を取り出す中間演算子</li>
          <li>toList/toSet: Flowを収集してコレクションに変換する終端演算子</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">mapとfilter</h2>
        <p className="text-gray-400 mb-4">mapで値を変換し、filterで絞り込みます。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun main() = runBlocking {
    (1..10).asFlow()
        .filter { it % 2 == 0 }      // 偶数のみ
        .map { it * it }              // 二乗
        .collect { println(it) }
}`}
          expectedOutput={`4
16
36
64
100`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">transformとtake</h2>
        <p className="text-gray-400 mb-4">transformで複数のemitができ、takeで件数を制限します。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun main() = runBlocking {
    (1..5).asFlow()
        .transform { value ->
            emit("before \${value}")
            emit("after \${value}")
        }
        .take(4)
        .collect { println(it) }
}`}
          expectedOutput={`before 1
after 1
before 2
after 2`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">終端演算子: toListとreduce</h2>
        <p className="text-gray-400 mb-4">toList()でコレクションに変換し、reduceで集約します。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun main() = runBlocking {
    val list = (1..5).asFlow().toList()
    println("リスト: \${list}")

    val sum = (1..5).asFlow().reduce { acc, value -> acc + value }
    println("合計: \${sum}")

    val count = (1..5).asFlow().count()
    println("件数: \${count}")
}`}
          expectedOutput={`リスト: [1, 2, 3, 4, 5]
合計: 15
件数: 5`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="flow" lessonId="flow-operators" />
      </div>
      <LessonNav lessons={lessons} currentId="flow-operators" basePath="/learn/flow" />
    </div>
  );
}

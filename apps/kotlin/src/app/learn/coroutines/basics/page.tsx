import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("coroutines");

export default function CoroutinesBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">コルーチン レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コルーチンの基本</h1>
        <p className="text-gray-400">コルーチンの概念と非同期プログラミングにおける役割を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コルーチンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          コルーチンは軽量なスレッドのような仕組みで、非同期処理を同期的なコードのように書けます。
          スレッドよりもメモリ効率が良く、数千のコルーチンを同時に実行できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>runBlockingでコルーチンスコープを作成する</li>
          <li>launchでコルーチンを起動する（結果を返さない）</li>
          <li>delayでスレッドをブロックせずに待機する</li>
          <li>コルーチンはスレッドより軽量で多数起動できる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">最初のコルーチン</h2>
        <p className="text-gray-400 mb-4">runBlockingとlaunchを使った基本的なコルーチンの例です。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*

fun main() = runBlocking {
    launch {
        delay(1000L)
        println("World!")
    }
    println("Hello,")
    delay(2000L)
}`}
          expectedOutput={`Hello,
World!`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数のコルーチン</h2>
        <p className="text-gray-400 mb-4">複数のコルーチンを起動して並行実行する例です。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*

fun main() = runBlocking {
    repeat(3) { i ->
        launch {
            delay((i + 1) * 300L)
            println("コルーチン\${i + 1}完了")
        }
    }
    println("全コルーチン起動済み")
    delay(2000L)
}`}
          expectedOutput={`全コルーチン起動済み
コルーチン1完了
コルーチン2完了
コルーチン3完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コルーチンとスレッドの違い</h2>
        <p className="text-gray-400 mb-4">コルーチンはスレッドより軽量で、同じスレッドで複数のコルーチンを実行できます。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*

fun main() = runBlocking {
    val jobs = List(5) { i ->
        launch {
            delay(100L)
            println("ジョブ\${i}: スレッド=\${Thread.currentThread().name}")
        }
    }
    jobs.forEach { it.join() }
    println("全ジョブ完了")
}`}
          expectedOutput={`ジョブ0: スレッド=main
ジョブ1: スレッド=main
ジョブ2: スレッド=main
ジョブ3: スレッド=main
ジョブ4: スレッド=main
全ジョブ完了`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="coroutines" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/coroutines" />
    </div>
  );
}

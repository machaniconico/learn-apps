import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("coroutines");

export default function ChannelsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">コルーチン レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">チャネル</h1>
        <p className="text-gray-400">コルーチン間でデータをやり取りするChannelの種類と使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Channelとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Channelはコルーチン間でデータをやり取りするためのパイプです。
          GoのチャネルやCSPに似た概念で、プロデューサー・コンシューマーパターンを実装できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>send()でデータを送信し、receive()で受信する</li>
          <li>close()でチャネルを閉じる</li>
          <li>for-inループでチャネルを消費できる</li>
          <li>Rendezvouz・Buffered・Unlimited・Conflatedなど種類がある</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なChannelの使い方</h2>
        <p className="text-gray-400 mb-4">send()とreceive()でコルーチン間通信します。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun main() = runBlocking {
    val channel = Channel<Int>()
    launch {
        for (i in 1..5) {
            channel.send(i)
            println("送信: \${i}")
        }
        channel.close()
    }
    for (value in channel) {
        println("受信: \${value}")
    }
    println("完了")
}`}
          expectedOutput={`送信: 1
受信: 1
送信: 2
受信: 2
送信: 3
受信: 3
送信: 4
受信: 4
送信: 5
受信: 5
完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">produceビルダー</h2>
        <p className="text-gray-400 mb-4">produceはReceiveChannelを返すコルーチンビルダーです。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun CoroutineScope.produceNumbers(): ReceiveChannel<Int> = produce {
    for (i in 1..3) {
        delay(100L)
        send(i * i)
    }
}

fun main() = runBlocking {
    val numbers = produceNumbers()
    for (n in numbers) {
        println("受信: \${n}")
    }
}`}
          expectedOutput={`受信: 1
受信: 4
受信: 9`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">バッファ付きChannel</h2>
        <p className="text-gray-400 mb-4">容量を指定するとバッファ付きChannelになり、送信側が先に進めます。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun main() = runBlocking {
    val channel = Channel<Int>(3) // バッファサイズ3
    launch {
        for (i in 1..3) {
            println("送信: \${i}")
            channel.send(i)
        }
        channel.close()
    }
    delay(300L)
    for (value in channel) {
        println("受信: \${value}")
    }
}`}
          expectedOutput={`送信: 1
送信: 2
送信: 3
受信: 1
受信: 2
受信: 3`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="coroutines" lessonId="channels" />
      </div>
      <LessonNav lessons={lessons} currentId="channels" basePath="/learn/coroutines" />
    </div>
  );
}

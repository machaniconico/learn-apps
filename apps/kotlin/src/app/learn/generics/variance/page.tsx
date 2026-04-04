import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("generics");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">ジェネリクス レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">変性（Variance）</h1>
        <p className="text-gray-400">inとoutキーワードを使った共変・反変の概念と使い方を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概念説明</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          変性（Variance）は、型パラメータの継承関係がジェネリック型にどう影響するかを制御します。
          <code className="text-violet-300">out T</code>（共変）: TはProducerとして戻り値のみ。
          <code className="text-violet-300">List&lt;out Number&gt;</code>は<code className="text-violet-300">List&lt;Int&gt;</code>を受け入れます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          <code className="text-violet-300">in T</code>（反変）: TはConsumerとして引数のみ。
          <code className="text-violet-300">Comparable&lt;in Number&gt;</code>は<code className="text-violet-300">Comparable&lt;Int&gt;</code>として使えます。
          変性を付けないものは<strong className="text-white">不変（invariant）</strong>で、型は完全に一致する必要があります。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 1: out（共変）</h2>
        <KotlinEditor
          defaultCode={`interface Producer<out T> {
    fun produce(): T
}

class IntProducer : Producer<Int> {
    override fun produce(): Int = 42
}

fun printNumber(producer: Producer<Number>) {
    println("生産された数値: $\{producer.produce()}")
}

fun main() {
    val intProducer: Producer<Int> = IntProducer()
    // out があるので Producer<Int> を Producer<Number> として渡せる
    printNumber(intProducer)
    println("直接呼び出し: $\{intProducer.produce()}")
}`}
          expectedOutput={`生産された数値: 42
直接呼び出し: 42`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 2: in（反変）</h2>
        <KotlinEditor
          defaultCode={`interface Consumer<in T> {
    fun consume(item: T)
}

class NumberConsumer : Consumer<Number> {
    override fun consume(item: Number) = println("消費: $\{item} ($\{item::class.simpleName})")
}

fun feedInt(consumer: Consumer<Int>, value: Int) {
    consumer.consume(value)
}

fun main() {
    val numConsumer: Consumer<Number> = NumberConsumer()
    // in があるので Consumer<Number> を Consumer<Int> として渡せる
    feedInt(numConsumer, 100)
    numConsumer.consume(3.14)
    numConsumer.consume(42L)
}`}
          expectedOutput={`消費: 100 (Int)
消費: 3.14 (Double)
消費: 42 (Long)`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 3: 使用箇所変性</h2>
        <KotlinEditor
          defaultCode={`fun copyFrom(source: MutableList<out Number>, dest: MutableList<Number>) {
    for (item in source) dest.add(item)
}

fun fill(dest: MutableList<in Int>, value: Int, count: Int) {
    repeat(count) { dest.add(value) }
}

fun main() {
    val ints = mutableListOf(1, 2, 3)
    val numbers = mutableListOf<Number>()
    copyFrom(ints, numbers)
    println("コピー後: $\{numbers}")

    val result = mutableListOf<Number>()
    fill(result, 7, 3)
    println("fill後: $\{result}")
}`}
          expectedOutput={`コピー後: [1, 2, 3]
fill後: [7, 7, 7]`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="generics" lessonId="variance" />
      </div>
      <LessonNav lessons={lessons} currentId="variance" basePath="/learn/generics" />
    </div>
  );
}

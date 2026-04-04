import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function NestedClassesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">クラス レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ネストクラス</h1>
        <p className="text-gray-400">innerなしのネストクラスはJavaのstaticネストクラスに相当します。</p>
      </div>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ネストクラス（staticネスト）</h2>
        <p className="text-gray-400 mb-4">
          Kotlinではinnerキーワードなしのネストクラスは外部クラスへの参照を持ちません。
        </p>
        <KotlinEditor
          defaultCode={`class Order {
    class Item(val name: String, val price: Double, val quantity: Int) {
        val total: Double get() = price * quantity
        override fun toString() = "${"$"}name x${"$"}quantity = ${"$"}{total}円"
    }
}

fun main() {
    val items = listOf(
        Order.Item("りんご", 150.0, 3),
        Order.Item("みかん", 100.0, 5)
    )
    items.forEach { println(it) }
    println("合計: ${"$"}{items.sumOf { it.total }}円")
}`}
          expectedOutput={`りんご x3 = 450.0円
みかん x5 = 500.0円
合計: 950.0円`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">innerとネストの違い</h2>
        <p className="text-gray-400 mb-4">innerクラスは外部クラスのインスタンスが必要ですが、ネストクラスは独立して使えます。</p>
        <KotlinEditor
          defaultCode={`class Engine(private val horsepower: Int) {
    class Specification(val displacement: Double, val cylinders: Int) {
        fun describe() = "${"$"}{displacement}L ${"$"}{cylinders}気筒"
    }
    inner class Performance {
        fun describe() = "${"$"}{horsepower}馬力"
    }
}

fun main() {
    val spec = Engine.Specification(2.0, 4)
    println("仕様: ${"$"}{spec.describe()}")
    val engine = Engine(200)
    println("パフォーマンス: ${"$"}{engine.Performance().describe()}")
}`}
          expectedOutput={`仕様: 2.0L 4気筒
パフォーマンス: 200馬力`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">インターフェースのネスト</h2>
        <p className="text-gray-400 mb-4">クラス内にインターフェースをネストして関連APIをグループ化できます。</p>
        <KotlinEditor
          defaultCode={`class FileProcessor {
    interface Callback {
        fun onSuccess(result: String)
        fun onError(error: String)
    }
    fun process(filename: String, callback: Callback) {
        if (filename.endsWith(".txt")) callback.onSuccess("処理完了: ${"$"}filename")
        else callback.onError("未対応の形式: ${"$"}filename")
    }
}

fun main() {
    val processor = FileProcessor()
    val callback = object : FileProcessor.Callback {
        override fun onSuccess(result: String) = println("成功: ${"$"}result")
        override fun onError(error: String) = println("エラー: ${"$"}error")
    }
    processor.process("data.txt", callback)
    processor.process("image.jpg", callback)
}`}
          expectedOutput={`成功: 処理完了: data.txt
エラー: 未対応の形式: image.jpg`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="nested-classes" />
      </div>
      <LessonNav lessons={lessons} currentId="nested-classes" basePath="/learn/classes" />
    </div>
  );
}

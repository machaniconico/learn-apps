import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function StrategyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">デザインパターン レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ストラテジーパターン</h1>
        <p className="text-gray-400">高階関数とラムダを使ってアルゴリズムを差し替えるストラテジーパターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ストラテジーパターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ストラテジーパターンはアルゴリズムをカプセル化して交換可能にするパターンです。
          Kotlinでは高階関数（関数型）を使うことでインターフェース定義なしに簡潔に実装できます。
          ソート方法、バリデーション、価格計算など、処理の「方法」を動的に切り替える場面で活躍します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>シンプルなケースは (Input) -&gt; Output 型の関数で表現できる</li>
          <li>複数メソッドが必要な場合はインターフェースを使う</li>
          <li>enum classにメソッドを持たせてストラテジーを列挙できる</li>
          <li>sealed classで関連するストラテジーをグループ化できる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">高階関数によるストラテジー</h2>
        <p className="text-gray-400 mb-4">
          関数型を使えばインターフェースを定義せずにストラテジーパターンを実装できます。
        </p>
        <KotlinEditor
          defaultCode={`data class Order(val items: List<Int>) {
    val subtotal: Int get() = items.sum()
}

typealias DiscountStrategy = (Order) -> Int

val noDiscount: DiscountStrategy = { 0 }
val tenPercent: DiscountStrategy = { order -> order.subtotal / 10 }
val flatDiscount: DiscountStrategy = { order -> if (order.subtotal >= 3000) 500 else 0 }
val bulkDiscount: DiscountStrategy = { order ->
    when {
        order.items.size >= 5 -> order.subtotal / 5
        order.items.size >= 3 -> order.subtotal / 10
        else -> 0
    }
}

fun calculateTotal(order: Order, strategy: DiscountStrategy): Int {
    val discount = strategy(order)
    println("小計: ¥\${order.subtotal}, 割引: ¥\${discount}")
    return order.subtotal - discount
}

fun main() {
    val order = Order(listOf(1200, 800, 600, 400, 500))

    println("通常価格: ¥\${calculateTotal(order, noDiscount)}")
    println("10%割引: ¥\${calculateTotal(order, tenPercent)}")
    println("3000円以上500円引: ¥\${calculateTotal(order, flatDiscount)}")
    println("点数割引: ¥\${calculateTotal(order, bulkDiscount)}")
}`}
          expectedOutput={`小計: ¥3500, 割引: ¥0
通常価格: ¥3500
小計: ¥3500, 割引: ¥350
10%割引: ¥3150
小計: ¥3500, 割引: ¥500
3000円以上500円引: ¥3000
小計: ¥3500, 割引: ¥700
点数割引: ¥2800`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">enum classによるストラテジー列挙</h2>
        <p className="text-gray-400 mb-4">
          enum classにメソッドを定義することで、関連するストラテジーを型安全にまとめられます。
        </p>
        <KotlinEditor
          defaultCode={`enum class SortStrategy {
    ASCENDING {
        override fun <T : Comparable<T>> sort(list: List<T>) = list.sorted()
    },
    DESCENDING {
        override fun <T : Comparable<T>> sort(list: List<T>) = list.sortedDescending()
    },
    SHUFFLE {
        override fun <T : Comparable<T>> sort(list: List<T>) = list.shuffled()
    };

    abstract fun <T : Comparable<T>> sort(list: List<T>): List<T>
}

fun main() {
    val numbers = listOf(5, 2, 8, 1, 9, 3, 7)

    println("元のリスト: \${numbers}")
    println("昇順: \${SortStrategy.ASCENDING.sort(numbers)}")
    println("降順: \${SortStrategy.DESCENDING.sort(numbers)}")

    val words = listOf("banana", "apple", "cherry", "date")
    println("\\n単語昇順: \${SortStrategy.ASCENDING.sort(words)}")
    println("単語降順: \${SortStrategy.DESCENDING.sort(words)}")
}`}
          expectedOutput={`元のリスト: [5, 2, 8, 1, 9, 3, 7]
昇順: [1, 2, 3, 5, 7, 8, 9]
降順: [9, 8, 7, 5, 3, 2, 1]

単語昇順: [apple, banana, cherry, date]
単語降順: [date, cherry, banana, apple]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="strategy" />
      </div>
      <LessonNav lessons={lessons} currentId="strategy" basePath="/learn/design" />
    </div>
  );
}

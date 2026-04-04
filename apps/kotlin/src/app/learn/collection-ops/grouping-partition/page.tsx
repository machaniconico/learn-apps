import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collection-ops");

export default function GroupingPartitionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">コレクション操作 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">グルーピング・パーティション</h1>
        <p className="text-gray-400">groupByで分類しpartitionで2分割する操作</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">グルーピングとパーティション</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-300">groupBy</code>はキー関数でコレクションをグループ化し
          Map&lt;K, List&lt;T&gt;&gt;を返します。
          <code className="text-pink-300">partition</code>は条件で
          2つのリスト（trueリスト・falseリスト）に分けます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>groupBy - 複数グループに分類</li>
          <li>partition - true/falseの2グループに分割</li>
          <li>groupingBy + eachCount でカウント集計</li>
          <li>分割代入でpartitionの結果を受け取れる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">groupByの活用</h2>
        <p className="text-gray-400 mb-4">
          複数のグループに分類してMapとして取得します。
        </p>
        <KotlinEditor
          defaultCode={`data class Product(val name: String, val category: String, val price: Int)

fun main() {
    val products = listOf(
        Product("apple", "fruit", 100),
        Product("banana", "fruit", 80),
        Product("carrot", "vegetable", 120),
        Product("tomato", "vegetable", 150),
        Product("orange", "fruit", 90)
    )

    val byCategory = products.groupBy { it.category }
    byCategory.forEach { (cat, items) ->
        println("${"$"}{cat}: ${"$"}{items.map { it.name }}")
    }

    val countByCategory = products.groupingBy { it.category }.eachCount()
    println(countByCategory)
}`}
          expectedOutput={`fruit: [apple, banana, orange]
vegetable: [carrot, tomato]
{fruit=3, vegetable=2}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">partitionで2分割</h2>
        <p className="text-gray-400 mb-4">
          条件を満たす要素と満たさない要素を2つのリストに分けます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val numbers = (1..10).toList()
    val (evens, odds) = numbers.partition { it % 2 == 0 }
    println("偶数: ${"$"}{evens}")
    println("奇数: ${"$"}{odds}")

    val scores = listOf(45, 72, 88, 35, 91, 60, 55)
    val (passed, failed) = scores.partition { it >= 60 }
    println("合格: ${"$"}{passed}")
    println("不合格: ${"$"}{failed}")
}`}
          expectedOutput={`偶数: [2, 4, 6, 8, 10]
奇数: [1, 3, 5, 7, 9]
合格: [72, 88, 91, 60]
不合格: [45, 35, 55]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collection-ops" lessonId="grouping-partition" />
      </div>
      <LessonNav lessons={lessons} currentId="grouping-partition" basePath="/learn/collection-ops" />
    </div>
  );
}

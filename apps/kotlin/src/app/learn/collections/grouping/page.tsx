import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

export default function GroupingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">コレクション レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">グルーピング</h1>
        <p className="text-gray-400">groupByとpartitionを使ったコレクションの分類</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">グルーピングとパーティション</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-green-300">groupBy</code>はコレクションをキーでグループ分けし
          <code className="text-green-300">Map&lt;K, List&lt;T&gt;&gt;</code>を返します。
          <code className="text-green-300">partition</code>は条件でコレクションを2つに分割します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>groupBy(keySelector) - キー関数でグループ化</li>
          <li>partition(predicate) - 条件でtrueとfalseの2リストに分割</li>
          <li>groupingBy()でより高度な集計が可能</li>
          <li>Mapのvaluesは各グループの要素リスト</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">groupByでグループ化</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">groupBy</code>はキー関数に基づいて
          要素をグループ化したMapを返します。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val words = listOf("ant", "bear", "cat", "bee", "apple", "cherry")
    val byFirstLetter = words.groupBy { it.first() }
    println(byFirstLetter)

    val numbers = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    val byParity = numbers.groupBy { if (it % 2 == 0) "even" else "odd" }
    println(byParity)
}`}
          expectedOutput={`{a=[ant, apple], b=[bear, bee], c=[cat, cherry]}
{odd=[1, 3, 5, 7, 9], even=[2, 4, 6, 8, 10]}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">partitionで2分割</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">partition</code>は条件を満たす要素と満たさない要素の
          2つのリストのペアを返します。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val numbers = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    val (evens, odds) = numbers.partition { it % 2 == 0 }
    println("偶数: ${"$"}{evens}")
    println("奇数: ${"$"}{odds}")

    val words = listOf("kotlin", "java", "swift", "rust", "go")
    val (long, short) = words.partition { it.length > 4 }
    println("長い: ${"$"}{long}")
    println("短い: ${"$"}{short}")
}`}
          expectedOutput={`偶数: [2, 4, 6, 8, 10]
奇数: [1, 3, 5, 7, 9]
長い: [kotlin, swift]
短い: [java, rust, go]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collections" lessonId="grouping" />
      </div>
      <LessonNav lessons={lessons} currentId="grouping" basePath="/learn/collections" />
    </div>
  );
}

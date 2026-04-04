import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collection-ops");

export default function FilterMapPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">コレクション操作 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">filter・map</h1>
        <p className="text-gray-400">条件で絞り込むfilterと要素を変換するmap</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">filterとmap</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-300">filter</code>は条件を満たす要素だけを残し、
          <code className="text-pink-300">map</code>は各要素を別の値に変換します。
          これらをチェーンすることでパイプライン的な処理が書けます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>filter(predicate) - 条件を満たす要素を残す</li>
          <li>map(transform) - 各要素を変換する</li>
          <li>filterNot - 条件を満たさない要素を残す</li>
          <li>mapNotNull - nullを除いた変換結果のリスト</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">filterの使い方</h2>
        <p className="text-gray-400 mb-4">
          述語（条件）を渡して条件を満たす要素のみを含む新しいリストを取得します。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val numbers = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

    val evens = numbers.filter { it % 2 == 0 }
    println("偶数: ${"$"}{evens}")

    val bigNums = numbers.filter { it > 5 }
    println("5超: ${"$"}{bigNums}")

    val words = listOf("apple", "banana", "cherry", "date", "elderberry")
    val longWords = words.filter { it.length > 5 }
    println("6文字以上: ${"$"}{longWords}")

    val notEvens = numbers.filterNot { it % 2 == 0 }
    println("奇数: ${"$"}{notEvens}")
}`}
          expectedOutput={`偶数: [2, 4, 6, 8, 10]
5超: [6, 7, 8, 9, 10]
6文字以上: [banana, cherry, elderberry]
奇数: [1, 3, 5, 7, 9]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">mapの使い方</h2>
        <p className="text-gray-400 mb-4">
          各要素を変換してできた新しいリストを返します。
          <code className="text-pink-300">mapNotNull</code>はnullを自動的に除外します。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val names = listOf("alice", "bob", "carol")
    val upper = names.map { it.uppercase() }
    println(upper)

    val numbers = listOf("1", "2", "three", "4", "five")
    val parsed = numbers.mapNotNull { it.toIntOrNull() }
    println(parsed)

    data class User(val name: String, val score: Int)
    val users = listOf(User("Alice", 90), User("Bob", 75), User("Carol", 85))
    val scores = users.map { it.score }
    println(scores)
    println("平均: ${"$"}{scores.average()}")
}`}
          expectedOutput={`[ALICE, BOB, CAROL]
[1, 2, 4]
[90, 75, 85]
平均: 83.33333333333333`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collection-ops" lessonId="filter-map" />
      </div>
      <LessonNav lessons={lessons} currentId="filter-map" basePath="/learn/collection-ops" />
    </div>
  );
}

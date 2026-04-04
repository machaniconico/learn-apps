import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collection-ops");

export default function SortingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">コレクション操作 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ソート</h1>
        <p className="text-gray-400">sorted・sortedBy・sortedWithを使ったコレクションの並び替え</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ソート関数の種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlinのコレクションには複数のソート関数があります。
          自然順序、キー関数、カスタムComparatorで柔軟にソートできます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>sorted() - 自然順序でソート</li>
          <li>sortedDescending() - 逆順でソート</li>
          <li>sortedBy { } - キー関数でソート</li>
          <li>sortedWith(comparator) - カスタムComparatorでソート</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なソート</h2>
        <p className="text-gray-400 mb-4">
          自然順序とキー関数を使ったソートの基本を学びます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val numbers = listOf(5, 2, 8, 1, 9, 3)
    println(numbers.sorted())
    println(numbers.sortedDescending())

    val words = listOf("banana", "apple", "cherry", "date")
    println(words.sorted())
    println(words.sortedByDescending { it.length })
}`}
          expectedOutput={`[1, 2, 3, 5, 8, 9]
[9, 8, 5, 3, 2, 1]
[apple, banana, cherry, date]
[banana, cherry, apple, date]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複合ソート</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-300">compareBy</code>と
          <code className="text-pink-300">thenBy</code>で複数キーのソートができます。
        </p>
        <KotlinEditor
          defaultCode={`data class Student(val name: String, val grade: Int, val score: Int)

fun main() {
    val students = listOf(
        Student("Alice", 2, 90),
        Student("Bob", 1, 85),
        Student("Carol", 2, 88),
        Student("Dave", 1, 92)
    )

    val sorted = students.sortedWith(
        compareBy<Student> { it.grade }.thenByDescending { it.score }
    )

    sorted.forEach { println("${"$"}{it.name}: ${"$"}{it.grade}年 ${"$"}{it.score}点") }
}`}
          expectedOutput={`Dave: 1年 92点
Bob: 1年 85点
Alice: 2年 90点
Carol: 2年 88点`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collection-ops" lessonId="sorting" />
      </div>
      <LessonNav lessons={lessons} currentId="sorting" basePath="/learn/collection-ops" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("data-sealed");

export default function DataClassBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">データクラス・Sealed レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">データクラスの基本</h1>
        <p className="text-gray-400">data classで自動生成されるequals・hashCode・toString</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">data classとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">data class</code>を使うとデータを保持するためのクラスを
          簡潔に定義できます。equals()、hashCode()、toString()、copy()、
          componentN()関数が自動的に生成されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>equals() - プロパティの値で等値比較</li>
          <li>hashCode() - プロパティに基づくハッシュ値</li>
          <li>toString() - プロパティ名と値の文字列表現</li>
          <li>copy() - 一部プロパティを変えた新インスタンス生成</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">自動生成されるメソッド</h2>
        <p className="text-gray-400 mb-4">
          data classに宣言したプロパティを基に各メソッドが自動生成されます。
        </p>
        <KotlinEditor
          defaultCode={`data class User(val name: String, val age: Int, val email: String)

fun main() {
    val user1 = User("Alice", 25, "alice@example.com")
    val user2 = User("Alice", 25, "alice@example.com")
    val user3 = User("Bob", 30, "bob@example.com")

    println(user1)
    println(user1 == user2)
    println(user1 == user3)
    println(user1.hashCode() == user2.hashCode())
}`}
          expectedOutput={`User(name=Alice, age=25, email=alice@example.com)
true
false
true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">data classの制約</h2>
        <p className="text-gray-400 mb-4">
          data classにはいくつかの制約があります。
          プライマリコンストラクタに少なくとも1つのvalまたはvarが必要です。
        </p>
        <KotlinEditor
          defaultCode={`data class Point(val x: Double, val y: Double) {
    fun distanceTo(other: Point): Double {
        val dx = this.x - other.x
        val dy = this.y - other.y
        return Math.sqrt(dx * dx + dy * dy)
    }
}

fun main() {
    val p1 = Point(0.0, 0.0)
    val p2 = Point(3.0, 4.0)
    println(p1)
    println(p2)
    println(p1.distanceTo(p2))
    val p3 = p2.copy(x = 6.0)
    println(p3)
}`}
          expectedOutput={`Point(x=0.0, y=0.0)
Point(x=3.0, y=4.0)
5.0
Point(x=6.0, y=4.0)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="data-sealed" lessonId="data-class-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="data-class-basics" basePath="/learn/data-sealed" />
    </div>
  );
}

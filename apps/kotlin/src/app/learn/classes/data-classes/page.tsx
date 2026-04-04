import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function DataClassesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">クラス レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">データクラス</h1>
        <p className="text-gray-400">data classが自動生成するメソッドと活用パターンを学びます。</p>
      </div>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">data classの自動生成メソッド</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">data class</code>はequals・hashCode・toString・copy・componentN()を自動生成します。
        </p>
        <KotlinEditor
          defaultCode={`data class Point(val x: Int, val y: Int)

fun main() {
    val p1 = Point(3, 4)
    val p2 = Point(3, 4)
    println(p1)
    println(p1 == p2)
    val p3 = p1.copy(y = 10)
    println(p3)
    val (x, y) = p1
    println("x=${"$"}x, y=${"$"}y")
}`}
          expectedOutput={`Point(x=3, y=4)
true
Point(x=3, y=10)
x=3, y=4`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">copyによる不変オブジェクトの更新</h2>
        <p className="text-gray-400 mb-4">copy()は指定したプロパティだけ変更した新しいインスタンスを返します。</p>
        <KotlinEditor
          defaultCode={`data class User(val id: Int, val name: String, val email: String, val isActive: Boolean = true)

fun main() {
    val original = User(1, "田中", "tanaka@example.com")
    println("元: ${"$"}original")
    val updated = original.copy(email = "newtanaka@example.com")
    println("更新: ${"$"}updated")
    val deactivated = original.copy(isActive = false)
    println("無効: ${"$"}deactivated")
}`}
          expectedOutput={`元: User(id=1, name=田中, email=tanaka@example.com, isActive=true)
更新: User(id=1, name=田中, email=newtanaka@example.com, isActive=true)
無効: User(id=1, name=田中, email=tanaka@example.com, isActive=false)`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">data classとコレクション</h2>
        <p className="text-gray-400 mb-4">equals/hashCodeが自動生成されるため、SetやMapのキーとして正しく動作します。</p>
        <KotlinEditor
          defaultCode={`data class Product(val id: Int, val name: String, val price: Double)

fun main() {
    val products = listOf(
        Product(1, "りんご", 150.0),
        Product(2, "みかん", 100.0),
        Product(1, "りんご", 150.0)
    )
    val unique = products.toSet()
    println("ユニーク商品数: ${"$"}{unique.size}")
    products.sortedBy { it.price }.forEach { println("${"$"}{it.name}: ${"$"}{it.price}円") }
}`}
          expectedOutput={`ユニーク商品数: 2
みかん: 100.0円
りんご: 150.0円
りんご: 150.0円`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="data-classes" />
      </div>
      <LessonNav lessons={lessons} currentId="data-classes" basePath="/learn/classes" />
    </div>
  );
}

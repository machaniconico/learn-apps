import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("null-safety");

export default function SafeCastPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">Null安全 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">セーフキャスト</h1>
        <p className="text-gray-400">as?演算子でNull安全な型キャストを行う方法を学びます。</p>
      </div>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">as?の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-300">as?</code>はキャストが失敗した場合に例外の代わりにnullを返します。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val obj: Any = "Hello, Kotlin"
    val str: String? = obj as? String
    println(str)
    println(str?.length)

    val num: Int? = obj as? Int
    println(num)
}`}
          expectedOutput={`Hello, Kotlin
13
null`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">as?とクラス階層</h2>
        <p className="text-gray-400 mb-4">as?はクラス階層での型変換に便利です。</p>
        <KotlinEditor
          defaultCode={`open class Shape
class Circle(val radius: Double) : Shape()
class Rectangle(val width: Double, val height: Double) : Shape()

fun describeShape(shape: Shape) {
    val circle = shape as? Circle
    val rect = shape as? Rectangle
    circle?.let { println("円: 半径 = ${"$"}{it.radius}") }
    rect?.let { println("長方形: ${"$"}{it.width} x ${"$"}{it.height}") }
}

fun main() {
    describeShape(Circle(5.0))
    describeShape(Rectangle(4.0, 6.0))
}`}
          expectedOutput={`円: 半径 = 5.0
長方形: 4.0 x 6.0`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コレクションでのセーフキャスト</h2>
        <p className="text-gray-400 mb-4">mapNotNullとas?を組み合わせて特定の型だけを取り出せます。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val items: List<Any> = listOf(1, "hello", 3.14, "world", 42, true)
    val strings = items.mapNotNull { it as? String }
    println("文字列: ${"$"}strings")
    val ints = items.mapNotNull { it as? Int }
    println("整数: ${"$"}ints")
}`}
          expectedOutput={`文字列: [hello, world]
整数: [1, 42]`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="null-safety" lessonId="safe-cast" />
      </div>
      <LessonNav lessons={lessons} currentId="safe-cast" basePath="/learn/null-safety" />
    </div>
  );
}

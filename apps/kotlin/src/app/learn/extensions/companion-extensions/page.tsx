import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("extensions");

export default function CompanionExtensionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">拡張関数 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コンパニオン拡張</h1>
        <p className="text-gray-400">companion objectに対する拡張関数の定義</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コンパニオン拡張とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          companion objectを持つクラスには、そのcompanion objectに対して
          拡張関数を定義できます。クラス名で直接呼び出せるため、
          ファクトリメソッドのように使えます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>fun クラス名.Companion.関数名() の形式で定義</li>
          <li>クラス名.関数名() で呼び出せる</li>
          <li>ファクトリメソッドの追加に使える</li>
          <li>companion objectが必要</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コンパニオン拡張の定義</h2>
        <p className="text-gray-400 mb-4">
          companion objectを持つクラスに外部からファクトリメソッドを追加できます。
        </p>
        <KotlinEditor
          defaultCode={`class Color(val r: Int, val g: Int, val b: Int) {
    companion object
    override fun toString() = "Color(${"$"}{r}, ${"$"}{g}, ${"$"}{b})"
}

fun Color.Companion.red() = Color(255, 0, 0)
fun Color.Companion.green() = Color(0, 255, 0)
fun Color.Companion.blue() = Color(0, 0, 255)

fun main() {
    println(Color.red())
    println(Color.green())
    println(Color.blue())
}`}
          expectedOutput={`Color(255, 0, 0)
Color(0, 255, 0)
Color(0, 0, 255)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ユーティリティ関数としての活用</h2>
        <p className="text-gray-400 mb-4">
          コンパニオン拡張でユーティリティ的なファクトリ関数を分離できます。
        </p>
        <KotlinEditor
          defaultCode={`data class Ratio(val numerator: Int, val denominator: Int) {
    companion object
    override fun toString() = "${"$"}{numerator}/${"$"}{denominator}"
}

fun Ratio.Companion.of(value: Int) = Ratio(value, 1)
fun Ratio.Companion.half() = Ratio(1, 2)

fun main() {
    println(Ratio.of(3))
    println(Ratio.half())
    println(Ratio(3, 4))
}`}
          expectedOutput={`3/1
1/2
3/4`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="extensions" lessonId="companion-extensions" />
      </div>
      <LessonNav lessons={lessons} currentId="companion-extensions" basePath="/learn/extensions" />
    </div>
  );
}

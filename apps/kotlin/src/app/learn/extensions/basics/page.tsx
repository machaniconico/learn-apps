import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("extensions");

export default function ExtensionBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">拡張関数 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">拡張関数の基本</h1>
        <p className="text-gray-400">既存クラスを変更せずにメソッドを追加する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">拡張関数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          拡張関数を使うと、既存のクラスを継承したりラッパークラスを作ったりせずに
          新しいメソッドを追加できます。
          <code className="text-cyan-300">fun レシーバ型.関数名()</code>の形式で定義します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>既存クラスを変更せずにメソッドを追加</li>
          <li>thisでレシーバオブジェクトにアクセス</li>
          <li>任意のクラスに拡張関数を定義できる</li>
          <li>メンバー関数と同じ構文で呼び出せる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な拡張関数</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">String</code>や<code className="text-cyan-300">Int</code>などの
          標準クラスに拡張関数を追加できます。
        </p>
        <KotlinEditor
          defaultCode={`fun String.shout(): String = this.uppercase() + "!!!"

fun Int.isPositive(): Boolean = this > 0

fun String.addPrefix(prefix: String): String = "${"$"}{prefix}${"$"}{this}"

fun main() {
    println("hello".shout())
    println((-5).isPositive())
    println(42.isPositive())
    println("Kotlin".addPrefix("I love "))
}`}
          expectedOutput={`HELLO!!!
false
true
I love Kotlin`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カスタムクラスへの拡張</h2>
        <p className="text-gray-400 mb-4">
          自作クラスにも拡張関数を追加できます。
          クラス定義を変更せずに機能を追加できます。
        </p>
        <KotlinEditor
          defaultCode={`data class Point(val x: Int, val y: Int)

fun Point.distanceFromOrigin(): Double {
    return Math.sqrt((x * x + y * y).toDouble())
}

fun Point.translate(dx: Int, dy: Int): Point {
    return Point(x + dx, y + dy)
}

fun main() {
    val p = Point(3, 4)
    println(p.distanceFromOrigin())
    println(p.translate(1, 2))
}`}
          expectedOutput={`5.0
Point(x=4, y=6)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="extensions" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/extensions" />
    </div>
  );
}

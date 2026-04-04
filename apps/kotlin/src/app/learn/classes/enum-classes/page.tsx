import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">クラス基礎 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">列挙型クラス</h1>
        <p className="text-gray-400">enum classを使った列挙型の定義とプロパティ・メソッドの追加を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概念説明</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-violet-300">enum class</code>は定義済みの定数の集合を表します。
          単純な定数だけでなく、各定数にプロパティやメソッドを持たせることができます。
          <code className="text-violet-300">name</code>プロパティで定数名を、
          <code className="text-violet-300">ordinal</code>プロパティで順番を取得できます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          <code className="text-violet-300">values()</code>で全定数の配列を取得し、
          <code className="text-violet-300">valueOf()</code>で名前から定数を取得できます。
          <code className="text-violet-300">when</code>式と組み合わせると網羅的な分岐処理が書けます。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 1: プロパティ付きenum</h2>
        <KotlinEditor
          defaultCode={`enum class Planet(val mass: Double, val radius: Double) {
    MERCURY(3.303e+23, 2.4397e6),
    VENUS(4.869e+24, 6.0518e6),
    EARTH(5.976e+24, 6.37814e6);

    val gravity: Double
        get() = 6.67300e-11 * mass / (radius * radius)
}

fun main() {
    for (planet in Planet.values()) {
        println("$\{planet.name}: 重力=%.2f m/s²".format(planet.gravity))
    }
}`}
          expectedOutput={`MERCURY: 重力=3.70 m/s²
VENUS: 重力=8.87 m/s²
EARTH: 重力=9.80 m/s²`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 2: メソッド付きenumとwhen</h2>
        <KotlinEditor
          defaultCode={`enum class TrafficLight {
    RED, YELLOW, GREEN;

    fun next(): TrafficLight = when (this) {
        RED -> GREEN
        GREEN -> YELLOW
        YELLOW -> RED
    }

    fun message(): String = when (this) {
        RED -> "止まれ"
        YELLOW -> "注意"
        GREEN -> "進め"
    }
}

fun main() {
    var light = TrafficLight.RED
    repeat(4) {
        println("$\{light.name}: $\{light.message()}")
        light = light.next()
    }
}`}
          expectedOutput={`RED: 止まれ
GREEN: 進め
YELLOW: 注意
RED: 止まれ`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="enum-classes" />
      </div>
      <LessonNav lessons={lessons} currentId="enum-classes" basePath="/learn/classes" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function InheritanceBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">継承 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">継承の基本</h1>
        <p className="text-gray-400">Kotlinの継承モデルの概要とコロン記法による継承の構文を学びます。</p>
      </div>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Anyからの継承</h2>
        <p className="text-gray-400 mb-4">すべてのクラスが暗黙的にAnyを継承します。Anyのメソッドはどのクラスでも使えます。</p>
        <KotlinEditor
          defaultCode={`class MyClass { fun greet() = "こんにちは" }

fun main() {
    val obj = MyClass()
    println(obj is MyClass)
    println(obj is Any)
}`}
          expectedOutput={`true
true`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">継承の基本構文</h2>
        <p className="text-gray-400 mb-4">
          親クラスのコンストラクタはコロンの後に呼び出します。
        </p>
        <KotlinEditor
          defaultCode={`open class Shape(val color: String) {
    open fun shapeName(): String = "形"
    open fun area(): Double = 0.0
    fun describe() = println("${"$"}{color}の${"$"}{shapeName()}: 面積 ${"$"}{"%.2f".format(area())}")
}

class Circle(color: String, val radius: Double) : Shape(color) {
    override fun shapeName() = "円"
    override fun area() = Math.PI * radius * radius
}

class Square(color: String, val side: Double) : Shape(color) {
    override fun shapeName() = "正方形"
    override fun area() = side * side
}

fun main() {
    Circle("赤", 5.0).describe()
    Square("青", 4.0).describe()
}`}
          expectedOutput={`赤の円: 面積 78.54
青の正方形: 面積 16.00`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">superキーワード</h2>
        <p className="text-gray-400 mb-4">super.メソッド名()で親クラスの実装を呼び出せます。</p>
        <KotlinEditor
          defaultCode={`open class Logger {
    open fun log(message: String) = println("[LOG] ${"$"}message")
}

class TimestampLogger : Logger() {
    override fun log(message: String) {
        super.log(message)
        println("  タイムスタンプ: 2024-01-01 12:00:00")
    }
}

fun main() {
    val logger = TimestampLogger()
    logger.log("アプリ起動")
}`}
          expectedOutput={`[LOG] アプリ起動
  タイムスタンプ: 2024-01-01 12:00:00`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/inheritance" />
    </div>
  );
}

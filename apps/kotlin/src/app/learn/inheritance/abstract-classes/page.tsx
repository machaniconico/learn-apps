import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function AbstractClassesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">継承 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">抽象クラス</h1>
        <p className="text-gray-400">abstract classで抽象メソッドを定義し、サブクラスに実装を強制します。</p>
      </div>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">抽象クラスの定義</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">abstract class</code>はインスタンス化できないクラスです。abstractメソッドはサブクラスでの実装が必須です。
        </p>
        <KotlinEditor
          defaultCode={`abstract class Payment {
    abstract val amount: Double
    abstract fun process(): Boolean
    abstract fun getDescription(): String

    fun printReceipt() {
        if (process()) {
            println("領収書: ${"$"}{getDescription()}")
            println("金額: ${"$"}amount 円")
        }
    }
}

class CreditCardPayment(override val amount: Double, val cardNumber: String) : Payment() {
    override fun process(): Boolean { println("カード処理: *${"$"}{cardNumber.takeLast(4)}"); return true }
    override fun getDescription() = "クレジットカード払い"
}

fun main() {
    CreditCardPayment(5000.0, "1234-5678-9012-3456").printReceipt()
}`}
          expectedOutput={`カード処理: *3456
領収書: クレジットカード払い
金額: 5000.0 円`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テンプレートメソッドパターン</h2>
        <p className="text-gray-400 mb-4">アルゴリズムの骨格を親クラスで定義し、具体的な手順をサブクラスに委ねます。</p>
        <KotlinEditor
          defaultCode={`abstract class DataProcessor {
    fun execute(data: String) {
        val validated = validate(data)
        val processed = process(validated)
        output(processed)
    }
    abstract fun validate(data: String): String
    abstract fun process(data: String): String
    abstract fun output(result: String)
}

class UpperCaseProcessor : DataProcessor() {
    override fun validate(data: String) = data.trim()
    override fun process(data: String) = data.uppercase()
    override fun output(result: String) = println("大文字: ${"$"}result")
}

fun main() {
    UpperCaseProcessor().execute("  Hello Kotlin  ")
}`}
          expectedOutput={`大文字: HELLO KOTLIN`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">抽象クラスとインターフェースの違い</h2>
        <p className="text-gray-400 mb-4">抽象クラスは状態（フィールド）を持てますが、単一継承のみです。</p>
        <KotlinEditor
          defaultCode={`abstract class Vehicle(val brand: String) {
    var speed: Int = 0
    abstract fun accelerate(amount: Int)
    fun status() = "${"$"}brand: ${"$"}{speed}km/h"
}

class ElectricCar(brand: String, val batteryLevel: Int) : Vehicle(brand) {
    override fun accelerate(amount: Int) {
        if (batteryLevel > 20) { speed += amount; println("加速: ${"$"}{status()}") }
        else println("バッテリー不足")
    }
}

fun main() {
    val car = ElectricCar("Tesla", 80)
    car.accelerate(30)
    car.accelerate(50)
}`}
          expectedOutput={`加速: Tesla: 30km/h
加速: Tesla: 80km/h`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="abstract-classes" />
      </div>
      <LessonNav lessons={lessons} currentId="abstract-classes" basePath="/learn/inheritance" />
    </div>
  );
}

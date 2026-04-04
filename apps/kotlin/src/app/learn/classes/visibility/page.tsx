import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function VisibilityPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">クラス レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">可視性修飾子</h1>
        <p className="text-gray-400">public・private・protected・internalの4つの可視性修飾子を学びます。</p>
      </div>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">可視性修飾子の概要</h2>
        <p className="text-gray-400 mb-4">Kotlinのデフォルトはpublicです。private・protected・internalも使えます。</p>
        <KotlinEditor
          defaultCode={`class Account(
    val id: Int,
    private val password: String,
    internal val accountNumber: String,
    val ownerName: String
) {
    private fun validatePassword(input: String) = input == password

    fun login(input: String): Boolean {
        val result = validatePassword(input)
        println("ログイン${"$"}{if (result) "成功" else "失敗"}: ${"$"}ownerName")
        return result
    }
}

fun main() {
    val account = Account(1, "secret123", "ACC-001", "田中")
    println("口座名義: ${"$"}{account.ownerName}")
    account.login("secret123")
    account.login("wrong")
}`}
          expectedOutput={`口座名義: 田中
ログイン成功: 田中
ログイン失敗: 田中`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">protectedと継承</h2>
        <p className="text-gray-400 mb-4">protectedはクラスとそのサブクラスからのみアクセスできます。</p>
        <KotlinEditor
          defaultCode={`open class Vehicle(val brand: String) {
    protected var fuelLevel: Int = 100
    protected fun consumeFuel(amount: Int) { fuelLevel = maxOf(0, fuelLevel - amount) }
    fun getFuelStatus() = "燃料: ${"$"}{fuelLevel}%"
}

class Car(brand: String) : Vehicle(brand) {
    fun drive(km: Int) {
        consumeFuel(km / 10)
        println("${"$"}brand が ${"$"}{km}km 走行。${"$"}{getFuelStatus()}")
    }
}

fun main() {
    val car = Car("Toyota")
    car.drive(100)
    car.drive(200)
}`}
          expectedOutput={`Toyota が 100km 走行。燃料: 90%
Toyota が 200km 走行。燃料: 70%`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">トップレベルの可視性</h2>
        <p className="text-gray-400 mb-4">トップレベル宣言にもprivateとinternalが使えます。</p>
        <KotlinEditor
          defaultCode={`private fun helperFunction(): String = "内部ヘルパー"
internal fun moduleHelper(): String = "モジュールヘルパー"
fun publicFunction(): String = "公開関数"

fun main() {
    println(helperFunction())
    println(moduleHelper())
    println(publicFunction())
}`}
          expectedOutput={`内部ヘルパー
モジュールヘルパー
公開関数`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="visibility" />
      </div>
      <LessonNav lessons={lessons} currentId="visibility" basePath="/learn/classes" />
    </div>
  );
}

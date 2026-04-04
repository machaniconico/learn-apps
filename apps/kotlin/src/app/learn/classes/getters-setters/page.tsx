import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function GettersSettersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">クラス レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ゲッター・セッター</h1>
        <p className="text-gray-400">カスタムゲッターとセッターを定義してプロパティアクセスをコントロールします。</p>
      </div>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カスタムゲッター</h2>
        <p className="text-gray-400 mb-4"><code className="text-red-300">get()</code>ブロックでプロパティの読み取り時の動作を定義できます。</p>
        <KotlinEditor
          defaultCode={`class Rectangle(val width: Double, val height: Double) {
    val area: Double get() = width * height
    val perimeter: Double get() = 2 * (width + height)
    val isSquare: Boolean get() = width == height
}

fun main() {
    val rect = Rectangle(3.0, 4.0)
    println("面積: ${"$"}{rect.area}")
    println("周長: ${"$"}{rect.perimeter}")
    println("正方形か: ${"$"}{rect.isSquare}")
}`}
          expectedOutput={`面積: 12.0
周長: 14.0
正方形か: false`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カスタムセッター</h2>
        <p className="text-gray-400 mb-4"><code className="text-red-300">set(value)</code>ブロックでプロパティへの書き込み時の動作を定義できます。</p>
        <KotlinEditor
          defaultCode={`class Person(val name: String) {
    var age: Int = 0
        set(value) {
            require(value >= 0) { "年齢は0以上でなければなりません" }
            field = value
        }
    var email: String = ""
        set(value) {
            require(value.contains("@")) { "無効なメールアドレスです" }
            field = value.lowercase()
        }
}

fun main() {
    val person = Person("田中")
    person.age = 30
    person.email = "Tanaka@Example.COM"
    println("${"$"}{person.name}: ${"$"}{person.age}歳, ${"$"}{person.email}")
}`}
          expectedOutput={`田中: 30歳, tanaka@example.com`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">private set</h2>
        <p className="text-gray-400 mb-4">セッターだけprivateにすることで、クラス外からの書き込みを防げます。</p>
        <KotlinEditor
          defaultCode={`class BankAccount(initialBalance: Double) {
    var balance: Double = initialBalance
        private set

    fun deposit(amount: Double) {
        require(amount > 0)
        balance += amount
        println("入金: ${"$"}{amount}円 -> 残高: ${"$"}{balance}円")
    }

    fun withdraw(amount: Double) {
        require(amount <= balance) { "残高不足" }
        balance -= amount
        println("出金: ${"$"}{amount}円 -> 残高: ${"$"}{balance}円")
    }
}

fun main() {
    val account = BankAccount(10000.0)
    account.deposit(5000.0)
    account.withdraw(3000.0)
}`}
          expectedOutput={`入金: 5000.0円 -> 残高: 15000.0円
出金: 3000.0円 -> 残高: 12000.0円`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="getters-setters" />
      </div>
      <LessonNav lessons={lessons} currentId="getters-setters" basePath="/learn/classes" />
    </div>
  );
}

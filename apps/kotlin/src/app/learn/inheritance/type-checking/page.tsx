import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function TypeCheckingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">継承 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">型チェック</h1>
        <p className="text-gray-400">isとasによる型の確認、スマートキャスト、型変換を学びます。</p>
      </div>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">is演算子とスマートキャスト</h2>
        <p className="text-gray-400 mb-4">isで型チェックした後、スコープ内では自動的にその型にキャストされます（スマートキャスト）。</p>
        <KotlinEditor
          defaultCode={`open class Animal(val name: String)
class Dog(name: String) : Animal(name) { fun fetch() = "${"$"}name がボールを取ってきた！" }
class Cat(name: String) : Animal(name) { fun purr() = "${"$"}name がゴロゴロ言っている" }

fun interact(animal: Animal) {
    println("動物: ${"$"}{animal.name}")
    if (animal is Dog) println(animal.fetch())
    else if (animal is Cat) println(animal.purr())
}

fun main() {
    interact(Dog("ポチ"))
    interact(Cat("タマ"))
}`}
          expectedOutput={`動物: ポチ
ポチ がボールを取ってきた！
動物: タマ
タマ がゴロゴロ言っている`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">when式での型チェック</h2>
        <p className="text-gray-400 mb-4">when式でis演算子を使うと読みやすいパターンマッチができます。</p>
        <KotlinEditor
          defaultCode={`fun describe(obj: Any): String = when (obj) {
    is Int    -> "整数: ${"$"}obj"
    is String -> "文字列(${"$"}{obj.length}文字): ${"$"}obj"
    is List<*> -> "リスト(${"$"}{obj.size}要素)"
    is Boolean -> "真偽値: ${"$"}obj"
    else      -> "不明: ${"$"}{obj::class.simpleName}"
}

fun main() {
    listOf(42, "こんにちは", listOf(1, 2, 3), true, 3.14).forEach { println(describe(it)) }
}`}
          expectedOutput={`整数: 42
文字列(5文字): こんにちは
リスト(3要素)
真偽値: true
不明: Double`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">asとas?</h2>
        <p className="text-gray-400 mb-4">asは強制キャスト、as?はセーフキャスト（失敗するとnull）です。</p>
        <KotlinEditor
          defaultCode={`open class Vehicle(val brand: String)
class Car(brand: String, val doors: Int) : Vehicle(brand)
class Truck(brand: String, val payload: Double) : Vehicle(brand)

fun getInfo(vehicle: Vehicle): String = when {
    vehicle is Car   -> "${"$"}{vehicle.brand} (${"$"}{vehicle.doors}ドア)"
    vehicle is Truck -> "${"$"}{vehicle.brand} (${"$"}{vehicle.payload}t積載)"
    else             -> "${"$"}{vehicle.brand} (不明)"
}

fun main() {
    listOf(Car("Toyota", 4), Truck("Isuzu", 2.5), Vehicle("Unknown"))
        .forEach { println(getInfo(it)) }
}`}
          expectedOutput={`Toyota (4ドア)
Isuzu (2.5t積載)
Unknown (不明)`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="type-checking" />
      </div>
      <LessonNav lessons={lessons} currentId="type-checking" basePath="/learn/inheritance" />
    </div>
  );
}

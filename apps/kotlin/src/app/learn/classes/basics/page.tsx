import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function ClassBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">クラス レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">クラスの基本</h1>
        <p className="text-gray-400">classキーワードでクラスを定義し、インスタンスを生成する基本を学びます。</p>
      </div>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">クラスの定義とインスタンス生成</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">class</code>キーワードでクラスを定義します。Kotlinではnewキーワードなしでインスタンスを生成できます。
        </p>
        <KotlinEditor
          defaultCode={`class Dog {
    var name: String = ""
    var breed: String = ""
    fun bark() = println("${"$"}name: ワン！")
    fun describe() = println("名前: ${"$"}name, 犬種: ${"$"}breed")
}

fun main() {
    val dog = Dog()
    dog.name = "ポチ"
    dog.breed = "柴犬"
    dog.describe()
    dog.bark()
}`}
          expectedOutput={`名前: ポチ, 犬種: 柴犬
ポチ: ワン！`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">プライマリコンストラクタ付きクラス</h2>
        <p className="text-gray-400 mb-4">
          クラス名の後にコンストラクタパラメータを定義できます。val/varを付けるとプロパティになります。
        </p>
        <KotlinEditor
          defaultCode={`class Person(val name: String, val age: Int) {
    fun introduce() = println("はじめまして。${"$"}{name}です。${"$"}{age}歳です。")
}

fun main() {
    val p1 = Person("田中", 30)
    val p2 = Person("山田", 25)
    p1.introduce()
    p2.introduce()
    println("名前: ${"$"}{p1.name}")
}`}
          expectedOutput={`はじめまして。田中です。30歳です。
はじめまして。山田です。25歳です。
名前: 田中`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">initブロック</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">init</code>ブロックはインスタンス生成時に実行される初期化コードです。
        </p>
        <KotlinEditor
          defaultCode={`class Circle(val radius: Double) {
    val area: Double
    init {
        require(radius > 0) { "半径は正の数でなければなりません" }
        area = Math.PI * radius * radius
        println("円が生成されました: 半径 = ${"$"}radius")
    }
}

fun main() {
    val c = Circle(5.0)
    println("面積: ${"$"}{"%.2f".format(c.area)}")
}`}
          expectedOutput={`円が生成されました: 半径 = 5.0
面積: 78.54`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/classes" />
    </div>
  );
}

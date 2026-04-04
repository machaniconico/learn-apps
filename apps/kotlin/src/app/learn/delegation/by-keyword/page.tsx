import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("delegation");

export default function ByKeywordPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">委譲 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">byキーワード</h1>
        <p className="text-gray-400">byキーワードを使ってインターフェースの実装を別クラスに委譲する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">byキーワードによる委譲</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlinのbyキーワードを使うと、インターフェースの実装を自動的に
          指定したオブジェクトに委譲できます。ボイラープレートコードが不要になります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>class Foo(bar: Bar) : Interface by bar と書く</li>
          <li>Interfaceのすべてのメソッドが自動的にbarに委譲される</li>
          <li>特定のメソッドだけオーバーライドして動作を変更できる</li>
          <li>手動委譲と比べてコードが大幅に削減できる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">byによる自動委譲</h2>
        <p className="text-gray-400 mb-4">byキーワードでインターフェース実装を委譲します。</p>
        <KotlinEditor
          defaultCode={`interface Sound {
    fun makeSound(): String
    fun describe(): String
}

class Dog : Sound {
    override fun makeSound() = "ワンワン"
    override fun describe() = "犬"
}

// byキーワードでSoundの実装をDogに委譲
class Robot(animal: Sound) : Sound by animal {
    // describeだけオーバーライド
    override fun describe() = "ロボット（\${super.makeSound()}を模倣）"
}

fun main() {
    val dog = Dog()
    println(dog.makeSound())
    println(dog.describe())

    val robot = Robot(dog)
    println(robot.makeSound())  // Dogに委譲
    println(robot.describe())   // オーバーライドしたもの
}`}
          expectedOutput={`ワンワン
犬
ワンワン
ロボット（ワンワンを模倣）`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数インターフェースの委譲</h2>
        <p className="text-gray-400 mb-4">複数のインターフェースをそれぞれ異なるオブジェクトに委譲できます。</p>
        <KotlinEditor
          defaultCode={`interface Flyable { fun fly(): String }
interface Swimmable { fun swim(): String }

class Bird : Flyable { override fun fly() = "羽ばたいて飛ぶ" }
class Fish : Swimmable { override fun swim() = "ひれで泳ぐ" }

class Duck(
    flyable: Flyable = Bird(),
    swimmable: Swimmable = Fish()
) : Flyable by flyable, Swimmable by swimmable

fun main() {
    val duck = Duck()
    println("飛び方: \${duck.fly()}")
    println("泳ぎ方: \${duck.swim()}")
}`}
          expectedOutput={`飛び方: 羽ばたいて飛ぶ
泳ぎ方: ひれで泳ぐ`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="delegation" lessonId="by-keyword" />
      </div>
      <LessonNav lessons={lessons} currentId="by-keyword" basePath="/learn/delegation" />
    </div>
  );
}

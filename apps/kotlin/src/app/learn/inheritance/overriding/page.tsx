import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function OverridingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">継承 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">オーバーライド</h1>
        <p className="text-gray-400">メソッドとプロパティのオーバーライド方法とsuperの使い方を学びます。</p>
      </div>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">メソッドのオーバーライド</h2>
        <p className="text-gray-400 mb-4">overrideキーワードはオーバーライドを明示します。親側にopen、子側にoverrideが必須です。</p>
        <KotlinEditor
          defaultCode={`open class Animal {
    open fun makeSound(): String = "..."
    open fun move(): String = "移動する"
    fun describe() = println("${"$"}{makeSound()} しながら ${"$"}{move()}")
}

class Dog : Animal() {
    override fun makeSound() = "ワンワン"
    override fun move() = "走る"
}

class Bird : Animal() {
    override fun makeSound() = "チュンチュン"
    override fun move() = "飛ぶ"
}

fun main() {
    listOf(Dog(), Bird(), Animal()).forEach { it.describe() }
}`}
          expectedOutput={`ワンワン しながら 走る
チュンチュン しながら 飛ぶ
... しながら 移動する`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">プロパティのオーバーライド</h2>
        <p className="text-gray-400 mb-4">プロパティもオーバーライドできます。valをvarでオーバーライドすることも可能です。</p>
        <KotlinEditor
          defaultCode={`open class Shape { open val sides: Int = 0; open val name: String = "図形" }
class Triangle : Shape() { override val sides = 3; override val name = "三角形" }
class Pentagon : Shape() { override val sides = 5; override val name = "五角形" }

fun main() {
    listOf(Triangle(), Pentagon(), Shape()).forEach {
        println("${"$"}{it.name}: ${"$"}{it.sides}辺")
    }
}`}
          expectedOutput={`三角形: 3辺
五角形: 5辺
図形: 0辺`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">superとオーバーライド</h2>
        <p className="text-gray-400 mb-4">superで親クラスの実装を呼び出しながら機能を拡張できます。</p>
        <KotlinEditor
          defaultCode={`open class Validator { open fun validate(input: String) = input.isNotEmpty() }

class EmailValidator : Validator() {
    override fun validate(input: String) = super.validate(input) && input.contains("@")
}

fun main() {
    val v = EmailValidator()
    listOf("test@example.com", "invalid", "").forEach { email ->
        println("${"$"}email: ${"$"}{if (v.validate(email)) "有効" else "無効"}")
    }
}`}
          expectedOutput={`test@example.com: 有効
invalid: 無効
: 無効`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="overriding" />
      </div>
      <LessonNav lessons={lessons} currentId="overriding" basePath="/learn/inheritance" />
    </div>
  );
}

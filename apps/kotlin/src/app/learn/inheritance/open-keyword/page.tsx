import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function OpenKeywordPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">継承 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">openキーワード</h1>
        <p className="text-gray-400">Kotlinのデフォルトfinalとopenキーワードによる継承許可を学びます。</p>
      </div>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">デフォルトfinalとopen</h2>
        <p className="text-gray-400 mb-4">
          Kotlinではすべてのクラスとメソッドがデフォルトでfinalです。openキーワードが継承・オーバーライドを許可します。
        </p>
        <KotlinEditor
          defaultCode={`open class OpenClass {
    open fun overridable() = "オーバーライド可能"
    fun nonOverridable() = "オーバーライド不可"
}

class SubClass : OpenClass() {
    override fun overridable() = "オーバーライドされた"
}

fun main() {
    val sub = SubClass()
    println(sub.overridable())
    println(sub.nonOverridable())
}`}
          expectedOutput={`オーバーライドされた
オーバーライド不可`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">final overrideでチェーンを止める</h2>
        <p className="text-gray-400 mb-4">
          オーバーライドされたメソッドはデフォルトでまだopenです。final overrideでさらなるオーバーライドを禁止します。
        </p>
        <KotlinEditor
          defaultCode={`open class A { open fun greet() = "A: こんにちは" }
open class B : A() { override fun greet() = "B: こんにちは" }
open class C : B() { final override fun greet() = "C: こんにちは" }
class D : C()  // greet()はオーバーライドできない

fun main() {
    listOf(A(), B(), C(), D()).forEach { println(it.greet()) }
}`}
          expectedOutput={`A: こんにちは
B: こんにちは
C: こんにちは
C: こんにちは`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">openプロパティ</h2>
        <p className="text-gray-400 mb-4">プロパティにもopenを付けることでオーバーライド可能になります。</p>
        <KotlinEditor
          defaultCode={`open class Base {
    open val name: String = "Base"
    open val description: String get() = "基底クラス: ${"$"}name"
}

class Derived : Base() {
    override val name: String = "Derived"
    override val description: String get() = "派生クラス: ${"$"}name"
}

fun main() {
    println(Base().description)
    println(Derived().description)
}`}
          expectedOutput={`基底クラス: Base
派生クラス: Derived`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="open-keyword" />
      </div>
      <LessonNav lessons={lessons} currentId="open-keyword" basePath="/learn/inheritance" />
    </div>
  );
}

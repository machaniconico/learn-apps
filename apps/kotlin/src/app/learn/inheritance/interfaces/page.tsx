import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function InterfacesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">継承 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">インターフェース</h1>
        <p className="text-gray-400">interfaceの定義、実装、デフォルト実装、多重実装を学びます。</p>
      </div>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">インターフェースの基本</h2>
        <p className="text-gray-400 mb-4">interfaceはメソッドのシグネチャを定義します。デフォルト実装を持つこともできます。</p>
        <KotlinEditor
          defaultCode={`interface Printable {
    fun print()
    fun printUpperCase() = println(getContent().uppercase())
    fun getContent(): String
}

interface Saveable { fun save(): Boolean }

class Document(private val content: String) : Printable, Saveable {
    override fun print() = println(content)
    override fun getContent() = content
    override fun save(): Boolean { println("保存中: ${"$"}content"); return true }
}

fun main() {
    val doc = Document("Kotlinプログラミング")
    doc.print()
    doc.printUpperCase()
    doc.save()
}`}
          expectedOutput={`Kotlinプログラミング
KOTLINプログラミング
保存中: Kotlinプログラミング`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">インターフェースのプロパティ</h2>
        <p className="text-gray-400 mb-4">インターフェースにプロパティを定義できますが、バッキングフィールドは持てません。</p>
        <KotlinEditor
          defaultCode={`interface Named {
    val name: String
    val displayName: String get() = "[${"$"}name]"
}

interface Aged {
    val age: Int
    val isAdult: Boolean get() = age >= 18
}

class Person(override val name: String, override val age: Int) : Named, Aged

fun main() {
    val person = Person("田中", 25)
    println(person.displayName)
    println(person.isAdult)
}`}
          expectedOutput={`[田中]
true`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">多重実装の衝突解決</h2>
        <p className="text-gray-400 mb-4">複数のインターフェースが同じメソッドを持つ場合、super&lt;Interface&gt;で特定の実装を呼べます。</p>
        <KotlinEditor
          defaultCode={`interface A { fun greet() = println("A: こんにちは") }
interface B { fun greet() = println("B: こんにちは") }

class C : A, B {
    override fun greet() {
        super<A>.greet()
        super<B>.greet()
        println("C: 両方から継承")
    }
}

fun main() { C().greet() }`}
          expectedOutput={`A: こんにちは
B: こんにちは
C: 両方から継承`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="interfaces" />
      </div>
      <LessonNav lessons={lessons} currentId="interfaces" basePath="/learn/inheritance" />
    </div>
  );
}

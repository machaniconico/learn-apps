import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">継承・インターフェース レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">メソッドのオーバーライド</h1>
        <p className="text-gray-400">親クラスのメソッドをoverrideキーワードで上書きする方法を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概念説明</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          メソッドをオーバーライドするには、親クラス側に<code className="text-violet-300">open</code>を付け、
          子クラス側に<code className="text-violet-300">override</code>を付けます。
          オーバーライドされたメソッドは自動的に<code className="text-violet-300">open</code>になるため、
          さらに子クラスがオーバーライドできます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          これ以上オーバーライドさせたくない場合は<code className="text-violet-300">final override</code>と書きます。
          プロパティもオーバーライドできます（<code className="text-violet-300">val</code>を<code className="text-violet-300">var</code>にすることも可能）。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 1: メソッドオーバーライド</h2>
        <KotlinEditor
          defaultCode={`open class Printer {
    open fun print(text: String) = println("印刷: $\{text}")
    open fun scan() = println("スキャン中...")
}

class ColorPrinter : Printer() {
    override fun print(text: String) = println("カラー印刷: $\{text}")
}

class MultiFunctionPrinter : Printer() {
    override fun print(text: String) = println("高速印刷: $\{text}")
    override fun scan() = println("高解像度スキャン中...")
}

fun main() {
    val printers = listOf(Printer(), ColorPrinter(), MultiFunctionPrinter())
    printers.forEach {
        it.print("文書")
        it.scan()
        println("---")
    }
}`}
          expectedOutput={`印刷: 文書
スキャン中...
---
カラー印刷: 文書
スキャン中...
---
高速印刷: 文書
高解像度スキャン中...
---`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 2: プロパティのオーバーライド</h2>
        <KotlinEditor
          defaultCode={`open class Employee(val name: String) {
    open val baseSalary: Int = 300000
    open fun salary() = baseSalary
}

class Manager(name: String) : Employee(name) {
    override val baseSalary: Int = 500000
    private val bonus = 100000
    override fun salary() = baseSalary + bonus
}

fun main() {
    val emp = Employee("田中")
    val mgr = Manager("佐藤")
    println("$\{emp.name}: $\{emp.salary()}円")
    println("$\{mgr.name}: $\{mgr.salary()}円")
}`}
          expectedOutput={`田中: 300000円
佐藤: 600000円`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 3: final override</h2>
        <KotlinEditor
          defaultCode={`open class Base {
    open fun greet() = "Baseのgreet"
}

open class Middle : Base() {
    final override fun greet() = "Middleのgreet（これ以上オーバーライド不可）"
}

class Child : Middle() {
    // override fun greet() // コンパイルエラーになる
    fun hello() = "Childのhello"
}

fun main() {
    val b = Base()
    val m = Middle()
    val c = Child()
    println(b.greet())
    println(m.greet())
    println(c.greet())
    println(c.hello())
}`}
          expectedOutput={`Baseのgreet
Middleのgreet（これ以上オーバーライド不可）
Middleのgreet（これ以上オーバーライド不可）
Childのhello`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="method-overriding" />
      </div>
      <LessonNav lessons={lessons} currentId="method-overriding" basePath="/learn/inheritance" />
    </div>
  );
}

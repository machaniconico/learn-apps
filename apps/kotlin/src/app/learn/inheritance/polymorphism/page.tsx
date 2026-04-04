import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">継承・インターフェース レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ポリモーフィズム</h1>
        <p className="text-gray-400">継承を活用した多態性の概念と実践的な使い方を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概念説明</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ポリモーフィズム（多態性）とは、同じ型の変数や引数が実行時に異なる実装を持てる性質です。
          親クラスの型で子クラスのインスタンスを扱い、
          オーバーライドされたメソッドが自動的に呼ばれます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          型チェックには<code className="text-violet-300">is</code>演算子を使い、
          スマートキャストによって型チェック後は自動的に変換されます。
          明示的なキャストには<code className="text-violet-300">as</code>（失敗すると例外）や
          <code className="text-violet-300">as?</code>（失敗するとnull）を使います。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 1: 基本的なポリモーフィズム</h2>
        <KotlinEditor
          defaultCode={`abstract class Payment(val amount: Double) {
    abstract fun process(): String
}

class CreditCard(amount: Double, val cardNumber: String) : Payment(amount) {
    override fun process() = "クレジットカード($\{cardNumber.takeLast(4)})で$\{amount}円支払い"
}

class Cash(amount: Double) : Payment(amount) {
    override fun process() = "現金で$\{amount}円支払い"
}

class BankTransfer(amount: Double, val accountId: String) : Payment(amount) {
    override fun process() = "銀行振込($\{accountId})で$\{amount}円支払い"
}

fun main() {
    val payments: List<Payment> = listOf(
        CreditCard(1500.0, "1234567890123456"),
        Cash(800.0),
        BankTransfer(50000.0, "ACC001")
    )
    payments.forEach { println(it.process()) }
    println("合計: $\{payments.sumOf { it.amount }}円")
}`}
          expectedOutput={`クレジットカード(3456)で1500.0円支払い
現金で800.0円支払い
銀行振込(ACC001)で50000.0円支払い
合計: 52300.0円`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 2: isによる型チェックとスマートキャスト</h2>
        <KotlinEditor
          defaultCode={`open class Animal(val name: String) {
    open fun sound() = "..."
}

class Dog(name: String) : Animal(name) {
    override fun sound() = "ワン"
    fun fetch() = "$\{name}がボールを取ってきました"
}

class Cat(name: String) : Animal(name) {
    override fun sound() = "ニャー"
    fun purr() = "$\{name}がゴロゴロ鳴いています"
}

fun describeAnimal(animal: Animal) {
    println("$\{animal.name}: $\{animal.sound()}")
    when (animal) {
        is Dog -> println(animal.fetch())
        is Cat -> println(animal.purr())
    }
}

fun main() {
    listOf(Dog("ポチ"), Cat("タマ"), Dog("シロ")).forEach { describeAnimal(it) }
}`}
          expectedOutput={`ポチ: ワン
ポチがボールを取ってきました
タマ: ニャー
タマがゴロゴロ鳴いています
シロ: ワン
シロがボールを取ってきました`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="polymorphism" />
      </div>
      <LessonNav lessons={lessons} currentId="polymorphism" basePath="/learn/inheritance" />
    </div>
  );
}

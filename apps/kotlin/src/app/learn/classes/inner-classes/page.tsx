import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function InnerClassesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">クラス レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">インナークラス</h1>
        <p className="text-gray-400">inner classキーワードで外部クラスのメンバーにアクセスできるクラスを定義します。</p>
      </div>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">inner classの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">inner</code>キーワードを付けたクラスは外部クラスのインスタンスへの参照を持ちます。
        </p>
        <KotlinEditor
          defaultCode={`class Outer(private val name: String) {
    private val message = "外部クラスのメッセージ"
    inner class Inner {
        fun display() {
            println("外部の名前: ${"$"}name")
            println("外部のメッセージ: ${"$"}message")
        }
    }
}

fun main() {
    val outer = Outer("KotlinApp")
    val inner = outer.Inner()
    inner.display()
}`}
          expectedOutput={`外部の名前: KotlinApp
外部のメッセージ: 外部クラスのメッセージ`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">this@修飾子</h2>
        <p className="text-gray-400 mb-4">
          インナークラス内で外部クラスのthisを参照するには<code className="text-red-300">this@外部クラス名</code>を使います。
        </p>
        <KotlinEditor
          defaultCode={`class Button(val label: String) {
    inner class ClickHandler {
        fun onClick() = println("クリック: ${"$"}{this@Button.label}")
        fun getButton(): Button = this@Button
    }
    fun createHandler() = ClickHandler()
}

fun main() {
    val btn = Button("送信")
    val handler = btn.createHandler()
    handler.onClick()
    println("取得したボタン: ${"$"}{handler.getButton().label}")
}`}
          expectedOutput={`クリック: 送信
取得したボタン: 送信`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">インナークラスの実践例</h2>
        <p className="text-gray-400 mb-4">外部クラスの状態に密接に関連するロジックをカプセル化するのに役立ちます。</p>
        <KotlinEditor
          defaultCode={`class NumberList(private val numbers: List<Int>) {
    inner class Statistics {
        val sum: Int get() = numbers.sum()
        val average: Double get() = numbers.average()
        val max: Int? get() = numbers.maxOrNull()
        fun report() {
            println("件数: ${"$"}{numbers.size}")
            println("合計: ${"$"}sum, 平均: ${"$"}{"%.1f".format(average)}, 最大: ${"$"}max")
        }
    }
    fun getStats() = Statistics()
}

fun main() {
    NumberList(listOf(5, 2, 8, 1, 9, 3, 7)).getStats().report()
}`}
          expectedOutput={`件数: 7
合計: 35, 平均: 5.0, 最大: 9`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="inner-classes" />
      </div>
      <LessonNav lessons={lessons} currentId="inner-classes" basePath="/learn/classes" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

export default function DebuggerBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">デバッグ レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">デバッガの基本</h1>
        <p className="text-gray-400">IntelliJ IDEAのデバッガを使ったKotlinコードのステップ実行方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">IDEデバッガの機能</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          IntelliJ IDEAのデバッガはKotlinコードを対話的にデバッグできます。
          ブレークポイント、ステップ実行、変数ウォッチなどの機能があります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>Step Over (F8): 現在の行を実行して次の行へ</li>
          <li>Step Into (F7): 関数呼び出しの中に入る</li>
          <li>Step Out (Shift+F8): 現在の関数を抜ける</li>
          <li>Evaluate Expression: 任意の式を評価できる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">デバッグしやすいコードの書き方</h2>
        <p className="text-gray-400 mb-4">中間変数を使うとデバッガで各ステップの値を確認しやすくなります。</p>
        <KotlinEditor
          defaultCode={`fun calculateTax(income: Double): Double {
    // 中間変数を使うとデバッガで各値を確認しやすい
    val basicTax = income * 0.1
    val surcharge = if (income > 5000.0) basicTax * 0.1 else 0.0
    val totalTax = basicTax + surcharge
    return totalTax
}

fun main() {
    val income = 8000.0
    val tax = calculateTax(income)
    println("収入: \${income}")
    println("税額: \${tax}")
    println("手取り: \${income - tax}")
}`}
          expectedOutput={`収入: 8000.0
税額: 880.0
手取り: 7120.0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スタックトレースの読み方</h2>
        <p className="text-gray-400 mb-4">例外発生時のスタックトレースからバグの場所を特定します。</p>
        <KotlinEditor
          defaultCode={`fun level3(x: Int): Int {
    return 100 / x  // xが0のとき例外
}

fun level2(x: Int): Int = level3(x)
fun level1(x: Int): Int = level2(x)

fun main() {
    try {
        level1(0)
    } catch (e: ArithmeticException) {
        println("例外: \${e.message}")
        println("スタックトレース（簡略）:")
        println("  at level3() <- ここで発生")
        println("  at level2() <- 呼び出し元")
        println("  at level1() <- 呼び出し元")
        println("  at main()   <- エントリーポイント")
    }
}`}
          expectedOutput={`例外: / by zero
スタックトレース（簡略）:
  at level3() <- ここで発生
  at level2() <- 呼び出し元
  at level1() <- 呼び出し元
  at main()   <- エントリーポイント`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="debug" lessonId="debugger-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="debugger-basics" basePath="/learn/debug" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

export default function PrintDebuggingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">デバッグ レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">printデバッグ</h1>
        <p className="text-gray-400">println、print、logを活用したシンプルなprintデバッグのテクニックを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">printデバッグの基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          printデバッグは最もシンプルなデバッグ手法です。
          変数の値や処理の流れをprintlnで出力して問題を追跡します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>println()で変数名と値を一緒に出力する</li>
          <li>文字列テンプレートで読みやすいデバッグ出力を作る</li>
          <li>also&#123;&#125;でデバッグ出力をチェーンに差し込める</li>
          <li>デバッグが終わったらprintln文を削除する</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なprintデバッグ</h2>
        <p className="text-gray-400 mb-4">変数の状態を出力して処理の流れを追跡します。</p>
        <KotlinEditor
          defaultCode={`fun processNumbers(numbers: List<Int>): Int {
    println("DEBUG: 入力 = \${numbers}")
    val filtered = numbers.filter { it > 0 }
    println("DEBUG: フィルタ後 = \${filtered}")
    val sum = filtered.sum()
    println("DEBUG: 合計 = \${sum}")
    return sum
}

fun main() {
    val result = processNumbers(listOf(-1, 2, -3, 4, 5))
    println("結果: \${result}")
}`}
          expectedOutput={`DEBUG: 入力 = [-1, 2, -3, 4, 5]
DEBUG: フィルタ後 = [2, 4, 5]
DEBUG: 合計 = 11
結果: 11`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">also{}でチェーンデバッグ</h2>
        <p className="text-gray-400 mb-4">also{}を使うとメソッドチェーンを壊さずにデバッグ出力を挿入できます。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val result = listOf(1, 2, 3, 4, 5)
        .also { println("元のリスト: \${it}") }
        .filter { it % 2 != 0 }
        .also { println("奇数のみ: \${it}") }
        .map { it * 2 }
        .also { println("2倍: \${it}") }
        .sum()
    println("最終結果: \${result}")
}`}
          expectedOutput={`元のリスト: [1, 2, 3, 4, 5]
奇数のみ: [1, 3, 5]
2倍: [2, 6, 10]
最終結果: 18`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">デバッグ用ヘルパー関数</h2>
        <p className="text-gray-400 mb-4">デバッグ出力を切り替えられるヘルパー関数を作ると便利です。</p>
        <KotlinEditor
          defaultCode={`val DEBUG = true

fun debugLog(tag: String, message: String) {
    if (DEBUG) println("[$tag] \${message}")
}

fun calculateDiscount(price: Double, rate: Double): Double {
    debugLog("DISCOUNT", "price=\${price}, rate=\${rate}")
    val discount = price * rate
    debugLog("DISCOUNT", "discount=\${discount}")
    return price - discount
}

fun main() {
    val finalPrice = calculateDiscount(1000.0, 0.1)
    println("最終価格: \${finalPrice}")
}`}
          expectedOutput={`[DISCOUNT] price=1000.0, rate=0.1
[DISCOUNT] discount=100.0
最終価格: 900.0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="debug" lessonId="print-debugging" />
      </div>
      <LessonNav lessons={lessons} currentId="print-debugging" basePath="/learn/debug" />
    </div>
  );
}

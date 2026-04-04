import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("exceptions");

export default function TryAsExpressionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">例外処理 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">try式</h1>
        <p className="text-gray-400">tryを式として使って例外時の値をnullや別の値で代替する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">tryは式である</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlinではtryはステートメントではなく式（expression）です。
          tryブロックまたはcatchブロックの最後の値が式の結果になります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>tryブロックの最後の式が正常時の値になる</li>
          <li>catchブロックの最後の式が例外時の値になる</li>
          <li>try式をval/varに代入できる</li>
          <li>finallyブロックの値は結果に含まれない</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">try式の基本</h2>
        <p className="text-gray-400 mb-4">try式の結果を変数に代入します。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val input = "abc"

    // try式: 例外時はnullを返す
    val number: Int? = try {
        input.toInt()
    } catch (e: NumberFormatException) {
        null
    }

    println("変換結果: \${number}")
    println("値か0: \${number ?: 0}")
}`}
          expectedOutput={`変換結果: null
値か0: 0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">try式でデフォルト値を返す</h2>
        <p className="text-gray-400 mb-4">catchブロックでデフォルト値を返してフォールバックを実装します。</p>
        <KotlinEditor
          defaultCode={`fun parseAge(input: String): Int = try {
    val age = input.toInt()
    if (age < 0 || age > 150) throw IllegalArgumentException("範囲外")
    age
} catch (e: NumberFormatException) {
    0
} catch (e: IllegalArgumentException) {
    -1
}

fun main() {
    println(parseAge("25"))   // 正常
    println(parseAge("abc"))  // 数値変換失敗
    println(parseAge("-5"))   // 範囲外
    println(parseAge("200"))  // 範囲外
}`}
          expectedOutput={`25
0
-1
-1`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">runCatchingとtry式の比較</h2>
        <p className="text-gray-400 mb-4">runCatchingはtry式をより関数的に書くための方法です。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val inputs = listOf("10", "abc", "20")

    // try式スタイル
    inputs.forEach { input ->
        val result = try { input.toInt() * 2 } catch (e: Exception) { -1 }
        println("try式: \${result}")
    }

    // runCatchingスタイル
    inputs.forEach { input ->
        val result = runCatching { input.toInt() * 2 }.getOrDefault(-1)
        println("runCatching: \${result}")
    }
}`}
          expectedOutput={`try式: 20
try式: -1
try式: 40
runCatching: 20
runCatching: -1
runCatching: 40`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="exceptions" lessonId="try-as-expression" />
      </div>
      <LessonNav lessons={lessons} currentId="try-as-expression" basePath="/learn/exceptions" />
    </div>
  );
}

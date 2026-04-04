import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lambda");

export default function InlineFunctionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">ラムダ式 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">インライン関数</h1>
        <p className="text-gray-400">inlineキーワードでラムダのオーバーヘッドを削減する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">インライン関数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-300">inline</code>キーワードをつけた高階関数は
          コンパイル時にラムダのコードが呼び出し元に展開されます。
          ラムダオブジェクトの生成コストがなくなりパフォーマンスが改善します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>ラムダオブジェクトの生成を避けられる</li>
          <li>noinline - 特定のラムダをインライン化しない</li>
          <li>crossinline - ラムダからの非ローカルreturnを禁止</li>
          <li>小さい高階関数に使うと効果的</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">inline関数の定義</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-300">inline</code>をつけることでラムダが
          呼び出し元に展開されます。
        </p>
        <KotlinEditor
          defaultCode={`inline fun measureTime(label: String, block: () -> Unit) {
    val start = System.currentTimeMillis()
    block()
    val elapsed = System.currentTimeMillis() - start
    println("${"$"}{label}: ${"$"}{elapsed}ms")
}

inline fun <T> withLogging(value: T, block: (T) -> Unit) {
    println("処理開始: ${"$"}{value}")
    block(value)
    println("処理終了")
}

fun main() {
    measureTime("合計計算") {
        val sum = (1..1000).sum()
        println("sum = ${"$"}{sum}")
    }

    withLogging("Kotlin") { lang ->
        println("言語: ${"$"}{lang.uppercase()}")
    }
}`}
          expectedOutput={`sum = 500500
処理開始: Kotlin
言語: KOTLIN
処理終了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">非ローカルreturn</h2>
        <p className="text-gray-400 mb-4">
          inline関数のラムダ内ではreturnを使って呼び出し元関数から
          直接返れます（非ローカルreturn）。
        </p>
        <KotlinEditor
          defaultCode={`inline fun findFirst(list: List<Int>, predicate: (Int) -> Boolean): Int? {
    list.forEach { item ->
        if (predicate(item)) return item  // 非ローカルreturn
    }
    return null
}

fun main() {
    val numbers = listOf(1, 3, 5, 2, 7, 4)
    val firstEven = findFirst(numbers) { it % 2 == 0 }
    println("最初の偶数: ${"$"}{firstEven}")

    val firstOver10 = findFirst(numbers) { it > 10 }
    println("10超: ${"$"}{firstOver10}")
}`}
          expectedOutput={`最初の偶数: 2
10超: null`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="lambda" lessonId="inline-functions" />
      </div>
      <LessonNav lessons={lessons} currentId="inline-functions" basePath="/learn/lambda" />
    </div>
  );
}

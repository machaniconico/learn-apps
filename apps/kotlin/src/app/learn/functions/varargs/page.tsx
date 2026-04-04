import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function VarargsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">関数 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">可変長引数</h1>
        <p className="text-gray-400">varargキーワードを使って任意の数の引数を受け取る関数を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">可変長引数（vararg）とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          varargキーワードを使うと、同じ型の引数を任意の個数受け取れます。
          関数内ではvarargパラメータは配列として扱われます。
          既存の配列を渡すにはスプレッド演算子（*）を使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>vararg 名前: 型 の形式</li>
          <li>関数内では配列（Array）として扱う</li>
          <li>0個以上の引数を渡せる</li>
          <li>配列をvarargに渡すには *配列名（スプレッド演算子）</li>
          <li>varargは通常1つの関数に1つだけ</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">varargの基本</h2>
        <p className="text-gray-400 mb-4">可変長引数を受け取る関数の基本的な使い方です。</p>
        <KotlinEditor
          defaultCode={`fun sum(vararg numbers: Int): Int {
    var total = 0
    for (n in numbers) total += n
    return total
}

fun printAll(vararg items: String) {
    for (item in items) {
        println("- \${item}")
    }
}

fun main() {
    println("合計: \${sum(1, 2, 3)}")
    println("合計: \${sum(1, 2, 3, 4, 5)}")
    println("合計: \${sum()}")

    printAll("Apple", "Banana", "Cherry")
}`}
          expectedOutput={`合計: 6
合計: 15
合計: 0
- Apple
- Banana
- Cherry`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スプレッド演算子</h2>
        <p className="text-gray-400 mb-4">既存の配列をvararg引数として渡すにはスプレッド演算子(*)を使います。</p>
        <KotlinEditor
          defaultCode={`fun max(vararg numbers: Int): Int {
    return numbers.max()
}

fun main() {
    println("最大値: \${max(3, 1, 4, 1, 5, 9, 2, 6)}")

    // 配列をvarargに渡す
    val nums = intArrayOf(10, 20, 5, 30, 15)
    println("配列の最大値: \${max(*nums)}")

    // varargをforで処理
    fun average(vararg values: Double): Double {
        return values.sum() / values.size
    }
    println("平均: \${average(1.0, 2.0, 3.0, 4.0, 5.0)}")
}`}
          expectedOutput={`最大値: 9
配列の最大値: 30
平均: 3.0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="varargs" />
      </div>
      <LessonNav lessons={lessons} currentId="varargs" basePath="/learn/functions" />
    </div>
  );
}

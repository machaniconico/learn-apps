import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function ReturnValuesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">関数 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">戻り値</h1>
        <p className="text-gray-400">関数から値を返すreturn文と戻り値の型指定を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">戻り値の基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          関数は値を返すことができます。戻り値の型は関数名の後にコロンと型名で指定します。
          return文で値を返します。戻り値がない場合はUnitを指定するか省略します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>fun 名前(): 戻り値型 {} の形式</li>
          <li>return 式 で値を返す</li>
          <li>戻り値なしはUnit（省略可能）</li>
          <li>returnで関数を途中で終了することもできる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">値を返す関数</h2>
        <p className="text-gray-400 mb-4">計算結果を返す関数の基本的な使い方です。</p>
        <KotlinEditor
          defaultCode={`fun add(a: Int, b: Int): Int {
    return a + b
}

fun multiply(a: Int, b: Int): Int {
    return a * b
}

fun getGreeting(name: String): String {
    return "こんにちは、\${name}！"
}

fun main() {
    val sum = add(3, 5)
    val product = multiply(4, 6)
    val message = getGreeting("Kotlin")

    println("合計: \${sum}")
    println("積: \${product}")
    println(message)
}`}
          expectedOutput={`合計: 8
積: 24
こんにちは、Kotlin！`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">早期リターン</h2>
        <p className="text-gray-400 mb-4">条件によって早期にreturnして処理を終了する例です。</p>
        <KotlinEditor
          defaultCode={`fun divide(a: Int, b: Int): Double {
    if (b == 0) {
        println("ゼロ除算エラー")
        return 0.0
    }
    return a.toDouble() / b
}

fun isEven(n: Int): Boolean {
    return n % 2 == 0
}

fun main() {
    println(divide(10, 2))
    println(divide(10, 0))
    println("4は偶数: \${isEven(4)}")
    println("7は偶数: \${isEven(7)}")
}`}
          expectedOutput={`5.0
ゼロ除算エラー
0.0
4は偶数: true
7は偶数: false`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="return-values" />
      </div>
      <LessonNav lessons={lessons} currentId="return-values" basePath="/learn/functions" />
    </div>
  );
}

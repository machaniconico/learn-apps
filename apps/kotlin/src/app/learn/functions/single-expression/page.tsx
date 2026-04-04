import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function SingleExpressionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">関数 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">単式関数</h1>
        <p className="text-gray-400">ブロックなしで1つの式を返す単式関数の簡潔な書き方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">単式関数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          関数の本体が1つの式だけの場合、波括弧とreturnを省略して=で書ける簡潔な構文です。
          型推論により戻り値の型も省略できます。
          シンプルな計算や変換関数によく使われます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>fun 名前(パラメータ) = 式 の形式</li>
          <li>ブロック {} とreturnが不要</li>
          <li>戻り値の型は型推論で省略可能</li>
          <li>シンプルな関数をより簡潔に書ける</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">単式関数の基本</h2>
        <p className="text-gray-400 mb-4">通常の関数と単式関数を比較して違いを確認しましょう。</p>
        <KotlinEditor
          defaultCode={`// 通常の関数
fun addNormal(a: Int, b: Int): Int {
    return a + b
}

// 単式関数（同じ動作）
fun add(a: Int, b: Int) = a + b

// 型を明示した単式関数
fun multiply(a: Int, b: Int): Int = a * b

fun square(n: Int) = n * n

fun main() {
    println("通常: \${addNormal(3, 5)}")
    println("単式: \${add(3, 5)}")
    println("乗算: \${multiply(4, 6)}")
    println("二乗: \${square(7)}")
}`}
          expectedOutput={`通常: 8
単式: 8
乗算: 24
二乗: 49`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">単式関数の活用例</h2>
        <p className="text-gray-400 mb-4">様々な場面での単式関数の活用例です。</p>
        <KotlinEditor
          defaultCode={`fun isEven(n: Int) = n % 2 == 0
fun isPositive(n: Int) = n > 0
fun max(a: Int, b: Int) = if (a > b) a else b
fun greet(name: String) = "Hello, \${name}!"

fun celsiusToFahrenheit(c: Double) = c * 9 / 5 + 32

fun main() {
    println("4は偶数: \${isEven(4)}")
    println("7は偶数: \${isEven(7)}")
    println("max(3, 8) = \${max(3, 8)}")
    println(greet("Kotlin"))
    println("100°C = \${celsiusToFahrenheit(100.0)}°F")
}`}
          expectedOutput={`4は偶数: true
7は偶数: false
max(3, 8) = 8
Hello, Kotlin!
100°C = 212.0°F`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="single-expression" />
      </div>
      <LessonNav lessons={lessons} currentId="single-expression" basePath="/learn/functions" />
    </div>
  );
}

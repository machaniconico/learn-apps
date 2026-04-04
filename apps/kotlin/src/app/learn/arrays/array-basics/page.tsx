import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">配列・リスト レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">配列の基本</h1>
        <p className="text-gray-400">arrayOfや配列初期化関数を使ったKotlinの配列の作り方を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概念説明</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlinの配列は固定サイズのコレクションです。
          <code className="text-green-300">arrayOf()</code>で任意の型の配列を、
          <code className="text-green-300">IntArray</code>、<code className="text-green-300">DoubleArray</code>などで
          プリミティブ型の配列を作れます（パフォーマンス上有利）。
        </p>
        <p className="text-gray-300 leading-relaxed">
          <code className="text-green-300">{"Array(size) { init }"}</code>を使うと
          サイズとラムダで配列を初期化できます。
          配列のインデックスは0始まりで、<code className="text-green-300">array[i]</code>でアクセスします。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 1: arrayOfとプリミティブ配列</h2>
        <KotlinEditor
          defaultCode={`fun main() {
    val arr = arrayOf(1, 2, 3, 4, 5)
    val intArr = IntArray(5) { it + 1 }
    val doubleArr = DoubleArray(3) { it * 1.5 }

    println("arrayOf: $\{arr.toList()}")
    println("IntArray: $\{intArr.toList()}")
    println("DoubleArray: $\{doubleArr.toList()}")
    println("サイズ: $\{arr.size}")
}`}
          expectedOutput={`arrayOf: [1, 2, 3, 4, 5]
IntArray: [1, 2, 3, 4, 5]
DoubleArray: [0.0, 1.5, 3.0]
サイズ: 5`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 2: ラムダによる初期化</h2>
        <KotlinEditor
          defaultCode={`fun main() {
    val squares = Array(6) { it * it }
    val evens = IntArray(5) { (it + 1) * 2 }
    val strings = Array(4) { "item$\{it}" }

    println("二乗: $\{squares.toList()}")
    println("偶数: $\{evens.toList()}")
    println("文字列: $\{strings.toList()}")
}`}
          expectedOutput={`二乗: [0, 1, 4, 9, 16, 25]
偶数: [2, 4, 6, 8, 10]
文字列: [item0, item1, item2, item3]`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 3: 配列の反復処理</h2>
        <KotlinEditor
          defaultCode={`fun main() {
    val fruits = arrayOf("りんご", "バナナ", "みかん", "ぶどう")

    // forループ
    for (fruit in fruits) print("$\{fruit} ")
    println()

    // インデックス付き
    for ((i, fruit) in fruits.withIndex()) {
        println("$\{i}: $\{fruit}")
    }

    // forEach
    fruits.forEachIndexed { i, f -> print("[$\{i}]$\{f} ") }
    println()
}`}
          expectedOutput={`りんご バナナ みかん ぶどう
0: りんご
1: バナナ
2: みかん
3: ぶどう
[0]りんご [1]バナナ [2]みかん [3]ぶどう `}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="array-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="array-basics" basePath="/learn/arrays" />
    </div>
  );
}

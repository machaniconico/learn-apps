import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">配列・リスト レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">配列とリストの変換</h1>
        <p className="text-gray-400">配列とリストを相互に変換するtoList()、toTypedArray()などの方法を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概念説明</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          配列とリストはよく似ていますが別の型です。
          <code className="text-green-300">array.toList()</code>で配列をリストに、
          <code className="text-green-300">list.toTypedArray()</code>でリストを配列に変換できます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          <code className="text-green-300">toMutableList()</code>でミュータブルリストに、
          <code className="text-green-300">toIntArray()</code>/<code className="text-green-300">toDoubleArray()</code>などで
          プリミティブ配列にも変換できます。
          変換は新しいオブジェクトを作るため、元のコレクションには影響しません。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 1: 基本的な変換</h2>
        <KotlinEditor
          defaultCode={`fun main() {
    // 配列 → リスト
    val arr = arrayOf(1, 2, 3, 4, 5)
    val list = arr.toList()
    val mList = arr.toMutableList()
    println("配列→リスト: $\{list}")
    println("配列→ミュータブルリスト: $\{mList::class.simpleName}")

    // リスト → 配列
    val fruits = listOf("apple", "banana", "cherry")
    val fruitsArr = fruits.toTypedArray()
    println("リスト→配列: $\{fruitsArr.toList()}")
    println("配列の型: $\{fruitsArr::class.simpleName}")
}`}
          expectedOutput={`配列→リスト: [1, 2, 3, 4, 5]
配列→ミュータブルリスト: ArrayList
リスト→配列: [apple, banana, cherry]
配列の型: Array`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 2: プリミティブ配列の変換</h2>
        <KotlinEditor
          defaultCode={`fun main() {
    val intList = listOf(10, 20, 30, 40, 50)
    val intArr: IntArray = intList.toIntArray()
    println("IntArray: $\{intArr.toList()}")

    val intArr2 = intArrayOf(1, 2, 3, 4, 5)
    val backToList: List<Int> = intArr2.toList()
    println("List<Int>: $\{backToList}")

    // 変換して操作
    val doubled = intArr2.toList().map { it * 2 }.toIntArray()
    println("2倍のIntArray: $\{doubled.toList()}")
}`}
          expectedOutput={`IntArray: [10, 20, 30, 40, 50]
List<Int>: [1, 2, 3, 4, 5]
2倍のIntArray: [2, 4, 6, 8, 10]`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 3: イミュータブルとミュータブルの変換</h2>
        <KotlinEditor
          defaultCode={`fun main() {
    val immutable = listOf(3, 1, 4, 1, 5, 9)
    println("読み取り専用: $\{immutable}")

    // ミュータブルに変換して操作
    val mutable = immutable.toMutableList()
    mutable.sort()
    mutable.add(2)
    println("変更後: $\{mutable}")

    // 元のリストは変わらない
    println("元のリスト: $\{immutable}")

    // ミュータブルを読み取り専用に
    val readOnly: List<Int> = mutable.toList()
    println("読み取り専用に戻す: $\{readOnly}")
}`}
          expectedOutput={`読み取り専用: [3, 1, 4, 1, 5, 9]
変更後: [1, 1, 3, 4, 5, 9, 2]
元のリスト: [3, 1, 4, 1, 5, 9]
読み取り専用に戻す: [1, 1, 3, 4, 5, 9, 2]`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="array-list-conversion" />
      </div>
      <LessonNav lessons={lessons} currentId="array-list-conversion" basePath="/learn/arrays" />
    </div>
  );
}

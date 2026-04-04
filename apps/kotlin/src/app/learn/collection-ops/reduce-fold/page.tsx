import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collection-ops");

export default function ReduceFoldPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">コレクション操作 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">reduce・fold</h1>
        <p className="text-gray-400">コレクションを1つの値に集約するreduce・fold</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">reduceとfoldの違い</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-300">reduce</code>はコレクションの最初の要素を初期値として使います。
          <code className="text-pink-300">fold</code>は明示的な初期値を取ります。
          空のコレクションではreduceは例外を投げますが、foldは初期値を返します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>reduce - 最初の要素が初期値、空リストはエラー</li>
          <li>fold - 初期値を指定、空リストは初期値を返す</li>
          <li>reduceRight / foldRight - 右から集約</li>
          <li>runningReduce / runningFold - 中間結果も保持</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">reduce・foldの基本</h2>
        <p className="text-gray-400 mb-4">
          合計や積など、コレクションを1つの値に集約する操作を学びます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val numbers = listOf(1, 2, 3, 4, 5)

    val sum = numbers.reduce { acc, n -> acc + n }
    println("reduce sum: ${"$"}{sum}")

    val product = numbers.fold(1) { acc, n -> acc * n }
    println("fold product: ${"$"}{product}")

    val maxVal = numbers.reduce { acc, n -> if (n > acc) n else acc }
    println("max: ${"$"}{maxVal}")

    val concat = listOf("a", "b", "c", "d").fold("") { acc, s -> acc + s }
    println("concat: ${"$"}{concat}")
}`}
          expectedOutput={`reduce sum: 15
fold product: 120
max: 5
concat: abcd`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">runningFoldで中間結果を保持</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-300">runningFold</code>は各ステップの中間結果を
          含むリストを返します。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val numbers = listOf(1, 2, 3, 4, 5)

    val runningSum = numbers.runningFold(0) { acc, n -> acc + n }
    println("累積合計: ${"$"}{runningSum}")

    val runningProduct = numbers.runningReduce { acc, n -> acc * n }
    println("累積積: ${"$"}{runningProduct}")
}`}
          expectedOutput={`累積合計: [0, 1, 3, 6, 10, 15]
累積積: [1, 2, 6, 24, 120]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collection-ops" lessonId="reduce-fold" />
      </div>
      <LessonNav lessons={lessons} currentId="reduce-fold" basePath="/learn/collection-ops" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collection-ops");

export default function CustomOperatorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">コレクション操作 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">カスタム操作</h1>
        <p className="text-gray-400">独自の拡張関数でコレクション操作をチェーンする</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">カスタムコレクション操作</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          拡張関数を使ってコレクションに独自の操作を追加できます。
          標準操作をチェーンして複雑な処理を読みやすく表現できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>List&lt;T&gt;への拡張関数でカスタム操作を追加</li>
          <li>チェーン可能な設計にするとパイプラインが作れる</li>
          <li>ドメイン固有の操作名で意図が明確になる</li>
          <li>Sequenceにも同様に拡張関数を定義できる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カスタム集計操作</h2>
        <p className="text-gray-400 mb-4">
          ドメイン固有の集計ロジックを拡張関数として定義します。
        </p>
        <KotlinEditor
          defaultCode={`fun List<Int>.median(): Double {
    if (isEmpty()) return 0.0
    val sorted = this.sorted()
    val mid = sorted.size / 2
    return if (sorted.size % 2 == 0) {
        (sorted[mid - 1] + sorted[mid]) / 2.0
    } else {
        sorted[mid].toDouble()
    }
}

fun List<Int>.normalize(): List<Double> {
    val min = min()
    val max = max()
    if (min == max) return map { 0.5 }
    return map { (it - min).toDouble() / (max - min) }
}

fun main() {
    val data = listOf(3, 1, 4, 1, 5, 9, 2, 6)
    println("中央値: ${"$"}{data.median()}")
    println("正規化: ${"$"}{data.normalize().map { String.format("%.2f", it) }}")
}`}
          expectedOutput={`中央値: 3.5
正規化: [0.25, 0.00, 0.38, 0.00, 0.50, 1.00, 0.12, 0.62]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">チェーンによるパイプライン</h2>
        <p className="text-gray-400 mb-4">
          複数のカスタム操作をチェーンして複雑なデータ処理を構築します。
        </p>
        <KotlinEditor
          defaultCode={`data class Score(val name: String, val value: Int)

fun List<Score>.topN(n: Int) = sortedByDescending { it.value }.take(n)
fun List<Score>.aboveAverage(): List<Score> {
    val avg = map { it.value }.average()
    return filter { it.value >= avg }
}

fun main() {
    val scores = listOf(
        Score("Alice", 85), Score("Bob", 70),
        Score("Carol", 92), Score("Dave", 78),
        Score("Eve", 88)
    )

    println("TOP3:")
    scores.topN(3).forEach { println("  ${"$"}{it.name}: ${"$"}{it.value}") }

    println("平均以上:")
    scores.aboveAverage().forEach { println("  ${"$"}{it.name}: ${"$"}{it.value}") }
}`}
          expectedOutput={`TOP3:
  Carol: 92
  Eve: 88
  Alice: 85
平均以上:
  Alice: 85
  Carol: 92
  Eve: 88`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collection-ops" lessonId="custom-operators" />
      </div>
      <LessonNav lessons={lessons} currentId="custom-operators" basePath="/learn/collection-ops" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collection-ops");

export default function FlatmapZipPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">コレクション操作 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">flatMap・zip</h1>
        <p className="text-gray-400">ネストリストを平坦化するflatMapと2リストを結合するzip</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">flatMapとzip</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-300">flatMap</code>は各要素をリストに変換して全部を結合します。
          <code className="text-pink-300">zip</code>は2つのリストの対応する要素をペアにします。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>flatMap - map + flatten の組み合わせ</li>
          <li>flatten - リストのリストを1つのリストに</li>
          <li>zip - 2つのリストをペアのリストに</li>
          <li>unzip - ペアのリストを2つのリストに分解</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">flatMapで平坦化</h2>
        <p className="text-gray-400 mb-4">
          ネストしたリストを一つのリストに展開します。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val nested = listOf(listOf(1, 2), listOf(3, 4), listOf(5, 6))
    val flat = nested.flatten()
    println(flat)

    val words = listOf("Hello World", "Kotlin Fun")
    val chars = words.flatMap { it.split(" ") }
    println(chars)

    val numbers = listOf(1, 2, 3)
    val expanded = numbers.flatMap { n -> List(n) { n } }
    println(expanded)
}`}
          expectedOutput={`[1, 2, 3, 4, 5, 6]
[Hello, World, Kotlin, Fun]
[1, 2, 2, 3, 3, 3]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">zipでリストを結合</h2>
        <p className="text-gray-400 mb-4">
          2つのリストの対応する要素をペアに結合します。
          長さが異なる場合は短い方に合わせます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val names = listOf("Alice", "Bob", "Carol")
    val scores = listOf(90, 85, 92)

    val pairs = names.zip(scores)
    println(pairs)

    // zipWithTransform
    val result = names.zip(scores) { name, score ->
        "${"$"}{name}: ${"$"}{score}点"
    }
    println(result)

    val (ns, ss) = pairs.unzip()
    println("名前: ${"$"}{ns}")
    println("点数: ${"$"}{ss}")
}`}
          expectedOutput={`[(Alice, 90), (Bob, 85), (Carol, 92)]
[Alice: 90点, Bob: 85点, Carol: 92点]
名前: [Alice, Bob, Carol]
点数: [90, 85, 92]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collection-ops" lessonId="flatmap-zip" />
      </div>
      <LessonNav lessons={lessons} currentId="flatmap-zip" basePath="/learn/collection-ops" />
    </div>
  );
}

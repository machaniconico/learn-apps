import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">配列・リスト レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">リスト操作</h1>
        <p className="text-gray-400">インデックス取得、contains、subListなどリストの便利な操作を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概念説明</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlinのリストには多数の便利な操作関数があります。
          <code className="text-green-300">subList()</code>で部分リスト、
          <code className="text-green-300">chunked()</code>で固定サイズのグループに分割、
          <code className="text-green-300">windowed()</code>でスライディングウィンドウを作れます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          <code className="text-green-300">zip()</code>で2つのリストを組み合わせ、
          <code className="text-green-300">flatten()</code>でネストしたリストを平坦化、
          <code className="text-green-300">partition()</code>で条件に基づいて2つのリストに分けられます。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 1: subListとchunked</h2>
        <KotlinEditor
          defaultCode={`fun main() {
    val list = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

    val sub = list.subList(2, 6)
    println("subList(2,6): $\{sub}")

    val chunks = list.chunked(3)
    println("chunked(3): $\{chunks}")

    val windows = list.windowed(3)
    println("windowed(3): $\{windows}")

    val windowsStep = list.windowed(3, step = 2)
    println("windowed(3, step=2): $\{windowsStep}")
}`}
          expectedOutput={`subList(2,6): [3, 4, 5, 6]
chunked(3): [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
windowed(3): [[1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7], [6, 7, 8], [7, 8, 9], [8, 9, 10]]
windowed(3, step=2): [[1, 2, 3], [3, 4, 5], [5, 6, 7], [7, 8, 9]]`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 2: zipとflatten</h2>
        <KotlinEditor
          defaultCode={`fun main() {
    val names = listOf("田中", "鈴木", "佐藤")
    val scores = listOf(85, 92, 78)

    val zipped = names.zip(scores)
    println("zip: $\{zipped}")

    val withIndex = names.zip(scores) { name, score -> "$\{name}: $\{score}点" }
    println("zip変換: $\{withIndex}")

    val nested = listOf(listOf(1, 2), listOf(3, 4), listOf(5, 6))
    println("flatten: $\{nested.flatten()}")

    val (pass, fail) = scores.partition { it >= 80 }
    println("合格: $\{pass}, 不合格: $\{fail}")
}`}
          expectedOutput={`zip: [(田中, 85), (鈴木, 92), (佐藤, 78)]
zip変換: [田中: 85点, 鈴木: 92点, 佐藤: 78点]
flatten: [1, 2, 3, 4, 5, 6]
合格: [85, 92], 不合格: [78]`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 3: takeとdropとfind</h2>
        <KotlinEditor
          defaultCode={`fun main() {
    val numbers = listOf(3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5)

    println("take(4): $\{numbers.take(4)}")
    println("drop(4): $\{numbers.drop(4)}")
    println("takeWhile<5: $\{numbers.takeWhile { it < 5 }}")
    println("dropWhile<5: $\{numbers.dropWhile { it < 5 }}")

    println("find>5: $\{numbers.find { it > 5 }}")
    println("findLast>5: $\{numbers.findLast { it > 5 }}")
    println("any>8: $\{numbers.any { it > 8 }}")
    println("all>0: $\{numbers.all { it > 0 }}")
}`}
          expectedOutput={`take(4): [3, 1, 4, 1]
drop(4): [5, 9, 2, 6, 5, 3, 5]
takeWhile<5: [3, 1, 4, 1]
dropWhile<5: [5, 9, 2, 6, 5, 3, 5]
find>5: 9
findLast>5: 6
any>8: true
all>0: true`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="list-operations" />
      </div>
      <LessonNav lessons={lessons} currentId="list-operations" basePath="/learn/arrays" />
    </div>
  );
}

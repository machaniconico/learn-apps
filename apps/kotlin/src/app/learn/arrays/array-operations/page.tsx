import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">配列・リスト レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">配列の操作</h1>
        <p className="text-gray-400">配列要素へのアクセス、更新、サイズ取得などの基本操作を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概念説明</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          配列の要素は<code className="text-green-300">array[index]</code>でアクセスし、
          <code className="text-green-300">array[index] = value</code>で更新します。
          これは<code className="text-green-300">get()</code>/<code className="text-green-300">set()</code>メソッドのシンタックスシュガーです。
        </p>
        <p className="text-gray-300 leading-relaxed">
          便利な操作として<code className="text-green-300">contains()</code>/<code className="text-green-300">in</code>で存在確認、
          <code className="text-green-300">indexOf()</code>でインデックス検索、
          <code className="text-green-300">sum()</code>、<code className="text-green-300">min()</code>、<code className="text-green-300">max()</code>などの集計関数があります。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 1: 要素へのアクセスと更新</h2>
        <KotlinEditor
          defaultCode={`fun main() {
    val scores = intArrayOf(85, 92, 78, 96, 88)
    println("元の配列: $\{scores.toList()}")

    // アクセス
    println("最初: $\{scores[0]}, 最後: $\{scores[scores.size - 1]}")
    println("最後(last): $\{scores.last()}")

    // 更新
    scores[2] = 80
    println("更新後: $\{scores.toList()}")

    // 集計
    println("合計: $\{scores.sum()}, 平均: $\{scores.average()}")
    println("最大: $\{scores.max()}, 最小: $\{scores.min()}")
}`}
          expectedOutput={`元の配列: [85, 92, 78, 96, 88]
最初: 85, 最後: 88
最後(last): 88
更新後: [85, 92, 80, 96, 88]
合計: 441, 平均: 88.2
最大: 96, 最小: 80`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 2: 検索と変換</h2>
        <KotlinEditor
          defaultCode={`fun main() {
    val nums = arrayOf(3, 1, 4, 1, 5, 9, 2, 6)

    println("4を含む: $\{4 in nums}")
    println("7を含む: $\{7 in nums}")
    println("5のインデックス: $\{nums.indexOf(5)}")

    val sorted = nums.sorted()
    println("ソート済み: $\{sorted}")

    val filtered = nums.filter { it > 4 }
    println("4より大きい: $\{filtered}")

    val doubled = nums.map { it * 2 }
    println("2倍: $\{doubled}")
}`}
          expectedOutput={`4を含む: true
7を含む: false
5のインデックス: 4
ソート済み: [1, 1, 2, 3, 4, 5, 6, 9]
4より大きい: [5, 9, 6]
2倍: [6, 2, 8, 2, 10, 18, 4, 12]`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 3: スライスとコピー</h2>
        <KotlinEditor
          defaultCode={`fun main() {
    val arr = arrayOf(10, 20, 30, 40, 50)

    val slice = arr.slice(1..3)
    println("スライス[1..3]: $\{slice}")

    val copy = arr.copyOf()
    copy[0] = 99
    println("元の配列: $\{arr.toList()}")
    println("コピー（変更後）: $\{copy.toList()}")

    val partial = arr.copyOfRange(1, 4)
    println("部分コピー[1..4): $\{partial.toList()}")
}`}
          expectedOutput={`スライス[1..3]: [20, 30, 40]
元の配列: [10, 20, 30, 40, 50]
コピー（変更後）: [99, 20, 30, 40, 50]
部分コピー[1..4): [20, 30, 40]`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="array-operations" />
      </div>
      <LessonNav lessons={lessons} currentId="array-operations" basePath="/learn/arrays" />
    </div>
  );
}

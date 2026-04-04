import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">配列・リスト レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">リストの基本</h1>
        <p className="text-gray-400">listOfを使ったイミュータブルなリストの作成と操作方法を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概念説明</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-green-300">listOf()</code>は読み取り専用（イミュータブル）なリストを作ります。
          作成後に要素を追加・削除・変更はできません。
          Kotlinでは配列よりもリストの使用が推奨されます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          リストは豊富な関数型操作（<code className="text-green-300">filter</code>、<code className="text-green-300">map</code>、<code className="text-green-300">first</code>など）を持ちます。
          <code className="text-green-300">emptyList()</code>で空リスト、
          <code className="text-green-300">listOfNotNull()</code>でnullを除いたリストを作れます。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 1: listOfの基本</h2>
        <KotlinEditor
          defaultCode={`fun main() {
    val colors = listOf("赤", "青", "緑", "黄")
    println("リスト: $\{colors}")
    println("サイズ: $\{colors.size}")
    println("最初: $\{colors.first()}")
    println("最後: $\{colors.last()}")
    println("2番目: $\{colors[1]}")
    println("含む？: $\{"青" in colors}")
}`}
          expectedOutput={`リスト: [赤, 青, 緑, 黄]
サイズ: 4
最初: 赤
最後: 黄
2番目: 青
含む？: true`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 2: リストの関数型操作</h2>
        <KotlinEditor
          defaultCode={`fun main() {
    val numbers = listOf(5, 3, 8, 1, 9, 2, 7, 4, 6)

    println("偶数: $\{numbers.filter { it % 2 == 0 }}")
    println("2倍: $\{numbers.map { it * 2 }}")
    println("合計: $\{numbers.sum()}")
    println("最大: $\{numbers.max()}")
    println("ソート: $\{numbers.sorted()}")
    println("5以上の数: $\{numbers.count { it >= 5 }}")
}`}
          expectedOutput={`偶数: [8, 2, 4, 6]
2倍: [10, 6, 16, 2, 18, 4, 14, 8, 12]
合計: 45
最大: 9
ソート: [1, 2, 3, 4, 5, 6, 7, 8, 9]
5以上の数: 5`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 3: listOfNotNullとemptyList</h2>
        <KotlinEditor
          defaultCode={`fun main() {
    val withNulls = listOfNotNull(1, null, 3, null, 5)
    println("null除外: $\{withNulls}")

    val empty = emptyList<String>()
    println("空リスト: $\{empty}, サイズ: $\{empty.size}")

    val names = listOf("田中", "鈴木", "佐藤", "田中", "山田")
    println("ユニーク: $\{names.distinct()}")
    println("田中のインデックス: $\{names.indexOf("田中")}")
    println("最後の田中: $\{names.lastIndexOf("田中")}")
}`}
          expectedOutput={`null除外: [1, 3, 5]
空リスト: [], サイズ: 0
ユニーク: [田中, 鈴木, 佐藤, 山田]
田中のインデックス: 0
最後の田中: 3`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="list-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="list-basics" basePath="/learn/arrays" />
    </div>
  );
}

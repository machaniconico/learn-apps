import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collection-ops");

export default function SequenceVsListPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">コレクション操作 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">SequenceとListの比較</h1>
        <p className="text-gray-400">処理の違いとパフォーマンス上の使い分け</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Listは即時評価、Sequenceは遅延評価</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Listの操作は各ステップで中間コレクションを作成します。
          Sequenceは各要素を1つずつ全ステップに通します。
          要素数が多く、操作チェーンが長い場合はSequenceが効率的です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>List - 即時評価、各操作で新リストを作成</li>
          <li>Sequence - 遅延評価、中間コレクション不要</li>
          <li>少ない要素ではListの方が速い場合も</li>
          <li>take()と組み合わせるとSequenceが特に有効</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">処理順序の違い</h2>
        <p className="text-gray-400 mb-4">
          Listは全要素に各操作を適用してから次へ。
          Sequenceは1要素ずつ全操作を適用します。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    println("=== List（即時評価）===")
    listOf(1, 2, 3, 4, 5)
        .filter { println("filter ${"$"}{it}"); it % 2 == 0 }
        .map { println("map ${"$"}{it}"); it * 10 }
        .take(1)
        .also { println("結果: ${"$"}{it}") }

    println("=== Sequence（遅延評価）===")
    listOf(1, 2, 3, 4, 5).asSequence()
        .filter { println("filter ${"$"}{it}"); it % 2 == 0 }
        .map { println("map ${"$"}{it}"); it * 10 }
        .take(1)
        .toList()
        .also { println("結果: ${"$"}{it}") }
}`}
          expectedOutput={`=== List（即時評価）===
filter 1
filter 2
filter 3
filter 4
filter 5
map 2
map 4
結果: [20]
=== Sequence（遅延評価）===
filter 1
filter 2
map 2
結果: [20]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">使い分けのガイドライン</h2>
        <p className="text-gray-400 mb-4">
          コレクションのサイズと操作数でListかSequenceを選びます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    // 少ない要素 → Listで十分
    val smallResult = listOf(1, 2, 3, 4, 5)
        .filter { it > 2 }
        .map { it * 2 }
    println("List: ${"$"}{smallResult}")

    // 大量データや無限シーケンス → Sequence
    val largeResult = (1..1_000_000).asSequence()
        .filter { it % 3 == 0 }
        .map { it * 2 }
        .take(5)
        .toList()
    println("Sequence: ${"$"}{largeResult}")
}`}
          expectedOutput={`List: [6, 8, 10]
Sequence: [6, 12, 18, 24, 30]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collection-ops" lessonId="sequence-vs-list" />
      </div>
      <LessonNav lessons={lessons} currentId="sequence-vs-list" basePath="/learn/collection-ops" />
    </div>
  );
}

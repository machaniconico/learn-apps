import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collection-ops");

export default function SequenceBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">コレクション操作 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Sequenceの基本</h1>
        <p className="text-gray-400">遅延評価を行うSequenceの作成方法と基本操作</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Sequenceとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-300">Sequence</code>は遅延評価を行うコレクションです。
          中間操作（filter・map）は終端操作（toList・first等）が呼ばれるまで実行されません。
          これにより中間コレクションの生成を避けられます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>asSequence() - 既存コレクションからSequenceへ変換</li>
          <li>sequenceOf() - 直接Sequenceを作成</li>
          <li>generateSequence() - 無限Sequenceを生成</li>
          <li>中間操作は遅延、終端操作で実行される</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Sequenceの基本操作</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-300">asSequence()</code>でリストをSequenceに変換して
          遅延評価の恩恵を受けられます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val result = (1..10).asSequence()
        .filter { it % 2 == 0 }
        .map { it * it }
        .take(3)
        .toList()
    println(result)

    val seq = sequenceOf("apple", "banana", "cherry")
    val upper = seq.map { it.uppercase() }.toList()
    println(upper)
}`}
          expectedOutput={`[4, 16, 36]
[APPLE, BANANA, CHERRY]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">generateSequenceで無限Sequence</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-300">generateSequence</code>で無限に続くSequenceを作り、
          takeで必要な分だけ取得できます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    // フィボナッチ数列
    val fibonacci = generateSequence(Pair(0, 1)) { (a, b) -> Pair(b, a + b) }
        .map { it.first }
        .take(10)
        .toList()
    println(fibonacci)

    // 2の累乗
    val powersOf2 = generateSequence(1) { it * 2 }
        .take(8)
        .toList()
    println(powersOf2)
}`}
          expectedOutput={`[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
[1, 2, 4, 8, 16, 32, 64, 128]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collection-ops" lessonId="sequence-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="sequence-basics" basePath="/learn/collection-ops" />
    </div>
  );
}

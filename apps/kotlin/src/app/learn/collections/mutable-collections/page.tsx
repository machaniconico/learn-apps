import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

export default function MutableCollectionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">コレクション レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ミュータブルコレクション</h1>
        <p className="text-gray-400">変更可能なコレクションの操作と使い分け</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">イミュータブルとミュータブルの違い</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlinのコレクションはイミュータブル（変更不可）とミュータブル（変更可）の2種類があります。
          基本はイミュータブルを使い、変更が必要な場合だけミュータブルを使うのがベストプラクティスです。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>listOf()・setOf()・mapOf() → イミュータブル</li>
          <li>mutableListOf()・mutableSetOf()・mutableMapOf() → ミュータブル</li>
          <li>toMutableList()などで変換可能</li>
          <li>ArrayListOf()はArrayListを直接作成</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">MutableListの操作</h2>
        <p className="text-gray-400 mb-4">
          MutableListはadd・remove・set・clear・addAllなど豊富なメソッドで操作できます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val list = mutableListOf(1, 2, 3)
    list.add(4)
    list.add(0, 0)  // インデックス指定で追加
    println(list)

    list.removeAt(2)  // インデックスで削除
    list.set(0, 10)   // インデックスで更新
    println(list)

    list.addAll(listOf(5, 6, 7))
    println(list)
    list.clear()
    println(list)
}`}
          expectedOutput={`[0, 1, 2, 3, 4]
[10, 1, 3, 4]
[10, 1, 3, 4, 5, 6, 7]
[]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">イミュータブルからミュータブルへ変換</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">toMutableList()</code>などの変換関数で
          イミュータブルコレクションをミュータブルに変換できます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val immutable = listOf("a", "b", "c")
    val mutable = immutable.toMutableList()
    mutable.add("d")
    println(mutable)

    val immutableSet = setOf(1, 2, 3)
    val mutableSet = immutableSet.toMutableSet()
    mutableSet.add(4)
    println(mutableSet)
}`}
          expectedOutput={`[a, b, c, d]
[1, 2, 3, 4]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collections" lessonId="mutable-collections" />
      </div>
      <LessonNav lessons={lessons} currentId="mutable-collections" basePath="/learn/collections" />
    </div>
  );
}

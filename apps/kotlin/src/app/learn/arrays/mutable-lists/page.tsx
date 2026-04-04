import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">配列・リスト レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ミュータブルリスト</h1>
        <p className="text-gray-400">mutableListOfを使った変更可能なリストの作成と要素の追加・削除を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概念説明</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-green-300">mutableListOf()</code>は変更可能なリストを作ります。
          <code className="text-green-300">add()</code>で要素追加、<code className="text-green-300">remove()</code>/<code className="text-green-300">removeAt()</code>で削除、
          直接インデックス代入で更新ができます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          <code className="text-green-300">ArrayList&lt;T&gt;()</code>も同様のミュータブルリストです。
          原則として読み取り専用の<code className="text-green-300">List</code>型として扱い、
          変更が必要な場合のみ<code className="text-green-300">MutableList</code>を使うのがKotlinのベストプラクティスです。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 1: 基本的な追加・削除・更新</h2>
        <KotlinEditor
          defaultCode={`fun main() {
    val tasks = mutableListOf("タスクA", "タスクB", "タスクC")
    println("初期: $\{tasks}")

    tasks.add("タスクD")
    tasks.add(1, "タスクX")  // インデックス指定で挿入
    println("追加後: $\{tasks}")

    tasks.remove("タスクB")
    tasks.removeAt(0)
    println("削除後: $\{tasks}")

    tasks[0] = "タスクY"
    println("更新後: $\{tasks}")
}`}
          expectedOutput={`初期: [タスクA, タスクB, タスクC]
追加後: [タスクA, タスクX, タスクB, タスクC, タスクD]
削除後: [タスクX, タスクC, タスクD]
更新後: [タスクY, タスクC, タスクD]`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 2: addAll・removeAll・clear</h2>
        <KotlinEditor
          defaultCode={`fun main() {
    val list = mutableListOf(1, 2, 3, 4, 5)
    list.addAll(listOf(6, 7, 8))
    println("addAll後: $\{list}")

    list.removeAll { it % 2 == 0 }  // 偶数を削除
    println("偶数削除後: $\{list}")

    list.retainAll { it > 3 }  // 3より大きいものだけ残す
    println("retainAll後: $\{list}")

    list.clear()
    println("clear後: $\{list}, 空？: $\{list.isEmpty()}")
}`}
          expectedOutput={`addAll後: [1, 2, 3, 4, 5, 6, 7, 8]
偶数削除後: [1, 3, 5, 7]
retainAll後: [5, 7]
clear後: [], 空？: true`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 3: ショッピングカートの実装</h2>
        <KotlinEditor
          defaultCode={`data class Item(val name: String, val price: Int)

class Cart {
    private val items = mutableListOf<Item>()

    fun add(item: Item) { items.add(item); println("追加: $\{item.name}") }
    fun remove(name: String) {
        val removed = items.removeAll { it.name == name }
        if (removed) println("削除: $\{name}") else println("$\{name}が見つかりません")
    }
    fun total() = items.sumOf { it.price }
    fun show() = println("カート: $\{items.map { it.name }} 合計: $\{total()}円")
}

fun main() {
    val cart = Cart()
    cart.add(Item("りんご", 200))
    cart.add(Item("バナナ", 150))
    cart.add(Item("みかん", 100))
    cart.show()
    cart.remove("バナナ")
    cart.show()
}`}
          expectedOutput={`追加: りんご
追加: バナナ
追加: みかん
カート: [りんご, バナナ, みかん] 合計: 450円
削除: バナナ
カート: [りんご, みかん] 合計: 300円`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="mutable-lists" />
      </div>
      <LessonNav lessons={lessons} currentId="mutable-lists" basePath="/learn/arrays" />
    </div>
  );
}

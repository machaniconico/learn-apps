import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("generics");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">ジェネリクス レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">スタープロジェクション</h1>
        <p className="text-gray-400">型が不明な場合に使うスタープロジェクション（*）の使い方を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概念説明</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          スタープロジェクション<code className="text-violet-300">*</code>は型パラメータが不明なときに使います。
          Javaのワイルドカード<code className="text-violet-300">?</code>に相当します。
          <code className="text-violet-300">List&lt;*&gt;</code>は「何らかの型のList」を意味します。
        </p>
        <p className="text-gray-300 leading-relaxed">
          <code className="text-violet-300">out T</code>の場合、<code className="text-violet-300">*</code>は<code className="text-violet-300">out Any?</code>として扱われます（読み取りのみ可能）。
          <code className="text-violet-300">in T</code>の場合、<code className="text-violet-300">*</code>は<code className="text-violet-300">in Nothing</code>として扱われます（書き込み不可）。
          型情報が不要で汎用的な処理をしたいときに活用します。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 1: List&lt;*&gt;の使用</h2>
        <KotlinEditor
          defaultCode={`fun printListInfo(list: List<*>) {
    println("サイズ: $\{list.size}")
    println("最初の要素: $\{list.firstOrNull()}")
    list.forEach { println("  - $\{it}") }
}

fun main() {
    printListInfo(listOf(1, 2, 3))
    println("---")
    printListInfo(listOf("a", "b", "c"))
    println("---")
    printListInfo(emptyList<Any>())
}`}
          expectedOutput={`サイズ: 3
最初の要素: 1
  - 1
  - 2
  - 3
---
サイズ: 3
最初の要素: a
  - a
  - b
  - c
---
サイズ: 0
最初の要素: null`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 2: Map&lt;*, *&gt;</h2>
        <KotlinEditor
          defaultCode={`fun printMap(map: Map<*, *>) {
    println("エントリ数: $\{map.size}")
    map.forEach { (k, v) -> println("  $\{k} -> $\{v}") }
}

fun main() {
    printMap(mapOf("name" to "田中", "age" to 30))
    println("---")
    printMap(mapOf(1 to "one", 2 to "two", 3 to "three"))
}`}
          expectedOutput={`エントリ数: 2
  name -> 田中
  age -> 30
---
エントリ数: 3
  1 -> one
  2 -> two
  3 -> three`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="generics" lessonId="star-projection" />
      </div>
      <LessonNav lessons={lessons} currentId="star-projection" basePath="/learn/generics" />
    </div>
  );
}

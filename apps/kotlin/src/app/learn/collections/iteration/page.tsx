import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

export default function IterationPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">コレクション レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">反復処理</h1>
        <p className="text-gray-400">コレクションの各要素を処理する反復処理のパターン</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コレクションの反復処理</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlinではコレクションの要素を処理するために様々な方法が用意されています。
          forループ、forEach、forEachIndexed、withIndexなど目的に合わせて選べます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>for (item in collection) - シンプルな反復</li>
          <li>forEach { } - ラムダを使った反復</li>
          <li>{"forEachIndexed { index, item }"} - インデックス付き反復</li>
          <li>withIndex() - インデックスと値のペアを返すIterator</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">forEachとforEachIndexed</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">forEach</code>はラムダで各要素を処理します。
          <code className="text-green-300">forEachIndexed</code>はインデックスも取得できます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val fruits = listOf("apple", "banana", "cherry")

    fruits.forEach { fruit ->
        println(fruit)
    }

    println("---")

    fruits.forEachIndexed { index, fruit ->
        println("${"$"}{index}: ${"$"}{fruit}")
    }
}`}
          expectedOutput={`apple
banana
cherry
---
0: apple
1: banana
2: cherry`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Mapの反復処理</h2>
        <p className="text-gray-400 mb-4">
          Mapは分割代入を使ってキーと値を同時に取得できます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val scores = mapOf("Alice" to 90, "Bob" to 85, "Carol" to 92)

    for ((name, score) in scores) {
        println("${"$"}{name}: ${"$"}{score}点")
    }

    println("---")

    scores.forEach { (name, score) ->
        val grade = if (score >= 90) "A" else "B"
        println("${"$"}{name}: ${"$"}{grade}")
    }
}`}
          expectedOutput={`Alice: 90点
Bob: 85点
Carol: 92点
---
Alice: A
Bob: B
Carol: A`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collections" lessonId="iteration" />
      </div>
      <LessonNav lessons={lessons} currentId="iteration" basePath="/learn/collections" />
    </div>
  );
}

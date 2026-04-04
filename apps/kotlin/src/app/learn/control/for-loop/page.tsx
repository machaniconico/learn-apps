import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function ForLoopPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">制御構文 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">forループ</h1>
        <p className="text-gray-400">範囲やコレクションを使ったforループの繰り返し処理を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Kotlinのforループ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlinのforループはイテレータを提供するオブジェクト（範囲、配列、リストなど）を
          繰り返し処理します。Javaの拡張for文と似ていますが、範囲演算子と組み合わせて
          より柔軟に使えます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>for (item in collection) の構文</li>
          <li>1..10 で1から10の範囲</li>
          <li>downTo で逆順</li>
          <li>step で刻み幅を指定</li>
          <li>withIndex() でインデックスと値を同時取得</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">範囲を使ったforループ</h2>
        <p className="text-gray-400 mb-4">..演算子で作った範囲をforループで処理します。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    // 1から5まで
    for (i in 1..5) {
        print("\${i} ")
    }
    println()

    // 逆順
    for (i in 5 downTo 1) {
        print("\${i} ")
    }
    println()

    // 2刻み
    for (i in 0..10 step 2) {
        print("\${i} ")
    }
    println()
}`}
          expectedOutput={`1 2 3 4 5
5 4 3 2 1
0 2 4 6 8 10 `}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コレクションのforループ</h2>
        <p className="text-gray-400 mb-4">リストや配列の要素をforループで処理します。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val fruits = listOf("Apple", "Banana", "Cherry")

    // 要素を順番に処理
    for (fruit in fruits) {
        println("- \${fruit}")
    }

    // インデックス付き
    for ((index, fruit) in fruits.withIndex()) {
        println("\${index + 1}. \${fruit}")
    }
}`}
          expectedOutput={`- Apple
- Banana
- Cherry
1. Apple
2. Banana
3. Cherry`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="for-loop" />
      </div>
      <LessonNav lessons={lessons} currentId="for-loop" basePath="/learn/control" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("scope-functions");

export default function RunFunctionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">スコープ関数 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">run関数</h1>
        <p className="text-gray-400">オブジェクトのスコープ内で処理しラムダ結果を返すrun</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">run関数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-300">run</code>はラムダ内でオブジェクトを
          <code className="text-pink-300">this</code>として参照できます。
          ラムダの最後の式を返します。letとの違いはitではなくthisを使う点です。
          また、拡張関数ではないrun { }もあり、スコープを作るのに使えます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>ラムダ内でthisがレシーバオブジェクトを指す</li>
          <li>ラムダの最後の式が戻り値</li>
          <li>複数操作後の計算結果が必要な場合に使う</li>
          <li>スタンドアロンのrun { }でスコープを作れる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">run関数の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-300">run</code>はオブジェクトのメンバーに直接アクセスして
          計算結果を返す場合に便利です。
        </p>
        <KotlinEditor
          defaultCode={`data class Rectangle(val width: Double, val height: Double)

fun main() {
    val rect = Rectangle(4.0, 6.0)
    val area = rect.run {
        width * height
    }
    println("面積: ${"$"}{area}")

    val summary = rect.run {
        "縦=${"$"}{height}, 横=${"$"}{width}, 面積=${"$"}{width * height}"
    }
    println(summary)
}`}
          expectedOutput={`面積: 24.0
縦=6.0, 横=4.0, 面積=24.0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スタンドアロンrun</h2>
        <p className="text-gray-400 mb-4">
          拡張関数でないrun { }は変数のスコープを限定して
          コードブロックを実行するのに使えます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val result = run {
        val x = 10
        val y = 20
        x + y  // このブロックの結果
    }
    println("result: ${"$"}{result}")

    // xやyはここでは使えない

    val message = run {
        val base = "Kotlin"
        val version = 2.0
        "${"$"}{base} ${"$"}{version} is awesome!"
    }
    println(message)
}`}
          expectedOutput={`result: 30
Kotlin 2.0 is awesome!`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="scope-functions" lessonId="run-function" />
      </div>
      <LessonNav lessons={lessons} currentId="run-function" basePath="/learn/scope-functions" />
    </div>
  );
}

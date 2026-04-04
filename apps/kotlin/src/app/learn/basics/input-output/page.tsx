import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function InputOutputPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">Kotlin基礎 レッスン10</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">入出力</h1>
        <p className="text-gray-400">printlnやreadLine()を使った標準入出力の基本的な操作を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">標準入出力</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlinの標準出力にはprintln()とprint()を使います。
          printlnは出力後に改行し、printは改行しません。
          標準入力はreadLine()で1行読み取れます（コンソールアプリケーション用）。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>println(): 出力して改行</li>
          <li>print(): 改行なしで出力</li>
          <li>readLine(): 標準入力から1行読み取り（String?を返す）</li>
          <li>System.out.printf()でフォーマット出力も可能</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">出力の種類</h2>
        <p className="text-gray-400 mb-4">println()とprint()の違いを確認しましょう。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    println("1行目")
    println("2行目")
    print("A")
    print("B")
    print("C")
    println()  // 改行のみ
    println("次の行")

    // 様々な型の出力
    println(42)
    println(3.14)
    println(true)
}`}
          expectedOutput={`1行目
2行目
ABC
次の行
42
3.14
true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">フォーマット出力</h2>
        <p className="text-gray-400 mb-4">文字列テンプレートやformatを使ったフォーマット出力です。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val name = "Alice"
    val score = 95.5
    val rank = 1

    // 文字列テンプレートで整形
    println("名前: \${name}")
    println("スコア: \${score}")
    println("順位: \${rank}位")

    // 複数値の表示
    val items = listOf("Apple", "Banana", "Cherry")
    for (item in items) {
        println("- \${item}")
    }
}`}
          expectedOutput={`名前: Alice
スコア: 95.5
順位: 1位
- Apple
- Banana
- Cherry`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="input-output" />
      </div>
      <LessonNav lessons={lessons} currentId="input-output" basePath="/learn/basics" />
    </div>
  );
}

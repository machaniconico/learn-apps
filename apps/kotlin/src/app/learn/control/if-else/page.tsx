import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function IfElsePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">制御構文 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">if-else文</h1>
        <p className="text-gray-400">条件分岐の基本であるif-else文の構文と使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Kotlinのif-else</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlinのif-elseは文（statement）としても式（expression）としても使えます。
          式として使う場合、if-elseブロックの最後の値が式の値になります。
          これはJavaの三項演算子（? :）の代わりになります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>if (条件) {} else {} の基本構文</li>
          <li>式として使うとき三項演算子の代わりになる</li>
          <li>Kotlinには三項演算子（?:）がない</li>
          <li>ブロック内の最後の式が式の値になる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なif-else</h2>
        <p className="text-gray-400 mb-4">条件に応じて処理を分岐させる基本的な使い方です。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val temperature = 30

    if (temperature > 25) {
        println("暑いです")
    } else {
        println("涼しいです")
    }

    val age = 20
    if (age >= 18) {
        println("成人です")
    } else {
        println("未成年です")
    }
}`}
          expectedOutput={`暑いです
成人です`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">if式（値を返す）</h2>
        <p className="text-gray-400 mb-4">Kotlinのifは式として値を返せます。三項演算子の代わりに使います。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val score = 75

    // if式で値を返す
    val result = if (score >= 60) "合格" else "不合格"
    println("結果: \${result}")

    // ブロックを使ったif式
    val grade = if (score >= 90) {
        "A"
    } else if (score >= 80) {
        "B"
    } else if (score >= 70) {
        "C"
    } else {
        "D"
    }
    println("グレード: \${grade}")
}`}
          expectedOutput={`結果: 合格
グレード: C`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="if-else" />
      </div>
      <LessonNav lessons={lessons} currentId="if-else" basePath="/learn/control" />
    </div>
  );
}

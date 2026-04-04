import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function ElseIfPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">制御構文 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">else-if</h1>
        <p className="text-gray-400">複数条件を扱うelse-ifチェーンの書き方と活用方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">else-ifチェーン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          複数の条件を順番にチェックするには、else-ifを連鎖させます。
          条件は上から順に評価され、最初にtrueになった条件のブロックだけが実行されます。
          多くの条件分岐がある場合はwhen式の使用も検討しましょう。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>if → else if → else if → else の順で評価</li>
          <li>最初にtrueになった条件のブロックを実行</li>
          <li>elseは省略可能（最後のフォールバック）</li>
          <li>条件が多い場合はwhen式が読みやすい</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">成績評価の例</h2>
        <p className="text-gray-400 mb-4">スコアに応じてグレードを返すelse-ifチェーンの例です。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val score = 78

    val grade = if (score >= 90) {
        "A（優秀）"
    } else if (score >= 80) {
        "B（良好）"
    } else if (score >= 70) {
        "C（普通）"
    } else if (score >= 60) {
        "D（可）"
    } else {
        "F（不合格）"
    }

    println("スコア: \${score}")
    println("グレード: \${grade}")
}`}
          expectedOutput={`スコア: 78
グレード: C（普通）`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">BMI判定の例</h2>
        <p className="text-gray-400 mb-4">複数の条件範囲でBMIを判定するelse-ifの例です。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val bmi = 22.5

    val category = if (bmi < 18.5) {
        "低体重"
    } else if (bmi < 25.0) {
        "普通体重"
    } else if (bmi < 30.0) {
        "過体重"
    } else {
        "肥満"
    }

    println("BMI: \${bmi}")
    println("判定: \${category}")
}`}
          expectedOutput={`BMI: 22.5
判定: 普通体重`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="else-if" />
      </div>
      <LessonNav lessons={lessons} currentId="else-if" basePath="/learn/control" />
    </div>
  );
}

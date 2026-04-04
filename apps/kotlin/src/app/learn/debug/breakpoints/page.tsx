import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

export default function BreakpointsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">デバッグ レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ブレークポイント</h1>
        <p className="text-gray-400">条件付きブレークポイントやログポイントを活用した効率的なデバッグを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ブレークポイントの種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          IntelliJ IDEAでは様々な種類のブレークポイントを設定できます。
          条件付きブレークポイントを使うと特定の条件のときだけ停止できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>ラインブレークポイント: 特定の行で常に停止する</li>
          <li>条件付きブレークポイント: 条件が真のときだけ停止する</li>
          <li>ログポイント: 停止せずにログを出力するだけ</li>
          <li>例外ブレークポイント: 特定の例外が発生したときに停止する</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">条件付きデバッグのシミュレーション</h2>
        <p className="text-gray-400 mb-4">条件付きブレークポイントを条件付きログで再現します。</p>
        <KotlinEditor
          defaultCode={`fun processItems(items: List<Int>) {
    items.forEachIndexed { index, item ->
        // 条件付きブレークポイント相当: item > 10 のときだけ調査
        if (item > 10) {
            println("条件一致 [index=\${index}]: item=\${item}")
        }
        // 通常処理
        val processed = item * 2
        // ログポイント相当: 全件のログ
        if (index % 2 == 0) {
            println("ログ: index=\${index}, processed=\${processed}")
        }
    }
}

fun main() {
    processItems(listOf(5, 15, 3, 20, 8))
}`}
          expectedOutput={`ログ: index=0, processed=10
条件一致 [index=1]: item=15
ログ: index=2, processed=6
条件一致 [index=3]: item=20
ログ: index=4, processed=16`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">requireとcheckによるアサーション</h2>
        <p className="text-gray-400 mb-4">requireとcheckでコード内に条件チェックを組み込めます。</p>
        <KotlinEditor
          defaultCode={`fun setAge(age: Int) {
    require(age >= 0) { "年齢は0以上が必要: age=\${age}" }
    require(age <= 150) { "年齢は150以下が必要: age=\${age}" }
    println("年齢設定: \${age}")
}

fun main() {
    setAge(25)
    setAge(0)

    try {
        setAge(-1)
    } catch (e: IllegalArgumentException) {
        println("エラー: \${e.message}")
    }
}`}
          expectedOutput={`年齢設定: 25
年齢設定: 0
エラー: 年齢は0以上が必要: age=-1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="debug" lessonId="breakpoints" />
      </div>
      <LessonNav lessons={lessons} currentId="breakpoints" basePath="/learn/debug" />
    </div>
  );
}

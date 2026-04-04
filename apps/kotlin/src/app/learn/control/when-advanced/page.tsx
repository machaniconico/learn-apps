import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function WhenAdvancedPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">制御構文 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">when式（応用）</h1>
        <p className="text-gray-400">型チェックや範囲指定など、when式の高度な活用方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">when式の応用機能</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          when式は引数なしでも使え、条件式として機能します。
          is演算子で型チェック、in演算子で範囲チェックもできます。
          これにより複雑な条件分岐をシンプルに書けます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>when {} （引数なし）でif-elseチェーンの代替</li>
          <li>is 型名 で型チェック</li>
          <li>in 範囲 で範囲チェック</li>
          <li>!in で範囲外チェック</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">範囲チェック</h2>
        <p className="text-gray-400 mb-4">in演算子を使って値が特定の範囲内かチェックします。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val score = 78

    val grade = when (score) {
        in 90..100 -> "A"
        in 80..89 -> "B"
        in 70..79 -> "C"
        in 60..69 -> "D"
        else -> "F"
    }

    println("スコア: \${score}")
    println("グレード: \${grade}")
}`}
          expectedOutput={`スコア: 78
グレード: C`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">引数なしのwhen式</h2>
        <p className="text-gray-400 mb-4">引数なしのwhenはif-elseチェーンの代わりに使えます。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val temperature = 28

    val advice = when {
        temperature < 0 -> "厚手のコートが必要です"
        temperature < 10 -> "コートを着てください"
        temperature < 20 -> "ジャケットがあると良いです"
        temperature < 30 -> "半袖でも大丈夫です"
        else -> "熱中症に注意してください"
    }

    println("気温: \${temperature}度")
    println("アドバイス: \${advice}")
}`}
          expectedOutput={`気温: 28度
アドバイス: 半袖でも大丈夫です`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="when-advanced" />
      </div>
      <LessonNav lessons={lessons} currentId="when-advanced" basePath="/learn/control" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function WhenExpressionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">制御構文 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">when式（基本）</h1>
        <p className="text-gray-400">switch文に代わるKotlinのwhen式の基本的な使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">when式とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          when式はJavaのswitch文に相当しますが、はるかに強力です。
          値のマッチングだけでなく、条件式も使えます。
          when式も式として値を返すことができます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>when (変数) でパターンマッチング</li>
          <li>{"->"} の右側がマッチした場合に実行される</li>
          <li>else はデフォルトケース</li>
          <li>式として使えば値を返せる</li>
          <li>カンマ区切りで複数値を一つのcaseに</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なwhen式</h2>
        <p className="text-gray-400 mb-4">値に応じて処理を分岐させるwhen式の基本的な使い方です。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val day = 3

    val dayName = when (day) {
        1 -> "月曜日"
        2 -> "火曜日"
        3 -> "水曜日"
        4 -> "木曜日"
        5 -> "金曜日"
        6 -> "土曜日"
        7 -> "日曜日"
        else -> "不明"
    }

    println("今日は\${dayName}です")
}`}
          expectedOutput={`今日は水曜日です`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数値のマッチングと文字列</h2>
        <p className="text-gray-400 mb-4">カンマで複数の値をまとめたり、文字列のマッチングもできます。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val day = 6

    // 複数値をカンマで区切る
    val type = when (day) {
        1, 2, 3, 4, 5 -> "平日"
        6, 7 -> "週末"
        else -> "不明"
    }
    println("曜日タイプ: \${type}")

    // 文字列のマッチング
    val lang = "Kotlin"
    val description = when (lang) {
        "Java" -> "JVM言語（従来）"
        "Kotlin" -> "JVM言語（モダン）"
        "Python" -> "スクリプト言語"
        else -> "その他"
    }
    println("\${lang}: \${description}")
}`}
          expectedOutput={`曜日タイプ: 週末
Kotlin: JVM言語（モダン）`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="when-expression" />
      </div>
      <LessonNav lessons={lessons} currentId="when-expression" basePath="/learn/control" />
    </div>
  );
}

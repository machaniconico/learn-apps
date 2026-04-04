import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

export default function KotlinVersionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">Kotlinエコシステム レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Kotlinのバージョン履歴</h1>
        <p className="text-gray-400">Kotlin各バージョンで追加された主要機能とリリース履歴の概要を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Kotlinの歴史</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          KotlinはJetBrainsが開発し、2011年に初めて公開されました。
          2016年にv1.0として安定版がリリースされ、2017年にGoogleがAndroid公式言語として採用しました。
          その後も積極的に開発が続けられ、2024年にはK2コンパイラが安定版になりました。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>2011年: JetBrainsがKotlinを初公開</li>
          <li>2016年: Kotlin 1.0 安定版リリース</li>
          <li>2017年: Google I/OでAndroid公式言語として採用</li>
          <li>2019年: Android開発のファーストクラス言語として推奨</li>
          <li>2024年: Kotlin 2.0 K2コンパイラ安定版リリース</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">主要バージョンの機能一覧</h2>
        <p className="text-gray-400 mb-4">
          各バージョンで追加された重要な機能を確認しましょう。
        </p>
        <KotlinEditor
          defaultCode={`data class KotlinRelease(val version: String, val year: Int, val features: List<String>)

fun main() {
    val releases = listOf(
        KotlinRelease("1.0", 2016, listOf("安定版初リリース", "Java完全互換", "Null安全")),
        KotlinRelease("1.1", 2017, listOf("コルーチン(実験版)", "型エイリアス", "sealed classの改善")),
        KotlinRelease("1.3", 2018, listOf("コルーチン安定版", "インラインクラス(実験版)", "契約(Contracts)")),
        KotlinRelease("1.5", 2021, listOf("value class安定版", "sealed interface", "Duration API")),
        KotlinRelease("1.7", 2022, listOf("K2コンパイラアルファ", "definitely non-nullable型")),
        KotlinRelease("1.9", 2023, listOf("K2コンパイラベータ", "Enum.entries", "データオブジェクト")),
        KotlinRelease("2.0", 2024, listOf("K2コンパイラ安定版", "スマートキャスト改善", "コンパイル速度向上"))
    )

    releases.forEach { release ->
        println("Kotlin \${release.version} (\${release.year}年)")
        release.features.forEach { println("  - \${it}") }
    }
}`}
          expectedOutput={`Kotlin 1.0 (2016年)
  - 安定版初リリース
  - Java完全互換
  - Null安全
Kotlin 1.1 (2017年)
  - コルーチン(実験版)
  - 型エイリアス
  - sealed classの改善
Kotlin 1.3 (2018年)
  - コルーチン安定版
  - インラインクラス(実験版)
  - 契約(Contracts)
Kotlin 1.5 (2021年)
  - value class安定版
  - sealed interface
  - Duration API
Kotlin 1.7 (2022年)
  - K2コンパイラアルファ
  - definitely non-nullable型
Kotlin 1.9 (2023年)
  - K2コンパイラベータ
  - Enum.entries
  - データオブジェクト
Kotlin 2.0 (2024年)
  - K2コンパイラ安定版
  - スマートキャスト改善
  - コンパイル速度向上`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">K2コンパイラの改善点</h2>
        <p className="text-gray-400 mb-4">
          Kotlin 2.0で安定版になったK2コンパイラは大きな性能改善をもたらしました。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val k2Improvements = mapOf(
        "コンパイル速度" to "最大2倍高速化（プロジェクトによる）",
        "スマートキャスト" to "より多くのシナリオで型推論が改善",
        "エラーメッセージ" to "より明確で分かりやすいコンパイルエラー",
        "プラグインAPI" to "より安定したコンパイラプラグインAPI",
        "Multiplatform" to "KMPのコンパイル改善",
        "メモリ使用量" to "コンパイル時のメモリ削減"
    )

    println("=== K2コンパイラ (Kotlin 2.0) の主な改善 ===")
    k2Improvements.forEach { (area, improvement) ->
        println("[$area] $improvement")
    }

    println()
    println("K2への移行:")
    println("  Kotlin 2.0以降は自動的にK2コンパイラが使用されます")
    println("  既存のKotlin 1.xコードとの互換性は維持されています")
}`}
          expectedOutput={`=== K2コンパイラ (Kotlin 2.0) の主な改善 ===
[コンパイル速度] 最大2倍高速化（プロジェクトによる）
[スマートキャスト] より多くのシナリオで型推論が改善
[エラーメッセージ] より明確で分かりやすいコンパイルエラー
[プラグインAPI] より安定したコンパイラプラグインAPI
[Multiplatform] KMPのコンパイル改善
[メモリ使用量] コンパイル時のメモリ削減

K2への移行:
  Kotlin 2.0以降は自動的にK2コンパイラが使用されます
  既存のKotlin 1.xコードとの互換性は維持されています`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="kotlin-versions" />
      </div>
      <LessonNav lessons={lessons} currentId="kotlin-versions" basePath="/learn/ecosystem" />
    </div>
  );
}

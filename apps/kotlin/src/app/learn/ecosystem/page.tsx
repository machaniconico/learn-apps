import { KotlinEditor } from "@/components/kotlin-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

const quizQuestions: QuizQuestion[] = [
  {
    question: "KotlinがJetBrainsによって最初に公式リリースされたバージョンはどれですか？",
    options: ["Kotlin 1.0", "Kotlin 0.1", "Kotlin 1.1", "Kotlin 2.0"],
    answer: 0,
    explanation: "Kotlin 1.0は2016年2月に正式リリースされました。これがKotlinの最初の安定版です。",
  },
  {
    question: "Android公式開発言語としてGoogleがKotlinを発表したのはいつですか？",
    options: ["2015年", "2016年", "2017年", "2019年"],
    answer: 2,
    explanation: "GoogleはGoogle I/O 2017でKotlinをAndroid公式開発言語として発表しました。",
  },
  {
    question: "KotlinのサーバーサイドフレームワークでJetBrains製のものはどれですか？",
    options: ["Spring Boot", "Ktor", "Micronaut", "Quarkus"],
    answer: 1,
    explanation: "KtorはJetBrainsが開発したKotlin製の非同期Webフレームワークです。コルーチンを活用した軽量な設計が特徴です。",
  },
  {
    question: "Kotlin Multiplatformで共有できるコードの対象として正しいのはどれですか？",
    options: [
      "UIコードのみ",
      "ビジネスロジックとデータ層のみ",
      "iOS・Android・Webなど複数プラットフォーム向けにコードを共有できる",
      "JVM環境のみ",
    ],
    answer: 2,
    explanation: "Kotlin Multiplatform（KMP）ではビジネスロジック、データ処理、ネットワーク層などをiOS・Android・Web・Desktopで共有できます。",
  },
];

export default function EcosystemPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-purple-400 mb-2">Kotlinエコシステム</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Kotlinの広大なエコシステムを学びます。バージョン履歴と各バージョンの主要機能から始まり、
          Android/Jetpack Composeによるモバイル開発、Ktor/Spring Bootによるサーバーサイド、
          Kotlin Multiplatformによるクロスプラットフォーム開発、
          そして公式ドキュメントやコミュニティリソースまでカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="ecosystem" totalLessons={5} color="purple" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/ecosystem" color="purple" categoryId="ecosystem" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Kotlinのバージョン履歴</h2>
        <p className="text-gray-400 mb-4">
          Kotlinは2016年のv1.0から継続的に進化し、各バージョンで重要な機能が追加されました。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val versions = listOf(
        "1.0 (2016)" to "初回安定版リリース",
        "1.1 (2017)" to "コルーチン実験版、型エイリアス",
        "1.3 (2018)" to "コルーチン安定版、インラインクラス",
        "1.4 (2020)" to "SAM変換、末尾再帰最適化改善",
        "1.5 (2021)" to "value class安定版、sealed interface",
        "1.7 (2022)" to "K2コンパイラアルファ、BuilderInference",
        "1.9 (2023)" to "K2ベータ、Enum.entries",
        "2.0 (2024)" to "K2コンパイラ安定版、スマートキャスト改善"
    )

    println("=== Kotlinバージョン履歴 ===")
    versions.forEach { (version, feature) ->
        println("Kotlin \${version}: \${feature}")
    }
}`}
          expectedOutput={`=== Kotlinバージョン履歴 ===
Kotlin 1.0 (2016): 初回安定版リリース
Kotlin 1.1 (2017): コルーチン実験版、型エイリアス
Kotlin 1.3 (2018): コルーチン安定版、インライン クラス
Kotlin 1.4 (2020): SAM変換、末尾再帰最適化改善
Kotlin 1.5 (2021): value class安定版、sealed interface
Kotlin 1.7 (2022): K2コンパイラアルファ、BuilderInference
Kotlin 1.9 (2023): K2ベータ、Enum.entries
Kotlin 2.0 (2024): K2コンパイラ安定版、スマートキャスト改善`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Kotlinの活用領域</h2>
        <p className="text-gray-400 mb-4">
          Kotlinは多様な領域で使われています。Android、サーバーサイド、マルチプラットフォームなど幅広い用途があります。
        </p>
        <KotlinEditor
          defaultCode={`data class Platform(val name: String, val useCase: String, val tool: String)

fun main() {
    val platforms = listOf(
        Platform("Android", "モバイルアプリ開発", "Jetpack Compose"),
        Platform("Server", "バックエンドAPI開発", "Ktor / Spring Boot"),
        Platform("Multiplatform", "クロスプラットフォーム", "Kotlin Multiplatform"),
        Platform("Desktop", "デスクトップアプリ", "Compose for Desktop"),
        Platform("Web", "Webフロントエンド", "Kotlin/JS")
    )

    println("=== Kotlinの活用領域 ===")
    platforms.forEach { p ->
        println("\${p.name}: \${p.useCase} [\${p.tool}]")
    }
}`}
          expectedOutput={`=== Kotlinの活用領域 ===
Android: モバイルアプリ開発 [Jetpack Compose]
Server: バックエンドAPI開発 [Ktor / Spring Boot]
Multiplatform: クロスプラットフォーム [Kotlin Multiplatform]
Desktop: デスクトップアプリ [Compose for Desktop]
Web: Webフロントエンド [Kotlin/JS]`}
        />
      </section>
      <Quiz questions={quizQuestions} color="purple" />
    </div>
  );
}

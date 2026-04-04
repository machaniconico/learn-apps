import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

export default function CommunityResourcesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">Kotlinエコシステム レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コミュニティとリソース</h1>
        <p className="text-gray-400">公式ドキュメント、コミュニティフォーラム、学習リソースなどKotlinの情報源を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Kotlinコミュニティ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlinには活発なコミュニティがあり、公式フォーラム、Slack、各種カンファレンスが開催されています。
          JetBrainsは公式ドキュメントとKotlin Playgroundを提供し、学習しやすい環境が整っています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>kotlinlang.org - 公式ドキュメントとチュートリアル</li>
          <li>Kotlin Slack - 公式Slackコミュニティ（#general, #android等）</li>
          <li>KotlinConf - JetBrains主催の年次カンファレンス</li>
          <li>Kotlin Playground - ブラウザでKotlinを試せる公式ツール</li>
          <li>Kotlin YouTube - JetBrains公式YouTube（動画チュートリアル）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">公式学習リソース</h2>
        <p className="text-gray-400 mb-4">
          JetBrainsとKotlinコミュニティが提供する主要な学習リソースを確認しましょう。
        </p>
        <KotlinEditor
          defaultCode={`data class Resource(val name: String, val url: String, val type: String)

fun main() {
    val resources = listOf(
        Resource(
            "Kotlin公式ドキュメント",
            "kotlinlang.org/docs",
            "公式ドキュメント"
        ),
        Resource(
            "Kotlin Koans",
            "kotlinlang.org/docs/koans.html",
            "インタラクティブ演習"
        ),
        Resource(
            "Kotlin by Example",
            "play.kotlinlang.org/byExample",
            "コード例集"
        ),
        Resource(
            "Kotlin Playground",
            "play.kotlinlang.org",
            "オンラインIDE"
        ),
        Resource(
            "JetBrains Academy",
            "hyperskill.org",
            "コース学習"
        ),
        Resource(
            "Kotlin YouTube",
            "youtube.com/@Kotlin",
            "動画チュートリアル"
        ),
        Resource(
            "Kotlin Slack",
            "kotlinlang.slack.com",
            "コミュニティ"
        )
    )

    println("=== Kotlin学習リソース ===")
    resources.groupBy { it.type }.forEach { (type, items) ->
        println("\\n[$type]")
        items.forEach { r -> println("  \${r.name}: \${r.url}") }
    }
}`}
          expectedOutput={`=== Kotlin学習リソース ===

[公式ドキュメント]
  Kotlin公式ドキュメント: kotlinlang.org/docs

[インタラクティブ演習]
  Kotlin Koans: kotlinlang.org/docs/koans.html

[コード例集]
  Kotlin by Example: play.kotlinlang.org/byExample

[オンラインIDE]
  Kotlin Playground: play.kotlinlang.org

[コース学習]
  JetBrains Academy: hyperskill.org

[動画チュートリアル]
  Kotlin YouTube: youtube.com/@Kotlin

[コミュニティ]
  Kotlin Slack: kotlinlang.slack.com`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">次のステップ</h2>
        <p className="text-gray-400 mb-4">
          Kotlinの基礎を習得した後のキャリアパスと学習の方向性を確認しましょう。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val learningPaths = mapOf(
        "Androidエンジニア" to listOf(
            "Jetpack Compose をマスター",
            "Android Architecture Components (ViewModel, Room, Navigation)",
            "コルーチンとFlowを実践で使う",
            "Google Play Store への公開"
        ),
        "バックエンドエンジニア" to listOf(
            "KtorまたはSpring Bootでアプリ作成",
            "Exposed/SQLDelightでデータベース連携",
            "Dockerコンテナで本番デプロイ",
            "gRPC + Kotlinの実践"
        ),
        "マルチプラットフォームエンジニア" to listOf(
            "Kotlin Multiplatform (KMP) の習得",
            "Compose Multiplatform でUI共有",
            "iOS/Android共通ロジックの実装",
            "KMPアプリのApp Store/Play Store公開"
        )
    )

    learningPaths.forEach { (path, steps) ->
        println("\\n=== \${path} ===")
        steps.forEachIndexed { i, step -> println("\${i + 1}. \${step}") }
    }
}`}
          expectedOutput={`
=== Androidエンジニア ===
1. Jetpack Compose をマスター
2. Android Architecture Components (ViewModel, Room, Navigation)
3. コルーチンとFlowを実践で使う
4. Google Play Store への公開

=== バックエンドエンジニア ===
1. KtorまたはSpring Bootでアプリ作成
2. Exposed/SQLDelightでデータベース連携
3. Dockerコンテナで本番デプロイ
4. gRPC + Kotlinの実践

=== マルチプラットフォームエンジニア ===
1. Kotlin Multiplatform (KMP) の習得
2. Compose Multiplatform でUI共有
3. iOS/Android共通ロジックの実装
4. KMPアプリのApp Store/Play Store公開`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="community-resources" />
      </div>
      <LessonNav lessons={lessons} currentId="community-resources" basePath="/learn/ecosystem" />
    </div>
  );
}

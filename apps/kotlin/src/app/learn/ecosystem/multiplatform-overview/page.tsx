import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

export default function MultiplatformOverviewPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">Kotlinエコシステム レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Kotlin Multiplatform</h1>
        <p className="text-gray-400">iOS・Android・Webでコードを共有できるKotlin Multiplatformの仕組みを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Kotlin Multiplatform (KMP) とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlin Multiplatform（KMP）はビジネスロジック、データ処理、ネットワーク層などのコードを
          Android・iOS・Web・Desktopなど複数のプラットフォームで共有できる技術です。
          2023年にKMPが安定版、2024年にCompose Multiplatformが安定版になりました。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>commonMain - 全プラットフォームで共有するコード</li>
          <li>androidMain / iosMain - プラットフォーム固有の実装</li>
          <li>expect/actual - プラットフォーム依存の処理を抽象化</li>
          <li>Compose Multiplatform - UIも共有できるUIフレームワーク</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">KMPプロジェクト構造</h2>
        <p className="text-gray-400 mb-4">
          KMPプロジェクトではsourceSetで各プラットフォームのコードを分離します。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val kmpStructure = """
shared/
├── src/
│   ├── commonMain/kotlin/       // 全プラットフォーム共有
│   │   ├── model/
│   │   │   └── User.kt
│   │   ├── repository/
│   │   │   └── UserRepository.kt
│   │   └── Platform.kt          // expect宣言
│   ├── androidMain/kotlin/      // Android固有
│   │   └── Platform.android.kt  // actual実装
│   ├── iosMain/kotlin/          // iOS固有
│   │   └── Platform.ios.kt      // actual実装
│   └── jvmMain/kotlin/          // JVM固有（サーバー等）
│       └── Platform.jvm.kt
androidApp/                      // Androidアプリ
iosApp/                          // iOSアプリ (Swift/Xcode)
    """.trimIndent()

    println("=== KMPプロジェクト構造 ===")
    println(kmpStructure)

    val expectActualExample = """
// commonMain/Platform.kt
expect fun getPlatformName(): String

// androidMain/Platform.android.kt
actual fun getPlatformName(): String = "Android \${android.os.Build.VERSION.SDK_INT}"

// iosMain/Platform.ios.kt
actual fun getPlatformName(): String = UIDevice.currentDevice.systemName()
    """.trimIndent()

    println()
    println("=== expect/actual パターン ===")
    println(expectActualExample)
}`}
          expectedOutput={`=== KMPプロジェクト構造 ===
shared/
├── src/
│   ├── commonMain/kotlin/       // 全プラットフォーム共有
│   │   ├── model/
│   │   │   └── User.kt
│   │   ├── repository/
│   │   │   └── UserRepository.kt
│   │   └── Platform.kt          // expect宣言
│   ├── androidMain/kotlin/      // Android固有
│   │   └── Platform.android.kt  // actual実装
│   ├── iosMain/kotlin/          // iOS固有
│   │   └── Platform.ios.kt      // actual実装
│   └── jvmMain/kotlin/          // JVM固有（サーバー等）
│       └── Platform.jvm.kt
androidApp/                      // Androidアプリ
iosApp/                          // iOSアプリ (Swift/Xcode)

=== expect/actual パターン ===
// commonMain/Platform.kt
expect fun getPlatformName(): String

// androidMain/Platform.android.kt
actual fun getPlatformName(): String = "Android \${android.os.Build.VERSION.SDK_INT}"

// iosMain/Platform.ios.kt
actual fun getPlatformName(): String = UIDevice.currentDevice.systemName()`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">KMPで使える主要ライブラリ</h2>
        <p className="text-gray-400 mb-4">
          KMPエコシステムにはMultiplatform対応の主要ライブラリが揃っています。
        </p>
        <KotlinEditor
          defaultCode={`data class KmpLibrary(val name: String, val purpose: String)

fun main() {
    val libraries = listOf(
        KmpLibrary("kotlinx.coroutines", "非同期処理・コルーチン"),
        KmpLibrary("kotlinx.serialization", "JSON/その他シリアライゼーション"),
        KmpLibrary("Ktor Client", "HTTPクライアント（KMPネットワーク）"),
        KmpLibrary("SQLDelight", "型安全なSQLデータベース"),
        KmpLibrary("Koin", "依存性注入（DI）フレームワーク"),
        KmpLibrary("Compose Multiplatform", "宣言的UIフレームワーク"),
        KmpLibrary("kotlinx.datetime", "日付・時刻ライブラリ"),
        KmpLibrary("Multiplatform Settings", "Key-Valueデータ永続化")
    )

    println("=== KMP対応主要ライブラリ ===")
    libraries.forEach { lib ->
        println("\${lib.name}")
        println("  用途: \${lib.purpose}")
    }
}`}
          expectedOutput={`=== KMP対応主要ライブラリ ===
kotlinx.coroutines
  用途: 非同期処理・コルーチン
kotlinx.serialization
  用途: JSON/その他シリアライゼーション
Ktor Client
  用途: HTTPクライアント（KMPネットワーク）
SQLDelight
  用途: 型安全なSQLデータベース
Koin
  用途: 依存性注入（DI）フレームワーク
Compose Multiplatform
  用途: 宣言的UIフレームワーク
kotlinx.datetime
  用途: 日付・時刻ライブラリ
Multiplatform Settings
  用途: Key-Valueデータ永続化`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="multiplatform-overview" />
      </div>
      <LessonNav lessons={lessons} currentId="multiplatform-overview" basePath="/learn/ecosystem" />
    </div>
  );
}

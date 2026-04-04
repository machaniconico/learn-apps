import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("build");

export default function DependenciesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">Gradle・ビルド レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">依存関係の管理</h1>
        <p className="text-gray-400">build.gradle.ktsでライブラリの依存関係を追加・管理する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">依存関係の種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Gradleでは依存関係のスコープ（使用される範囲）を設定できます。
          主にimplementation、testImplementation、api、compileOnlyなどがあります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>implementation - 本番コードで使う依存関係（推奨）</li>
          <li>testImplementation - テストコードのみで使う依存関係</li>
          <li>api - 依存関係を公開APIとして公開する（ライブラリ開発時）</li>
          <li>compileOnly - コンパイル時のみ使用（実行時は不要）</li>
          <li>runtimeOnly - 実行時のみ使用（コンパイル時は不要）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">依存関係の追加方法</h2>
        <p className="text-gray-400 mb-4">
          dependencies {}ブロックに依存関係を記述します。Maven Centralなどのリポジトリから自動的にダウンロードされます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val dependenciesBlock = """
dependencies {
    // Kotlinの標準ライブラリ
    implementation(kotlin("stdlib"))

    // コルーチン
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3")

    // シリアライゼーション
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.0")

    // テスト
    testImplementation(kotlin("test"))
    testImplementation("io.kotest:kotest-runner-junit5:5.7.2")

    // ログ
    implementation("io.github.oshai:kotlin-logging-jvm:5.1.0")
}
    """.trimIndent()

    println(dependenciesBlock)
}`}
          expectedOutput={`dependencies {
    // Kotlinの標準ライブラリ
    implementation(kotlin("stdlib"))

    // コルーチン
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3")

    // シリアライゼーション
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.0")

    // テスト
    testImplementation(kotlin("test"))
    testImplementation("io.kotest:kotest-runner-junit5:5.7.2")

    // ログ
    implementation("io.github.oshai:kotlin-logging-jvm:5.1.0")
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">バージョンカタログによる一元管理</h2>
        <p className="text-gray-400 mb-4">
          Gradle 7.0以降のバージョンカタログ機能を使うと、依存関係のバージョンをlibs.versions.tomlで一元管理できます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val versionCatalog = """
// gradle/libs.versions.toml
[versions]
kotlin = "1.9.0"
coroutines = "1.7.3"
kotest = "5.7.2"
serialization = "1.6.0"

[libraries]
kotlin-stdlib = { module = "org.jetbrains.kotlin:kotlin-stdlib", version.ref = "kotlin" }
kotlinx-coroutines = { module = "org.jetbrains.kotlinx:kotlinx-coroutines-core", version.ref = "coroutines" }
kotlinx-serialization = { module = "org.jetbrains.kotlinx:kotlinx-serialization-json", version.ref = "serialization" }
kotest-runner = { module = "io.kotest:kotest-runner-junit5", version.ref = "kotest" }

[bundles]
test = ["kotest-runner"]
    """.trimIndent()

    val usageInBuild = """
// build.gradle.kts での使い方
dependencies {
    implementation(libs.kotlin.stdlib)
    implementation(libs.kotlinx.coroutines)
    testImplementation(libs.bundles.test)
}
    """.trimIndent()

    println(versionCatalog)
    println()
    println(usageInBuild)
}`}
          expectedOutput={`// gradle/libs.versions.toml
[versions]
kotlin = "1.9.0"
coroutines = "1.7.3"
kotest = "5.7.2"
serialization = "1.6.0"

[libraries]
kotlin-stdlib = { module = "org.jetbrains.kotlin:kotlin-stdlib", version.ref = "kotlin" }
kotlinx-coroutines = { module = "org.jetbrains.kotlinx:kotlinx-coroutines-core", version.ref = "coroutines" }
kotlinx-serialization = { module = "org.jetbrains.kotlinx:kotlinx-serialization-json", version.ref = "serialization" }
kotest-runner = { module = "io.kotest:kotest-runner-junit5", version.ref = "kotest" }

[bundles]
test = ["kotest-runner"]

// build.gradle.kts での使い方
dependencies {
    implementation(libs.kotlin.stdlib)
    implementation(libs.kotlinx.coroutines)
    testImplementation(libs.bundles.test)
}`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="build" lessonId="dependencies" />
      </div>
      <LessonNav lessons={lessons} currentId="dependencies" basePath="/learn/build" />
    </div>
  );
}

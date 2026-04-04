import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("build");

export default function PluginsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">Gradle・ビルド レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">プラグイン</h1>
        <p className="text-gray-400">Kotlinプラグインやその他のGradleプラグインの適用と設定方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Gradleプラグインとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Gradleプラグインはビルドスクリプトに機能を追加するモジュールです。
          Kotlinコンパイル、Android開発、シリアライゼーション、コードカバレッジなど様々なプラグインがあります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>kotlin("jvm") - KotlinをJVMターゲットでビルド</li>
          <li>kotlin("android") - Kotlin Androidプラグイン</li>
          <li>kotlin("plugin.serialization") - シリアライゼーション</li>
          <li>application - 実行可能アプリケーション</li>
          <li>jacoco - コードカバレッジレポート</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">プラグインの適用</h2>
        <p className="text-gray-400 mb-4">
          pluginsブロックでプラグインを適用します。Kotlin DSLでは型安全に設定できます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val pluginsExample = """
// build.gradle.kts

plugins {
    // Kotlin JVMプラグイン
    kotlin("jvm") version "1.9.0"

    // シリアライゼーションプラグイン
    kotlin("plugin.serialization") version "1.9.0"

    // アプリケーションプラグイン（mainClass設定）
    application

    // JaCoCoコードカバレッジ
    jacoco

    // Ktlintコードフォーマット
    id("org.jlleitschuh.gradle.ktlint") version "11.6.1"
}

application {
    mainClass.set("com.example.MainKt")
}

jacoco {
    toolVersion = "0.8.9"
}
    """.trimIndent()

    println(pluginsExample)
}`}
          expectedOutput={`// build.gradle.kts

plugins {
    // Kotlin JVMプラグイン
    kotlin("jvm") version "1.9.0"

    // シリアライゼーションプラグイン
    kotlin("plugin.serialization") version "1.9.0"

    // アプリケーションプラグイン（mainClass設定）
    application

    // JaCoCoコードカバレッジ
    jacoco

    // Ktlintコードフォーマット
    id("org.jlleitschuh.gradle.ktlint") version "11.6.1"
}

application {
    mainClass.set("com.example.MainKt")
}

jacoco {
    toolVersion = "0.8.9"
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">よく使うKotlinプラグインの一覧</h2>
        <p className="text-gray-400 mb-4">
          Kotlinエコシステムで頻繁に使われるプラグインとその用途を確認しましょう。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    data class Plugin(val id: String, val purpose: String)

    val kotlinPlugins = listOf(
        Plugin("kotlin(\"jvm\")", "Kotlin JVMアプリ開発"),
        Plugin("kotlin(\"android\")", "Kotlin Androidアプリ開発"),
        Plugin("kotlin(\"multiplatform\")", "Kotlin Multiplatform"),
        Plugin("kotlin(\"plugin.serialization\")", "kotlinx.serialization"),
        Plugin("kotlin(\"plugin.allopen\")", "Spring等でのopen class自動化"),
        Plugin("kotlin(\"plugin.spring\")", "Spring Boot + Kotlin統合")
    )

    val thirdPartyPlugins = listOf(
        Plugin("id(\"com.google.devtools.ksp\")", "Kotlin Symbol Processing"),
        Plugin("id(\"io.ktor.plugin\")", "Ktorアプリのパッケージング"),
        Plugin("id(\"org.springframework.boot\")", "Spring Bootアプリ"),
        Plugin("id(\"com.github.johnrengelman.shadow\")", "FatJAR生成")
    )

    println("=== Kotlin公式プラグイン ===")
    kotlinPlugins.forEach { println("  \${it.id} -> \${it.purpose}") }
    println()
    println("=== サードパーティプラグイン ===")
    thirdPartyPlugins.forEach { println("  \${it.id} -> \${it.purpose}") }
}`}
          expectedOutput={`=== Kotlin公式プラグイン ===
  kotlin("jvm") -> Kotlin JVMアプリ開発
  kotlin("android") -> Kotlin Androidアプリ開発
  kotlin("multiplatform") -> Kotlin Multiplatform
  kotlin("plugin.serialization") -> kotlinx.serialization
  kotlin("plugin.allopen") -> Spring等でのopen class自動化
  kotlin("plugin.spring") -> Spring Boot + Kotlin統合

=== サードパーティプラグイン ===
  id("com.google.devtools.ksp") -> Kotlin Symbol Processing
  id("io.ktor.plugin") -> Ktorアプリのパッケージング
  id("org.springframework.boot") -> Spring Bootアプリ
  id("com.github.johnrengelman.shadow") -> FatJAR生成`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="build" lessonId="plugins" />
      </div>
      <LessonNav lessons={lessons} currentId="plugins" basePath="/learn/build" />
    </div>
  );
}

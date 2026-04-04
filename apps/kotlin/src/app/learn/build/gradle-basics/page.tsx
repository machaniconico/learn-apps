import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("build");

export default function GradleBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">Gradle・ビルド レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Gradleの基本</h1>
        <p className="text-gray-400">KotlinプロジェクトにおけるGradleビルドシステムの基本構造を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Gradleとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          GradleはKotlinプロジェクトで広く使われるビルド自動化ツールです。
          依存関係の解決、コンパイル、テスト実行、パッケージングなどを管理します。
          Kotlin DSLを使うことでbuild.gradle.ktsとして型安全なビルドスクリプトを書けます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>build.gradle.kts - Kotlin DSLのビルドスクリプト</li>
          <li>settings.gradle.kts - プロジェクト設定ファイル</li>
          <li>gradle.properties - Gradleプロパティ設定</li>
          <li>gradlew / gradlew.bat - Gradleラッパースクリプト</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Gradleプロジェクト構造</h2>
        <p className="text-gray-400 mb-4">
          典型的なKotlin/JVMプロジェクトのディレクトリ構造とGradleファイルの役割を確認します。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val structure = """
        my-kotlin-project/
        ├── build.gradle.kts      // ビルド設定
        ├── settings.gradle.kts   // プロジェクト名・サブモジュール
        ├── gradle.properties     // バージョン等のプロパティ
        ├── gradlew               // Gradleラッパー(Unix)
        ├── gradlew.bat           // Gradleラッパー(Windows)
        ├── gradle/
        │   └── wrapper/
        │       └── gradle-wrapper.properties
        └── src/
            ├── main/
            │   └── kotlin/       // Kotlinソースコード
            └── test/
                └── kotlin/       // テストコード
    """.trimIndent()

    println(structure)
    println("\\n=== settings.gradle.kts の内容 ===")
    println("rootProject.name = \"my-kotlin-project\"")
}`}
          expectedOutput={`my-kotlin-project/
├── build.gradle.kts      // ビルド設定
├── settings.gradle.kts   // プロジェクト名・サブモジュール
├── gradle.properties     // バージョン等のプロパティ
├── gradlew               // Gradleラッパー(Unix)
├── gradlew.bat           // Gradleラッパー(Windows)
├── gradle/
│   └── wrapper/
│       └── gradle-wrapper.properties
└── src/
    ├── main/
    │   └── kotlin/       // Kotlinソースコード
    └── test/
        └── kotlin/       // テストコード

=== settings.gradle.kts の内容 ===
rootProject.name = "my-kotlin-project"`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Kotlin DSLビルドスクリプトの基本</h2>
        <p className="text-gray-400 mb-4">
          build.gradle.ktsの基本的な構造を理解します。pluginsブロック、repositoriesブロック、dependenciesブロックが主要な要素です。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    // build.gradle.kts の典型的な構造を文字列で表示
    val buildScript = """
plugins {
    kotlin("jvm") version "1.9.0"
    application
}

group = "com.example"
version = "1.0.0"

repositories {
    mavenCentral()
}

dependencies {
    implementation(kotlin("stdlib"))
    testImplementation(kotlin("test"))
}

application {
    mainClass.set("com.example.MainKt")
}
    """.trimIndent()

    println("=== build.gradle.kts ===")
    println(buildScript)
}`}
          expectedOutput={`=== build.gradle.kts ===
plugins {
    kotlin("jvm") version "1.9.0"
    application
}

group = "com.example"
version = "1.0.0"

repositories {
    mavenCentral()
}

dependencies {
    implementation(kotlin("stdlib"))
    testImplementation(kotlin("test"))
}

application {
    mainClass.set("com.example.MainKt")
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Gradleの主要コマンド</h2>
        <p className="text-gray-400 mb-4">
          日常的に使うGradleコマンドとその用途を覚えましょう。Gradleラッパー（./gradlew）を使うことが推奨されます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    data class GradleCommand(val command: String, val description: String)

    val commands = listOf(
        GradleCommand("./gradlew build", "プロジェクト全体をビルド"),
        GradleCommand("./gradlew run", "アプリケーションを実行"),
        GradleCommand("./gradlew test", "テストを実行"),
        GradleCommand("./gradlew clean", "ビルド成果物を削除"),
        GradleCommand("./gradlew tasks", "利用可能なタスク一覧を表示"),
        GradleCommand("./gradlew dependencies", "依存関係ツリーを表示"),
        GradleCommand("./gradlew jar", "JARファイルを生成"),
        GradleCommand("./gradlew --info build", "詳細ログ付きビルド")
    )

    println("=== Gradle主要コマンド ===")
    commands.forEach { cmd ->
        println("\${cmd.command}")
        println("  -> \${cmd.description}")
    }
}`}
          expectedOutput={`=== Gradle主要コマンド ===
./gradlew build
  -> プロジェクト全体をビルド
./gradlew run
  -> アプリケーションを実行
./gradlew test
  -> テストを実行
./gradlew clean
  -> ビルド成果物を削除
./gradlew tasks
  -> 利用可能なタスク一覧を表示
./gradlew dependencies
  -> 依存関係ツリーを表示
./gradlew jar
  -> JARファイルを生成
./gradlew --info build
  -> 詳細ログ付きビルド`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="build" lessonId="gradle-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="gradle-basics" basePath="/learn/build" />
    </div>
  );
}

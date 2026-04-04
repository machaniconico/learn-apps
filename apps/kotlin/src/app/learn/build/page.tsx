import { KotlinEditor } from "@/components/kotlin-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("build");

const quizQuestions: QuizQuestion[] = [
  {
    question: "KotlinプロジェクトでKotlin DSLのビルドファイル名はどれですか？",
    options: ["build.gradle", "build.gradle.kts", "build.kotlin", "settings.gradle"],
    answer: 1,
    explanation: "Kotlin DSLを使う場合、ビルドファイルはbuild.gradle.ktsという拡張子になります。",
  },
  {
    question: "Gradleでライブラリの依存関係を追加するブロックはどれですか？",
    options: ["plugins { }", "dependencies { }", "repositories { }", "kotlin { }"],
    answer: 1,
    explanation: "dependencies { }ブロックの中にimplementationやtestImplementationなどを記述して依存関係を追加します。",
  },
  {
    question: "Gradleのマルチモジュールプロジェクトで各サブモジュールを定義するファイルはどれですか？",
    options: ["build.gradle.kts", "settings.gradle.kts", "gradle.properties", "local.properties"],
    answer: 1,
    explanation: "settings.gradle.ktsにinclude()でサブモジュールを列挙することでマルチモジュール構成を定義します。",
  },
  {
    question: "Kotlinコンパイラプラグインを適用するGradleブロックはどれですか？",
    options: ["dependencies { }", "kotlin { }", "plugins { }", "apply { }"],
    answer: 2,
    explanation: "plugins { }ブロック内でkotlin(\"jvm\")やkotlin(\"plugin.serialization\")などのプラグインを適用します。",
  },
];

export default function BuildPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-400 mb-2">Gradle・ビルド</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          KotlinプロジェクトのビルドシステムであるGradleを学びます。Kotlin DSLを使ったbuild.gradle.ktsの書き方、
          依存関係の管理、プラグインの適用、カスタムタスクの追加、
          大規模プロジェクト向けのマルチモジュール構成まで幅広くカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="build" totalLessons={5} color="indigo" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/build" color="indigo" categoryId="build" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Kotlin DSLによるビルドスクリプト</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-indigo-300">build.gradle.kts</code>はKotlinで書かれたGradleビルドスクリプトです。
          型安全なAPIとIDEのコード補完が使えます。
        </p>
        <KotlinEditor
          defaultCode={`// build.gradle.kts の基本構造を示すサンプル
fun main() {
    val projectName = "my-kotlin-app"
    val kotlinVersion = "1.9.0"
    val jvmTarget = "17"

    println("プロジェクト: \${projectName}")
    println("Kotlinバージョン: \${kotlinVersion}")
    println("JVMターゲット: \${jvmTarget}")

    // 依存関係の例
    val dependencies = listOf(
        "implementation(\"org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3\")",
        "testImplementation(\"io.kotest:kotest-runner-junit5:5.7.2\")"
    )
    println("\\n依存関係:")
    dependencies.forEach { println("  \${it}") }
}`}
          expectedOutput={`プロジェクト: my-kotlin-app
Kotlinバージョン: 1.9.0
JVMターゲット: 17

依存関係:
  implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3")
  testImplementation("io.kotest:kotest-runner-junit5:5.7.2")`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Gradleタスクの概念</h2>
        <p className="text-gray-400 mb-4">
          Gradleではビルド、テスト、パッケージングなどの処理を<code className="text-indigo-300">タスク</code>として定義します。
          標準タスクに加えてカスタムタスクも作れます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    // Gradleの主要タスクを表示
    val tasks = mapOf(
        "build" to "プロジェクトをビルドする",
        "test" to "テストを実行する",
        "clean" to "ビルド成果物を削除する",
        "run" to "アプリケーションを実行する",
        "jar" to "JARファイルを生成する",
        "dependencies" to "依存関係ツリーを表示する"
    )

    println("=== Gradle主要タスク ===")
    tasks.forEach { (task, description) ->
        println("./gradlew \${task} - \${description}")
    }
}`}
          expectedOutput={`=== Gradle主要タスク ===
./gradlew build - プロジェクトをビルドする
./gradlew test - テストを実行する
./gradlew clean - ビルド成果物を削除する
./gradlew run - アプリケーションを実行する
./gradlew jar - JARファイルを生成する
./gradlew dependencies - 依存関係ツリーを表示する`}
        />
      </section>
      <Quiz questions={quizQuestions} color="indigo" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("build");

export default function BuildScriptsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">Gradle・ビルド レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ビルドスクリプト</h1>
        <p className="text-gray-400">Kotlin DSLを使ったbuild.gradle.ktsの書き方とカスタムタスクの追加を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Kotlin DSLの利点</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlin DSL（Domain Specific Language）でGradleスクリプトを書くとGroovy DSLと比べて以下の利点があります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>IDEによる型安全なコード補完</li>
          <li>コンパイル時のエラーチェック</li>
          <li>KotlinコードなのでIDEのリファクタリング機能が使える</li>
          <li>ドキュメントのインラインナビゲーション</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カスタムタスクの定義</h2>
        <p className="text-gray-400 mb-4">
          Gradleではカスタムタスクを定義してビルドプロセスに独自の処理を追加できます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val customTaskExample = """
// build.gradle.kts にカスタムタスクを追加

// シンプルなカスタムタスク
tasks.register("hello") {
    doLast {
        println("Hello from custom task!")
    }
}

// 型付きカスタムタスク
tasks.register<Copy>("copyDocs") {
    from("docs/")
    into(layout.buildDirectory.dir("output/docs"))
}

// 依存関係を持つタスク
tasks.register("buildAndCopy") {
    dependsOn("build", "copyDocs")
    doLast {
        println("Build and copy completed!")
    }
}
    """.trimIndent()

    println(customTaskExample)

    // タスクの実行順序をシミュレート
    println()
    println("=== タスク実行順序 ===")
    val taskOrder = listOf("compileKotlin", "compileTestKotlin", "test", "jar", "build")
    taskOrder.forEachIndexed { index, task ->
        println("\${index + 1}. \${task}")
    }
}`}
          expectedOutput={`// build.gradle.kts にカスタムタスクを追加

// シンプルなカスタムタスク
tasks.register("hello") {
    doLast {
        println("Hello from custom task!")
    }
}

// 型付きカスタムタスク
tasks.register<Copy>("copyDocs") {
    from("docs/")
    into(layout.buildDirectory.dir("output/docs"))
}

// 依存関係を持つタスク
tasks.register("buildAndCopy") {
    dependsOn("build", "copyDocs")
    doLast {
        println("Build and copy completed!")
    }
}

=== タスク実行順序 ===
1. compileKotlin
2. compileTestKotlin
3. test
4. jar
5. build`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ビルド設定のカスタマイズ</h2>
        <p className="text-gray-400 mb-4">
          kotlinブロックやjavaブロックを使ってコンパイラオプションやJVMターゲットを設定できます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val buildConfig = """
// build.gradle.kts - 詳細設定

kotlin {
    jvmToolchain(17)  // JVM 17を使用
}

tasks.withType<org.jetbrains.kotlin.gradle.tasks.KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs += listOf(
            "-Xjsr305=strict",        // null安全の厳格化
            "-opt-in=kotlin.RequiresOptIn"
        )
        jvmTarget = "17"
    }
}

// テスト設定
tasks.test {
    useJUnitPlatform()
    testLogging {
        events("passed", "skipped", "failed")
    }
}
    """.trimIndent()

    println(buildConfig)
}`}
          expectedOutput={`// build.gradle.kts - 詳細設定

kotlin {
    jvmToolchain(17)  // JVM 17を使用
}

tasks.withType<org.jetbrains.kotlin.gradle.tasks.KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs += listOf(
            "-Xjsr305=strict",        // null安全の厳格化
            "-opt-in=kotlin.RequiresOptIn"
        )
        jvmTarget = "17"
    }
}

// テスト設定
tasks.test {
    useJUnitPlatform()
    testLogging {
        events("passed", "skipped", "failed")
    }
}`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="build" lessonId="build-scripts" />
      </div>
      <LessonNav lessons={lessons} currentId="build-scripts" basePath="/learn/build" />
    </div>
  );
}

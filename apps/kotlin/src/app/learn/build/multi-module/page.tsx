import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("build");

export default function MultiModulePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">Gradle・ビルド レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">マルチモジュール</h1>
        <p className="text-gray-400">大規模プロジェクト向けのGradleマルチモジュール構成の作り方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">マルチモジュール構成の利点</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          マルチモジュール構成では1つのプロジェクトを複数のサブモジュールに分割して管理します。
          大規模プロジェクトでのコード整理に有効です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>関心の分離 - ドメイン、インフラ、APIなど層ごとにモジュール化</li>
          <li>ビルドキャッシュの活用 - 変更のないモジュールは再ビルド不要</li>
          <li>並列ビルド - 依存のないモジュールを並列コンパイル</li>
          <li>コードの再利用 - 複数のアプリから共通モジュールを参照</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">マルチモジュール構成の例</h2>
        <p className="text-gray-400 mb-4">
          典型的なKotlinマルチモジュールプロジェクトの構造とsettings.gradle.ktsの設定を確認します。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val structure = """
my-app/
├── settings.gradle.kts       // モジュール定義
├── build.gradle.kts          // ルートビルド設定
├── app/                      // アプリモジュール
│   ├── build.gradle.kts
│   └── src/main/kotlin/
├── domain/                   // ドメインロジック
│   ├── build.gradle.kts
│   └── src/main/kotlin/
├── data/                     // データ層
│   ├── build.gradle.kts
│   └── src/main/kotlin/
└── common/                   // 共通ユーティリティ
    ├── build.gradle.kts
    └── src/main/kotlin/
    """.trimIndent()

    val settingsFile = """
// settings.gradle.kts
rootProject.name = "my-app"

include(":app")
include(":domain")
include(":data")
include(":common")
    """.trimIndent()

    println("=== プロジェクト構造 ===")
    println(structure)
    println()
    println(settingsFile)
}`}
          expectedOutput={`=== プロジェクト構造 ===
my-app/
├── settings.gradle.kts       // モジュール定義
├── build.gradle.kts          // ルートビルド設定
├── app/                      // アプリモジュール
│   ├── build.gradle.kts
│   └── src/main/kotlin/
├── domain/                   // ドメインロジック
│   ├── build.gradle.kts
│   └── src/main/kotlin/
├── data/                     // データ層
│   ├── build.gradle.kts
│   └── src/main/kotlin/
└── common/                   // 共通ユーティリティ
    ├── build.gradle.kts
    └── src/main/kotlin/

// settings.gradle.kts
rootProject.name = "my-app"

include(":app")
include(":domain")
include(":data")
include(":common")`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">モジュール間の依存関係</h2>
        <p className="text-gray-400 mb-4">
          サブモジュールのbuild.gradle.ktsではproject()関数で他のモジュールへの依存を宣言します。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val appBuild = """
// app/build.gradle.kts
plugins {
    kotlin("jvm")
    application
}

dependencies {
    implementation(project(":domain"))
    implementation(project(":data"))
    implementation(project(":common"))
}
    """.trimIndent()

    val domainBuild = """
// domain/build.gradle.kts
plugins {
    kotlin("jvm")
}

dependencies {
    implementation(project(":common"))
    // domainはdataに依存しない（クリーンアーキテクチャ）
}
    """.trimIndent()

    println(appBuild)
    println()
    println(domainBuild)

    println()
    println("=== 依存関係グラフ ===")
    println("app -> domain, data, common")
    println("data -> domain, common")
    println("domain -> common")
    println("common -> (なし)")
}`}
          expectedOutput={`// app/build.gradle.kts
plugins {
    kotlin("jvm")
    application
}

dependencies {
    implementation(project(":domain"))
    implementation(project(":data"))
    implementation(project(":common"))
}

// domain/build.gradle.kts
plugins {
    kotlin("jvm")
}

dependencies {
    implementation(project(":common"))
    // domainはdataに依存しない（クリーンアーキテクチャ）
}

=== 依存関係グラフ ===
app -> domain, data, common
data -> domain, common
domain -> common
common -> (なし)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="build" lessonId="multi-module" />
      </div>
      <LessonNav lessons={lessons} currentId="multi-module" basePath="/learn/build" />
    </div>
  );
}

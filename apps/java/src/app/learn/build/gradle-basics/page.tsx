import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("build");

export default function GradleBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ビルドツール レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Gradle基礎</h1>
        <p className="text-gray-400">build.gradle(.kts)、plugins、dependencies</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Gradleとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          GradleはMavenの後継として広く使われるビルドツールです。
          GroovyまたはKotlin DSLでビルドスクリプトを記述し、Mavenより柔軟で高速なビルドが可能です。
          Spring Initializrのデフォルトビルドツールとしても採用されています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>build.gradle</code> - Groovy DSLによるビルドファイル</li>
          <li><code>build.gradle.kts</code> - Kotlin DSLによるビルドファイル（型安全）</li>
          <li><code>settings.gradle(.kts)</code> - プロジェクト設定ファイル</li>
          <li><code>gradlew / gradlew.bat</code> - Gradle Wrapper（推奨される実行方法）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">build.gradle.ktsの基本構造</h2>
        <p className="text-gray-400 mb-4">
          Kotlin DSLでのGradleビルドファイルの主要な要素を確認しましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("=== build.gradle.kts の基本構造 ===");
        System.out.println();
        System.out.println("plugins {");
        System.out.println("    java");
        System.out.println("    id(\\"org.springframework.boot\\") version \\"3.2.0\\"");
        System.out.println("}");
        System.out.println();
        System.out.println("group = \\"com.example\\"");
        System.out.println("version = \\"1.0.0\\"");
        System.out.println();
        System.out.println("repositories {");
        System.out.println("    mavenCentral()");
        System.out.println("}");
        System.out.println();
        System.out.println("dependencies {");
        System.out.println("    implementation(\\"org.springframework.boot:spring-boot-starter-web\\")");
        System.out.println("    testImplementation(\\"org.junit.jupiter:junit-jupiter:5.10.0\\")");
        System.out.println("}");
    }
}`}
          expectedOutput={`=== build.gradle.kts の基本構造 ===

plugins {
    java
    id("org.springframework.boot") version "3.2.0"
}

group = "com.example"
version = "1.0.0"

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    testImplementation("org.junit.jupiter:junit-jupiter:5.10.0")
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">GradleとMavenの比較</h2>
        <p className="text-gray-400 mb-4">
          GradleとMavenの主な違いを整理しましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("=== Gradle vs Maven 比較 ===");
        System.out.println();

        String[][] comparison = {
            {"設定ファイル", "build.gradle(.kts)", "pom.xml"},
            {"記述言語", "Groovy / Kotlin DSL", "XML"},
            {"ビルド速度", "高速（増分ビルド）", "標準"},
            {"柔軟性", "高い（スクリプト記述可）", "プラグイン中心"},
            {"学習コスト", "やや高い", "低い"},
            {"キャッシュ", "あり（ビルドキャッシュ）", "なし"}
        };

        System.out.printf("%-14s %-26s %s%n", "項目", "Gradle", "Maven");
        System.out.println("-".repeat(60));
        for (String[] row : comparison) {
            System.out.printf("%-14s %-26s %s%n", row[0], row[1], row[2]);
        }
    }
}`}
          expectedOutput={`=== Gradle vs Maven 比較 ===

項目             Gradle                     Maven
------------------------------------------------------------
設定ファイル       build.gradle(.kts)         pom.xml
記述言語          Groovy / Kotlin DSL        XML
ビルド速度        高速（増分ビルド）              標準
柔軟性           高い（スクリプト記述可）          プラグイン中心
学習コスト        やや高い                     低い
キャッシュ        あり（ビルドキャッシュ）           なし`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Gradleタスク</h2>
        <p className="text-gray-400 mb-4">
          Gradleではビルドの各ステップを「タスク」として定義・実行します。
          <code className="text-orange-300">./gradlew</code>（Gradle Wrapper）を使って実行するのが推奨されます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("=== よく使うGradleコマンド ===");
        System.out.println();

        String[][] commands = {
            {"./gradlew build", "ビルド実行（コンパイル+テスト+JAR作成）"},
            {"./gradlew clean", "ビルド出力を削除"},
            {"./gradlew test", "テストを実行"},
            {"./gradlew bootRun", "Spring Bootアプリを起動"},
            {"./gradlew tasks", "利用可能なタスク一覧"},
            {"./gradlew dependencies", "依存関係ツリーを表示"}
        };

        for (String[] cmd : commands) {
            System.out.printf("%-30s %s%n", cmd[0], cmd[1]);
        }

        System.out.println();
        System.out.println("※ gradlewはGradle Wrapperで、");
        System.out.println("  Gradleのインストール不要で実行可能");
    }
}`}
          expectedOutput={`=== よく使うGradleコマンド ===

./gradlew build                ビルド実行（コンパイル+テスト+JAR作成）
./gradlew clean                ビルド出力を削除
./gradlew test                 テストを実行
./gradlew bootRun              Spring Bootアプリを起動
./gradlew tasks                利用可能なタスク一覧
./gradlew dependencies         依存関係ツリーを表示

※ gradlewはGradle Wrapperで、
  Gradleのインストール不要で実行可能`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="build" lessonId="gradle-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="gradle-basics" basePath="/learn/build" />
    </div>
  );
}

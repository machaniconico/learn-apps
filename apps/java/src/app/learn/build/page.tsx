import { JavaEditor } from "@/components/java-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("build");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Mavenのpom.xmlの役割として正しいものはどれですか？",
    options: [
      "プロジェクトの設定、依存関係、ビルド手順を定義するXMLファイル",
      "Javaのソースコードを記述するファイル",
      "コンパイル結果を保存するファイル",
      "テスト結果のレポートファイル",
    ],
    answer: 0,
    explanation: "pom.xml（Project Object Model）はMavenプロジェクトの中心的な設定ファイルです。groupId、artifactId、dependencies、pluginsなどを定義します。",
  },
  {
    question: "Mavenのビルドライフサイクルで正しい順序はどれですか？",
    options: [
      "compile → test → package → install → deploy",
      "test → compile → package → deploy → install",
      "package → compile → test → install → deploy",
      "install → compile → test → package → deploy",
    ],
    answer: 0,
    explanation: "Mavenのデフォルトライフサイクルは、validate → compile → test → package → verify → install → deployの順で実行されます。",
  },
  {
    question: "Gradleのbuild.gradleについて正しいものはどれですか？",
    options: [
      "GroovyまたはKotlin DSLでビルド設定を記述する、Mavenより柔軟なビルドファイル",
      "XMLで記述するビルドファイル",
      "Javaコードとして記述するビルドファイル",
      "JSONで記述するビルドファイル",
    ],
    answer: 0,
    explanation: "Gradleはbuild.gradle（Groovy DSL）またはbuild.gradle.kts（Kotlin DSL）でビルド設定を記述します。Mavenと比べて柔軟で高速なビルドが可能です。",
  },
  {
    question: "依存関係管理について正しいものはどれですか？",
    options: [
      "Maven CentralやGradleのリポジトリから自動的にライブラリをダウンロードし、推移的依存関係も解決する",
      "ライブラリは必ず手動でダウンロードする必要がある",
      "依存関係はコンパイル時のみ必要である",
      "1つのプロジェクトに依存関係は5つまでしか追加できない",
    ],
    answer: 0,
    explanation: "MavenもGradleもMaven Centralなどのリポジトリからライブラリを自動ダウンロードし、依存先のさらに依存するライブラリ（推移的依存関係）も自動で解決します。",
  },
];

export default function BuildPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-pink-400 mb-2">Maven・Gradle</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Javaのビルドツールを学びましょう。Mavenのpom.xmlとライフサイクル、Gradleのbuild.gradle、
          依存関係の管理、そしてプロジェクト構造のベストプラクティスを理解します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="build" totalLessons={5} color="pink" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/build" color="pink" categoryId="build" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Maven pom.xmlの構造</h2>
        <p className="text-gray-400 mb-4">
          Mavenプロジェクトの設定ファイルpom.xmlの構造を確認しましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("=== Maven pom.xml の基本構造 ===");
        System.out.println();

        String pomStructure = """
            <project>
              <modelVersion>4.0.0</modelVersion>

              <!-- プロジェクト情報 -->
              <groupId>com.example</groupId>
              <artifactId>my-app</artifactId>
              <version>1.0.0</version>
              <packaging>jar</packaging>

              <!-- プロパティ -->
              <properties>
                <java.version>21</java.version>
                <maven.compiler.source>21</maven.compiler.source>
                <maven.compiler.target>21</maven.compiler.target>
              </properties>

              <!-- 依存関係 -->
              <dependencies>
                <dependency>
                  <groupId>org.junit.jupiter</groupId>
                  <artifactId>junit-jupiter</artifactId>
                  <version>5.10.0</version>
                  <scope>test</scope>
                </dependency>
              </dependencies>
            </project>
            """;
        System.out.println(pomStructure);

        System.out.println("=== Mavenライフサイクル ===");
        String[] phases = {
            "validate  - プロジェクトの検証",
            "compile   - ソースコードのコンパイル",
            "test      - テストの実行",
            "package   - JAR/WARの作成",
            "verify    - 品質チェック",
            "install   - ローカルリポジトリにインストール",
            "deploy    - リモートリポジトリにデプロイ"
        };
        for (String phase : phases) {
            System.out.println("  " + phase);
        }
    }
}`}
          expectedOutput={`=== Maven pom.xml の基本構造 ===

<project>
  <modelVersion>4.0.0</modelVersion>

  <!-- プロジェクト情報 -->
  <groupId>com.example</groupId>
  <artifactId>my-app</artifactId>
  <version>1.0.0</version>
  <packaging>jar</packaging>

  <!-- プロパティ -->
  <properties>
    <java.version>21</java.version>
    <maven.compiler.source>21</maven.compiler.source>
    <maven.compiler.target>21</maven.compiler.target>
  </properties>

  <!-- 依存関係 -->
  <dependencies>
    <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter</artifactId>
      <version>5.10.0</version>
      <scope>test</scope>
    </dependency>
  </dependencies>
</project>

=== Mavenライフサイクル ===
  validate  - プロジェクトの検証
  compile   - ソースコードのコンパイル
  test      - テストの実行
  package   - JAR/WARの作成
  verify    - 品質チェック
  install   - ローカルリポジトリにインストール
  deploy    - リモートリポジトリにデプロイ`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Gradleビルドスクリプト</h2>
        <p className="text-gray-400 mb-4">
          GradleのビルドスクリプトとMavenとの比較を確認しましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("=== Gradle build.gradle.kts (Kotlin DSL) ===");
        System.out.println();

        String gradleScript = """
            plugins {
                java
                application
            }

            group = "com.example"
            version = "1.0.0"

            java {
                sourceCompatibility = JavaVersion.VERSION_21
                targetCompatibility = JavaVersion.VERSION_21
            }

            repositories {
                mavenCentral()
            }

            dependencies {
                implementation("com.google.guava:guava:32.1.3-jre")
                testImplementation("org.junit.jupiter:junit-jupiter:5.10.0")
            }

            application {
                mainClass.set("com.example.Main")
            }
            """;
        System.out.println(gradleScript);

        System.out.println("=== Maven vs Gradle 比較 ===");
        System.out.println("┌─────────────┬──────────────┬──────────────┐");
        System.out.println("│ 項目        │ Maven        │ Gradle       │");
        System.out.println("├─────────────┼──────────────┼──────────────┤");
        System.out.println("│ 設定形式    │ XML          │ Groovy/Kotlin│");
        System.out.println("│ ビルド速度  │ 標準         │ 高速         │");
        System.out.println("│ 柔軟性      │ 規約ベース   │ 高い         │");
        System.out.println("│ 学習コスト  │ 低い         │ やや高い     │");
        System.out.println("│ インクリメンタル│ なし      │ あり         │");
        System.out.println("└─────────────┴──────────────┴──────────────┘");
    }
}`}
          expectedOutput={`=== Gradle build.gradle.kts (Kotlin DSL) ===

plugins {
    java
    application
}

group = "com.example"
version = "1.0.0"

java {
    sourceCompatibility = JavaVersion.VERSION_21
    targetCompatibility = JavaVersion.VERSION_21
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("com.google.guava:guava:32.1.3-jre")
    testImplementation("org.junit.jupiter:junit-jupiter:5.10.0")
}

application {
    mainClass.set("com.example.Main")
}

=== Maven vs Gradle 比較 ===
┌─────────────┬──────────────┬──────────────┐
│ 項目        │ Maven        │ Gradle       │
├─────────────┼──────────────┼──────────────┤
│ 設定形式    │ XML          │ Groovy/Kotlin│
│ ビルド速度  │ 標準         │ 高速         │
│ 柔軟性      │ 規約ベース   │ 高い         │
│ 学習コスト  │ 低い         │ やや高い     │
│ インクリメンタル│ なし      │ あり         │
└─────────────┴──────────────┴──────────────┘`}
        />
      </section>

      <Quiz questions={quizQuestions} color="pink" />
    </div>
  );
}

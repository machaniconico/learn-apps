import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("build");

export default function JarPackagingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ビルドツール レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">JARパッケージング</h1>
        <p className="text-gray-400">maven-jar-plugin、fat JAR、Spring Boot executable JAR</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">JARファイルとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          JAR（Java Archive）は、コンパイル済みクラスファイルやリソースをZIP形式でまとめたファイルです。
          Javaアプリケーションの配布形式として使用されます。
          実行可能JARにはMANIFEST.MFにメインクラスを指定します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>通常のJAR - クラスファイルのみ（ライブラリ配布用）</li>
          <li>実行可能JAR - <code>Main-Class</code> 指定あり（<code>java -jar</code> で実行可能）</li>
          <li>Fat JAR（Uber JAR） - 依存ライブラリも含んだ単一JAR</li>
          <li>Spring Boot executable JAR - Spring Boot独自の実行可能JAR形式</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">JARの構造とMANIFEST.MF</h2>
        <p className="text-gray-400 mb-4">
          JARファイルの内部構造とマニフェストファイルの役割を確認しましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("=== JARファイルの内部構造 ===");
        System.out.println();
        System.out.println("my-app-1.0.0.jar");
        System.out.println("├── META-INF/");
        System.out.println("│   └── MANIFEST.MF");
        System.out.println("├── com/");
        System.out.println("│   └── example/");
        System.out.println("│       ├── Main.class");
        System.out.println("│       └── Service.class");
        System.out.println("└── application.properties");
        System.out.println();

        System.out.println("=== MANIFEST.MF（実行可能JAR） ===");
        System.out.println("Manifest-Version: 1.0");
        System.out.println("Main-Class: com.example.Main");
        System.out.println();

        System.out.println("実行方法:");
        System.out.println("  java -jar my-app-1.0.0.jar");
    }
}`}
          expectedOutput={`=== JARファイルの内部構造 ===

my-app-1.0.0.jar
├── META-INF/
│   └── MANIFEST.MF
├── com/
│   └── example/
│       ├── Main.class
│       └── Service.class
└── application.properties

=== MANIFEST.MF（実行可能JAR） ===
Manifest-Version: 1.0
Main-Class: com.example.Main

実行方法:
  java -jar my-app-1.0.0.jar`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Fat JAR（Uber JAR）</h2>
        <p className="text-gray-400 mb-4">
          Fat JARはすべての依存ライブラリを1つのJARに含めます。
          maven-shade-pluginやGradleのshadowプラグインで作成します。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("=== 通常JAR vs Fat JAR ===");
        System.out.println();

        System.out.println("【通常のJAR】");
        System.out.println("  my-app-1.0.0.jar (50KB)");
        System.out.println("  + lib/spring-core-6.1.0.jar");
        System.out.println("  + lib/jackson-databind-2.16.0.jar");
        System.out.println("  + lib/... (多数の依存JAR)");
        System.out.println("  → 実行時にクラスパス指定が必要");
        System.out.println();

        System.out.println("【Fat JAR (Uber JAR)】");
        System.out.println("  my-app-1.0.0-all.jar (30MB)");
        System.out.println("  → 全ての依存が1ファイルに含まれる");
        System.out.println("  → java -jar だけで実行可能");
        System.out.println();

        System.out.println("=== 作成方法 ===");
        System.out.println("Maven:  maven-shade-plugin");
        System.out.println("Gradle: com.github.johnrengelman.shadow プラグイン");
    }
}`}
          expectedOutput={`=== 通常JAR vs Fat JAR ===

【通常のJAR】
  my-app-1.0.0.jar (50KB)
  + lib/spring-core-6.1.0.jar
  + lib/jackson-databind-2.16.0.jar
  + lib/... (多数の依存JAR)
  → 実行時にクラスパス指定が必要

【Fat JAR (Uber JAR)】
  my-app-1.0.0-all.jar (30MB)
  → 全ての依存が1ファイルに含まれる
  → java -jar だけで実行可能

=== 作成方法 ===
Maven:  maven-shade-plugin
Gradle: com.github.johnrengelman.shadow プラグイン`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Spring Boot executable JAR</h2>
        <p className="text-gray-400 mb-4">
          Spring Bootは独自のJAR構造を持ち、依存JARをそのままネストして含めます。
          <code className="text-orange-300">spring-boot-maven-plugin</code> で自動的に作成されます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("=== Spring Boot executable JAR ===");
        System.out.println();
        System.out.println("my-app-1.0.0.jar");
        System.out.println("├── META-INF/");
        System.out.println("│   └── MANIFEST.MF");
        System.out.println("├── BOOT-INF/");
        System.out.println("│   ├── classes/      ← アプリのクラス");
        System.out.println("│   └── lib/          ← 依存JARファイル");
        System.out.println("│       ├── spring-core-6.1.0.jar");
        System.out.println("│       └── jackson-2.16.0.jar");
        System.out.println("└── org/springframework/boot/loader/");
        System.out.println("    └── JarLauncher.class ← ブートストラップ");
        System.out.println();

        System.out.println("特徴:");
        System.out.println("  - 依存JARを展開せずそのまま含む");
        System.out.println("  - JarLauncherがネストJARを読み込む");
        System.out.println("  - java -jar で直接実行可能");
        System.out.println("  - Dockerイメージ作成にも最適");
    }
}`}
          expectedOutput={`=== Spring Boot executable JAR ===

my-app-1.0.0.jar
├── META-INF/
│   └── MANIFEST.MF
├── BOOT-INF/
│   ├── classes/      ← アプリのクラス
│   └── lib/          ← 依存JARファイル
│       ├── spring-core-6.1.0.jar
│       └── jackson-2.16.0.jar
└── org/springframework/boot/loader/
    └── JarLauncher.class ← ブートストラップ

特徴:
  - 依存JARを展開せずそのまま含む
  - JarLauncherがネストJARを読み込む
  - java -jar で直接実行可能
  - Dockerイメージ作成にも最適`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="build" lessonId="jar-packaging" />
      </div>
      <LessonNav lessons={lessons} currentId="jar-packaging" basePath="/learn/build" />
    </div>
  );
}

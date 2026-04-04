import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("build");

export default function DependenciesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ビルドツール レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">依存関係管理</h1>
        <p className="text-gray-400">scope(compile/test/runtime)、exclusion、BOM</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">依存関係管理とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Javaプロジェクトでは外部ライブラリ（依存関係）を利用します。
          MavenやGradleは依存関係の自動ダウンロード、バージョン管理、推移的依存関係の解決を行います。
          スコープを適切に設定することで、不要なライブラリがパッケージに含まれることを防ぎます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>compile</code> - コンパイル時・実行時の両方で必要（デフォルト）</li>
          <li><code>test</code> - テスト時のみ必要（JUnit等）</li>
          <li><code>runtime</code> - 実行時のみ必要（JDBCドライバ等）</li>
          <li><code>provided</code> - コンパイル時のみ、実行時は環境が提供（Servlet API等）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">依存関係のスコープ</h2>
        <p className="text-gray-400 mb-4">
          各スコープがいつクラスパスに含まれるかを理解しましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("=== Mavenスコープ一覧 ===");
        System.out.println();

        String[][] scopes = {
            {"compile",  "○", "○", "○", "spring-boot-starter-web"},
            {"provided", "○", "×", "×", "javax.servlet-api"},
            {"runtime",  "×", "○", "○", "mysql-connector-java"},
            {"test",     "×", "×", "○", "junit-jupiter"},
            {"system",   "○", "×", "×", "ローカルJAR（非推奨）"}
        };

        System.out.printf("%-10s %-8s %-8s %-8s %s%n",
            "スコープ", "コンパイル", "実行時", "テスト", "例");
        System.out.println("-".repeat(58));
        for (String[] s : scopes) {
            System.out.printf("%-10s %-8s %-8s %-8s %s%n",
                s[0], s[1], s[2], s[3], s[4]);
        }
    }
}`}
          expectedOutput={`=== Mavenスコープ一覧 ===

スコープ      コンパイル    実行時      テスト      例
----------------------------------------------------------
compile    ○        ○        ○        spring-boot-starter-web
provided   ○        ×        ×        javax.servlet-api
runtime    ×        ○        ○        mysql-connector-java
test       ×        ×        ○        junit-jupiter
system     ○        ×        ×        ローカルJAR（非推奨）`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">推移的依存関係とexclusion</h2>
        <p className="text-gray-400 mb-4">
          ライブラリAがライブラリBに依存している場合、Aを追加するとBも自動的に含まれます。
          不要な推移的依存関係は <code className="text-orange-300">exclusion</code> で除外できます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("=== 推移的依存関係の例 ===");
        System.out.println();
        System.out.println("spring-boot-starter-web を追加すると...");
        System.out.println("├── spring-boot-starter");
        System.out.println("│   ├── spring-boot");
        System.out.println("│   ├── spring-boot-autoconfigure");
        System.out.println("│   └── spring-core");
        System.out.println("├── spring-boot-starter-json");
        System.out.println("│   └── jackson-databind");
        System.out.println("└── spring-boot-starter-tomcat");
        System.out.println("    └── tomcat-embed-core");
        System.out.println();

        System.out.println("=== exclusionの例（pom.xml） ===");
        System.out.println("<dependency>");
        System.out.println("  <groupId>org.springframework.boot</groupId>");
        System.out.println("  <artifactId>spring-boot-starter-web</artifactId>");
        System.out.println("  <exclusions>");
        System.out.println("    <exclusion>");
        System.out.println("      <groupId>org.springframework.boot</groupId>");
        System.out.println("      <artifactId>spring-boot-starter-tomcat</artifactId>");
        System.out.println("    </exclusion>");
        System.out.println("  </exclusions>");
        System.out.println("</dependency>");
    }
}`}
          expectedOutput={`=== 推移的依存関係の例 ===

spring-boot-starter-web を追加すると...
├── spring-boot-starter
│   ├── spring-boot
│   ├── spring-boot-autoconfigure
│   └── spring-core
├── spring-boot-starter-json
│   └── jackson-databind
└── spring-boot-starter-tomcat
    └── tomcat-embed-core

=== exclusionの例（pom.xml） ===
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
  <exclusions>
    <exclusion>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-tomcat</artifactId>
    </exclusion>
  </exclusions>
</dependency>`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">BOM（Bill of Materials）</h2>
        <p className="text-gray-400 mb-4">
          BOMを使うと、関連するライブラリのバージョンを一括管理できます。
          個々の依存関係でバージョンを指定する必要がなくなります。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("=== BOM（Bill of Materials）===");
        System.out.println();
        System.out.println("BOMなしの場合（バージョン個別管理）:");
        System.out.println("  spring-core:6.1.0");
        System.out.println("  spring-web:6.1.0");
        System.out.println("  spring-webmvc:6.1.0");
        System.out.println("  → 全て同じバージョンに揃える必要あり");
        System.out.println();

        System.out.println("BOMありの場合（バージョン一括管理）:");
        System.out.println("  spring-framework-bom:6.1.0 を import");
        System.out.println("  spring-core（バージョン省略可）");
        System.out.println("  spring-web（バージョン省略可）");
        System.out.println("  spring-webmvc（バージョン省略可）");
        System.out.println("  → BOMがバージョンを統一管理");
        System.out.println();

        System.out.println("代表的なBOM:");
        System.out.println("  - spring-boot-dependencies");
        System.out.println("  - spring-cloud-dependencies");
        System.out.println("  - jackson-bom");
    }
}`}
          expectedOutput={`=== BOM（Bill of Materials）===

BOMなしの場合（バージョン個別管理）:
  spring-core:6.1.0
  spring-web:6.1.0
  spring-webmvc:6.1.0
  → 全て同じバージョンに揃える必要あり

BOMありの場合（バージョン一括管理）:
  spring-framework-bom:6.1.0 を import
  spring-core（バージョン省略可）
  spring-web（バージョン省略可）
  spring-webmvc（バージョン省略可）
  → BOMがバージョンを統一管理

代表的なBOM:
  - spring-boot-dependencies
  - spring-cloud-dependencies
  - jackson-bom`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="build" lessonId="dependencies" />
      </div>
      <LessonNav lessons={lessons} currentId="dependencies" basePath="/learn/build" />
    </div>
  );
}

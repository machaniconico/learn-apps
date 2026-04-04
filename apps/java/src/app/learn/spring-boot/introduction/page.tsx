import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("spring-boot");

export default function IntroductionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">Spring Boot レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Spring Boot入門</h1>
        <p className="text-gray-400">Spring Bootとは、@SpringBootApplication、自動設定</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Spring Bootとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Spring Bootは、Springフレームワークをベースにしたアプリケーション開発を大幅に簡素化するフレームワークです。
          <code className="text-orange-300">@SpringBootApplication</code> アノテーション1つで自動設定が有効になり、
          複雑なXML設定なしでWebアプリケーションを素早く立ち上げることができます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>@SpringBootApplication</code> は @Configuration + @EnableAutoConfiguration + @ComponentScan の統合</li>
          <li>組み込みサーバー（Tomcat）により、JARファイル単体で実行可能</li>
          <li>Spring Initializr でプロジェクトのひな形を素早く生成できる</li>
          <li>application.properties / application.yml で設定を簡単に管理</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Spring Bootアプリケーションの起動</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">@SpringBootApplication</code> アノテーションを付けたクラスが
          アプリケーションのエントリーポイントになります。<code className="text-orange-300">SpringApplication.run()</code> で起動します。
        </p>
        <JavaEditor
          defaultCode={`// Spring Boot アプリケーションの基本構造
// import org.springframework.boot.SpringApplication;
// import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication
public class Main {

    // Spring Boot では以下のように起動する:
    // SpringApplication.run(Main.class, args);

    public static void main(String[] args) {
        System.out.println("=== Spring Boot アプリケーション起動 ===");
        System.out.println("@SpringBootApplication の3つの機能:");
        System.out.println("  1. @Configuration - Java設定クラス");
        System.out.println("  2. @EnableAutoConfiguration - 自動設定");
        System.out.println("  3. @ComponentScan - コンポーネント自動検出");
        System.out.println();
        System.out.println("コンソール出力:");
        System.out.println("Started Main in 2.5 seconds");
    }
}`}
          expectedOutput={`=== Spring Boot アプリケーション起動 ===
@SpringBootApplication の3つの機能:
  1. @Configuration - Java設定クラス
  2. @EnableAutoConfiguration - 自動設定
  3. @ComponentScan - コンポーネント自動検出

コンソール出力:
Started Main in 2.5 seconds`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">自動設定の仕組み</h2>
        <p className="text-gray-400 mb-4">
          Spring Bootはクラスパスにあるライブラリを検出し、自動的に適切な設定を行います。
          例えば、spring-boot-starter-web を依存に追加すると、組み込みTomcatが自動設定されます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

// Spring Boot の自動設定の概念を擬似的に再現
public class Main {

    // Starterごとに自動設定される内容をシミュレーション
    static Map<String, List<String>> autoConfigurations = Map.of(
        "spring-boot-starter-web", List.of(
            "EmbeddedTomcat (port: 8080)",
            "DispatcherServlet",
            "Jackson (JSON変換)"
        ),
        "spring-boot-starter-data-jpa", List.of(
            "DataSource (HikariCP)",
            "EntityManagerFactory",
            "TransactionManager"
        ),
        "spring-boot-starter-security", List.of(
            "SecurityFilterChain",
            "UserDetailsService",
            "PasswordEncoder"
        )
    );

    public static void main(String[] args) {
        System.out.println("=== Spring Boot 自動設定 ===");
        autoConfigurations.forEach((starter, configs) -> {
            System.out.println("\\n" + starter + ":");
            configs.forEach(c ->
                System.out.println("  -> " + c));
        });
    }
}`}
          expectedOutput={`=== Spring Boot 自動設定 ===

spring-boot-starter-web:
  -> EmbeddedTomcat (port: 8080)
  -> DispatcherServlet
  -> Jackson (JSON変換)

spring-boot-starter-data-jpa:
  -> DataSource (HikariCP)
  -> EntityManagerFactory
  -> TransactionManager

spring-boot-starter-security:
  -> SecurityFilterChain
  -> UserDetailsService
  -> PasswordEncoder`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">プロジェクト構成</h2>
        <p className="text-gray-400 mb-4">
          Spring Bootプロジェクトの標準的なディレクトリ構成を確認しましょう。
          <code className="text-orange-300">src/main/java</code> にJavaソース、
          <code className="text-orange-300">src/main/resources</code> に設定ファイルを配置します。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("=== Spring Boot プロジェクト構成 ===");
        System.out.println("my-app/");
        System.out.println("  pom.xml (または build.gradle)");
        System.out.println("  src/");
        System.out.println("    main/");
        System.out.println("      java/com/example/myapp/");
        System.out.println("        MyAppApplication.java    <- @SpringBootApplication");
        System.out.println("        controller/");
        System.out.println("          UserController.java     <- @RestController");
        System.out.println("        service/");
        System.out.println("          UserService.java        <- @Service");
        System.out.println("        repository/");
        System.out.println("          UserRepository.java     <- @Repository");
        System.out.println("        model/");
        System.out.println("          User.java               <- @Entity");
        System.out.println("      resources/");
        System.out.println("        application.properties    <- 設定ファイル");
        System.out.println("        static/                   <- 静的ファイル");
        System.out.println("        templates/                <- テンプレート");
        System.out.println("    test/");
        System.out.println("      java/com/example/myapp/");
        System.out.println("        MyAppApplicationTests.java");
    }
}`}
          expectedOutput={`=== Spring Boot プロジェクト構成 ===
my-app/
  pom.xml (または build.gradle)
  src/
    main/
      java/com/example/myapp/
        MyAppApplication.java    <- @SpringBootApplication
        controller/
          UserController.java     <- @RestController
        service/
          UserService.java        <- @Service
        repository/
          UserRepository.java     <- @Repository
        model/
          User.java               <- @Entity
      resources/
        application.properties    <- 設定ファイル
        static/                   <- 静的ファイル
        templates/                <- テンプレート
    test/
      java/com/example/myapp/
        MyAppApplicationTests.java`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="spring-boot" lessonId="introduction" />
      </div>
      <LessonNav lessons={lessons} currentId="introduction" basePath="/learn/spring-boot" />
    </div>
  );
}

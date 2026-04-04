import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("jpa");

export default function IntroductionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">JPA・データベース レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">JPA入門</h1>
        <p className="text-gray-400">JPAとは、Hibernate、ORM概念</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">JPAとORMの基本概念</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          JPA（Java Persistence API）は、JavaオブジェクトとRDBのテーブルをマッピングするための標準仕様です。
          <code className="text-orange-300">Hibernate</code> はJPAの最も一般的な実装で、
          ORM（Object-Relational Mapping）によりSQLを直接書かずにデータベース操作ができます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>JPA - Java標準のORM仕様（インターフェース）</li>
          <li>Hibernate - JPAの実装ライブラリ（Spring Boot標準）</li>
          <li>ORM - Javaオブジェクトとテーブル行の自動マッピング</li>
          <li>エンティティ - データベーステーブルに対応するJavaクラス</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ORMの概念</h2>
        <p className="text-gray-400 mb-4">
          ORMはJavaのオブジェクトとデータベースのテーブル行を自動的にマッピングします。
          SQLを直接書く代わりに、Javaのオブジェクト操作でデータベースを操作できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {

    // エンティティ（テーブルに対応するクラス）
    // @Entity
    // @Table(name = "users")
    static class User {
        // @Id @GeneratedValue
        int id;
        // @Column(name = "username")
        String name;
        String email;

        User(int id, String name, String email) {
            this.id = id; this.name = name; this.email = email;
        }

        @Override
        public String toString() {
            return "User{id=" + id + ", name=" + name + ", email=" + email + "}";
        }
    }

    public static void main(String[] args) {
        System.out.println("=== ORM マッピング概念 ===\\n");

        System.out.println("[テーブル: users]");
        System.out.println("| id | username | email              |");
        System.out.println("|----|----------|--------------------|");
        System.out.println("| 1  | Alice    | alice@example.com  |");
        System.out.println("| 2  | Bob      | bob@example.com    |");

        System.out.println("\\n↕ ORM (Hibernate) が自動マッピング ↕\\n");

        System.out.println("[Java オブジェクト]");
        List<User> users = List.of(
            new User(1, "Alice", "alice@example.com"),
            new User(2, "Bob", "bob@example.com")
        );
        users.forEach(u -> System.out.println(u));

        System.out.println("\\n=== JDBCとJPAの比較 ===");
        System.out.println("JDBC: SELECT * FROM users WHERE id = 1");
        System.out.println("JPA:  entityManager.find(User.class, 1)");
    }
}`}
          expectedOutput={`=== ORM マッピング概念 ===

[テーブル: users]
| id | username | email              |
|----|----------|--------------------|
| 1  | Alice    | alice@example.com  |
| 2  | Bob      | bob@example.com    |

↕ ORM (Hibernate) が自動マッピング ↕

[Java オブジェクト]
User{id=1, name=Alice, email=alice@example.com}
User{id=2, name=Bob, email=bob@example.com}

=== JDBCとJPAの比較 ===
JDBC: SELECT * FROM users WHERE id = 1
JPA:  entityManager.find(User.class, 1)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Spring Data JPAの構成</h2>
        <p className="text-gray-400 mb-4">
          Spring Data JPAは JPA をさらに簡素化し、リポジトリインターフェースを定義するだけで
          基本的なCRUD操作が自動実装されます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {

    // Spring Data JPA の構成要素
    static Map<String, String> components = new LinkedHashMap<>();
    static {
        components.put("Entity", "@Entityクラス - テーブルに対応");
        components.put("Repository", "JpaRepository - CRUD操作の自動実装");
        components.put("Service", "@Service - ビジネスロジック");
        components.put("Controller", "@RestController - API公開");
    }

    // 依存関係（pom.xml / build.gradle）
    static List<String> dependencies = List.of(
        "spring-boot-starter-data-jpa",
        "h2 (開発用インメモリDB)",
        "mysql-connector-java (本番用)"
    );

    public static void main(String[] args) {
        System.out.println("=== Spring Data JPA 構成 ===\\n");

        System.out.println("依存ライブラリ:");
        dependencies.forEach(d -> System.out.println("  - " + d));

        System.out.println("\\nアーキテクチャ層:");
        components.forEach((layer, desc) ->
            System.out.println("  " + layer + ": " + desc));

        System.out.println("\\nデータフロー:");
        System.out.println("  Controller -> Service -> Repository -> DB");
        System.out.println("  HTTP要求   -> ロジック -> JPA操作   -> SQL");

        System.out.println("\\n// コンソール出力:");
        System.out.println("Hibernate: create table users ...");
        System.out.println("Hibernate: insert into users ...");
        System.out.println("Started Application in 3.2 seconds");
    }
}`}
          expectedOutput={`=== Spring Data JPA 構成 ===

依存ライブラリ:
  - spring-boot-starter-data-jpa
  - h2 (開発用インメモリDB)
  - mysql-connector-java (本番用)

アーキテクチャ層:
  Entity: @Entityクラス - テーブルに対応
  Repository: JpaRepository - CRUD操作の自動実装
  Service: @Service - ビジネスロジック
  Controller: @RestController - API公開

データフロー:
  Controller -> Service -> Repository -> DB
  HTTP要求   -> ロジック -> JPA操作   -> SQL

// コンソール出力:
Hibernate: create table users ...
Hibernate: insert into users ...
Started Application in 3.2 seconds`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="jpa" lessonId="introduction" />
      </div>
      <LessonNav lessons={lessons} currentId="introduction" basePath="/learn/jpa" />
    </div>
  );
}

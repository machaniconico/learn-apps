import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("jpa");

export default function H2DatabasePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">JPA・データベース レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">H2データベース</h1>
        <p className="text-gray-400">H2コンソール、application.properties設定、初期データ</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">H2データベースとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          H2はJava製の軽量な組み込みデータベースで、開発やテスト環境で広く使われます。
          インメモリモードではアプリ起動時にデータベースが作成され、終了時に消えるため、
          テストに最適です。<code className="text-orange-300">H2コンソール</code>でブラウザからSQLを実行できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>インメモリDB - アプリ起動中のみデータ保持（テスト向き）</li>
          <li>ファイルDB - ファイルにデータ永続化（開発向き）</li>
          <li>H2コンソール - ブラウザベースのSQLクライアント</li>
          <li><code>data.sql</code> / <code>schema.sql</code> で初期データを投入</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">application.properties設定</h2>
        <p className="text-gray-400 mb-4">
          H2データベースの接続設定とコンソールの有効化を行います。
          <code className="text-orange-300">spring.h2.console.enabled=true</code> でブラウザからアクセスできます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {

    public static void main(String[] args) {
        System.out.println("=== H2 データベース設定 ===\\n");

        System.out.println("# application.properties\\n");

        // インメモリモード
        System.out.println("## インメモリモード（テスト向き）");
        System.out.println("spring.datasource.url=jdbc:h2:mem:testdb");
        System.out.println("spring.datasource.driver-class-name=org.h2.Driver");
        System.out.println("spring.datasource.username=sa");
        System.out.println("spring.datasource.password=");

        System.out.println("\\n## H2コンソール");
        System.out.println("spring.h2.console.enabled=true");
        System.out.println("spring.h2.console.path=/h2-console");
        System.out.println("# ブラウザで http://localhost:8080/h2-console");

        System.out.println("\\n## JPA/Hibernate設定");
        System.out.println("spring.jpa.database-platform=org.hibernate.dialect.H2Dialect");
        System.out.println("spring.jpa.hibernate.ddl-auto=create-drop");
        System.out.println("spring.jpa.show-sql=true");
        System.out.println("spring.jpa.properties.hibernate.format_sql=true");

        System.out.println("\\n## ddl-auto のオプション:");
        System.out.println("  create      - 起動時にテーブル作成");
        System.out.println("  create-drop - 起動時に作成、終了時に削除");
        System.out.println("  update      - エンティティに合わせて更新");
        System.out.println("  validate    - スキーマの整合性のみ検証");
        System.out.println("  none        - 何もしない（本番推奨）");
    }
}`}
          expectedOutput={`=== H2 データベース設定 ===

# application.properties

## インメモリモード（テスト向き）
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

## H2コンソール
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
# ブラウザで http://localhost:8080/h2-console

## JPA/Hibernate設定
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

## ddl-auto のオプション:
  create      - 起動時にテーブル作成
  create-drop - 起動時に作成、終了時に削除
  update      - エンティティに合わせて更新
  validate    - スキーマの整合性のみ検証
  none        - 何もしない（本番推奨）`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">初期データの投入</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">data.sql</code> ファイルをresourcesに配置すると、
          アプリ起動時に自動的にSQLが実行され、初期データが投入されます。
          <code className="text-orange-300">CommandLineRunner</code> を使ったJavaコードでの投入も可能です。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {

    record User(int id, String name, String email, String role) {}

    // data.sql の内容をシミュレーション
    static void executeSqlFile() {
        System.out.println("-- resources/data.sql");
        System.out.println("INSERT INTO users (name, email, role) VALUES ('Alice', 'alice@mail.com', 'ADMIN');");
        System.out.println("INSERT INTO users (name, email, role) VALUES ('Bob', 'bob@mail.com', 'USER');");
        System.out.println("INSERT INTO users (name, email, role) VALUES ('Charlie', 'charlie@mail.com', 'USER');");
    }

    // CommandLineRunner による初期データ投入
    // @Bean
    // CommandLineRunner initData(UserRepository repo) { ... }
    static void initWithRunner() {
        List<User> initialData = List.of(
            new User(1, "Alice", "alice@mail.com", "ADMIN"),
            new User(2, "Bob", "bob@mail.com", "USER"),
            new User(3, "Charlie", "charlie@mail.com", "USER")
        );

        System.out.println("\\n// CommandLineRunner で初期データ投入");
        System.out.println("@Bean");
        System.out.println("CommandLineRunner initData(UserRepository repo) {");
        System.out.println("    return args -> {");
        initialData.forEach(u ->
            System.out.println("        repo.save(new User(\"" + u.name() + "\", ...));"));
        System.out.println("    };");
        System.out.println("}");

        System.out.println("\\n// コンソール出力:");
        System.out.println("Hibernate: insert into users (name, email, role) values (?, ?, ?)");
        System.out.println("初期データ " + initialData.size() + " 件を投入しました");
    }

    public static void main(String[] args) {
        System.out.println("=== 初期データ投入 ===\\n");

        System.out.println("[方法1: data.sql]");
        executeSqlFile();

        System.out.println("\\n[方法2: CommandLineRunner]");
        initWithRunner();

        System.out.println("\\n=== 起動ログ ===");
        System.out.println("H2 console available at '/h2-console'");
        System.out.println("Database: jdbc:h2:mem:testdb");
        System.out.println("Started Application in 2.8 seconds");
    }
}`}
          expectedOutput={`=== 初期データ投入 ===

[方法1: data.sql]
-- resources/data.sql
INSERT INTO users (name, email, role) VALUES ('Alice', 'alice@mail.com', 'ADMIN');
INSERT INTO users (name, email, role) VALUES ('Bob', 'bob@mail.com', 'USER');
INSERT INTO users (name, email, role) VALUES ('Charlie', 'charlie@mail.com', 'USER');

[方法2: CommandLineRunner]

// CommandLineRunner で初期データ投入
@Bean
CommandLineRunner initData(UserRepository repo) {
    return args -> {
        repo.save(new User("Alice", ...));
        repo.save(new User("Bob", ...));
        repo.save(new User("Charlie", ...));
    };
}

// コンソール出力:
Hibernate: insert into users (name, email, role) values (?, ?, ?)
初期データ 3 件を投入しました

=== 起動ログ ===
H2 console available at '/h2-console'
Database: jdbc:h2:mem:testdb
Started Application in 2.8 seconds`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="jpa" lessonId="h2-database" />
      </div>
      <LessonNav lessons={lessons} currentId="h2-database" basePath="/learn/jpa" />
    </div>
  );
}

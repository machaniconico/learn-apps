import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function BuilderPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">デザインパターン レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Builderパターン</h1>
        <p className="text-gray-400">流暢なAPI、Lombokの@Builder</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Builderパターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Builderパターンは、複雑なオブジェクトの生成過程をステップごとに分離し、
          同じ生成過程から異なるオブジェクトを作成できるようにするパターンです。
          コンストラクタの引数が多い場合（テレスコーピングコンストラクタ問題）の解決策として有効です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>メソッドチェーン（流暢なAPI）で読みやすいコードになる</li>
          <li>オプションのパラメータを柔軟に設定できる</li>
          <li>不変オブジェクトの生成に適している</li>
          <li>Lombokの <code>@Builder</code> で自動生成可能</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なBuilderパターン</h2>
        <p className="text-gray-400 mb-4">
          ユーザーオブジェクトをBuilderで生成する例です。各setterがBuilderオブジェクト自身を返すことで
          メソッドチェーンが可能になります。
        </p>
        <JavaEditor
          defaultCode={`class User {
    private final String name;
    private final String email;
    private final int age;
    private final String phone;
    private final String address;

    private User(Builder builder) {
        this.name = builder.name;
        this.email = builder.email;
        this.age = builder.age;
        this.phone = builder.phone;
        this.address = builder.address;
    }

    public String toString() {
        return "User{name=" + name + ", email=" + email +
               ", age=" + age + ", phone=" + phone +
               ", address=" + address + "}";
    }

    // static inner Builder
    static class Builder {
        private final String name;   // 必須
        private final String email;  // 必須
        private int age = 0;
        private String phone = "";
        private String address = "";

        Builder(String name, String email) {
            this.name = name;
            this.email = email;
        }

        Builder age(int age) { this.age = age; return this; }
        Builder phone(String phone) { this.phone = phone; return this; }
        Builder address(String address) { this.address = address; return this; }

        User build() { return new User(this); }
    }
}

public class Main {
    public static void main(String[] args) {
        // 必須項目のみ
        User user1 = new User.Builder("太郎", "taro@example.com")
            .build();

        // 全項目を指定
        User user2 = new User.Builder("花子", "hanako@example.com")
            .age(25)
            .phone("090-1234-5678")
            .address("東京都渋谷区")
            .build();

        System.out.println(user1);
        System.out.println(user2);
    }
}`}
          expectedOutput={`User{name=太郎, email=taro@example.com, age=0, phone=, address=}
User{name=花子, email=hanako@example.com, age=25, phone=090-1234-5678, address=東京都渋谷区}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">流暢なAPI（Fluent API）</h2>
        <p className="text-gray-400 mb-4">
          Builderパターンを応用して、SQLクエリやHTTPリクエストのような
          DSL（ドメイン固有言語）風のAPIを構築できます。
        </p>
        <JavaEditor
          defaultCode={`class QueryBuilder {
    private String table;
    private String columns = "*";
    private String where = "";
    private String orderBy = "";
    private int limit = 0;

    QueryBuilder from(String table) {
        this.table = table;
        return this;
    }

    QueryBuilder select(String... cols) {
        this.columns = String.join(", ", cols);
        return this;
    }

    QueryBuilder where(String condition) {
        this.where = condition;
        return this;
    }

    QueryBuilder orderBy(String column) {
        this.orderBy = column;
        return this;
    }

    QueryBuilder limit(int n) {
        this.limit = n;
        return this;
    }

    String build() {
        StringBuilder sb = new StringBuilder();
        sb.append("SELECT ").append(columns);
        sb.append(" FROM ").append(table);
        if (!where.isEmpty()) sb.append(" WHERE ").append(where);
        if (!orderBy.isEmpty()) sb.append(" ORDER BY ").append(orderBy);
        if (limit > 0) sb.append(" LIMIT ").append(limit);
        return sb.toString();
    }
}

public class Main {
    public static void main(String[] args) {
        String query1 = new QueryBuilder()
            .from("users")
            .select("name", "email")
            .where("age > 20")
            .orderBy("name ASC")
            .limit(10)
            .build();

        String query2 = new QueryBuilder()
            .from("products")
            .where("price < 1000")
            .build();

        System.out.println(query1);
        System.out.println(query2);
    }
}`}
          expectedOutput={`SELECT name, email FROM users WHERE age > 20 ORDER BY name ASC LIMIT 10
SELECT * FROM products WHERE price < 1000`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Lombokの@Builder</h2>
        <p className="text-gray-400 mb-4">
          Lombokライブラリを使うと、<code className="text-orange-300">@Builder</code> アノテーションだけで
          Builderパターンのコードを自動生成できます。
        </p>
        <JavaEditor
          defaultCode={`// Lombokの@Builderを使った場合のイメージ
// 実際にはアノテーションだけで下記コードが自動生成される

public class Main {
    public static void main(String[] args) {
        System.out.println("=== Lombok @Builder の使い方 ===");
        System.out.println();
        System.out.println("// クラス定義（Lombokあり）");
        System.out.println("@Builder");
        System.out.println("@Value  // 不変オブジェクト");
        System.out.println("public class User {");
        System.out.println("    String name;");
        System.out.println("    String email;");
        System.out.println("    int age;");
        System.out.println("}");
        System.out.println();

        System.out.println("// 使い方");
        System.out.println("User user = User.builder()");
        System.out.println("    .name(\\"太郎\\")");
        System.out.println("    .email(\\"taro@example.com\\")");
        System.out.println("    .age(25)");
        System.out.println("    .build();");
        System.out.println();

        System.out.println("=== @Builder の追加機能 ===");
        System.out.println("@Builder.Default   デフォルト値の設定");
        System.out.println("@Singular          コレクションの要素追加メソッド生成");
        System.out.println("toBuilder()        既存オブジェクトからBuilderを作成");
        System.out.println();

        System.out.println("// toBuilder() の例");
        System.out.println("User updated = user.toBuilder()");
        System.out.println("    .age(26)");
        System.out.println("    .build();");
    }
}`}
          expectedOutput={`=== Lombok @Builder の使い方 ===

// クラス定義（Lombokあり）
@Builder
@Value  // 不変オブジェクト
public class User {
    String name;
    String email;
    int age;
}

// 使い方
User user = User.builder()
    .name("太郎")
    .email("taro@example.com")
    .age(25)
    .build();

=== @Builder の追加機能 ===
@Builder.Default   デフォルト値の設定
@Singular          コレクションの要素追加メソッド生成
toBuilder()        既存オブジェクトからBuilderを作成

// toBuilder() の例
User updated = user.toBuilder()
    .age(26)
    .build();`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="builder" />
      </div>
      <LessonNav lessons={lessons} currentId="builder" basePath="/learn/design" />
    </div>
  );
}

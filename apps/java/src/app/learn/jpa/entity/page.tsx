import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("jpa");

export default function EntityPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">JPA・データベース レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">エンティティ</h1>
        <p className="text-gray-400">@Entity、@Id、@GeneratedValue、@Column、@Table</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">エンティティの定義</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">@Entity</code> をクラスに付けるとJPAエンティティとして認識され、
          データベーステーブルにマッピングされます。
          <code className="text-orange-300">@Id</code> で主キー、
          <code className="text-orange-300">@Column</code> でカラムの詳細設定を行います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>@Entity</code> - JPAエンティティクラスであることを宣言</li>
          <li><code>@Table(name="...")</code> - テーブル名を明示的に指定</li>
          <li><code>@Id</code> - 主キーフィールド</li>
          <li><code>@GeneratedValue(strategy=...)</code> - ID自動生成戦略</li>
          <li><code>@Column(nullable, unique, length)</code> - カラム制約</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なエンティティ定義</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">@Entity</code> クラスの定義と、
          各アノテーションがデータベーステーブルにどうマッピングされるかを確認します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {

    // @Entity
    // @Table(name = "products")
    static class Product {
        // @Id
        // @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        // @Column(nullable = false, length = 100)
        private String name;

        // @Column(nullable = false)
        private int price;

        // @Column(unique = true)
        private String sku;

        // @Column(columnDefinition = "TEXT")
        private String description;

        Product() {} // JPA必須：デフォルトコンストラクタ

        Product(Long id, String name, int price, String sku, String desc) {
            this.id = id; this.name = name; this.price = price;
            this.sku = sku; this.description = desc;
        }

        @Override
        public String toString() {
            return String.format("Product{id=%d, name=%s, price=%d, sku=%s}",
                id, name, price, sku);
        }
    }

    public static void main(String[] args) {
        System.out.println("=== エンティティ定義 ===\\n");

        System.out.println("// Hibernate が生成するDDL:");
        System.out.println("CREATE TABLE products (");
        System.out.println("  id BIGINT AUTO_INCREMENT PRIMARY KEY,");
        System.out.println("  name VARCHAR(100) NOT NULL,");
        System.out.println("  price INT NOT NULL,");
        System.out.println("  sku VARCHAR(255) UNIQUE,");
        System.out.println("  description TEXT");
        System.out.println(");");

        System.out.println("\\n// Javaオブジェクトとして操作:");
        Product p = new Product(1L, "ノートPC", 120000, "PC-001", "高性能ノートPC");
        System.out.println(p);
    }
}`}
          expectedOutput={`=== エンティティ定義 ===

// Hibernate が生成するDDL:
CREATE TABLE products (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price INT NOT NULL,
  sku VARCHAR(255) UNIQUE,
  description TEXT
);

// Javaオブジェクトとして操作:
Product{id=1, name=ノートPC, price=120000, sku=PC-001}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ID生成戦略とカラム設定</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">@GeneratedValue</code> でIDの自動生成方法を選択し、
          <code className="text-orange-300">@Column</code> でカラムの制約を細かく設定できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;
import java.time.*;

public class Main {

    // @Entity
    static class Employee {
        // @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        Long id;

        // @Column(nullable = false, length = 50)
        String firstName;

        // @Column(nullable = false, length = 50)
        String lastName;

        // @Column(unique = true, nullable = false)
        String email;

        // @Column(name = "hire_date")
        String hireDate;

        // @Column(precision = 10, scale = 2)
        double salary;

        // @Enumerated(EnumType.STRING)
        // @Column(length = 20)
        String status; // ACTIVE, INACTIVE

        Employee(Long id, String fn, String ln, String email,
                 String hireDate, double salary, String status) {
            this.id = id; this.firstName = fn; this.lastName = ln;
            this.email = email; this.hireDate = hireDate;
            this.salary = salary; this.status = status;
        }
    }

    public static void main(String[] args) {
        System.out.println("=== ID生成戦略 ===\\n");

        System.out.println("GenerationType.IDENTITY  - DB自動採番 (MySQL)");
        System.out.println("GenerationType.SEQUENCE  - シーケンス使用 (PostgreSQL)");
        System.out.println("GenerationType.TABLE     - テーブルで管理");
        System.out.println("GenerationType.AUTO      - DBに応じて自動選択");

        System.out.println("\\n=== エンティティ例 ===\\n");

        Employee emp = new Employee(1L, "太郎", "田中",
            "taro@example.com", "2024-04-01", 450000, "ACTIVE");

        System.out.println("// Hibernate SQL:");
        System.out.println("INSERT INTO employee");
        System.out.println("  (first_name, last_name, email, hire_date, salary, status)");
        System.out.printf("  VALUES ('%s', '%s', '%s', '%s', %.0f, '%s')%n",
            emp.firstName, emp.lastName, emp.email,
            emp.hireDate, emp.salary, emp.status);
    }
}`}
          expectedOutput={`=== ID生成戦略 ===

GenerationType.IDENTITY  - DB自動採番 (MySQL)
GenerationType.SEQUENCE  - シーケンス使用 (PostgreSQL)
GenerationType.TABLE     - テーブルで管理
GenerationType.AUTO      - DBに応じて自動選択

=== エンティティ例 ===

// Hibernate SQL:
INSERT INTO employee
  (first_name, last_name, email, hire_date, salary, status)
  VALUES ('太郎', '田中', 'taro@example.com', '2024-04-01', 450000, 'ACTIVE')`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="jpa" lessonId="entity" />
      </div>
      <LessonNav lessons={lessons} currentId="entity" basePath="/learn/jpa" />
    </div>
  );
}

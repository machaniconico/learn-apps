import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("jpa");

export default function QueryMethodsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">JPA・データベース レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">クエリメソッド</h1>
        <p className="text-gray-400">findByName、findByAgeGreaterThan、OrderBy</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">メソッド名からのクエリ自動生成</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Spring Data JPAの最大の特徴の一つが、メソッド名の命名規則に従うだけで
          SQLが自動生成される機能です。<code className="text-orange-300">findBy</code> に続けて
          フィールド名と条件を書くと、対応するクエリが実行されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>findByName(String name)</code> - WHERE name = ?</li>
          <li><code>findByAgeGreaterThan(int age)</code> - WHERE age &gt; ?</li>
          <li><code>findByNameContaining(String keyword)</code> - WHERE name LIKE %?%</li>
          <li><code>findByActiveTrue()</code> - WHERE active = true</li>
          <li><code>findByNameOrderByAgeDesc(String name)</code> - ORDER BY age DESC</li>
          <li><code>countByStatus(String status)</code> - SELECT COUNT(*)</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">クエリメソッドの命名規則</h2>
        <p className="text-gray-400 mb-4">
          メソッド名がそのままSQLに変換されます。様々な条件を組み合わせた検索が可能です。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;
import java.util.stream.*;

public class Main {

    record User(int id, String name, int age, String email, boolean active) {}

    static List<User> users = List.of(
        new User(1, "田中太郎", 25, "taro@mail.com", true),
        new User(2, "鈴木花子", 30, "hanako@mail.com", true),
        new User(3, "佐藤一郎", 35, "ichiro@mail.com", false),
        new User(4, "田中美咲", 28, "misaki@mail.com", true),
        new User(5, "山田健太", 22, "kenta@mail.com", true)
    );

    // findByName -> WHERE name = ?
    static List<User> findByName(String name) {
        return users.stream().filter(u -> u.name().equals(name)).toList();
    }

    // findByAgeGreaterThan -> WHERE age > ?
    static List<User> findByAgeGreaterThan(int age) {
        return users.stream().filter(u -> u.age() > age).toList();
    }

    // findByNameContaining -> WHERE name LIKE %?%
    static List<User> findByNameContaining(String keyword) {
        return users.stream().filter(u -> u.name().contains(keyword)).toList();
    }

    // findByActiveTrue -> WHERE active = true
    static List<User> findByActiveTrue() {
        return users.stream().filter(User::active).toList();
    }

    // findByAgeBetween -> WHERE age BETWEEN ? AND ?
    static List<User> findByAgeBetween(int min, int max) {
        return users.stream().filter(u -> u.age() >= min && u.age() <= max).toList();
    }

    public static void main(String[] args) {
        System.out.println("=== クエリメソッド ===");

        System.out.println("\\nfindByName(\"田中太郎\"):");
        findByName("田中太郎").forEach(u -> System.out.println("  " + u));

        System.out.println("\\nfindByAgeGreaterThan(28):");
        findByAgeGreaterThan(28).forEach(u -> System.out.println("  " + u));

        System.out.println("\\nfindByNameContaining(\"田中\"):");
        findByNameContaining("田中").forEach(u -> System.out.println("  " + u));

        System.out.println("\\nfindByActiveTrue():");
        findByActiveTrue().forEach(u -> System.out.println("  " + u));

        System.out.println("\\nfindByAgeBetween(25, 30):");
        findByAgeBetween(25, 30).forEach(u -> System.out.println("  " + u));
    }
}`}
          expectedOutput={`=== クエリメソッド ===

findByName("田中太郎"):
  User[id=1, name=田中太郎, age=25, email=taro@mail.com, active=true]

findByAgeGreaterThan(28):
  User[id=2, name=鈴木花子, age=30, email=hanako@mail.com, active=true]
  User[id=3, name=佐藤一郎, age=35, email=ichiro@mail.com, active=false]

findByNameContaining("田中"):
  User[id=1, name=田中太郎, age=25, email=taro@mail.com, active=true]
  User[id=4, name=田中美咲, age=28, email=misaki@mail.com, active=true]

findByActiveTrue():
  User[id=1, name=田中太郎, age=25, email=taro@mail.com, active=true]
  User[id=2, name=鈴木花子, age=30, email=hanako@mail.com, active=true]
  User[id=4, name=田中美咲, age=28, email=misaki@mail.com, active=true]
  User[id=5, name=山田健太, age=22, email=kenta@mail.com, active=true]

findByAgeBetween(25, 30):
  User[id=1, name=田中太郎, age=25, email=taro@mail.com, active=true]
  User[id=2, name=鈴木花子, age=30, email=hanako@mail.com, active=true]
  User[id=4, name=田中美咲, age=28, email=misaki@mail.com, active=true]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ソートとキーワードの組み合わせ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">OrderBy</code> でソートを追加したり、
          <code className="text-orange-300">And</code>/<code className="text-orange-300">Or</code> で複数条件を組み合わせられます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;
import java.util.stream.*;

public class Main {

    record Product(int id, String name, String category, int price, boolean inStock) {}

    static List<Product> products = List.of(
        new Product(1, "ノートPC", "electronics", 120000, true),
        new Product(2, "マウス", "electronics", 3500, true),
        new Product(3, "Java本", "books", 2800, true),
        new Product(4, "Spring本", "books", 3500, false),
        new Product(5, "デスク", "furniture", 25000, true),
        new Product(6, "タブレット", "electronics", 50000, false)
    );

    // findByCategoryOrderByPriceAsc
    static List<Product> findByCategoryOrderByPriceAsc(String cat) {
        return products.stream()
            .filter(p -> p.category().equals(cat))
            .sorted(Comparator.comparingInt(Product::price))
            .toList();
    }

    // findByCategoryAndInStockTrue
    static List<Product> findByCategoryAndInStockTrue(String cat) {
        return products.stream()
            .filter(p -> p.category().equals(cat) && p.inStock())
            .toList();
    }

    // findByPriceLessThanOrderByPriceDesc
    static List<Product> findByPriceLessThanOrderByPriceDesc(int max) {
        return products.stream()
            .filter(p -> p.price() < max)
            .sorted(Comparator.comparingInt(Product::price).reversed())
            .toList();
    }

    // countByCategory
    static long countByCategory(String cat) {
        return products.stream().filter(p -> p.category().equals(cat)).count();
    }

    public static void main(String[] args) {
        System.out.println("=== ソートと複合条件 ===");

        System.out.println("\\nfindByCategoryOrderByPriceAsc(electronics):");
        findByCategoryOrderByPriceAsc("electronics").forEach(p ->
            System.out.printf("  %s: %,d円%n", p.name(), p.price()));

        System.out.println("\\nfindByCategoryAndInStockTrue(electronics):");
        findByCategoryAndInStockTrue("electronics").forEach(p ->
            System.out.println("  " + p.name() + " (在庫あり)"));

        System.out.println("\\nfindByPriceLessThanOrderByPriceDesc(10000):");
        findByPriceLessThanOrderByPriceDesc(10000).forEach(p ->
            System.out.printf("  %s: %,d円%n", p.name(), p.price()));

        System.out.println("\\ncountByCategory:");
        System.out.println("  electronics: " + countByCategory("electronics"));
        System.out.println("  books: " + countByCategory("books"));
    }
}`}
          expectedOutput={`=== ソートと複合条件 ===

findByCategoryOrderByPriceAsc(electronics):
  マウス: 3,500円
  タブレット: 50,000円
  ノートPC: 120,000円

findByCategoryAndInStockTrue(electronics):
  ノートPC (在庫あり)
  マウス (在庫あり)

findByPriceLessThanOrderByPriceDesc(10000):
  マウス: 3,500円
  Spring本: 3,500円
  Java本: 2,800円

countByCategory:
  electronics: 3
  books: 2`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="jpa" lessonId="query-methods" />
      </div>
      <LessonNav lessons={lessons} currentId="query-methods" basePath="/learn/jpa" />
    </div>
  );
}

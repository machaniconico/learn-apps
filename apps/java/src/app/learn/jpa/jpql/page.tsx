import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("jpa");

export default function JpqlPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">JPA・データベース レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">JPQL</h1>
        <p className="text-gray-400">@Query、名前付きパラメータ(:name)、ネイティブクエリ</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">JPQLとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          JPQL（Java Persistence Query Language）はエンティティに対するオブジェクト指向クエリ言語です。
          SQLに似ていますが、テーブル名ではなくエンティティ名を使います。
          <code className="text-orange-300">@Query</code> アノテーションでリポジトリメソッドにJPQLを記述できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>@Query("SELECT u FROM User u WHERE ...")</code> - JPQLクエリ</li>
          <li><code>:name</code> - 名前付きパラメータ（@Param で紐付け）</li>
          <li><code>?1, ?2</code> - 位置パラメータ</li>
          <li><code>nativeQuery = true</code> - 生SQLを直接実行</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">JPQLクエリの書き方</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">@Query</code> でJPQLを記述し、名前付きパラメータで
          値をバインドします。クエリメソッド名では表現できない複雑な検索に使います。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;
import java.util.stream.*;

public class Main {

    record User(int id, String name, int age, String department) {}

    static List<User> users = List.of(
        new User(1, "田中太郎", 25, "開発"),
        new User(2, "鈴木花子", 30, "営業"),
        new User(3, "佐藤一郎", 35, "開発"),
        new User(4, "山田美咲", 28, "人事"),
        new User(5, "高橋健太", 32, "開発")
    );

    // @Query("SELECT u FROM User u WHERE u.department = :dept AND u.age >= :minAge")
    static List<User> findByDeptAndMinAge(String dept, int minAge) {
        System.out.println("  JPQL: SELECT u FROM User u WHERE u.department = :dept AND u.age >= :minAge");
        System.out.println("  SQL:  SELECT * FROM users WHERE department = '" + dept + "' AND age >= " + minAge);
        return users.stream()
            .filter(u -> u.department().equals(dept) && u.age() >= minAge)
            .toList();
    }

    // @Query("SELECT u.department, AVG(u.age) FROM User u GROUP BY u.department")
    static void findAvgAgeByDept() {
        System.out.println("  JPQL: SELECT u.department, AVG(u.age) FROM User u GROUP BY u.department");
        users.stream()
            .collect(Collectors.groupingBy(User::department,
                Collectors.averagingInt(User::age)))
            .forEach((dept, avg) ->
                System.out.printf("  %s: 平均年齢 %.1f歳%n", dept, avg));
    }

    // @Query("SELECT u FROM User u WHERE u.name LIKE %:keyword%")
    static List<User> searchByName(String keyword) {
        System.out.println("  JPQL: SELECT u FROM User u WHERE u.name LIKE %:keyword%");
        return users.stream()
            .filter(u -> u.name().contains(keyword))
            .toList();
    }

    public static void main(String[] args) {
        System.out.println("=== JPQL クエリ ===");

        System.out.println("\\n[部署 & 年齢で検索]");
        findByDeptAndMinAge("開発", 30).forEach(u ->
            System.out.println("  結果: " + u));

        System.out.println("\\n[部署別平均年齢]");
        findAvgAgeByDept();

        System.out.println("\\n[名前で検索]");
        searchByName("田中").forEach(u ->
            System.out.println("  結果: " + u));
    }
}`}
          expectedOutput={`=== JPQL クエリ ===

[部署 & 年齢で検索]
  JPQL: SELECT u FROM User u WHERE u.department = :dept AND u.age >= :minAge
  SQL:  SELECT * FROM users WHERE department = '開発' AND age >= 30
  結果: User[id=3, name=佐藤一郎, age=35, department=開発]
  結果: User[id=5, name=高橋健太, age=32, department=開発]

[部署別平均年齢]
  JPQL: SELECT u.department, AVG(u.age) FROM User u GROUP BY u.department
  人事: 平均年齢 28.0歳
  営業: 平均年齢 30.0歳
  開発: 平均年齢 30.7歳

[名前で検索]
  JPQL: SELECT u FROM User u WHERE u.name LIKE %:keyword%
  結果: User[id=1, name=田中太郎, age=25, department=開発]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ネイティブクエリと更新クエリ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">nativeQuery = true</code> で生SQLを実行でき、
          <code className="text-orange-300">@Modifying</code> で UPDATE/DELETE 文を実行できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {

    record User(int id, String name, int age, String department) {}

    static List<User> users = new ArrayList<>(List.of(
        new User(1, "Alice", 25, "Dev"),
        new User(2, "Bob", 30, "Sales"),
        new User(3, "Charlie", 35, "Dev")
    ));

    // @Query(value = "SELECT * FROM users WHERE department = ?1",
    //        nativeQuery = true)
    static void nativeQuery(String dept) {
        System.out.println("  ネイティブSQL: SELECT * FROM users WHERE department = '" + dept + "'");
        users.stream()
            .filter(u -> u.department().equals(dept))
            .forEach(u -> System.out.println("  結果: " + u));
    }

    // @Modifying
    // @Query("UPDATE User u SET u.department = :newDept WHERE u.department = :oldDept")
    static int updateDepartment(String oldDept, String newDept) {
        System.out.println("  JPQL: UPDATE User u SET u.department = '" + newDept
            + "' WHERE u.department = '" + oldDept + "'");
        int count = 0;
        List<User> updated = new ArrayList<>();
        for (User u : users) {
            if (u.department().equals(oldDept)) {
                updated.add(new User(u.id(), u.name(), u.age(), newDept));
                count++;
            } else {
                updated.add(u);
            }
        }
        users.clear();
        users.addAll(updated);
        return count;
    }

    public static void main(String[] args) {
        System.out.println("=== ネイティブクエリ & 更新クエリ ===");

        System.out.println("\\n[ネイティブクエリ] department=Dev:");
        nativeQuery("Dev");

        System.out.println("\\n[@Modifying] 部署名変更 Dev -> Engineering:");
        int updated = updateDepartment("Dev", "Engineering");
        System.out.println("  更新件数: " + updated);

        System.out.println("\\n[変更後の全データ]:");
        users.forEach(u -> System.out.println("  " + u));
    }
}`}
          expectedOutput={`=== ネイティブクエリ & 更新クエリ ===

[ネイティブクエリ] department=Dev:
  ネイティブSQL: SELECT * FROM users WHERE department = 'Dev'
  結果: User[id=1, name=Alice, age=25, department=Dev]
  結果: User[id=3, name=Charlie, age=35, department=Dev]

[@Modifying] 部署名変更 Dev -> Engineering:
  JPQL: UPDATE User u SET u.department = 'Engineering' WHERE u.department = 'Dev'
  更新件数: 2

[変更後の全データ]:
  User[id=1, name=Alice, age=25, department=Engineering]
  User[id=2, name=Bob, age=30, department=Sales]
  User[id=3, name=Charlie, age=35, department=Engineering]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="jpa" lessonId="jpql" />
      </div>
      <LessonNav lessons={lessons} currentId="jpql" basePath="/learn/jpa" />
    </div>
  );
}

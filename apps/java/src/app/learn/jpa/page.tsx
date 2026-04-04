import { JavaEditor } from "@/components/java-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("jpa");

const quizQuestions: QuizQuestion[] = [
  {
    question: "@Entityアノテーションの役割は何ですか？",
    options: [
      "クラスをSpring Beanとして登録する",
      "クラスをデータベースのテーブルにマッピングする",
      "クラスをRESTコントローラとして定義する",
      "クラスをシリアライズ可能にする",
    ],
    answer: 1,
    explanation: "@EntityはクラスをデータベースのテーブルにマッピングするためのJPAアノテーションです。各フィールドがカラムに対応し、@Idで主キーを指定します。",
  },
  {
    question: "JpaRepositoryを使う利点は何ですか？",
    options: [
      "SQLを直接書く必要がある",
      "CRUD操作のメソッドが自動で提供される",
      "トランザクション管理ができない",
      "NoSQLデータベース専用である",
    ],
    answer: 1,
    explanation: "JpaRepositoryを継承するだけで、save・findById・findAll・deleteByIdなどの基本的なCRUD操作が自動で提供されます。カスタムクエリも追加可能です。",
  },
  {
    question: "@Queryアノテーションの用途は何ですか？",
    options: [
      "データベースを自動作成する",
      "JPQLやネイティブSQLでカスタムクエリを定義する",
      "インデックスを自動作成する",
      "テーブルの結合を禁止する",
    ],
    answer: 1,
    explanation: "@Queryはメソッド名規則では表現しにくい複雑なクエリをJPQLまたはネイティブSQLで定義するためのアノテーションです。",
  },
  {
    question: "@OneToManyリレーションの説明として正しいものはどれですか？",
    options: [
      "1つのエンティティが1つの別エンティティに対応する",
      "1つのエンティティが複数の別エンティティに対応する",
      "多対多のリレーションを表す",
      "自己参照のリレーションのみに使う",
    ],
    answer: 1,
    explanation: "@OneToManyは1対多のリレーションを表します。例えば1人のユーザーが複数の注文を持つ場合に使います。通常@ManyToOneと対で使われます。",
  },
];

export default function JpaPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-2">JPA・データベース</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          JPA（Java Persistence API）を使ったデータベース操作を学びましょう。エンティティのマッピング・リポジトリパターン・JPQL・リレーションの定義など、データ永続化の基本を解説します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="jpa" totalLessons={8} color="blue" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/jpa" color="blue" categoryId="jpa" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Entityクラスの定義</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">@Entity</code> でクラスをテーブルにマッピングし、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">@Id</code> と
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">@Column</code> でフィールドを定義します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

// JPA Entityの擬似実装
public class Main {

    // @Entity
    // @Table(name = "users")
    static class User {
        // @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        // @Column(nullable = false, length = 50)
        private String name;

        // @Column(unique = true)
        private String email;

        User() {} // JPA用デフォルトコンストラクタ

        User(Long id, String name, String email) {
            this.id = id;
            this.name = name;
            this.email = email;
        }

        public String toString() {
            return "User{id=" + id + ", name='" + name + "', email='" + email + "'}";
        }
    }

    public static void main(String[] args) {
        // エンティティの作成（実際はJPAが管理）
        User user1 = new User(1L, "Alice", "alice@example.com");
        User user2 = new User(2L, "Bob", "bob@example.com");
        User user3 = new User(3L, "Charlie", "charlie@example.com");

        List<User> users = List.of(user1, user2, user3);
        System.out.println("=== エンティティ一覧 ===");
        users.forEach(System.out::println);
        System.out.println("レコード数: " + users.size());
    }
}`}
          expectedOutput={`=== エンティティ一覧 ===
User{id=1, name='Alice', email='alice@example.com'}
User{id=2, name='Bob', email='bob@example.com'}
User{id=3, name='Charlie', email='charlie@example.com'}
レコード数: 3`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Repositoryインターフェース</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">JpaRepository</code> を継承することで、
          CRUD操作のメソッドが自動で提供されます。メソッド名規則でカスタムクエリも定義できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;
import java.util.stream.*;

// Repository パターンの擬似実装
public class Main {

    record User(Long id, String name, String email, int age) {}

    // JpaRepository<User, Long> の擬似実装
    static class UserRepository {
        private final List<User> db = new ArrayList<>();

        // save() - 自動提供
        User save(User user) { db.add(user); return user; }

        // findAll() - 自動提供
        List<User> findAll() { return List.copyOf(db); }

        // findById() - 自動提供
        Optional<User> findById(Long id) {
            return db.stream().filter(u -> u.id().equals(id)).findFirst();
        }

        // メソッド名規則によるカスタムクエリ
        List<User> findByNameContaining(String keyword) {
            return db.stream()
                .filter(u -> u.name().contains(keyword))
                .collect(Collectors.toList());
        }

        // @Query("SELECT u FROM User u WHERE u.age >= :age")
        List<User> findByAgeGreaterThanEqual(int age) {
            return db.stream()
                .filter(u -> u.age() >= age)
                .collect(Collectors.toList());
        }
    }

    public static void main(String[] args) {
        UserRepository repo = new UserRepository();
        repo.save(new User(1L, "Alice", "alice@example.com", 25));
        repo.save(new User(2L, "Bob", "bob@example.com", 30));
        repo.save(new User(3L, "Alice2", "alice2@example.com", 22));

        System.out.println("=== findAll ===");
        repo.findAll().forEach(System.out::println);

        System.out.println("=== findById(2) ===");
        repo.findById(2L).ifPresent(System.out::println);

        System.out.println("=== findByNameContaining(Alice) ===");
        repo.findByNameContaining("Alice").forEach(System.out::println);

        System.out.println("=== findByAgeGreaterThanEqual(25) ===");
        repo.findByAgeGreaterThanEqual(25).forEach(System.out::println);
    }
}`}
          expectedOutput={`=== findAll ===
User[id=1, name=Alice, email=alice@example.com, age=25]
User[id=2, name=Bob, email=bob@example.com, age=30]
User[id=3, name=Alice2, email=alice2@example.com, age=22]
=== findById(2) ===
User[id=2, name=Bob, email=bob@example.com, age=30]
=== findByNameContaining(Alice) ===
User[id=1, name=Alice, email=alice@example.com, age=25]
User[id=3, name=Alice2, email=alice2@example.com, age=22]
=== findByAgeGreaterThanEqual(25) ===
User[id=1, name=Alice, email=alice@example.com, age=25]
User[id=2, name=Bob, email=bob@example.com, age=30]`}
        />
      </section>

      <Quiz questions={quizQuestions} color="blue" />
    </div>
  );
}

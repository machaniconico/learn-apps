import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("jpa");

export default function RepositoryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">JPA・データベース レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">リポジトリ</h1>
        <p className="text-gray-400">JpaRepository&lt;T, ID&gt;、save、findById、deleteById</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">JpaRepositoryの基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">JpaRepository&lt;T, ID&gt;</code> インターフェースを継承するだけで、
          基本的なCRUD操作が自動的に実装されます。実装クラスを書く必要はありません。
          Spring Data JPAが実行時にプロキシを自動生成します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>save(entity)</code> - 新規作成または更新</li>
          <li><code>findById(id)</code> - IDで1件取得（Optional）</li>
          <li><code>findAll()</code> - 全件取得</li>
          <li><code>deleteById(id)</code> - IDで1件削除</li>
          <li><code>count()</code> - 件数を取得</li>
          <li><code>existsById(id)</code> - 存在チェック</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">CRUD操作の実行</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">JpaRepository</code> が提供する基本的なCRUD操作を使って
          データベースの読み書きを行います。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {

    record User(int id, String name, String email) {}

    // JpaRepository<User, Integer> の擬似実装
    static class UserRepository {
        private final Map<Integer, User> db = new LinkedHashMap<>();
        private int nextId = 1;

        // save - 新規作成/更新
        User save(User user) {
            User saved = new User(
                user.id() == 0 ? nextId++ : user.id(),
                user.name(), user.email()
            );
            db.put(saved.id(), saved);
            return saved;
        }

        // findById
        Optional<User> findById(int id) {
            return Optional.ofNullable(db.get(id));
        }

        // findAll
        List<User> findAll() {
            return new ArrayList<>(db.values());
        }

        // deleteById
        void deleteById(int id) { db.remove(id); }

        // count
        long count() { return db.size(); }

        // existsById
        boolean existsById(int id) { return db.containsKey(id); }
    }

    public static void main(String[] args) {
        System.out.println("=== JpaRepository CRUD ===");
        UserRepository repo = new UserRepository();

        // save (CREATE)
        System.out.println("\\n[save] 新規作成:");
        User u1 = repo.save(new User(0, "Alice", "alice@mail.com"));
        User u2 = repo.save(new User(0, "Bob", "bob@mail.com"));
        User u3 = repo.save(new User(0, "Charlie", "charlie@mail.com"));
        System.out.println("  " + u1);
        System.out.println("  " + u2);
        System.out.println("  " + u3);

        // findById (READ)
        System.out.println("\\n[findById] ID=2:");
        repo.findById(2).ifPresent(u -> System.out.println("  " + u));

        // findAll
        System.out.println("\\n[findAll] 全件:");
        repo.findAll().forEach(u -> System.out.println("  " + u));

        // save (UPDATE)
        System.out.println("\\n[save] 更新 (ID=1):");
        User updated = repo.save(new User(1, "Alice Smith", "alice.s@mail.com"));
        System.out.println("  " + updated);

        // deleteById
        System.out.println("\\n[deleteById] ID=3 削除");
        repo.deleteById(3);

        System.out.println("\\n[count] 件数: " + repo.count());
        System.out.println("[existsById] ID=3: " + repo.existsById(3));
    }
}`}
          expectedOutput={`=== JpaRepository CRUD ===

[save] 新規作成:
  User[id=1, name=Alice, email=alice@mail.com]
  User[id=2, name=Bob, email=bob@mail.com]
  User[id=3, name=Charlie, email=charlie@mail.com]

[findById] ID=2:
  User[id=2, name=Bob, email=bob@mail.com]

[findAll] 全件:
  User[id=1, name=Alice, email=alice@mail.com]
  User[id=2, name=Bob, email=bob@mail.com]
  User[id=3, name=Charlie, email=charlie@mail.com]

[save] 更新 (ID=1):
  User[id=1, name=Alice Smith, email=alice.s@mail.com]

[deleteById] ID=3 削除

[count] 件数: 2
[existsById] ID=3: false`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Serviceとの連携</h2>
        <p className="text-gray-400 mb-4">
          実際のアプリケーションでは、リポジトリをServiceレイヤーから呼び出し、
          ビジネスロジックとデータアクセスを分離します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {

    record User(int id, String name, String email) {}

    // Repository層
    static class UserRepository {
        Map<Integer, User> db = new LinkedHashMap<>();
        int nextId = 1;
        User save(User u) {
            User saved = new User(u.id() == 0 ? nextId++ : u.id(), u.name(), u.email());
            db.put(saved.id(), saved);
            return saved;
        }
        Optional<User> findById(int id) { return Optional.ofNullable(db.get(id)); }
        List<User> findAll() { return new ArrayList<>(db.values()); }
    }

    // @Service - ビジネスロジック層
    static class UserService {
        private final UserRepository repository;

        UserService(UserRepository repository) {
            this.repository = repository;
        }

        User createUser(String name, String email) {
            // バリデーションなどのビジネスロジック
            if (name == null || name.isBlank()) {
                throw new RuntimeException("名前は必須です");
            }
            return repository.save(new User(0, name, email));
        }

        User getUserById(int id) {
            return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found: " + id));
        }

        List<User> getAllUsers() {
            return repository.findAll();
        }
    }

    public static void main(String[] args) {
        System.out.println("=== Service + Repository ===");

        UserRepository repo = new UserRepository();
        UserService service = new UserService(repo);

        service.createUser("Alice", "alice@mail.com");
        service.createUser("Bob", "bob@mail.com");

        System.out.println("\\n全ユーザー:");
        service.getAllUsers().forEach(u -> System.out.println("  " + u));

        System.out.println("\\nID=1のユーザー:");
        System.out.println("  " + service.getUserById(1));

        System.out.println("\\nID=99を検索:");
        try {
            service.getUserById(99);
        } catch (RuntimeException e) {
            System.out.println("  エラー: " + e.getMessage());
        }
    }
}`}
          expectedOutput={`=== Service + Repository ===

全ユーザー:
  User[id=1, name=Alice, email=alice@mail.com]
  User[id=2, name=Bob, email=bob@mail.com]

ID=1のユーザー:
  User[id=1, name=Alice, email=alice@mail.com]

ID=99を検索:
  エラー: User not found: 99`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="jpa" lessonId="repository" />
      </div>
      <LessonNav lessons={lessons} currentId="repository" basePath="/learn/jpa" />
    </div>
  );
}

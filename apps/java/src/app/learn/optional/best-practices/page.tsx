import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("optional");

export default function BestPracticesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">Optional レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ベストプラクティス</h1>
        <p className="text-gray-400">Optionalの正しい使い方とアンチパターン</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Optionalの正しい使い方</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Optionalは「値が存在しないかもしれない」ことをAPIレベルで明示するために設計されました。
          すべてのnullをOptionalに置き換えるのではなく、適切な場面で使うことが重要です。
          誤った使い方をするとコードが複雑になり、パフォーマンスも低下します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>メソッドの戻り値として使う（主な用途）</li>
          <li>フィールドには使わない（Serializableでない）</li>
          <li>メソッドの引数には使わない（nullableの方がシンプル）</li>
          <li>コレクションの要素として使わない（空のコレクションで表現する）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">良い使い方: 戻り値として</h2>
        <p className="text-gray-400 mb-4">
          Optionalの主な用途は、メソッドの戻り値として値がないことを明示することです。
          呼び出し側は結果がないケースを意識して処理を書くことになります。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Optional;
import java.util.List;
import java.util.Arrays;

public class Main {
    static class UserService {
        private List<String> users = Arrays.asList("Alice", "Bob", "Charlie");

        // 良い例: 見つからない可能性がある検索結果
        Optional<String> findByName(String name) {
            return users.stream()
                .filter(u -> u.equalsIgnoreCase(name))
                .findFirst();
        }

        // 良い例: 空のコレクションで「なし」を表現
        List<String> findByPrefix(String prefix) {
            return users.stream()
                .filter(u -> u.startsWith(prefix))
                .collect(java.util.stream.Collectors.toList());
        }
    }

    public static void main(String[] args) {
        UserService service = new UserService();

        // Optional戻り値 → 安全に処理
        service.findByName("alice")
            .ifPresentOrElse(
                user -> System.out.println("見つかった: " + user),
                () -> System.out.println("見つかりません")
            );

        service.findByName("david")
            .ifPresentOrElse(
                user -> System.out.println("見つかった: " + user),
                () -> System.out.println("見つかりません")
            );

        // コレクション → 空リストで「なし」
        System.out.println("Aで始まる: " + service.findByPrefix("A"));
        System.out.println("Zで始まる: " + service.findByPrefix("Z"));
    }
}`}
          expectedOutput={`見つかった: Alice
見つかりません
Aで始まる: [Alice]
Zで始まる: []`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">アンチパターン</h2>
        <p className="text-gray-400 mb-4">
          Optionalの間違った使い方を紹介します。
          これらのパターンを避けることで、コードをシンプルに保てます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Optional;

public class Main {
    public static void main(String[] args) {
        // NG: isPresent() + get() の組み合わせ → orElse を使うべき
        Optional<String> opt = Optional.of("value");
        // Bad:
        if (opt.isPresent()) {
            System.out.println("Bad: " + opt.get());
        }
        // Good:
        opt.ifPresent(v -> System.out.println("Good: " + v));

        // NG: Optional.of(null) → NullPointerException
        // Optional.of(null); // ← これは例外！

        // Good: ofNullable を使う
        String maybeNull = null;
        Optional<String> safe = Optional.ofNullable(maybeNull);
        System.out.println("ofNullable(null): " + safe.orElse("安全"));

        // NG: Optionalを条件分岐だけに使う
        // Good: map/flatMap/filter のチェーンを活用する
        Optional<String> email = Optional.of("user@example.com");
        String domain = email
            .filter(e -> e.contains("@"))
            .map(e -> e.split("@")[1])
            .orElse("不正");
        System.out.println("ドメイン: " + domain);
    }
}`}
          expectedOutput={`Bad: value
Good: value
ofNullable(null): 安全
ドメイン: example.com`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実践的なパターン</h2>
        <p className="text-gray-400 mb-4">
          Optionalを使った実践的なコードパターンです。
          メソッドチェーンで安全にデータを変換・検証する流れを身につけましょう。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Optional;
import java.util.Map;
import java.util.HashMap;

public class Main {
    static Map<String, Map<String, String>> config = new HashMap<>();
    static {
        Map<String, String> db = new HashMap<>();
        db.put("host", "localhost");
        db.put("port", "5432");
        config.put("database", db);
    }

    // Optional を活用したネストされた設定値の取得
    static Optional<String> getConfig(String section, String key) {
        return Optional.ofNullable(config.get(section))
            .map(m -> m.get(key));
    }

    // デフォルト値付きの設定取得
    static String getConfigOrDefault(String section, String key, String defaultVal) {
        return getConfig(section, key).orElse(defaultVal);
    }

    public static void main(String[] args) {
        // 設定値の安全な取得
        System.out.println("DB host: " + getConfigOrDefault("database", "host", "unknown"));
        System.out.println("DB port: " + getConfigOrDefault("database", "port", "3306"));
        System.out.println("DB name: " + getConfigOrDefault("database", "name", "mydb"));
        System.out.println("Cache host: " + getConfigOrDefault("cache", "host", "redis"));

        // ポート番号をintに変換
        int port = getConfig("database", "port")
            .map(Integer::parseInt)
            .orElse(3306);
        System.out.println("ポート(int): " + port);
    }
}`}
          expectedOutput={`DB host: localhost
DB port: 5432
DB name: mydb
Cache host: redis
ポート(int): 5432`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="optional" lessonId="best-practices" />
      </div>
      <LessonNav lessons={lessons} currentId="best-practices" basePath="/learn/optional" />
    </div>
  );
}

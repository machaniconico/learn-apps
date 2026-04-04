import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

export default function BestPracticesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">エコシステム レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ベストプラクティス</h1>
        <p className="text-gray-400">Effective Java原則（不変オブジェクト、Builder、try-with-resources）</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Effective Java の重要原則</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Joshua Blochの「Effective Java」は、Java開発者必読のベストプラクティス集です。
          安全で保守しやすいコードを書くための原則を厳選して紹介します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>不変オブジェクトを優先する</li>
          <li>コンストラクタの代わりにstaticファクトリメソッドを検討する</li>
          <li>多くのパラメータにはBuilderを使う</li>
          <li>try-with-resources でリソースを確実にクローズする</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">不変オブジェクトを優先する</h2>
        <p className="text-gray-400 mb-4">
          不変（immutable）オブジェクトはスレッドセーフで、バグが少なく、推論しやすいです。
          Java 16+ の Record は不変オブジェクトを簡単に作れます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Collections;
import java.util.List;
import java.util.ArrayList;

// 不変クラスの例
final class Money {
    private final int amount;
    private final String currency;

    Money(int amount, String currency) {
        this.amount = amount;
        this.currency = currency;
    }

    // 変更操作は新しいオブジェクトを返す
    Money add(Money other) {
        if (!this.currency.equals(other.currency)) {
            throw new IllegalArgumentException("通貨が異なります");
        }
        return new Money(this.amount + other.amount, this.currency);
    }

    public String toString() {
        return amount + " " + currency;
    }
}

public class Main {
    public static void main(String[] args) {
        Money price = new Money(1000, "JPY");
        Money tax = new Money(100, "JPY");
        Money total = price.add(tax);  // 元のオブジェクトは変わらない

        System.out.println("価格: " + price);
        System.out.println("税金: " + tax);
        System.out.println("合計: " + total);
        System.out.println();

        // 不変リスト（Java 9+）
        List<String> immutable = List.of("A", "B", "C");
        System.out.println("不変リスト: " + immutable);

        // 既存リストを不変にラップ
        List<String> mutable = new ArrayList<>(List.of("X", "Y"));
        List<String> unmod = Collections.unmodifiableList(mutable);
        System.out.println("変更不可リスト: " + unmod);

        System.out.println();
        System.out.println("不変オブジェクトの利点:");
        System.out.println("  - スレッドセーフ（同期不要）");
        System.out.println("  - 安全に共有・キャッシュ可能");
        System.out.println("  - 副作用がなく推論しやすい");
    }
}`}
          expectedOutput={`価格: 1000 JPY
税金: 100 JPY
合計: 1100 JPY

不変リスト: [A, B, C]
変更不可リスト: [X, Y]

不変オブジェクトの利点:
  - スレッドセーフ（同期不要）
  - 安全に共有・キャッシュ可能
  - 副作用がなく推論しやすい`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">staticファクトリメソッド</h2>
        <p className="text-gray-400 mb-4">
          コンストラクタの代わりにstaticファクトリメソッドを使うと、
          名前で意図を表現でき、柔軟なオブジェクト生成が可能になります。
        </p>
        <JavaEditor
          defaultCode={`class Color {
    private final int r, g, b;

    private Color(int r, int g, int b) {
        this.r = r; this.g = g; this.b = b;
    }

    // staticファクトリメソッド（名前で意図が明確）
    public static Color of(int r, int g, int b) {
        return new Color(r, g, b);
    }

    public static Color fromHex(String hex) {
        int r = Integer.parseInt(hex.substring(1, 3), 16);
        int g = Integer.parseInt(hex.substring(3, 5), 16);
        int b = Integer.parseInt(hex.substring(5, 7), 16);
        return new Color(r, g, b);
    }

    public static Color red() { return new Color(255, 0, 0); }
    public static Color blue() { return new Color(0, 0, 255); }

    public String toString() {
        return String.format("RGB(%d, %d, %d)", r, g, b);
    }
}

public class Main {
    public static void main(String[] args) {
        // staticファクトリメソッドの利点
        Color c1 = Color.of(128, 200, 50);
        Color c2 = Color.fromHex("#FF6600");
        Color c3 = Color.red();

        System.out.println("of():      " + c1);
        System.out.println("fromHex(): " + c2);
        System.out.println("red():     " + c3);
        System.out.println();

        System.out.println("=== Java標準のstaticファクトリ ===");
        System.out.println("List.of(1, 2, 3)");
        System.out.println("Map.of(\\"key\\", \\"value\\")");
        System.out.println("Optional.of(value)");
        System.out.println("Integer.valueOf(42)");
        System.out.println("Boolean.valueOf(true)  → キャッシュ済みインスタンス");
    }
}`}
          expectedOutput={`of():      RGB(128, 200, 50)
fromHex(): RGB(255, 102, 0)
red():     RGB(255, 0, 0)

=== Java標準のstaticファクトリ ===
List.of(1, 2, 3)
Map.of("key", "value")
Optional.of(value)
Integer.valueOf(42)
Boolean.valueOf(true)  → キャッシュ済みインスタンス`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">try-with-resources</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">AutoCloseable</code> を実装したリソースは
          try-with-resources 文で確実にクローズされます。
          finallyブロックでの手動クローズより安全で簡潔です。
        </p>
        <JavaEditor
          defaultCode={`import java.io.*;

// AutoCloseableを実装したカスタムリソース
class DatabaseConnection implements AutoCloseable {
    private String name;

    DatabaseConnection(String name) {
        this.name = name;
        System.out.println(name + ": 接続開始");
    }

    void query(String sql) {
        System.out.println(name + ": 実行 → " + sql);
    }

    @Override
    public void close() {
        System.out.println(name + ": 接続終了（自動）");
    }
}

public class Main {
    public static void main(String[] args) {
        // try-with-resources（推奨）
        System.out.println("=== try-with-resources ===");
        try (var conn = new DatabaseConnection("DB1")) {
            conn.query("SELECT * FROM users");
        }  // 自動的にclose()が呼ばれる
        System.out.println();

        // 複数リソース
        System.out.println("=== 複数リソース ===");
        try (var conn1 = new DatabaseConnection("DB-A");
             var conn2 = new DatabaseConnection("DB-B")) {
            conn1.query("SELECT * FROM orders");
            conn2.query("INSERT INTO logs ...");
        }  // 逆順でclose（DB-B → DB-A）
        System.out.println();

        System.out.println("ポイント:");
        System.out.println("  - 例外発生時もclose()が確実に呼ばれる");
        System.out.println("  - 複数リソースは逆順にクローズ");
        System.out.println("  - finallyでのnullチェック不要");
    }
}`}
          expectedOutput={`=== try-with-resources ===
DB1: 接続開始
DB1: 実行 → SELECT * FROM users
DB1: 接続終了（自動）

=== 複数リソース ===
DB-A: 接続開始
DB-B: 接続開始
DB-A: 実行 → SELECT * FROM orders
DB-B: 実行 → INSERT INTO logs ...
DB-B: 接続終了（自動）
DB-A: 接続終了（自動）

ポイント:
  - 例外発生時もclose()が確実に呼ばれる
  - 複数リソースは逆順にクローズ
  - finallyでのnullチェック不要`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="best-practices" />
      </div>
      <LessonNav lessons={lessons} currentId="best-practices" basePath="/learn/ecosystem" />
    </div>
  );
}

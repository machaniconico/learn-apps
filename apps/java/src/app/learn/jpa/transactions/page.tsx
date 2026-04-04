import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("jpa");

export default function TransactionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">JPA・データベース レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">トランザクション</h1>
        <p className="text-gray-400">@Transactional、isolation、propagation、readOnly</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">トランザクション管理</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">@Transactional</code> をメソッドに付けると、
          そのメソッドの処理全体がトランザクションとして管理されます。
          正常終了でコミット、例外発生でロールバックが自動的に行われます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>@Transactional</code> - トランザクション境界を宣言</li>
          <li><code>readOnly = true</code> - 読み取り専用（パフォーマンス最適化）</li>
          <li><code>isolation</code> - 分離レベル（READ_COMMITTED, REPEATABLE_READなど）</li>
          <li><code>propagation</code> - 伝播方式（REQUIRED, REQUIRES_NEWなど）</li>
          <li>RuntimeException でロールバック、CheckedException はコミット</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">@Transactionalの基本動作</h2>
        <p className="text-gray-400 mb-4">
          トランザクション内の処理がすべて成功すればコミット、途中で例外が発生すればロールバックされます。
          銀行の送金処理のような「全か無か」の操作に不可欠です。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {

    static Map<String, Integer> accounts = new LinkedHashMap<>(Map.of(
        "Alice", 100000,
        "Bob", 50000
    ));

    // @Transactional
    static void transfer(String from, String to, int amount) {
        System.out.println("  BEGIN TRANSACTION");

        int fromBalance = accounts.get(from);
        if (fromBalance < amount) {
            System.out.println("  ROLLBACK (残高不足)");
            throw new RuntimeException("残高不足: " + from);
        }

        // 出金
        accounts.put(from, accounts.get(from) - amount);
        System.out.println("  " + from + " から " + amount + "円 出金");

        // 入金
        accounts.put(to, accounts.get(to) + amount);
        System.out.println("  " + to + " に " + amount + "円 入金");

        System.out.println("  COMMIT");
    }

    // ロールバック発生のケース
    static void transferWithError(String from, String to, int amount) {
        Map<String, Integer> backup = new LinkedHashMap<>(accounts);
        System.out.println("  BEGIN TRANSACTION");

        accounts.put(from, accounts.get(from) - amount);
        System.out.println("  " + from + " から " + amount + "円 出金");

        // 途中でエラー発生！
        System.out.println("  ** RuntimeException発生 **");
        accounts.clear();
        accounts.putAll(backup); // ロールバック
        System.out.println("  ROLLBACK (全操作が取り消し)");
    }

    public static void main(String[] args) {
        System.out.println("=== @Transactional ===");

        System.out.println("\\n初期残高: " + accounts);

        System.out.println("\\n[正常な送金]");
        transfer("Alice", "Bob", 30000);
        System.out.println("残高: " + accounts);

        System.out.println("\\n[エラーが発生する送金]");
        transferWithError("Alice", "Bob", 20000);
        System.out.println("残高: " + accounts + " (変更なし)");
    }
}`}
          expectedOutput={`=== @Transactional ===

初期残高: {Alice=100000, Bob=50000}

[正常な送金]
  BEGIN TRANSACTION
  Alice から 30000円 出金
  Bob に 30000円 入金
  COMMIT
残高: {Alice=70000, Bob=80000}

[エラーが発生する送金]
  BEGIN TRANSACTION
  Alice から 20000円 出金
  ** RuntimeException発生 **
  ROLLBACK (全操作が取り消し)
残高: {Alice=70000, Bob=80000} (変更なし)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">isolation（分離レベル）とpropagation（伝播）</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">isolation</code> で並行トランザクションの分離レベルを、
          <code className="text-orange-300">propagation</code> でトランザクションの伝播方式を制御します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {

    public static void main(String[] args) {
        System.out.println("=== isolation（分離レベル）===\\n");

        Map<String, String> isolations = new LinkedHashMap<>();
        isolations.put("READ_UNCOMMITTED", "ダーティリード可能（最低）");
        isolations.put("READ_COMMITTED", "コミット済みデータのみ読み取り（一般的）");
        isolations.put("REPEATABLE_READ", "トランザクション内で同じ結果を保証");
        isolations.put("SERIALIZABLE", "完全な直列化（最高・最遅）");

        isolations.forEach((level, desc) ->
            System.out.println("  " + level + ": " + desc));

        System.out.println("\\n=== propagation（伝播方式）===\\n");

        Map<String, String> propagations = new LinkedHashMap<>();
        propagations.put("REQUIRED", "既存TXあれば参加、なければ新規（デフォルト）");
        propagations.put("REQUIRES_NEW", "常に新規TXを作成（既存は中断）");
        propagations.put("SUPPORTS", "既存TXあれば参加、なければTXなし");
        propagations.put("NOT_SUPPORTED", "TXなしで実行（既存は中断）");
        propagations.put("MANDATORY", "既存TX必須（なければ例外）");
        propagations.put("NEVER", "TXなし必須（あれば例外）");

        propagations.forEach((prop, desc) ->
            System.out.println("  " + prop + ": " + desc));

        System.out.println("\\n=== 使用例 ===\\n");

        System.out.println("// 読み取り専用（パフォーマンス最適化）");
        System.out.println("@Transactional(readOnly = true)");
        System.out.println("List<User> findAll() { ... }");

        System.out.println("\\n// ログ記録は独立トランザクション");
        System.out.println("@Transactional(propagation = REQUIRES_NEW)");
        System.out.println("void saveLog(String message) { ... }");

        System.out.println("\\n// 高い分離レベル");
        System.out.println("@Transactional(isolation = SERIALIZABLE)");
        System.out.println("void processPayment() { ... }");
    }
}`}
          expectedOutput={`=== isolation（分離レベル）===

  READ_UNCOMMITTED: ダーティリード可能（最低）
  READ_COMMITTED: コミット済みデータのみ読み取り（一般的）
  REPEATABLE_READ: トランザクション内で同じ結果を保証
  SERIALIZABLE: 完全な直列化（最高・最遅）

=== propagation（伝播方式）===

  REQUIRED: 既存TXあれば参加、なければ新規（デフォルト）
  REQUIRES_NEW: 常に新規TXを作成（既存は中断）
  SUPPORTS: 既存TXあれば参加、なければTXなし
  NOT_SUPPORTED: TXなしで実行（既存は中断）
  MANDATORY: 既存TX必須（なければ例外）
  NEVER: TXなし必須（あれば例外）

=== 使用例 ===

// 読み取り専用（パフォーマンス最適化）
@Transactional(readOnly = true)
List<User> findAll() { ... }

// ログ記録は独立トランザクション
@Transactional(propagation = REQUIRES_NEW)
void saveLog(String message) { ... }

// 高い分離レベル
@Transactional(isolation = SERIALIZABLE)
void processPayment() { ... }`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="jpa" lessonId="transactions" />
      </div>
      <LessonNav lessons={lessons} currentId="transactions" basePath="/learn/jpa" />
    </div>
  );
}

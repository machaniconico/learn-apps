import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function SingletonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">デザインパターン レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Singletonパターン</h1>
        <p className="text-gray-400">private constructor、getInstance()、enum Singleton</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Singletonパターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Singletonパターンは、あるクラスのインスタンスが1つだけ存在することを保証するパターンです。
          設定管理、ログ出力、データベース接続プールなど、アプリケーション全体で
          共有するリソースに適用されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>コンストラクタを <code>private</code> にして外部からのインスタンス生成を防ぐ</li>
          <li><code>getInstance()</code> メソッドで唯一のインスタンスを返す</li>
          <li>スレッドセーフにする工夫が必要</li>
          <li>enum Singletonが最もシンプルで安全</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なSingleton</h2>
        <p className="text-gray-400 mb-4">
          private コンストラクタと static フィールドでインスタンスを1つに制限します。
        </p>
        <JavaEditor
          defaultCode={`class AppConfig {
    private static AppConfig instance;
    private String appName;
    private String version;

    // privateコンストラクタ → 外部からnewできない
    private AppConfig() {
        this.appName = "MyApp";
        this.version = "1.0.0";
    }

    // 唯一のインスタンスを取得
    public static AppConfig getInstance() {
        if (instance == null) {
            instance = new AppConfig();
        }
        return instance;
    }

    public String getAppName() { return appName; }
    public String getVersion() { return version; }
}

public class Main {
    public static void main(String[] args) {
        AppConfig config1 = AppConfig.getInstance();
        AppConfig config2 = AppConfig.getInstance();

        System.out.println("config1: " + config1.getAppName() + " v" + config1.getVersion());
        System.out.println("config2: " + config2.getAppName() + " v" + config2.getVersion());
        System.out.println("同じインスタンス: " + (config1 == config2));
    }
}`}
          expectedOutput={`config1: MyApp v1.0.0
config2: MyApp v1.0.0
同じインスタンス: true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スレッドセーフなSingleton</h2>
        <p className="text-gray-400 mb-4">
          マルチスレッド環境では、二重チェックロッキング（Double-Checked Locking）を使って
          スレッドセーフにします。
        </p>
        <JavaEditor
          defaultCode={`class DatabasePool {
    // volatileで可視性を保証
    private static volatile DatabasePool instance;
    private int poolSize;

    private DatabasePool(int poolSize) {
        this.poolSize = poolSize;
        // 接続プール初期化のシミュレーション
    }

    public static DatabasePool getInstance() {
        if (instance == null) {
            synchronized (DatabasePool.class) {
                if (instance == null) {  // 二重チェック
                    instance = new DatabasePool(10);
                }
            }
        }
        return instance;
    }

    public int getPoolSize() { return poolSize; }
}

public class Main {
    public static void main(String[] args) {
        DatabasePool pool = DatabasePool.getInstance();
        System.out.println("プールサイズ: " + pool.getPoolSize());
        System.out.println();

        System.out.println("=== スレッドセーフ実装の方法 ===");
        System.out.println("1. synchronized メソッド（簡単だが遅い）");
        System.out.println("2. Double-Checked Locking + volatile");
        System.out.println("3. static inner class（遅延初期化）");
        System.out.println("4. enum Singleton（最推奨）");
    }
}`}
          expectedOutput={`プールサイズ: 10

=== スレッドセーフ実装の方法 ===
1. synchronized メソッド（簡単だが遅い）
2. Double-Checked Locking + volatile
3. static inner class（遅延初期化）
4. enum Singleton（最推奨）`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">enum Singleton（推奨）</h2>
        <p className="text-gray-400 mb-4">
          Effective Javaで推奨されている方法です。スレッドセーフで、
          シリアライゼーションやリフレクション攻撃にも耐性があります。
        </p>
        <JavaEditor
          defaultCode={`enum Logger {
    INSTANCE;  // 唯一のインスタンス

    private int logCount = 0;

    public void log(String message) {
        logCount++;
        System.out.println("[LOG " + logCount + "] " + message);
    }

    public int getLogCount() {
        return logCount;
    }
}

public class Main {
    public static void main(String[] args) {
        Logger.INSTANCE.log("アプリ起動");
        Logger.INSTANCE.log("ユーザーログイン");
        Logger.INSTANCE.log("データ保存");

        System.out.println("ログ件数: " + Logger.INSTANCE.getLogCount());
        System.out.println();
        System.out.println("enum Singletonの利点:");
        System.out.println("  - スレッドセーフ（JVMが保証）");
        System.out.println("  - シリアライゼーション安全");
        System.out.println("  - リフレクション攻撃に耐性");
        System.out.println("  - 実装が最もシンプル");
    }
}`}
          expectedOutput={`[LOG 1] アプリ起動
[LOG 2] ユーザーログイン
[LOG 3] データ保存
ログ件数: 3

enum Singletonの利点:
  - スレッドセーフ（JVMが保証）
  - シリアライゼーション安全
  - リフレクション攻撃に耐性
  - 実装が最もシンプル`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="singleton" />
      </div>
      <LessonNav lessons={lessons} currentId="singleton" basePath="/learn/design" />
    </div>
  );
}

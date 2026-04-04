import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

export default function LoggingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">デバッグ レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ロギング</h1>
        <p className="text-gray-400">SLF4J、LoggerFactory、ログレベル（DEBUG/INFO/WARN/ERROR）の使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ロギングの重要性</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          printlnデバッグと違い、ロギングフレームワークを使うと
          ログレベルの制御、ファイル出力、フォーマット指定などが可能です。
          <code className="text-orange-300">SLF4J</code>はJavaの標準的なロギングファサードです。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>TRACE</code> - 最も詳細な情報（通常は無効）</li>
          <li><code>DEBUG</code> - 開発時のデバッグ情報</li>
          <li><code>INFO</code> - 通常の処理情報</li>
          <li><code>WARN</code> - 警告（処理は続行可能）</li>
          <li><code>ERROR</code> - エラー（処理に問題が発生）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ログレベルの使い分け</h2>
        <p className="text-gray-400 mb-4">
          適切なログレベルを選ぶことで、本番環境では重要な情報だけを記録し、
          開発時には詳細な情報を確認できます。
        </p>
        <JavaEditor
          defaultCode={`import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Main {
    // 簡易Loggerの実装
    enum Level { DEBUG, INFO, WARN, ERROR }

    static Level currentLevel = Level.DEBUG;

    static void log(Level level, String message) {
        if (level.ordinal() >= currentLevel.ordinal()) {
            String time = "2026-04-02 10:30:00";
            System.out.println(time + " [" + level + "] " + message);
        }
    }

    static void debug(String msg) { log(Level.DEBUG, msg); }
    static void info(String msg) { log(Level.INFO, msg); }
    static void warn(String msg) { log(Level.WARN, msg); }
    static void error(String msg) { log(Level.ERROR, msg); }

    public static void main(String[] args) {
        System.out.println("=== DEBUGレベル（全て表示） ===");
        currentLevel = Level.DEBUG;
        debug("ユーザーデータを取得中...");
        info("ユーザー'Alice'がログインしました");
        warn("セッションがまもなく期限切れです");
        error("データベース接続に失敗しました");

        System.out.println();
        System.out.println("=== WARNレベル（WARN以上のみ） ===");
        currentLevel = Level.WARN;
        debug("この行は表示されない");
        info("この行も表示されない");
        warn("セッションがまもなく期限切れです");
        error("データベース接続に失敗しました");
    }
}`}
          expectedOutput={`=== DEBUGレベル（全て表示） ===
2026-04-02 10:30:00 [DEBUG] ユーザーデータを取得中...
2026-04-02 10:30:00 [INFO] ユーザー'Alice'がログインしました
2026-04-02 10:30:00 [WARN] セッションがまもなく期限切れです
2026-04-02 10:30:00 [ERROR] データベース接続に失敗しました

=== WARNレベル（WARN以上のみ） ===
2026-04-02 10:30:00 [WARN] セッションがまもなく期限切れです
2026-04-02 10:30:00 [ERROR] データベース接続に失敗しました`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">SLF4Jスタイルのロガー</h2>
        <p className="text-gray-400 mb-4">
          SLF4Jでは <code className="text-orange-300">LoggerFactory.getLogger()</code> でロガーを取得し、
          プレースホルダ <code className="text-orange-300">{"{}"}</code> で変数を埋め込みます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    // SLF4Jスタイルのロガーを模倣
    static class Logger {
        private String name;
        Logger(String name) { this.name = name; }

        void info(String pattern, Object... args) {
            String msg = format(pattern, args);
            System.out.println("[INFO] " + name + " - " + msg);
        }
        void error(String pattern, Object... args) {
            String msg = format(pattern, args);
            System.out.println("[ERROR] " + name + " - " + msg);
        }

        private String format(String pattern, Object... args) {
            String result = pattern;
            for (Object arg : args) {
                result = result.replaceFirst("\\{\\}", String.valueOf(arg));
            }
            return result;
        }
    }

    // LoggerFactory.getLogger(Main.class) 相当
    static final Logger logger = new Logger("Main");

    public static void main(String[] args) {
        String userId = "U001";
        String action = "ログイン";
        int responseTime = 150;

        // log.info("ユーザー{}が{}しました", userId, action);
        logger.info("ユーザー{}が{}しました", userId, action);
        logger.info("応答時間: {}ms", responseTime);

        try {
            int result = 10 / 0;
        } catch (Exception e) {
            // log.error("計算エラー: {}", e.getMessage());
            logger.error("計算エラー: {}", e.getMessage());
        }
    }
}`}
          expectedOutput={`[INFO] Main - ユーザーU001がログインしました
[INFO] Main - 応答時間: 150ms
[ERROR] Main - 計算エラー: / by zero`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="debug" lessonId="logging" />
      </div>
      <LessonNav lessons={lessons} currentId="logging" basePath="/learn/debug" />
    </div>
  );
}

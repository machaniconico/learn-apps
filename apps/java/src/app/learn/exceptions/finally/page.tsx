import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("exceptions");

export default function FinallyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">例外処理 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">finally</h1>
        <p className="text-gray-400">finallyブロックとtry-with-resources(AutoCloseable)の使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">finallyブロック</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">finally</code> ブロックは例外の有無にかかわらず必ず実行されます。
          リソースの解放（ファイルを閉じる、接続を切るなど）に使います。
          Java 7以降は <code className="text-orange-300">try-with-resources</code> が推奨です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>finally</code> は例外が発生してもしなくても実行される</li>
          <li>リソースのクリーンアップに使用する</li>
          <li><code>try-with-resources</code> は <code>AutoCloseable</code> を自動でclose</li>
          <li><code>try (Resource r = new Resource()) {"{ ... }"}</code> の構文</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">finallyの基本</h2>
        <p className="text-gray-400 mb-4">
          例外が発生しても、発生しなくても、finallyブロックは必ず実行されます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    static void divide(int a, int b) {
        try {
            System.out.println("計算開始: " + a + " / " + b);
            int result = a / b;
            System.out.println("結果: " + result);
        } catch (ArithmeticException e) {
            System.out.println("エラー: " + e.getMessage());
        } finally {
            System.out.println("finally: 計算処理終了");
        }
    }

    public static void main(String[] args) {
        divide(10, 2);   // 正常系
        System.out.println("---");
        divide(10, 0);   // 例外発生
    }
}`}
          expectedOutput={`計算開始: 10 / 2
結果: 5
finally: 計算処理終了
---
計算開始: 10 / 0
エラー: / by zero
finally: 計算処理終了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">リソース管理とfinally</h2>
        <p className="text-gray-400 mb-4">
          データベース接続やファイルハンドルなど、使い終わったら必ず閉じるリソースの管理に
          finallyを使います。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    // リソースを模擬するクラス
    static class DatabaseConnection {
        String name;
        DatabaseConnection(String name) {
            this.name = name;
            System.out.println("[DB] " + name + " を開きました");
        }
        String query(String sql) {
            if (sql.contains("ERROR")) throw new RuntimeException("SQLエラー");
            return "結果: 3件";
        }
        void close() {
            System.out.println("[DB] " + name + " を閉じました");
        }
    }

    static void executeQuery(String sql) {
        DatabaseConnection conn = null;
        try {
            conn = new DatabaseConnection("MyDB");
            String result = conn.query(sql);
            System.out.println(result);
        } catch (RuntimeException e) {
            System.out.println("エラー: " + e.getMessage());
        } finally {
            // 必ず接続を閉じる
            if (conn != null) {
                conn.close();
            }
        }
    }

    public static void main(String[] args) {
        executeQuery("SELECT * FROM users");
        System.out.println("---");
        executeQuery("ERROR query");
    }
}`}
          expectedOutput={`[DB] MyDB を開きました
結果: 3件
[DB] MyDB を閉じました
---
[DB] MyDB を開きました
エラー: SQLエラー
[DB] MyDB を閉じました`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">try-with-resources (Java 7+)</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">AutoCloseable</code> を実装したリソースは、
          <code className="text-orange-300">try-with-resources</code> で自動的にcloseされます。
          finallyでclose呼び出しを書く必要がなくなります。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    // AutoCloseableを実装したリソース
    static class MyResource implements AutoCloseable {
        String name;
        MyResource(String name) {
            this.name = name;
            System.out.println("[開始] " + name);
        }
        void use() {
            System.out.println("[使用] " + name);
        }
        @Override
        public void close() {
            System.out.println("[自動close] " + name);
        }
    }

    public static void main(String[] args) {
        // try-with-resources: 自動的にclose()が呼ばれる
        System.out.println("--- 単一リソース ---");
        try (MyResource r = new MyResource("リソースA")) {
            r.use();
        }

        // 複数リソースも管理できる
        System.out.println("--- 複数リソース ---");
        try (MyResource r1 = new MyResource("リソース1");
             MyResource r2 = new MyResource("リソース2")) {
            r1.use();
            r2.use();
        }
        // 逆順にcloseされる（r2 -> r1）
    }
}`}
          expectedOutput={`--- 単一リソース ---
[開始] リソースA
[使用] リソースA
[自動close] リソースA
--- 複数リソース ---
[開始] リソース1
[開始] リソース2
[使用] リソース1
[使用] リソース2
[自動close] リソース2
[自動close] リソース1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="exceptions" lessonId="finally" />
      </div>
      <LessonNav lessons={lessons} currentId="finally" basePath="/learn/exceptions" />
    </div>
  );
}

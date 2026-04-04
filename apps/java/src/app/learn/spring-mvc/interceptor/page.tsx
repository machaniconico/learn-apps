import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("spring-mvc");

export default function InterceptorPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">Spring MVC レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">インターセプタ</h1>
        <p className="text-gray-400">HandlerInterceptor、preHandle / postHandle / afterCompletion</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">HandlerInterceptorの仕組み</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">HandlerInterceptor</code> はコントローラの前後に処理を挟むための仕組みです。
          認証チェック・ログ記録・実行時間計測などの横断的関心事を共通化できます。
          Filterと異なり、Spring MVC のハンドラ情報にアクセスできます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>preHandle</code> - コントローラ実行前（falseを返すと処理中断）</li>
          <li><code>postHandle</code> - コントローラ実行後、ビューレンダリング前</li>
          <li><code>afterCompletion</code> - ビューレンダリング後（リソース解放など）</li>
          <li>WebMvcConfigurerで登録し、URLパターンで適用範囲を指定</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ログ記録インターセプタ</h2>
        <p className="text-gray-400 mb-4">
          リクエストの処理時間を計測し、ログに記録するインターセプタの実装例です。
          <code className="text-orange-300">preHandle</code> で開始時刻を記録し、
          <code className="text-orange-300">afterCompletion</code> で経過時間を計算します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {

    // HandlerInterceptor の擬似実装
    interface HandlerInterceptor {
        boolean preHandle(String url);
        void postHandle(String url, String viewName);
        void afterCompletion(String url, long elapsedMs);
    }

    static class LoggingInterceptor implements HandlerInterceptor {
        private long startTime;

        public boolean preHandle(String url) {
            startTime = System.currentTimeMillis();
            System.out.println("  [preHandle] " + url + " - 処理開始");
            return true; // true=続行, false=中断
        }

        public void postHandle(String url, String viewName) {
            System.out.println("  [postHandle] View: " + viewName);
        }

        public void afterCompletion(String url, long elapsedMs) {
            System.out.println("  [afterCompletion] 処理時間: " + elapsedMs + "ms");
        }
    }

    // リクエスト処理のシミュレーション
    static void processRequest(String url, HandlerInterceptor interceptor) {
        System.out.println("\\n=== " + url + " ===");

        // 1. preHandle
        if (!interceptor.preHandle(url)) {
            System.out.println("  -> 処理中断");
            return;
        }

        // 2. Controller 実行
        System.out.println("  [Controller] ビジネスロジック実行");
        String viewName = "page/result";

        // 3. postHandle
        interceptor.postHandle(url, viewName);

        // 4. View レンダリング
        System.out.println("  [View] テンプレートレンダリング");

        // 5. afterCompletion
        interceptor.afterCompletion(url, 45);
    }

    public static void main(String[] args) {
        System.out.println("=== HandlerInterceptor ===");
        LoggingInterceptor interceptor = new LoggingInterceptor();
        processRequest("GET /users", interceptor);
        processRequest("GET /products", interceptor);
    }
}`}
          expectedOutput={`=== HandlerInterceptor ===

=== GET /users ===
  [preHandle] GET /users - 処理開始
  [Controller] ビジネスロジック実行
  [postHandle] View: page/result
  [View] テンプレートレンダリング
  [afterCompletion] 処理時間: 45ms

=== GET /products ===
  [preHandle] GET /products - 処理開始
  [Controller] ビジネスロジック実行
  [postHandle] View: page/result
  [View] テンプレートレンダリング
  [afterCompletion] 処理時間: 45ms`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">認証チェックインターセプタ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">preHandle</code> で認証状態をチェックし、
          未認証の場合はログインページにリダイレクトするパターンです。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {

    // 認証チェックインターセプタ
    static class AuthInterceptor {
        private final Set<String> publicPaths = Set.of("/", "/login", "/register");
        private String loggedInUser = null;

        void login(String user) { loggedInUser = user; }
        void logout() { loggedInUser = null; }

        boolean preHandle(String url) {
            // 公開パスはスキップ
            if (publicPaths.contains(url)) {
                System.out.println("  [Auth] 公開パス -> スキップ");
                return true;
            }

            if (loggedInUser != null) {
                System.out.println("  [Auth] 認証済み: " + loggedInUser + " -> 許可");
                return true;
            } else {
                System.out.println("  [Auth] 未認証 -> redirect:/login");
                return false;  // 処理中断
            }
        }
    }

    static void tryAccess(String url, AuthInterceptor auth) {
        System.out.println("\\n" + url + ":");
        boolean allowed = auth.preHandle(url);
        if (allowed) {
            System.out.println("  [Controller] 正常にアクセス");
        }
    }

    public static void main(String[] args) {
        System.out.println("=== 認証インターセプタ ===");
        AuthInterceptor auth = new AuthInterceptor();

        tryAccess("/", auth);           // 公開
        tryAccess("/dashboard", auth);  // 未認証 -> リダイレクト

        System.out.println("\\n--- ログイン ---");
        auth.login("Alice");

        tryAccess("/dashboard", auth);  // 認証済み
        tryAccess("/settings", auth);   // 認証済み
    }
}`}
          expectedOutput={`=== 認証インターセプタ ===

/:
  [Auth] 公開パス -> スキップ
  [Controller] 正常にアクセス

/dashboard:
  [Auth] 未認証 -> redirect:/login

--- ログイン ---

/dashboard:
  [Auth] 認証済み: Alice -> 許可
  [Controller] 正常にアクセス

/settings:
  [Auth] 認証済み: Alice -> 許可
  [Controller] 正常にアクセス`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="spring-mvc" lessonId="interceptor" />
      </div>
      <LessonNav lessons={lessons} currentId="interceptor" basePath="/learn/spring-mvc" />
    </div>
  );
}

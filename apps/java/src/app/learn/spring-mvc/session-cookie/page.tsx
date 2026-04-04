import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("spring-mvc");

export default function SessionCookiePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">Spring MVC レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">セッション・Cookie</h1>
        <p className="text-gray-400">@SessionAttributes、HttpSession、@CookieValue</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">セッションとCookieの管理</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Webアプリケーションでは <code className="text-orange-300">HttpSession</code> でサーバー側にユーザー情報を保持し、
          <code className="text-orange-300">Cookie</code> でクライアント側にデータを保存します。
          Spring MVCでは <code className="text-orange-300">@SessionAttributes</code> や
          <code className="text-orange-300">@CookieValue</code> で簡潔に扱えます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>HttpSession</code> - サーバー側でユーザーごとのデータを管理</li>
          <li><code>@SessionAttributes</code> - Modelの特定属性をセッションに保存</li>
          <li><code>@CookieValue</code> - リクエストのCookieから値を取得</li>
          <li>セッションIDはCookie（JSESSIONID）で管理される</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">HttpSessionの使い方</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">HttpSession</code> を使って、ログイン情報やカート内容などを
          リクエストをまたいで保持するパターンを確認します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {

    // HttpSession の擬似実装
    static class HttpSession {
        private final Map<String, Object> attrs = new HashMap<>();
        private final String id = "SESS_" + UUID.randomUUID().toString().substring(0, 8);

        void setAttribute(String key, Object value) { attrs.put(key, value); }
        Object getAttribute(String key) { return attrs.get(key); }
        void invalidate() { attrs.clear(); }
        String getId() { return id; }
    }

    // @Controller
    static class LoginController {

        // @PostMapping("/login")
        static String login(String username, HttpSession session) {
            session.setAttribute("user", username);
            session.setAttribute("loginTime", "2026-04-02 10:30:00");
            return "redirect:/dashboard";
        }

        // @GetMapping("/dashboard")
        static void dashboard(HttpSession session) {
            String user = (String) session.getAttribute("user");
            String time = (String) session.getAttribute("loginTime");
            System.out.println("  ユーザー: " + user);
            System.out.println("  ログイン時刻: " + time);
            System.out.println("  セッションID: " + session.getId());
        }

        // @PostMapping("/logout")
        static String logout(HttpSession session) {
            session.invalidate();
            return "redirect:/login";
        }
    }

    public static void main(String[] args) {
        System.out.println("=== HttpSession ===");
        HttpSession session = new HttpSession();

        System.out.println("\\n1. POST /login:");
        String view = LoginController.login("Alice", session);
        System.out.println("  -> " + view);

        System.out.println("\\n2. GET /dashboard:");
        LoginController.dashboard(session);

        System.out.println("\\n3. POST /logout:");
        String logoutView = LoginController.logout(session);
        System.out.println("  セッション無効化");
        System.out.println("  -> " + logoutView);
    }
}`}
          expectedOutput={`=== HttpSession ===

1. POST /login:
  -> redirect:/dashboard

2. GET /dashboard:
  ユーザー: Alice
  ログイン時刻: 2026-04-02 10:30:00
  セッションID: SESS_xxxxxxxx

3. POST /logout:
  セッション無効化
  -> redirect:/login`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Cookieの読み書き</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">@CookieValue</code> でリクエストからCookieを取得し、
          <code className="text-orange-300">HttpServletResponse</code> でCookieを設定します。
          言語設定やテーマ設定などの保存に使います。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {

    // Cookie の擬似実装
    static class Cookie {
        String name, value;
        int maxAge = -1;
        String path = "/";

        Cookie(String name, String value) {
            this.name = name; this.value = value;
        }

        @Override
        public String toString() {
            return name + "=" + value +
                (maxAge > 0 ? "; Max-Age=" + maxAge : "") +
                "; Path=" + path;
        }
    }

    static Map<String, Cookie> browserCookies = new LinkedHashMap<>();

    // @GetMapping("/preferences")
    // getPrefs(@CookieValue(defaultValue = "ja") String lang,
    //          @CookieValue(defaultValue = "dark") String theme)
    static void getPreferences() {
        String lang = browserCookies.containsKey("lang") ?
            browserCookies.get("lang").value : "ja";
        String theme = browserCookies.containsKey("theme") ?
            browserCookies.get("theme").value : "dark";

        System.out.println("  言語: " + lang);
        System.out.println("  テーマ: " + theme);
    }

    // @PostMapping("/preferences")
    static void setPreferences(String lang, String theme) {
        Cookie langCookie = new Cookie("lang", lang);
        langCookie.maxAge = 86400 * 30; // 30日
        Cookie themeCookie = new Cookie("theme", theme);
        themeCookie.maxAge = 86400 * 30;

        browserCookies.put("lang", langCookie);
        browserCookies.put("theme", themeCookie);

        System.out.println("  Set-Cookie: " + langCookie);
        System.out.println("  Set-Cookie: " + themeCookie);
    }

    public static void main(String[] args) {
        System.out.println("=== Cookie の読み書き ===");

        System.out.println("\\n1. GET /preferences (Cookie未設定):");
        getPreferences();

        System.out.println("\\n2. POST /preferences (設定変更):");
        setPreferences("en", "light");

        System.out.println("\\n3. GET /preferences (Cookie設定済み):");
        getPreferences();
    }
}`}
          expectedOutput={`=== Cookie の読み書き ===

1. GET /preferences (Cookie未設定):
  言語: ja
  テーマ: dark

2. POST /preferences (設定変更):
  Set-Cookie: lang=en; Max-Age=2592000; Path=/
  Set-Cookie: theme=light; Max-Age=2592000; Path=/

3. GET /preferences (Cookie設定済み):
  言語: en
  テーマ: light`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="spring-mvc" lessonId="session-cookie" />
      </div>
      <LessonNav lessons={lessons} currentId="session-cookie" basePath="/learn/spring-mvc" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("spring-mvc");

export default function ArchitecturePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">Spring MVC レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">MVCアーキテクチャ</h1>
        <p className="text-gray-400">DispatcherServlet、HandlerMapping、ViewResolver</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Spring MVCの仕組み</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Spring MVCはリクエスト駆動のWebフレームワークです。
          <code className="text-orange-300">DispatcherServlet</code> がフロントコントローラとして全リクエストを受け取り、
          <code className="text-orange-300">HandlerMapping</code> で適切なコントローラを見つけ、
          <code className="text-orange-300">ViewResolver</code> でビューを解決してレスポンスを返します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>DispatcherServlet</code> - 全HTTPリクエストの入り口（フロントコントローラ）</li>
          <li><code>HandlerMapping</code> - URLに対応するコントローラメソッドを決定</li>
          <li><code>Controller</code> - ビジネスロジック実行、Modelにデータを追加</li>
          <li><code>ViewResolver</code> - ビュー名からテンプレートファイルを解決</li>
          <li><code>View</code> - テンプレート（Thymeleafなど）をレンダリング</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">リクエスト処理フロー</h2>
        <p className="text-gray-400 mb-4">
          HTTPリクエストがどのように処理されるか、Spring MVCの内部フローを確認します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {

    // リクエスト処理フローのシミュレーション
    static void processRequest(String method, String url) {
        System.out.println("\\n[" + method + " " + url + "]");

        // 1. DispatcherServlet がリクエストを受信
        System.out.println("1. DispatcherServlet: リクエスト受信");

        // 2. HandlerMapping でコントローラを決定
        String handler = resolveHandler(url);
        System.out.println("2. HandlerMapping: " + handler);

        // 3. Controller がビジネスロジックを実行
        Map<String, Object> model = executeHandler(handler);
        System.out.println("3. Controller: Model=" + model);

        // 4. ViewResolver でビュー名を解決
        String viewName = model.get("view").toString();
        String viewPath = resolveView(viewName);
        System.out.println("4. ViewResolver: " + viewName + " -> " + viewPath);

        // 5. View がレンダリング
        System.out.println("5. View: HTMLレンダリング完了 -> 200 OK");
    }

    static String resolveHandler(String url) {
        return switch (url) {
            case "/" -> "HomeController.index()";
            case "/users" -> "UserController.list()";
            case "/users/1" -> "UserController.detail(id=1)";
            default -> "404 Not Found";
        };
    }

    static Map<String, Object> executeHandler(String handler) {
        if (handler.contains("index")) {
            return Map.of("view", "home", "title", "ホーム");
        } else if (handler.contains("list")) {
            return Map.of("view", "users/list", "count", 3);
        } else {
            return Map.of("view", "users/detail", "user", "Alice");
        }
    }

    static String resolveView(String name) {
        return "templates/" + name + ".html";
    }

    public static void main(String[] args) {
        System.out.println("=== Spring MVC リクエスト処理フロー ===");
        processRequest("GET", "/");
        processRequest("GET", "/users");
        processRequest("GET", "/users/1");
    }
}`}
          expectedOutput={`=== Spring MVC リクエスト処理フロー ===

[GET /]
1. DispatcherServlet: リクエスト受信
2. HandlerMapping: HomeController.index()
3. Controller: Model={view=home, title=ホーム}
4. ViewResolver: home -> templates/home.html
5. View: HTMLレンダリング完了 -> 200 OK

[GET /users]
1. DispatcherServlet: リクエスト受信
2. HandlerMapping: UserController.list()
3. Controller: Model={view=users/list, count=3}
4. ViewResolver: users/list -> templates/users/list.html
5. View: HTMLレンダリング完了 -> 200 OK

[GET /users/1]
1. DispatcherServlet: リクエスト受信
2. HandlerMapping: UserController.detail(id=1)
3. Controller: Model={view=users/detail, user=Alice}
4. ViewResolver: users/detail -> templates/users/detail.html
5. View: HTMLレンダリング完了 -> 200 OK`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">MVCの各コンポーネント</h2>
        <p className="text-gray-400 mb-4">
          Model（データ）、View（表示）、Controller（制御）の3つの責務を分離することで、
          保守性の高いWebアプリケーションを構築できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {

    // Model - データを格納する入れ物
    static class Model {
        private final Map<String, Object> attributes = new LinkedHashMap<>();

        void addAttribute(String key, Object value) {
            attributes.put(key, value);
        }

        Object getAttribute(String key) {
            return attributes.get(key);
        }

        @Override
        public String toString() {
            return attributes.toString();
        }
    }

    // View - テンプレートのレンダリング
    static String renderView(String template, Model model) {
        return "[HTML] template=" + template + ", data=" + model;
    }

    // Controller
    // @Controller
    static class UserController {
        // @GetMapping("/users")
        static String listUsers(Model model) {
            List<String> users = List.of("Alice", "Bob", "Charlie");
            model.addAttribute("users", users);
            model.addAttribute("title", "ユーザー一覧");
            return "users/list";  // ビュー名を返す
        }
    }

    public static void main(String[] args) {
        System.out.println("=== MVC コンポーネント ===");

        // Controller がビジネスロジックを実行
        Model model = new Model();
        String viewName = UserController.listUsers(model);

        System.out.println("Controller の戻り値: " + viewName);
        System.out.println("Model の内容: " + model);

        // ViewResolver がビュー名を解決
        String templatePath = "templates/" + viewName + ".html";
        System.out.println("ViewResolver: " + templatePath);

        // View がレンダリング
        String html = renderView(templatePath, model);
        System.out.println("レンダリング結果: " + html);
    }
}`}
          expectedOutput={`=== MVC コンポーネント ===
Controller の戻り値: users/list
Model の内容: {users=[Alice, Bob, Charlie], title=ユーザー一覧}
ViewResolver: templates/users/list.html
レンダリング結果: [HTML] template=templates/users/list.html, data={users=[Alice, Bob, Charlie], title=ユーザー一覧}`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="spring-mvc" lessonId="architecture" />
      </div>
      <LessonNav lessons={lessons} currentId="architecture" basePath="/learn/spring-mvc" />
    </div>
  );
}

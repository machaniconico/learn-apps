import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("spring-mvc");

export default function ControllersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">Spring MVC レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コントローラ</h1>
        <p className="text-gray-400">@Controller、Model、ModelAndView</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">@Controllerの基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">@Controller</code> はビューテンプレートを返すWebコントローラを定義します。
          <code className="text-orange-300">Model</code> オブジェクトにデータを追加し、
          メソッドの戻り値としてビュー名（テンプレート名）を返します。
          <code className="text-orange-300">ModelAndView</code> を使えば、モデルとビューをまとめて返すこともできます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>@Controller</code> - ビュー名を返すコントローラ（@RestControllerとの違い）</li>
          <li><code>Model</code> - ビューに渡すデータを格納するオブジェクト</li>
          <li><code>ModelAndView</code> - モデルとビュー名を一つのオブジェクトで返す</li>
          <li>戻り値の文字列がViewResolverで解決される</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">@ControllerとModelの使い方</h2>
        <p className="text-gray-400 mb-4">
          コントローラメソッドで <code className="text-orange-300">Model</code> にデータを設定し、
          テンプレートに渡す基本パターンを確認します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {

    // Model の擬似実装
    static class Model {
        private final Map<String, Object> attrs = new LinkedHashMap<>();
        void addAttribute(String key, Object value) { attrs.put(key, value); }
        Map<String, Object> getAttributes() { return attrs; }
    }

    record User(int id, String name, String email) {}

    static List<User> users = List.of(
        new User(1, "Alice", "alice@example.com"),
        new User(2, "Bob", "bob@example.com"),
        new User(3, "Charlie", "charlie@example.com")
    );

    // @Controller
    // @RequestMapping("/users")
    static class UserController {

        // @GetMapping
        static String list(Model model) {
            model.addAttribute("users", users);
            model.addAttribute("title", "ユーザー一覧");
            return "users/list";  // ビュー名
        }

        // @GetMapping("/{id}")
        static String detail(int id, Model model) {
            User user = users.stream()
                .filter(u -> u.id() == id).findFirst().orElse(null);
            model.addAttribute("user", user);
            model.addAttribute("title", "ユーザー詳細");
            return "users/detail";
        }
    }

    public static void main(String[] args) {
        System.out.println("=== @Controller + Model ===");

        Model model1 = new Model();
        String view1 = UserController.list(model1);
        System.out.println("\\nGET /users:");
        System.out.println("  View: " + view1);
        System.out.println("  Model: " + model1.getAttributes());

        Model model2 = new Model();
        String view2 = UserController.detail(2, model2);
        System.out.println("\\nGET /users/2:");
        System.out.println("  View: " + view2);
        System.out.println("  Model: " + model2.getAttributes());
    }
}`}
          expectedOutput={`=== @Controller + Model ===

GET /users:
  View: users/list
  Model: {users=[User[id=1, name=Alice, email=alice@example.com], User[id=2, name=Bob, email=bob@example.com], User[id=3, name=Charlie, email=charlie@example.com]], title=ユーザー一覧}

GET /users/2:
  View: users/detail
  Model: {user=User[id=2, name=Bob, email=bob@example.com], title=ユーザー詳細}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ModelAndViewの使い方</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">ModelAndView</code> を使うと、ビュー名とモデルデータを
          一つのオブジェクトにまとめて返せます。リダイレクトやフォワードも指定できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {

    // ModelAndView の擬似実装
    static class ModelAndView {
        String viewName;
        Map<String, Object> model = new LinkedHashMap<>();

        ModelAndView(String viewName) { this.viewName = viewName; }
        void addObject(String key, Object value) { model.put(key, value); }

        @Override
        public String toString() {
            return "ModelAndView{view=" + viewName + ", model=" + model + "}";
        }
    }

    record Product(String name, int price) {}

    // @Controller
    static class ProductController {

        // @GetMapping("/products")
        static ModelAndView list() {
            ModelAndView mav = new ModelAndView("products/list");
            mav.addObject("products", List.of(
                new Product("ノートPC", 120000),
                new Product("マウス", 3500)
            ));
            mav.addObject("count", 2);
            return mav;
        }

        // @PostMapping("/products")
        static ModelAndView create(String name, int price) {
            System.out.println("  商品作成: " + name);
            // リダイレクト
            return new ModelAndView("redirect:/products");
        }
    }

    public static void main(String[] args) {
        System.out.println("=== ModelAndView ===");

        System.out.println("\\nGET /products:");
        ModelAndView mav = ProductController.list();
        System.out.println("  " + mav);

        System.out.println("\\nPOST /products:");
        ModelAndView redirect = ProductController.create("キーボード", 8000);
        System.out.println("  View: " + redirect.viewName);
        System.out.println("  -> ブラウザがGET /productsにリダイレクト");
    }
}`}
          expectedOutput={`=== ModelAndView ===

GET /products:
  ModelAndView{view=products/list, model={products=[Product[name=ノートPC, price=120000], Product[name=マウス, price=3500]], count=2}}

POST /products:
  商品作成: キーボード
  View: redirect:/products
  -> ブラウザがGET /productsにリダイレクト`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="spring-mvc" lessonId="controllers" />
      </div>
      <LessonNav lessons={lessons} currentId="controllers" basePath="/learn/spring-mvc" />
    </div>
  );
}

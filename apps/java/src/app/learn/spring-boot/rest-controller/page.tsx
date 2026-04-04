import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("spring-boot");

export default function RestControllerPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">Spring Boot レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">RESTコントローラ</h1>
        <p className="text-gray-400">@RestController、@RequestBody、@ResponseBody</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">RESTコントローラの基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">@RestController</code> は REST API を構築するための専用アノテーションです。
          <code className="text-orange-300">@Controller</code> + <code className="text-orange-300">@ResponseBody</code> を
          組み合わせたもので、メソッドの戻り値が自動的にJSON形式でHTTPレスポンスに変換されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>@RestController</code> = @Controller + @ResponseBody</li>
          <li><code>@RequestBody</code> - リクエストのJSONをJavaオブジェクトに変換</li>
          <li><code>@ResponseBody</code> - 戻り値をHTTPレスポンスボディに変換</li>
          <li>Jackson ライブラリが自動でJSON変換を行う</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">REST APIの作成</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">@RestController</code> でCRUD操作を提供するREST APIを構築します。
          各メソッドはJSON形式のレスポンスを返します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

// @RestController
// @RequestMapping("/api/products")
public class Main {

    record Product(int id, String name, int price) {}

    static List<Product> products = new ArrayList<>(List.of(
        new Product(1, "ノートPC", 120000),
        new Product(2, "マウス", 3500),
        new Product(3, "キーボード", 8000)
    ));

    // @GetMapping - 全件取得
    static List<Product> getAll() {
        return products;
    }

    // @GetMapping("/{id}") - 1件取得
    static Product getById(int id) {
        return products.stream()
            .filter(p -> p.id() == id)
            .findFirst()
            .orElse(null);
    }

    // @PostMapping + @RequestBody - 新規作成
    static Product create(Product product) {
        products.add(product);
        return product;
    }

    public static void main(String[] args) {
        System.out.println("=== REST API レスポンス ===");

        System.out.println("\\nGET /api/products:");
        getAll().forEach(p ->
            System.out.println("  " + p));

        System.out.println("\\nGET /api/products/2:");
        System.out.println("  " + getById(2));

        Product newProduct = new Product(4, "モニター", 45000);
        System.out.println("\\nPOST /api/products:");
        System.out.println("  Created: " + create(newProduct));

        System.out.println("\\n全商品数: " + products.size());
    }
}`}
          expectedOutput={`=== REST API レスポンス ===

GET /api/products:
  Product[id=1, name=ノートPC, price=120000]
  Product[id=2, name=マウス, price=3500]
  Product[id=3, name=キーボード, price=8000]

GET /api/products/2:
  Product[id=2, name=マウス, price=3500]

POST /api/products:
  Created: Product[id=4, name=モニター, price=45000]

全商品数: 4`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ResponseEntityによるレスポンス制御</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">ResponseEntity</code> を使うと、HTTPステータスコードやヘッダーを
          明示的に制御できます。404 Not Found や 201 Created などを適切に返せます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {

    record User(int id, String name, String email) {}

    static Map<Integer, User> users = new HashMap<>(Map.of(
        1, new User(1, "Alice", "alice@example.com"),
        2, new User(2, "Bob", "bob@example.com")
    ));

    // ResponseEntity を返すコントローラメソッドの擬似実装
    static void getUser(int id) {
        User user = users.get(id);
        if (user != null) {
            // ResponseEntity.ok(user)
            System.out.println("  Status: 200 OK");
            System.out.println("  Body: " + user);
        } else {
            // ResponseEntity.notFound().build()
            System.out.println("  Status: 404 Not Found");
        }
    }

    static void createUser(User user) {
        users.put(user.id(), user);
        // ResponseEntity.status(HttpStatus.CREATED).body(user)
        System.out.println("  Status: 201 Created");
        System.out.println("  Body: " + user);
    }

    static void deleteUser(int id) {
        if (users.remove(id) != null) {
            // ResponseEntity.noContent().build()
            System.out.println("  Status: 204 No Content");
        } else {
            System.out.println("  Status: 404 Not Found");
        }
    }

    public static void main(String[] args) {
        System.out.println("=== ResponseEntity によるレスポンス制御 ===");

        System.out.println("\\nGET /api/users/1:");
        getUser(1);

        System.out.println("\\nGET /api/users/99:");
        getUser(99);

        System.out.println("\\nPOST /api/users:");
        createUser(new User(3, "Charlie", "charlie@example.com"));

        System.out.println("\\nDELETE /api/users/2:");
        deleteUser(2);
    }
}`}
          expectedOutput={`=== ResponseEntity によるレスポンス制御 ===

GET /api/users/1:
  Status: 200 OK
  Body: User[id=1, name=Alice, email=alice@example.com]

GET /api/users/99:
  Status: 404 Not Found

POST /api/users:
  Status: 201 Created
  Body: User[id=3, name=Charlie, email=charlie@example.com]

DELETE /api/users/2:
  Status: 204 No Content`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="spring-boot" lessonId="rest-controller" />
      </div>
      <LessonNav lessons={lessons} currentId="rest-controller" basePath="/learn/spring-boot" />
    </div>
  );
}

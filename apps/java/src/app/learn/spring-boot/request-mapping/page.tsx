import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("spring-boot");

export default function RequestMappingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">Spring Boot レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">リクエストマッピング</h1>
        <p className="text-gray-400">@GetMapping、@PostMapping、@PutMapping、@DeleteMapping、@PathVariable、@RequestParam</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">HTTPメソッドマッピング</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Spring Bootでは <code className="text-orange-300">@RequestMapping</code> の省略形として、
          HTTPメソッドごとの専用アノテーションが用意されています。
          <code className="text-orange-300">@PathVariable</code> でURLパスの変数を、
          <code className="text-orange-300">@RequestParam</code> でクエリパラメータを受け取れます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>@GetMapping</code> - リソースの取得（READ）</li>
          <li><code>@PostMapping</code> - リソースの作成（CREATE）</li>
          <li><code>@PutMapping</code> - リソースの更新（UPDATE）</li>
          <li><code>@DeleteMapping</code> - リソースの削除（DELETE）</li>
          <li><code>@PathVariable</code> - URLパスパラメータ（例: /users/{'{'}id{'}'}）</li>
          <li><code>@RequestParam</code> - クエリパラメータ（例: ?name=Alice）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">CRUD操作のマッピング</h2>
        <p className="text-gray-400 mb-4">
          REST APIの基本的なCRUD操作を各HTTPメソッドにマッピングします。
          <code className="text-orange-300">@PathVariable</code> でURLからIDを取得します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

// @RestController
// @RequestMapping("/api/books")
public class Main {

    record Book(int id, String title, String author, int price) {}

    static Map<Integer, Book> books = new LinkedHashMap<>(Map.of(
        1, new Book(1, "Java入門", "田中太郎", 2800),
        2, new Book(2, "Spring Boot実践", "鈴木花子", 3500)
    ));
    static int nextId = 3;

    // @GetMapping
    static void getAll() {
        System.out.println("GET /api/books -> " + books.values());
    }

    // @GetMapping("/{id}") + @PathVariable
    static void getById(int id) {
        Book book = books.get(id);
        System.out.println("GET /api/books/" + id + " -> " +
            (book != null ? book : "404 Not Found"));
    }

    // @PostMapping + @RequestBody
    static void create(String title, String author, int price) {
        Book book = new Book(nextId++, title, author, price);
        books.put(book.id(), book);
        System.out.println("POST /api/books -> 201 Created: " + book);
    }

    // @PutMapping("/{id}") + @PathVariable + @RequestBody
    static void update(int id, String title, String author, int price) {
        Book updated = new Book(id, title, author, price);
        books.put(id, updated);
        System.out.println("PUT /api/books/" + id + " -> " + updated);
    }

    // @DeleteMapping("/{id}") + @PathVariable
    static void delete(int id) {
        books.remove(id);
        System.out.println("DELETE /api/books/" + id + " -> 204 No Content");
    }

    public static void main(String[] args) {
        System.out.println("=== CRUD マッピング ===");
        getAll();
        getById(1);
        create("Docker入門", "佐藤一郎", 3200);
        update(1, "Java入門 改訂版", "田中太郎", 3000);
        delete(2);
        System.out.println("\\n最終状態:");
        getAll();
    }
}`}
          expectedOutput={`=== CRUD マッピング ===
GET /api/books -> [Book[id=1, title=Java入門, author=田中太郎, price=2800], Book[id=2, title=Spring Boot実践, author=鈴木花子, price=3500]]
GET /api/books/1 -> Book[id=1, title=Java入門, author=田中太郎, price=2800]
POST /api/books -> 201 Created: Book[id=3, title=Docker入門, author=佐藤一郎, price=3200]
PUT /api/books/1 -> Book[id=1, title=Java入門 改訂版, author=田中太郎, price=3000]
DELETE /api/books/2 -> 204 No Content

最終状態:
GET /api/books -> [Book[id=1, title=Java入門 改訂版, author=田中太郎, price=3000], Book[id=3, title=Docker入門, author=佐藤一郎, price=3200]]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">@RequestParamによるクエリパラメータ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">@RequestParam</code> を使うと、URLのクエリパラメータ（?key=value）を
          メソッドの引数で受け取れます。デフォルト値やオプション指定も可能です。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;
import java.util.stream.*;

public class Main {

    record Product(int id, String name, String category, int price) {}

    static List<Product> products = List.of(
        new Product(1, "ノートPC", "electronics", 120000),
        new Product(2, "マウス", "electronics", 3500),
        new Product(3, "Java本", "books", 2800),
        new Product(4, "Spring本", "books", 3500),
        new Product(5, "デスク", "furniture", 25000)
    );

    // @GetMapping("/search")
    // search(@RequestParam String category,
    //        @RequestParam(defaultValue = "0") int minPrice,
    //        @RequestParam(required = false) String keyword)
    static List<Product> search(String category, int minPrice, String keyword) {
        return products.stream()
            .filter(p -> category == null || p.category().equals(category))
            .filter(p -> p.price() >= minPrice)
            .filter(p -> keyword == null || p.name().contains(keyword))
            .collect(Collectors.toList());
    }

    public static void main(String[] args) {
        System.out.println("=== @RequestParam 検索 ===");

        System.out.println("\\nGET /search?category=electronics");
        search("electronics", 0, null).forEach(p ->
            System.out.println("  " + p));

        System.out.println("\\nGET /search?category=books&minPrice=3000");
        search("books", 3000, null).forEach(p ->
            System.out.println("  " + p));

        System.out.println("\\nGET /search?minPrice=10000");
        search(null, 10000, null).forEach(p ->
            System.out.println("  " + p));
    }
}`}
          expectedOutput={`=== @RequestParam 検索 ===

GET /search?category=electronics
  Product[id=1, name=ノートPC, category=electronics, price=120000]
  Product[id=2, name=マウス, category=electronics, price=3500]

GET /search?category=books&minPrice=3000
  Product[id=4, name=Spring本, category=books, price=3500]

GET /search?minPrice=10000
  Product[id=1, name=ノートPC, category=electronics, price=120000]
  Product[id=5, name=デスク, category=furniture, price=25000]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="spring-boot" lessonId="request-mapping" />
      </div>
      <LessonNav lessons={lessons} currentId="request-mapping" basePath="/learn/spring-boot" />
    </div>
  );
}

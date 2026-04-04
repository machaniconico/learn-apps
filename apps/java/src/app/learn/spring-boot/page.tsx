import { JavaEditor } from "@/components/java-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("spring-boot");

const quizQuestions: QuizQuestion[] = [
  {
    question: "@SpringBootApplicationアノテーションに含まれるものはどれですか？",
    options: [
      "@Component・@Service・@Repository",
      "@Configuration・@EnableAutoConfiguration・@ComponentScan",
      "@RestController・@GetMapping・@PostMapping",
      "@Entity・@Table・@Column",
    ],
    answer: 1,
    explanation: "@SpringBootApplicationは @Configuration、@EnableAutoConfiguration、@ComponentScan の3つを組み合わせたメタアノテーションです。",
  },
  {
    question: "@RestControllerと@Controllerの違いは何ですか？",
    options: [
      "機能は全く同じ",
      "@RestControllerは@Controller + @ResponseBodyの組み合わせ",
      "@ControllerはREST API専用である",
      "@RestControllerはビューを返す",
    ],
    answer: 1,
    explanation: "@RestControllerは @Controller と @ResponseBody を組み合わせたアノテーションで、メソッドの戻り値が直接HTTPレスポンスボディとして返されます。",
  },
  {
    question: "@Autowiredの役割はどれですか？",
    options: [
      "データベースに自動接続する",
      "依存オブジェクトを自動的に注入（DI）する",
      "トランザクションを自動管理する",
      "テストを自動実行する",
    ],
    answer: 1,
    explanation: "@AutowiredはSpringのDIコンテナが管理するBeanを自動的にフィールドやコンストラクタに注入します。コンストラクタインジェクションが推奨されます。",
  },
  {
    question: "@GetMappingと同等の書き方はどれですか？",
    options: [
      "@Mapping(method = GET)",
      "@RequestMapping(method = RequestMethod.GET)",
      "@HttpGet",
      "@Route(GET)",
    ],
    answer: 1,
    explanation: "@GetMappingは @RequestMapping(method = RequestMethod.GET) のショートカットです。同様に@PostMapping、@PutMapping、@DeleteMappingがあります。",
  },
];

export default function SpringBootPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-green-400 mb-2">Spring Boot</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Spring Bootを使ったWebアプリケーション開発を学びましょう。RESTコントローラ・依存性注入（DI）・設定管理・バリデーションなど、実践的なSpring Boot開発のスキルを身につけます。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="spring-boot" totalLessons={8} color="green" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/spring-boot" color="green" categoryId="spring-boot" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">RESTコントローラの作成</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">@RestController</code> と
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">@GetMapping</code> を使って
          REST APIを作成します。JSONレスポンスが自動的に返されます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

// Spring Boot REST Controller の例
// @RestController
// @RequestMapping("/api/users")
public class Main {

    // 擬似的にコントローラの動作を再現
    record User(int id, String name, String email) {}

    static List<User> users = List.of(
        new User(1, "Alice", "alice@example.com"),
        new User(2, "Bob", "bob@example.com"),
        new User(3, "Charlie", "charlie@example.com")
    );

    // @GetMapping
    static List<User> getAllUsers() {
        return users;
    }

    // @GetMapping("/{id}")
    static Optional<User> getUserById(int id) {
        return users.stream()
            .filter(u -> u.id() == id)
            .findFirst();
    }

    public static void main(String[] args) {
        System.out.println("=== GET /api/users ===");
        getAllUsers().forEach(u ->
            System.out.println("  " + u));

        System.out.println("=== GET /api/users/2 ===");
        getUserById(2).ifPresent(u ->
            System.out.println("  " + u));

        System.out.println("=== GET /api/users/99 ===");
        getUserById(99).ifPresentOrElse(
            u -> System.out.println("  " + u),
            () -> System.out.println("  404 Not Found")
        );
    }
}`}
          expectedOutput={`=== GET /api/users ===
  User[id=1, name=Alice, email=alice@example.com]
  User[id=2, name=Bob, email=bob@example.com]
  User[id=3, name=Charlie, email=charlie@example.com]
=== GET /api/users/2 ===
  User[id=2, name=Bob, email=bob@example.com]
=== GET /api/users/99 ===
  404 Not Found`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">依存性注入（DI）のパターン</h2>
        <p className="text-gray-400 mb-4">
          Spring Bootの <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">@Autowired</code> による
          依存性注入のパターンを学びます。コンストラクタインジェクションが推奨されます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

// DI パターンの擬似実装
public class Main {

    // インターフェース（サービス層）
    interface GreetingService {
        String greet(String name);
    }

    // 実装クラス（@Service に相当）
    static class JapaneseGreeting implements GreetingService {
        public String greet(String name) {
            return "こんにちは、" + name + "さん！";
        }
    }

    // コントローラ（コンストラクタインジェクション推奨）
    static class GreetingController {
        private final GreetingService service;

        // @Autowired (コンストラクタが1つなら省略可能)
        GreetingController(GreetingService service) {
            this.service = service;
        }

        String handleGreet(String name) {
            return service.greet(name);
        }
    }

    public static void main(String[] args) {
        // Spring DIコンテナが自動で行う処理を手動で再現
        GreetingService service = new JapaneseGreeting();
        GreetingController controller = new GreetingController(service);

        System.out.println(controller.handleGreet("Alice"));
        System.out.println(controller.handleGreet("Bob"));
        System.out.println("DIにより疎結合を実現");
    }
}`}
          expectedOutput={`こんにちは、Aliceさん！
こんにちは、Bobさん！
DIにより疎結合を実現`}
        />
      </section>

      <Quiz questions={quizQuestions} color="green" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("spring-boot");

export default function AnnotationsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">Spring Boot レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">アノテーション</h1>
        <p className="text-gray-400">@Component、@Service、@Repository、@Controller、@Autowired</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Springのステレオタイプアノテーション</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Springではクラスの役割に応じたアノテーションを付けることで、DIコンテナに自動登録（Bean登録）されます。
          <code className="text-orange-300">@Component</code> が基本で、用途別に
          <code className="text-orange-300">@Service</code>、<code className="text-orange-300">@Repository</code>、
          <code className="text-orange-300">@Controller</code> が用意されています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>@Component</code> - 汎用的なSpring管理Bean</li>
          <li><code>@Service</code> - ビジネスロジック層（意味的な区別）</li>
          <li><code>@Repository</code> - データアクセス層（例外変換機能あり）</li>
          <li><code>@Controller / @RestController</code> - Webリクエスト処理層</li>
          <li><code>@Autowired</code> - 依存オブジェクトの自動注入</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ステレオタイプアノテーションの使い分け</h2>
        <p className="text-gray-400 mb-4">
          各レイヤーに適切なアノテーションを付けることで、コードの意図が明確になり、
          Spring固有の機能（例外変換など）も活用できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

// Spring ステレオタイプアノテーションの擬似実装
public class Main {

    // @Repository - データアクセス層
    static class UserRepository {
        private final Map<Integer, String> db = new HashMap<>(Map.of(
            1, "Alice", 2, "Bob", 3, "Charlie"
        ));

        List<String> findAll() {
            return new ArrayList<>(db.values());
        }

        Optional<String> findById(int id) {
            return Optional.ofNullable(db.get(id));
        }
    }

    // @Service - ビジネスロジック層
    static class UserService {
        private final UserRepository repository;

        // @Autowired (コンストラクタインジェクション)
        UserService(UserRepository repository) {
            this.repository = repository;
        }

        List<String> getAllUsers() {
            return repository.findAll();
        }

        String getUserById(int id) {
            return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        }
    }

    // @RestController - Web層
    static class UserController {
        private final UserService service;

        UserController(UserService service) {
            this.service = service;
        }

        void handleGetAll() {
            System.out.println("GET /api/users -> " + service.getAllUsers());
        }

        void handleGetById(int id) {
            System.out.println("GET /api/users/" + id + " -> " + service.getUserById(id));
        }
    }

    public static void main(String[] args) {
        // DIコンテナの動作を手動で再現
        UserRepository repo = new UserRepository();       // @Repository
        UserService service = new UserService(repo);      // @Service
        UserController controller = new UserController(service); // @RestController

        System.out.println("=== レイヤードアーキテクチャ ===");
        controller.handleGetAll();
        controller.handleGetById(1);
    }
}`}
          expectedOutput={`=== レイヤードアーキテクチャ ===
GET /api/users -> [Alice, Bob, Charlie]
GET /api/users/1 -> Alice`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">@Componentと派生アノテーション</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">@Component</code> はすべてのステレオタイプアノテーションの親です。
          <code className="text-orange-300">@Service</code> や <code className="text-orange-300">@Repository</code> は
          @Component のメタアノテーションを持つ特殊化されたバージョンです。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {

    // アノテーションの階層を表現
    static Map<String, Map<String, String>> annotations = new LinkedHashMap<>();
    static {
        annotations.put("@Component", Map.of(
            "用途", "汎用的なSpring管理Bean",
            "特徴", "コンポーネントスキャンで自動検出"
        ));
        annotations.put("@Service", Map.of(
            "用途", "ビジネスロジック層",
            "特徴", "@Componentの特殊化（意味的な区別）"
        ));
        annotations.put("@Repository", Map.of(
            "用途", "データアクセス層",
            "特徴", "データアクセス例外を自動変換"
        ));
        annotations.put("@Controller", Map.of(
            "用途", "MVCコントローラ（ビュー返却）",
            "特徴", "ビュー名をViewResolverが解決"
        ));
        annotations.put("@RestController", Map.of(
            "用途", "REST APIコントローラ",
            "特徴", "@Controller + @ResponseBody"
        ));
    }

    public static void main(String[] args) {
        System.out.println("=== Springステレオタイプアノテーション ===\\n");
        annotations.forEach((name, info) -> {
            System.out.println(name);
            info.forEach((k, v) ->
                System.out.println("  " + k + ": " + v));
            System.out.println();
        });
    }
}`}
          expectedOutput={`=== Springステレオタイプアノテーション ===

@Component
  用途: 汎用的なSpring管理Bean
  特徴: コンポーネントスキャンで自動検出

@Service
  用途: ビジネスロジック層
  特徴: @Componentの特殊化（意味的な区別）

@Repository
  用途: データアクセス層
  特徴: データアクセス例外を自動変換

@Controller
  用途: MVCコントローラ（ビュー返却）
  特徴: ビュー名をViewResolverが解決

@RestController
  用途: REST APIコントローラ
  特徴: @Controller + @ResponseBody`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="spring-boot" lessonId="annotations" />
      </div>
      <LessonNav lessons={lessons} currentId="annotations" basePath="/learn/spring-boot" />
    </div>
  );
}

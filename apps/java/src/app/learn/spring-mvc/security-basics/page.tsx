import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("spring-mvc");

export default function SecurityBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">Spring MVC レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">セキュリティ基礎</h1>
        <p className="text-gray-400">Spring Security、UserDetailsService、BCryptPasswordEncoder</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Spring Securityの基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Spring Securityは認証（Authentication）と認可（Authorization）を提供するフレームワークです。
          <code className="text-orange-300">UserDetailsService</code> でユーザー情報を読み込み、
          <code className="text-orange-300">BCryptPasswordEncoder</code> でパスワードを安全にハッシュ化します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>SecurityFilterChain</code> - セキュリティ設定のBean定義</li>
          <li><code>UserDetailsService</code> - ユーザー情報の読み込みインターフェース</li>
          <li><code>BCryptPasswordEncoder</code> - パスワードのハッシュ化・照合</li>
          <li><code>@PreAuthorize</code> / <code>@Secured</code> - メソッドレベル認可</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">認証と認可の仕組み</h2>
        <p className="text-gray-400 mb-4">
          ユーザーの認証（ログイン）と認可（権限チェック）のフローを確認します。
          パスワードは <code className="text-orange-300">BCrypt</code> でハッシュ化して保存します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {

    // BCryptPasswordEncoder の擬似実装
    static class PasswordEncoder {
        String encode(String raw) {
            return "$2a$10$" + raw.hashCode(); // 擬似ハッシュ
        }
        boolean matches(String raw, String encoded) {
            return encoded.equals(encode(raw));
        }
    }

    record UserDetails(String username, String encodedPassword, Set<String> roles) {}

    // UserDetailsService の擬似実装
    static class UserService {
        private final Map<String, UserDetails> users = new HashMap<>();
        private final PasswordEncoder encoder = new PasswordEncoder();

        void register(String username, String rawPassword, String... roles) {
            String encoded = encoder.encode(rawPassword);
            users.put(username, new UserDetails(username, encoded, Set.of(roles)));
        }

        boolean authenticate(String username, String rawPassword) {
            UserDetails user = users.get(username);
            if (user == null) return false;
            return encoder.matches(rawPassword, user.encodedPassword());
        }

        boolean authorize(String username, String requiredRole) {
            UserDetails user = users.get(username);
            return user != null && user.roles().contains(requiredRole);
        }
    }

    public static void main(String[] args) {
        System.out.println("=== Spring Security 認証・認可 ===");
        UserService service = new UserService();

        // ユーザー登録
        service.register("alice", "password123", "USER");
        service.register("admin", "admin456", "USER", "ADMIN");

        // 認証テスト
        System.out.println("\\n[認証]");
        System.out.println("alice/password123: " +
            (service.authenticate("alice", "password123") ? "成功" : "失敗"));
        System.out.println("alice/wrong: " +
            (service.authenticate("alice", "wrong") ? "成功" : "失敗"));

        // 認可テスト
        System.out.println("\\n[認可]");
        System.out.println("alice -> USER: " +
            (service.authorize("alice", "USER") ? "許可" : "拒否"));
        System.out.println("alice -> ADMIN: " +
            (service.authorize("alice", "ADMIN") ? "許可" : "拒否"));
        System.out.println("admin -> ADMIN: " +
            (service.authorize("admin", "ADMIN") ? "許可" : "拒否"));
    }
}`}
          expectedOutput={`=== Spring Security 認証・認可 ===

[認証]
alice/password123: 成功
alice/wrong: 失敗

[認可]
alice -> USER: 許可
alice -> ADMIN: 拒否
admin -> ADMIN: 許可`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">SecurityFilterChainの設定</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">SecurityFilterChain</code> Bean でURLパターンごとの
          アクセス制御を設定します。フォームログインやCSRF保護も設定できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {

    // SecurityFilterChain の設定を擬似的に表現
    static class SecurityConfig {
        record Rule(String pattern, String access) {}

        List<Rule> rules = new ArrayList<>();
        boolean formLogin = false;
        boolean csrf = true;

        SecurityConfig authorizeRequest(String pattern, String access) {
            rules.add(new Rule(pattern, access));
            return this;
        }

        SecurityConfig formLogin() { formLogin = true; return this; }
        SecurityConfig csrfDisable() { csrf = false; return this; }

        void printConfig() {
            System.out.println("SecurityFilterChain 設定:");
            System.out.println("  URLアクセス制御:");
            rules.forEach(r ->
                System.out.println("    " + r.pattern() + " -> " + r.access()));
            System.out.println("  フォームログイン: " + (formLogin ? "有効" : "無効"));
            System.out.println("  CSRF保護: " + (csrf ? "有効" : "無効"));
        }

        // アクセスチェック
        String checkAccess(String url, String role) {
            for (Rule rule : rules) {
                if (url.startsWith(rule.pattern().replace("/**", ""))) {
                    if (rule.access().equals("permitAll")) return "許可";
                    if (rule.access().equals("ADMIN") && !role.equals("ADMIN")) return "403 Forbidden";
                    return "許可";
                }
            }
            return "認証必要";
        }
    }

    public static void main(String[] args) {
        System.out.println("=== SecurityFilterChain ===\\n");

        SecurityConfig config = new SecurityConfig()
            .authorizeRequest("/", "permitAll")
            .authorizeRequest("/login", "permitAll")
            .authorizeRequest("/api/public/**", "permitAll")
            .authorizeRequest("/admin/**", "ADMIN")
            .authorizeRequest("/**", "authenticated")
            .formLogin();

        config.printConfig();

        System.out.println("\\nアクセスチェック:");
        Map<String, String> tests = new LinkedHashMap<>();
        tests.put("/", "USER");
        tests.put("/dashboard", "USER");
        tests.put("/admin/users", "USER");
        tests.put("/admin/users", "ADMIN");

        tests.forEach((url, role) ->
            System.out.println("  " + url + " (role=" + role + ") -> " +
                config.checkAccess(url, role)));
    }
}`}
          expectedOutput={`=== SecurityFilterChain ===

SecurityFilterChain 設定:
  URLアクセス制御:
    / -> permitAll
    /login -> permitAll
    /api/public/** -> permitAll
    /admin/** -> ADMIN
    /** -> authenticated
  フォームログイン: 有効
  CSRF保護: 有効

アクセスチェック:
  / (role=USER) -> 許可
  /dashboard (role=USER) -> 許可
  /admin/users (role=USER) -> 403 Forbidden
  /admin/users (role=ADMIN) -> 許可`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="spring-mvc" lessonId="security-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="security-basics" basePath="/learn/spring-mvc" />
    </div>
  );
}

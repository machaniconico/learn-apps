import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("spring-mvc");

export default function FormHandlingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">Spring MVC レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">フォーム処理</h1>
        <p className="text-gray-400">th:object、th:field、@ModelAttribute</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">フォームデータのバインディング</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Spring MVCでは <code className="text-orange-300">@ModelAttribute</code> を使って
          フォームのデータをJavaオブジェクトに自動バインドします。
          Thymeleafの <code className="text-orange-300">th:object</code> と
          <code className="text-orange-300">th:field</code> でフォームとオブジェクトを紐づけます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>@ModelAttribute</code> - フォームデータをオブジェクトにバインド</li>
          <li><code>th:object</code> - フォーム全体にバインドするオブジェクトを指定</li>
          <li><code>th:field="*{'{'}name{'}'}"</code> - 個々のフィールドをバインド</li>
          <li>GETで空フォーム表示、POSTでデータ受け取り・処理</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">フォームの表示と送信</h2>
        <p className="text-gray-400 mb-4">
          GETリクエストで空のフォームを表示し、POSTリクエストで送信データを受け取るパターンです。
          <code className="text-orange-300">@ModelAttribute</code> で自動バインドされます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {

    // フォーム用DTO
    static class UserForm {
        String name = "";
        String email = "";
        int age = 0;

        UserForm() {}
        UserForm(String name, String email, int age) {
            this.name = name; this.email = email; this.age = age;
        }

        @Override
        public String toString() {
            return "UserForm{name=" + name + ", email=" + email + ", age=" + age + "}";
        }
    }

    // @Controller
    static class UserController {

        // @GetMapping("/users/new") - フォーム表示
        static String showForm() {
            UserForm form = new UserForm(); // 空のフォームオブジェクト
            System.out.println("  Model: userForm=" + form);
            return "users/form";  // テンプレート名
        }

        // @PostMapping("/users") - フォーム送信処理
        // createUser(@ModelAttribute UserForm form)
        static String createUser(UserForm form) {
            System.out.println("  受信データ: " + form);
            System.out.println("  DB保存完了");
            return "redirect:/users";
        }
    }

    public static void main(String[] args) {
        System.out.println("=== フォーム処理フロー ===");

        // 1. GET - フォーム表示
        System.out.println("\\n1. GET /users/new (フォーム表示):");
        String view = UserController.showForm();
        System.out.println("  View: " + view);

        // 2. POST - データ送信
        System.out.println("\\n2. POST /users (フォーム送信):");
        UserForm submitted = new UserForm("田中太郎", "taro@example.com", 25);
        String redirect = UserController.createUser(submitted);
        System.out.println("  View: " + redirect);
    }
}`}
          expectedOutput={`=== フォーム処理フロー ===

1. GET /users/new (フォーム表示):
  Model: userForm=UserForm{name=, email=, age=0}
  View: users/form

2. POST /users (フォーム送信):
  受信データ: UserForm{name=田中太郎, email=taro@example.com, age=25}
  DB保存完了
  View: redirect:/users`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">フォームバリデーションとエラー表示</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">@Valid</code> と <code className="text-orange-300">BindingResult</code> を
          組み合わせて、フォーム入力のバリデーションとエラーメッセージの表示を行います。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {

    static class RegistrationForm {
        String username;
        String email;
        String password;

        RegistrationForm(String u, String e, String p) {
            username = u; email = e; password = p;
        }
    }

    // BindingResult の擬似実装
    static class BindingResult {
        Map<String, String> fieldErrors = new LinkedHashMap<>();

        void addError(String field, String message) {
            fieldErrors.put(field, message);
        }

        boolean hasErrors() { return !fieldErrors.isEmpty(); }
    }

    static BindingResult validate(RegistrationForm form) {
        BindingResult result = new BindingResult();

        if (form.username == null || form.username.length() < 3) {
            result.addError("username", "ユーザー名は3文字以上");
        }
        if (form.email == null || !form.email.contains("@")) {
            result.addError("email", "有効なメールアドレスを入力");
        }
        if (form.password == null || form.password.length() < 8) {
            result.addError("password", "パスワードは8文字以上");
        }
        return result;
    }

    // @PostMapping("/register")
    static String register(RegistrationForm form) {
        BindingResult result = validate(form);

        if (result.hasErrors()) {
            System.out.println("  バリデーションエラー:");
            result.fieldErrors.forEach((field, msg) ->
                System.out.println("    " + field + ": " + msg));
            return "register";  // フォーム再表示
        }
        System.out.println("  登録成功: " + form.username);
        return "redirect:/login";
    }

    public static void main(String[] args) {
        System.out.println("=== フォームバリデーション ===");

        System.out.println("\\n[無効な入力]");
        System.out.println("POST /register (ab, bad, 123):");
        String v1 = register(new RegistrationForm("ab", "bad", "123"));
        System.out.println("  View: " + v1 + " (フォーム再表示)");

        System.out.println("\\n[有効な入力]");
        System.out.println("POST /register (alice, alice@mail.com, password123):");
        String v2 = register(new RegistrationForm("alice", "alice@mail.com", "password123"));
        System.out.println("  View: " + v2);
    }
}`}
          expectedOutput={`=== フォームバリデーション ===

[無効な入力]
POST /register (ab, bad, 123):
  バリデーションエラー:
    username: ユーザー名は3文字以上
    email: 有効なメールアドレスを入力
    password: パスワードは8文字以上
  View: register (フォーム再表示)

[有効な入力]
POST /register (alice, alice@mail.com, password123):
  登録成功: alice
  View: redirect:/login`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="spring-mvc" lessonId="form-handling" />
      </div>
      <LessonNav lessons={lessons} currentId="form-handling" basePath="/learn/spring-mvc" />
    </div>
  );
}

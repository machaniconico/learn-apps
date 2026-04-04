import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("spring-boot");

export default function ValidationPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">Spring Boot レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">バリデーション</h1>
        <p className="text-gray-400">@Valid、@NotNull、@Size、@Email、@Min/@Max、BindingResult</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Bean Validationの基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Spring BootではBean Validation（Jakarta Validation）を使って入力値を検証します。
          DTOクラスのフィールドにバリデーションアノテーションを付け、
          コントローラの引数に <code className="text-orange-300">@Valid</code> を付けると自動検証されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>@NotNull</code> - nullを許可しない</li>
          <li><code>@NotBlank</code> - null・空文字・空白のみを許可しない</li>
          <li><code>@Size(min=2, max=50)</code> - 文字列長やコレクションサイズ</li>
          <li><code>@Email</code> - メールアドレス形式の検証</li>
          <li><code>@Min(0) / @Max(100)</code> - 数値の範囲制限</li>
          <li><code>BindingResult</code> - バリデーションエラーの詳細を取得</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">バリデーションアノテーションの使用</h2>
        <p className="text-gray-400 mb-4">
          DTOクラスにバリデーションルールを定義し、入力データを自動検証する仕組みを確認します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;
import java.util.regex.*;

public class Main {

    // バリデーションルールを擬似的に実装
    static List<String> validate(String name, String email, int age) {
        List<String> errors = new ArrayList<>();

        // @NotBlank
        if (name == null || name.isBlank()) {
            errors.add("name: 名前は必須です");
        }
        // @Size(min=2, max=20)
        if (name != null && (name.length() < 2 || name.length() > 20)) {
            errors.add("name: 2〜20文字で入力してください");
        }
        // @Email
        if (email == null || !email.matches("^[\\\\w.-]+@[\\\\w.-]+\\\\.[a-zA-Z]{2,}$")) {
            errors.add("email: 有効なメールアドレスを入力してください");
        }
        // @Min(0) @Max(150)
        if (age < 0 || age > 150) {
            errors.add("age: 0〜150の範囲で入力してください");
        }

        return errors;
    }

    public static void main(String[] args) {
        System.out.println("=== Bean Validation ===");

        // 正常なデータ
        System.out.println("\\n[有効なデータ]");
        System.out.println("name=太郎, email=taro@example.com, age=25");
        List<String> errors1 = validate("太郎", "taro@example.com", 25);
        System.out.println("結果: " + (errors1.isEmpty() ? "OK" : errors1));

        // 不正なデータ
        System.out.println("\\n[無効なデータ]");
        System.out.println("name=, email=invalid, age=-5");
        List<String> errors2 = validate("", "invalid", -5);
        System.out.println("エラー:");
        errors2.forEach(e -> System.out.println("  - " + e));
    }
}`}
          expectedOutput={`=== Bean Validation ===

[有効なデータ]
name=太郎, email=taro@example.com, age=25
結果: OK

[無効なデータ]
name=, email=invalid, age=-5
エラー:
  - name: 名前は必須です
  - name: 2〜20文字で入力してください
  - email: 有効なメールアドレスを入力してください
  - age: 0〜150の範囲で入力してください`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">BindingResultでエラーハンドリング</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">BindingResult</code> を使うと、バリデーションエラーの詳細を取得して
          カスタムレスポンスを返せます。APIではエラー情報をJSON形式で返すのが一般的です。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {

    record FieldError(String field, String message) {}
    record ValidationResponse(boolean valid, List<FieldError> errors) {}

    // @PostMapping("/api/users")
    // createUser(@Valid @RequestBody UserDto dto, BindingResult result)
    static ValidationResponse createUser(String name, String email, Integer age) {
        List<FieldError> errors = new ArrayList<>();

        if (name == null || name.isBlank()) {
            errors.add(new FieldError("name", "名前は必須です"));
        }
        if (email == null || !email.contains("@")) {
            errors.add(new FieldError("email", "有効なメールアドレスを入力"));
        }
        if (age == null) {
            errors.add(new FieldError("age", "年齢は必須です"));
        } else if (age < 0 || age > 150) {
            errors.add(new FieldError("age", "0〜150の範囲で入力"));
        }

        return new ValidationResponse(errors.isEmpty(), errors);
    }

    public static void main(String[] args) {
        System.out.println("=== BindingResult エラーレスポンス ===");

        System.out.println("\\nPOST /api/users (無効なデータ):");
        System.out.println("Request: {name: null, email: bad, age: -1}");
        var result = createUser(null, "bad", -1);
        System.out.println("\\nResponse (400 Bad Request):");
        System.out.println("  valid: " + result.valid());
        result.errors().forEach(e ->
            System.out.println("  " + e.field() + ": " + e.message()));

        System.out.println("\\nPOST /api/users (有効なデータ):");
        System.out.println("Request: {name: Alice, email: alice@mail.com, age: 25}");
        var ok = createUser("Alice", "alice@mail.com", 25);
        System.out.println("Response (201 Created):");
        System.out.println("  valid: " + ok.valid());
    }
}`}
          expectedOutput={`=== BindingResult エラーレスポンス ===

POST /api/users (無効なデータ):
Request: {name: null, email: bad, age: -1}

Response (400 Bad Request):
  valid: false
  name: 名前は必須です
  email: 有効なメールアドレスを入力
  age: 0〜150の範囲で入力

POST /api/users (有効なデータ):
Request: {name: Alice, email: alice@mail.com, age: 25}
Response (201 Created):
  valid: true`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="spring-boot" lessonId="validation" />
      </div>
      <LessonNav lessons={lessons} currentId="validation" basePath="/learn/spring-boot" />
    </div>
  );
}

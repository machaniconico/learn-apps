import { JavaEditor } from "@/components/java-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("spring-mvc");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Spring MVCのリクエスト処理フローで正しい順番はどれですか？",
    options: [
      "View → Controller → Model → DispatcherServlet",
      "DispatcherServlet → Controller → Model → View",
      "Controller → DispatcherServlet → View → Model",
      "Model → View → Controller → DispatcherServlet",
    ],
    answer: 1,
    explanation: "DispatcherServletがリクエストを受け取り、適切なControllerにルーティングし、ControllerがModelにデータをセットし、ViewがHTMLをレンダリングします。",
  },
  {
    question: "@Controllerと@RestControllerの違いは何ですか？",
    options: [
      "@Controllerは古い書き方で非推奨",
      "@ControllerはビューNameを返し、@RestControllerはデータを直接返す",
      "@RestControllerはHTMLページ用である",
      "機能に違いはない",
    ],
    answer: 1,
    explanation: "@ControllerはビューName（テンプレート名）を返してHTMLページをレンダリングします。@RestControllerはJSONなどのデータを直接HTTPレスポンスとして返します。",
  },
  {
    question: "Thymeleafテンプレートで変数を表示する構文はどれですか？",
    options: [
      "${variable}",
      "{{variable}}",
      "th:text=\"${variable}\"",
      "<%= variable %>",
    ],
    answer: 2,
    explanation: "Thymeleafでは th:text=\"${variable}\" の形式でモデルの値を表示します。th: プレフィックスを付けたHTML属性で動的な値をバインドします。",
  },
  {
    question: "Spring MVCでフォームデータを受け取る方法として正しいものはどれですか？",
    options: [
      "@FormData アノテーションを使う",
      "@ModelAttribute でフォームオブジェクトにバインドする",
      "request.getParameter() のみ",
      "@FormBody でJSONとして受け取る",
    ],
    answer: 1,
    explanation: "@ModelAttributeはフォームのフィールドをJavaオブジェクトのプロパティに自動バインドします。@RequestParamで個別パラメータも取得できます。",
  },
];

export default function SpringMvcPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">Spring MVC</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Spring MVCによるWebアプリケーション開発を学びましょう。MVC（Model-View-Controller）アーキテクチャ・Thymeleafテンプレート・フォーム処理・セッション管理など、画面ありのWeb開発スキルを習得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="spring-mvc" totalLessons={8} color="teal" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/spring-mvc" color="teal" categoryId="spring-mvc" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Controllerとビューの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">@Controller</code> はビューName（テンプレート名）を返し、
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">Model</code> にデータをセットして
          テンプレートエンジンでHTMLを生成します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

// Spring MVC Controller の擬似実装
public class Main {

    // Model（データを格納するマップ）
    static class Model {
        private Map<String, Object> attrs = new LinkedHashMap<>();
        void addAttribute(String key, Object value) { attrs.put(key, value); }
        Map<String, Object> getAttributes() { return attrs; }
    }

    // @Controller
    static class UserController {

        // @GetMapping("/users")
        static String listUsers(Model model) {
            List<String> users = List.of("Alice", "Bob", "Charlie");
            model.addAttribute("users", users);
            model.addAttribute("title", "ユーザー一覧");
            return "users/list";  // ビューName → templates/users/list.html
        }

        // @GetMapping("/users/{id}")
        static String userDetail(int id, Model model) {
            model.addAttribute("name", "Alice");
            model.addAttribute("email", "alice@example.com");
            return "users/detail";  // ビューName
        }
    }

    public static void main(String[] args) {
        // リスト画面
        Model model1 = new Model();
        String view1 = UserController.listUsers(model1);
        System.out.println("View: " + view1);
        System.out.println("Model: " + model1.getAttributes());

        // 詳細画面
        Model model2 = new Model();
        String view2 = UserController.userDetail(1, model2);
        System.out.println("View: " + view2);
        System.out.println("Model: " + model2.getAttributes());
    }
}`}
          expectedOutput={`View: users/list
Model: {users=[Alice, Bob, Charlie], title=ユーザー一覧}
View: users/detail
Model: {name=Alice, email=alice@example.com}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">フォーム処理とバリデーション</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">@ModelAttribute</code> でフォームデータをオブジェクトにバインドし、
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">@Valid</code> でバリデーションを実行します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

// フォーム処理の擬似実装
public class Main {

    // フォームオブジェクト（@ModelAttribute用）
    static class UserForm {
        String name;
        String email;
        List<String> errors = new ArrayList<>();

        boolean validate() {
            if (name == null || name.isBlank())
                errors.add("名前は必須です");
            if (email == null || !email.contains("@"))
                errors.add("有効なメールアドレスを入力してください");
            return errors.isEmpty();
        }
    }

    // @PostMapping("/users/register")
    static String register(UserForm form) {
        if (!form.validate()) {
            System.out.println("バリデーションエラー: " + form.errors);
            return "users/form";  // フォームに戻る
        }
        System.out.println("登録成功: " + form.name + " (" + form.email + ")");
        return "redirect:/users";  // リダイレクト
    }

    public static void main(String[] args) {
        // 正常なフォーム送信
        UserForm form1 = new UserForm();
        form1.name = "Alice";
        form1.email = "alice@example.com";
        String result1 = register(form1);
        System.out.println("遷移先: " + result1);

        System.out.println("---");

        // バリデーションエラー
        UserForm form2 = new UserForm();
        form2.name = "";
        form2.email = "invalid";
        String result2 = register(form2);
        System.out.println("遷移先: " + result2);
    }
}`}
          expectedOutput={`登録成功: Alice (alice@example.com)
遷移先: redirect:/users
---
バリデーションエラー: [名前は必須です, 有効なメールアドレスを入力してください]
遷移先: users/form`}
        />
      </section>

      <Quiz questions={quizQuestions} color="teal" />
    </div>
  );
}

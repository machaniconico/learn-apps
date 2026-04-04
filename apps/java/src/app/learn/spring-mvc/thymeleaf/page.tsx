import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("spring-mvc");

export default function ThymeleafPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">Spring MVC レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Thymeleaf</h1>
        <p className="text-gray-400">th:text、th:each、th:if、th:href</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Thymeleafテンプレートエンジン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Thymeleafは Spring Boot で最も一般的に使われるテンプレートエンジンです。
          HTMLに <code className="text-orange-300">th:</code> 属性を追加するだけで動的コンテンツを生成でき、
          ブラウザでそのまま静的HTMLとしても表示できる「ナチュラルテンプレート」が特徴です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>th:text</code> - テキストコンテンツを動的に設定</li>
          <li><code>th:each</code> - コレクションをループ処理</li>
          <li><code>th:if / th:unless</code> - 条件付き表示</li>
          <li><code>th:href</code> - URLを動的に生成</li>
          <li><code>${'{'}...{'}'}</code> - 変数式（Modelの属性を参照）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Thymeleafの基本構文</h2>
        <p className="text-gray-400 mb-4">
          Thymeleafの主要な属性と式の使い方を確認します。
          コントローラでModelに設定したデータがテンプレートで利用できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {

    // Thymeleaf テンプレートのレンダリングを擬似的に再現
    static void renderTemplate(Map<String, Object> model) {
        String title = (String) model.get("title");
        String username = (String) model.get("username");
        @SuppressWarnings("unchecked")
        List<String> items = (List<String>) model.get("items");
        boolean isAdmin = (boolean) model.get("isAdmin");

        System.out.println("<!-- Thymeleaf レンダリング結果 -->");
        System.out.println("<html>");

        // th:text - テキスト置換
        System.out.println("  <title>" + title + "</title>");

        System.out.println("  <body>");
        // th:text + 変数式
        System.out.println("    <h1>ようこそ、" + username + "さん</h1>");

        // th:if - 条件付き表示
        if (isAdmin) {
            System.out.println("    <span class=\\"badge\\">管理者</span>");
        }

        // th:each - ループ
        System.out.println("    <ul>");
        for (String item : items) {
            System.out.println("      <li>" + item + "</li>");
        }
        System.out.println("    </ul>");

        // th:href - URL生成
        System.out.println("    <a href=\\"/users/" + username + "\\">" + username + "のプロフィール</a>");

        System.out.println("  </body>");
        System.out.println("</html>");
    }

    public static void main(String[] args) {
        System.out.println("=== Thymeleaf テンプレート ===\\n");

        Map<String, Object> model = new LinkedHashMap<>();
        model.put("title", "ダッシュボード");
        model.put("username", "Alice");
        model.put("items", List.of("Java", "Spring", "Thymeleaf"));
        model.put("isAdmin", true);

        renderTemplate(model);
    }
}`}
          expectedOutput={`=== Thymeleaf テンプレート ===

<!-- Thymeleaf レンダリング結果 -->
<html>
  <title>ダッシュボード</title>
  <body>
    <h1>ようこそ、Aliceさん</h1>
    <span class="badge">管理者</span>
    <ul>
      <li>Java</li>
      <li>Spring</li>
      <li>Thymeleaf</li>
    </ul>
    <a href="/users/Alice">Aliceのプロフィール</a>
  </body>
</html>`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テーブル表示とth:each</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">th:each</code> を使ったテーブルデータの表示パターンです。
          ループ変数のステータス情報（index、count、even/odd）も活用できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {

    record Employee(int id, String name, String dept, int salary) {}

    static void renderTable(List<Employee> employees) {
        System.out.println("<!-- th:each でテーブル生成 -->");
        System.out.println("<table>");
        System.out.println("  <tr><th>#</th><th>名前</th><th>部署</th><th>給与</th></tr>");

        int index = 0;
        for (Employee emp : employees) {
            // th:each="emp, status : ${'$'}{employees}"
            String rowClass = (index % 2 == 0) ? "even" : "odd";
            System.out.printf("  <tr class=\\"%s\\"><td>%d</td><td>%s</td><td>%s</td><td>%,d円</td></tr>%n",
                rowClass, index + 1, emp.name(), emp.dept(), emp.salary());
            index++;
        }

        System.out.println("</table>");

        // th:if で条件分岐
        System.out.println();
        if (employees.isEmpty()) {
            // th:if="${'$'}{#lists.isEmpty(employees)}"
            System.out.println("<p>従業員データがありません</p>");
        } else {
            // th:unless="${'$'}{#lists.isEmpty(employees)}"
            System.out.println("<p>全" + employees.size() + "名</p>");
        }
    }

    public static void main(String[] args) {
        System.out.println("=== th:each テーブル表示 ===\\n");

        List<Employee> employees = List.of(
            new Employee(1, "田中太郎", "開発", 450000),
            new Employee(2, "鈴木花子", "営業", 380000),
            new Employee(3, "佐藤一郎", "人事", 420000)
        );

        renderTable(employees);
    }
}`}
          expectedOutput={`=== th:each テーブル表示 ===

<!-- th:each でテーブル生成 -->
<table>
  <tr><th>#</th><th>名前</th><th>部署</th><th>給与</th></tr>
  <tr class="even"><td>1</td><td>田中太郎</td><td>開発</td><td>450,000円</td></tr>
  <tr class="odd"><td>2</td><td>鈴木花子</td><td>営業</td><td>380,000円</td></tr>
  <tr class="even"><td>3</td><td>佐藤一郎</td><td>人事</td><td>420,000円</td></tr>
</table>

<p>全3名</p>`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="spring-mvc" lessonId="thymeleaf" />
      </div>
      <LessonNav lessons={lessons} currentId="thymeleaf" basePath="/learn/spring-mvc" />
    </div>
  );
}

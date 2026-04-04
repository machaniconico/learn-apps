import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

const quizQuestions: QuizQuestion[] = [
  {
    question: "@Overrideアノテーションの主な目的は何ですか？",
    options: [
      "コンパイラにメソッドのオーバーライドを明示し、タイポや誤ったシグネチャを検出させる",
      "メソッドを非推奨にする",
      "メソッドをfinalにする",
      "メソッドをstaticにする",
    ],
    answer: 0,
    explanation: "@Overrideを付けることで、コンパイラはそのメソッドが親クラスまたはインターフェースのメソッドを正しくオーバーライドしていることを検証します。メソッド名のタイポや引数の間違いをコンパイル時に検出できます。",
  },
  {
    question: "カスタムアノテーションを定義する正しい構文はどれですか？",
    options: [
      "@interface MyAnnotation { }",
      "annotation MyAnnotation { }",
      "interface @MyAnnotation { }",
      "custom @MyAnnotation { }",
    ],
    answer: 0,
    explanation: "Javaでカスタムアノテーションを定義するには @interface キーワードを使います。通常のinterfaceとは異なり、@を接頭辞に付けます。",
  },
  {
    question: "@Retention(RetentionPolicy.RUNTIME) の意味として正しいものはどれですか？",
    options: [
      "アノテーション情報が実行時（JVM上）まで保持され、リフレクションで取得できる",
      "アノテーションはソースコードのみに存在し、コンパイル後に削除される",
      "アノテーションはクラスファイルに保存されるが、実行時には利用できない",
      "アノテーションは永続的にディスクに保存される",
    ],
    answer: 0,
    explanation: "RetentionPolicy.RUNTIMEを指定すると、アノテーション情報がJVMの実行時まで保持されます。これにより、リフレクションAPIを使って実行時にアノテーション情報を取得・処理できます。",
  },
  {
    question: "@Target(ElementType.METHOD) の意味として正しいものはどれですか？",
    options: [
      "そのアノテーションはメソッドにのみ適用できる",
      "そのアノテーションはクラスにのみ適用できる",
      "そのアノテーションはフィールドにのみ適用できる",
      "そのアノテーションはどこにでも適用できる",
    ],
    answer: 0,
    explanation: "@Target(ElementType.METHOD)を指定することで、そのカスタムアノテーションはメソッドにのみ付与できるようになります。クラスやフィールドに付けようとするとコンパイルエラーになります。",
  },
];

export default function AnnotationsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">エコシステム レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">アノテーション</h1>
        <p className="text-gray-400">標準アノテーション、カスタムアノテーション定義、メタアノテーション、リフレクションによる処理</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Javaアノテーションとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          アノテーション（Annotation）はJavaコードにメタデータを付加する仕組みです。
          コンパイラへの指示、ツールへの情報提供、フレームワークの設定など様々な用途で使われます。
          <code className="text-orange-300">@</code> 記号で始まり、クラス・メソッド・フィールド・引数などに付与できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>標準アノテーション: @Override, @Deprecated, @SuppressWarnings, @FunctionalInterface</li>
          <li>カスタムアノテーション: @interface で独自アノテーションを定義</li>
          <li>メタアノテーション: @Retention, @Target, @Documented でアノテーション自体を修飾</li>
          <li>リフレクション: 実行時にアノテーション情報を取得して処理</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">標準アノテーション</h2>
        <p className="text-gray-400 mb-4">
          Javaが提供する組み込みアノテーションです。コンパイラへの指示や警告制御に使います。
        </p>
        <JavaEditor
          defaultCode={`// @Deprecated: 非推奨であることを示す
class OldApi {
    @Deprecated
    public static String oldMethod() {
        return "旧メソッド（非推奨）";
    }

    public static String newMethod() {
        return "新メソッド（推奨）";
    }
}

// @FunctionalInterface: 関数型インターフェースであることを保証
@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);
    // メソッドを2つ以上定義するとコンパイルエラーになる
}

// @SuppressWarnings: 特定の警告を抑制
class SuppressExample {
    @SuppressWarnings("unchecked")
    public static void showWarnings() {
        java.util.List list = new java.util.ArrayList(); // raw type
        list.add("警告を抑制している");
        System.out.println(list.get(0));
    }
}

// @Override: オーバーライドを明示
class Animal {
    public String sound() { return "..."; }
}

class Dog extends Animal {
    @Override
    public String sound() { return "ワン！"; }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("=== 標準アノテーション ===");

        // @Deprecated のメソッドは使えるが警告が出る
        System.out.println(OldApi.oldMethod());
        System.out.println(OldApi.newMethod());

        // @FunctionalInterface: ラムダで実装可能
        Calculator add = (a, b) -> a + b;
        Calculator mul = (a, b) -> a * b;
        System.out.println("足し算: " + add.calculate(10, 5));
        System.out.println("掛け算: " + mul.calculate(10, 5));

        // @Override
        Animal dog = new Dog();
        System.out.println("犬の鳴き声: " + dog.sound());

        // @SuppressWarnings
        SuppressExample.showWarnings();
    }
}`}
          expectedOutput={`=== 標準アノテーション ===
旧メソッド（非推奨）
新メソッド（推奨）
足し算: 15
掛け算: 50
犬の鳴き声: ワン！
警告を抑制している`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カスタムアノテーションの定義</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">@interface</code> キーワードで独自アノテーションを定義できます。
          要素（メソッド形式）を持たせることで値を受け取ることができます。
        </p>
        <JavaEditor
          defaultCode={`import java.lang.annotation.*;

// 値なしアノテーション
@interface ReadOnly {}

// 単一の値を持つアノテーション（value()は省略可能）
@interface Version {
    String value();
}

// 複数の値を持つアノテーション
@interface Author {
    String name();
    String date() default "未指定";  // defaultで初期値を設定
    int revision() default 1;
}

// enum値を持つアノテーション
enum Priority { LOW, MEDIUM, HIGH }

@interface Task {
    String description();
    Priority priority() default Priority.MEDIUM;
}

// アノテーションの利用例
@Version("2.0")
@Author(name = "田中太郎", date = "2024-01-15", revision = 3)
class MyService {

    @ReadOnly
    private String config = "設定値";

    @Task(description = "ユーザー認証", priority = Priority.HIGH)
    public void authenticate() {
        System.out.println("認証処理");
    }

    @Task(description = "レポート生成")  // priority はデフォルト（MEDIUM）
    public void generateReport() {
        System.out.println("レポート生成");
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("=== カスタムアノテーション ===");
        System.out.println();
        System.out.println("アノテーション定義のルール:");
        System.out.println("  - @interface キーワードで定義する");
        System.out.println("  - 要素はメソッド形式で宣言（引数なし、例外なし）");
        System.out.println("  - default で初期値を設定できる");
        System.out.println("  - value() という名前の要素は省略して書ける");
        System.out.println("  - 使用可能な型: プリミティブ型、String、Class、enum、アノテーション、これらの配列");
        System.out.println();
        System.out.println("使用例:");
        System.out.println("  @Version(\\"2.0\\")                    // value() は省略可");
        System.out.println("  @Author(name = \\"田中太郎\\", date = \\"2024-01-15\\", revision = 3)");
        System.out.println("  @Task(description = \\"認証\\", priority = Priority.HIGH)");

        MyService svc = new MyService();
        svc.authenticate();
        svc.generateReport();
    }
}`}
          expectedOutput={`=== カスタムアノテーション ===

アノテーション定義のルール:
  - @interface キーワードで定義する
  - 要素はメソッド形式で宣言（引数なし、例外なし）
  - default で初期値を設定できる
  - value() という名前の要素は省略して書ける
  - 使用可能な型: プリミティブ型、String、Class、enum、アノテーション、これらの配列

使用例:
  @Version("2.0")                    // value() は省略可
  @Author(name = "田中太郎", date = "2024-01-15", revision = 3)
  @Task(description = "認証", priority = Priority.HIGH)
認証処理
レポート生成`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">メタアノテーション</h2>
        <p className="text-gray-400 mb-4">
          メタアノテーションはアノテーション自体に付けるアノテーションです。
          <code className="text-orange-300">@Retention</code>（保持期間）と
          <code className="text-orange-300">@Target</code>（適用対象）が最もよく使われます。
        </p>
        <JavaEditor
          defaultCode={`import java.lang.annotation.*;

// @Retention: アノテーション情報の保持期間を指定
// RetentionPolicy.SOURCE  → ソースのみ（コンパイル後に削除）
// RetentionPolicy.CLASS   → クラスファイルに保存（実行時は不可）
// RetentionPolicy.RUNTIME → 実行時まで保持（リフレクションで取得可能）

// @Target: アノテーションを付けられる場所を制限
// ElementType.TYPE        → クラス、インターフェース、enum
// ElementType.METHOD      → メソッド
// ElementType.FIELD       → フィールド
// ElementType.PARAMETER   → メソッド引数
// ElementType.CONSTRUCTOR → コンストラクタ

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE, ElementType.METHOD})
@interface LogExecution {
    String level() default "INFO";
}

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@interface Validate {
    int minLength() default 0;
    int maxLength() default Integer.MAX_VALUE;
    boolean required() default true;
}

// @Documented: Javadocにアノテーション情報を含める
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@interface ApiVersion {
    String value();
}

@LogExecution(level = "DEBUG")
@ApiVersion("v2")
class UserService {

    @Validate(minLength = 3, maxLength = 50, required = true)
    private String username;

    @Validate(minLength = 8, required = true)
    private String password;

    UserService(String username, String password) {
        this.username = username;
        this.password = password;
    }

    @LogExecution
    public String getUsername() { return username; }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("=== メタアノテーション ===");
        System.out.println();
        System.out.println("@Retention の種類:");
        System.out.println("  SOURCE  → コンパイル時のみ（@SuppressWarnings など）");
        System.out.println("  CLASS   → クラスファイルまで（バイトコード解析ツール向け）");
        System.out.println("  RUNTIME → 実行時まで（フレームワーク、リフレクション向け）");
        System.out.println();
        System.out.println("@Target の主な対象:");
        System.out.println("  TYPE        → クラス・インターフェース・enum");
        System.out.println("  METHOD      → メソッド");
        System.out.println("  FIELD       → フィールド");
        System.out.println("  PARAMETER   → メソッド引数");
        System.out.println("  CONSTRUCTOR → コンストラクタ");
        System.out.println();
        System.out.println("@Documented:");
        System.out.println("  Javadocにアノテーション情報を含める");
        System.out.println();
        System.out.println("UserService に適用されたアノテーション:");
        System.out.println("  @LogExecution(level = \\"DEBUG\\")");
        System.out.println("  @ApiVersion(\\"v2\\")");
        System.out.println("  getUsername() → @LogExecution(level = \\"INFO\\")  // default値");
    }
}`}
          expectedOutput={`=== メタアノテーション ===

@Retention の種類:
  SOURCE  → コンパイル時のみ（@SuppressWarnings など）
  CLASS   → クラスファイルまで（バイトコード解析ツール向け）
  RUNTIME → 実行時まで（フレームワーク、リフレクション向け）

@Target の主な対象:
  TYPE        → クラス・インターフェース・enum
  METHOD      → メソッド
  FIELD       → フィールド
  PARAMETER   → メソッド引数
  CONSTRUCTOR → コンストラクタ

@Documented:
  Javadocにアノテーション情報を含める

UserService に適用されたアノテーション:
  @LogExecution(level = "DEBUG")
  @ApiVersion("v2")
  getUsername() → @LogExecution(level = "INFO")  // default値`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">リフレクションによるアノテーション処理</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">RetentionPolicy.RUNTIME</code> のアノテーションはリフレクションAPIで実行時に取得できます。
          フレームワークがDI・バリデーション・ログなどを実装する仕組みです。
        </p>
        <JavaEditor
          defaultCode={`import java.lang.annotation.*;
import java.lang.reflect.*;

// 実行時アノテーション定義
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@interface Service {
    String name() default "";
}

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@interface Log {
    String level() default "INFO";
    boolean enabled() default true;
}

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@interface NotNull {}

// アノテーションを付与したクラス
@Service(name = "OrderService")
class OrderService {

    @NotNull
    private String orderId;

    OrderService(String orderId) { this.orderId = orderId; }

    @Log(level = "DEBUG")
    public void placeOrder() {
        System.out.println("注文処理: " + orderId);
    }

    @Log(enabled = false)
    public void cancelOrder() {
        System.out.println("注文キャンセル: " + orderId);
    }

    public void getStatus() {
        System.out.println("ステータス確認: " + orderId);
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        Class<?> clazz = OrderService.class;

        // クラスのアノテーションを取得
        System.out.println("=== クラスのアノテーション ===");
        if (clazz.isAnnotationPresent(Service.class)) {
            Service svc = clazz.getAnnotation(Service.class);
            System.out.println("@Service name = \\"" + svc.name() + "\\"");
        }

        // メソッドのアノテーションを処理（簡易AOPの例）
        System.out.println();
        System.out.println("=== メソッド実行（@Log 処理） ===");
        OrderService service = new OrderService("ORD-001");

        for (Method method : clazz.getDeclaredMethods()) {
            if (method.isAnnotationPresent(Log.class)) {
                Log log = method.getAnnotation(Log.class);
                if (log.enabled()) {
                    System.out.print("[" + log.level() + "] 実行前: " + method.getName() + "() → ");
                    method.invoke(service);
                } else {
                    System.out.println("[SKIP] " + method.getName() + "() は無効化されています");
                }
            } else {
                System.out.print("[なし] " + method.getName() + "() → ");
                method.invoke(service);
            }
        }

        // フィールドのアノテーションを確認
        System.out.println();
        System.out.println("=== フィールドの @NotNull 確認 ===");
        for (Field field : clazz.getDeclaredFields()) {
            if (field.isAnnotationPresent(NotNull.class)) {
                System.out.println("@NotNull: " + field.getName() + " (null不可フィールド)");
            }
        }
    }
}`}
          expectedOutput={`=== クラスのアノテーション ===
@Service name = "OrderService"

=== メソッド実行（@Log 処理） ===
[DEBUG] 実行前: placeOrder() → 注文処理: ORD-001
[SKIP] cancelOrder() は無効化されています
[なし] getStatus() → ステータス確認: ORD-001

=== フィールドの @NotNull 確認 ===
@NotNull: orderId (null不可フィールド)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="annotations" />
      </div>
      <LessonNav lessons={lessons} currentId="annotations" basePath="/learn/ecosystem" />

      <Quiz questions={quizQuestions} color="blue" />
    </div>
  );
}

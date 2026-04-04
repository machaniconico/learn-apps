import { JavaEditor } from "@/components/java-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Singletonパターンの目的として正しいものはどれですか？",
    options: [
      "クラスのインスタンスが1つだけ存在することを保証し、グローバルなアクセス手段を提供する",
      "オブジェクトを大量に生成する",
      "クラスの継承を禁止する",
      "メソッドのオーバーロードを制御する",
    ],
    answer: 0,
    explanation: "Singletonパターンはprivateコンストラクタとstaticメソッドにより、クラスのインスタンスを1つに制限します。設定管理やログ管理などに使われます。",
  },
  {
    question: "Factoryパターンの利点として正しいものはどれですか？",
    options: [
      "オブジェクト生成のロジックをカプセル化し、クライアントコードを具象クラスから分離する",
      "オブジェクトの削除を自動化する",
      "オブジェクトのメモリ使用量を削減する",
      "オブジェクトのシリアライゼーションを簡略化する",
    ],
    answer: 0,
    explanation: "Factoryパターンはオブジェクト生成の詳細を隠蔽し、インターフェースを通じて適切なインスタンスを返します。new演算子を直接使わず、柔軟な生成が可能になります。",
  },
  {
    question: "Observerパターンについて正しいものはどれですか？",
    options: [
      "あるオブジェクトの状態変化を、依存する複数のオブジェクトに自動的に通知する",
      "オブジェクトを1つだけ監視する",
      "オブジェクト間の通信を完全に遮断する",
      "データベースの変更を監視する専用パターン",
    ],
    answer: 0,
    explanation: "Observerパターン（Pub/Sub）は、Subject（発行者）の状態変化をObserver（購読者）に通知します。イベント処理やMVCアーキテクチャで広く使われます。",
  },
  {
    question: "Builderパターンの特徴として正しいものはどれですか？",
    options: [
      "複雑なオブジェクトの構築をステップバイステップで行い、メソッドチェーンで読みやすいコードを実現する",
      "オブジェクトを即座に削除する",
      "コンストラクタの引数を増やす",
      "不変オブジェクトは作成できない",
    ],
    answer: 0,
    explanation: "Builderパターンは多数のパラメータを持つオブジェクトの構築を整理します。メソッドチェーンでパラメータを設定し、build()で最終的なオブジェクトを生成します。",
  },
];

export default function DesignPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-violet-400 mb-2">デザインパターン</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Javaのデザインパターンを学びましょう。Singleton、Factory、Observer、Builderなどの
          代表的なパターンを理解し、保守性と拡張性の高いコード設計を身につけます。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="design" totalLessons={6} color="violet" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/design" color="violet" categoryId="design" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Singletonパターン</h2>
        <p className="text-gray-400 mb-4">
          インスタンスを1つに制限するSingletonパターンの実装を確認しましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    // Singletonパターン（スレッドセーフ版）
    static class AppConfig {
        private static AppConfig instance;
        private String appName;
        private String version;
        private String theme;

        // privateコンストラクタ
        private AppConfig() {
            this.appName = "JavaLearnApp";
            this.version = "1.0.0";
            this.theme = "dark";
        }

        // synchronized で排他制御
        public static synchronized AppConfig getInstance() {
            if (instance == null) {
                instance = new AppConfig();
                System.out.println("AppConfig インスタンス生成");
            }
            return instance;
        }

        public void setTheme(String theme) { this.theme = theme; }
        public String getInfo() {
            return appName + " v" + version + " (theme: " + theme + ")";
        }
    }

    public static void main(String[] args) {
        System.out.println("=== Singletonパターン ===");

        // 何度getInstanceしても同じインスタンス
        AppConfig config1 = AppConfig.getInstance();
        AppConfig config2 = AppConfig.getInstance();

        System.out.println("同一インスタンス: " + (config1 == config2));
        System.out.println("設定: " + config1.getInfo());

        // config1で変更するとconfig2にも反映
        config1.setTheme("light");
        System.out.println("変更後: " + config2.getInfo());

        System.out.println();
        System.out.println("=== Singleton実装の種類 ===");
        System.out.println("1. Lazy Initialization（遅延初期化）");
        System.out.println("2. Eager Initialization（即時初期化）");
        System.out.println("3. Bill Pughパターン（内部クラス）");
        System.out.println("4. enum Singleton（最も安全）");
    }
}`}
          expectedOutput={`=== Singletonパターン ===
AppConfig インスタンス生成
同一インスタンス: true
設定: JavaLearnApp v1.0.0 (theme: dark)
変更後: JavaLearnApp v1.0.0 (theme: light)

=== Singleton実装の種類 ===
1. Lazy Initialization（遅延初期化）
2. Eager Initialization（即時初期化）
3. Bill Pughパターン（内部クラス）
4. enum Singleton（最も安全）`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Builderパターン</h2>
        <p className="text-gray-400 mb-4">
          複雑なオブジェクトをメソッドチェーンで構築するBuilderパターンを学びましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    // Builderパターンで構築するUserクラス
    static class User {
        private final String name;
        private final String email;
        private final int age;
        private final String role;
        private final boolean active;

        private User(Builder builder) {
            this.name = builder.name;
            this.email = builder.email;
            this.age = builder.age;
            this.role = builder.role;
            this.active = builder.active;
        }

        @Override
        public String toString() {
            return "User{name='" + name + "', email='" + email +
                   "', age=" + age + ", role='" + role +
                   "', active=" + active + "}";
        }

        // Builderクラス
        static class Builder {
            private final String name;  // 必須
            private String email = "";
            private int age = 0;
            private String role = "user";
            private boolean active = true;

            public Builder(String name) {
                this.name = name;
            }

            public Builder email(String email) {
                this.email = email;
                return this;
            }

            public Builder age(int age) {
                this.age = age;
                return this;
            }

            public Builder role(String role) {
                this.role = role;
                return this;
            }

            public Builder active(boolean active) {
                this.active = active;
                return this;
            }

            public User build() {
                return new User(this);
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("=== Builderパターン ===");

        // メソッドチェーンでオブジェクトを構築
        User admin = new User.Builder("田中太郎")
            .email("tanaka@example.com")
            .age(30)
            .role("admin")
            .active(true)
            .build();

        User guest = new User.Builder("山田花子")
            .email("yamada@example.com")
            .role("guest")
            .build();

        System.out.println(admin);
        System.out.println(guest);

        System.out.println();
        System.out.println("=== Builderの利点 ===");
        System.out.println("1. 読みやすいオブジェクト構築");
        System.out.println("2. 不変オブジェクトの生成");
        System.out.println("3. オプショナルパラメータの柔軟な指定");
        System.out.println("4. テレスコーピングコンストラクタの回避");
    }
}`}
          expectedOutput={`=== Builderパターン ===
User{name='田中太郎', email='tanaka@example.com', age=30, role='admin', active=true}
User{name='山田花子', email='yamada@example.com', age=0, role='guest', active=true}

=== Builderの利点 ===
1. 読みやすいオブジェクト構築
2. 不変オブジェクトの生成
3. オプショナルパラメータの柔軟な指定
4. テレスコーピングコンストラクタの回避`}
        />
      </section>

      <Quiz questions={quizQuestions} color="violet" />
    </div>
  );
}

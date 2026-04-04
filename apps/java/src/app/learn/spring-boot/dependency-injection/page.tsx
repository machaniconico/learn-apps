import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("spring-boot");

export default function DependencyInjectionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">Spring Boot レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">DI（依存性注入）</h1>
        <p className="text-gray-400">コンストラクタインジェクション、@Qualifier、@Primary</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">依存性注入（DI）とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          DI（Dependency Injection）は、オブジェクト間の依存関係を外部から注入するデザインパターンです。
          Springでは <code className="text-orange-300">コンストラクタインジェクション</code> が推奨され、
          同じインターフェースの実装が複数ある場合は <code className="text-orange-300">@Qualifier</code> や
          <code className="text-orange-300">@Primary</code> で注入先を制御します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>コンストラクタインジェクション - 推奨。不変性を保証、テスト容易</li>
          <li>フィールドインジェクション（@Autowired） - 非推奨。テスト困難</li>
          <li><code>@Qualifier("beanName")</code> - 同一インターフェースの複数実装から選択</li>
          <li><code>@Primary</code> - デフォルトで注入されるBeanを指定</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コンストラクタインジェクション</h2>
        <p className="text-gray-400 mb-4">
          コンストラクタでの注入は不変性を保証し、依存関係が明確になります。
          コンストラクタが1つだけの場合、<code className="text-orange-300">@Autowired</code> は省略可能です。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {

    // インターフェース定義
    interface NotificationService {
        void send(String to, String message);
    }

    // @Service 実装クラス
    static class EmailService implements NotificationService {
        public void send(String to, String message) {
            System.out.println("  Email -> " + to + ": " + message);
        }
    }

    // コンストラクタインジェクションを使うクラス
    static class OrderService {
        private final NotificationService notificationService;

        // コンストラクタが1つなら @Autowired 省略可能
        OrderService(NotificationService notificationService) {
            this.notificationService = notificationService;
        }

        void placeOrder(String userId, String item) {
            System.out.println("注文処理: " + item);
            notificationService.send(userId, item + "の注文を受け付けました");
        }
    }

    public static void main(String[] args) {
        System.out.println("=== コンストラクタインジェクション ===");

        // DIコンテナの動作を手動で再現
        NotificationService emailService = new EmailService();
        OrderService orderService = new OrderService(emailService);

        orderService.placeOrder("user@example.com", "Java入門書");
        orderService.placeOrder("admin@example.com", "Spring Boot本");
    }
}`}
          expectedOutput={`=== コンストラクタインジェクション ===
注文処理: Java入門書
  Email -> user@example.com: Java入門書の注文を受け付けました
注文処理: Spring Boot本
  Email -> admin@example.com: Spring Boot本の注文を受け付けました`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">@Qualifierと@Primary</h2>
        <p className="text-gray-400 mb-4">
          同じインターフェースの実装が複数ある場合、
          <code className="text-orange-300">@Primary</code> でデフォルトを指定し、
          <code className="text-orange-300">@Qualifier</code> で明示的に選択できます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {

    interface MessageSender {
        void send(String to, String message);
    }

    // @Service("emailSender")
    // @Primary  <- デフォルトで注入される
    static class EmailSender implements MessageSender {
        public void send(String to, String message) {
            System.out.println("  [Email] " + to + ": " + message);
        }
    }

    // @Service("smsSender")
    static class SmsSender implements MessageSender {
        public void send(String to, String message) {
            System.out.println("  [SMS] " + to + ": " + message);
        }
    }

    // @Primary により EmailSender が注入される
    static class DefaultNotifier {
        private final MessageSender sender;
        DefaultNotifier(MessageSender sender) {
            this.sender = sender;
        }
        void notify(String to, String msg) { sender.send(to, msg); }
    }

    // @Qualifier("smsSender") で SmsSender を明示指定
    static class SmsNotifier {
        private final MessageSender sender;
        SmsNotifier(MessageSender sender) {
            this.sender = sender;
        }
        void notify(String to, String msg) { sender.send(to, msg); }
    }

    public static void main(String[] args) {
        System.out.println("=== @Primary と @Qualifier ===");

        EmailSender email = new EmailSender();
        SmsSender sms = new SmsSender();

        System.out.println("\\n@Primary (デフォルト: EmailSender):");
        DefaultNotifier defaultNotifier = new DefaultNotifier(email);
        defaultNotifier.notify("user@example.com", "注文確認");

        System.out.println("\\n@Qualifier(smsSender) で明示指定:");
        SmsNotifier smsNotifier = new SmsNotifier(sms);
        smsNotifier.notify("090-1234-5678", "認証コード: 1234");
    }
}`}
          expectedOutput={`=== @Primary と @Qualifier ===

@Primary (デフォルト: EmailSender):
  [Email] user@example.com: 注文確認

@Qualifier(smsSender) で明示指定:
  [SMS] 090-1234-5678: 認証コード: 1234`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="spring-boot" lessonId="dependency-injection" />
      </div>
      <LessonNav lessons={lessons} currentId="dependency-injection" basePath="/learn/spring-boot" />
    </div>
  );
}

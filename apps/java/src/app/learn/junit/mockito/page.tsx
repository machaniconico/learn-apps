import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("junit");

export default function MockitoPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">JUnit レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Mockito</h1>
        <p className="text-gray-400">@Mock、@InjectMocks、when().thenReturn()、verify()の使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Mockitoとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Mockitoはモック（模擬オブジェクト）を作成するためのフレームワークです。
          外部依存（データベース、API等）をモックに置き換えて、テスト対象のロジックだけを検証できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>@Mock</code> - モックオブジェクトを生成</li>
          <li><code>@InjectMocks</code> - モックを注入したテスト対象を生成</li>
          <li><code>when(mock.method()).thenReturn(value)</code> - 戻り値を設定</li>
          <li><code>verify(mock).method()</code> - メソッドが呼ばれたか検証</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">モックの基本概念</h2>
        <p className="text-gray-400 mb-4">
          実際のデータベースやAPIの代わりに、モック（偽物）を使ってテストします。
          モックの振る舞いを事前に定義し、テスト対象のロジックだけに集中できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.HashMap;
import java.util.Map;

// リポジトリのインターフェース
interface UserRepository {
    String findNameById(int id);
    boolean existsById(int id);
}

// サービスクラス（テスト対象）
class UserService {
    private UserRepository repository;

    UserService(UserRepository repository) {
        this.repository = repository;
    }

    String getGreeting(int userId) {
        String name = repository.findNameById(userId);
        return name != null ? "Hello, " + name + "!" : "User not found";
    }
}

// モックの手動実装（Mockitoが自動でやること）
class MockUserRepository implements UserRepository {
    private Map<String, Object> stubbedReturns = new HashMap<>();

    // when(mock.findNameById(1)).thenReturn("Alice") 相当
    void whenFindNameById(int id, String returnValue) {
        stubbedReturns.put("findNameById_" + id, returnValue);
    }

    public String findNameById(int id) {
        return (String) stubbedReturns.get("findNameById_" + id);
    }

    public boolean existsById(int id) {
        return stubbedReturns.containsKey("findNameById_" + id);
    }
}

public class Main {
    public static void main(String[] args) {
        // @Mock UserRepository mockRepo
        MockUserRepository mockRepo = new MockUserRepository();

        // when(mockRepo.findNameById(1)).thenReturn("Alice")
        mockRepo.whenFindNameById(1, "Alice");
        mockRepo.whenFindNameById(2, "Bob");

        // @InjectMocks UserService service
        UserService service = new UserService(mockRepo);

        System.out.println(service.getGreeting(1));
        System.out.println(service.getGreeting(2));
        System.out.println(service.getGreeting(99));
    }
}`}
          expectedOutput={`Hello, Alice!
Hello, Bob!
User not found`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">when().thenReturn() と verify()</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">when().thenReturn()</code> でモックの戻り値を設定し、
          <code className="text-orange-300">verify()</code> でメソッドが正しく呼ばれたかを検証します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.ArrayList;
import java.util.List;

// メール送信サービスのインターフェース
interface EmailService {
    boolean sendEmail(String to, String subject);
}

// 注文サービス（テスト対象）
class OrderService {
    private EmailService emailService;

    OrderService(EmailService emailService) {
        this.emailService = emailService;
    }

    String placeOrder(String customerEmail, String item) {
        boolean sent = emailService.sendEmail(customerEmail, "注文確認: " + item);
        return sent ? "注文完了" : "メール送信失敗";
    }
}

// verify()を実現するモック
class MockEmailService implements EmailService {
    List<String> callLog = new ArrayList<>();
    boolean returnValue = true;

    // when(mock.sendEmail(...)).thenReturn(true)
    void setReturnValue(boolean value) {
        this.returnValue = value;
    }

    public boolean sendEmail(String to, String subject) {
        callLog.add("sendEmail(" + to + ", " + subject + ")");
        return returnValue;
    }

    // verify(mock).sendEmail(to, subject)
    boolean verifyCalled(String to, String subject) {
        return callLog.contains("sendEmail(" + to + ", " + subject + ")");
    }

    int callCount() {
        return callLog.size();
    }
}

public class Main {
    public static void main(String[] args) {
        MockEmailService mockEmail = new MockEmailService();

        // when(mockEmail.sendEmail(...)).thenReturn(true)
        mockEmail.setReturnValue(true);

        OrderService orderService = new OrderService(mockEmail);
        String result = orderService.placeOrder("user@example.com", "Java入門書");
        System.out.println("結果: " + result);

        // verify(mockEmail).sendEmail("user@example.com", "注文確認: Java入門書")
        boolean called = mockEmail.verifyCalled("user@example.com", "注文確認: Java入門書");
        System.out.println("sendEmailが呼ばれた: " + called);
        System.out.println("呼び出し回数: " + mockEmail.callCount());
    }
}`}
          expectedOutput={`結果: 注文完了
sendEmailが呼ばれた: true
呼び出し回数: 1`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">thenThrowと例外のモック</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">when().thenThrow()</code> を使うと、
          モックメソッドが呼ばれた際に例外を発生させることができます。
          エラーハンドリングのテストに便利です。
        </p>
        <JavaEditor
          defaultCode={`// データベース接続のインターフェース
interface Database {
    String query(String sql) throws Exception;
}

// サービスクラス
class DataService {
    private Database database;

    DataService(Database database) {
        this.database = database;
    }

    String fetchData(String sql) {
        try {
            return database.query(sql);
        } catch (Exception e) {
            return "ERROR: " + e.getMessage();
        }
    }
}

public class Main {
    public static void main(String[] args) {
        // 正常系のモック
        Database normalMock = sql -> "結果: 3件";
        DataService service1 = new DataService(normalMock);
        System.out.println(service1.fetchData("SELECT * FROM users"));

        // thenThrow相当: 例外を投げるモック
        Database errorMock = sql -> {
            throw new RuntimeException("接続タイムアウト");
        };
        DataService service2 = new DataService(errorMock);
        System.out.println(service2.fetchData("SELECT * FROM users"));

        // 条件付きモック
        Database conditionalMock = sql -> {
            if (sql.contains("invalid")) {
                throw new RuntimeException("無効なSQL");
            }
            return "OK";
        };
        DataService service3 = new DataService(conditionalMock);
        System.out.println(service3.fetchData("SELECT 1"));
        System.out.println(service3.fetchData("invalid query"));
    }
}`}
          expectedOutput={`結果: 3件
ERROR: 接続タイムアウト
OK
ERROR: 無効なSQL`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="junit" lessonId="mockito" />
      </div>
      <LessonNav lessons={lessons} currentId="mockito" basePath="/learn/junit" />
    </div>
  );
}

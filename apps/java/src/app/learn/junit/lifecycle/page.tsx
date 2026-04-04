import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("junit");

export default function LifecyclePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">JUnit レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ライフサイクル</h1>
        <p className="text-gray-400">@BeforeEach、@AfterEach、@BeforeAll、@AfterAllによるテストの前後処理</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">テストライフサイクルアノテーション</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          JUnit 5ではテストの前後に実行するメソッドを指定できます。
          共通のセットアップやクリーンアップ処理を定義して、テストコードの重複を減らせます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>@BeforeAll</code> - すべてのテストの前に1回だけ実行（static）</li>
          <li><code>@BeforeEach</code> - 各テストの前に毎回実行</li>
          <li><code>@AfterEach</code> - 各テストの後に毎回実行</li>
          <li><code>@AfterAll</code> - すべてのテストの後に1回だけ実行（static）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ライフサイクルの実行順序</h2>
        <p className="text-gray-400 mb-4">
          各アノテーションがどの順序で実行されるか確認しましょう。
          <code className="text-orange-300">@BeforeAll</code> と <code className="text-orange-300">@AfterAll</code> は
          テスト全体の前後に1回、<code className="text-orange-300">@BeforeEach</code> と <code className="text-orange-300">@AfterEach</code> は
          各テストの前後に毎回実行されます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.ArrayList;
import java.util.List;

public class Main {
    static List<String> data;

    // @BeforeAll相当
    static void beforeAll() {
        System.out.println("@BeforeAll: テスト全体のセットアップ");
        data = new ArrayList<>();
    }

    // @BeforeEach相当
    static void beforeEach(String testName) {
        System.out.println("  @BeforeEach: " + testName + " の準備");
        data.clear();
        data.add("初期データ");
    }

    // @AfterEach相当
    static void afterEach(String testName) {
        System.out.println("  @AfterEach: " + testName + " の後片付け");
    }

    // @AfterAll相当
    static void afterAll() {
        System.out.println("@AfterAll: テスト全体のクリーンアップ");
    }

    public static void main(String[] args) {
        beforeAll();

        // テスト1
        beforeEach("テスト1_追加");
        data.add("要素A");
        System.out.println("    テスト1: size=" + data.size() + " -> PASS");
        afterEach("テスト1_追加");

        // テスト2
        beforeEach("テスト2_確認");
        System.out.println("    テスト2: size=" + data.size() + " -> PASS");
        afterEach("テスト2_確認");

        afterAll();
    }
}`}
          expectedOutput={`@BeforeAll: テスト全体のセットアップ
  @BeforeEach: テスト1_追加 の準備
    テスト1: size=2 -> PASS
  @AfterEach: テスト1_追加 の後片付け
  @BeforeEach: テスト2_確認 の準備
    テスト2: size=1 -> PASS
  @AfterEach: テスト2_確認 の後片付け
@AfterAll: テスト全体のクリーンアップ`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">@BeforeEachでテストの独立性を保つ</h2>
        <p className="text-gray-400 mb-4">
          各テストの前に <code className="text-orange-300">@BeforeEach</code> で状態をリセットすることで、
          テスト間の依存関係を排除し、各テストを独立して実行できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.ArrayList;
import java.util.List;

public class Main {
    // テスト対象
    static List<String> shoppingCart;

    // @BeforeEach: 毎回新しいカートで始める
    static void setUp() {
        shoppingCart = new ArrayList<>();
        shoppingCart.add("りんご");  // 共通の初期状態
    }

    static void test(String name, boolean condition) {
        System.out.println((condition ? "PASS" : "FAIL") + ": " + name);
    }

    public static void main(String[] args) {
        // テスト1: 商品追加
        setUp();
        shoppingCart.add("バナナ");
        test("商品追加後のサイズは2", shoppingCart.size() == 2);

        // テスト2: 商品削除（前のテストの影響を受けない）
        setUp();
        shoppingCart.remove("りんご");
        test("商品削除後のサイズは0", shoppingCart.size() == 0);

        // テスト3: 初期状態の確認
        setUp();
        test("初期状態でりんごが入っている", shoppingCart.contains("りんご"));
        test("初期状態のサイズは1", shoppingCart.size() == 1);
    }
}`}
          expectedOutput={`PASS: 商品追加後のサイズは2
PASS: 商品削除後のサイズは0
PASS: 初期状態でりんごが入っている
PASS: 初期状態のサイズは1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="junit" lessonId="lifecycle" />
      </div>
      <LessonNav lessons={lessons} currentId="lifecycle" basePath="/learn/junit" />
    </div>
  );
}

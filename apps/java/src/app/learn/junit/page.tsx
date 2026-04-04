import { JavaEditor } from "@/components/java-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("junit");

const quizQuestions: QuizQuestion[] = [
  {
    question: "@Testアノテーションの役割は何ですか？",
    options: [
      "クラスをテスト対象としてマークする",
      "メソッドをテストメソッドとして認識させる",
      "テストを自動実行するスケジュールを設定する",
      "テスト結果をレポートに出力する",
    ],
    answer: 1,
    explanation: "@Testはメソッドがテストメソッドであることを示します。JUnit 5のテストランナーがこのアノテーションが付いたメソッドを自動的に実行します。",
  },
  {
    question: "assertEqualsの引数の順番はどれですか？",
    options: [
      "assertEquals(実測値, 期待値)",
      "assertEquals(期待値, 実測値)",
      "assertEquals(テスト名, 期待値, 実測値)",
      "assertEquals(実測値, 期待値, メッセージ)",
    ],
    answer: 1,
    explanation: "JUnit 5のassertEqualsは assertEquals(expected, actual) の順番です。第3引数にメッセージを追加することもできます。",
  },
  {
    question: "@BeforeEachアノテーションの役割は何ですか？",
    options: [
      "テストクラスの前に1回だけ実行される",
      "各テストメソッドの実行前に毎回実行される",
      "テスト失敗時に実行される",
      "テスト結果の検証前に実行される",
    ],
    answer: 1,
    explanation: "@BeforeEachが付いたメソッドは各テストメソッドの実行前に毎回呼ばれます。テストの前提条件のセットアップに使います。クラスで1回だけは@BeforeAllです。",
  },
  {
    question: "Mockitoの主な用途は何ですか？",
    options: [
      "テストの並列実行",
      "依存オブジェクトのモック（偽物）を作成してテストを分離する",
      "データベースのテストデータを自動生成する",
      "テストカバレッジを計測する",
    ],
    answer: 1,
    explanation: "Mockitoは依存するクラスやインターフェースのモックオブジェクトを作成し、テスト対象のクラスを外部依存から分離して単体テストを行うためのフレームワークです。",
  },
];

export default function JunitPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-orange-400 mb-2">JUnit</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          JUnit 5を使った単体テストの書き方を学びましょう。テストメソッド・アサーション・ライフサイクル・パラメータ化テスト・Mockitoまで、テスト駆動開発の基礎を身につけます。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="junit" totalLessons={6} color="orange" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/junit" color="orange" categoryId="junit" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">JUnitテストクラスの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">@Test</code> でテストメソッドを定義し、
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">assertEquals</code> などのアサーションで検証します。
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">@BeforeEach</code> でセットアップも行えます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

// JUnit テストの擬似実装
public class Main {

    // テスト対象クラス
    static class Calculator {
        int add(int a, int b) { return a + b; }
        int subtract(int a, int b) { return a - b; }
        int divide(int a, int b) {
            if (b == 0) throw new ArithmeticException("/ by zero");
            return a / b;
        }
    }

    // 簡易テストフレームワーク
    static int passed = 0, failed = 0;
    static void assertEquals(Object expected, Object actual, String testName) {
        if (Objects.equals(expected, actual)) {
            System.out.println("  PASS: " + testName);
            passed++;
        } else {
            System.out.println("  FAIL: " + testName + " (expected=" + expected + ", actual=" + actual + ")");
            failed++;
        }
    }
    static void assertThrows(Class<?> exClass, Runnable code, String testName) {
        try { code.run(); System.out.println("  FAIL: " + testName + " (例外が発生しなかった)"); failed++; }
        catch (Exception e) {
            if (exClass.isInstance(e)) { System.out.println("  PASS: " + testName); passed++; }
            else { System.out.println("  FAIL: " + testName + " (想定外の例外)"); failed++; }
        }
    }

    public static void main(String[] args) {
        Calculator calc = new Calculator(); // @BeforeEach

        System.out.println("=== CalculatorTest ===");
        // @Test
        assertEquals(5, calc.add(2, 3), "2 + 3 = 5");
        assertEquals(0, calc.add(-1, 1), "-1 + 1 = 0");
        assertEquals(3, calc.subtract(5, 2), "5 - 2 = 3");
        assertEquals(4, calc.divide(12, 3), "12 / 3 = 4");
        assertThrows(ArithmeticException.class, () -> calc.divide(1, 0), "0で割ると例外");

        System.out.println("結果: " + passed + " passed, " + failed + " failed");
    }
}`}
          expectedOutput={`=== CalculatorTest ===
  PASS: 2 + 3 = 5
  PASS: -1 + 1 = 0
  PASS: 5 - 2 = 3
  PASS: 12 / 3 = 4
  PASS: 0で割ると例外
結果: 5 passed, 0 failed`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">パラメータ化テスト</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">@ParameterizedTest</code> を使うと、
          同じテストロジックを異なるデータで繰り返し実行できます。テストデータの網羅性を高めましょう。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

// パラメータ化テストの擬似実装
public class Main {

    static boolean isPalindrome(String s) {
        String cleaned = s.toLowerCase().replaceAll("[^a-z0-9]", "");
        return cleaned.equals(new StringBuilder(cleaned).reverse().toString());
    }

    static int passed = 0, failed = 0;

    // @ParameterizedTest
    // @CsvSource({"input, expected"})
    static void testIsPalindrome(String input, boolean expected) {
        boolean actual = isPalindrome(input);
        String status = (actual == expected) ? "PASS" : "FAIL";
        if (actual == expected) passed++; else failed++;
        System.out.printf("  %s: isPalindrome(\"%s\") = %b%n", status, input, actual);
    }

    public static void main(String[] args) {
        System.out.println("=== @ParameterizedTest: isPalindrome ===");

        // テストデータ一覧
        Object[][] testCases = {
            {"racecar", true},
            {"hello", false},
            {"A man a plan a canal Panama", true},
            {"level", true},
            {"Java", false},
            {"12321", true},
        };

        for (Object[] tc : testCases) {
            testIsPalindrome((String) tc[0], (boolean) tc[1]);
        }

        System.out.println("結果: " + passed + " passed, " + failed + " failed");
    }
}`}
          expectedOutput={`=== @ParameterizedTest: isPalindrome ===
  PASS: isPalindrome("racecar") = true
  PASS: isPalindrome("hello") = false
  PASS: isPalindrome("A man a plan a canal Panama") = true
  PASS: isPalindrome("level") = true
  PASS: isPalindrome("Java") = false
  PASS: isPalindrome("12321") = true
結果: 6 passed, 0 failed`}
        />
      </section>

      <Quiz questions={quizQuestions} color="orange" />
    </div>
  );
}

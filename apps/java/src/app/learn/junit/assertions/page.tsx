import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("junit");

export default function AssertionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">JUnit レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">アサーション</h1>
        <p className="text-gray-400">assertEquals、assertTrue、assertNull、assertThrows、assertAllの使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">主要なアサーションメソッド</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          JUnit 5の <code className="text-orange-300">Assertions</code> クラスには多数の検証メソッドがあります。
          テスト結果を正確に検証するために、状況に応じた適切なアサーションを使いましょう。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>assertEquals(expected, actual)</code> - 値の等価性を検証</li>
          <li><code>assertTrue(condition)</code> / <code>assertFalse(condition)</code> - 真偽値を検証</li>
          <li><code>assertNull(value)</code> / <code>assertNotNull(value)</code> - null検証</li>
          <li><code>assertThrows(Exception.class, () -&gt; ...)</code> - 例外発生を検証</li>
          <li><code>assertAll()</code> - 複数のアサーションをまとめて実行</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">assertEquals と assertTrue</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">assertEquals</code> は値の一致を、
          <code className="text-orange-300">assertTrue</code> は条件がtrueであることを検証します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;

public class Main {
    static void assertEquals(Object expected, Object actual, String msg) {
        boolean pass = (expected == null) ? actual == null : expected.equals(actual);
        System.out.println((pass ? "PASS" : "FAIL") + ": " + msg);
    }

    static void assertTrue(boolean condition, String msg) {
        System.out.println((condition ? "PASS" : "FAIL") + ": " + msg);
    }

    static void assertFalse(boolean condition, String msg) {
        System.out.println((!condition ? "PASS" : "FAIL") + ": " + msg);
    }

    public static void main(String[] args) {
        // assertEquals
        assertEquals(4, 2 + 2, "2 + 2 は 4");
        assertEquals("HELLO", "hello".toUpperCase(), "toUpperCase");

        // assertTrue / assertFalse
        List<Integer> list = Arrays.asList(1, 2, 3);
        assertTrue(list.contains(2), "リストに2が含まれる");
        assertFalse(list.isEmpty(), "リストは空でない");
        assertTrue("Java".startsWith("Ja"), "Javaで始まる");
    }
}`}
          expectedOutput={`PASS: 2 + 2 は 4
PASS: toUpperCase
PASS: リストに2が含まれる
PASS: リストは空でない
PASS: Javaで始まる`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">assertNull と assertThrows</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">assertNull</code> はnull検証に、
          <code className="text-orange-300">assertThrows</code> は例外が正しく発生するかの検証に使います。
        </p>
        <JavaEditor
          defaultCode={`import java.util.HashMap;
import java.util.Map;

public class Main {
    static void assertNull(Object value, String msg) {
        System.out.println((value == null ? "PASS" : "FAIL") + ": " + msg);
    }

    static void assertNotNull(Object value, String msg) {
        System.out.println((value != null ? "PASS" : "FAIL") + ": " + msg);
    }

    static void assertThrows(Class<?> exClass, Runnable code, String msg) {
        try {
            code.run();
            System.out.println("FAIL: " + msg + " (例外が発生しなかった)");
        } catch (Exception e) {
            if (exClass.isInstance(e)) {
                System.out.println("PASS: " + msg + " (" + e.getClass().getSimpleName() + ")");
            } else {
                System.out.println("FAIL: " + msg + " (別の例外: " + e.getClass().getSimpleName() + ")");
            }
        }
    }

    public static void main(String[] args) {
        Map<String, String> map = new HashMap<>();
        map.put("key1", "value1");

        assertNotNull(map.get("key1"), "key1は存在する");
        assertNull(map.get("key2"), "key2は存在しない(null)");

        // assertThrows: 例外が発生することを検証
        assertThrows(NumberFormatException.class,
            () -> Integer.parseInt("abc"),
            "数字でない文字列のパース");

        assertThrows(ArithmeticException.class,
            () -> { int x = 1 / 0; },
            "ゼロ除算");
    }
}`}
          expectedOutput={`PASS: key1は存在する
PASS: key2は存在しない(null)
PASS: 数字でない文字列のパース (NumberFormatException)
PASS: ゼロ除算 (ArithmeticException)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">assertAll - 複数アサーションのグループ化</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">assertAll</code> は複数のアサーションをまとめて実行し、
          すべての失敗を一度に報告します。途中で止まらないのが利点です。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    static int passed = 0;
    static int failed = 0;

    static void check(String name, boolean condition) {
        if (condition) {
            passed++;
            System.out.println("  PASS: " + name);
        } else {
            failed++;
            System.out.println("  FAIL: " + name);
        }
    }

    // assertAll相当: すべてのチェックを実行して最後にまとめる
    static void assertAll(String group, Runnable... checks) {
        passed = 0;
        failed = 0;
        System.out.println("[" + group + "]");
        for (Runnable r : checks) {
            r.run();
        }
        System.out.println("  => " + passed + " passed, " + failed + " failed");
    }

    public static void main(String[] args) {
        String name = "John Doe";

        assertAll("名前の検証",
            () -> check("nullでない", name != null),
            () -> check("空でない", !name.isEmpty()),
            () -> check("スペースを含む", name.contains(" ")),
            () -> check("Johnで始まる", name.startsWith("John"))
        );
    }
}`}
          expectedOutput={`[名前の検証]
  PASS: nullでない
  PASS: 空でない
  PASS: スペースを含む
  PASS: Johnで始まる
  => 4 passed, 0 failed`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="junit" lessonId="assertions" />
      </div>
      <LessonNav lessons={lessons} currentId="assertions" basePath="/learn/junit" />
    </div>
  );
}

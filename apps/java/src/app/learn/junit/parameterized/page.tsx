import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("junit");

export default function ParameterizedPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">JUnit レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">パラメータ化テスト</h1>
        <p className="text-gray-400">@ParameterizedTest、@ValueSource、@CsvSource、@MethodSourceの使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">パラメータ化テストとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          同じテストロジックを異なるデータで繰り返し実行するための機能です。
          <code className="text-orange-300">@ParameterizedTest</code> を使うことで、テストコードの重複を大幅に減らせます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>@ValueSource</code> - 単一の値のリストを渡す</li>
          <li><code>@CsvSource</code> - CSV形式で複数の引数を渡す</li>
          <li><code>@MethodSource</code> - メソッドから引数を供給する</li>
          <li><code>@EnumSource</code> - Enum値をテストデータとして使う</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">@ValueSource相当 - 単一値のパラメータ化</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">@ValueSource</code> は単一の値をテストメソッドに渡します。
          数値、文字列などの基本型で使えます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    // 偶数判定メソッド
    static boolean isEven(int number) {
        return number % 2 == 0;
    }

    // @ParameterizedTest + @ValueSource(ints = {2, 4, 6, 8, 10})
    static void testIsEven(int[] values) {
        System.out.println("偶数テスト (@ValueSource):");
        for (int value : values) {
            boolean result = isEven(value);
            System.out.println("  " + value + " -> " + (result ? "PASS" : "FAIL"));
        }
    }

    // @ParameterizedTest + @ValueSource(strings = {"racecar", "madam", "level"})
    static void testPalindrome(String[] values) {
        System.out.println("回文テスト (@ValueSource):");
        for (String s : values) {
            String reversed = new StringBuilder(s).reverse().toString();
            boolean isPalindrome = s.equals(reversed);
            System.out.println("  " + s + " -> " + (isPalindrome ? "PASS" : "FAIL"));
        }
    }

    public static void main(String[] args) {
        testIsEven(new int[]{2, 4, 6, 8, 10});
        testPalindrome(new String[]{"racecar", "madam", "level"});
    }
}`}
          expectedOutput={`偶数テスト (@ValueSource):
  2 -> PASS
  4 -> PASS
  6 -> PASS
  8 -> PASS
  10 -> PASS
回文テスト (@ValueSource):
  racecar -> PASS
  madam -> PASS
  level -> PASS`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">@CsvSource相当 - 複数引数のパラメータ化</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">@CsvSource</code> はCSV形式で複数の引数を同時に渡せます。
          入力と期待値のペアを定義するのに便利です。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    static int add(int a, int b) {
        return a + b;
    }

    // @ParameterizedTest
    // @CsvSource({"1, 2, 3", "5, 5, 10", "-1, 1, 0", "100, 200, 300"})
    static void testAdd(String[][] csvData) {
        System.out.println("加算テスト (@CsvSource):");
        for (String[] row : csvData) {
            int a = Integer.parseInt(row[0].trim());
            int b = Integer.parseInt(row[1].trim());
            int expected = Integer.parseInt(row[2].trim());
            int actual = add(a, b);
            String status = actual == expected ? "PASS" : "FAIL";
            System.out.println("  add(" + a + ", " + b + ") = " + actual + " -> " + status);
        }
    }

    // @CsvSource({"hello, HELLO", "java, JAVA", "Test, TEST"})
    static void testToUpper(String[][] csvData) {
        System.out.println("大文字変換テスト (@CsvSource):");
        for (String[] row : csvData) {
            String input = row[0].trim();
            String expected = row[1].trim();
            String actual = input.toUpperCase();
            String status = actual.equals(expected) ? "PASS" : "FAIL";
            System.out.println("  \"" + input + "\".toUpperCase() = \"" + actual + "\" -> " + status);
        }
    }

    public static void main(String[] args) {
        testAdd(new String[][]{
            {"1", "2", "3"}, {"5", "5", "10"},
            {"-1", "1", "0"}, {"100", "200", "300"}
        });
        testToUpper(new String[][]{
            {"hello", "HELLO"}, {"java", "JAVA"}, {"Test", "TEST"}
        });
    }
}`}
          expectedOutput={`加算テスト (@CsvSource):
  add(1, 2) = 3 -> PASS
  add(5, 5) = 10 -> PASS
  add(-1, 1) = 0 -> PASS
  add(100, 200) = 300 -> PASS
大文字変換テスト (@CsvSource):
  "hello".toUpperCase() = "HELLO" -> PASS
  "java".toUpperCase() = "JAVA" -> PASS
  "Test".toUpperCase() = "TEST" -> PASS`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">@MethodSource相当 - メソッドからテストデータ供給</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">@MethodSource</code> は静的メソッドからテストデータを供給します。
          複雑なテストデータの生成に適しています。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;

public class Main {
    // テストデータを供給するメソッド（@MethodSource用）
    static List<int[]> provideAdditionData() {
        return Arrays.asList(
            new int[]{0, 0, 0},
            new int[]{1, 1, 2},
            new int[]{-5, 5, 0},
            new int[]{Integer.MAX_VALUE, 0, Integer.MAX_VALUE}
        );
    }

    static int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        System.out.println("加算テスト (@MethodSource):");
        List<int[]> testData = provideAdditionData();

        for (int[] data : testData) {
            int a = data[0], b = data[1], expected = data[2];
            int actual = add(a, b);
            String status = actual == expected ? "PASS" : "FAIL";
            System.out.println("  add(" + a + ", " + b + ") = " + actual + " -> " + status);
        }

        System.out.println("テスト件数: " + testData.size());
    }
}`}
          expectedOutput={`加算テスト (@MethodSource):
  add(0, 0) = 0 -> PASS
  add(1, 1) = 2 -> PASS
  add(-5, 5) = 0 -> PASS
  add(2147483647, 0) = 2147483647 -> PASS
テスト件数: 4`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="junit" lessonId="parameterized" />
      </div>
      <LessonNav lessons={lessons} currentId="parameterized" basePath="/learn/junit" />
    </div>
  );
}

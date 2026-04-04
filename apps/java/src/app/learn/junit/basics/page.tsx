import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("junit");

export default function JunitBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">JUnit レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">JUnit 5の基本</h1>
        <p className="text-gray-400">@Test、Assertions.assertEquals、テストクラスの作成方法を学ぶ</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">JUnit 5とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          JUnit 5はJavaの標準的なテスティングフレームワークです。
          <code className="text-orange-300">@Test</code> アノテーションを付けたメソッドがテストとして実行されます。
          <code className="text-orange-300">Assertions</code> クラスのメソッドで期待値と実際の値を検証します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>@Test</code> でテストメソッドをマーク</li>
          <li><code>Assertions.assertEquals(expected, actual)</code> で値を比較</li>
          <li>テストクラスは通常 <code>XxxTest</code> という命名規則に従う</li>
          <li>テストメソッドは <code>void</code> で引数なし</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なテストクラス</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">@Test</code> アノテーションを付けたメソッドがテストとして認識されます。
          テスト対象のクラスと、それをテストするクラスを作成します。
        </p>
        <JavaEditor
          defaultCode={`// テスト対象のクラス
class Calculator {
    int add(int a, int b) {
        return a + b;
    }
    int subtract(int a, int b) {
        return a - b;
    }
}

// テストクラス（JUnit 5の概念を示す擬似コード）
public class Main {
    public static void main(String[] args) {
        Calculator calc = new Calculator();

        // assertEquals相当のテスト
        int result1 = calc.add(2, 3);
        System.out.println("add(2, 3) = " + result1);
        System.out.println("テスト1: " + (result1 == 5 ? "PASS" : "FAIL"));

        int result2 = calc.subtract(10, 4);
        System.out.println("subtract(10, 4) = " + result2);
        System.out.println("テスト2: " + (result2 == 6 ? "PASS" : "FAIL"));
    }
}`}
          expectedOutput={`add(2, 3) = 5
テスト1: PASS
subtract(10, 4) = 6
テスト2: PASS`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">assertEqualsの仕組み</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">assertEquals</code> は期待値と実際の値を比較し、
          一致しなければテスト失敗として報告します。自作してその仕組みを理解しましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    // assertEqualsの簡易実装
    static void assertEquals(Object expected, Object actual) {
        if (expected.equals(actual)) {
            System.out.println("PASS: " + expected + " == " + actual);
        } else {
            System.out.println("FAIL: expected " + expected + " but was " + actual);
        }
    }

    static void assertEquals(String message, Object expected, Object actual) {
        if (expected.equals(actual)) {
            System.out.println("PASS: " + message);
        } else {
            System.out.println("FAIL: " + message + " - expected " + expected + " but was " + actual);
        }
    }

    public static void main(String[] args) {
        assertEquals("足し算テスト", 5, 2 + 3);
        assertEquals("文字列テスト", "Hello", "Hel" + "lo");
        assertEquals("掛け算テスト", 12, 3 * 4);
    }
}`}
          expectedOutput={`PASS: 足し算テスト
PASS: 文字列テスト
PASS: 掛け算テスト`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テストの命名と構造</h2>
        <p className="text-gray-400 mb-4">
          テストメソッドには<code className="text-orange-300">@DisplayName</code>でわかりやすい名前を付けられます。
          テストクラスの基本構造を確認しましょう。
        </p>
        <JavaEditor
          defaultCode={`class StringUtils {
    static boolean isEmpty(String str) {
        return str == null || str.isEmpty();
    }
    static String reverse(String str) {
        return new StringBuilder(str).reverse().toString();
    }
}

public class Main {
    static int passed = 0;
    static int failed = 0;

    static void test(String name, boolean condition) {
        if (condition) {
            System.out.println("PASS: " + name);
            passed++;
        } else {
            System.out.println("FAIL: " + name);
            failed++;
        }
    }

    public static void main(String[] args) {
        // @Test void nullはempty()
        test("nullはempty", StringUtils.isEmpty(null));

        // @Test void 空文字はempty()
        test("空文字はempty", StringUtils.isEmpty(""));

        // @Test void 文字ありはemptyでない()
        test("文字ありはemptyでない", !StringUtils.isEmpty("hello"));

        // @Test void 文字列の反転()
        test("文字列の反転", StringUtils.reverse("abc").equals("cba"));

        System.out.println("---");
        System.out.println("結果: " + passed + "/" + (passed + failed) + " テスト成功");
    }
}`}
          expectedOutput={`PASS: nullはempty
PASS: 空文字はempty
PASS: 文字ありはemptyでない
PASS: 文字列の反転
---
結果: 4/4 テスト成功`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="junit" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/junit" />
    </div>
  );
}

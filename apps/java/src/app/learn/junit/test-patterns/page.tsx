import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("junit");

export default function TestPatternsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">JUnit レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">テストパターン</h1>
        <p className="text-gray-400">Arrange-Act-Assert、テスト命名規則、テストカバレッジの考え方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">良いテストの原則</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          テストは書くだけでなく、読みやすく保守しやすいことが重要です。
          <code className="text-orange-300">AAA</code>（Arrange-Act-Assert）パターンに従い、
          わかりやすいテスト名を付けましょう。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><strong>Arrange</strong> - テストの前提条件を準備する</li>
          <li><strong>Act</strong> - テスト対象のメソッドを実行する</li>
          <li><strong>Assert</strong> - 結果を検証する</li>
          <li>1テスト1検証が理想（Single Assertion Principle）</li>
          <li>テスト名は「何を」「どんな状況で」「どうなるか」を表す</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Arrange-Act-Assertパターン</h2>
        <p className="text-gray-400 mb-4">
          各テストを<code className="text-orange-300">準備</code>、<code className="text-orange-300">実行</code>、
          <code className="text-orange-300">検証</code>の3つのセクションに分けて構造化します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.ArrayList;
import java.util.List;

class ShoppingCart {
    private List<String> items = new ArrayList<>();
    int getItemCount() { return items.size(); }
    void addItem(String item) { items.add(item); }
    void removeItem(String item) { items.remove(item); }
    boolean contains(String item) { return items.contains(item); }
    boolean isEmpty() { return items.isEmpty(); }
}

public class Main {
    static void test(String name, boolean result) {
        System.out.println((result ? "PASS" : "FAIL") + ": " + name);
    }

    public static void main(String[] args) {
        // テスト1: 商品を追加するとカウントが増える
        {
            // Arrange（準備）
            ShoppingCart cart = new ShoppingCart();

            // Act（実行）
            cart.addItem("りんご");

            // Assert（検証）
            test("商品追加_カウントが1になる", cart.getItemCount() == 1);
        }

        // テスト2: 商品を削除すると空になる
        {
            // Arrange
            ShoppingCart cart = new ShoppingCart();
            cart.addItem("バナナ");

            // Act
            cart.removeItem("バナナ");

            // Assert
            test("商品削除_カートが空になる", cart.isEmpty());
        }

        // テスト3: 追加した商品が含まれている
        {
            // Arrange
            ShoppingCart cart = new ShoppingCart();

            // Act
            cart.addItem("みかん");

            // Assert
            test("商品追加_追加した商品が含まれる", cart.contains("みかん"));
        }
    }
}`}
          expectedOutput={`PASS: 商品追加_カウントが1になる
PASS: 商品削除_カートが空になる
PASS: 商品追加_追加した商品が含まれる`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テスト命名規則</h2>
        <p className="text-gray-400 mb-4">
          テスト名は「メソッド名_状況_期待結果」のパターンで書くと、
          テストが失敗した時に何が問題かすぐわかります。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    // テスト対象メソッド
    static int divide(int a, int b) {
        if (b == 0) throw new ArithmeticException("ゼロ除算");
        return a / b;
    }

    static String classify(int score) {
        if (score >= 90) return "A";
        if (score >= 70) return "B";
        if (score >= 50) return "C";
        return "F";
    }

    static void test(String name, boolean result) {
        System.out.println((result ? "PASS" : "FAIL") + ": " + name);
    }

    public static void main(String[] args) {
        // 命名規則: メソッド名_状況_期待結果
        test("divide_正の数同士_正しい商を返す", divide(10, 2) == 5);
        test("divide_負の数を含む_正しい商を返す", divide(-10, 2) == -5);

        try {
            divide(1, 0);
            test("divide_ゼロで割る_ArithmeticExceptionを投げる", false);
        } catch (ArithmeticException e) {
            test("divide_ゼロで割る_ArithmeticExceptionを投げる", true);
        }

        test("classify_90以上_Aを返す", classify(95).equals("A"));
        test("classify_70以上90未満_Bを返す", classify(75).equals("B"));
        test("classify_50以上70未満_Cを返す", classify(55).equals("C"));
        test("classify_50未満_Fを返す", classify(30).equals("F"));

        // 境界値テスト
        test("classify_ちょうど90_Aを返す", classify(90).equals("A"));
        test("classify_ちょうど70_Bを返す", classify(70).equals("B"));
        test("classify_ちょうど50_Cを返す", classify(50).equals("C"));
    }
}`}
          expectedOutput={`PASS: divide_正の数同士_正しい商を返す
PASS: divide_負の数を含む_正しい商を返す
PASS: divide_ゼロで割る_ArithmeticExceptionを投げる
PASS: classify_90以上_Aを返す
PASS: classify_70以上90未満_Bを返す
PASS: classify_50以上70未満_Cを返す
PASS: classify_50未満_Fを返す
PASS: classify_ちょうど90_Aを返す
PASS: classify_ちょうど70_Bを返す
PASS: classify_ちょうど50_Cを返す`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テストカバレッジと境界値テスト</h2>
        <p className="text-gray-400 mb-4">
          テストカバレッジは全コードパスをどれだけテストしたかの指標です。
          特に境界値（ちょうどの値、直前の値）のテストが重要です。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    // テスト対象: パスワードバリデーション
    static String validatePassword(String password) {
        if (password == null) return "パスワードがnullです";
        if (password.length() < 8) return "8文字以上必要です";
        if (password.length() > 20) return "20文字以下にしてください";
        if (!password.matches(".*[A-Z].*")) return "大文字を含めてください";
        if (!password.matches(".*[0-9].*")) return "数字を含めてください";
        return "OK";
    }

    static void test(String name, String input, String expected) {
        String actual = validatePassword(input);
        boolean pass = actual.equals(expected);
        System.out.println((pass ? "PASS" : "FAIL") + ": " + name);
    }

    public static void main(String[] args) {
        System.out.println("--- 正常系 ---");
        test("有効なパスワード", "Abcdefg1", "OK");

        System.out.println("--- 異常系 ---");
        test("null入力", null, "パスワードがnullです");
        test("短すぎる(7文字)", "Abcdef1", "8文字以上必要です");
        test("大文字なし", "abcdefg1", "大文字を含めてください");
        test("数字なし", "Abcdefgh", "数字を含めてください");

        System.out.println("--- 境界値 ---");
        test("ちょうど8文字", "Abcdefg1", "OK");
        test("ちょうど20文字", "Abcdefghij1234567890", "OK");
        test("21文字(超過)", "Abcdefghij12345678901", "20文字以下にしてください");
    }
}`}
          expectedOutput={`--- 正常系 ---
PASS: 有効なパスワード
--- 異常系 ---
PASS: null入力
PASS: 短すぎる(7文字)
PASS: 大文字なし
PASS: 数字なし
--- 境界値 ---
PASS: ちょうど8文字
PASS: ちょうど20文字
PASS: 21文字(超過)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="junit" lessonId="test-patterns" />
      </div>
      <LessonNav lessons={lessons} currentId="test-patterns" basePath="/learn/junit" />
    </div>
  );
}

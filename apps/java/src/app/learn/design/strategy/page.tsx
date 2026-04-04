import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function StrategyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">デザインパターン レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Strategyパターン</h1>
        <p className="text-gray-400">インターフェース切り替え、ラムダで簡潔に</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Strategyパターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Strategyパターンは、アルゴリズムや処理をインターフェースで抽象化し、
          実行時に切り替えられるようにするパターンです。
          if-elseやswitch文の代わりに使うことで、Open/Closed原則に従ったコードになります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>Strategy - アルゴリズムのインターフェース</li>
          <li>ConcreteStrategy - 具体的なアルゴリズムの実装</li>
          <li>Context - Strategyを使用するクラス</li>
          <li>関数型インターフェースならラムダ式で簡潔に書ける</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">インターフェースによるStrategy</h2>
        <p className="text-gray-400 mb-4">
          支払い方法をStrategyパターンで切り替える例です。
          新しい支払い方法を追加しても既存コードを変更する必要がありません。
        </p>
        <JavaEditor
          defaultCode={`interface PaymentStrategy {
    void pay(int amount);
}

class CreditCardPayment implements PaymentStrategy {
    private String cardNumber;
    CreditCardPayment(String cardNumber) { this.cardNumber = cardNumber; }
    public void pay(int amount) {
        System.out.println("クレジットカード（" + cardNumber + "）: " + amount + "円");
    }
}

class PayPayPayment implements PaymentStrategy {
    private String userId;
    PayPayPayment(String userId) { this.userId = userId; }
    public void pay(int amount) {
        System.out.println("PayPay（" + userId + "）: " + amount + "円");
    }
}

class BankTransfer implements PaymentStrategy {
    public void pay(int amount) {
        System.out.println("銀行振込: " + amount + "円");
    }
}

// Context
class ShoppingCart {
    private PaymentStrategy strategy;

    public void setPaymentStrategy(PaymentStrategy strategy) {
        this.strategy = strategy;
    }

    public void checkout(int amount) {
        System.out.print("決済処理 → ");
        strategy.pay(amount);
    }
}

public class Main {
    public static void main(String[] args) {
        ShoppingCart cart = new ShoppingCart();

        cart.setPaymentStrategy(new CreditCardPayment("****-1234"));
        cart.checkout(5000);

        cart.setPaymentStrategy(new PayPayPayment("user_abc"));
        cart.checkout(1200);

        cart.setPaymentStrategy(new BankTransfer());
        cart.checkout(50000);
    }
}`}
          expectedOutput={`決済処理 → クレジットカード（****-1234）: 5000円
決済処理 → PayPay（user_abc）: 1200円
決済処理 → 銀行振込: 50000円`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ラムダ式によるStrategy</h2>
        <p className="text-gray-400 mb-4">
          Strategyインターフェースが関数型インターフェースの場合、
          ラムダ式で具象クラスを作らずに実装できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;
import java.util.function.Function;

class TextProcessor {
    private Function<String, String> strategy;

    TextProcessor(Function<String, String> strategy) {
        this.strategy = strategy;
    }

    String process(String text) {
        return strategy.apply(text);
    }
}

public class Main {
    public static void main(String[] args) {
        // ラムダでStrategyを定義（クラス不要！）
        TextProcessor upper = new TextProcessor(s -> s.toUpperCase());
        TextProcessor reverse = new TextProcessor(s ->
            new StringBuilder(s).reverse().toString());
        TextProcessor censor = new TextProcessor(s ->
            s.replaceAll("[aeiouAEIOU]", "*"));

        String text = "Hello World";
        System.out.println("原文:     " + text);
        System.out.println("大文字:   " + upper.process(text));
        System.out.println("反転:     " + reverse.process(text));
        System.out.println("母音隠し: " + censor.process(text));

        System.out.println();

        // ソートのStrategyをラムダで
        List<String> names = Arrays.asList("Charlie", "Alice", "Bob");
        System.out.println("元の順序:   " + names);

        names.sort((a, b) -> a.compareTo(b));
        System.out.println("昇順:       " + names);

        names.sort((a, b) -> b.compareTo(a));
        System.out.println("降順:       " + names);

        names.sort((a, b) -> Integer.compare(a.length(), b.length()));
        System.out.println("文字数順:   " + names);
    }
}`}
          expectedOutput={`原文:     Hello World
大文字:   HELLO WORLD
反転:     dlroW olleH
母音隠し: H*ll* W*rld

元の順序:   [Charlie, Alice, Bob]
昇順:       [Alice, Bob, Charlie]
降順:       [Charlie, Bob, Alice]
文字数順:   [Bob, Alice, Charlie]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Strategyパターンの実用例</h2>
        <p className="text-gray-400 mb-4">
          バリデーションルールをStrategyとして組み合わせる実践的な例です。
        </p>
        <JavaEditor
          defaultCode={`import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

class Validator {
    private List<Predicate<String>> rules = new ArrayList<>();
    private List<String> ruleNames = new ArrayList<>();

    void addRule(String name, Predicate<String> rule) {
        ruleNames.add(name);
        rules.add(rule);
    }

    void validate(String input) {
        System.out.println("検証: \\"" + input + "\\"");
        boolean allPassed = true;
        for (int i = 0; i < rules.size(); i++) {
            boolean passed = rules.get(i).test(input);
            System.out.println("  " + (passed ? "OK" : "NG") + " " + ruleNames.get(i));
            if (!passed) allPassed = false;
        }
        System.out.println("  結果: " + (allPassed ? "有効" : "無効"));
        System.out.println();
    }
}

public class Main {
    public static void main(String[] args) {
        Validator passwordValidator = new Validator();
        passwordValidator.addRule("8文字以上", s -> s.length() >= 8);
        passwordValidator.addRule("数字を含む", s -> s.matches(".*\\\\d.*"));
        passwordValidator.addRule("大文字を含む", s -> s.matches(".*[A-Z].*"));

        passwordValidator.validate("abc");
        passwordValidator.validate("abcdefgh");
        passwordValidator.validate("Abcdef1g");
    }
}`}
          expectedOutput={`検証: "abc"
  NG 8文字以上
  NG 数字を含む
  NG 大文字を含む
  結果: 無効

検証: "abcdefgh"
  OK 8文字以上
  NG 数字を含む
  NG 大文字を含む
  結果: 無効

検証: "Abcdef1g"
  OK 8文字以上
  OK 数字を含む
  OK 大文字を含む
  結果: 有効`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="strategy" />
      </div>
      <LessonNav lessons={lessons} currentId="strategy" basePath="/learn/design" />
    </div>
  );
}

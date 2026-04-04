import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lambda");

export default function FunctionalInterfacesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ラムダ式 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">関数型インターフェース</h1>
        <p className="text-gray-400">Predicate, Function, Consumer, Supplier と @FunctionalInterface</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">関数型インターフェースとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          関数型インターフェースは、抽象メソッドを1つだけ持つインターフェースです。
          <code className="text-orange-300">@FunctionalInterface</code> アノテーションを付けると、
          コンパイラが条件を満たしているかチェックしてくれます。
          Java標準ライブラリには <code className="text-orange-300">java.util.function</code> パッケージに
          多くの関数型インターフェースが用意されています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>Predicate&lt;T&gt;</code> — 条件判定（T → boolean）</li>
          <li><code>Function&lt;T, R&gt;</code> — 変換（T → R）</li>
          <li><code>Consumer&lt;T&gt;</code> — 消費（T → void）</li>
          <li><code>Supplier&lt;T&gt;</code> — 生成（() → T）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Predicate — 条件判定</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">Predicate&lt;T&gt;</code> は引数を受け取り、
          booleanを返します。<code className="text-orange-300">and</code>、<code className="text-orange-300">or</code>、
          <code className="text-orange-300">negate</code> で条件を組み合わせられます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.function.Predicate;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Predicate<Integer> isEven = n -> n % 2 == 0;
        Predicate<Integer> isPositive = n -> n > 0;

        // 単独の条件
        System.out.println("4は偶数? " + isEven.test(4));
        System.out.println("3は偶数? " + isEven.test(3));

        // 条件の組み合わせ
        Predicate<Integer> isEvenAndPositive = isEven.and(isPositive);
        List<Integer> numbers = Arrays.asList(-4, -1, 0, 3, 6, 7);
        List<Integer> result = numbers.stream()
            .filter(isEvenAndPositive)
            .collect(Collectors.toList());
        System.out.println("偶数かつ正: " + result);
    }
}`}
          expectedOutput={`4は偶数? true
3は偶数? false
偶数かつ正: [6]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Function と Consumer</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">Function&lt;T, R&gt;</code> は値を変換し、
          <code className="text-orange-300">Consumer&lt;T&gt;</code> は値を受け取って処理を実行します。
          <code className="text-orange-300">andThen</code> でチェーンできます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.function.Function;
import java.util.function.Consumer;

public class Main {
    public static void main(String[] args) {
        // Function: 変換
        Function<String, Integer> toLength = String::length;
        Function<Integer, String> toStars = n -> "*".repeat(n);

        // andThenでチェーン
        Function<String, String> toBar = toLength.andThen(toStars);
        System.out.println("Java -> " + toBar.apply("Java"));
        System.out.println("Hello -> " + toBar.apply("Hello"));

        // Consumer: 消費
        Consumer<String> greet = name -> System.out.println("こんにちは、" + name + "さん！");
        greet.accept("太郎");
        greet.accept("花子");
    }
}`}
          expectedOutput={`Java -> ****
Hello -> *****
こんにちは、太郎さん！
こんにちは、花子さん！`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Supplier と @FunctionalInterface</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">Supplier&lt;T&gt;</code> は引数なしで値を生成します。
          遅延評価やファクトリパターンに便利です。
        </p>
        <JavaEditor
          defaultCode={`import java.util.function.Supplier;
import java.util.Random;

public class Main {
    public static void main(String[] args) {
        // Supplier: 値の生成
        Supplier<String> greeting = () -> "Hello, World!";
        System.out.println(greeting.get());

        Supplier<Double> randomValue = () -> Math.floor(Math.random() * 100);

        // Supplierを使った遅延評価
        printIfTrue(true, () -> "条件はtrueです");
        printIfTrue(false, () -> "この文字列は生成されない");
    }

    static void printIfTrue(boolean condition, Supplier<String> messageSupplier) {
        if (condition) {
            System.out.println(messageSupplier.get());
        } else {
            System.out.println("条件はfalseです");
        }
    }
}`}
          expectedOutput={`Hello, World!
条件はtrueです
条件はfalseです`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="lambda" lessonId="functional-interfaces" />
      </div>
      <LessonNav lessons={lessons} currentId="functional-interfaces" basePath="/learn/lambda" />
    </div>
  );
}

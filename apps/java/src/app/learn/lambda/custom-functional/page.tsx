import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lambda");

export default function CustomFunctionalPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ラムダ式 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">カスタム関数型IF</h1>
        <p className="text-gray-400">独自の @FunctionalInterface を定義して活用する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">カスタム関数型インターフェースの作成</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          標準の関数型インターフェースで表現しきれない場合、独自の関数型インターフェースを定義できます。
          <code className="text-orange-300">@FunctionalInterface</code> アノテーションを付けると、
          抽象メソッドが1つであることをコンパイラが検証してくれます。
          ドメイン固有の操作を型安全に表現する場合に有用です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>抽象メソッドは必ず1つだけ</li>
          <li>デフォルトメソッドや静的メソッドは複数持てる</li>
          <li><code>@FunctionalInterface</code> は省略可能だが付けることを推奨</li>
          <li>ジェネリクスを使って汎用的に定義できる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なカスタム関数型IF</h2>
        <p className="text-gray-400 mb-4">
          2つの引数を受け取り、結果を返すカスタムインターフェースを作成します。
          <code className="text-orange-300">@FunctionalInterface</code> で安全性を確保します。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    @FunctionalInterface
    interface MathOperation {
        double calculate(double a, double b);
    }

    static double operate(double a, double b, MathOperation op) {
        return op.calculate(a, b);
    }

    public static void main(String[] args) {
        MathOperation add = (a, b) -> a + b;
        MathOperation multiply = (a, b) -> a * b;
        MathOperation power = (a, b) -> Math.pow(a, b);

        System.out.println("10 + 3 = " + operate(10, 3, add));
        System.out.println("10 * 3 = " + operate(10, 3, multiply));
        System.out.println("2 ^ 10 = " + operate(2, 10, power));
    }
}`}
          expectedOutput={`10 + 3 = 13.0
10 * 3 = 30.0
2 ^ 10 = 1024.0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ジェネリクスを使った関数型IF</h2>
        <p className="text-gray-400 mb-4">
          型パラメータを使うことで、さまざまな型に対応できる汎用的な関数型インターフェースを定義できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;

public class Main {
    @FunctionalInterface
    interface Transformer<T, R> {
        R transform(T input);
    }

    @FunctionalInterface
    interface Validator<T> {
        boolean validate(T input);
    }

    static <T> void printFiltered(List<T> items, Validator<T> validator,
                                   Transformer<T, String> formatter) {
        for (T item : items) {
            if (validator.validate(item)) {
                System.out.println(formatter.transform(item));
            }
        }
    }

    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        System.out.println("偶数のみ:");
        printFiltered(
            numbers,
            n -> n % 2 == 0,
            n -> "  " + n + " -> " + (n * n)
        );
    }
}`}
          expectedOutput={`偶数のみ:
  2 -> 4
  4 -> 16
  6 -> 36
  8 -> 64
  10 -> 100`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">デフォルトメソッドとチェーン</h2>
        <p className="text-gray-400 mb-4">
          関数型インターフェースにデフォルトメソッドを追加することで、
          メソッドチェーンのような合成パターンを実現できます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    @FunctionalInterface
    interface StringProcessor {
        String process(String input);

        default StringProcessor andThen(StringProcessor after) {
            return input -> after.process(this.process(input));
        }
    }

    public static void main(String[] args) {
        StringProcessor trim = String::trim;
        StringProcessor toUpper = String::toUpperCase;
        StringProcessor addBrackets = s -> "[" + s + "]";

        // チェーンで合成
        StringProcessor pipeline = trim
            .andThen(toUpper)
            .andThen(addBrackets);

        System.out.println(pipeline.process("  hello world  "));
        System.out.println(pipeline.process("  java lambda  "));
    }
}`}
          expectedOutput={`[HELLO WORLD]
[JAVA LAMBDA]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="lambda" lessonId="custom-functional" />
      </div>
      <LessonNav lessons={lessons} currentId="custom-functional" basePath="/learn/lambda" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("optional");

export default function IfPresentPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">Optional レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ifPresent</h1>
        <p className="text-gray-400">ifPresent と ifPresentOrElse（Java 9+）で値の有無に応じた処理</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ifPresentとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">ifPresent()</code> は値が存在する場合にのみ、
          指定したConsumerを実行します。値がない場合は何も起きません。
          Java 9では <code className="text-orange-300">ifPresentOrElse()</code> が追加され、
          値がない場合の処理も指定できるようになりました。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>ifPresent(Consumer)</code> — 値があれば処理を実行</li>
          <li><code>ifPresentOrElse(Consumer, Runnable)</code> — 値の有無で分岐（Java 9+）</li>
          <li><code>or(Supplier)</code> — 空なら別のOptionalを返す（Java 9+）</li>
          <li><code>stream()</code> — OptionalをStreamに変換（Java 9+）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ifPresentの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">ifPresent()</code> は
          if文でのnullチェックを置き換える安全な方法です。
          値が存在する場合のみConsumerが実行されます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Optional;

public class Main {
    public static void main(String[] args) {
        Optional<String> present = Optional.of("Java");
        Optional<String> empty = Optional.empty();

        // ifPresent: 値があれば処理
        System.out.print("present: ");
        present.ifPresent(v -> System.out.println("値は " + v));

        System.out.print("empty: ");
        empty.ifPresent(v -> System.out.println("値は " + v));
        System.out.println("(何も出力されない)");

        // メソッド参照でも使える
        Optional<String> message = Optional.of("Hello, Optional!");
        message.ifPresent(System.out::println);
    }
}`}
          expectedOutput={`present: 値は Java
empty: (何も出力されない)
Hello, Optional!`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ifPresentOrElse（Java 9+）</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">ifPresentOrElse()</code> は値がある場合のConsumerと、
          ない場合のRunnableの両方を指定できます。if-else文の代替として使えます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Optional;

public class Main {
    static Optional<String> findUserName(int id) {
        if (id == 1) return Optional.of("Alice");
        if (id == 2) return Optional.of("Bob");
        return Optional.empty();
    }

    public static void main(String[] args) {
        // ifPresentOrElse: 値の有無で分岐
        findUserName(1).ifPresentOrElse(
            name -> System.out.println("ユーザー: " + name),
            () -> System.out.println("ユーザーが見つかりません")
        );

        findUserName(99).ifPresentOrElse(
            name -> System.out.println("ユーザー: " + name),
            () -> System.out.println("ユーザーが見つかりません")
        );
    }
}`}
          expectedOutput={`ユーザー: Alice
ユーザーが見つかりません`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">or と stream（Java 9+）</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">or()</code> は値が空の場合に別のOptionalを返します。
          <code className="text-orange-300">stream()</code> はOptionalを0個または1個の要素を持つStreamに変換します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Optional;
import java.util.List;
import java.util.Arrays;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        // or: 空なら別のOptionalを試す
        Optional<String> primary = Optional.empty();
        Optional<String> fallback = Optional.of("フォールバック値");

        String result = primary
            .or(() -> fallback)
            .orElse("デフォルト");
        System.out.println("or結果: " + result);

        // stream: OptionalをStreamに変換
        List<Optional<String>> optionals = Arrays.asList(
            Optional.of("A"),
            Optional.empty(),
            Optional.of("B"),
            Optional.empty(),
            Optional.of("C")
        );

        // 値があるOptionalだけ取り出す
        List<String> values = optionals.stream()
            .flatMap(Optional::stream)
            .collect(Collectors.toList());
        System.out.println("値のみ: " + values);
    }
}`}
          expectedOutput={`or結果: フォールバック値
値のみ: [A, B, C]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="optional" lessonId="ifpresent" />
      </div>
      <LessonNav lessons={lessons} currentId="ifpresent" basePath="/learn/optional" />
    </div>
  );
}

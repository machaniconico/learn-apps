import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("optional");

export default function OptionalBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">Optional レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Optionalの基本</h1>
        <p className="text-gray-400">Optional.of、empty、ofNullable で値の有無を安全に扱う</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Optionalとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">Optional&lt;T&gt;</code> はJava 8で導入された、
          値が存在するかもしれないし、しないかもしれないことを明示的に表現するコンテナクラスです。
          nullを直接扱う代わりにOptionalを使うことで、NullPointerExceptionを防ぎ、
          値の有無に対する処理を安全かつ読みやすく記述できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>Optional.of(value)</code> — null以外の値を包む（nullでNPE）</li>
          <li><code>Optional.empty()</code> — 空のOptionalを作成</li>
          <li><code>Optional.ofNullable(value)</code> — nullならempty、そうでなければof</li>
          <li><code>isPresent()</code> / <code>isEmpty()</code> — 値の有無を確認</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Optionalの作成</h2>
        <p className="text-gray-400 mb-4">
          Optionalを作成する3つの方法を紹介します。
          <code className="text-orange-300">of()</code> はnullを渡すと例外が発生するので、
          nullの可能性がある場合は <code className="text-orange-300">ofNullable()</code> を使います。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Optional;

public class Main {
    public static void main(String[] args) {
        // of: null以外の値を包む
        Optional<String> opt1 = Optional.of("Hello");
        System.out.println("of: " + opt1);

        // empty: 空のOptional
        Optional<String> opt2 = Optional.empty();
        System.out.println("empty: " + opt2);

        // ofNullable: nullならempty
        String value = null;
        Optional<String> opt3 = Optional.ofNullable(value);
        System.out.println("ofNullable(null): " + opt3);

        Optional<String> opt4 = Optional.ofNullable("World");
        System.out.println("ofNullable(World): " + opt4);
    }
}`}
          expectedOutput={`of: Optional[Hello]
empty: Optional.empty
ofNullable(null): Optional.empty
ofNullable(World): Optional[World]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">isPresentとisEmpty</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">isPresent()</code> は値が存在する場合にtrue、
          <code className="text-orange-300">isEmpty()</code>（Java 11+）は値が空の場合にtrueを返します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Optional;

public class Main {
    public static void main(String[] args) {
        Optional<String> present = Optional.of("Java");
        Optional<String> empty = Optional.empty();

        System.out.println("present.isPresent(): " + present.isPresent());
        System.out.println("empty.isPresent(): " + empty.isPresent());
        System.out.println("present.isEmpty(): " + present.isEmpty());
        System.out.println("empty.isEmpty(): " + empty.isEmpty());
    }
}`}
          expectedOutput={`present.isPresent(): true
empty.isPresent(): false
present.isEmpty(): false
empty.isEmpty(): true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Optionalを返すメソッド</h2>
        <p className="text-gray-400 mb-4">
          メソッドの戻り値としてOptionalを使うことで、
          呼び出し側にnullチェックの必要性を明示できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Optional;
import java.util.HashMap;
import java.util.Map;

public class Main {
    static Map<String, String> capitals = new HashMap<>();
    static {
        capitals.put("Japan", "Tokyo");
        capitals.put("France", "Paris");
        capitals.put("Germany", "Berlin");
    }

    // Optionalを返すメソッド
    static Optional<String> findCapital(String country) {
        return Optional.ofNullable(capitals.get(country));
    }

    public static void main(String[] args) {
        // 存在する場合
        Optional<String> result1 = findCapital("Japan");
        System.out.println("Japan: " + result1);

        // 存在しない場合
        Optional<String> result2 = findCapital("Spain");
        System.out.println("Spain: " + result2);

        // 安全に値を取得
        String capital = findCapital("France").orElse("不明");
        System.out.println("Franceの首都: " + capital);

        String unknown = findCapital("Italy").orElse("不明");
        System.out.println("Italyの首都: " + unknown);
    }
}`}
          expectedOutput={`Japan: Optional[Tokyo]
Spain: Optional.empty
Franceの首都: Paris
Italyの首都: 不明`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="optional" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/optional" />
    </div>
  );
}

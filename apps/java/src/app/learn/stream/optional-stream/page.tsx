import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stream");

export default function OptionalStreamPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">Stream API レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">StreamとOptional</h1>
        <p className="text-gray-400">findFirst、findAny、min/max でStreamから値を取得する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">StreamとOptionalの関係</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Streamの一部の終端操作は結果が空になる可能性があるため、
          <code className="text-orange-300">Optional</code> を返します。
          これにより、NullPointerExceptionを防ぎ、値の有無を安全に扱えます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>findFirst()</code> — 最初の要素をOptionalで返す</li>
          <li><code>findAny()</code> — いずれかの要素をOptionalで返す（並列時に有用）</li>
          <li><code>min(Comparator)</code> / <code>max(Comparator)</code> — 最小・最大値</li>
          <li><code>reduce()</code> — 初期値なしの場合Optionalを返す</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">findFirst と findAny</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">findFirst()</code> は順序通り最初の要素を、
          <code className="text-orange-300">findAny()</code> は任意の要素を返します。
          逐次Streamでは結果は同じですが、並列Streamでは <code className="text-orange-300">findAny()</code> の方が高速です。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "Anna", "Alex");

        // findFirst: 最初にAで始まる名前
        Optional<String> first = names.stream()
            .filter(n -> n.startsWith("A"))
            .findFirst();
        System.out.println("最初のA: " + first.orElse("なし"));

        // 空の結果
        Optional<String> notFound = names.stream()
            .filter(n -> n.startsWith("Z"))
            .findFirst();
        System.out.println("Zで始まる名前: " + notFound.orElse("なし"));

        // findAny（逐次では findFirst と同じ結果）
        Optional<String> any = names.stream()
            .filter(n -> n.length() == 3)
            .findAny();
        System.out.println("3文字の名前: " + any.orElse("なし"));
    }
}`}
          expectedOutput={`最初のA: Alice
Zで始まる名前: なし
3文字の名前: Bob`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">min と max</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">min()</code> と <code className="text-orange-300">max()</code> は
          Comparatorに基づいて最小・最大要素を返します。結果は <code className="text-orange-300">Optional</code> です。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;
import java.util.Comparator;
import java.util.Optional;

public class Main {
    public static void main(String[] args) {
        List<String> words = Arrays.asList("Java", "Go", "Python", "Rust", "C");

        // 最も短い文字列
        Optional<String> shortest = words.stream()
            .min(Comparator.comparing(String::length));
        System.out.println("最短: " + shortest.orElse(""));

        // 最も長い文字列
        Optional<String> longest = words.stream()
            .max(Comparator.comparing(String::length));
        System.out.println("最長: " + longest.orElse(""));

        // 数値の最小・最大
        List<Integer> scores = Arrays.asList(85, 92, 78, 95, 60);
        int maxScore = scores.stream()
            .max(Comparator.naturalOrder())
            .orElse(0);
        int minScore = scores.stream()
            .min(Comparator.naturalOrder())
            .orElse(0);
        System.out.println("最高点: " + maxScore);
        System.out.println("最低点: " + minScore);
    }
}`}
          expectedOutput={`最短: C
最長: Python
最高点: 95
最低点: 60`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">anyMatch・allMatch・noneMatch</h2>
        <p className="text-gray-400 mb-4">
          条件に合う要素があるかをbooleanで返す終端操作です。
          Optionalは返しませんが、Streamの検索系操作として重要です。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(2, 4, 6, 8, 10);

        // anyMatch: いずれかが条件を満たすか
        boolean hasOdd = numbers.stream().anyMatch(n -> n % 2 != 0);
        System.out.println("奇数あり? " + hasOdd);

        // allMatch: すべてが条件を満たすか
        boolean allEven = numbers.stream().allMatch(n -> n % 2 == 0);
        System.out.println("すべて偶数? " + allEven);

        // noneMatch: どれも条件を満たさないか
        boolean noNegative = numbers.stream().noneMatch(n -> n < 0);
        System.out.println("負の数なし? " + noNegative);

        // 実用例: リストに特定の文字列が含まれるか
        List<String> langs = Arrays.asList("Java", "Python", "Rust");
        boolean hasJava = langs.stream().anyMatch(l -> l.equals("Java"));
        boolean hasGo = langs.stream().anyMatch(l -> l.equals("Go"));
        System.out.println("Java含む? " + hasJava);
        System.out.println("Go含む? " + hasGo);
    }
}`}
          expectedOutput={`奇数あり? false
すべて偶数? true
負の数なし? true
Java含む? true
Go含む? false`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="stream" lessonId="optional-stream" />
      </div>
      <LessonNav lessons={lessons} currentId="optional-stream" basePath="/learn/stream" />
    </div>
  );
}

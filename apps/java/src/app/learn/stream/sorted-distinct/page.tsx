import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stream");

export default function SortedDistinctPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">Stream API レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">sorted・distinct</h1>
        <p className="text-gray-400">Comparatorでのソートと重複除去</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">sorted と distinct</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">sorted()</code> はStreamの要素をソートし、
          <code className="text-orange-300">distinct()</code> は重複する要素を除去します。
          どちらもStream自体は新しいStreamを返す中間操作です。
          sortedにはComparatorを渡してカスタムソートも可能です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>sorted()</code> — 自然順序でソート（Comparable実装が必要）</li>
          <li><code>sorted(Comparator)</code> — カスタム順序でソート</li>
          <li><code>distinct()</code> — equals()に基づく重複除去</li>
          <li><code>limit(n)</code> / <code>skip(n)</code> — 上位n件の取得やスキップ</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">sortedでソート</h2>
        <p className="text-gray-400 mb-4">
          引数なしの <code className="text-orange-300">sorted()</code> は自然順序（昇順）でソートします。
          <code className="text-orange-300">Comparator</code> を渡すとカスタムソートが可能です。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(5, 3, 8, 1, 9, 2, 7);

        // 自然順序（昇順）
        List<Integer> asc = numbers.stream()
            .sorted()
            .collect(Collectors.toList());
        System.out.println("昇順: " + asc);

        // 降順
        List<Integer> desc = numbers.stream()
            .sorted(Comparator.reverseOrder())
            .collect(Collectors.toList());
        System.out.println("降順: " + desc);

        // 文字列を長さでソート
        List<String> words = Arrays.asList("banana", "fig", "apple", "date", "cherry");
        List<String> byLength = words.stream()
            .sorted(Comparator.comparing(String::length))
            .collect(Collectors.toList());
        System.out.println("長さ順: " + byLength);
    }
}`}
          expectedOutput={`昇順: [1, 2, 3, 5, 7, 8, 9]
降順: [9, 8, 7, 5, 3, 2, 1]
長さ順: [fig, date, apple, banana, cherry]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">distinctで重複除去</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">distinct()</code> は <code className="text-orange-300">equals()</code>
          メソッドに基づいて重複を除去します。sortedと組み合わせることも多いです。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5);

        // 重複除去
        List<Integer> unique = numbers.stream()
            .distinct()
            .collect(Collectors.toList());
        System.out.println("重複除去: " + unique);

        // 重複除去 + ソート
        List<Integer> sortedUnique = numbers.stream()
            .distinct()
            .sorted()
            .collect(Collectors.toList());
        System.out.println("重複除去+ソート: " + sortedUnique);

        // 文字列の重複除去（大文字小文字を統一）
        List<String> words = Arrays.asList("Java", "java", "JAVA", "Python", "python");
        List<String> uniqueWords = words.stream()
            .map(String::toLowerCase)
            .distinct()
            .collect(Collectors.toList());
        System.out.println("ユニーク: " + uniqueWords);
    }
}`}
          expectedOutput={`重複除去: [3, 1, 4, 5, 9, 2, 6]
重複除去+ソート: [1, 2, 3, 4, 5, 6, 9]
ユニーク: [java, python]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">limit と skip</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">limit(n)</code> で先頭n件を取得、
          <code className="text-orange-300">skip(n)</code> で先頭n件をスキップします。
          ページネーションなどのパターンで活用できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;
import java.util.Comparator;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<Integer> scores = Arrays.asList(85, 92, 78, 95, 60, 88, 73, 99);

        // 上位3件
        List<Integer> top3 = scores.stream()
            .sorted(Comparator.reverseOrder())
            .limit(3)
            .collect(Collectors.toList());
        System.out.println("上位3件: " + top3);

        // 2件スキップして3件取得（ページネーション的）
        List<Integer> page = scores.stream()
            .sorted(Comparator.reverseOrder())
            .skip(2)
            .limit(3)
            .collect(Collectors.toList());
        System.out.println("3~5位: " + page);
    }
}`}
          expectedOutput={`上位3件: [99, 95, 92]
3~5位: [92, 88, 85]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="stream" lessonId="sorted-distinct" />
      </div>
      <LessonNav lessons={lessons} currentId="sorted-distinct" basePath="/learn/stream" />
    </div>
  );
}

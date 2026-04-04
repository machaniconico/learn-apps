import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stream");

export default function ReducePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">Stream API レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">reduce</h1>
        <p className="text-gray-400">identity と accumulator でストリームを単一の値に集約する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">reduceとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">reduce()</code> はStreamの全要素を1つの値に集約する終端操作です。
          初期値（identity）と累積関数（accumulator）を指定して、要素を順番に処理します。
          合計、最大値、文字列結合など、様々な集約処理に使えます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>reduce(identity, accumulator)</code> — 初期値付きで結果はT型</li>
          <li><code>reduce(accumulator)</code> — 初期値なしで結果はOptional&lt;T&gt;</li>
          <li>accumulatorは <code>(累積値, 現在の要素) -&gt; 新しい累積値</code></li>
          <li>sum()、count()、min()、max() も内部的にはreduce相当</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なreduce</h2>
        <p className="text-gray-400 mb-4">
          初期値（identity）を指定するバージョンでは、空のStreamでも初期値が返ります。
          合計や積を計算する基本パターンです。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // 合計（初期値0）
        int sum = numbers.stream()
            .reduce(0, (a, b) -> a + b);
        System.out.println("合計: " + sum);

        // 積（初期値1）
        int product = numbers.stream()
            .reduce(1, (a, b) -> a * b);
        System.out.println("積: " + product);

        // Integerのメソッド参照を使用
        int sum2 = numbers.stream()
            .reduce(0, Integer::sum);
        System.out.println("合計(メソッド参照): " + sum2);
    }
}`}
          expectedOutput={`合計: 15
積: 120
合計(メソッド参照): 15`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Optionalを返すreduce</h2>
        <p className="text-gray-400 mb-4">
          初期値なしの <code className="text-orange-300">reduce()</code> は
          <code className="text-orange-300">Optional</code> を返します。
          空のStreamの場合に安全に処理できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Collections;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(3, 1, 4, 1, 5, 9, 2, 6);

        // 最大値（Optional）
        Optional<Integer> max = numbers.stream()
            .reduce(Integer::max);
        System.out.println("最大値: " + max.orElse(0));

        // 最小値（Optional）
        Optional<Integer> min = numbers.stream()
            .reduce(Integer::min);
        System.out.println("最小値: " + min.orElse(0));

        // 空リストの場合
        List<Integer> empty = Collections.emptyList();
        Optional<Integer> result = empty.stream()
            .reduce(Integer::sum);
        System.out.println("空リストの合計: " + result.orElse(0));
    }
}`}
          expectedOutput={`最大値: 9
最小値: 1
空リストの合計: 0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列の結合とカスタム集約</h2>
        <p className="text-gray-400 mb-4">
          reduceは数値だけでなく、文字列の結合やカスタムオブジェクトの集約にも使えます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> words = Arrays.asList("Java", "Stream", "API", "is", "powerful");

        // 文字列結合
        String sentence = words.stream()
            .reduce("", (a, b) -> a.isEmpty() ? b : a + " " + b);
        System.out.println(sentence);

        // 最も長い文字列
        String longest = words.stream()
            .reduce("", (a, b) -> a.length() >= b.length() ? a : b);
        System.out.println("最長: " + longest);

        // filter + map + reduceの組み合わせ
        List<Integer> scores = Arrays.asList(85, 92, 78, 95, 60, 88);
        int highScoreSum = scores.stream()
            .filter(s -> s >= 80)
            .map(s -> s - 80)       // 80点超過分
            .reduce(0, Integer::sum);
        System.out.println("80点超過分の合計: " + highScoreSum);
    }
}`}
          expectedOutput={`Java Stream API is powerful
最長: powerful
80点超過分の合計: 40`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="stream" lessonId="reduce" />
      </div>
      <LessonNav lessons={lessons} currentId="reduce" basePath="/learn/stream" />
    </div>
  );
}

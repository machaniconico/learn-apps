import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stream");

export default function ParallelStreamPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">Stream API レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">並列Stream</h1>
        <p className="text-gray-400">parallelStream の使い方と注意点</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">並列Streamとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          並列Streamはマルチスレッドで要素を並行処理する仕組みです。
          <code className="text-orange-300">parallelStream()</code> または
          <code className="text-orange-300">stream().parallel()</code> で並列Streamに切り替えられます。
          大量データの処理で性能向上が期待できますが、いくつかの注意点があります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>parallelStream()</code> でコレクションから並列Streamを作成</li>
          <li><code>stream().parallel()</code> で既存Streamを並列に変換</li>
          <li>内部的にForkJoinPoolを使用してスレッド分割</li>
          <li>要素の処理順序は保証されない（forEachの場合）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">parallelStreamの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">parallelStream()</code> を使うと、
          Streamの処理が複数スレッドで並行実行されます。
          結果の順序を保持するには <code className="text-orange-300">forEachOrdered()</code> を使います。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // 並列Streamで二乗の合計
        int sum = numbers.parallelStream()
            .map(n -> n * n)
            .reduce(0, Integer::sum);
        System.out.println("二乗の合計: " + sum);

        // collectは順序を保持
        List<Integer> squared = numbers.parallelStream()
            .map(n -> n * n)
            .collect(Collectors.toList());
        System.out.println("二乗リスト: " + squared);
    }
}`}
          expectedOutput={`二乗の合計: 385
二乗リスト: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">並列と逐次の切り替え</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">parallel()</code> と <code className="text-orange-300">sequential()</code>
          でStreamの並列/逐次を途中で切り替えることもできます。
          <code className="text-orange-300">isParallel()</code> で確認できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // 逐次Stream
        Stream<Integer> seq = numbers.stream();
        System.out.println("逐次? " + !seq.isParallel());

        // 並列に切り替え
        Stream<Integer> par = numbers.stream().parallel();
        System.out.println("並列? " + par.isParallel());

        // 並列Streamでの集約
        long count = numbers.parallelStream()
            .filter(n -> n % 2 != 0)
            .count();
        System.out.println("奇数の個数: " + count);

        // parallelStreamでも結果は同じ
        int sum1 = numbers.stream().reduce(0, Integer::sum);
        int sum2 = numbers.parallelStream().reduce(0, Integer::sum);
        System.out.println("逐次合計: " + sum1);
        System.out.println("並列合計: " + sum2);
    }
}`}
          expectedOutput={`逐次? true
並列? true
奇数の個数: 3
逐次合計: 15
並列合計: 15`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">並列Streamの注意点</h2>
        <p className="text-gray-400 mb-4">
          並列Streamでは副作用のある操作や共有状態の変更は避けるべきです。
          スレッドセーフでないコレクションへの直接操作は競合を引き起こします。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        List<String> words = Arrays.asList(
            "apple", "banana", "avocado", "blueberry",
            "cherry", "apricot", "blackberry", "coconut"
        );

        // 安全: collectを使う（内部でスレッドセーフに処理）
        Map<Character, List<String>> grouped = words.parallelStream()
            .collect(Collectors.groupingBy(w -> w.charAt(0)));

        grouped.forEach((key, value) ->
            System.out.println(key + ": " + value));

        System.out.println("---");

        // 並列が有効なケース: 独立した重い計算
        long primeCount = java.util.stream.LongStream.rangeClosed(2, 10000)
            .parallel()
            .filter(Main::isPrime)
            .count();
        System.out.println("2~10000の素数: " + primeCount + "個");
    }

    static boolean isPrime(long n) {
        if (n < 2) return false;
        for (long i = 2; i * i <= n; i++) {
            if (n % i == 0) return false;
        }
        return true;
    }
}`}
          expectedOutput={`a: [apple, avocado, apricot]
b: [banana, blueberry, blackberry]
c: [cherry, coconut]
---
2~10000の素数: 1229個`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="stream" lessonId="parallel-stream" />
      </div>
      <LessonNav lessons={lessons} currentId="parallel-stream" basePath="/learn/stream" />
    </div>
  );
}

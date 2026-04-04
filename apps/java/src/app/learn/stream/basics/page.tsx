import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stream");

export default function StreamBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">Stream API レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Streamの基本</h1>
        <p className="text-gray-400">Stream.of、list.stream()、IntStream.range でStreamを作成する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Stream APIとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Stream APIはJava 8で導入された、コレクションのデータ処理を宣言的に記述するための機能です。
          for文やイテレータで手動的にループを書く代わりに、filter・map・reduceなどの操作を
          パイプラインとして連鎖させます。Streamは一度しか消費できず、元のコレクションを変更しません。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>Stream.of()</code> — 要素を直接指定してStream作成</li>
          <li><code>collection.stream()</code> — コレクションからStream作成</li>
          <li><code>IntStream.range()</code> / <code>rangeClosed()</code> — 数値範囲のStream</li>
          <li>中間操作（lazy）と終端操作（eager）の2種類がある</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Streamの作成方法</h2>
        <p className="text-gray-400 mb-4">
          Streamを作成する代表的な方法を紹介します。
          <code className="text-orange-300">Stream.of()</code> で直接要素を、
          <code className="text-orange-300">stream()</code> でコレクションから、
          <code className="text-orange-300">Arrays.stream()</code> で配列からStreamを作成できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) {
        // Stream.of() で作成
        Stream<String> s1 = Stream.of("A", "B", "C");
        s1.forEach(System.out::print);
        System.out.println();

        // List から作成
        List<String> list = Arrays.asList("X", "Y", "Z");
        list.stream().forEach(System.out::print);
        System.out.println();

        // 配列から作成
        int[] nums = {1, 2, 3, 4, 5};
        Arrays.stream(nums).forEach(System.out::print);
        System.out.println();
    }
}`}
          expectedOutput={`ABC
XYZ
12345`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">IntStream による数値範囲</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">IntStream.range()</code> は終了値を含まず、
          <code className="text-orange-300">rangeClosed()</code> は終了値を含みます。
          合計や平均値なども簡単に計算できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.stream.IntStream;

public class Main {
    public static void main(String[] args) {
        // range: 1から4まで（5を含まない）
        System.out.print("range(1,5): ");
        IntStream.range(1, 5).forEach(n -> System.out.print(n + " "));
        System.out.println();

        // rangeClosed: 1から5まで（5を含む）
        System.out.print("rangeClosed(1,5): ");
        IntStream.rangeClosed(1, 5).forEach(n -> System.out.print(n + " "));
        System.out.println();

        // 合計
        int sum = IntStream.rangeClosed(1, 10).sum();
        System.out.println("1~10の合計: " + sum);

        // 平均
        double avg = IntStream.rangeClosed(1, 10).average().orElse(0);
        System.out.println("1~10の平均: " + avg);
    }
}`}
          expectedOutput={`range(1,5): 1 2 3 4
rangeClosed(1,5): 1 2 3 4 5
1~10の合計: 55
1~10の平均: 5.5`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">中間操作と終端操作</h2>
        <p className="text-gray-400 mb-4">
          中間操作は新しいStreamを返し、終端操作で初めて処理が実行されます（遅延評価）。
          この仕組みにより、不要な計算をスキップして効率的に処理できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // 中間操作: filter, map（遅延評価）
        // 終端操作: collect（ここで実行される）
        List<String> result = numbers.stream()
            .filter(n -> n % 2 == 0)         // 偶数のみ
            .map(n -> n + "は偶数")           // 文字列に変換
            .collect(Collectors.toList());    // リストに収集

        result.forEach(System.out::println);
    }
}`}
          expectedOutput={`2は偶数
4は偶数
6は偶数
8は偶数
10は偶数`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="stream" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/stream" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stream");

export default function FlatMapPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">Stream API レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">flatMap</h1>
        <p className="text-gray-400">ネストの解消と List&lt;List&lt;T&gt;&gt; のフラット化</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">flatMapとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">flatMap()</code> は各要素をStreamに変換し、
          それらを1つのStreamに平坦化（フラット化）します。
          <code className="text-orange-300">map()</code> が1対1の変換であるのに対し、
          <code className="text-orange-300">flatMap()</code> は1対多の変換に対応します。
          ネストされたコレクションを扱う際に非常に便利です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>map()</code> — 各要素を1つの値に変換（1対1）</li>
          <li><code>flatMap()</code> — 各要素をStreamに変換し、結果を1つのStreamに統合（1対多）</li>
          <li>ネストされた <code>List&lt;List&lt;T&gt;&gt;</code> を <code>List&lt;T&gt;</code> にフラット化</li>
          <li>文字列を文字のStreamに分解するなどの用途にも使用</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">リストのフラット化</h2>
        <p className="text-gray-400 mb-4">
          ネストされたリスト（リストのリスト）を1つのリストにフラット化する、
          flatMapの最も典型的な使い方です。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<List<Integer>> nested = Arrays.asList(
            Arrays.asList(1, 2, 3),
            Arrays.asList(4, 5),
            Arrays.asList(6, 7, 8, 9)
        );

        // mapだとStream<List<Integer>>のまま
        // flatMapでStream<Integer>にフラット化
        List<Integer> flat = nested.stream()
            .flatMap(List::stream)
            .collect(Collectors.toList());

        System.out.println("フラット化: " + flat);
        System.out.println("合計: " + flat.stream().mapToInt(Integer::intValue).sum());
    }
}`}
          expectedOutput={`フラット化: [1, 2, 3, 4, 5, 6, 7, 8, 9]
合計: 45`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列の分解</h2>
        <p className="text-gray-400 mb-4">
          文章を単語に分解したり、文字列を文字ごとのStreamに変換する場合にも
          <code className="text-orange-300">flatMap()</code> が活用できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<String> sentences = Arrays.asList(
            "Java is fun",
            "Stream API rocks",
            "flatMap is powerful"
        );

        // 文章を単語に分解
        List<String> words = sentences.stream()
            .flatMap(s -> Arrays.stream(s.split(" ")))
            .collect(Collectors.toList());
        System.out.println("単語: " + words);

        // ユニークな単語（小文字）を取得
        List<String> unique = sentences.stream()
            .flatMap(s -> Arrays.stream(s.split(" ")))
            .map(String::toLowerCase)
            .distinct()
            .sorted()
            .collect(Collectors.toList());
        System.out.println("ユニーク: " + unique);
    }
}`}
          expectedOutput={`単語: [Java, is, fun, Stream, API, rocks, flatMap, is, powerful]
ユニーク: [api, flatmap, fun, is, java, powerful, rocks, stream]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">mapとflatMapの比較</h2>
        <p className="text-gray-400 mb-4">
          mapとflatMapの違いを同じデータで比較します。
          mapでは結果がネストされますが、flatMapではフラットになります。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<String> words = Arrays.asList("Hello", "World");

        // mapの場合: List<String[]> になる
        List<String[]> mapped = words.stream()
            .map(w -> w.split(""))
            .collect(Collectors.toList());
        System.out.println("map結果の要素数: " + mapped.size());
        for (String[] arr : mapped) {
            System.out.println("  " + Arrays.toString(arr));
        }

        // flatMapの場合: List<String> になる
        List<String> flatMapped = words.stream()
            .flatMap(w -> Arrays.stream(w.split("")))
            .distinct()
            .collect(Collectors.toList());
        System.out.println("flatMap結果: " + flatMapped);
    }
}`}
          expectedOutput={`map結果の要素数: 2
  [H, e, l, l, o]
  [W, o, r, l, d]
flatMap結果: [H, e, l, o, W, r, d]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="stream" lessonId="flatmap" />
      </div>
      <LessonNav lessons={lessons} currentId="flatmap" basePath="/learn/stream" />
    </div>
  );
}

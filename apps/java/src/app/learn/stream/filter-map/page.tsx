import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stream");

export default function FilterMapPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">Stream API レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">filter・map</h1>
        <p className="text-gray-400">中間操作の連鎖でデータを絞り込み・変換する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">filterとmapの基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">filter()</code> は条件に合う要素だけを残し、
          <code className="text-orange-300">map()</code> は各要素を別の値に変換します。
          これらは中間操作なので、何度でも連鎖させてパイプラインを構築できます。
          終端操作が呼ばれるまで実際の処理は実行されません。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>filter(Predicate)</code> — 条件に一致する要素のみ通す</li>
          <li><code>map(Function)</code> — 各要素を変換して新しいStreamを返す</li>
          <li><code>mapToInt()</code> / <code>mapToDouble()</code> — プリミティブ型Streamへの変換</li>
          <li>中間操作は複数連鎖可能で、パイプラインを構成する</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">filterで絞り込む</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">filter()</code> に <code className="text-orange-300">Predicate</code> を渡して、
          条件に合う要素だけを残します。複数のfilterを連鎖させることもできます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);

        // 偶数のみ
        List<Integer> evens = numbers.stream()
            .filter(n -> n % 2 == 0)
            .collect(Collectors.toList());
        System.out.println("偶数: " + evens);

        // 複数条件: 3の倍数かつ5以上
        List<Integer> filtered = numbers.stream()
            .filter(n -> n % 3 == 0)
            .filter(n -> n >= 5)
            .collect(Collectors.toList());
        System.out.println("3の倍数かつ5以上: " + filtered);
    }
}`}
          expectedOutput={`偶数: [2, 4, 6, 8, 10, 12]
3の倍数かつ5以上: [6, 9, 12]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">mapで変換する</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">map()</code> は各要素を別の型や値に変換します。
          文字列操作やオブジェクトのプロパティ抽出でよく使われます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<String> words = Arrays.asList("hello", "world", "java", "stream");

        // 大文字に変換
        List<String> upper = words.stream()
            .map(String::toUpperCase)
            .collect(Collectors.toList());
        System.out.println("大文字: " + upper);

        // 文字数に変換
        List<Integer> lengths = words.stream()
            .map(String::length)
            .collect(Collectors.toList());
        System.out.println("文字数: " + lengths);

        // mapToIntでプリミティブStreamに変換して合計
        int totalLength = words.stream()
            .mapToInt(String::length)
            .sum();
        System.out.println("合計文字数: " + totalLength);
    }
}`}
          expectedOutput={`大文字: [HELLO, WORLD, JAVA, STREAM]
文字数: [5, 5, 4, 6]
合計文字数: 20`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">filter と map の連鎖</h2>
        <p className="text-gray-400 mb-4">
          filterとmapを組み合わせることで、データの絞り込みと変換を一連の流れで記述できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<String> products = Arrays.asList(
            "Apple:150", "Banana:100", "Cherry:300",
            "Date:200", "Fig:80", "Grape:250"
        );

        // 200円以上の商品名を大文字で取得
        List<String> expensive = products.stream()
            .map(s -> s.split(":"))
            .filter(parts -> Integer.parseInt(parts[1]) >= 200)
            .map(parts -> parts[0].toUpperCase() + " (" + parts[1] + "円)")
            .collect(Collectors.toList());

        expensive.forEach(System.out::println);
    }
}`}
          expectedOutput={`CHERRY (300円)
DATE (200円)
GRAPE (250円)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="stream" lessonId="filter-map" />
      </div>
      <LessonNav lessons={lessons} currentId="filter-map" basePath="/learn/stream" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("generics");

export default function WildcardsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ジェネリクス レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ワイルドカード</h1>
        <p className="text-gray-400">?・extends・superワイルドカードの使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ワイルドカードとPECS原則</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ワイルドカード <code className="text-orange-300">?</code> は未知の型を表します。
          PECS原則（Producer Extends, Consumer Super）に従い、
          データを読み取るなら <code className="text-orange-300">? extends T</code>、
          書き込むなら <code className="text-orange-300">? super T</code> を使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>?</code> 非境界ワイルドカード: 任意の型を受け付ける</li>
          <li><code>? extends T</code> 上限ワイルドカード: T またはそのサブクラス（読み取り用）</li>
          <li><code>? super T</code> 下限ワイルドカード: T またはそのスーパークラス（書き込み用）</li>
          <li>PECS: Producer(extends)から読み、Consumer(super)に書く</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">非境界ワイルドカード ?</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">{"List<?>"}</code> は任意の型のリストを受け取れます。
          要素の型に依存しない処理に使います。
        </p>
        <JavaEditor
          defaultCode={`import java.util.List;
import java.util.Arrays;

public class Main {
    // 任意の型のリストのサイズと中身を表示
    public static void printList(List<?> list) {
        System.out.println("サイズ: " + list.size());
        for (Object item : list) {
            System.out.print(item + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
        printList(names);

        List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);
        printList(nums);

        List<Double> prices = Arrays.asList(1.5, 2.0, 3.5);
        printList(prices);
    }
}`}
          expectedOutput={`サイズ: 3
Alice Bob Charlie
サイズ: 5
1 2 3 4 5
サイズ: 3
1.5 2.0 3.5 `}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">上限ワイルドカード ? extends T</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">? extends Number</code> は Number のサブクラスのリストを受け取れます。
          リストから値を読み取る（Producer）場合に使います。
        </p>
        <JavaEditor
          defaultCode={`import java.util.List;
import java.util.Arrays;

public class Main {
    // Number またはサブクラスのリストの合計を計算
    public static double sumOfList(List<? extends Number> list) {
        double sum = 0;
        for (Number n : list) {
            sum += n.doubleValue();
        }
        return sum;
    }

    public static void main(String[] args) {
        List<Integer> ints = Arrays.asList(1, 2, 3, 4, 5);
        System.out.println("Integer合計: " + sumOfList(ints));

        List<Double> doubles = Arrays.asList(1.5, 2.5, 3.0);
        System.out.println("Double合計: " + sumOfList(doubles));

        List<Long> longs = Arrays.asList(100L, 200L, 300L);
        System.out.println("Long合計: " + sumOfList(longs));
    }
}`}
          expectedOutput={`Integer合計: 15.0
Double合計: 7.0
Long合計: 600.0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">下限ワイルドカード ? super T（PECS）</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">? super Integer</code> は Integer のスーパークラスのリストに書き込めます。
          リストに値を追加する（Consumer）場合に使います。
        </p>
        <JavaEditor
          defaultCode={`import java.util.List;
import java.util.ArrayList;

public class Main {
    // PECS: Consumer Super - リストに値を追加する
    public static void addNumbers(List<? super Integer> list) {
        list.add(1);
        list.add(2);
        list.add(3);
    }

    // PECS: Producer Extends - リストから値を読み取る
    public static double sum(List<? extends Number> list) {
        double total = 0;
        for (Number n : list) {
            total += n.doubleValue();
        }
        return total;
    }

    public static void main(String[] args) {
        // List<Number> に Integer を追加（? super Integer）
        List<Number> numbers = new ArrayList<>();
        addNumbers(numbers);
        System.out.println("追加後: " + numbers);
        System.out.println("合計: " + sum(numbers));

        // List<Object> にも Integer を追加できる
        List<Object> objects = new ArrayList<>();
        addNumbers(objects);
        objects.add("文字列も追加可能");
        System.out.println("Object: " + objects);
    }
}`}
          expectedOutput={`追加後: [1, 2, 3]
合計: 6.0
Object: [1, 2, 3, 文字列も追加可能]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="generics" lessonId="wildcards" />
      </div>
      <LessonNav lessons={lessons} currentId="wildcards" basePath="/learn/generics" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function ArraysClassPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">配列・リスト レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Arraysクラス</h1>
        <p className="text-gray-400">Arrays.sort・fill・copyOfなどのユーティリティ</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Arraysクラスの高度な機能</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">java.util.Arrays</code> には配列操作のための
          多くのユーティリティメソッドがあります。
          Stream変換、リスト変換、深い比較など、高度な操作も可能です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>Arrays.stream()</code> で配列をStreamに変換</li>
          <li><code>Arrays.asList()</code> で配列をListに変換</li>
          <li><code>Arrays.equals()</code> で1次元配列の比較</li>
          <li><code>Arrays.deepEquals()</code> で多次元配列の比較</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Arrays.stream</h2>
        <p className="text-gray-400 mb-4">
          配列を Stream に変換して、フィルタや集計などの関数型操作を行えます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

        // stream で合計
        int sum = Arrays.stream(nums).sum();
        System.out.println("合計: " + sum);

        // 偶数だけフィルタ
        System.out.print("偶数: ");
        Arrays.stream(nums)
              .filter(n -> n % 2 == 0)
              .forEach(n -> System.out.print(n + " "));
        System.out.println();

        // 平均
        double avg = Arrays.stream(nums).average().orElse(0);
        System.out.printf("平均: %.1f%n", avg);

        // 最大値・最小値
        System.out.println("最大: " + Arrays.stream(nums).max().orElse(0));
        System.out.println("最小: " + Arrays.stream(nums).min().orElse(0));

        // 部分配列のstream
        int partSum = Arrays.stream(nums, 2, 5).sum();
        System.out.println("index[2,5)の合計: " + partSum);
    }
}`}
          expectedOutput={`合計: 55
偶数: 2 4 6 8 10
平均: 5.5
最大: 10
最小: 1
index[2,5)の合計: 12`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Arrays.asList</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">Arrays.asList()</code> で配列を固定サイズの List に変換します。
          元の配列とリストはビュー関係にあることに注意が必要です。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        // Arrays.asList で List に変換
        String[] arr = {"A", "B", "C"};
        List<String> list = Arrays.asList(arr);
        System.out.println("asList: " + list);

        // 要素の変更は可能
        list.set(1, "X");
        System.out.println("変更後: " + list);
        System.out.println("元配列: " + Arrays.toString(arr)); // 元配列も変わる

        // add/removeは不可（固定サイズ）
        // list.add("D"); // UnsupportedOperationException

        // 可変リストにするには ArrayList でラップ
        ArrayList<String> mutable = new ArrayList<>(Arrays.asList("X", "Y", "Z"));
        mutable.add("W");
        mutable.remove("X");
        System.out.println("可変リスト: " + mutable);

        // 直接リテラルで作成
        List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);
        System.out.println("数値リスト: " + nums);
    }
}`}
          expectedOutput={`asList: [A, B, C]
変更後: [A, X, C]
元配列: [A, X, C]
可変リスト: [Y, Z, W]
数値リスト: [1, 2, 3, 4, 5]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">deepEqualsとdeepToString</h2>
        <p className="text-gray-400 mb-4">
          多次元配列の比較には <code className="text-orange-300">deepEquals()</code>、
          表示には <code className="text-orange-300">deepToString()</code> を使います。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[][] a = {{1, 2}, {3, 4}};
        int[][] b = {{1, 2}, {3, 4}};
        int[][] c = {{1, 2}, {3, 5}};

        // equalsは多次元配列に対応していない
        System.out.println("equals(a, b): " + Arrays.equals(a, b));

        // deepEqualsは多次元配列の中身まで比較
        System.out.println("deepEquals(a, b): " + Arrays.deepEquals(a, b));
        System.out.println("deepEquals(a, c): " + Arrays.deepEquals(a, c));

        // toStringは参照を表示してしまう
        System.out.println("toString: " + Arrays.toString(a));

        // deepToStringは中身を表示
        System.out.println("deepToString: " + Arrays.deepToString(a));

        // 3次元配列でも使える
        int[][][] d = {{{1, 2}, {3, 4}}, {{5, 6}, {7, 8}}};
        System.out.println("3次元: " + Arrays.deepToString(d));
    }
}`}
          expectedOutput={`equals(a, b): false
deepEquals(a, b): true
deepEquals(a, c): false
toString: [[I@, [I@]
deepToString: [[1, 2], [3, 4]]
3次元: [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="arrays-class" />
      </div>
      <LessonNav lessons={lessons} currentId="arrays-class" basePath="/learn/arrays" />
    </div>
  );
}

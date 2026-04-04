import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function ArrayOperationsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">配列・リスト レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">配列の操作</h1>
        <p className="text-gray-400">配列のコピー・ソート・検索</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Arraysクラスの基本操作</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">java.util.Arrays</code> クラスには、配列を操作するための
          便利な静的メソッドが用意されています。ソート、コピー、検索、比較などが簡単に行えます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>Arrays.sort()</code> で配列をソート</li>
          <li><code>Arrays.copyOf()</code> で配列をコピー（サイズ変更可能）</li>
          <li><code>Arrays.fill()</code> で全要素を同じ値に設定</li>
          <li><code>Arrays.toString()</code> で配列を文字列に変換</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ソートと表示</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">Arrays.sort()</code> は配列を昇順にソートします。
          <code className="text-orange-300">Arrays.toString()</code> で配列の中身を見やすく表示できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] nums = {5, 2, 8, 1, 9, 3};
        System.out.println("ソート前: " + Arrays.toString(nums));

        Arrays.sort(nums);
        System.out.println("ソート後: " + Arrays.toString(nums));

        // 文字列配列のソート（辞書順）
        String[] names = {"Charlie", "Alice", "Bob"};
        Arrays.sort(names);
        System.out.println("名前ソート: " + Arrays.toString(names));

        // 範囲指定ソート（index 1から4まで）
        int[] data = {50, 30, 10, 40, 20, 60};
        Arrays.sort(data, 1, 4);
        System.out.println("部分ソート: " + Arrays.toString(data));
    }
}`}
          expectedOutput={`ソート前: [5, 2, 8, 1, 9, 3]
ソート後: [1, 2, 3, 5, 8, 9]
名前ソート: [Alice, Bob, Charlie]
部分ソート: [50, 10, 30, 40, 20, 60]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コピーと埋め</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">Arrays.copyOf()</code> で配列をコピーし、
          <code className="text-orange-300">Arrays.fill()</code> で全要素を特定の値に設定します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] original = {1, 2, 3, 4, 5};

        // 同じサイズでコピー
        int[] copy = Arrays.copyOf(original, original.length);
        System.out.println("コピー: " + Arrays.toString(copy));

        // サイズを拡大してコピー（余りは0）
        int[] bigger = Arrays.copyOf(original, 8);
        System.out.println("拡大: " + Arrays.toString(bigger));

        // 範囲指定コピー
        int[] partial = Arrays.copyOfRange(original, 1, 4);
        System.out.println("部分コピー[1,4): " + Arrays.toString(partial));

        // fill: 全要素を同じ値に
        int[] filled = new int[5];
        Arrays.fill(filled, 99);
        System.out.println("fill(99): " + Arrays.toString(filled));

        // 範囲指定fill
        Arrays.fill(filled, 1, 3, 0);
        System.out.println("部分fill: " + Arrays.toString(filled));
    }
}`}
          expectedOutput={`コピー: [1, 2, 3, 4, 5]
拡大: [1, 2, 3, 4, 5, 0, 0, 0]
部分コピー[1,4): [2, 3, 4]
fill(99): [99, 99, 99, 99, 99]
部分fill: [99, 0, 0, 99, 99]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">検索と比較</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">Arrays.binarySearch()</code> でソート済み配列を二分探索します。
          <code className="text-orange-300">Arrays.equals()</code> で配列の内容を比較します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] sorted = {10, 20, 30, 40, 50};

        // binarySearch（ソート済み配列が必要）
        int idx = Arrays.binarySearch(sorted, 30);
        System.out.println("30のインデックス: " + idx);

        int notFound = Arrays.binarySearch(sorted, 25);
        System.out.println("25のインデックス: " + notFound + "（負=見つからない）");

        // equals: 配列の内容比較
        int[] a = {1, 2, 3};
        int[] b = {1, 2, 3};
        int[] c = {1, 2, 4};
        System.out.println("a == b（参照）: " + (a == b));
        System.out.println("equals(a, b): " + Arrays.equals(a, b));
        System.out.println("equals(a, c): " + Arrays.equals(a, c));
    }
}`}
          expectedOutput={`30のインデックス: 2
25のインデックス: -3（負=見つからない）
a == b（参照）: false
equals(a, b): true
equals(a, c): false`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="array-operations" />
      </div>
      <LessonNav lessons={lessons} currentId="array-operations" basePath="/learn/arrays" />
    </div>
  );
}

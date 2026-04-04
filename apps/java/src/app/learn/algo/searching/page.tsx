import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algo");

export default function SearchingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">アルゴリズム レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">探索アルゴリズム</h1>
        <p className="text-gray-400">線形探索、二分探索、Arrays.binarySearch</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">探索アルゴリズムの概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          探索アルゴリズムは、データの中から目的の要素を見つけるための手法です。
          線形探索はシンプルですが遅く、二分探索はソート済みデータに対して非常に高速です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>線形探索（リニアサーチ） - O(n)、ソート不要</li>
          <li>二分探索（バイナリサーチ） - O(log n)、ソート済み配列が前提</li>
          <li><code>Arrays.binarySearch()</code> - Java標準の二分探索メソッド</li>
          <li><code>Collections.binarySearch()</code> - Listに対する二分探索</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">線形探索</h2>
        <p className="text-gray-400 mb-4">
          先頭から順番に要素を比較していく最もシンプルな探索方法です。
          ソートされていないデータにも使えます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;  // 見つかったインデックスを返す
            }
        }
        return -1;  // 見つからない
    }

    public static void main(String[] args) {
        int[] data = {4, 2, 7, 1, 9, 3, 8};

        int[] targets = {7, 5, 1};
        for (int target : targets) {
            int index = linearSearch(data, target);
            if (index != -1) {
                System.out.println(target + " → インデックス " + index + " で発見");
            } else {
                System.out.println(target + " → 見つかりませんでした");
            }
        }
        System.out.println();
        System.out.println("計算量: O(n)");
        System.out.println("利点: ソート不要、実装が簡単");
    }
}`}
          expectedOutput={`7 → インデックス 2 で発見
5 → 見つかりませんでした
1 → インデックス 3 で発見

計算量: O(n)
利点: ソート不要、実装が簡単`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">二分探索</h2>
        <p className="text-gray-400 mb-4">
          ソート済み配列を半分に分割しながら探索する効率的なアルゴリズムです。
          毎回探索範囲が半分になるため、O(log n)で探索できます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                left = mid + 1;   // 右半分を探索
            } else {
                right = mid - 1;  // 左半分を探索
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] sorted = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};

        int[] targets = {23, 50, 2, 91};
        for (int target : targets) {
            int index = binarySearch(sorted, target);
            if (index != -1) {
                System.out.println(target + " → インデックス " + index + " で発見");
            } else {
                System.out.println(target + " → 見つかりませんでした");
            }
        }
        System.out.println();
        System.out.println("計算量: O(log n)");
        System.out.println("例: 100万要素 → 最大約20回の比較で発見");
    }
}`}
          expectedOutput={`23 → インデックス 5 で発見
50 → 見つかりませんでした
2 → インデックス 0 で発見
91 → インデックス 9 で発見

計算量: O(log n)
例: 100万要素 → 最大約20回の比較で発見`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Arrays.binarySearch</h2>
        <p className="text-gray-400 mb-4">
          Java標準ライブラリの <code className="text-orange-300">Arrays.binarySearch()</code> を使えば、
          自分で実装する必要はありません。戻り値の仕様を理解しましょう。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        // 配列の二分探索
        int[] nums = {10, 20, 30, 40, 50};

        System.out.println("=== Arrays.binarySearch ===");
        System.out.println("配列: " + Arrays.toString(nums));
        System.out.println("30を探索: index = " + Arrays.binarySearch(nums, 30));
        System.out.println("35を探索: index = " + Arrays.binarySearch(nums, 35));
        System.out.println("→ 負の値 = 見つからない");
        System.out.println("→ (-(挿入位置) - 1) を返す");
        System.out.println();

        // Listの二分探索
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "Diana");
        System.out.println("=== Collections.binarySearch ===");
        System.out.println("リスト: " + names);
        System.out.println("Bob: index = " + Collections.binarySearch(names, "Bob"));
        System.out.println("Eve: index = " + Collections.binarySearch(names, "Eve"));
    }
}`}
          expectedOutput={`=== Arrays.binarySearch ===
配列: [10, 20, 30, 40, 50]
30を探索: index = 2
35を探索: index = -4
→ 負の値 = 見つからない
→ (-(挿入位置) - 1) を返す

=== Collections.binarySearch ===
リスト: [Alice, Bob, Charlie, Diana]
Bob: index = 1
Eve: index = -5`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="algo" lessonId="searching" />
      </div>
      <LessonNav lessons={lessons} currentId="searching" basePath="/learn/algo" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algo");

export default function SortingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">アルゴリズム レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ソートアルゴリズム</h1>
        <p className="text-gray-400">バブルソート、マージソート、クイックソート</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ソートアルゴリズムの概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ソートはデータを順番に並べ替える基本的なアルゴリズムです。
          時間計算量や安定性（同値要素の順序保持）が選択のポイントになります。
          実務では <code className="text-orange-300">Arrays.sort()</code> や <code className="text-orange-300">Collections.sort()</code> を使いますが、
          原理を理解することが重要です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>バブルソート - O(n^2)、安定、シンプルだが遅い</li>
          <li>マージソート - O(n log n)、安定、追加メモリが必要</li>
          <li>クイックソート - O(n log n) 平均、不安定、実用的に最速</li>
          <li>Java標準: プリミティブはDual-Pivot QuickSort、オブジェクトはTimSort</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">バブルソート</h2>
        <p className="text-gray-400 mb-4">
          隣接する要素を比較・交換して、最大値を末尾に「泡のように浮かべる」アルゴリズムです。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;

public class Main {
    static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j < n - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) break;  // 交換なし→ソート済み
        }
    }

    public static void main(String[] args) {
        int[] data = {64, 25, 12, 22, 11};
        System.out.println("ソート前: " + Arrays.toString(data));
        bubbleSort(data);
        System.out.println("ソート後: " + Arrays.toString(data));
        System.out.println("計算量: O(n^2)　安定: Yes");
    }
}`}
          expectedOutput={`ソート前: [64, 25, 12, 22, 11]
ソート後: [11, 12, 22, 25, 64]
計算量: O(n^2)　安定: Yes`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">マージソート</h2>
        <p className="text-gray-400 mb-4">
          配列を半分に分割し、再帰的にソートしてからマージ（統合）するアルゴリズムです。
          常にO(n log n)が保証される安定ソートです。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;

public class Main {
    static void mergeSort(int[] arr, int left, int right) {
        if (left >= right) return;
        int mid = (left + right) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }

    static void merge(int[] arr, int left, int mid, int right) {
        int[] temp = new int[right - left + 1];
        int i = left, j = mid + 1, k = 0;
        while (i <= mid && j <= right) {
            if (arr[i] <= arr[j]) temp[k++] = arr[i++];
            else temp[k++] = arr[j++];
        }
        while (i <= mid) temp[k++] = arr[i++];
        while (j <= right) temp[k++] = arr[j++];
        System.arraycopy(temp, 0, arr, left, temp.length);
    }

    public static void main(String[] args) {
        int[] data = {38, 27, 43, 3, 9, 82, 10};
        System.out.println("ソート前: " + Arrays.toString(data));
        mergeSort(data, 0, data.length - 1);
        System.out.println("ソート後: " + Arrays.toString(data));
        System.out.println("計算量: O(n log n)　安定: Yes");
    }
}`}
          expectedOutput={`ソート前: [38, 27, 43, 3, 9, 82, 10]
ソート後: [3, 9, 10, 27, 38, 43, 82]
計算量: O(n log n)　安定: Yes`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">クイックソート</h2>
        <p className="text-gray-400 mb-4">
          ピボットを基準に配列を2つに分割し、再帰的にソートするアルゴリズムです。
          平均的に最も高速で、Java標準のプリミティブ配列ソートにも採用されています。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;

public class Main {
    static void quickSort(int[] arr, int low, int high) {
        if (low >= high) return;
        int pivot = arr[high];
        int i = low;
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
                i++;
            }
        }
        int temp = arr[i]; arr[i] = arr[high]; arr[high] = temp;
        quickSort(arr, low, i - 1);
        quickSort(arr, i + 1, high);
    }

    public static void main(String[] args) {
        int[] data = {10, 80, 30, 90, 40, 50, 70};
        System.out.println("ソート前: " + Arrays.toString(data));
        quickSort(data, 0, data.length - 1);
        System.out.println("ソート後: " + Arrays.toString(data));
        System.out.println("計算量: O(n log n) 平均　安定: No");
        System.out.println();

        // Java標準のソート
        int[] data2 = {5, 3, 1, 4, 2};
        Arrays.sort(data2);
        System.out.println("Arrays.sort: " + Arrays.toString(data2));
        System.out.println("→ プリミティブ: Dual-Pivot QuickSort");
        System.out.println("→ オブジェクト: TimSort（安定）");
    }
}`}
          expectedOutput={`ソート前: [10, 80, 30, 90, 40, 50, 70]
ソート後: [10, 30, 40, 50, 70, 80, 90]
計算量: O(n log n) 平均　安定: No

Arrays.sort: [1, 2, 3, 4, 5]
→ プリミティブ: Dual-Pivot QuickSort
→ オブジェクト: TimSort（安定）`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="algo" lessonId="sorting" />
      </div>
      <LessonNav lessons={lessons} currentId="sorting" basePath="/learn/algo" />
    </div>
  );
}

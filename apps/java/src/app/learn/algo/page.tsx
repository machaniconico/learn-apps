import { JavaEditor } from "@/components/java-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algo");

const quizQuestions: QuizQuestion[] = [
  {
    question: "二分探索の計算量として正しいものはどれですか？",
    options: [
      "O(log n) - ソート済み配列で中央値と比較し、探索範囲を半分に絞る",
      "O(n) - 全要素を順番に探索する",
      "O(n^2) - 二重ループで探索する",
      "O(1) - 定数時間で探索できる",
    ],
    answer: 0,
    explanation: "二分探索はソート済み配列に対して、中央の要素と比較して探索範囲を半分に絞り込みます。n個の要素に対してO(log n)の時間計算量で探索できます。",
  },
  {
    question: "クイックソートの特徴として正しいものはどれですか？",
    options: [
      "ピボットを基準に分割統治法で並べ替え、平均計算量はO(n log n)",
      "常にO(n)でソートできる",
      "追加メモリがO(n)必要",
      "安定ソートである",
    ],
    answer: 0,
    explanation: "クイックソートはピボット要素を選び、それより小さい要素と大きい要素に分割して再帰的にソートします。平均O(n log n)、最悪O(n^2)ですが実用的に高速です。",
  },
  {
    question: "動的プログラミング（DP）の基本原理として正しいものはどれですか？",
    options: [
      "問題を部分問題に分割し、その結果をメモ化して重複計算を避ける",
      "常にブルートフォースで解く",
      "再帰を使わずにループだけで解く手法",
      "グラフ探索専用のアルゴリズム",
    ],
    answer: 0,
    explanation: "動的プログラミングは最適部分構造と重複部分問題を持つ問題に有効です。部分問題の結果をメモ化（テーブル化）して再利用し、計算量を大幅に削減します。",
  },
  {
    question: "グラフのBFS（幅優先探索）の特徴として正しいものはどれですか？",
    options: [
      "キューを使い、始点から近い順にノードを探索し、最短経路を求められる",
      "スタックを使って深く探索する",
      "重み付きグラフの最短経路に最適",
      "再帰で実装するのが一般的",
    ],
    answer: 0,
    explanation: "BFS（幅優先探索）はキュー（FIFO）を使い、始点から距離が近い順にノードを訪問します。重みなしグラフにおける最短経路問題を解くことができます。",
  },
];

export default function AlgoPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-cyan-400 mb-2">アルゴリズム</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Javaで実装するアルゴリズムを学びましょう。二分探索、ソートアルゴリズム、
          動的プログラミング、そしてグラフ探索の基本を理解し、効率的な問題解決力を身につけます。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="algo" totalLessons={6} color="cyan" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/algo" color="cyan" categoryId="algo" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">二分探索の実装</h2>
        <p className="text-gray-400 mb-4">
          ソート済み配列から効率的に要素を探す二分探索を実装しましょう。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;

public class Main {
    // 二分探索（反復版）
    static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (arr[mid] == target) {
                return mid;  // 見つかった
            } else if (arr[mid] < target) {
                left = mid + 1;  // 右半分を探索
            } else {
                right = mid - 1;  // 左半分を探索
            }
        }
        return -1;  // 見つからない
    }

    public static void main(String[] args) {
        int[] data = {2, 5, 8, 12, 16, 23, 38, 42, 56, 72, 91};

        System.out.println("=== 二分探索 ===");
        System.out.println("配列: " + Arrays.toString(data));
        System.out.println();

        int[] targets = {23, 42, 7, 91, 1};
        for (int target : targets) {
            int index = binarySearch(data, target);
            if (index != -1) {
                System.out.println(target + " → インデックス " + index + " で発見");
            } else {
                System.out.println(target + " → 見つかりません");
            }
        }

        System.out.println();
        System.out.println("=== 計算量比較 ===");
        System.out.println("線形探索: O(n)  → 1000要素で最大1000回比較");
        System.out.println("二分探索: O(log n) → 1000要素で最大10回比較");
        System.out.println("二分探索: O(log n) → 100万要素で最大20回比較");
    }
}`}
          expectedOutput={`=== 二分探索 ===
配列: [2, 5, 8, 12, 16, 23, 38, 42, 56, 72, 91]

23 → インデックス 5 で発見
42 → インデックス 7 で発見
7 → 見つかりません
91 → インデックス 10 で発見
1 → 見つかりません

=== 計算量比較 ===
線形探索: O(n)  → 1000要素で最大1000回比較
二分探索: O(log n) → 1000要素で最大10回比較
二分探索: O(log n) → 100万要素で最大20回比較`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">マージソート</h2>
        <p className="text-gray-400 mb-4">
          分割統治法に基づくマージソートを実装しましょう。安定で効率的なソートアルゴリズムです。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;

public class Main {
    // マージソート
    static void mergeSort(int[] arr, int left, int right) {
        if (left >= right) return;

        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);       // 左半分をソート
        mergeSort(arr, mid + 1, right);  // 右半分をソート
        merge(arr, left, mid, right);    // マージ
    }

    static void merge(int[] arr, int left, int mid, int right) {
        int[] temp = new int[right - left + 1];
        int i = left, j = mid + 1, k = 0;

        while (i <= mid && j <= right) {
            if (arr[i] <= arr[j]) {
                temp[k++] = arr[i++];
            } else {
                temp[k++] = arr[j++];
            }
        }
        while (i <= mid) temp[k++] = arr[i++];
        while (j <= right) temp[k++] = arr[j++];

        System.arraycopy(temp, 0, arr, left, temp.length);
    }

    public static void main(String[] args) {
        int[] data = {38, 27, 43, 3, 9, 82, 10};

        System.out.println("=== マージソート ===");
        System.out.println("ソート前: " + Arrays.toString(data));

        mergeSort(data, 0, data.length - 1);

        System.out.println("ソート後: " + Arrays.toString(data));

        System.out.println();
        System.out.println("=== ソートアルゴリズム比較 ===");
        System.out.println("┌──────────────┬────────┬────────┬───────┐");
        System.out.println("│ アルゴリズム │ 平均   │ 最悪   │ 安定  │");
        System.out.println("├──────────────┼────────┼────────┼───────┤");
        System.out.println("│ バブルソート │ O(n^2) │ O(n^2) │ Yes   │");
        System.out.println("│ クイックソート│ O(nlogn)│ O(n^2) │ No    │");
        System.out.println("│ マージソート │ O(nlogn)│ O(nlogn)│ Yes   │");
        System.out.println("│ ヒープソート │ O(nlogn)│ O(nlogn)│ No    │");
        System.out.println("└──────────────┴────────┴────────┴───────┘");
    }
}`}
          expectedOutput={`=== マージソート ===
ソート前: [38, 27, 43, 3, 9, 82, 10]
ソート後: [3, 9, 10, 27, 38, 43, 82]

=== ソートアルゴリズム比較 ===
┌──────────────┬────────┬────────┬───────┐
│ アルゴリズム │ 平均   │ 最悪   │ 安定  │
├──────────────┼────────┼────────┼───────┤
│ バブルソート │ O(n^2) │ O(n^2) │ Yes   │
│ クイックソート│ O(nlogn)│ O(n^2) │ No    │
│ マージソート │ O(nlogn)│ O(nlogn)│ Yes   │
│ ヒープソート │ O(nlogn)│ O(nlogn)│ No    │
└──────────────┴────────┴────────┴───────┘`}
        />
      </section>

      <Quiz questions={quizQuestions} color="cyan" />
    </div>
  );
}

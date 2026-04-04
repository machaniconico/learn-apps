import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algo");

export default function RecursiveAlgorithmsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">アルゴリズム レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">再帰アルゴリズム</h1>
        <p className="text-gray-400">階乗、ハノイの塔、分割統治</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">再帰とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          再帰は関数が自分自身を呼び出すテクニックです。
          問題を同じ構造のより小さな問題に分割して解きます。
          必ず「ベースケース（終了条件）」を持つことが重要です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>ベースケース - 再帰を終了する条件（これがないと無限ループ）</li>
          <li>再帰ケース - 問題を小さくして自分自身を呼び出す</li>
          <li>分割統治法 - 問題を分割→各部分を再帰的に解決→統合</li>
          <li>注意: 深すぎる再帰は <code>StackOverflowError</code> の原因</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">階乗（Factorial）</h2>
        <p className="text-gray-400 mb-4">
          n! = n * (n-1) * ... * 1 を再帰で計算する最も基本的な例です。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    // 再帰版
    static long factorial(int n) {
        if (n <= 1) return 1;     // ベースケース
        return n * factorial(n - 1);  // 再帰ケース
    }

    // 実行過程を表示する版
    static long factorialVerbose(int n, int depth) {
        String indent = "  ".repeat(depth);
        System.out.println(indent + "factorial(" + n + ") 呼び出し");

        if (n <= 1) {
            System.out.println(indent + "→ ベースケース: 1 を返す");
            return 1;
        }

        long result = n * factorialVerbose(n - 1, depth + 1);
        System.out.println(indent + "→ " + n + " * factorial(" + (n-1) + ") = " + result);
        return result;
    }

    public static void main(String[] args) {
        System.out.println("=== 階乗の計算過程 ===");
        long result = factorialVerbose(5, 0);
        System.out.println("5! = " + result);
    }
}`}
          expectedOutput={`=== 階乗の計算過程 ===
factorial(5) 呼び出し
  factorial(4) 呼び出し
    factorial(3) 呼び出し
      factorial(2) 呼び出し
        factorial(1) 呼び出し
        → ベースケース: 1 を返す
      → 2 * factorial(1) = 2
    → 3 * factorial(2) = 6
  → 4 * factorial(3) = 24
→ 5 * factorial(4) = 120
5! = 120`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ハノイの塔</h2>
        <p className="text-gray-400 mb-4">
          3本の棒を使ってn枚の円盤を移動させるパズルです。
          再帰の美しさが際立つ古典的な問題です。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    static int moveCount = 0;

    static void hanoi(int n, char from, char to, char aux) {
        if (n == 1) {
            moveCount++;
            System.out.println("円盤1: " + from + " → " + to);
            return;
        }
        hanoi(n - 1, from, aux, to);    // n-1枚を補助棒へ
        moveCount++;
        System.out.println("円盤" + n + ": " + from + " → " + to);
        hanoi(n - 1, aux, to, from);    // n-1枚を目的棒へ
    }

    public static void main(String[] args) {
        int disks = 3;
        System.out.println("=== ハノイの塔（" + disks + "枚） ===");
        hanoi(disks, 'A', 'C', 'B');
        System.out.println("移動回数: " + moveCount);
        System.out.println("（2^n - 1 = " + ((1 << disks) - 1) + "）");
    }
}`}
          expectedOutput={`=== ハノイの塔（3枚） ===
円盤1: A → C
円盤2: A → B
円盤1: C → B
円盤3: A → C
円盤1: B → A
円盤2: B → C
円盤1: A → C
移動回数: 7
（2^n - 1 = 7）`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">分割統治法: 最大値の探索</h2>
        <p className="text-gray-400 mb-4">
          配列を半分に分割し、各部分の最大値を再帰的に求めて統合する分割統治法の例です。
          マージソートやクイックソートも同じ考え方です。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    static int findMax(int[] arr, int left, int right) {
        // ベースケース: 要素が1つ
        if (left == right) {
            return arr[left];
        }

        // 分割
        int mid = (left + right) / 2;
        int leftMax = findMax(arr, left, mid);      // 左半分の最大
        int rightMax = findMax(arr, mid + 1, right); // 右半分の最大

        // 統合
        return Math.max(leftMax, rightMax);
    }

    // べき乗の高速計算（分割統治法）
    static long power(long base, int exp) {
        if (exp == 0) return 1;
        if (exp % 2 == 0) {
            long half = power(base, exp / 2);
            return half * half;          // O(log n)
        } else {
            return base * power(base, exp - 1);
        }
    }

    public static void main(String[] args) {
        int[] data = {3, 7, 1, 9, 4, 6, 2, 8};
        System.out.println("配列の最大値: " + findMax(data, 0, data.length - 1));
        System.out.println();

        System.out.println("=== べき乗の高速計算 ===");
        System.out.println("2^10 = " + power(2, 10));
        System.out.println("3^5  = " + power(3, 5));
        System.out.println("計算量: O(log n)（ナイーブはO(n)）");
    }
}`}
          expectedOutput={`配列の最大値: 9

=== べき乗の高速計算 ===
2^10 = 1024
3^5  = 243
計算量: O(log n)（ナイーブはO(n)）`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="algo" lessonId="recursive-algorithms" />
      </div>
      <LessonNav lessons={lessons} currentId="recursive-algorithms" basePath="/learn/algo" />
    </div>
  );
}

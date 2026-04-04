import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algo");

export default function DynamicProgrammingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">アルゴリズム レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">動的計画法</h1>
        <p className="text-gray-400">フィボナッチのメモ化、ナップサック問題</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">動的計画法（DP）とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          動的計画法は、問題を部分問題に分割し、各部分問題の結果を記録（メモ化）して
          再計算を避けるアルゴリズム設計手法です。再帰の重複計算を排除して効率化します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>メモ化（トップダウン） - 再帰 + キャッシュ</li>
          <li>テーブル法（ボトムアップ） - 小さい問題から順に解く</li>
          <li>重複部分問題 + 最適部分構造 がDPの適用条件</li>
          <li>フィボナッチ、ナップサック、最長共通部分列など</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">フィボナッチ: 再帰 vs メモ化</h2>
        <p className="text-gray-400 mb-4">
          単純な再帰は同じ計算を繰り返しますが、メモ化で劇的に高速化できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.HashMap;
import java.util.Map;

public class Main {
    // 単純再帰: O(2^n) — 非常に遅い
    static long fibNaive(int n) {
        if (n <= 1) return n;
        return fibNaive(n - 1) + fibNaive(n - 2);
    }

    // メモ化再帰: O(n)
    static Map<Integer, Long> memo = new HashMap<>();
    static long fibMemo(int n) {
        if (n <= 1) return n;
        if (memo.containsKey(n)) return memo.get(n);
        long result = fibMemo(n - 1) + fibMemo(n - 2);
        memo.put(n, result);
        return result;
    }

    // ボトムアップDP: O(n)
    static long fibDP(int n) {
        if (n <= 1) return n;
        long[] dp = new long[n + 1];
        dp[0] = 0;
        dp[1] = 1;
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }

    public static void main(String[] args) {
        System.out.println("=== フィボナッチ数列 ===");
        System.out.print("最初の10項: ");
        for (int i = 0; i < 10; i++) {
            System.out.print(fibDP(i) + " ");
        }
        System.out.println();
        System.out.println();

        System.out.println("fib(40) = " + fibMemo(40));
        System.out.println("fib(50) = " + fibMemo(50));
        System.out.println();

        System.out.println("単純再帰 O(2^n): fib(40)で数秒かかる");
        System.out.println("メモ化   O(n):   fib(50)でも一瞬");
    }
}`}
          expectedOutput={`=== フィボナッチ数列 ===
最初の10項: 0 1 1 2 3 5 8 13 21 34

fib(40) = 102334155
fib(50) = 12586269025

単純再帰 O(2^n): fib(40)で数秒かかる
メモ化   O(n):   fib(50)でも一瞬`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">0-1ナップサック問題</h2>
        <p className="text-gray-400 mb-4">
          容量制限のあるナップサックに、価値の合計が最大になるようにアイテムを入れる問題です。
          DPの典型的な応用例です。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    static int knapsack(int capacity, int[] weights, int[] values) {
        int n = weights.length;
        int[][] dp = new int[n + 1][capacity + 1];

        for (int i = 1; i <= n; i++) {
            for (int w = 0; w <= capacity; w++) {
                // アイテムiを入れない場合
                dp[i][w] = dp[i - 1][w];
                // アイテムiを入れる場合（容量が足りれば）
                if (weights[i - 1] <= w) {
                    int withItem = dp[i - 1][w - weights[i - 1]] + values[i - 1];
                    dp[i][w] = Math.max(dp[i][w], withItem);
                }
            }
        }
        return dp[n][capacity];
    }

    public static void main(String[] args) {
        String[] items = {"本", "PC", "食料", "カメラ"};
        int[] weights = {1, 3, 4, 2};
        int[] values  = {15, 50, 60, 30};
        int capacity = 5;

        System.out.println("=== 0-1ナップサック問題 ===");
        System.out.println("容量: " + capacity + "kg");
        System.out.println();
        for (int i = 0; i < items.length; i++) {
            System.out.printf("  %s: 重さ%dkg, 価値%d%n",
                items[i], weights[i], values[i]);
        }
        System.out.println();

        int maxValue = knapsack(capacity, weights, values);
        System.out.println("最大価値: " + maxValue);
    }
}`}
          expectedOutput={`=== 0-1ナップサック問題 ===
容量: 5kg

  本: 重さ1kg, 価値15
  PC: 重さ3kg, 価値50
  食料: 重さ4kg, 価値60
  カメラ: 重さ2kg, 価値30

最大価値: 80`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">階段の登り方（コイン問題の応用）</h2>
        <p className="text-gray-400 mb-4">
          n段の階段を1段または2段ずつ登る方法の数を求める問題です。
          DPの考え方を身近な問題で理解しましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    static int climbStairs(int n) {
        if (n <= 2) return n;
        int[] dp = new int[n + 1];
        dp[1] = 1;  // 1段 → 1通り
        dp[2] = 2;  // 2段 → 2通り（1+1 or 2）

        for (int i = 3; i <= n; i++) {
            // i段目には (i-1)段目から1段 or (i-2)段目から2段
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }

    public static void main(String[] args) {
        System.out.println("=== 階段の登り方 ===");
        System.out.println("1段 or 2段ずつ登る場合の方法の数");
        System.out.println();

        for (int n = 1; n <= 8; n++) {
            System.out.printf("%d段: %d通り%n", n, climbStairs(n));
        }
        System.out.println();
        System.out.println("dp[i] = dp[i-1] + dp[i-2]");
        System.out.println("→ フィボナッチ数列と同じ構造！");
    }
}`}
          expectedOutput={`=== 階段の登り方 ===
1段 or 2段ずつ登る場合の方法の数

1段: 1通り
2段: 2通り
3段: 3通り
4段: 5通り
5段: 8通り
6段: 13通り
7段: 21通り
8段: 34通り

dp[i] = dp[i-1] + dp[i-2]
→ フィボナッチ数列と同じ構造！`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="algo" lessonId="dynamic-programming" />
      </div>
      <LessonNav lessons={lessons} currentId="dynamic-programming" basePath="/learn/algo" />
    </div>
  );
}

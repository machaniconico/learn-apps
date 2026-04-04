import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function BreakContinuePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">制御構文 レッスン9</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">break・continue</h1>
        <p className="text-gray-400">ループ制御とラベル付きbreak</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ループ制御文</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">break</code> はループを即座に終了し、
          <code className="text-orange-300">continue</code> は現在の反復をスキップして次の反復に進みます。
          ネストしたループでは、ラベル付き break/continue で外側のループを制御できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>break</code>: ループを完全に抜ける</li>
          <li><code>continue</code>: 現在の反復のみスキップ</li>
          <li>ラベル付き <code>break label;</code>: 指定したラベルのループを抜ける</li>
          <li>ラベル付き <code>continue label;</code>: 指定したラベルのループの次の反復へ</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">breakとcontinueの基本</h2>
        <p className="text-gray-400 mb-4">
          break でループを早期終了し、continue で特定の反復をスキップします。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // break: 特定の値を見つけたら終了
        int[] numbers = {3, 7, 1, 9, 4, 6, 2};
        System.out.print("探索: ");
        for (int n : numbers) {
            System.out.print(n + " ");
            if (n == 9) {
                System.out.println("← 9を発見！");
                break;  // ループ終了
            }
        }

        // continue: 奇数をスキップして偶数のみ表示
        System.out.print("偶数: ");
        for (int i = 1; i <= 10; i++) {
            if (i % 2 != 0) {
                continue;  // 奇数はスキップ
            }
            System.out.print(i + " ");
        }
        System.out.println();

        // whileでのbreak
        int sum = 0;
        int i = 1;
        while (true) {  // 無限ループ
            sum += i;
            if (sum > 20) {
                System.out.println(i + "まで足すと合計" + sum + "で20を超える");
                break;
            }
            i++;
        }
    }
}`}
          expectedOutput={`探索: 3 7 1 9 ← 9を発見！
偶数: 2 4 6 8 10
6まで足すと合計21で20を超える`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ラベル付きbreak</h2>
        <p className="text-gray-400 mb-4">
          ネストしたループで外側のループを直接抜けたい場合、ラベルを使います。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // ラベル付きbreak: 2次元配列から値を探索
        int[][] grid = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        int target = 5;
        int foundRow = -1, foundCol = -1;

        search:  // ラベル
        for (int row = 0; row < grid.length; row++) {
            for (int col = 0; col < grid[row].length; col++) {
                if (grid[row][col] == target) {
                    foundRow = row;
                    foundCol = col;
                    break search;  // 外側のループも抜ける
                }
            }
        }

        System.out.println(target + " の位置: [" + foundRow + "][" + foundCol + "]");

        // ラベル付きcontinue
        System.out.println("=== 互いの組み合わせ ===");
        outer:
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 3; j++) {
                if (i == j) {
                    continue outer;  // 同じ値の組み合わせはスキップ
                }
                System.out.println("(" + i + ", " + j + ")");
            }
        }
    }
}`}
          expectedOutput={`5 の位置: [1][1]
=== 互いの組み合わせ ===
(1, 2)
(2, 1)
(3, 1)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実践的な使用例</h2>
        <p className="text-gray-400 mb-4">
          データのフィルタリングとバリデーションにおける break/continue の活用例です。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // 素数判定にbreakを活用
        System.out.print("素数: ");
        for (int num = 2; num <= 30; num++) {
            boolean isPrime = true;
            for (int i = 2; i * i <= num; i++) {
                if (num % i == 0) {
                    isPrime = false;
                    break;  // 割り切れたら判定終了
                }
            }
            if (isPrime) {
                System.out.print(num + " ");
            }
        }
        System.out.println();

        // continueでデータフィルタリング
        String[] emails = {"user@example.com", "", "admin@site.org", null, "test@test.jp"};
        System.out.println("有効なメール:");
        for (String email : emails) {
            if (email == null || email.isEmpty()) {
                continue;  // 無効なデータをスキップ
            }
            System.out.println("  " + email);
        }
    }
}`}
          expectedOutput={`素数: 2 3 5 7 11 13 17 19 23 29
有効なメール:
  user@example.com
  admin@site.org
  test@test.jp`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="break-continue" />
      </div>
      <LessonNav lessons={lessons} currentId="break-continue" basePath="/learn/control" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

export default function PrintlnDebugPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">デバッグ レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">printlnデバッグ</h1>
        <p className="text-gray-400">System.out.printlnによる変数値の確認とデバッグ手法</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">printlnデバッグとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          最もシンプルなデバッグ手法で、<code className="text-orange-300">System.out.println()</code> を使って
          変数の値やプログラムの実行経路を確認します。手軽ですが、本番コードには残さないようにしましょう。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>System.out.println(変数)</code> で値を確認</li>
          <li>条件分岐のどのパスを通ったか確認できる</li>
          <li>ループ内の変数の変化を追跡できる</li>
          <li>デバッグ後は必ずprintln文を削除する</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">変数の値を確認する</h2>
        <p className="text-gray-400 mb-4">
          バグの原因を特定するために、処理の各段階で変数の値を出力して確認します。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    static double calculateAverage(int[] scores) {
        int sum = 0;
        for (int score : scores) {
            sum += score;
            // デバッグ: 途中経過を確認
            System.out.println("[DEBUG] score=" + score + ", sum=" + sum);
        }
        double average = (double) sum / scores.length;
        System.out.println("[DEBUG] 合計=" + sum + ", 件数=" + scores.length);
        return average;
    }

    public static void main(String[] args) {
        int[] scores = {85, 92, 78};
        double avg = calculateAverage(scores);
        System.out.println("平均点: " + avg);
    }
}`}
          expectedOutput={`[DEBUG] score=85, sum=85
[DEBUG] score=92, sum=177
[DEBUG] score=78, sum=255
[DEBUG] 合計=255, 件数=3
平均点: 85.0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">条件分岐のデバッグ</h2>
        <p className="text-gray-400 mb-4">
          if文やswitch文のどのブランチを通っているか確認するために、
          各分岐にprintlnを入れます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    static String getDiscount(int age, boolean isMember) {
        System.out.println("[DEBUG] age=" + age + ", isMember=" + isMember);

        if (age < 12) {
            System.out.println("[DEBUG] -> 子供割引パス");
            return "子供割引: 50%OFF";
        } else if (age >= 65) {
            System.out.println("[DEBUG] -> シニア割引パス");
            return "シニア割引: 30%OFF";
        } else if (isMember) {
            System.out.println("[DEBUG] -> 会員割引パス");
            return "会員割引: 10%OFF";
        } else {
            System.out.println("[DEBUG] -> 割引なしパス");
            return "割引なし";
        }
    }

    public static void main(String[] args) {
        System.out.println(getDiscount(8, false));
        System.out.println("---");
        System.out.println(getDiscount(30, true));
    }
}`}
          expectedOutput={`[DEBUG] age=8, isMember=false
[DEBUG] -> 子供割引パス
子供割引: 50%OFF
---
[DEBUG] age=30, isMember=true
[DEBUG] -> 会員割引パス
会員割引: 10%OFF`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ループのデバッグ</h2>
        <p className="text-gray-400 mb-4">
          ループ内での変数の変化をprintlnで追跡し、想定外の動作を発見します。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    // バブルソートをデバッグ出力付きで実装
    static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            System.out.println("[DEBUG] パス " + (i + 1));
            for (int j = 0; j < n - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    System.out.println("[DEBUG]   swap: " + arr[j] + " <-> " + arr[j + 1]);
                }
            }
            // 各パスの結果を表示
            System.out.print("[DEBUG]   結果: ");
            for (int v : arr) System.out.print(v + " ");
            System.out.println();
        }
    }

    public static void main(String[] args) {
        int[] data = {3, 1, 2};
        bubbleSort(data);
        System.out.print("ソート結果: ");
        for (int v : data) System.out.print(v + " ");
        System.out.println();
    }
}`}
          expectedOutput={`[DEBUG] パス 1
[DEBUG]   swap: 1 <-> 3
[DEBUG]   swap: 2 <-> 3
[DEBUG]   結果: 1 2 3
[DEBUG] パス 2
[DEBUG]   結果: 1 2 3
ソート結果: 1 2 3 `}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="debug" lessonId="println-debug" />
      </div>
      <LessonNav lessons={lessons} currentId="println-debug" basePath="/learn/debug" />
    </div>
  );
}

import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

export default function IdeDebuggerPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">デバッグ レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">IDEデバッガ</h1>
        <p className="text-gray-400">ブレークポイント設定、ステップ実行、ウォッチ式の使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">IDEデバッガの機能</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          IntelliJ IDEAやEclipseなどのIDEには強力なデバッガが内蔵されています。
          printlnデバッグより効率的に問題を特定できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><strong>ブレークポイント</strong> - 実行を一時停止する地点を設定</li>
          <li><strong>ステップオーバー (F8)</strong> - 現在の行を実行して次の行へ</li>
          <li><strong>ステップイン (F7)</strong> - メソッドの中に入る</li>
          <li><strong>ステップアウト (Shift+F8)</strong> - 現在のメソッドから抜ける</li>
          <li><strong>ウォッチ式</strong> - 変数や式の値をリアルタイムで監視</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ブレークポイントのシミュレーション</h2>
        <p className="text-gray-400 mb-4">
          ブレークポイントで停止した時に見える情報をシミュレートします。
          各行で変数の状態を確認できます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    static void debugSimulation() {
        // ブレークポイント設定行をシミュレート
        int x = 10;
        System.out.println("行3で停止 -> x=" + x);

        int y = 20;
        System.out.println("行5で停止 -> x=" + x + ", y=" + y);

        int sum = x + y;
        System.out.println("行7で停止 -> x=" + x + ", y=" + y + ", sum=" + sum);

        String result = sum > 25 ? "大きい" : "小さい";
        System.out.println("行9で停止 -> result=" + result);
    }

    public static void main(String[] args) {
        System.out.println("=== ステップ実行シミュレーション ===");
        debugSimulation();
    }
}`}
          expectedOutput={`=== ステップ実行シミュレーション ===
行3で停止 -> x=10
行5で停止 -> x=10, y=20
行7で停止 -> x=10, y=20, sum=30
行9で停止 -> result=大きい`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ステップインとステップオーバー</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">ステップイン</code>はメソッド内部に入り、
          <code className="text-orange-300">ステップオーバー</code>はメソッドを1行として実行します。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    static int multiply(int a, int b) {
        System.out.println("  [ステップイン] multiply内部: a=" + a + ", b=" + b);
        int result = a * b;
        System.out.println("  [ステップイン] result=" + result);
        return result;
    }

    static int square(int n) {
        System.out.println("  [ステップイン] square内部: n=" + n);
        return multiply(n, n);  // さらにステップインできる
    }

    public static void main(String[] args) {
        System.out.println("[ステップオーバー] multiply(3, 4)を呼び出し:");
        int r1 = multiply(3, 4);
        System.out.println("[結果] r1=" + r1);

        System.out.println();
        System.out.println("[ステップオーバー] square(5)を呼び出し:");
        int r2 = square(5);
        System.out.println("[結果] r2=" + r2);
    }
}`}
          expectedOutput={`[ステップオーバー] multiply(3, 4)を呼び出し:
  [ステップイン] multiply内部: a=3, b=4
  [ステップイン] result=12
[結果] r1=12

[ステップオーバー] square(5)を呼び出し:
  [ステップイン] square内部: n=5
  [ステップイン] multiply内部: a=5, b=5
  [ステップイン] result=25
[結果] r2=25`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ウォッチ式と条件付きブレークポイント</h2>
        <p className="text-gray-400 mb-4">
          ウォッチ式で式の値を監視し、条件付きブレークポイントで特定条件でのみ停止できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] prices = {120, 250, 80, 340, 150, 90, 280};

        System.out.println("=== 条件付きブレークポイント: price > 200 ===");
        int total = 0;
        for (int i = 0; i < prices.length; i++) {
            total += prices[i];

            // 条件付きブレークポイント: price > 200 の時だけ停止
            if (prices[i] > 200) {
                System.out.println("[停止] i=" + i + ", price=" + prices[i] + ", total=" + total);
            }
        }

        System.out.println();
        System.out.println("=== ウォッチ式の結果 ===");
        System.out.println("total = " + total);
        System.out.println("prices.length = " + prices.length);
        System.out.println("average = " + (total / prices.length));
        System.out.println("Arrays.toString(prices) = " + Arrays.toString(prices));
    }
}`}
          expectedOutput={`=== 条件付きブレークポイント: price > 200 ===
[停止] i=1, price=250, total=370
[停止] i=3, price=340, total=790
[停止] i=6, price=280, total=1310

=== ウォッチ式の結果 ===
total = 1310
prices.length = 7
average = 187
Arrays.toString(prices) = [120, 250, 80, 340, 150, 90, 280]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="debug" lessonId="ide-debugger" />
      </div>
      <LessonNav lessons={lessons} currentId="ide-debugger" basePath="/learn/debug" />
    </div>
  );
}

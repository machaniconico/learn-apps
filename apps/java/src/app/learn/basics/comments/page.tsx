import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function CommentsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">基礎 レッスン12</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コメント</h1>
        <p className="text-gray-400">//、/* */、/** */ Javadocコメントの書き方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コメントの種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          コメントはコードの説明を書くためのもので、コンパイル時に無視されます。
          適切なコメントはコードの可読性を大幅に向上させます。
          Javaには3種類のコメントがあります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>//</code> 単一行コメント: 行末までがコメント</li>
          <li><code>/* */</code> 複数行コメント: 範囲内がコメント</li>
          <li><code>/** */</code> Javadocコメント: API ドキュメント生成用</li>
          <li>コメントは「なぜ」を説明し、「何を」はコード自体に語らせるのが良い慣習</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">単一行・複数行コメント</h2>
        <p className="text-gray-400 mb-4">
          基本的なコメントの書き方です。コメントはプログラムの動作に影響しません。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // これは単一行コメント
        System.out.println("Hello!");  // 行末にもコメントを書ける

        /*
         * これは複数行コメント
         * 複数行にわたる説明に使います
         */
        int x = 10;
        int y = 20;

        /* 短い複数行コメントは1行でも書ける */
        int sum = x + y;
        System.out.println("合計: " + sum);

        // コメントでコードを一時的に無効化（デバッグ時に便利）
        // System.out.println("この行は実行されない");
        System.out.println("この行は実行される");
    }
}`}
          expectedOutput={`Hello!
合計: 30
この行は実行される`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Javadocコメント</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">/** */</code> はJavadocコメントで、APIドキュメントの生成に使われます。
          クラスやメソッドの説明に <code>@param</code>、<code>@return</code> などのタグを使います。
        </p>
        <JavaEditor
          defaultCode={`/**
 * 数学的な計算を行うユーティリティクラス。
 * 基本的な算術操作を提供します。
 *
 * @author Developer
 * @version 1.0
 */
public class Main {

    /**
     * 2つの整数の最大値を返します。
     *
     * @param a 比較する最初の整数
     * @param b 比較する2番目の整数
     * @return a と b のうち大きい方の値
     */
    public static int max(int a, int b) {
        return a > b ? a : b;
    }

    /**
     * 円の面積を計算します。
     *
     * @param radius 円の半径（正の値）
     * @return 円の面積
     * @throws IllegalArgumentException 半径が負の場合
     */
    public static double circleArea(double radius) {
        if (radius < 0) throw new IllegalArgumentException("半径は正の値");
        return Math.PI * radius * radius;
    }

    public static void main(String[] args) {
        System.out.println("max(10, 20) = " + max(10, 20));
        System.out.printf("円の面積(半径5) = %.2f%n", circleArea(5));
    }
}`}
          expectedOutput={`max(10, 20) = 20
円の面積(半径5) = 78.54`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">良いコメントの書き方</h2>
        <p className="text-gray-400 mb-4">
          コメントは「なぜそうするか」を説明し、コード自体が「何をするか」を表現するようにしましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // 悪い例: コードの内容をそのまま繰り返すだけ
        // int total = price + tax;  // priceとtaxを足してtotalに代入

        // 良い例: なぜそうするかを説明
        // 消費税10%を加算（2019年10月改定の税率）
        int price = 1000;
        double taxRate = 0.10;
        double total = price * (1 + taxRate);

        // TODO: 軽減税率（8%）の対応が必要
        System.out.println("合計: " + total + "円");

        // FIXME: 大量データ時のパフォーマンス改善
        // NOTE: この処理は月次バッチでのみ実行される
        int[] data = {1, 2, 3, 4, 5};
        int sum = 0;
        for (int value : data) {
            sum += value;
        }
        System.out.println("合計値: " + sum);

        System.out.println("良いコメントの原則:");
        System.out.println("1. なぜを説明する");
        System.out.println("2. 複雑なロジックに補足する");
        System.out.println("3. TODO/FIXMEで課題を示す");
    }
}`}
          expectedOutput={`合計: 1100.0円
合計値: 15
良いコメントの原則:
1. なぜを説明する
2. 複雑なロジックに補足する
3. TODO/FIXMEで課題を示す`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="comments" />
      </div>
      <LessonNav lessons={lessons} currentId="comments" basePath="/learn/basics" />
    </div>
  );
}

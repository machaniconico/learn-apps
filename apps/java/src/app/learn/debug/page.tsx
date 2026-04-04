import { JavaEditor } from "@/components/java-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

const quizQuestions: QuizQuestion[] = [
  {
    question: "printlnデバッグの特徴として正しいものはどれですか？",
    options: [
      "本番環境で推奨されるデバッグ手法",
      "手軽だがコードに残しやすく本番では不適切",
      "ログフレームワークより高機能",
      "自動的にログファイルに出力される",
    ],
    answer: 1,
    explanation: "System.out.printlnデバッグは手軽ですが、本番コードに残りやすく、出力レベル制御ができません。開発中の一時的な確認には有効ですが、本番ではロガーを使いましょう。",
  },
  {
    question: "スタックトレースから読み取れる情報はどれですか？",
    options: [
      "エラーが発生したメモリアドレス",
      "例外の種類・メッセージ・発生場所（クラス・メソッド・行番号）",
      "プログラムのCPU使用率",
      "変数の値の変化履歴",
    ],
    answer: 1,
    explanation: "スタックトレースには例外の種類、エラーメッセージ、メソッド呼び出しの連鎖（クラス名・メソッド名・行番号）が表示されます。一番上が直接の発生場所です。",
  },
  {
    question: "SLF4Jなどのロギングフレームワークの利点はどれですか？",
    options: [
      "printlnより実行速度が速い",
      "ログレベル（DEBUG/INFO/WARN/ERROR）で出力を制御できる",
      "デバッガを内蔵している",
      "例外を自動的に修正する",
    ],
    answer: 1,
    explanation: "ロギングフレームワークではログレベルを設定して出力を制御できます。本番ではINFO以上、開発ではDEBUG以上など、環境に応じた切り替えが可能です。",
  },
  {
    question: "NullPointerExceptionが発生する原因はどれですか？",
    options: [
      "整数をゼロで割った",
      "nullのオブジェクトに対してメソッドを呼び出した",
      "配列のサイズを超えたインデックスにアクセスした",
      "型変換に失敗した",
    ],
    answer: 1,
    explanation: "NullPointerExceptionはnull参照に対してメソッド呼び出しやフィールドアクセスを行った場合に発生します。Optionalやnullチェックで防ぐことができます。",
  },
];

export default function DebugPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-red-400 mb-2">デバッグ</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Javaプログラムのデバッグ手法を学びましょう。printlnデバッグ・スタックトレースの読み方・ロギングフレームワーク・よくあるエラーの対処法など、効率的なバグ解決スキルを身につけます。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="debug" totalLessons={5} color="red" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/debug" color="red" categoryId="debug" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ロギングの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">java.util.logging</code> を使ったログ出力の基本です。
          実際の開発では <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">SLF4J + Logback</code> が広く使われます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.logging.*;

public class Main {
    // ロガーの取得
    private static final Logger logger = Logger.getLogger(Main.class.getName());

    static double divide(double a, double b) {
        logger.info("divide呼び出し: a=" + a + ", b=" + b);

        if (b == 0) {
            logger.warning("ゼロ除算を検出");
            throw new ArithmeticException("ゼロで割れません");
        }

        double result = a / b;
        logger.info("計算結果: " + result);
        return result;
    }

    public static void main(String[] args) {
        // ログレベルの設定
        logger.setLevel(Level.ALL);
        ConsoleHandler handler = new ConsoleHandler();
        handler.setLevel(Level.ALL);
        handler.setFormatter(new SimpleFormatter());

        System.out.println("=== 正常ケース ===");
        double r1 = divide(10, 3);
        System.out.println("結果: " + r1);

        System.out.println("=== エラーケース ===");
        try {
            divide(10, 0);
        } catch (ArithmeticException e) {
            logger.severe("例外発生: " + e.getMessage());
            System.out.println("エラー処理完了");
        }
    }
}`}
          expectedOutput={`=== 正常ケース ===
結果: 3.3333333333333335
=== エラーケース ===
エラー処理完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">よくあるエラーパターンと対処法</h2>
        <p className="text-gray-400 mb-4">
          Javaでよく遭遇するエラーとその原因・対処法を学びましょう。
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">NullPointerException</code> や
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">ArrayIndexOutOfBoundsException</code> などの対策を理解します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {
    public static void main(String[] args) {
        // 1. NullPointerException
        System.out.println("=== NullPointerException ===");
        String text = null;
        try {
            int len = text.length(); // NPE!
        } catch (NullPointerException e) {
            System.out.println("対策: nullチェックまたはOptionalを使う");
        }
        // 対策
        int safeLen = (text != null) ? text.length() : 0;
        System.out.println("安全な長さ: " + safeLen);

        // 2. ArrayIndexOutOfBoundsException
        System.out.println("=== ArrayIndexOutOfBounds ===");
        int[] arr = {1, 2, 3};
        try {
            int val = arr[5]; // 範囲外!
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("対策: インデックスを配列長で確認する");
        }

        // 3. ClassCastException
        System.out.println("=== ClassCastException ===");
        Object obj = "Hello";
        try {
            Integer num = (Integer) obj; // 型不一致!
        } catch (ClassCastException e) {
            System.out.println("対策: instanceofで型チェックする");
        }
        if (obj instanceof String s) {
            System.out.println("安全なキャスト: " + s);
        }
    }
}`}
          expectedOutput={`=== NullPointerException ===
対策: nullチェックまたはOptionalを使う
安全な長さ: 0
=== ArrayIndexOutOfBounds ===
対策: インデックスを配列長で確認する
=== ClassCastException ===
対策: instanceofで型チェックする
安全なキャスト: Hello`}
        />
      </section>

      <Quiz questions={quizQuestions} color="red" />
    </div>
  );
}
